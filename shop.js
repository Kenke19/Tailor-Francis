const CUR='£';
const PRODUCTS=[
{id:1,name:'Chic Two-Piece',cat:'Two-Piece',price:18,sizes:['M','L','XL','XXL'],img:'r2w.webp'},
{id:2,name:'Blue Men Two-Piece',cat:'Two-Piece',price:50,sizes:['M','L','XL'],img:'r2wm.webp'},
{id:3,name:'Classic Romper',cat:'Two-Piece',price:10,sizes:['M','L','XL','XXL'],img:'r2w2.webp'},
{id:4,name:'Cotton Set',cat:'Two-Piece',price:50,sizes:['L','XL','XXL'],img:'r2wm3.webp'},
{id:5,name:'Ankara Two-Piece',cat:'Ankara wear',price:40,sizes:['M','L','XL'],img:'r2wm2.webp'},
{id:6,name:'Women Navy Set',cat:'Two-Piece',price:180,sizes:['S','M','L','XL'],img:'r2w1.webp'},
{id:7,name:'T-Shirt Set',cat:'Shirts',price:90,sizes:['S','M','L','XL'],img:'r2wm1.webp'},
{id:8,name:'Tailored Senator',cat:'Senator',price:200,sizes:['L','XL','2XL','3XL'],img:'senator3.webp'}
];
const $=id=>document.getElementById(id),fmt=n=>CUR+n.toLocaleString('en-GB');
const L=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
let cart=L('ft_cart',[]),wish=L('ft_wish',[]),st={q:'',cat:'All',size:'',sort:'',saved:false};
const keep=()=>{localStorage.setItem('ft_cart',JSON.stringify(cart));localStorage.setItem('ft_wish',JSON.stringify(wish))};
const pic=p=>p.img?`<img src="${p.img}" alt="${p.name}" loading="lazy">`:`<div class="ph">${p.name}</div>`;
// ---- filters
const cats=['All',...new Set(PRODUCTS.map(p=>p.cat))];
$('cats').innerHTML=cats.map(c=>`<button data-c="${c}">${c}</button>`).join('');
$('tiles').innerHTML=cats.slice(1).map(c=>{const m=PRODUCTS.filter(p=>p.cat===c);return `<button class="tile" data-c="${c}">${m[0].img?`<img src="${m[0].img}" alt="" loading="lazy">`:''}<span>${c}<small>${m.length} piece${m.length===1?'':'s'}</small></span></button>`}).join('');
$('tiles').onclick=e=>{const t=e.target.closest('.tile');if(!t)return;st.cat=st.cat===t.dataset.c?'All':t.dataset.c;drawShop();$('bar').scrollIntoView({behavior:'smooth'})};
$('size').innerHTML+=[...new Set(PRODUCTS.flatMap(p=>p.sizes))].sort((x,y)=>{const o=['S','M','L','XL','XXL','2XL','3XL'],i=o.indexOf(x),j=o.indexOf(y);return(i<0?99:i)-(j<0?99:j)||x.localeCompare(y)}).map(s=>`<option>${s}</option>`).join('');
function list(){let r=PRODUCTS.filter(p=>(st.cat==='All'||p.cat===st.cat)&&(!st.size||p.sizes.includes(st.size))&&(!st.q||(p.name+p.cat).toLowerCase().includes(st.q.toLowerCase()))&&(!st.saved||wish.includes(p.id)));
 if(st.sort==='lo')r.sort((a,b)=>a.price-b.price);if(st.sort==='hi')r.sort((a,b)=>b.price-a.price);if(st.sort==='az')r.sort((a,b)=>a.name.localeCompare(b.name));return r}
