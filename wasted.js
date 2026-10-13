/* «ты 200» WASTED-style overlay on "Download for Windows" clicks. Original synthesized sound. */
(function(){
var css=document.createElement("style");css.textContent=
"#wst{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity .4s}"+
"#wst.on{opacity:1}#wst .band{position:absolute;left:0;right:0;top:50%;height:min(30vh,170px);transform:translateY(-50%);background:linear-gradient(90deg,rgba(0,0,0,.25),rgba(0,0,0,.8) 25%,rgba(0,0,0,.8) 75%,rgba(0,0,0,.25))}"+
"#wst b{position:relative;font:900 clamp(56px,16vw,180px)/1 Impact,'Arial Black',sans-serif;color:#c8102e;letter-spacing:.04em;text-transform:uppercase;text-shadow:0 0 2px #000,3px 3px 0 #000,0 0 30px rgba(0,0,0,.9);transform:scale(2.4);opacity:0;transition:transform 1.1s cubic-bezier(.15,.8,.3,1) .25s,opacity .5s .25s}"+
"#wst.on b{transform:scale(1);opacity:1}"+
"html.wasted body>*:not(#wst){filter:grayscale(1) blur(2px);transition:filter 1s}";
document.head.appendChild(css);
var snd=null;function play(){try{if(!snd){snd=new Audio();snd.src=snd.canPlayType('audio/ogg; codecs="vorbis"')?"assets/wasted.ogg":"assets/wasted.mp3";}snd.currentTime=0;var p=snd.play();p&&p.catch&&p.catch(function(){})}catch(e){}}
var el,tm;function close(){if(!el)return;clearTimeout(tm);document.documentElement.classList.remove("wasted");var e=el;el=null;e.classList.remove("on");setTimeout(function(){e.remove()},400)}
function show(){close();el=document.createElement("div");el.id="wst";el.innerHTML='<div class="band"></div><b>ты 200</b>';el.onclick=close;document.body.appendChild(el);document.documentElement.classList.add("wasted");el.offsetWidth;el.classList.add("on");play();tm=setTimeout(close,4000)}
function isWin(a){var t=(a.textContent||"")+" "+(a.getAttribute("data-en")||"");return /windows/i.test(t)||/_Windows\.zip$/i.test(a.href)}
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(!a||!isWin(a)||e.ctrlKey||e.metaKey||e.shiftKey)return;
show();if(a.target==="_blank")return; /* new tab opens normally */
e.preventDefault();var h=a.href;setTimeout(function(){location.href=h},2500)},true);
})();
