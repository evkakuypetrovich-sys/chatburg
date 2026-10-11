/* Decorations: sky windows, birds, mascot, typewriter, ticker, live city canvas, footer builders, sparkles, doodles parallax, Konami banana cars, music toggle. */
(()=>{const RM=matchMedia("(prefers-reduced-motion: reduce)").matches,$=s=>document.querySelector(s),RU=()=>document.documentElement.lang!=="en";
const scene=$(".scene");
if(scene){scene.insertAdjacentHTML("afterbegin",'<div class="stars"></div><div class="moon"></div>');
 for(let i=0;i<3;i++)scene.insertAdjacentHTML("beforeend",`<div class="bird" style="animation-delay:${-i*9}s;top:${80+i*25}px"></div>`);
 // windows on the mid skyline: light up one by one at night
 const mid=scene.querySelector(".mid g");if(mid){let k=0;mid.querySelectorAll("rect").forEach(r=>{const x=+r.getAttribute("x"),y=+r.getAttribute("y"),w=+r.getAttribute("width"),h=+r.getAttribute("height");
  for(let yy=y+14;yy<y+h-20;yy+=26)for(let xx=x+10;xx<x+w-14;xx+=20){const el=document.createElementNS("http://www.w3.org/2000/svg","rect");Object.entries({x:xx,y:yy,width:10,height:14,class:"win"}).forEach(([a,b])=>el.setAttribute(a,b));el.style.animationDelay=(-(k++*37%100)/100*2.4)+"s";mid.appendChild(el)}})}
 scene.insertAdjacentHTML("beforeend",`<div class="mascot" aria-hidden="true"><span class="bubble">Привет, чат! 👋</span><svg viewBox="0 0 100 130"><g stroke="#2a1a4a" stroke-width="3" stroke-linejoin="round">
 <path d="M50 30 L38 4 L48 18 L50 0 L54 18 L64 4 Z" fill="#3ecf8e"/><ellipse cx="50" cy="78" rx="34" ry="46" fill="#f7b733"/>
 <path d="M24 56l52 0M20 78h60M24 100h52M38 36l-8 80M62 36l8 80" stroke="#c98a1a" stroke-width="2" fill="none"/>
 <path d="M40 124v-26a10 10 0 0 1 20 0v26" fill="#6b3fa0"/><circle cx="36" cy="66" r="8" fill="#7ec8f0"/><circle cx="64" cy="66" r="8" fill="#7ec8f0"/>
 <circle cx="36" cy="66" r="3" fill="#2a1a4a" stroke="none"/><circle cx="64" cy="66" r="3" fill="#2a1a4a" stroke="none"/><path d="M42 84q8 7 16 0" fill="none"/>
 <g class="arm"><path d="M78 78 L94 56" stroke-width="6" stroke-linecap="round"/><circle cx="95" cy="54" r="6" fill="#ffe0b0"/></g></g></svg></div>`)}
// typewriter tagline (text stays in the DOM for SEO / no-JS)
const tag=$(".hero .tag");if(tag&&!RM){const full=tag.textContent;tag.style.minHeight=tag.offsetHeight+"px";tag.textContent="";tag.classList.add("tw");let i=0;
 const ty=()=>{tag.textContent=full.slice(0,++i);if(i<full.length)setTimeout(ty,full[i-1]==" "?60:28);else setTimeout(()=>tag.classList.remove("tw"),2500)};setTimeout(ty,500);
 new MutationObserver(()=>{}).observe(tag,{childList:true})}
// stats ticker
const stats=$(".stats");if(stats){const items=RU()?["🏠 <b>1663</b> зданий","🚗 <b>510</b> машин","🦄 <b>154</b> редких жителя","💬 <b>37</b> команд чата","👷 прораб матерится <b>(запикано)</b>","🍍 ананасовый дом <b>в наличии</b>","🚆 поезда ходят <b>по расписанию*</b>","✈️ баннер: <b>!дом — купи домик</b>","🏁 дрифт <b>одобрен ДПС</b>"]:["🏠 <b>1663</b> buildings","🚗 <b>510</b> cars","🦄 <b>154</b> rare citizens","💬 <b>37</b> chat commands","👷 foreman swearing <b>(bleeped)</b>","🍍 pineapple house <b>in stock</b>"];
 stats.insertAdjacentHTML("beforeend",`<div class="ticker" aria-hidden="true"><div>${items.map(x=>`<span>${x}</span>`).join("")}</div></div>`)}
// footer builders
const ft=$("footer");if(ft&&!RM){const b=(c,d)=>`<div class="builder" style="animation-delay:${d}s"><svg viewBox="0 0 30 46" width="30" height="46"><g stroke="#2a1a4a" stroke-width="2"><path d="M7 10a8 8 0 0 1 16 0z" fill="${c}"/><circle cx="15" cy="15" r="6" fill="#ffe0b0"/><path d="M9 17q6 12 12 0" fill="#6b4a2a"/><rect x="9" y="22" width="12" height="13" rx="3" fill="#ff8c2a"/><path d="M11 35l-2 10M19 35l2 10" stroke-width="3"/></g></svg></div>`;
 ft.insertAdjacentHTML("afterbegin",b("#ffd23f",0)+b("#ffd23f",-6)+b("#f7b733",-13)+b("#ffd23f",-19))}
// live city strip with a drifting car leaving tire marks
if(ft){ft.insertAdjacentHTML("beforebegin",'<div class="livecity" aria-hidden="true"><canvas></canvas></div>');const cv=$(".livecity canvas"),cx=cv.getContext("2d");let W,H,marks=[],t=0,vis=true;
 const rs=()=>{W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight};rs();addEventListener("resize",rs);
 new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(cv);
 const houses=[...Array(40)].map((_,i)=>({x:i*70+10,w:40+(i*13%20),h:30+(i*29%50),c:["#6b3fa0","#ff8c2a","#7ec8f0","#f7b733","#ff5a5f","#3ecf8e"][i%6]}));
 const cars=[...Array(5)].map((_,i)=>({x:i*300,v:1.2+i*.35,lane:i%2,c:["#ff5a5f","#7ec8f0","#3ecf8e","#f7b733","#6b3fa0"][i]}));const dr={x:-100,y:0,a:0,ph:0};
 function car(x,y,c,a){cx.save();cx.translate(x,y);cx.rotate(a);cx.fillStyle=c;cx.strokeStyle="#2a1a4a";cx.lineWidth=2.5;cx.beginPath();cx.roundRect(-18,-8,36,16,5);cx.fill();cx.stroke();cx.fillStyle="#cfe8ff";cx.fillRect(2,-6,8,12);cx.restore()}
 function draw(){requestAnimationFrame(draw);if(!vis)return;t++;cx.clearRect(0,0,W,H);const road=H-50;
  houses.forEach(h=>{const x=(h.x-t*.2)%(W+100);const X=x<-60?x+W+140:x;cx.fillStyle=h.c;cx.strokeStyle="#2a1a4a";cx.lineWidth=2.5;cx.fillRect(X,road-h.h-8,h.w,h.h);cx.strokeRect(X,road-h.h-8,h.w,h.h);cx.fillStyle="#ffd23f";cx.fillRect(X+8,road-h.h,8,8)});
  cx.fillStyle="#3b4256";cx.fillRect(0,road,W,44);cx.strokeStyle="#fff";cx.setLineDash([20,16]);cx.lineWidth=2;cx.beginPath();cx.moveTo(0,road+22);cx.lineTo(W,road+22);cx.stroke();cx.setLineDash([]);
  marks.forEach(m=>{m.l-=.004;cx.fillStyle=`rgba(20,15,30,${Math.max(0,m.l)*.6})`;cx.fillRect(m.x,m.y,3,3)});marks=marks.filter(m=>m.l>0);
  cars.forEach(c=>{c.x+=c.lane?-c.v:c.v;if(c.x>W+40)c.x=-40;if(c.x<-40)c.x=W+40;car(c.x,road+(c.lane?33:11),c.c,c.lane?Math.PI:0)});
  dr.x+=3.2;dr.ph+=.05;const drift=Math.sin(dr.ph);dr.y=road+22+drift*10;dr.a=drift*.5;if(dr.x>W+60){dr.x=-80;}
  if(Math.abs(drift)>.4){for(const s of[-1,1])marks.push({x:dr.x-14*Math.cos(dr.a)-s*7*Math.sin(dr.a),y:dr.y-14*Math.sin(dr.a)+s*7*Math.cos(dr.a),l:1})}
  car(dr.x,dr.y,"#ff8c2a",dr.a);if(Math.abs(drift)>.6){cx.fillStyle="rgba(255,255,255,.5)";cx.beginPath();cx.arc(dr.x-24,dr.y,6+Math.random()*4,0,7);cx.fill()}}
 if(!RM)draw();else{rs();t=0;vis=true;draw=()=>{};}}
// doodle parallax background
const dd=document.createElement("div");dd.className="doodles";document.body.prepend(dd);
if(!RM){let tk=0;addEventListener("scroll",()=>{if(tk)return;tk=requestAnimationFrame(()=>{dd.style.transform=`translate3d(0,${-scrollY*.08}px,0)`;tk=0})},{passive:true});
 // sparkles on buttons
 let last=0;document.addEventListener("pointermove",e=>{const b=e.target.closest&&e.target.closest(".btn");if(!b)return;const n=performance.now();if(n-last<60)return;last=n;
  const s=document.createElement("i");s.className="spark";s.style.left=e.clientX+"px";s.style.top=e.clientY+"px";s.style.setProperty("--dx",(Math.random()*40-20)+"px");s.style.setProperty("--dy",(Math.random()*-40)+"px");document.body.appendChild(s);setTimeout(()=>s.remove(),700)},{passive:true})}
// Easter egg: type «банан» (or "banan" / ",fyfy" on the wrong layout), Konami code, or tap a 🍌 button
function bananas(){const t=document.createElement("div");t.className="konami-toast";t.textContent=RU()?"🍌 Банановозы выехали на линию!":"🍌 Banana cars incoming!";document.body.appendChild(t);setTimeout(()=>t.remove(),3500);
 const n=RM?8:30;for(let i=0;i<n;i++){const b=document.createElement("div");b.className="banana";b.textContent=i%3?"🍌":"🚗";b.style.left=Math.random()*100+"vw";b.style.animationDuration=(2+Math.random()*2.5)+"s";b.style.animationDelay=Math.random()*1.5+"s";document.body.appendChild(b);setTimeout(()=>b.remove(),6500)}}
window.cbBananas=bananas;
const K=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];let ki=0,buf="";
const WORDS=["банан","banan",",fyfy"];
addEventListener("keydown",e=>{const tg=e.target;if(tg&&(tg.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName)))return;
 if(e.key.length===1){buf=(buf+e.key.toLowerCase()).slice(-5);if(WORDS.includes(buf)){buf="";bananas();return}}
 ki=(e.key.toLowerCase()===K[ki].toLowerCase())?ki+1:(e.key===K[0]?1:0);if(ki===K.length){ki=0;bananas()}});