function drawShop(){const r=list();
 document.querySelectorAll('#cats button').forEach(b=>b.classList.toggle('on',b.dataset.c===st.cat));document.querySelectorAll('.tile').forEach(t=>t.classList.toggle('on',t.dataset.c===st.cat));
 $('saved').setAttribute('aria-pressed',st.saved);$('saved').classList.toggle('on',st.saved);$('saved-n').textContent=wish.length;
 $('results').textContent=`${r.length} item${r.length===1?'':'s'}`;$('empty').hidden=r.length>0;
 $('shop-grid').innerHTML=r.map(p=>`<article class="pc ${p.out?'sold':''}" data-id="${p.id}" tabindex="0"><div class="pimg">${pic(p)}${p.out?'<em class="bd out">Sold out</em>':p.badge?`<em class="bd">${p.badge}</em>`:''}
 <button class="heart ${wish.includes(p.id)?'on':''}" data-h="${p.id}" aria-label="Save ${p.name}">${wish.includes(p.id)?'♥':'♡'}</button><span class="qv">Quick view</span></div>
 <div class="info"><small>${p.cat}</small><h3>${p.name}</h3><div class="pr"><b>${fmt(p.price)}</b>${p.was?`<s>${fmt(p.was)}</s>`:''}</div><div class="sz">${p.sizes.map(z=>`<i>${z}</i>`).join('')}</div></div></article>`).join('')}
$('q').oninput=e=>{st.q=e.target.value;drawShop()};$('size').onchange=e=>{st.size=e.target.value;drawShop()};$('sort').onchange=e=>{st.sort=e.target.value;drawShop()};
$('cats').onclick=e=>{if(e.target.dataset.c){st.cat=e.target.dataset.c;drawShop()}};
$('saved').onclick=()=>{st.saved=!st.saved;drawShop()};
$('reset').onclick=()=>{st={q:'',cat:'All',size:'',sort:'',saved:false};$('q').value='';$('size').value='';$('sort').value='';drawShop()};
const toggleWish=id=>{wish=wish.includes(id)?wish.filter(x=>x!==id):[...wish,id];keep();drawShop()};
$('shop-grid').addEventListener('click',e=>{const h=e.target.closest('[data-h]');if(h){e.stopPropagation();return toggleWish(+h.dataset.h)}const c=e.target.closest('.pc');if(c)openQV(+c.dataset.id)});
$('shop-grid').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.classList.contains('pc'))openQV(+e.target.dataset.id)});
// ---- quick view
let sel='',qty=1;
function openQV(id){const p=PRODUCTS.find(x=>x.id===id);sel='';qty=1;
 const wa=`https://wa.me/${SHOP.wa}?text=${encodeURIComponent('Hello, I would like to ask about: '+p.name)}`;
 $('modal-box').innerHTML=`<button class="close" aria-label="Close">×</button><div class="mimg">${pic(p)}</div><div class="mdet"><small>${p.cat}</small><h2>${p.name}</h2>
 <div class="pr big"><b>${fmt(p.price)}</b>${p.was?`<s>${fmt(p.was)}</s>`:''}</div><p>${p.desc||'Made by our own tailors. Choose your size and add to cart, or ask us anything on WhatsApp.'}</p>
 ${p.out?'<p class="soldmsg">This piece is sold out. Ask us and we can make one for you.</p>':`<label>Size</label><div class="sizes">${p.sizes.map(s=>`<button type="button" data-s="${s}">${s}</button>`).join('')}</div><div class="err" id="serr"></div>
 <label>Quantity</label><div class="qty"><button type="button" data-qd="-1">−</button><span id="qn">1</span><button type="button" data-qd="1">+</button></div>
 <button class="btn" id="addbtn" data-p="${p.id}" style="width:100%;margin-top:18px">Add to cart</button>`}
 <a class="btn-outline" href="${wa}" target="_blank" rel="noopener" style="display:block;text-align:center;margin-top:12px">${p.out?'Ask about this piece':'Ask a question on WhatsApp'}</a>
 <a class="more" href="book.html">Want a custom fit? Order bespoke</a></div>`;
 $('modal').classList.add('open');document.body.style.overflow='hidden';$('modal-box').querySelector('.close').focus()}
