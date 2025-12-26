import {load as LoadFortmail} from './fortmail/fortmail'
import {load as LoadFartmail} from './fartmail/fartmail'


const routes : Record<string, (viewport: HTMLDivElement)=> void> = {
    "fortmail.com": LoadFortmail,
    "fartmail.com": LoadFartmail,
}

class Router {
    navigateTo(url: string)  {
        const load = routes[url]
        if (load) load(document.querySelector<HTMLDivElement>("#viewport")!)
    }
}

export const router = new Router();