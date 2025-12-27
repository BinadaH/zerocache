import fortmailInbox from "./fortmail-inbox.html?raw"
import inboxCSS from "./inbox.css?inline"

export default function loadInbox (viewport: HTMLDivElement) {
    const site = fortmailInbox +
                `<style>${inboxCSS}</style>`
    viewport.innerHTML += site
}