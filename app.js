const T=(r,e)=>({ru:r,en:e});
const F=[["💸",T("Зрители покупают дома","Viewers buy houses"),T("!дом — и у зрителя свой домик с ником, цветом, крышей и садом.","!дом — a viewer gets a house with nickname, colour, roof and garden.")],
["🏗️",T("Живая стройка","Live construction"),T("Техника, строители и прораб, который матерится (запикано).","Machinery, builders and a swearing foreman (bleeped).")],
["✏️",T("Карандашные дороги","Pencil roads"),T("Дорога рисуется карандашом прямо по карте, потом приезжают каток и асфальт.","Draw roads with a pencil, then rollers and asphalt arrive.")],
["📒",T("Каталог «Стройка»","«Стройка» catalog"),T("Тетрадка с washi-скотчем: 52 стиля, 11 перьев, все категории зданий.","Notebook with washi tape: 52 styles, 11 pens, every building type.")],
["🚗",T("Дрифт и погони","Drift & chases"),T("Следы шин, дрифтеры, полиция и !погоня по районам.","Tyre marks, drifters, police and !погоня chases.")],
["❄️",T("Зима","Winter"),T("Снег, сугробы, метель по команде !метель.","Snow, drifts and blizzards on !метель.")],
["🦄",T("Редкие мем-жители","Rare meme citizens"),T("Шанс от 1/100 до 1/2000 — собери всю коллекцию.","Odds from 1/100 to 1/2000 — catch them all.")],
["🚙",T("Машины-пародии","Parody cars"),T("Узнаваемые, но не те самые. Без чужих логотипов.","Recognizable, but not quite. No real logos.")],
["🚆",T("Поезда","Trains"),T("Рельсы с плавными дугами и депо.","Rails with smooth curves and depots.")],
["✈️",T("Самолёты с баннерами","Planes with banners"),T("!баннер — и над городом летит твоё сообщение.","!баннер — your message flies over the city.")],
["🎖️",T("Парад","Army parade"),T("!парад: техника марширует по главной улице.","!парад: vehicles march down the main street.")],
["🧩",T("Моды Steam Workshop","Steam Workshop mods"),T("Мод-мейкер, зимний и мем-паки, свои стили и модели.","Mod maker, winter & meme packs, custom styles and models.")]];
const S=[["225_sunset_after","Закат над водой"],["225_golden_after","Золотой час"],["225_night_after","Ночь"],["225_bluehour_after","Синий час"],["224b_after_water_grass","Вода и трава"],["300_build_button","Меню стройки"],["301_build_b_res","Жилые дома"],["301_build_parks","Парки"],["301_build_roads","Дороги"],["210b_after_catalog_all","Каталог «Стройка»"],["210d_after_catalog_landmarks","Достопримечательности"],["202_after_road_pencil","Карандашная дорога"],["310_site_power_plant","Стройка электростанции"],["311_site_highrise","Стройка высотки"],["320_roadworks_gravel","Дорожные работы: щебень"],["321_roadworks_asphalt","Асфальт"],["322_roadworks_markings","Разметка"],["323_roadworks_foreman","Прораб (запикано)"],["340_drift_marks","Следы дрифта"],["cars_v3_sample","Машины-пародии"]];
const C=[["!дом","купить дом","buy a house"],["!цвет красный","цвет дома","house colour"],["!крыша купол","крыша","roof"],["!стиль киберпанк","стиль дома","house style"],["!этаж","ещё этаж","add a floor"],["!декор фламинго","декор во дворе","yard decor"],["!забор неон","забор","fence"],["!сад пруд","сад","garden"],["!флаг …","флаг на доме","flag"],["!табличка текст","табличка","sign"],["!растянуть","растянуть дом","stretch house"],["!свет","свет в окнах","lights"],["!гости ник","в гости к другу","visit a friend"],["!работа","устроиться на работу","get a job"],["!бизнес кафе [имя]","открыть бизнес","open a business"],["!построить парк","предложить стройку","build for the city"],["!сдать 50 / стоп","сдать дом в аренду","rent out"],["!снять [ник]","снять жильё","rent a home"],["!баланс","монеты","coins"],["!стат","статистика","stats"],["!топ","топ богачей","leaderboard"],["!дать ник 100","перевести монеты","give coins"],["!свадьба ник / !да / !развод","ЗАГС «Горько!»","wedding"],["!вечеринка","вечеринка","party"],["!фейерверк","фейерверк","fireworks"],["!лазершоу","лазер-шоу","laser show"],["!парад","парад","parade"],["!нло","НЛО","UFO"],["!метеорит","метеорит","meteor"],["!метель","метель","blizzard"],["!погода","погода","weather"],["!погоня","погоня","chase"],["!баннер текст","самолёт с баннером","banner plane"],["!тур","экскурсия камерой","camera tour"],["!улица","назвать улицу","name a street"],["!трек ссылка","заказать музыку","request a track"],["!помощь","список команд","help"]];
const L=[T("Живые стройки: техника, строители, прораб с запиканным матом, леса и подъём этажей","Live construction sites: machinery, builders, bleeped foreman, scaffolding"),T("Дорожные работы по этапам: щебень → асфальт → разметка","Staged roadworks: gravel → asphalt → markings"),T("Карандашное превью дорог со стоимостью у курсора","Pencil road preview with cost near the cursor"),T("«Растянуть дом» (Y): рисуешь прямоугольник — дом заполняет участок","Stretch-a-house (Y): drag a lot, the house fills it"),T("Перья стилей Ctrl+1…9: 52 стиля в 11 перьях","Style pens Ctrl+1…9: 52 styles in 11 pens"),T("Каталог «Стройка» (J) в виде тетрадки с картинками зданий","«Стройка» notebook catalog (J) with building cards"),T("Уютный HUD: пузырь «Город говорит», клавиши-подсказки","Cozy HUD: «The city says» bubble, key-cap strip"),T("Режим «карандаш» (ink mode) поверх cel-shading","Ink (pencil sketch) mode on top of cel-shading"),T("Трафик-ИИ, дрифтеры, следы шин, эвакуатор и штрафстоянка","Traffic AI, drifters, tyre marks, tow truck and impound"),T("Зима, снег и метель; новые пресеты графики","Winter, snow and blizzards; new graphics presets"),T("Реальный масштаб, рельеф, холмы и земляные работы","Real scale, terrain, hills and earthworks"),T("Поезда, самолёты с баннерами, новые мем-персонажи","Trains, banner planes, new meme characters"),T("Окна загораются по одному вечером, закаты и синий час","Windows light up one by one, sunsets and blue hour"),T("Зум к курсору, инерция камеры, меньше спама событий","Zoom to cursor, camera inertia, less event spam")];
const R=[T("ОС: Windows 10/11 64-bit","OS: Windows 10/11 64-bit"),T("Видеокарта с Vulkan (или режим OpenGL — Chatburg_compat.bat)","GPU with Vulkan (or OpenGL via Chatburg_compat.bat)"),T("ОЗУ: 4 ГБ (8 ГБ рекомендуется)","RAM: 4 GB (8 GB recommended)"),T("Место: ~1 ГБ","Disk: ~1 GB"),T("Интернет — только для Twitch-чата","Internet — only for Twitch chat")];
const Q=[[T("Это бесплатно?","Is it free?"),T("Да, скачивай с GitHub или itch.io.","Yes, grab it from GitHub or itch.io.")],[T("Нужен ли ключ/токен Twitch?","Do I need a Twitch token?"),T("Нет — достаточно ввести имя канала, игра читает чат анонимно.","No — just enter your channel name, chat is read anonymously.")],[T("Чёрный экран / слабый ПК","Black screen / weak PC"),T("Запусти Chatburg_compat.bat (OpenGL) и выбери пресет «очень низкие».","Run Chatburg_compat.bat (OpenGL) and pick the «very low» preset.")],[T("Можно без стрима?","Can I play without streaming?"),T("Да, режим «Соло» — обычный градостроитель.","Yes, Solo mode is a regular city-builder.")],[T("Мат на стриме не забанят?","Will swearing get me banned?"),T("Прораб всегда запикан, а банворды из чата заменяются на «(тут банворд)».","The foreman is always bleeped and chat banwords are replaced.")],[T("Как ставить моды?","How to install mods?"),T("Положи в папку mods рядом с игрой; свои — через Мод-мейкер.","Drop them into the mods folder; make your own in the Mod maker.")],[T("Где сохранения?","Where are saves?"),T("%APPDATA%\\Godot\\app_userdata\\Chatburg\\","%APPDATA%\\Godot\\app_userdata\\Chatburg\\")]];
let lang=localStorage.getItem("cb_lang")||"ru";const $=s=>document.querySelector(s);
function render(){document.documentElement.lang=lang;$("#lang").textContent=lang=="ru"?"EN":"RU";
document.querySelectorAll("[data-ru]").forEach(e=>e.textContent=e.dataset[lang]);
$("#fgrid").innerHTML=F.map(([e,h,p])=>`<div class="f"><div class="e">${e}</div><h3>${h[lang]}</h3><p>${p[lang]}</p></div>`).join("");
$("#cmds").innerHTML=C.map(c=>`<div class="cmd"><code>${c[0]}</code> — ${lang=="ru"?c[1]:c[2]}</div>`).join("");
$("#log").innerHTML=L.map(x=>`<li>${x[lang]}</li>`).join("");$("#reqs").innerHTML=R.map(x=>`<li>${x[lang]}</li>`).join("");
$("#faqs").innerHTML=Q.map(([q,a])=>`<details><summary>${q[lang]}</summary><p>${a[lang]}</p></details>`).join("");}
$("#gal").innerHTML=S.map(([f,c],i)=>`<button data-i="${i}"><img loading="lazy" src="img/${f}_t.webp" alt="${c}" width="640" height="400"></button>`).join("");
let cur=0;const lb=$("#lb");function show(i){cur=(i+S.length)%S.length;lb.querySelector("img").src=`img/${S[cur][0]}.webp`;lb.querySelector("p").textContent=S[cur][1];lb.hidden=false}
$("#gal").onclick=e=>{const b=e.target.closest("button");if(b)show(+b.dataset.i)};
lb.querySelector(".x").onclick=()=>lb.hidden=true;lb.querySelector(".pv").onclick=()=>show(cur-1);lb.querySelector(".nx").onclick=()=>show(cur+1);
lb.onclick=e=>{if(e.target==lb)lb.hidden=true};document.onkeydown=e=>{if(lb.hidden)return;if(e.key=="Escape")lb.hidden=true;if(e.key=="ArrowLeft")show(cur-1);if(e.key=="ArrowRight")show(cur+1)};
$("#lang").onclick=()=>{lang=lang=="ru"?"en":"ru";localStorage.setItem("cb_lang",lang);render()};render();
/* ---- v3 animations ---- */
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
document.getElementById("ncmd").dataset.n=C.length;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;io.unobserve(t);t.classList.add("in");
 t.querySelectorAll("[data-n]").forEach(b=>{const n=+b.dataset.n;if(RM){b.textContent=n;return}const t0=performance.now();const f=now=>{const k=Math.min(1,(now-t0)/1400);b.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)})}),{threshold:.12});
