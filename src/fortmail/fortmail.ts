import fortmail from './fortmail.html?raw'
import fortmailLogin from './fortmail-login.html?raw'
import fortmailCSS from "./fortmail.css?inline"
import navBar from "./fortmail-nav.html?raw"
import navBarCSS from "./fortmail-nav.css?inline"
import authData from "./auth-data.json"
import loadInbox from "./inbox"
import {router} from "../router"

export function load(viewport: HTMLDivElement, path: string){
    viewport.innerHTML = navBar + `<style>${navBarCSS}</style>`
    switch(path) {
        case "":
            loadHome(viewport);
            break;
        case "login":
            loadLogin(viewport)
            break;
        case "inbox":
            loadInbox(viewport)
            break;
    }

    $<HTMLLIElement>("#home")!.onclick = () => {
        router.navigateTo("fortmail.cloud/")
    } 

    $<HTMLButtonElement>("#login")!.onclick = () => {
        router.navigateTo("fortmail.cloud/login")
    }
}

const loadHome = (viewport: HTMLDivElement) => {
    const site = fortmail +
                `<style>${fortmailCSS}</style>`
    viewport.innerHTML += site

    $<HTMLButtonElement>("#login2")!.onclick = () => {
        router.navigateTo("fortmail.cloud/login")
    }
}

const loadLogin = (viewport: HTMLDivElement) => {
    const site = fortmailLogin +
                `<style>${fortmailCSS}</style>`
    viewport.innerHTML += site

    $<HTMLInputElement>("#email")!.onchange = () => {
        const email = $<HTMLInputElement>("#email")!.value
        const password = $<HTMLInputElement>("#password")!
        authData.forEach(user => {
            if (user.email == email) {
                password.value = user.password
            }
        });
    }

    $<HTMLButtonElement>("#loginBtn")!.onclick = () => {
        const email = $<HTMLInputElement>("#email")!.value
        const password = $<HTMLInputElement>("#password")!.value
        authData.forEach(user => {
            if (user.email == email && user.password == password) {
                router.navigateTo("fortmail.cloud/inbox")
            }
        })
        $<HTMLDivElement>("#error")!.innerText = "Wrong credentials!"
    }
}

