import fortmail from './fortmail.html?raw'
import fortmailLogin from './fortmail-login.html?raw'
import fortmailCSS from "./fortmail.css?inline"
import navBar from "./fortmail-nav.html?raw"
import navBarCSS from "./fortmail-nav.css?inline"
import {router} from "../router"

export function load(viewport: HTMLDivElement, path: string){
    const site = navBar + 
                fortmailLogin +
                `<style>${navBarCSS}${fortmailCSS}</style>`
    viewport.innerHTML = site
    
    document.querySelector<HTMLButtonElement>("#login")!.onclick = () => {
        router.navigateTo("fartmail.com")
    }

    document.querySelector<HTMLButtonElement>("#login2")!.onclick = () => {
        router.navigateTo("fartmail.com")
    }
}