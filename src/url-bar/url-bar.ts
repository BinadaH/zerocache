import urlBarHtml from './url-bar.html?raw'
import { router } from '../router'

export function loadUrlBar(parent : HTMLDivElement){
    parent.innerHTML = urlBarHtml

    const urlInput = $<HTMLInputElement>("#url-input")!
    urlInput.addEventListener("keydown", (event)=>{
        if (event.key == "Enter") {
            const url = urlInput.value 
            router.navigateTo(url)
        }
    })

    return {
        backBtn: $<HTMLButtonElement>("#back-btn")!,
        forwardBtn: $<HTMLButtonElement>("#forward-btn")!,
        refreshBtn: $<HTMLButtonElement>("#refresh-btn")!,
        urlInput: $<HTMLInputElement>("#url-input")!
    }
}

