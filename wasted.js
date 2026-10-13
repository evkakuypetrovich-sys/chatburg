/* WASTED-style gag overlay: each button type has its own phrase + sound (real CC0/PD recordings, see assets/CREDITS.txt). Real action still happens. */
(function(){
var css=document.createElement("style");css.textContent=
"#wst{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity .4s}"+
"#wst.on{opacity:1}#wst .band{position:absolute;left:0;right:0;top:50%;height:min(34vh,190px);transform:translateY(-50%);background:linear-gradient(90deg,rgba(0,0,0,.25),rgba(0,0,0,.8) 25%,rgba(0,0,0,.8) 75%,rgba(0,0,0,.25))}"+
"#wst b{position:relative;max-width:94vw;text-align:center;overflow-wrap:anywhere;font:900 clamp(30px,11vw,150px)/1.05 Impact,'Arial Black',sans-serif;color:#c8102e;letter-spacing:.03em;text-transform:uppercase;text-shadow:0 0 2px #000,3px 3px 0 #000,0 0 30px rgba(0,0,0,.9);transform:scale(2.4);opacity:0;transition:transform 1.1s cubic-bezier(.15,.8,.3,1) .25s,opacity .5s .25s}"+
"#wst.on b{transform:scale(1);opacity:1}"+
"html.wasted body>*:not(#wst){filter:grayscale(1) blur(2px);transition:filter 1s}";
document.head.appendChild(css);
/* [phrase, sound file] */
var G={win:["ты 200","wasted"],apk:["тебя забурмалдили","wasted1"],gh:["ты обкакан","wasted2"],itch:["ты банан","wasted3"],dc:["ты бабушка люся","wasted4"],nav:["я пукнул","wasted5"],ext:["ты сбежал 🏃","g_ext"]};
function kind(a){var h=a.href,t=(a.textContent||"")+" "+(a.getAttribute("data-en")||"");
 if(/\.apk(\?|$)/i.test(h)||/android/i.test(t))return"apk";
 if(/windows/i.test(t)||/_Windows\.zip$/i.test(h))return"win";
 if(/itch\.io/i.test(h))return"itch";
 if(/github\.com/i.test(h))return"gh";
 if(/discord\.(gg|com)/i.test(h))return"dc";
 if(a.origin===location.origin&&!a.hash&&a.pathname!==location.pathname)return"nav";
 if(/^https?:/.test(h)&&a.origin!==location.origin)return"ext";
 return null}
var snd=null;function play(f){try{if(snd)snd.pause();snd=new Audio();snd.src="assets/"+f+"."+(snd.canPlayType('audio/ogg; codecs="vorbis"')?"ogg":"mp3")+"?v=3";var p=snd.play();p&&p.catch&&p.catch(function(){})}catch(e){}}
var el,tm;function close(){if(!el)return;clearTimeout(tm);document.documentElement.classList.remove("wasted");var e=el;el=null;e.classList.remove("on");setTimeout(function(){e.remove()},400)}
function show(g){close();el=document.createElement("div");el.id="wst";el.innerHTML='<div class="band"></div><b></b>';el.querySelector("b").textContent=g[0];el.onclick=close;document.body.appendChild(el);document.documentElement.classList.add("wasted");el.offsetWidth;el.classList.add("on");play(g[1]);tm=setTimeout(close,4000)}
window.wastedShow=function(t,s){show([t,s])};
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.button)return;var k=kind(a);if(!k)return;
 show(G[k]);if(a.target==="_blank")return; /* new tab opens right away */
 e.preventDefault();var h=a.href;setTimeout(function(){location.href=h},2500)},true);
})();
