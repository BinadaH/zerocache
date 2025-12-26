import fortmail from './fortmail.html?raw'
import fortmailLogin from './fortmail-login.html?raw'
import fortmailCSS from "./fortmail.css?inline"
import navBar from "./fortmail-nav.html?raw"
import navBarCSS from "./fortmail-nav.css?inline"
import {router} from "../router"

export function load(viewport: HTMLDivElement, path: string){
    viewport.innerHTML = navBar
    switch(path) {
        case "":
            loadHome(viewport);
            break;
        case "login":
            loadLogin(viewport)
            break;
        default: 
    }

    document.querySelector<HTMLLIElement>("#home")!.onclick = () => {
        router.navigateTo("fortmail.cloud/")
    } 

    document.querySelector<HTMLButtonElement>("#login")!.onclick = () => {
        router.navigateTo("fortmail.cloud/login")
    }
}

const loadHome = (viewport: HTMLDivElement) => {
    const site = fortmail +
                `<style>${navBarCSS}${fortmailCSS}</style>`
    viewport.innerHTML += site

    document.querySelector<HTMLButtonElement>("#login2")!.onclick = () => {
        router.navigateTo("fortmail.cloud/login")
    }
}

const loadLogin = (viewport: HTMLDivElement) => {
    const site = fortmailLogin +
                `<style>${navBarCSS}${fortmailCSS}</style>`
    viewport.innerHTML += site
}