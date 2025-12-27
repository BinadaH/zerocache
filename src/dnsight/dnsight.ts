import dnsightHTML from './dnsight.html?raw'
import dnsightCSS from './dnsight.css?inline'


export function load(viewport: HTMLDivElement, path: string){
    const site = `<style>${dnsightCSS}</style>` + dnsightHTML
    viewport.innerHTML = site
}