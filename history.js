/* history.html: RU/EN toggle (shared cb_lang), dates synced from versions.json, reveal-on-scroll */
(()=>{let lang=localStorage.getItem("cb_lang")||"ru";const b=document.getElementById("lang");
const M={ru:["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],en:["January","February","March","April","May","June","July","August","September","October","November","December"]};
const fd=d=>{const[y,m,dd]=d.split("-").map(Number);return `${dd} ${M[lang][m-1]} ${y}`};
function render(){document.documentElement.lang=lang;b.textContent=lang=="ru"?"EN":"RU";document.querySelectorAll("[data-ru]").forEach(e=>e.textContent=e.dataset[lang]);
 document.querySelectorAll("time[data-vid]").forEach(t=>{if(t.dateTime)t.textContent=fd(t.dateTime)})}
b.onclick=()=>{lang=lang=="ru"?"en":"ru";localStorage.setItem("cb_lang",lang);render()};render();
fetch("versions.json",{cache:"no-cache"}).then(r=>r.json()).then(d=>{d.versions.forEach(v=>{const t=document.querySelector(`time[data-vid="${v.id}"]`);if(t){t.dateTime=v.date}});render()}).catch(()=>{});
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches,io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.05});
document.querySelectorAll(".rv").forEach(s=>RM?s.classList.add("in"):io.observe(s));})();
