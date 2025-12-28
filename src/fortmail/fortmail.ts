import fortmail from './fortmail.html?raw'
import fortmailLogin from './fortmail-login.html?raw'
import fortmailCSS from "./fortmail.css?inline"
import navBar from "./fortmail-nav.html?raw"
import navBarCSS from "./fortmail-nav.css?inline"
import authData from "./auth-data.json"
import loadInbox from "./inbox"
import {router} from "../router"
import { GameInfo } from '../state'
import { animate, spring } from 'animejs'

export function load(viewport: HTMLDivElement, path: string){
    viewport.innerHTML = navBar + `<style>${navBarCSS}</style>`
    switch(path) {
        case "":
        loadHome(viewport);
        break;
        case "login":
        
        loadLogin(viewport)
        break;
        case "inbox":
        editNavInbox()
        loadInbox(viewport)
        break;
    }
    
    $<HTMLLIElement>("#home")!.onclick = () => {
        router.navigateTo("fortmail.cloud/")
    } 
    
    if (path != "inbox"){
        $<HTMLButtonElement>("#login")!.innerHTML = "<h2>Login</h2>"
        $<HTMLButtonElement>("#login")!.onclick = () => {
            router.navigateTo("fortmail.cloud/login")
        }
    }
    else {
        $<HTMLLIElement>("#add_account")!.onmousedown = ()=> {
            router.navigateTo("fortmail.cloud/login")
        }   
        
        
        document.querySelectorAll<HTMLLIElement>(".switch_account").forEach(ele => {
            ele.onmousedown = () => {
                const new_user = authData.filter((user) => user.email == ele.innerText)[0]
                GameInfo.currUser = {email: new_user.email, password: new_user.password}
                router.reload()
            }
            
        })
        
        
        $<HTMLButtonElement>("#dropdown_btn")!.innerText = getNameFromEmail(GameInfo.currUser?.email ?? "")
        
        
        animate($<HTMLButtonElement>("#dropdown_btn")!, {
            backgroundColor:[ 
                {to: "#ffffff1a", from: "#ffffffff", duration: 1000},
            ],
            
        })
    }
}

export function getNameFromEmail(email: string){
    return  " " + email.split('.')[0].charAt(0).toUpperCase() + email.split('.')[0].slice(1);
}

const editNavInbox = () => {
    $<HTMLDivElement>("#login")!.classList.add("login")
    
    let drop_down_users = ""
    GameInfo.fortmailLoggedInUsers.forEach(user => {
        if (user.email != GameInfo.currUser?.email) drop_down_users += `<li class="switch_account">${user.email}</li>`
    })
    $<HTMLDivElement>("#login")!.innerHTML = `
        <button id="dropdown_btn"></button>
        <ul class="dropdown-menu"> 
            ${drop_down_users}
            <hr>
            <li id="add_account">Aggiungi Account</li>
        </ul>
    `
}

const loadHome = (viewport: HTMLDivElement) => {
    const site = fortmail +
    `<style>${fortmailCSS}</style>`
    viewport.innerHTML += site
    
    $<HTMLButtonElement>("#login2")!.onclick = () => {
        router.navigateTo("fortmail.cloud/login")
    }
}

const loadLogin = (viewport: HTMLDivElement) => {
    const site = fortmailLogin +
    `<style>${fortmailCSS}</style>`
    viewport.innerHTML += site
    
    $<HTMLInputElement>("#email")!.onchange = () => {
        const email = $<HTMLInputElement>("#email")!.value
        const password = $<HTMLInputElement>("#password")!
        const user = authData.find(user => user.email === email);
        if (user && GameInfo.fortmailLoggedInUsers.filter((logged_user)=> logged_user.email == user.email).length != 0) {
            password.value = user.password
        }
    }
    
    $<HTMLButtonElement>("#loginBtn")!.onclick = () => {
        const email = $<HTMLInputElement>("#email")!.value
        const password = $<HTMLInputElement>("#password")!.value
        const authenticatedUser = authData.find(user => user.email === email && user.password === password);
        
        if (authenticatedUser) {
            if (GameInfo.fortmailLoggedInUsers.filter((logged_user)=> logged_user.email == email).length == 0){
                GameInfo.fortmailLoggedInUsers.push({ email, password });
            }
            GameInfo.currUser = {email, password}
            router.navigateTo("fortmail.cloud/inbox");
        } else {
            $<HTMLDivElement>("#error")!.innerText = "Wrong credentials!";
        }
        
    }
}

