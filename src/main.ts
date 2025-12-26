import { loadUrlBar } from './url-bar/url-bar.ts'
import { router } from './router.ts'

const {refreshBtn, backBtn, forwardBtn, urlInput} = loadUrlBar(document.querySelector<HTMLDivElement>('#url-bar')!)

router.setButtons(refreshBtn, forwardBtn, backBtn)
router.setInput(urlInput!)
router.navigateTo("fortmail.cloud")