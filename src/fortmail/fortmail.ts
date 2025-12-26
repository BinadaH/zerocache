import fortmail from './fortmail.html?raw'
import fortmailCSS from "./fortmail.css?inline"

export function load(viewport : HTMLDivElement, path : string){
    viewport.innerHTML = fortmail
    viewport.innerHTML += `<style>${fortmailCSS}</style>`
}