import {load as LoadFortmail} from './fortmail/fortmail'
import {load as LoadFartmail} from './fartmail/fartmail'
import { load as LoadDNSight } from './dnsight/dnsight';
import {load as LoadPageNotFound} from './pageNotFound/pageNotFound'

interface ParsedURL {
	domain: string;
	path: string;
}

function parseBrowserUrl(input: string): ParsedURL {
	let sanitizedInput = input.trim();
	
	if (!sanitizedInput.startsWith('http')) {
		sanitizedInput = 'https://' + sanitizedInput;
	}
	
	try {
		const url = new URL(sanitizedInput);
		
		const domain = url.hostname.replace(/^www\./, '');
		
		const pathString = url.pathname.replace(/^\/+|\/+$/g, '');
		
		return {
			domain: domain,
			path: pathString
		};
	} catch (e) {
		return { domain: 'error', path: '' };
	}
}

const routes : Record<string, (viewport: HTMLDivElement, path: string)=> void> = {
	"fortmail.cloud": LoadFortmail,
	"fartmail.cloud": LoadFartmail,
	"dnsight.com": LoadDNSight,
	"pageNotFound": LoadPageNotFound
}

class Router {
	history: Array<ParsedURL> = []
	currPos = 0
	urlInput: HTMLInputElement | null = null

	constructor (){
		document.addEventListener("mousedown", (event)=>{
			if (event.button == 3 || event.button == 4) event.preventDefault()
			if (event.button == 3) this.goBack()
			else if (event.button == 4) this.goForward()
		})
	}
	
	navigateTo(url: string)  {
		const parsedUrl = parseBrowserUrl(url)
		this.history = this.history.slice(0, this.currPos + 1)
		this.history.push(parsedUrl)
		this.currPos = this.history.length - 1
		this.loadPage(parsedUrl)
	}
	
	loadPage(parsedUrl : ParsedURL){
		// console.log(this.history, this.currPos)
		let load = routes[parsedUrl.domain]
		if (!load) {
			load = routes["pageNotFound"]
		}

		this.urlInput!.value = parsedUrl.domain + (parsedUrl.path ? ("/" + parsedUrl.path) : "")
		load(document.querySelector<HTMLDivElement>("#viewport")!, parsedUrl.path)
	}
	
	goBack() {
		if (this.history.length > 1){
			this.currPos -= 1
			const back_url = this.history[this.currPos]
			// console.log("Back: ", back_url)
			this.loadPage(back_url)
		}
	}
	
	reload() {
		this.loadPage(this.history[this.currPos])
	}
	
	goForward() {
		if (this.currPos != this.history.length - 1){
			this.currPos += 1
			const forward_url = this.history[this.currPos]
			// console.log("Forward: ", forward_url)
			this.loadPage(forward_url)
		}
	}
	
	
	setButtons(reloadBtn : HTMLButtonElement, forwardBtn: HTMLButtonElement, backBtn: HTMLButtonElement) {
		reloadBtn.onclick = ()=> this.reload()
		forwardBtn.onclick = ()=> this.goForward()
		backBtn.onclick = ()=> this.goBack()
		
	}
	
	
	setInput(urlInput: HTMLInputElement){
		this.urlInput = urlInput
	}
}

export const router = new Router();