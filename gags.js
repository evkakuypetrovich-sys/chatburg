/* Chatburg meme gags. Harmless, rate-limited, never block navigation/downloads.
   Sounds: CC0 / public domain, see assets/CREDITS.txt. */
(function(){
var D=document,W=window,ls=W.localStorage,RM=W.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches,TOUCH="ontouchstart"in W;
var css=D.createElement("style");css.textContent=
".gt{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:99990;background:#24304a;color:#fff;font:700 15px/1.3 system-ui,sans-serif;padding:10px 16px;border-radius:12px;border:3px solid #ffd23f;box-shadow:4px 4px 0 #000;max-width:90vw;text-align:center;animation:gtin .3s}@keyframes gtin{from{transform:translate(-50%,40px);opacity:0}}"+
".gbig{position:fixed;inset:0;z-index:99991;display:flex;align-items:center;justify-content:center;pointer-events:none}.gbig b{font:900 clamp(32px,11vw,140px)/1.05 Impact,'Arial Black',sans-serif;text-align:center;max-width:94vw;-webkit-text-stroke:2px #000;text-shadow:4px 4px 0 #000;animation:gbin .6s cubic-bezier(.2,1.6,.4,1)}@keyframes gbin{from{transform:scale(3);opacity:0}}"+
".gfall{position:fixed;top:-60px;z-index:99989;pointer-events:none;font-size:34px;animation:gfall linear forwards}@keyframes gfall{to{transform:translateY(110vh) rotate(540deg)}}"+
".gtrail{position:fixed;z-index:99988;pointer-events:none;font-size:20px;transform:translate(-50%,-50%);animation:gtr .8s forwards}@keyframes gtr{to{opacity:0;transform:translate(-50%,20px) scale(.4)}}"+
".grun{position:fixed;bottom:6px;z-index:99987;font-size:46px;pointer-events:auto;cursor:pointer;image-rendering:pixelated;animation:grun linear forwards}@keyframes grun{from{left:-80px}to{left:calc(100vw + 80px)}}"+
".grun.rtl{animation-name:grunr;transform:scaleX(-1)}@keyframes grunr{from{left:calc(100vw + 80px)}to{left:-80px}}"+
"html.gshake body{animation:gsh .5s 2}@keyframes gsh{25%{transform:translate(-8px,4px) rotate(-1deg)}50%{transform:translate(8px,-4px)}75%{transform:translate(-5px,-3px) rotate(1deg)}}"+
"html.gspin body{animation:gsp 1.2s ease-in-out}@keyframes gsp{to{transform:rotate(360deg)}}"+
"html.gflip body{transform:rotate(180deg);transition:transform .6s}html body{transition:transform .6s}"+
".gpop{position:fixed;inset:0;z-index:99995;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.45)}.gpop>div{background:#fffdf5;color:#24304a;border:4px solid #24304a;border-radius:16px;box-shadow:6px 6px 0 #000;padding:18px 20px;max-width:88vw;width:340px;text-align:center;font:600 16px/1.4 system-ui,sans-serif}"+
".gpop button{font:800 15px system-ui;margin:10px 6px 0;padding:9px 16px;border-radius:999px;border:3px solid #24304a;cursor:pointer}.gpop .ok{background:#3ecf8e}.gpop .no{background:#ff5a5f;color:#fff}"+
".gpop.virus>div{background:#c0c0c0;border-color:#000080;font-family:Tahoma,sans-serif}.gpop.virus h4{margin:-18px -20px 12px;background:#000080;color:#fff;padding:6px 10px;text-align:left;border-radius:10px 10px 0 0}"+
"#gfun{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;align-items:center;margin:20px auto 0;max-width:640px;padding:0 10px;position:relative;min-height:60px}"+
"#gfun .gnb{font:900 16px system-ui;background:#ff5a5f;color:#fff;border:3px solid #24304a;border-radius:999px;padding:10px 18px;box-shadow:3px 3px 0 #24304a;cursor:pointer;position:relative;transition:transform .15s}"+
"#gfun .gload{flex:1 1 220px;max-width:300px;font:700 13px system-ui;text-align:left}#gfun .gload button{font:800 14px system-ui;background:#4d9de0;color:#fff;border:3px solid #24304a;border-radius:10px;padding:8px 12px;cursor:pointer;width:100%}"+
"#gfun .gbar{height:16px;border:3px solid #24304a;border-radius:8px;background:#fff;margin-top:6px;overflow:hidden;display:none}#gfun .gbar i{display:block;height:100%;width:0;background:repeating-linear-gradient(45deg,#3ecf8e 0 10px,#2fb47a 10px 20px);transition:width .2s}"+
".gfact{position:fixed;left:12px;bottom:12px;z-index:99986;max-width:min(280px,70vw);background:#ffd23f;color:#24304a;border:3px solid #24304a;border-radius:12px;padding:8px 30px 8px 12px;font:600 13px/1.35 system-ui;box-shadow:3px 3px 0 #24304a;animation:gtin2 .4s}@keyframes gtin2{from{transform:translateX(-120%)}}.gfact button{position:absolute;right:4px;top:2px;border:0;background:none;font-size:16px;cursor:pointer}";
D.head.appendChild(css);
/* ---------- helpers ---------- */
var last={};function ok(k,ms){var n=Date.now();if(last[k]&&n-last[k]<ms)return false;last[k]=n;return true}
var cur=null;function snd(n,loop){try{var a=new Audio();a.src="assets/g_"+n+"."+(a.canPlayType('audio/ogg; codecs="vorbis"')?"ogg":"mp3")+"?v=1";a.loop=!!loop;var p=a.play();p&&p.catch&&p.catch(function(){});return a}catch(e){}}
function toast(t,ms){var e=D.createElement("div");e.className="gt";e.textContent=t;D.body.appendChild(e);setTimeout(function(){e.remove()},ms||2600)}
function big(t,color,ms){var e=D.createElement("div");e.className="gbig";e.innerHTML="<b></b>";e.firstChild.textContent=t;e.firstChild.style.color=color||"#ffd23f";D.body.appendChild(e);setTimeout(function(){e.remove()},ms||2200)}
function cls(c,ms){var h=D.documentElement;if(RM)return;h.classList.add(c);setTimeout(function(){h.classList.remove(c)},ms)}
function rain(list,n){if(RM)n=Math.min(n,8);for(var i=0;i<n;i++){var e=D.createElement("div");e.className="gfall";e.textContent=list[Math.random()*list.length|0];e.style.left=Math.random()*100+"vw";e.style.animationDuration=(2+Math.random()*2.5)+"s";e.style.animationDelay=Math.random()*1.2+"s";D.body.appendChild(e);setTimeout(function(x){return function(){x.remove()}}(e),5000)}}
function wasted(t,s){if(W.wastedShow)W.wastedShow(t,s);else big(t,"#c8102e")}
/* ---------- 1. Konami code ---------- */
var KC=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"],ki=0,typed="";
D.addEventListener("keydown",function(e){
 var k=e.key&&e.key.length==1?e.key.toLowerCase():e.key;
 ki=(k===KC[ki])?ki+1:(k===KC[0]?1:0);
 if(ki===KC.length){ki=0;snd("konami");big("ЧИТЕР ОБНАРУЖЕН 🕹️","#3ecf8e",2600);rain(["🍌","💩","🚗","💰","👵","💨"],40)}
 if(/input|textarea|select/i.test((e.target.tagName||""))||e.target.isContentEditable)return;
 if(e.key&&e.key.length==1){typed=(typed+e.key.toLowerCase()).slice(-12);
  /* 2. type 200 */ if(/200$/.test(typed)&&ok("t200",5000)){typed="";wasted("ТЫ 200","wasted")}
  /* 3. type банан / banana: cursor trail toggle */ if(/(банан|banana)$/.test(typed)){typed="";trail=!trail;toast(trail?"🍌💩 след включён (набери «банан» ещё раз, чтобы выключить)":"след выключен")}
  /* 4. type дождь / rain: emoji rain */ if(/(дождь|rain)$/.test(typed)&&ok("rain",4000)){typed="";snd("coin");rain(["💰","💸","🪙","🍌","💩"],35);toast("пошёл денежный дождь (ненастоящий)")}
  /* 5. type вирус / virus: fake virus popup */ if(/(вирус|virus)$/.test(typed)){typed="";virus()}
 }});
/* ---------- 6. logo clicked 10 times ---------- */
var lc=0,lt=0;D.addEventListener("click",function(e){var l=e.target.closest&&e.target.closest(".logo");if(!l)return;var n=Date.now();lc=n-lt<1500?lc+1:1;lt=n;if(lc>=10){lc=0;snd("spin");cls("gspin",1300);big("голова закружилась 🌀","#9b5de5")}});
/* ---------- 7. flip page: double-click / double-tap hero image ---------- */
D.addEventListener("dblclick",function(e){if(e.target.closest&&e.target.closest(".heroimg")&&ok("flip",5000)){snd("flip");toast("🙃 Австралийская версия сайта");cls("gflip",3000)}});
/* ---------- 8. cursor trail (desktop, toggled by typing «банан») ---------- */
var trail=false,tl=0;D.addEventListener("mousemove",function(e){if(!trail||TOUCH)return;var n=Date.now();if(n-tl<60)return;tl=n;var t=D.createElement("div");t.className="gtrail";t.textContent=Math.random()<.5?"🍌":"💩";t.style.left=e.clientX+"px";t.style.top=e.clientY+"px";D.body.appendChild(t);setTimeout(function(){t.remove()},800)});
/* ---------- 9. right click (menu still opens) ---------- */
D.addEventListener("contextmenu",function(){if(ok("rc",15000)){snd("sneeze");toast("апчхи! 🤧 правая кнопка — для слабаков")}});
/* ---------- 10. copy text ---------- */
D.addEventListener("copy",function(){if(ok("cp",15000)){snd("copy");toast("📸 скопировал? я всё видел. ты обкакан")}});
/* ---------- 11. tab title ---------- */
var T0=D.title,away=0;D.addEventListener("visibilitychange",function(){if(D.hidden){T0=D.title;away=Date.now();D.title="вернись 😭"}else{D.title=T0;if(Date.now()-away>3000&&ok("back",30000))toast("ура, вернулся 🥳")}});
/* ---------- 12. idle 60 s ---------- */
var it;function idle(){clearTimeout(it);it=setTimeout(function(){if(!D.hidden&&ok("idle",180000)){snd("snore");toast("ты тут? ты уснул? 😴",3500)}},60000)}
["mousemove","keydown","scroll","touchstart","click"].forEach(function(ev){W.addEventListener(ev,idle,{passive:true})});idle();
/* ---------- 13. scroll to the very bottom: shake (once per page) ---------- */
var shook=false;W.addEventListener("scroll",function(){if(shook)return;if(innerHeight+scrollY>=D.documentElement.scrollHeight-4){shook=true;snd("shake");cls("gshake",1000);toast("💥 дно пробито")}},{passive:true});
/* ---------- 14. pixel car / cat run across the bottom (rare, random) ---------- */
function runner(emoji,sound,txt,rtl){if(D.hidden)return;var c=D.createElement("div");c.className="grun"+(rtl?" rtl":"");c.textContent=emoji;c.style.animationDuration=(TOUCH?5:7)+"s";c.title=txt;c.onclick=function(){snd(sound);toast(txt)};D.body.appendChild(c);snd(sound);setTimeout(function(){c.remove()},8000)}
setTimeout(function(){runner("🐈","meow","мяу. кот проверил твой сайт ✅",true)},30000+Math.random()*60000);
setTimeout(function loop(){runner("🚗","horn","би-бип! это машина из Chatburg 🚗");setTimeout(loop,150000+Math.random()*120000)},90000+Math.random()*60000);
/* ---------- 15. random funny facts in the corner (max 4 per visit) ---------- */
var F=["Факт: 9 из 10 бабушек Люсь рекомендуют Chatburg.","Совет: если город развалился, это не баг, это прораб.","Факт: банан — это ягода. А ты — банан.","Совет: не нажимай красную кнопку. Серьёзно.","Факт: «бурмалда» не переводится ни на один язык.","Совет: набери «200» на клавиатуре. Или не набирай.","Факт: чат строит город быстрее, чем ты читаешь этот факт.","Совет: попробуй ↑↑↓↓←→←→BA.","Факт: прораба запикали 2 000 000 раз."],fn=0,fi=Math.random()*F.length|0;
function fact(){if(fn>=4)return;if(!D.hidden&&!D.querySelector(".gfact")){fn++;var e=D.createElement("div");e.className="gfact";e.innerHTML='<span></span><button aria-label="закрыть">✕</button>';e.firstChild.textContent="💡 "+F[fi++%F.length];e.lastChild.onclick=function(){e.remove()};D.body.appendChild(e);snd("tip");setTimeout(function(){e.remove()},9000)}setTimeout(fact,50000+Math.random()*40000)}
setTimeout(fact,25000);
/* ---------- 16. fake call from бабушка Люся (once per visit, after ~2 min) ---------- */
function pop(cl,html){var p=D.createElement("div");p.className="gpop "+cl;p.innerHTML="<div>"+html+"</div>";D.body.appendChild(p);return p}
function call(){if(D.hidden||D.querySelector(".gpop")){setTimeout(call,30000);return}var r=snd("ring",true);var p=pop("","<div style='font-size:48px'>👵📞</div><b>Входящий звонок</b><br>бабушка Люся<br><button class='ok'>Ответить</button><button class='no'>Сбросить</button>");
 function end(t){if(r)r.pause();p.remove();toast(t,3500)}var to=setTimeout(function(){end("пропущенный от бабушки Люси (1) 👵")},10000);
 p.querySelector(".ok").onclick=function(){clearTimeout(to);end("👵 «Внучок, ты покушал? Скачай Chatburg и надень шапку»")};
 p.querySelector(".no").onclick=function(){clearTimeout(to);end("👵 бабушка обиделась. пирожков не будет")}}
setTimeout(call,120000+Math.random()*60000);
/* ---------- 17. fake virus popup («вирус найден» → «шутка») ---------- */
function virus(){if(!ok("vir",8000))return;snd("alarm");var p=pop("virus","<h4>⚠ Защитник Chatburg</h4><b>ВИРУС НАЙДЕН:</b><br>burmalda.exe 💩<br><small>угроза: ты обкакан</small>");
 setTimeout(function(){p.firstChild.innerHTML="<div style='font-size:46px'>😜</div><b>ШУТКА</b><br><small>никаких вирусов нет</small><br><button class='ok'>ок</button>";p.querySelector(".ok").onclick=function(){p.remove()};p.onclick=function(e){if(e.target===p)p.remove()}},1300)}
D.addEventListener("click",function(e){if(e.detail===3&&e.target.closest&&e.target.closest("footer"))virus()});
/* ---------- 18-19. «не нажимай» runaway button + stuck loading bar (index only, near the slot machine) ---------- */
var slot=D.getElementById("slot");if(slot){var f=D.createElement("div");f.id="gfun";
 f.innerHTML='<button type="button" class="gnb">🚫 не нажимай</button><div class="gload"><button type="button">⬇ загрузить бурмалду</button><div class="gbar"><i></i></div><div class="gst"></div></div>';
 slot.parentNode.insertBefore(f,slot);var nb=f.querySelector(".gnb"),runs=0;
 nb.addEventListener("mouseenter",function(){if(TOUCH||runs>=6)return;runs++;snd("boing");var w=f.clientWidth-nb.offsetWidth;nb.style.transform="translate("+((Math.random()-.5)*w*.8|0)+"px,"+((Math.random()-.5)*60|0)+"px)";if(runs==6)nb.textContent="ладно, жми 😩"});
 nb.addEventListener("click",function(){runs=0;nb.style.transform="";nb.textContent="🚫 не нажимай";wasted("ты нажал. ты банан","wasted3")});
 var lb=f.querySelector(".gload button"),bar=f.querySelector(".gbar"),bi=bar.firstChild,st=f.querySelector(".gst"),busy=false;
 lb.onclick=function(){if(busy)return;busy=true;bar.style.display="block";var p=0;st.textContent="загрузка бурмалды 0%";
  var iv=setInterval(function(){p=Math.min(99,p+Math.random()*14+3|0);bi.style.width=p+"%";st.textContent="загрузка бурмалды "+p+"%";
   if(p>=99){clearInterval(iv);setTimeout(function(){st.textContent="загрузка бурмалды 99%… застряла 🫠";snd("fail");setTimeout(function(){st.textContent="ошибка: бурмалда слишком тяжёлая. попробуй через 200 лет";busy=false},2500)},1500)}},250)}}
})();