document.querySelectorAll(".rv,.stats").forEach(s=>io.observe(s));
if(!RM){const L=[...document.querySelectorAll(".layer")],sp=[.15,.3,.45];let tk=0;
 addEventListener("scroll",()=>{if(tk)return;tk=requestAnimationFrame(()=>{const y=scrollY;if(y<800)L.forEach((l,i)=>l.style.transform=`translate3d(0,${y*sp[i]}px,0)`);tk=0})},{passive:true});
 document.addEventListener("pointermove",e=>{const c=e.target.closest&&e.target.closest(".f");document.querySelectorAll(".f.tilt").forEach(x=>{if(x!==c){x.style.transform="";x.classList.remove("tilt")}});if(!c)return;
  const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.classList.add("tilt");c.style.transform=`perspective(600px) rotateY(${x*14}deg) rotateX(${-y*14}deg) scale(1.04)`},{passive:true});}
/* smooth lightbox */
const _show=show;show=i=>{_show(i);requestAnimationFrame(()=>lb.classList.add("show"))};
const close=()=>{lb.classList.remove("show");setTimeout(()=>lb.hidden=true,250)};
lb.querySelector(".x").onclick=close;lb.onclick=e=>{if(e.target==lb)close()};
document.addEventListener("keydown",e=>{if(e.key=="Escape"&&!lb.hidden){e.stopImmediatePropagation();close()}},true);
/* confetti */
const cv=document.getElementById("confetti"),cx=cv.getContext("2d");let P=[];
function burst(x,y){if(RM)return;cv.width=innerWidth;cv.height=innerHeight;const cols=["#ff5a5f","#ffd23f","#3ecf8e","#4d9de0","#9b5de5"];
 for(let i=0;i<90;i++)P.push({x,y,vx:(Math.random()-.5)*12,vy:-Math.random()*12-4,r:Math.random()*6+3,c:cols[i%5],a:Math.random()*6,l:90});
 if(P.length<=90)requestAnimationFrame(step)}
