import { loadUrlBar } from './url-bar/url-bar.ts'
import { router } from './router.ts'
import { setGameStep } from './state.ts';

(window as any).$ = document.querySelector.bind(document);

const {refreshBtn, backBtn, forwardBtn, urlInput, loadingLine} = loadUrlBar(document.querySelector<HTMLDivElement>('#url-bar')!)

router.setButtons(refreshBtn, forwardBtn, backBtn)
router.setInput(urlInput)
router.setLoadingLine(loadingLine)
router.navigateTo("dennslife.blog")

setGameStep("Init", true)

// Blocca le scorciatoie da tastiera (Ctrl + Più, Ctrl + Meno, Ctrl + 0)
window.addEventListener('keydown', (event) => {
    if (event.ctrlKey && (
        event.key === '+' || 
        event.key === '-' || 
        event.key === '=' || 
        event.key === '0' ||
        event.keyCode === 187 || // Tasto +
        event.keyCode === 189    // Tasto -
    )) {
        event.preventDefault();
    }
});

// Blocca lo zoom effettuato con Ctrl + Rotellina del mouse
window.addEventListener('wheel', (event) => {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });