/* All sounds: real CC0/public-domain recordings, see assets/CREDITS.txt.
   Evil laugh (assets/laugh.*): "Evil Laugh" by AntumDeluge, https://opengameart.org/content/evil-laugh, CC0 1.0 (public domain).
   Fake-coin slot machine. No real money. Balance in localStorage. */
(function(){
var root=document.getElementById("slot");if(!root)return;
var S=["🚗","🍌","💩","👵","💨","💰","200"],PAY={"200":100,"💰":50,"🚗":20,"👵":15,"🍌":10,"💨":8,"💩":5},K="chatburgSlotBal",H=72;
var css=document.createElement("style");css.textContent=
"#slot{margin:28px auto 10px;max-width:420px;padding:0 10px}"+
".sm{background:linear-gradient(#c0392b,#8e1b12);border:4px solid var(--ink,#24304a);border-radius:22px 22px 12px 12px;box-shadow:var(--sh,4px 4px 0 #24304a);padding:14px 14px 12px;color:#fff;position:relative;text-align:center;font-family:inherit}"+
".sm h3{margin:0 0 8px;font:900 22px/1 Impact,'Arial Black',sans-serif;letter-spacing:.08em;color:var(--yel,#ffd23f);text-shadow:2px 2px 0 #24304a}"+
".sm .bulbs{height:8px;margin:-4px 6px 8px;background:radial-gradient(circle,#ffd23f 3px,transparent 4px) 0 0/16px 8px;animation:smb 1s steps(2) infinite}@keyframes smb{50%{filter:brightness(.5)}}"+
".sm .win{display:flex;gap:6px;justify-content:center;background:#24304a;padding:8px;border-radius:10px;border:3px solid #ffd23f}"+
".sm .reel{width:72px;height:"+H+"px;overflow:hidden;background:linear-gradient(#ddd,#fff 30%,#fff 70%,#ddd);border-radius:6px}"+
".sm .strip{will-change:transform}.sm .strip div{height:"+H+"px;font-size:46px;line-height:"+H+"px}"+
".sm .ctl{display:flex;gap:8px;align-items:center;justify-content:center;margin:10px 0 6px;flex-wrap:wrap}"+
".sm .bal{background:#24304a;color:#3ecf8e;font:700 16px monospace;padding:6px 10px;border-radius:6px;min-width:110px}"+
".sm select{font:700 15px inherit;padding:5px;border-radius:6px;border:2px solid #24304a}"+
".sm .spin{font:900 18px Impact,'Arial Black',sans-serif;letter-spacing:.05em;background:#ffd23f;color:#24304a;border:3px solid #24304a;border-radius:999px;padding:8px 22px;box-shadow:0 4px 0 #24304a;cursor:pointer}"+
".sm .spin:active{transform:translateY(3px);box-shadow:0 1px 0 #24304a}.sm .spin:disabled{opacity:.6}"+
".sm .msg{min-height:20px;font-weight:700}.sm table{margin:6px auto 0;font-size:13px;border-collapse:collapse}.sm td{padding:1px 8px}"+
".sm .cap{font-size:11px;opacity:.85;margin-top:6px}"+
".sm .lever{position:absolute;right:-22px;top:40px;width:10px;height:90px;background:#888;border:2px solid #24304a;border-radius:5px;transform-origin:bottom;cursor:pointer;transition:transform .25s}"+
".sm .lever:before{content:'';position:absolute;top:-18px;left:-9px;width:24px;height:24px;border-radius:50%;background:#ff5a5f;border:2px solid #24304a}.sm .lever.pull{transform:scaleY(-.4)}"+
"@media(max-width:420px){.sm .reel{width:62px}.sm .lever{display:none}}"+
"#jkp{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);cursor:pointer}"+
"#jkp b{font:900 clamp(40px,14vw,160px)/1 Impact,'Arial Black',sans-serif;color:#ffd23f;text-shadow:0 0 3px #000,4px 4px 0 #8a5a00,0 0 40px #ffb300;animation:jk 1s cubic-bezier(.2,1.6,.4,1) both,jkp .5s .8s infinite alternate}"+
".sm .s200{font:900 34px Impact,'Arial Black',sans-serif;color:#c8102e;text-shadow:1px 1px 0 #24304a}"+"#blood{position:fixed;inset:0;z-index:100000;pointer-events:none;animation:bf 1s 4s forwards}#blood svg{width:100%;height:100%}@keyframes bf{to{opacity:0}}"+"#blood .d{animation:dr 3s ease-in forwards}@keyframes dr{from{transform:scaleY(.1)}}#blood .sp{animation:spl .25s ease-out both}@keyframes spl{from{transform:scale(.2);opacity:0}}"+"@keyframes jk{from{transform:scale(3) rotate(-10deg);opacity:0}}@keyframes jkp{to{transform:scale(1.08)}}";
document.head.appendChild(css);
var tr="<tr><td>3× <b style='color:#ffd23f'>200</b></td><td>×100</td><td colspan=2>(шанс 10%)</td></tr><tr><td>3× 💰</td><td>×50</td><td>3× 🚗</td><td>×20</td></tr><tr><td>3× 👵</td><td>×15</td><td>3× 🍌</td><td>×10</td></tr><tr><td>3× 💨</td><td>×8</td><td>3× 💩</td><td>×5</td></tr><tr><td colspan=4>любые 2 одинаковых — ×2</td></tr>";
root.innerHTML='<div class="sm"><div class="lever" title="SPIN"></div><h3>CHATBURG SLOTS</h3><div class="bulbs"></div><div class="win">'+
'<div class="reel"><div class="strip"></div></div><div class="reel"><div class="strip"></div></div><div class="reel"><div class="strip"></div></div></div>'+
'<div class="ctl"><span class="bal"></span><select aria-label="Ставка"><option>10</option><option selected>50</option><option>100</option><option>250</option></select><button type="button" class="spin">SPIN</button></div>'+
'<div class="msg"></div><table>'+tr+'</table><div class="cap">без реальных денег</div></div>';
var q=function(s){return root.querySelector(s)},strips=root.querySelectorAll(".strip"),bal=+localStorage.getItem(K);if(!(bal>=0)||localStorage.getItem(K)===null)bal=1000;
function upd(){localStorage.setItem(K,bal);q(".bal").textContent="🪙 "+bal}
function snd(n){try{var a=new Audio();a.src="assets/"+(n=="laugh"?"":"slot_")+n+"."+(a.canPlayType('audio/ogg; codecs="vorbis"')?"ogg":"mp3")+"?v=4";var p=a.play();p&&p.catch&&p.catch(function(){});return a}catch(e){}}
function rnd(){return S[Math.random()*S.length|0]}
function C(x){return "<div>"+(x=="200"?"<span class=s200>200</span>":x)+"</div>"}
function blood(){var w=innerWidth,h=innerHeight,g="";for(var i=0;i<26;i++){var x=Math.random()*w,y=Math.random()*h*.8,r=15+Math.random()*60;g+='<g class="sp" style="transform-origin:'+x+'px '+y+'px;animation-delay:'+(i*.04)+'s"><circle cx="'+x+'" cy="'+y+'" r="'+r+'"/>';for(var j=0;j<6;j++){var a=Math.random()*6.3,d=r*(1+Math.random()*.9);g+='<circle cx="'+(x+Math.cos(a)*d)+'" cy="'+(y+Math.sin(a)*d)+'" r="'+(2+Math.random()*r/4)+'"/>'}if(Math.random()<.6){var dw=4+Math.random()*r/3;g+='<rect class="d" style="transform-origin:'+x+'px '+y+'px" x="'+(x-dw/2)+'" y="'+y+'" width="'+dw+'" height="'+(60+Math.random()*h/2)+'" rx="'+dw/2+'"/>'}g+="</g>"}var b=document.createElement("div");b.id="blood";b.innerHTML='<svg viewBox="0 0 '+w+' '+h+'" fill="#8a0303" fill-opacity=".85">'+g+"</svg>";document.documentElement.appendChild(b);setTimeout(function(){b.remove()},5200)}
strips.forEach(function(s){s.innerHTML=C(rnd())});
var busy=false;
function spin(){if(busy)return;var bet=+q("select").value;
 if(bal<=0){bal=1000;upd();q(".msg").textContent="Бесплатное пополнение: +1000 🪙";return}
 if(bet>bal){q(".msg").textContent="Мало монет — уменьши ставку";return}
 busy=true;bal-=bet;upd();q(".spin").disabled=true;q(".msg").textContent="";var lv=q(".lever");lv.classList.add("pull");setTimeout(function(){lv.classList.remove("pull")},300);
 var sp=snd("spin"),res;if(Math.random()<.1)res=["200","200","200"];else do{res=[rnd(),rnd(),rnd()]}while(res.join()=="200,200,200");
 strips.forEach(function(s,i){var n=18+i*6,h="";for(var k=0;k<n;k++)h+=C(rnd());h+=C(res[i]);
  s.style.transition="none";s.style.transform="translateY(0)";s.innerHTML=h;s.offsetHeight;
  s.style.transition="transform "+(1.2+i*.45)+"s cubic-bezier(.15,.6,.25,1.05)";s.style.transform="translateY(-"+(n*H)+"px)"});
 setTimeout(function(){if(sp)sp.pause();
  strips.forEach(function(s,i){s.style.transition="none";s.style.transform="none";s.innerHTML=C(res[i])});
  var w=0,m;if(res[0]==res[1]&&res[1]==res[2])w=bet*PAY[res[0]];else if(res[0]==res[1]||res[1]==res[2]||res[0]==res[2])w=bet*2;
  bal+=w;upd();busy=false;q(".spin").disabled=false;
  if(w){m="Выигрыш: +"+w+" 🪙"}else m=bal<=0?"Монеты кончились — жми SPIN для пополнения":"Мимо!";q(".msg").textContent=m;
  if(res.join("")=="💰💰💰"){snd("jack");var o=document.createElement("div");o.id="jkp";o.innerHTML="<b>ДЖЕКПОТ</b>";o.onclick=function(){o.remove()};document.body.appendChild(o);setTimeout(function(){o.remove()},4000)}
  else if(res.join()=="200,200,200"){if(window.wastedShow)window.wastedShow("ТЫ 200","wasted");else snd("lose");blood();setTimeout(function(){snd("laugh",1)},600)}
  else if(res.join("")=="💩💩💩"&&window.wastedShow)window.wastedShow("ты обкакан","wasted2");
  else snd(w?"win":"lose");
 },2400);}
q(".spin").onclick=spin;q(".lever").onclick=spin;upd();
})();
