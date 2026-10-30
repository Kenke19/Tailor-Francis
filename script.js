const SHOP={name:'Tailor Francis',phone:'+44 7903 419398',wa:'2347040445125',email:'kenke2003@gmail.com',address:'72 Market Street, Watford Hertfordshire, United Kingdom',po:'Post code: WD18 0PX', hours:'Mon–Sun, 9am–6pm',ig:'https://instagram.com/yourhandle',fb:'https://facebook.com/yourpage',tt:'https://tiktok.com/@yourhandle'};
// ======================
const pages=[['index.html','Home'],['about.html','About'],['shop.html','Shop'],['gallery.html','Gallery'],['book.html','Book / Order'],['contact.html','Contact']];
const here=location.pathname.split('/').pop()||'index.html';
const logo=`<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="#1f3a5f"/><circle cx="24" cy="24" r="18" fill="none" stroke="#d9ccb6" stroke-width="1"/><text x="24" y="32" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-weight="700" fill="#f3ebdd">F</text><path d="M10 38 Q24 30 38 38" stroke="#b98a5e" fill="none" stroke-width="1.5" stroke-dasharray="3 2"/></svg>`;
const h=document.getElementById('site-header');
if(h)h.innerHTML=`<nav class="navbar"><a href="index.html" class="logo">${logo}${SHOP.name}</a><button class="menu-btn" aria-expanded="false" aria-controls="nl">Menu</button><ul class="nav-links" id="nl">${pages.map(p=>`<li><a href="${p[0]}" class="${p[0]===here?'active':''}">${p[1]}</a></li>`).join('')}</ul></nav>`;
const f=document.getElementById('site-footer');
const ic={ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',fb:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/></svg>',tt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2.3 1.7 3.8 4 4v3.2c-1.5 0-2.9-.5-4-1.3V15a6 6 0 1 1-6-6v3.3a2.8 2.8 0 1 0 2.8 2.7V3z"/></svg>',wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.2 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.3-.1.6.2.3.8 1.3 1.7 2 1.1 1 2.1 1.3 2.4 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.700-.1 1.300z"/></svg>'};
const soc=[['ig','Instagram'],['fb','Facebook'],['tt','TikTok']].filter(x=>SHOP[x[0]]).map(x=>`<a href="${SHOP[x[0]]}" target="_blank" rel="noopener" aria-label="${x[1]}">${ic[x[0]]}</a>`).join('')+`<a href="https://wa.me/${SHOP.wa}" target="_blank" rel="noopener" aria-label="WhatsApp">${ic.wa}</a>`;
if(f)f.innerHTML=`<div class="foot"><div class="fbrand"><a href="index.html" class="logo">${logo}${SHOP.name}</a><p>Bespoke suits, native wear and ready-to-wear, made with care and finished to last.</p><div class="social">${soc}</div></div>
<div><h4>Explore</h4>${pages.map(p=>`<a href="${p[0]}">${p[1]}</a>`).join('')}</div>
<div><h4>What we make</h4><a href="book.html">Bespoke suits</a><a href="book.html">Native wear</a><a href="book.html">Alterations</a><a href="shop.html">Ready to wear</a></div>
<div><h4>Visit us</h4><p>${SHOP.address}</p><p>${SHOP.po}</p><p>${SHOP.hours}</p><a href="tel:${SHOP.phone.replace(/\s/g,'')}">${SHOP.phone}</a><a href="mailto:${SHOP.email}">${SHOP.email}</a><a href="book.html" class="btn fbtn">Book a fitting</a></div></div>
<div class="fbar"><span>© ${new Date().getFullYear()} ${SHOP.name}. All rights reserved.</span></div>
<a class="wa" href="https://wa.me/${SHOP.wa}" target="_blank" rel="noopener">WhatsApp us</a><button class="top" aria-label="Back to top">↑</button>`;
const mb=document.querySelector('.menu-btn'),nl=document.getElementById('nl');
mb&&mb.addEventListener('click',()=>{const o=nl.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
const toTop=document.querySelector('.top');
if(toTop){addEventListener("scroll",()=>toTop.style.display=scrollY>500?"block":"none");toTop.onclick=()=>scrollTo({top:0})}
// gallery filter + lightbox
(()=>{const g=document.querySelector('.gallery');if(!g)return;
 const figs=[...g.querySelectorAll('figure')],fb=document.querySelectorAll('.filters button'),lb=document.querySelector('.lightbox'),cnt=document.getElementById('count');
 const label={suits:'Suits',native:'Native wear',rtw:'Ready to wear'};let vis=figs,cur=0;
 const show=f=>{fb.forEach(b=>b.classList.toggle('on',b.dataset.f===f));figs.forEach(x=>x.classList.toggle('hide',f!=='all'&&x.dataset.cat!==f));vis=figs.filter(x=>!x.classList.contains('hide'));figs.forEach(x=>x.classList.remove('big'));vis.forEach((x,i)=>{if(i%6===0&&vis.length-i>=3)x.classList.add('big')});if(cnt)cnt.textContent=`Showing ${vis.length} piece${vis.length===1?'':'s'}`};
 fb.forEach(b=>b.addEventListener('click',()=>show(b.dataset.f)));show('all');
 const img=lb.querySelector('img'),cap=lb.querySelector('figcaption'),num=lb.querySelector('.lb-num');
 const open=i=>{cur=(i+vis.length)%vis.length;const x=vis[cur];img.src=x.querySelector('img').currentSrc||x.querySelector('img').src;img.alt=x.querySelector('img').alt;
  cap.innerHTML=`<small>${label[x.dataset.cat]||''}</small>${x.dataset.title||''}`;num.textContent=`${cur+1} / ${vis.length}`;lb.classList.add('open');document.body.style.overflow='hidden'};
 const close=()=>{lb.classList.remove('open');document.body.style.overflow=''};
 figs.forEach(x=>{x.tabIndex=0;x.addEventListener('click',()=>open(vis.indexOf(x)));x.addEventListener('keydown',e=>{if(e.key==='Enter')open(vis.indexOf(x))})});
 lb.querySelector('.lb-prev').onclick=e=>{e.stopPropagation();open(cur-1)};lb.querySelector('.lb-next').onclick=e=>{e.stopPropagation();open(cur+1)};
 lb.addEventListener('click',e=>{if(e.target===lb||e.target.classList.contains('lb-close'))close()});
 addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')open(cur-1);if(e.key==='ArrowRight')open(cur+1)});
 let sx=0;lb.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)open(cur+(d<0?1:-1))});
})();
// forms
document.querySelectorAll('form[data-form]').forEach(form=>{
 const key='ft_'+form.dataset.form,saved=JSON.parse(localStorage.getItem(key)||'{}');
 [...form.elements].forEach(el=>{if(el.name&&saved[el.name])el.value=saved[el.name]});
 form.addEventListener('input',()=>{const d={};new FormData(form).forEach((v,k)=>d[k]=v);localStorage.setItem(key,JSON.stringify(d))});
 form.addEventListener('submit',e=>{e.preventDefault();let ok=true;
  form.querySelectorAll('[required]').forEach(el=>{const bad=!el.value.trim()||(el.type==='email'&&!/^\S+@\S+\.\S+$/.test(el.value));el.classList.toggle('bad',bad);if(bad)ok=false});
  const t=form.querySelector('.toast');
  if(!ok){t.className='toast show';t.style.background='#f6e3e3';t.textContent='Please fill in the highlighted fields.';return}
  const d=new FormData(form),msg=[`New ${form.dataset.form} request`];d.forEach((v,k)=>v&&msg.push(`${k}: ${v}`));
  t.style.background='';t.className='toast show';t.textContent='Thank you! Opening WhatsApp to send your request…';
  localStorage.removeItem(key);window.open(`https://wa.me/${SHOP.wa}?text=${encodeURIComponent(msg.join('\n'))}`,'_blank');form.reset()});
});
// ===== scroll reveal + counters =====
(()=>{
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
 const add=(sel,cls='',stag=false)=>document.querySelectorAll(sel).forEach((el,i)=>{el.classList.add('rv',...(cls?[cls]:[]));if(stag)el.style.transitionDelay=(i%4)*.12+'s';io.observe(el)});
 add('.section .center,.section>h2');add('.card,.product,.quote,.team>div,.steps li,.timeline li,.promise .card,.facts div','',true);
 add('.split>div:first-child','l');add('.split>div:last-child','r');add('.hero>div:first-child','l');add('.hero>div:last-child','r');add('details','',true);
 // count-up for numbers on .facts (index handles its own) -- removed data-n attr to avoid double counting on index
 document.querySelectorAll('.facts b:not([data-n])').forEach(b=>{const n=parseInt(b.textContent);if(!n)return;const sfx=b.textContent.replace(/[0-9]/g,'');
  const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();let c=0;const t=setInterval(()=>{c=Math.min(n,c+Math.ceil(n/40));b.textContent=c+sfx;if(c>=n)clearInterval(t)},35)});o.observe(b)});
})();