function step(){cx.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.l-->0);P.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.a+=.2;cx.save();cx.translate(p.x,p.y);cx.rotate(p.a);cx.fillStyle=p.c;cx.fillRect(-p.r,-p.r/2,p.r*2,p.r);cx.restore()});if(P.length)requestAnimationFrame(step);else cx.clearRect(0,0,cv.width,cv.height)}
document.getElementById("dl").addEventListener("click",e=>burst(e.clientX,e.clientY));
fetch("play/version.json",{cache:"no-store"}).then(r=>r.json()).then(v=>{document.getElementById("playsize").textContent=`web v${v.version} · ~45 МБ`}).catch(()=>{});

/* ---- video section collapse ---- */
(function(){
  const sec=document.getElementById("video"),btn=document.getElementById("vtoggle"),panel=document.getElementById("vcoll");
  if(!sec||!btn||!panel)return;
  const KEY="cb_video_collapsed";
  const labels={open:{ru:"Свернуть ▲",en:"Collapse ▲"},shut:{ru:"Развернуть ▼",en:"Expand ▼"}};
  function pauseVids(){sec.querySelectorAll("video").forEach(v=>{try{v.pause()}catch(_){}})}
  function apply(collapsed,persist){
    panel.classList.toggle("is-collapsed",collapsed);
    btn.setAttribute("aria-expanded",collapsed?"false":"true");
    const L=collapsed?labels.shut:labels.open;
    btn.dataset.ru=L.ru;btn.dataset.en=L.en;
    btn.textContent=L[typeof lang!=="undefined"?lang:"ru"]||L.ru;
    if(collapsed)pauseVids();
    if(persist!==false){if(collapsed)localStorage.setItem(KEY,"1");else localStorage.removeItem(KEY)}
  }
  function expand(){apply(false)}
  apply(localStorage.getItem(KEY)==="1",false);
  btn.addEventListener("click",()=>apply(panel.classList.contains("is-collapsed")?false:true));
  function maybeExpandFromHash(){if(location.hash==="#video")expand()}
  maybeExpandFromHash();
  addEventListener("hashchange",maybeExpandFromHash);
  document.querySelectorAll('a[href="#video"]').forEach(a=>a.addEventListener("click",()=>expand()));
})();
