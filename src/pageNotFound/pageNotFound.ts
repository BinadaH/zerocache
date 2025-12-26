import pageNotFound from './pageNotFound.html?raw'


export function load(viewport: HTMLDivElement, path: string){
    viewport.innerHTML = pageNotFound
}