// visible 🍌 buttons (mascot + footer) for phones
const mas=document.querySelector(".mascot");if(mas){mas.style.pointerEvents="auto";mas.style.cursor="pointer";mas.setAttribute("role","button");mas.setAttribute("tabindex","0");mas.setAttribute("aria-label","🍌");mas.title=RU()?"Тыкни меня 🍌":"Poke me 🍌";
 mas.addEventListener("click",bananas);mas.addEventListener("keydown",e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();bananas()}})}
if(ft){const fb=document.createElement("button");fb.type="button";fb.className="banbtn";fb.textContent="🍌";fb.title=RU()?"Пасхалка!":"Easter egg!";fb.setAttribute("aria-label",fb.title);fb.onclick=bananas;ft.querySelector(".wrap").prepend(fb)}
// dismissible announcement under the hero
const hero=document.querySelector(".hero .cta");if(hero&&localStorage.getItem("cb_banana_hint")!=="1"){
 hero.insertAdjacentHTML("afterend",`<div class="bananote" role="note"><button type="button" class="bnt">🍌</button><span>${RU()?"Пасхалка: напиши «банан» на клавиатуре или тыкни на банан!":"Easter egg: type “banan” or tap the banana!"}</span><button type="button" class="bnx" aria-label="${RU()?"Скрыть":"Dismiss"}">✕</button></div>`);
 const n=document.querySelector(".bananote");n.querySelector(".bnt").onclick=bananas;n.querySelector(".bnx").onclick=()=>{localStorage.setItem("cb_banana_hint","1");n.classList.add("bye");setTimeout(()=>n.remove(),300)}}
// music toggle (muted by default, loads audio only on click)
const nav=$(".top");if(nav){const btn=document.createElement("button");btn.id="music";btn.type="button";btn.textContent="🔇";btn.title=RU()?"Музыка из игры":"Game music";btn.setAttribute("aria-pressed","false");
 (nav.querySelector("#lang")||nav.lastElementChild).after(btn);let au=null;
 btn.onclick=()=>{if(!au){au=new Audio("audio/theme.ogg");au.loop=true;au.volume=.35}if(au.paused){au.play().catch(()=>{});btn.textContent="🔊";btn.classList.add("on");btn.setAttribute("aria-pressed","true")}else{au.pause();btn.textContent="🔇";btn.classList.remove("on");btn.setAttribute("aria-pressed","false")}}}
})();
