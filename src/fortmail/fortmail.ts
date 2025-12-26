import fortmail from './fortmail.html?raw'
import fortmailCSS from "./fortmail.css?inline"

export function load(viewport : HTMLDivElement){
    viewport.innerHTML = fortmail
    viewport.innerHTML += `<style>${fortmailCSS}</style>`
}