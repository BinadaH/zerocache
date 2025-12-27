import dnsightHTML from './dnsight.html?raw'
import dnsightCSS from './dnsight.css?inline'


interface SiteData {
    available: string,
    reg: string,
    created: Date,
    exp: Date,
    other?: string,
    start: Date,
    end: Date,
}

export function load(viewport: HTMLDivElement, path: string){
    const site = `<style>${dnsightCSS}</style>` + dnsightHTML
    viewport.innerHTML = site
    
    
    function formatDateToYYYYMMDD(date: Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }
    
    let already_checked : Record<string, SiteData> = {
        
    }
    
    $<HTMLFormElement>("#domainForm")!.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const domain = $<HTMLInputElement>('#domainInput')!.value.trim();
        const resultBox = $<HTMLDivElement>('#results')!;
        const resultContent = $<HTMLDivElement>('#resultContent')!;
        let available, reg, created, exp, other, start, end;
        
        if (domain == "fartmail.cloud") {
            available = "Up ✅";
            reg = "Herman Dennet";
            created = new Date("2024-06-25");
            exp = new Date("2027-06-25");
            other = "dennslife.blog;";
        }
        else if (domain == "fortmail.cloud") {
            available = "Up ✅";
            reg = "Fortmail Cloud ☁️";
            created = new Date("2022-02-23");
            exp = new Date("2029-06-28");
        }
        else {
            
            if (Object.keys(already_checked).includes(domain)) {
                ({ available, reg, start, end, created, exp } = already_checked[domain])
                other = "Unknown";
            }
            else {
                available = Math.round(Math.random() * 1) ? "Up ✅" : "Down ❌";
                reg = "Unknown";
                other = "Unknown";
                start = new Date("2022-01-01");
                end = new Date();
                created = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
                exp = new Date(created.getTime() + Math.random() * (end.getTime() - created.getTime()));
                already_checked[domain] = { available, reg, start, end, created, exp };
            }
        }
        
        if (!domain) return;
        
        resultBox.classList.remove('hidden');
        resultContent.innerHTML = `
      <p><strong>Domain:</strong> ${domain}</p>
      <p><strong>Status:</strong> ${available}</p>
      <p><strong>Registered by:</strong> ${reg} </p>
      <p><strong>Created On:</strong> ${formatDateToYYYYMMDD(created)}</p>
      <p><strong>Expires On:</strong> ${formatDateToYYYYMMDD(exp)}</p>
	  <p><strong>Registered by the same name:</strong> ${other}</p>
    `; 
        
    });
}
