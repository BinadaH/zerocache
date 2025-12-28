import {load as LoadFortmail} from './fortmail/fortmail'
import {load as LoadFartmail} from './fartmail/fartmail'
import { load as LoadDNSight } from './dnsight/dnsight';
import {load as LoadPageNotFound} from './pageNotFound/pageNotFound'
import {load as LoadDennsLife} from './dennslife/dennslife'
import {load as LoadCameras} from './cameras/cameras'


import {animate} from 'animejs'
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
	"dennslife.blog": LoadDennsLife,
	"pageNotFound": LoadPageNotFound,
	"localhost": LoadCameras,
}

class Router {
	history: Array<ParsedURL> = []
	currPos = 0
	urlInput: HTMLInputElement | null = null
	loadingLine: HTMLDivElement | null = null
	reloadBtn: HTMLButtonElement | null = null

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

		this.animateLoading(()=>this.loadPage(parsedUrl))
		
	}

	animateLoading(callback : () => void){
		animate(this.loadingLine!, {
			opacity: { from: 0, to: 1, duration: 500 },
			display: { from: "none", to: "block"}
		})


		const loading_anim = animate(this.reloadBtn!, {
			opacity: {to: "0.5"},
			rotate: "1turn",
			// duration: 500,
			loop: true
		})

		setTimeout(()=>{
			
			callback()	

			animate(this.loadingLine!, {
				opacity: { from: 1, to: 0, duration: 500 },
				onComplete: () =>  {
					animate(this.loadingLine!, {
						display: {to: "none"}
					})
				}
			})

			loading_anim.pause()
			animate(this.reloadBtn!, {
				opacity: [
					{to: "0.2", duration: 50},
					{ from: "0", to: "1", duration: 500 }
				],
				rotate: [
					{ to: "-1turn", duration: 10 }, 
					{ to: "0turn", duration: 500 }
				],
			})

			// loading_anim.loop = false
		}, Math.round(Math.random() * 300) + 200)
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
		this.animateLoading(()=>this.loadPage(this.history[this.currPos]))
		
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
		
		this.reloadBtn = reloadBtn
	}
	
	
	setInput(urlInput: HTMLInputElement){
		this.urlInput = urlInput
	}


	setLoadingLine(loadingLine: HTMLDivElement){
		this.loadingLine = loadingLine
	}
}

export const router = new Router();