import { loadUrlBar } from './url-bar/url-bar.ts'
import { router } from './router.ts'

loadUrlBar(document.querySelector<HTMLDivElement>('#url-bar')!)


router.navigateTo("fortmail.com")