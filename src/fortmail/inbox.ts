import fortmailInbox from "./fortmail-inbox.html?raw"
import inboxCSS from "./inbox.css?inline"
import emailData from "./email-data.json"
import { GameInfo } from "../state"
import { router } from "../router"
import guidaPDF from "./assets/guida_demo.pdf"
import rZIP from "./assets/r.zip?url"
import { getNameFromEmail } from "./fortmail"

interface Email {
    sender: string;
    object: string;
    content: string;
    date: string;
    new: boolean;
    response?: string[];
}




export default function loadInbox (viewport: HTMLDivElement) {
    const currUser = GameInfo.currUser!
    if (!currUser) return router.navigateTo("fortmail.cloud/login")


    const site = fortmailInbox +
                `<style>${inboxCSS}</style>`
    viewport.innerHTML += site

    $<HTMLSpanElement>(".greeter")!.innerText += getNameFromEmail(currUser.email)

    const currEmailData = emailData[currUser.email as keyof typeof emailData] as unknown as Email[];
    const emailModal = $<HTMLDivElement>("#emailModal")!
    const closeBtn = $<HTMLSpanElement>(".close-button")!

    

    $<HTMLDivElement>(".emailContainer")!.onclick = (event) => {
        const email = (event.target as HTMLElement).closest(".email");
        
        if (email) {
            const id = Number((email as HTMLElement).dataset.id);
            const jsonEmail = currEmailData[id];
            
            
            if (email.classList.contains("new")) {
                email.classList.remove("new");
            }
            
            if (jsonEmail && jsonEmail.new !== false) {
                jsonEmail.new = false;
                const today = new Date();
                const dateNow = today.toLocaleDateString('it-IT', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }).replace(/\//g, '-');
                jsonEmail.date = dateNow;
            }
            
            document.querySelector("#modalSubject")!.textContent = jsonEmail.object;
            document.querySelector("#modalSender")!.textContent = `Da: ${jsonEmail.sender}`;
            
            const modalBody = document.querySelector("#modalBody")!;
            modalBody.innerHTML = jsonEmail.content;
            
            if (jsonEmail.response) {
                const responseHTML = `
                    <div class="email-responses">
                        ${jsonEmail.response.map(line => {
                            const sender = line.split(':')[0].trim().toLowerCase();
                            return `
                                <hr class="chat-separator">
                                <p class="response-line" data-sender="${sender}">
                                    ${line.replace(/\n/g, '<br>')}
                                </p>
                            `;
                        }).join('')}
                        <h3 style="color: gray; text-align:center"><b>UTENTE BLOCCATO</b></h3>
                    </div>
                `;
                modalBody.innerHTML += responseHTML;
            }
            
            emailModal.style.display = "flex";

            if (jsonEmail.sender == "assistenza@fartmail.cloud") {
                const fakeLogin = $<HTMLAnchorElement>("#toFakeLogin")
                if (fakeLogin) {
                    fakeLogin.onclick = () => {
                        router.navigateTo("fartmail.cloud/login")
                    }
                }
            }

            if (jsonEmail.sender == "assistenza@cybersec.com") {
                const downloadSEC_PDF = $<HTMLAnchorElement>("#downloadSEC_PDF")
                if (downloadSEC_PDF) {
                    downloadSEC_PDF.href = guidaPDF
                }
            }

            if (jsonEmail.sender == "dennet.herman@fortmail.cloud") {
                const downloadRZIP = $<HTMLAnchorElement>("#downloadRZIP")
                if (downloadRZIP) {
                    downloadRZIP.href = rZIP
                }
            }
        }
    }
    
    window.addEventListener("click", (event) => {
        if (event.target === emailModal) {
            emailModal.style.display = "none";
        }
    });

    closeBtn.onclick = () => {
        emailModal.style.display = "none";
    };
    loadEmails(currEmailData)
}

const loadEmails = async (currEmailData: Email[]) => {
    const container = $<HTMLDivElement>(".emailContainer")!

    const today = new Date();
    const dateNow = today.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '-');

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    for (let i = 0; i < currEmailData.length; i++) {
        if (currEmailData[i].new == false) {
            const email = `
            <div data-id="${i}" class="email">
                <h3 class="sender">${currEmailData[i].sender}</h3>
                <h5 class="subject">${currEmailData[i].object}</h5>
                <h5 class="date">${currEmailData[i].date}</h5>
            </div>
            `
            container.insertAdjacentHTML('afterbegin', email);
        } else {
            await delay(2000);
            const emailNew = `
            <div data-id="${i}" class="new email">
                <h3 class="sender">${currEmailData[i].sender}</h3>
                <h5 class="subject">${currEmailData[i].object}</h5>
                <h5 class="date">${dateNow}</h5>
            </div>
            `
            container.insertAdjacentHTML('afterbegin', emailNew);
        }
    }
}