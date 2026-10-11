const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll(".vshots").forEach(d=>d.innerHTML=d.dataset.set.split(",").map(n=>`<button><img loading="lazy" src="img/v/${n}.webp" alt="${n}" width="320" height="180"></button>`).join(""));
const lb=document.getElementById("lb"),li=lb.querySelector("img");
document.addEventListener("click",e=>{const b=e.target.closest(".vshots button");if(b){li.src=b.querySelector("img").src;lb.hidden=false;requestAnimationFrame(()=>lb.classList.add("show"))}});
const close=()=>{lb.classList.remove("show");setTimeout(()=>lb.hidden=true,250)};lb.onclick=e=>{if(e.target!==li)close()};addEventListener("keydown",e=>{if(e.key=="Escape")close()});
document.querySelectorAll(".cmp").forEach(f=>{f.insertAdjacentHTML("afterbegin",`<div class="cmpbox" style="--p:50%"><img src="img/v/${f.dataset.a}.webp" alt="до" decoding="async" width="1280" height="720"><img class="b" src="img/v/${f.dataset.b}.webp" alt="после" decoding="async" width="1280" height="720"><span class="lbl l">ДО</span><span class="lbl r">ПОСЛЕ</span><div class="knob"></div><input type="range" min="0" max="100" value="50" aria-label="сравнение"></div>`);
 const box=f.querySelector(".cmpbox");box.querySelector("input").oninput=e=>box.style.setProperty("--p",e.target.value+"%")});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll(".rv").forEach(s=>RM?s.classList.add("in"):io.observe(s));
