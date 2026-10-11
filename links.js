/* «Где играть» section + footer links from links.json */
(async()=>{let d;try{d=await (await fetch("links.json",{cache:"no-cache"})).json()}catch(e){return}
const L=d.links||[],RU=()=>document.documentElement.lang!=="en",esc=s=>String(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ext=u=>/^https?:/.test(u)&&!u.startsWith(location.origin+location.pathname.replace(/[^/]*$/,""))?'target="_blank" rel="noopener"':"";
function render(){const g=document.getElementById("wheregrid");if(g)g.innerHTML=L.map(l=>`<a class="plat" href="${esc(l.url)}" ${ext(l.url)}><span class="pi">${l.icon||"🔗"}</span><span><b>${esc(RU()?l.name:(l.name_en||l.name))}</b><small>${esc(RU()?l.note:(l.note_en||l.note))}</small></span></a>`).join("");
 const f=document.getElementById("footlinks");if(f)f.innerHTML=L.map(l=>`<a href="${esc(l.url)}" ${ext(l.url)}>${l.icon||""} ${esc(RU()?l.name:(l.name_en||l.name))}</a>`).join(" · ")}
render();const lb=document.getElementById("lang");if(lb)lb.addEventListener("click",()=>setTimeout(render,0))})();
