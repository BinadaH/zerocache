import urlBarCss from './url-bar.css?inline'
import urlBarHtml from './url-bar.html?raw'

export function loadUrlBar(parent : HTMLDivElement){
    parent.innerHTML = urlBarHtml

    document.querySelector<HTMLInputElement>("#url-input")!.onsubmit = (event) => {
        console.log(event)
    }
}

