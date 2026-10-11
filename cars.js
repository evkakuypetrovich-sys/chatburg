/* Live-city strip: detailed side-view parody cars (inline SVG sprites → canvas), spinning wheels, suspension bounce,
   glowing lights at night (synced with the 60 s hero sky), DPS strobes, drifting car with tyre marks and smoke.
   Animates only while visible; static frame with reduced motion. No real logos. */
(()=>{const host=document.querySelector(".livecity");if(!host)return;const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const cv=host.querySelector("canvas"),cx=cv.getContext("2d");let W=0,H=0,DPR=1,vis=false;
const INK="#1d1530";
// ---- sprite definitions: viewBox 0 0 L 60 (side view facing right), wheels [x], wheel radius r, light positions
const glass=(d)=>`<path d="${d}" fill="url(#gl)" stroke="${INK}" stroke-width="1.6"/>`;
const defs=(c,c2)=>`<defs><linearGradient id="bd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2||c}" /><stop offset=".45" stop-color="${c}"/><stop offset="1" stop-color="${shade(c,-.35)}"/></linearGradient>
<linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9f1ff"/><stop offset=".5" stop-color="#7fb3d9"/><stop offset="1" stop-color="#3d5f86"/></linearGradient>
<linearGradient id="hl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
function shade(h,a){const n=parseInt(h.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const f=a<0?0:255,t=Math.abs(a);r=Math.round((f-r)*t+r);g=Math.round((f-g)*t+g);b=Math.round((f-b)*t+b);return"#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}
const refl=(d)=>`<path d="${d}" fill="#fff" opacity=".55"/>`;
const arch=(x,r,y)=>`<path d="M${x-r-3} ${y} a${r+3} ${r+3} 0 0 1 ${2*r+6} 0" fill="${INK}"/>`;
const M={
 zhiga:{name:"Жига Семёрка",L:120,w:[24,94],r:9.5,c:"#c8d6e8",y:46,head:[116,36],tail:[3,34],svg:c=>`${defs(c,"#eef4fb")}
  <path d="M4 46 L3 34 Q4 30 10 29 L30 28 L42 16 Q44 14 48 14 L84 14 Q88 14 90 17 L99 28 L114 30 Q118 31 118 35 L117 46 Z" fill="url(#bd)" stroke="${INK}" stroke-width="2"/>
  ${glass("M45 18 L82 18 L82 28 L35 28 Z")}${glass("M85 18 Q87 18 88 20 L95 28 L85 28 Z")}${refl("M48 19 L58 19 L52 27 L43 27 Z")}
  <path d="M83 18 V28" stroke="${INK}" stroke-width="2.2"/><path d="M6 37 H116" stroke="${shade(c,-.3)}" stroke-width="1.4"/><path d="M60 30 h5 M92 30 h5" stroke="${INK}" stroke-width="1.6"/>
  <rect x="2" y="39" width="8" height="5" rx="1" fill="#9aa3ad" stroke="${INK}"/><rect x="110" y="39" width="9" height="5" rx="1" fill="#9aa3ad" stroke="${INK}"/>
  ${arch(24,9.5,46)}${arch(94,9.5,46)}<rect x="113" y="32" width="5" height="4" fill="#fff6c8" stroke="${INK}"/><rect x="3" y="31" width="4" height="5" fill="#c62828" stroke="${INK}"/>`},
 gazel:{name:"Газелька",L:140,w:[28,108],r:10.5,c:"#f4f4f2",y:60,head:[136,44],tail:[3,40],svg:c=>`${defs(c,"#ffffff")}
  <path d="M3 60 L3 10 Q3 6 8 6 L104 6 Q110 6 114 12 L128 34 Q137 37 137 44 L137 60 Z" fill="url(#bd)" stroke="${INK}" stroke-width="2"/>
  ${glass("M108 12 L124 34 L108 34 Z")}${glass("M90 12 L104 12 L104 34 L90 34 Z")}${refl("M110 15 L114 15 L120 30 L112 30 Z")}
  <path d="M88 8 V58 M105 8 V58" stroke="${INK}" stroke-width="1.6"/><path d="M8 42 H136" stroke="#ff8c2a" stroke-width="5"/><text x="44" y="30" font-family="Arial Black,sans-serif" font-size="11" fill="#2a1a4a">ГРУЗИМ</text>
  ${arch(28,10.5,60)}${arch(108,10.5,60)}<rect x="132" y="40" width="5" height="6" fill="#fff6c8" stroke="${INK}"/><rect x="3" y="36" width="4" height="8" fill="#c62828" stroke="${INK}"/>`},
 kruzak:{name:"Крузак 200",L:136,w:[28,108],r:12,c:"#22262e",y:54,head:[132,36],tail:[3,34],svg:c=>`${defs(c,"#4a5160")}
  <path d="M4 54 L3 30 Q3 26 8 25 L22 24 L34 8 Q36 6 40 6 L102 6 Q106 6 108 9 L118 24 L130 27 Q134 28 134 34 L133 54 Z" fill="url(#bd)" stroke="${INK}" stroke-width="2"/>
  ${glass("M38 10 L70 10 L70 24 L27 24 Z")}${glass("M74 10 L100 10 Q103 10 105 13 L112 24 L74 24 Z")}${refl("M41 11 L52 11 L42 23 L32 23 Z")}${refl("M78 11 L86 11 L80 23 L75 23 Z")}
  <path d="M72 8 V48" stroke="${INK}" stroke-width="2"/><path d="M40 5 H100" stroke="#9aa3ad" stroke-width="3"/><path d="M6 40 H132" stroke="#9aa3ad" stroke-width="2"/>
  ${arch(28,12,54)}${arch(108,12,54)}<rect x="128" y="29" width="6" height="5" fill="#fff6c8" stroke="${INK}"/><rect x="3" y="27" width="4" height="8" fill="#c62828" stroke="${INK}"/>`},
 vesta:{name:"Веста-Х",L:124,w:[25,98],r:10,c:"#ff6a00",y:48,head:[120,34],tail:[3,32],svg:c=>`${defs(c,"#ffb070")}
  <path d="M4 48 L3 32 Q4 27 12 26 L30 25 L44 13 Q48 11 54 11 L84 11 Q90 11 94 15 L104 25 L118 28 Q122 30 121 36 L120 48 Z" fill="url(#bd)" stroke="${INK}" stroke-width="2"/>
  ${glass("M50 15 L74 15 L74 25 L36 25 Z")}${glass("M78 15 L88 15 Q91 15 93 18 L99 25 L78 25 Z")}${refl("M53 16 L61 16 L52 24 L44 24 Z")}
  <path d="M76 14 V44" stroke="${INK}" stroke-width="1.8"/><path d="M30 36 Q60 30 112 33" stroke="${shade(c,-.35)}" stroke-width="2" fill="none"/><path d="M96 38 l8 -5 l-2 7z" fill="${INK}" opacity=".5"/>
  ${arch(25,10,48)}${arch(98,10,48)}<path d="M112 29 L121 31 L120 35 L112 33Z" fill="#fff6c8" stroke="${INK}"/><rect x="3" y="29" width="5" height="5" fill="#c62828" stroke="${INK}"/>`},
 buhanka:{name:"Буханка",L:118,w:[26,92],r:10.5,c:"#5f7a3a",y:56,head:[114,34],tail:[3,30],svg:c=>`${defs(c,"#8aa35c")}
  <path d="M4 56 L3 16 Q3 6 16 6 L96 6 Q110 6 113 18 L116 30 L116 56 Z" fill="url(#bd)" stroke="${INK}" stroke-width="2"/>
  ${glass("M14 12 L32 12 L32 26 L14 26 Z")}${glass("M38 12 L58 12 L58 26 L38 26 Z")}${glass("M64 12 L84 12 L84 26 L64 26 Z")}${glass("M90 12 L102 12 Q108 12 110 20 L111 26 L90 26 Z")}
  ${refl("M16 13 L22 13 L17 25 L15 25 Z")}${refl("M92 13 L97 13 L93 25 L91 25 Z")}<path d="M87 8 V52" stroke="${INK}" stroke-width="1.6"/><circle cx="58" cy="40" r="7" fill="#fff" stroke="${INK}"/><path d="M58 35 v10 M53 40 h10" stroke="#c62828" stroke-width="3"/>
  ${arch(26,10.5,56)}${arch(92,10.5,56)}<circle cx="113" cy="34" r="3.5" fill="#fff6c8" stroke="${INK}"/><rect x="3" y="30" width="4" height="7" fill="#c62828" stroke="${INK}"/>`},
 bus:{name:"Автобус",L:200,w:[36,164],r:12,c:"#f7b733",y:70,head:[197,52],tail:[3,50],svg:c=>`${defs(c,"#ffd77a")}
  <path d="M3 70 L3 12 Q3 4 12 4 L186 4 Q196 4 197 14 L198 70 Z" fill="url(#bd)" stroke="${INK}" stroke-width="2"/>
  ${[0,1,2,3,4,5].map(i=>glass(`M${14+i*28} 12 L${38+i*28} 12 L${38+i*28} 36 L${14+i*28} 36 Z`)).join("")}${glass("M182 12 L192 12 Q195 12 195 16 L195 40 L182 40 Z")}
  ${[0,2,4].map(i=>refl(`M${16+i*28} 13 L${24+i*28} 13 L${18+i*28} 35 L${15+i*28} 35 Z`)).join("")}<path d="M3 46 H198" stroke="#6b3fa0" stroke-width="6"/><rect x="176" y="12" width="4" height="50" fill="${INK}" opacity=".35"/>
  <rect x="150" y="5" width="30" height="6" rx="2" fill="${INK}"/><text x="152" y="10.5" font-family="Arial" font-size="5.5" fill="#ffb300">№ 228</text>
  ${arch(36,12,70)}${arch(164,12,70)}<rect x="193" y="50" width="5" height="6" fill="#fff6c8" stroke="${INK}"/><rect x="3" y="48" width="4" height="9" fill="#c62828" stroke="${INK}"/>`},
 taxi:{name:"Такси",L:122,w:[25,97],r:10,c:"#ffd23f",y:48,head:[118,34],tail:[3,32],taxi:1,svg:c=>`${defs(c,"#ffe98a")}
  <path d="M4 48 L3 32 Q4 28 11 27 L30 26 L43 13 Q46 11 51 11 L84 11 Q89 11 92 15 L102 26 L116 29 Q120 30 119 36 L118 48 Z" fill="url(#bd)" stroke="${INK}" stroke-width="2"/>
  ${glass("M48 15 L72 15 L72 26 L36 26 Z")}${glass("M76 15 L86 15 Q89 15 91 18 L97 26 L76 26 Z")}${refl("M50 16 L58 16 L49 25 L42 25 Z")}
  <path d="M74 14 V44" stroke="${INK}" stroke-width="1.8"/>${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${34+i*7}" y="${33+(i%2)*4}" width="4" height="4" fill="${INK}"/>`).join("")}
  <rect x="58" y="5" width="20" height="7" rx="2" fill="#fff" stroke="${INK}"/><text x="60" y="10.5" font-family="Arial Black" font-size="5" fill="${INK}">ТАКСИ</text>
  ${arch(25,10,48)}${arch(97,10,48)}<rect x="112" y="30" width="6" height="4" fill="#fff6c8" stroke="${INK}"/><rect x="3" y="29" width="4" height="5" fill="#c62828" stroke="${INK}"/>`},
 dps:{name:"ДПС",L:124,w:[25,98],r:10,c:"#f2f4f7",y:48,head:[120,34],tail:[3,32],police:1,svg:c=>`${defs(c,"#ffffff")}
  <path d="M4 48 L3 32 Q4 27 12 26 L30 25 L44 13 Q48 11 54 11 L84 11 Q90 11 94 15 L104 25 L118 28 Q122 30 121 36 L120 48 Z" fill="url(#bd)" stroke="${INK}" stroke-width="2"/>
  ${glass("M50 15 L74 15 L74 25 L36 25 Z")}${glass("M78 15 L88 15 Q91 15 93 18 L99 25 L78 25 Z")}${refl("M53 16 L61 16 L52 24 L44 24 Z")}
  <path d="M76 14 V44" stroke="${INK}" stroke-width="1.8"/><path d="M6 34 H119" stroke="#1e5bd8" stroke-width="5"/><text x="44" y="44" font-family="Arial Black" font-size="7" fill="#1e5bd8">ДПС</text>
  <rect x="58" y="6" width="22" height="6" rx="2" fill="${INK}"/>
  ${arch(25,10,48)}${arch(98,10,48)}<path d="M112 29 L121 31 L120 35 L112 33Z" fill="#fff6c8" stroke="${INK}"/><rect x="3" y="29" width="5" height="5" fill="#c62828" stroke="${INK}"/>`}
};
const KEYS=Object.keys(M),SCALE=.85;
for(const k of KEYS){const m=M[k];const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${m.L} ${m.y+2}" width="${m.L*2}" height="${(m.y+2)*2}">${m.svg(m.c)}</svg>`;
 m.img=new Image();m.img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg)}
// ---- world
const lanes=[{dir:1,y:.62},{dir:-1,y:.86}];let cars=[],marks=[],smoke=[],t0=performance.now(),last=0;
function spawn(i,initial){const k=KEYS[(Math.random()*KEYS.length)|0],lane=lanes[i%2],m=M[k];const v=(k=="bus"||k=="gazel"||k=="buhanka"?55:75)+Math.random()*35;
 return{k,m,lane,v,x:initial?Math.random()*W:(lane.dir>0?-m.L*SCALE-20:W+20),rot:0,bob:Math.random()*6}}
const drift={m:M.vesta,x:-200,ph:0,a:0,y:0,rot:0,c:"#ff8c2a"};
function resize(){DPR=Math.min(2,devicePixelRatio||1);W=host.clientWidth;H=host.clientHeight;cv.width=W*DPR;cv.height=H*DPR;cx.setTransform(DPR,0,0,DPR,0,0);
 const n=Math.max(4,Math.round(W/220));cars=[...Array(n)].map((_,i)=>spawn(i,true))}
const night=()=>{const p=((performance.now()-t0)/1000%60)/60;return p<.38?0:p<.48?(p-.38)/.1:p<.82?1:p<.94?1-(p-.82)/.12:0};
function wheel(x,y,r,rot){cx.save();cx.translate(x,y);cx.fillStyle="#141018";cx.beginPath();cx.arc(0,0,r,0,7);cx.fill();
 const g=cx.createRadialGradient(-r*.2,-r*.2,1,0,0,r*.62);g.addColorStop(0,"#f2f4f7");g.addColorStop(1,"#8a93a0");cx.fillStyle=g;cx.beginPath();cx.arc(0,0,r*.6,0,7);cx.fill();
 cx.rotate(rot);cx.strokeStyle="#4a5160";cx.lineWidth=Math.max(1,r*.13);for(let i=0;i<5;i++){cx.rotate(Math.PI*2/5);cx.beginPath();cx.moveTo(0,r*.12);cx.lineTo(0,r*.56);cx.stroke()}
 cx.fillStyle="#2b2f38";cx.beginPath();cx.arc(0,0,r*.16,0,7);cx.fill();cx.restore()}
function drawCar(c,dt,nt,bounceAmp){const m=c.m,s=SCALE,w=m.L*s,h=(m.y+2)*s,road=H,base=road*c.lane.y;const now=performance.now()/1000;
 const bounce=RM?0:Math.sin(now*9+c.bob)*bounceAmp+Math.sin(now*3.1+c.bob*2)*.4;
 // shadow
 cx.fillStyle="rgba(10,6,20,.35)";cx.beginPath();cx.ellipse(c.x+w/2,base+1,w*.52,4,0,0,7);cx.fill();
 cx.save();cx.translate(c.x+(c.lane.dir<0?w:0),0);if(c.lane.dir<0)cx.scale(-1,1);
 const top=base-h-m.r*s*.15;cx.drawImage(m.img,0,top+bounce,w,h);
 for(const wx of m.w)wheel(wx*s,base-m.r*s+1,m.r*s,c.rot);
 // lights
 const hx=m.head[0]*s,hy=top+bounce+m.head[1]*s,tx=m.tail[0]*s,ty=top+bounce+m.tail[1]*s;
 if(nt>0){cx.globalCompositeOperation="lighter";let g=cx.createRadialGradient(hx,hy,1,hx+40,hy+4,70);g.addColorStop(0,`rgba(255,240,180,${.75*nt})`);g.addColorStop(1,"rgba(255,240,180,0)");
  cx.fillStyle=g;cx.beginPath();cx.moveTo(hx,hy-2);cx.lineTo(hx+110,hy-14);cx.lineTo(hx+110,hy+24);cx.closePath();cx.fill();
  g=cx.createRadialGradient(tx,ty,0,tx,ty,14);g.addColorStop(0,`rgba(255,40,40,${.8*nt})`);g.addColorStop(1,"rgba(255,40,40,0)");cx.fillStyle=g;cx.beginPath();cx.arc(tx,ty,14,0,7);cx.fill();cx.globalCompositeOperation="source-over"}
 if(m.police){const on=((now*4)|0)%2;const bx=m.L*s*.5,by=top+bounce+7*s;[["#1e6bff",-6,on],["#ff2b2b",6,!on]].forEach(([col,dx,lit])=>{cx.fillStyle=lit?col:"#3a3f4a";cx.fillRect(bx+dx-5,by-2,10,5);
  if(lit){cx.globalCompositeOperation="lighter";const g=cx.createRadialGradient(bx+dx,by,0,bx+dx,by,30);g.addColorStop(0,col+"cc");g.addColorStop(1,col+"00");cx.fillStyle=g;cx.beginPath();cx.arc(bx+dx,by,30,0,7);cx.fill();cx.globalCompositeOperation="source-over"}})}
 cx.restore()}
function puff(x,y,vx,big){smoke.push({x,y,vx:vx+(Math.random()-.5)*20,vy:-10-Math.random()*18,r:big?6:4,gr:big?26:16,a:big?.5:.35,life:0,max:1.4+Math.random()*.8})}
function frame(now){if(!vis)return;requestAnimationFrame(frame);const dt=Math.min(.05,(now-(last||now))/1000);last=now;cx.clearRect(0,0,W,H);const nt=night();
 // road + markings
 const rt=H*.42;const sky=cx.createLinearGradient(0,0,0,rt);sky.addColorStop(0,`rgba(42,26,74,${.75*nt})`);sky.addColorStop(1,`rgba(107,63,160,${.35*nt})`);cx.fillStyle=sky;cx.fillRect(0,0,W,rt);
 cx.fillStyle="#3b4256";cx.fillRect(0,rt,W,H-rt);cx.fillStyle="#9aa3ad";cx.fillRect(0,rt,W,4);cx.strokeStyle="rgba(255,255,255,.75)";cx.setLineDash([26,20]);cx.lineWidth=3;cx.beginPath();cx.moveTo(-(now/12%46),H*.7);cx.lineTo(W,H*.7);cx.stroke();cx.setLineDash([]);
 if(nt>0){cx.fillStyle=`rgba(10,8,30,${.35*nt})`;cx.fillRect(0,rt,W,H-rt)}
 // tyre marks
 for(const mk of marks){mk.a-=dt*.06;cx.strokeStyle=`rgba(15,10,20,${Math.max(0,mk.a)})`;cx.lineWidth=2.5;cx.beginPath();cx.moveTo(mk.x1,mk.y1);cx.lineTo(mk.x2,mk.y2);cx.stroke()}marks=marks.filter(m=>m.a>0);
 // traffic (far lane first)
 for(const c of cars.sort((a,b)=>a.lane.y-b.lane.y)){c.x+=c.v*c.lane.dir*dt;c.rot+=c.v*dt/(c.m.r*SCALE)*c.lane.dir;drawCar(c,dt,nt,.6);
  if((c.lane.dir>0&&c.x>W+30)||(c.lane.dir<0&&c.x<-c.m.L*SCALE-30))Object.assign(c,spawn(lanes.indexOf(c.lane),false))}
 // drifting car
 const d=drift;d.x+=150*dt;d.ph+=dt*3.2;const s=Math.sin(d.ph);d.a=s*.32;d.rot+=150*dt/(d.m.r*SCALE);if(d.x>W+260){d.x=-260;}
 const by=H*.74+s*6;cx.save();const w=d.m.L*SCALE;cx.translate(d.x+w/2,by);cx.rotate(-d.a*.25);
 const fake={m:d.m,lane:{dir:1,y:0},x:-w/2,rot:d.rot,bob:0};cx.translate(0,-0);drawCar(Object.assign(fake,{lane:{dir:1,y:0}}),dt,nt,0);cx.restore();
 // drawCar uses base=H*lane.y → we drew with y=0 relative; fix by drawing marks/smoke in world coords
 if(Math.abs(s)>.35){const rx=d.x+d.m.w[0]*SCALE,fx=d.x+d.m.w[1]*SCALE;marks.push({x1:rx-6,y1:by-1,x2:rx+2,y2:by+(s>0?1:-1),a:.5},{x1:fx-6,y1:by-1,x2:fx+2,y2:by,a:.25});
  if(Math.random()<.9)puff(rx-4,by-4,-60,Math.abs(s)>.7);if(Math.random()<.5)puff(fx-4,by-4,-40,false)}
 for(const p of smoke){p.life+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.98;const k=p.life/p.max,r=p.r+p.gr*k;const g=cx.createRadialGradient(p.x,p.y,0,p.x,p.y,r);
  const a=p.a*(1-k);g.addColorStop(0,`rgba(235,235,240,${a})`);g.addColorStop(.6,`rgba(200,200,210,${a*.6})`);g.addColorStop(1,"rgba(200,200,210,0)");cx.fillStyle=g;cx.beginPath();cx.arc(p.x,p.y,r,0,7);cx.fill()}
 smoke=smoke.filter(p=>p.life<p.max);if(smoke.length>160)smoke.splice(0,smoke.length-160)}
function still(){last=0;vis=true;frame(performance.now());vis=false}
resize();addEventListener("resize",()=>{resize();if(RM)still()});
Promise.all(KEYS.map(k=>M[k].img.decode().catch(()=>{}))).then(()=>{if(RM){still();return}
 new IntersectionObserver(e=>{const v=e[0].isIntersecting;if(v&&!vis){vis=true;last=0;requestAnimationFrame(frame)}vis=v}).observe(host)});
})();
