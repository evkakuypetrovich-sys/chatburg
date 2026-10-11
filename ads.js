/* One ad card (main page), driven by ads.json: weighted random, date window, rotation every N s with fade. */
(()=>{const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const pick=(l,not)=>{l=l.length>1?l.filter(a=>a.id!==not):l;const t=l.reduce((s,a)=>s+(+a.weight||1),0);let r=Math.random()*t;for(const a of l){r-=(+a.weight||1);if(r<=0)return a}return l[0]};
const esc=s=>String(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function fill(slot,a){const ext=/^https?:/.test(a.link),t=ext?'target="_blank" rel="sponsored noopener"':"";slot.dataset.cur=a.id;
 slot.querySelector(".adbody").innerHTML=`<a class="adimg" href="${esc(a.link)}" ${t}><img src="${esc(a.image_r)}" alt="${esc(a.title)}" width="300" height="250" loading="lazy" decoding="async"></a>
 <div class="adtext"><h3>${esc(a.headline||a.title)}</h3><p>${esc(a.text||"")}</p><a class="btn" href="${esc(a.link)}" ${t}>${esc(a.cta||"Открыть")} →</a></div>`}
async function init(){const slot=document.querySelector("[data-ad]");if(!slot)return;let cfg;try{cfg=await (await fetch("ads.json",{cache:"no-cache"})).json()}catch(e){return}
 const today=new Date().toISOString().slice(0,10),ads=(cfg.ads||[]).filter(a=>(!a.start||a.start<=today)&&(!a.end||a.end>=today));if(!ads.length){slot.closest("section").remove();return}
 fill(slot,pick(ads));slot.classList.add("on");if(RM||ads.length<2)return;const b=slot.querySelector(".adbody");
 setInterval(()=>{if(document.hidden)return;b.classList.add("fade");setTimeout(()=>{fill(slot,pick(ads,slot.dataset.cur));b.classList.remove("fade")},450)},(+cfg.rotate_seconds||15)*1000)}
("requestIdleCallback" in window?requestIdleCallback:f=>setTimeout(f,800))(()=>init())})();
