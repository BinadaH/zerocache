import fortmailInbox from "./fortmail-inbox.html?raw"
import inboxCSS from "./inbox.css?inline"
import emailData from "./email-data.json"
import { GameInfo } from "../state"
import { router } from "../router"
import guidaPDF from "./assets/guida_demo.pdf"

export default function loadInbox (viewport: HTMLDivElement) {
    const site = fortmailInbox +
                `<style>${inboxCSS}</style>`
    viewport.innerHTML += site

    const currUser = GameInfo.currUser!
    const currEmailData = emailData[currUser.email as keyof typeof emailData]

    const emailModal = $<HTMLDivElement>("#emailModal")!
    const closeBtn = $<HTMLSpanElement>(".close-button")!

    $<HTMLSpanElement>(".greeter")!.innerText += " " + currUser.email.split('.')[0].charAt(0).toUpperCase() + currUser.email.split('.')[0].slice(1);

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
            
            emailModal.style.display = "flex";

            if (jsonEmail.sender == "assistenza@fartmail.cloud") {
                $<HTMLAnchorElement>("#toFakeLogin")!.onclick = () => {
                    router.navigateTo("fartmail.cloud/login")
                }
            }

            if (jsonEmail.sender == "assistenza@cybersec.com") {
                $<HTMLAnchorElement>("#downloadSEC_PDF")!.href = guidaPDF
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

const loadEmails = async (currEmailData: typeof emailData["robbin.greco@fortmail.cloud"]) => {
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