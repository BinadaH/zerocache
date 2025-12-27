import { loadUrlBar } from './url-bar/url-bar.ts'
import { router } from './router.ts'
import { setGameStep } from './state.ts';

(window as any).$ = document.querySelector.bind(document);

const {refreshBtn, backBtn, forwardBtn, urlInput, loadingLine} = loadUrlBar(document.querySelector<HTMLDivElement>('#url-bar')!)

router.setButtons(refreshBtn, forwardBtn, backBtn)
router.setInput(urlInput)
router.setLoadingLine(loadingLine)
router.navigateTo("fortmail.cloud/inbox")

setGameStep("Init", true)