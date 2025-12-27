import dennslifeHTML from './dennslife.html?raw'
import dennnslifeCSS from './dennslife.css?inline'
import blurredImg from './dennslife_blurred.png'
import dennsPosts from './dennsposts.json'
import { router } from '../router'

export function load(viewport : HTMLDivElement, path: string){
    if (path == "img"){
        viewport.innerHTML = `<img src="${blurredImg}">`
    } else{
        viewport.innerHTML = `<style>${dennnslifeCSS}</style>` + dennslifeHTML
        const container = $<HTMLDivElement>("#container")!

        dennsPosts.posts.forEach((post, i) => {
            let card = document.createElement("div");
            let content = document.createElement("div");
    
    
            // card.setAttribute("onclick", `openPost(${i})`);
            
            //open
            card.onclick = ()=>{
			    $<HTMLDivElement>('#full-post')!.innerHTML = post;
			    $<HTMLDivElement>('#modal')!.style.display = 'flex';
                document.querySelectorAll<HTMLImageElement>("#img_blur").forEach((ele : HTMLImageElement) => {
                    ele.onmousedown = ()=>{
                        router.navigateTo("dennslife.blog/img")
                    }
                    ele.src = blurredImg
                })
            }

            card.classList.add("post-card");
            content.classList.add("post-content");
    
            content.innerHTML = post;
    
            card.appendChild(content);
            
            container.appendChild(card); 
            
        });
        

        
        

        //close
        const close_pop = ()=>{
            $<HTMLDivElement>('#modal')!.style.display = 'none';
			$<HTMLDivElement>('#full-post')!.innerHTML = '';
        }
        $<HTMLDivElement>("#modal")!.onclick = close_pop
        $<HTMLButtonElement>("#close-btn")!.onclick = close_pop


    }
    
}