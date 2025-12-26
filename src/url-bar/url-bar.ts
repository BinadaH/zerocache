import urlBarHtml from './url-bar.html?raw'
import { router } from '../router'

export function loadUrlBar(parent : HTMLDivElement){
    parent.innerHTML = urlBarHtml

    const urlInput = document.querySelector<HTMLInputElement>("#url-input")!
    urlInput.addEventListener("keydown", (event)=>{
        if (event.key == "Enter") {
            const url = urlInput.value 
            router.navigateTo(url)
        }
    })

    return {
        backBtn: document.querySelector<HTMLButtonElement>("#back-btn")!,
        forwardBtn: document.querySelector<HTMLButtonElement>("#forward-btn")!,
        refreshBtn: document.querySelector<HTMLButtonElement>("#refresh-btn")!
    }
}

