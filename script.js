const SHOP={name:'Tailor Francis',phone:'+234 704 044 5125',wa:'2347040445125',email:'kenke2003@gmail.com',address:'4 Wale Azeez Street, Abuja',hours:'Mon–Sat, 9am–6pm'};
// ======================
const pages=[['index.html','Home'],['shop.html','Shop'],['gallery.html','Gallery'],['book.html','Book / Order'],['contact.html','Contact']];
const here=location.pathname.split('/').pop()||'index.html';
const logo=`<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="#1f3a5f"/><circle cx="24" cy="24" r="18" fill="none" stroke="#d9ccb6" stroke-width="1"/><text x="24" y="32" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-weight="700" fill="#f3ebdd">F</text><path d="M10 38 Q24 30 38 38" stroke="#b98a5e" fill="none" stroke-width="1.5" stroke-dasharray="3 2"/></svg>`;
const h=document.getElementById('site-header');
if(h)h.innerHTML=`<nav class="navbar"><a href="index.html" class="logo">${logo}${SHOP.name}</a><button class="menu-btn" aria-expanded="false" aria-controls="nl">Menu</button><ul class="nav-links" id="nl">${pages.map(p=>`<li><a href="${p[0]}" class="${p[0]===here?'active':''}">${p[1]}</a></li>`).join('')}</ul></nav>`;
const f=document.getElementById('site-footer');
if(f)f.innerHTML=`<div class="foot"><div><b>${SHOP.name}</b><br>${SHOP.address}<br>${SHOP.hours}</div><div>${SHOP.phone}<br><a href="mailto:${SHOP.email}">${SHOP.email}</a></div><div>${pages.map(p=>`<a href="${p[0]}">${p[1]}</a>`).join('<br>')}</div></div><small>© ${new Date().getFullYear()} ${SHOP.name}. All rights reserved.</small></footer>
<a class="wa" href="https://wa.me/${SHOP.wa}" target="_blank" rel="noopener">WhatsApp us</a><button class="top" aria-label="Back to top">↑</button>`;
const mb=document.querySelector('.menu-btn'),nl=document.getElementById('nl');
mb&&mb.addEventListener('click',()=>{const o=nl.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
const toTop=document.querySelector('.top');
if(toTop){addEventListener("scroll",()=>toTop.style.display=scrollY>500?"block":"none");toTop.onclick=()=>scrollTo({top:0})}
// gallery filter + lightbox
const fb=document.querySelectorAll('.filters button'),items=document.querySelectorAll('.gallery .ph'),lb=document.querySelector('.lightbox');
fb.forEach(b=>b.addEventListener('click',()=>{fb.forEach(x=>x.classList.remove('on'));b.classList.add('on');items.forEach(i=>i.classList.toggle('hide',b.dataset.f!=='all'&&i.dataset.cat!==b.dataset.f))}));
items.forEach(i=>i.addEventListener('click',()=>{lb.querySelector('.ph').textContent=i.textContent;lb.classList.add('open')}));
if(lb){lb.addEventListener('click',e=>{if(e.target===lb||e.target.tagName==='BUTTON')lb.classList.remove('open')});addEventListener('keydown',e=>e.key==='Escape'&&lb.classList.remove('open'))}
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