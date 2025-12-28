import cameras from "./cameras.html?raw"
import camerasCSS from "./cameras.css?inline"

export function load(viewport: HTMLDivElement, path: string) {
    viewport.innerHTML = cameras + `<style>${camerasCSS}</style>`
}