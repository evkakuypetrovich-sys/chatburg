/* «Скачать» dropdown, driven by versions.json. Newest (by date) is always recommended.
   A GitHub Release with the version's tag is used when it exists (asset .zip if any), otherwise the itch page. */
(()=>{const RU=()=>(document.documentElement.lang||"ru")!=="en";
const fmtD=d=>new Date(d+"T12:00:00").toLocaleDateString(RU()?"ru-RU":"en-GB",{day:"numeric",month:"long",year:"numeric"});
const mb=b=>(b/1048576).toFixed(0)+(RU()?" МБ":" MB");
let data=null,rel={};
async function load(){if(data)return;data=await (await fetch("versions.json",{cache:"no-cache"})).json();
 try{const k="cb_rel",c=JSON.parse(sessionStorage.getItem(k)||"null");let list=c;if(!list){const r=await fetch(`https://api.github.com/repos/${data.repo}/releases?per_page=50`);list=r.ok?await r.json():[];sessionStorage.setItem(k,JSON.stringify(list.map(x=>({tag:x.tag_name,url:x.html_url,draft:x.draft,assets:(x.assets||[]).map(a=>({n:a.name,u:a.browser_download_url,s:a.size}))}))))}
  (JSON.parse(sessionStorage.getItem(k))||[]).forEach(x=>{if(!x.draft)rel[x.tag]=x})}catch(e){}}
const vnum=t=>(t||"").replace(/^v/,"").split(".").map(n=>("000"+n).slice(-3)).join(".");
function items(){const v=[...data.versions].sort((a,b)=>b.date.localeCompare(a.date)||vnum(b.tag).localeCompare(vnum(a.tag)));
 return v.map((x,i)=>{const r=rel[x.tag];const zip=r&&r.assets.find(a=>/\.zip$/i.test(a.n));
  return {top:i==0,name:x.name,url:x.win||(zip?zip.u:(r?r.url:x.itch)),apk:x.apk||"",apkSize:x.apk_size||"",src:r?"GitHub":"itch.io",date:fmtD(x.date),size:zip?mb(zip.s):x.size,note:RU()?x.note:(x.note_en||x.note)}})}
function html(){const w=data.web;return items().map(x=>{const ext=x.url.startsWith("http")?'target="_blank" rel="noopener"':"";
 const head=`<span class="dlh"><b>${x.name}</b>${x.top?`<span class="badge">⭐ ${RU()?"Рекомендуем":"Recommended"}</span>`:""}</span>
<span class="dlm">${x.date}${x.size?" · "+x.size:""} · ${x.src}</span><span class="dln">${x.note}</span>`;
 if(!x.apk)return `<a role="menuitem" class="dli${x.top?" rec":""}" href="${x.url}" ${ext}>${head}</a>`;
 return `<div class="dli dlpair${x.top?" rec":""}">${head}<span class="dlbtns"><a role="menuitem" class="dlb" href="${x.url}" ${ext}>🪟 Windows</a><a role="menuitem" class="dlb and" href="${x.apk}" target="_blank" rel="noopener">🤖 Android${x.apkSize?" · "+x.apkSize:""}</a></span></div>`}).join("")+
`<a role="menuitem" class="dli web" href="${w.url}"><span class="dlh"><b>🎮 ${RU()?w.name:w.name_en}</b></span><span class="dlm">${w.size}</span><span class="dln">${RU()?w.note:w.note_en}</span></a>`}
function setup(btn){const wrap=document.createElement("span");wrap.className="dlwrap";btn.replaceWith(wrap);wrap.appendChild(btn);
 const pop=document.createElement("div");pop.className="dlpop";pop.setAttribute("role","menu");pop.id="dlpop"+Math.random().toString(36).slice(2,7);wrap.appendChild(pop);
 btn.setAttribute("aria-haspopup","menu");btn.setAttribute("aria-expanded","false");btn.setAttribute("aria-controls",pop.id);
 const open=async(focus)=>{await load();pop.innerHTML=html();wrap.classList.add("open");btn.setAttribute("aria-expanded","true");if(focus)pop.querySelector("a").focus()};
 const close=(f)=>{wrap.classList.remove("open");btn.setAttribute("aria-expanded","false");if(f)btn.focus()};
 btn.addEventListener("click",e=>{e.preventDefault();wrap.classList.contains("open")?close():open(e.detail===0)});
 btn.addEventListener("keydown",e=>{if(e.key=="ArrowDown"){e.preventDefault();open(true)}});
 pop.addEventListener("keydown",e=>{const a=[...pop.querySelectorAll("a")],i=a.indexOf(document.activeElement);
  if(e.key=="ArrowDown"){e.preventDefault();a[(i+1)%a.length].focus()}if(e.key=="ArrowUp"){e.preventDefault();a[(i-1+a.length)%a.length].focus()}
  if(e.key=="Escape"){e.preventDefault();close(true)}if(e.key=="Tab"&&((!e.shiftKey&&i==a.length-1)||(e.shiftKey&&i==0)))close()});
 document.addEventListener("click",e=>{if(!wrap.contains(e.target))close()});
 document.addEventListener("keydown",e=>{if(e.key=="Escape"&&wrap.classList.contains("open"))close(true)});}
document.querySelectorAll("[data-dl]").forEach(setup);load().catch(()=>{});})();