const closeQV=()=>{$('modal').classList.remove('open');document.body.style.overflow=''};
$('modal').addEventListener('click',e=>{if(e.target===$('modal')||e.target.classList.contains('close'))return closeQV();
 if(e.target.dataset.s){sel=e.target.dataset.s;document.querySelectorAll('.sizes button').forEach(b=>b.classList.toggle('on',b===e.target));$('serr').textContent=''}
 if(e.target.dataset.qd){qty=Math.max(1,Math.min(9,qty+ +e.target.dataset.qd));$('qn').textContent=qty}
 if(e.target.id==='addbtn'){if(!sel){$('serr').textContent='Please choose a size.';return}const p=PRODUCTS.find(x=>x.id==e.target.dataset.p),hit=cart.find(c=>c.id===p.id&&c.size===sel);
  hit?hit.q+=qty:cart.push({id:p.id,size:sel,q:qty});keep();drawCart();closeQV();pop(`${p.name} added to cart`);const b=$('open-cart');b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')}});
// ---- cart
const total=()=>cart.reduce((a,c)=>a+c.q*PRODUCTS.find(p=>p.id===c.id).price,0);
function drawCart(){const n=cart.reduce((a,c)=>a+c.q,0);$('cart-count').textContent=n;$('cart-total').textContent=fmt(total());
 $('cart-items').innerHTML=cart.length?cart.map((c,i)=>{const p=PRODUCTS.find(x=>x.id===c.id);return `<div class="ci"><div class="th">${p.img?`<img src="${p.img}" alt="">`:'<span>✂</span>'}</div><div class="cd"><b>${p.name}</b><small>Size ${c.size} · ${fmt(p.price)}</small><div class="qty sm"><button data-q="${i}" data-d="-1" aria-label="Fewer">−</button><span>${c.q}</span><button data-q="${i}" data-d="1" aria-label="More">+</button></div></div><div class="cr"><b>${fmt(p.price*c.q)}</b><button class="rm" data-x="${i}" aria-label="Remove">Remove</button></div></div>`}).join(''):'<div class="empty-cart"><p>Your cart is empty.</p><button class="btn-outline" data-close>Keep shopping</button></div>'}
$('cart-items').addEventListener('click',e=>{const d=e.target.dataset;if(d.close!==undefined)return cartOpen(false);if(d.x!==undefined)cart.splice(d.x,1);if(d.q!==undefined){cart[d.q].q=Math.min(9,cart[d.q].q+ +d.d);if(cart[d.q].q<1)cart.splice(d.q,1)}keep();drawCart()});
const cartOpen=o=>{$('drawer').classList.toggle('open',o);$('scrim').classList.toggle('open',o)};
$('open-cart').onclick=()=>cartOpen(true);$('scrim').onclick=()=>cartOpen(false);$('drawer').querySelector('.close').onclick=()=>cartOpen(false);
addEventListener('keydown',e=>{if(e.key==='Escape'){cartOpen(false);closeQV()}});
document.querySelectorAll('[name=mode]').forEach(r=>r.onchange=()=>$('area-wrap').hidden=r.value!=='Delivery'||!r.checked);
let pt;function pop(t){const x=$('pop');x.innerHTML=`${t} <button id="vc">View cart</button>`;x.classList.add('show');$('vc').onclick=()=>{x.classList.remove('show');cartOpen(true)};clearTimeout(pt);pt=setTimeout(()=>x.classList.remove('show'),3500)}
$('checkout').addEventListener('submit',e=>{e.preventDefault();const t=$('msg'),f=e.target;t.className='toast show';
 if(!cart.length){t.textContent='Add at least one item first.';return}
 const lines=['New order from the website',`Name: ${f.cname.value}`,`Phone: ${f.cphone.value}`,`Method: ${f.mode.value}${f.mode.value==='Delivery'?' – '+(f.carea.value||'area not given'):''}`,...(f.cnote.value?[`Note: ${f.cnote.value}`]:[]),'',...cart.map(c=>{const p=PRODUCTS.find(x=>x.id===c.id);return `• ${p.name} (size ${c.size}) x${c.q} = ${fmt(p.price*c.q)}`}),'',`Total: ${fmt(total())}`];
 window.open(`https://wa.me/${SHOP.wa}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank');
 t.textContent='Opening WhatsApp. Send the message to confirm your order.';cart=[];keep();drawCart();f.reset();$('area-wrap').hidden=true});
drawShop();drawCart();
