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

// <a href="#" class="bookmark-item">
//     <img src="https://www.google.com/favicon.ico" alt="icon">
//     <span>Google</span>
//   </a>
    
    const bookmarks : Record<string, string> = {
        "📧 Fortmail": "fortmail.cloud",
        "🔍 DNSight": "dnsight.com"
    }
    
    Object.keys(bookmarks).forEach(bookmark_key => {
        const bookmark_item = document.createElement("a")
        bookmark_item.classList.add("bookmark-item")
        const name = document.createElement("span") 
        name.innerText = bookmark_key
        bookmark_item.appendChild(name)

        bookmark_item.onclick = ()=> router.navigateTo(bookmarks[bookmark_key])

        $<HTMLDivElement>("#bookmarks-bar")!.appendChild(bookmark_item)
    })
    


    return {
        backBtn: $<HTMLButtonElement>("#back-btn")!,
        forwardBtn: $<HTMLButtonElement>("#forward-btn")!,
        refreshBtn: $<HTMLButtonElement>("#refresh-btn")!,
        urlInput: $<HTMLInputElement>("#url-input")!,
        loadingLine: $<HTMLDivElement>("#loading-container")!
    }
}

