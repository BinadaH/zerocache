import fartmail from './fartmail.html?raw'
import fartmailCSS from "./fartmail.css?inline"
import fartmailDashboard from "./fartmail-dashboard.html?raw"
import db from "./db.json"

export function load(viewport : HTMLDivElement, path: string){
    
    switch(path) {
        case "login":
            viewport.innerHTML = fartmail + `<style>${fartmailCSS}</style>`
            break;
        case "dashboard":
            loadDashboard(viewport)
            break;
    }
}

const loadDashboard = (viewport: HTMLDivElement) => {
    viewport.innerHTML = fartmailDashboard;

    const dbContainer = $<HTMLDivElement>("#db")!;
    const resultTitle = $<HTMLHeadingElement>("#result")!;

    $<HTMLButtonElement>("#loginDashboard")!.onclick = () => {
        const emailField = $<HTMLInputElement>("#email")!.value

        if (emailField.includes("' OR 1=1 --") || emailField.includes("' or 1=1 --") || emailField.includes("' OR 1 = 1 --") || emailField.includes("' or 1 = 1 --")) {
            let tableHTML = `
                <table class="db-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Data Creazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${db.map(db => `
                            <tr>
                                <td>${db.ID_user}</td>
                                <td>${db.email}</td>
                                <td><code>${db.password}</code></td>
                                <td>${db.date}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

            dbContainer.innerHTML = tableHTML;
        } else {
            resultTitle.innerText = "Credenziali non valide.";
            dbContainer.innerHTML = "";
        }
    }
}