/* Ad slots driven by ads.json: weighted random, date window, rotation with fade. Loads when the page is idle. */
(()=>{const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const pick=(list,not)=>{const l=list.length>1?list.filter(a=>a.id!==not):list;const t=l.reduce((s,a)=>s+(+a.weight||1),0);let r=Math.random()*t;for(const a of l){r-=(+a.weight||1);if(r<=0)return a}return l[0]};
function fill(slot,a){const v=slot.dataset.ad=="v",ext=/^https?:/.test(a.link);slot.dataset.cur=a.id;
 slot.querySelector(".adbody").innerHTML=`<a href="${a.link}" ${ext?'target="_blank" rel="sponsored noopener"':""} title="${a.title}"><img src="${v?a.image_v:a.image_r}" alt="${a.title}" width="${v?160:300}" height="${v?600:250}" loading="lazy" decoding="async"></a>`}
async function init(){const slots=[...document.querySelectorAll("[data-ad]")].filter(s=>getComputedStyle(s).display!=="none");if(!slots.length)return;
 let cfg;try{cfg=await (await fetch("ads.json",{cache:"no-cache"})).json()}catch(e){return}
 const today=new Date().toISOString().slice(0,10);const ads=(cfg.ads||[]).filter(a=>(!a.start||a.start<=today)&&(!a.end||a.end>=today));if(!ads.length)return;
 const used=new Set();slots.forEach(s=>{const free=ads.filter(x=>!used.has(x.id));const a=pick(free.length?free:ads);used.add(a.id);fill(s,a);s.classList.add("on")});
 if(RM||ads.length<2)return;
 setInterval(()=>{if(document.hidden)return;slots.forEach(s=>{const b=s.querySelector(".adbody");b.classList.add("fade");setTimeout(()=>{fill(s,pick(ads,s.dataset.cur));b.classList.remove("fade")},450)})},(+cfg.rotate_seconds||15)*1000)}
("requestIdleCallback" in window?requestIdleCallback:f=>setTimeout(f,800))(()=>init())})();
