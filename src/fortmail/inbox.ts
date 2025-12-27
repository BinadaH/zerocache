import fortmailInbox from "./fortmail-inbox.html?raw"
import inboxCSS from "./inbox.css?inline"
import emailData from "./email-data.json"

export default function loadInbox (viewport: HTMLDivElement) {
    const site = fortmailInbox +
                `<style>${inboxCSS}</style>`
    viewport.innerHTML += site

    const emailModal = $<HTMLDivElement>("#emailModal")!
    const closeBtn = $<HTMLSpanElement>(".close-button")!
    
    $<HTMLDivElement>(".emailContainer")!.onclick = (event) => {
        const email = (event.target as HTMLElement).closest(".email");
        
        if (email) {
            const id = Number((email as HTMLElement).dataset.id);
            const jsonEmail = emailData[id];

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
    loadEmails()
}

const loadEmails = async () => {
    const container = $<HTMLDivElement>(".emailContainer")!

    const today = new Date();
    const dateNow = today.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '-');

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    for (let i = 0; i < emailData.length; i++) {
        if (emailData[i].new == false) {
            const email = `
            <div data-id="${i}" class="email">
                <h3 class="sender">${emailData[i].sender}</h3>
                <h5 class="subject">${emailData[i].object}</h5>
                <h5 class="date">${emailData[i].date}</h5>
            </div>
            `
            container.insertAdjacentHTML('afterbegin', email);
        } else {
            await delay(2000);
            const emailNew = `
            <div data-id="${i}" class="new email">
                <h3 class="sender">${emailData[i].sender}</h3>
                <h5 class="subject">${emailData[i].object}</h5>
                <h5 class="date">${dateNow}</h5>
            </div>
            `
            container.insertAdjacentHTML('afterbegin', emailNew);
        }
    }
}