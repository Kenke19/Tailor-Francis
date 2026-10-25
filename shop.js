const PRODUCTS=[
{id:1,name:'Chic Two-Piece',cat:'Two-Piece',price:18,sizes:['M','L','XL','XXL'],img:'img/r2w.webp'},
{id:2,name:'Blue Men Two-Piece',cat:'Two-Piece',price:50,sizes:['M','L','XL'],img:'img/r2wm.webp'},
{id:3,name:'Classic Romper',cat:'Two-Piece',price:10,sizes:['M','L','XL','XXL'],img:'img/r2w2.webp'},
{id:4,name:'Cotton Set',cat:'Two-Piece',price:50,sizes:['L','XL','XXL'],img:'img/r2wm3.webp'},
{id:5,name:'Ankara Two-Piece',cat:'Ankara wear',price:40,sizes:['M','L','XL'],img:'img/r2wm2.webp'},
{id:6,name:'Women Navy Set',cat:'Two-Piece',price:180,sizes:['S','M','L','XL'],img:'img/r2w1.webp'},
{id:7,name:'T-Shirt Set',cat:'Shirts',price:90,sizes:['S','M','L','XL'],img:'img/r2wm1.webp'},
{id:8,name:'Tailored Senator',cat:'Senator',price:200,sizes:['XL','L','2XL','3XL'],img:'img/senator3.webp'}
];
const fmt=n=>'£'+n.toLocaleString('en-NG');
const grid=document.getElementById('shop-grid'),cartEl=document.getElementById('cart-items');
let cart=JSON.parse(localStorage.getItem('ft_cart')||'[]'),cat='All';
const save=()=>{localStorage.setItem('ft_cart',JSON.stringify(cart));drawCart()};
function drawShop(){
 grid.innerHTML=PRODUCTS.filter(p=>cat==='All'||p.cat===cat).map(p=>`<article class="product">${p.img?`<img src="${p.img}" alt="${p.name}">`:`<div class="ph">${p.name}</div>`}
 <div class="info"><h3>${p.name}</h3><span class="price">${fmt(p.price)}</span>
 <label class="note" for="s${p.id}">Size</label><select id="s${p.id}">${p.sizes.map(s=>`<option>${s}</option>`).join('')}</select>
 <button class="btn" data-add="${p.id}">Add to cart</button></div></article>`).join('')||'<p>No items in this category yet.</p>'}
function drawCart(){
 const n=cart.reduce((a,c)=>a+c.q,0),t=cart.reduce((a,c)=>a+c.q*c.price,0);
 document.getElementById('cart-count').textContent=n;document.getElementById('cart-total').textContent=fmt(t);
 cartEl.innerHTML=cart.length?cart.map((c,i)=>`<div class="ci"><div>${c.name}<br><small>Size ${c.size} · ${fmt(c.price)}</small></div><div><button data-q="${i}" data-d="-1" aria-label="Remove one">−</button> ${c.q} <button data-q="${i}" data-d="1" aria-label="Add one">+</button></div></div>`).join(''):'<p>Your cart is empty. Add something you like.</p>'}
const cats=['All',...new Set(PRODUCTS.map(p=>p.cat))];
document.getElementById('cats').innerHTML=cats.map(c=>`<button class="${c===cat?'on':''}">${c}</button>`).join('');
document.getElementById('cats').addEventListener('click',e=>{if(e.target.tagName!=='BUTTON')return;cat=e.target.textContent;
 document.querySelectorAll('#cats button').forEach(b=>b.classList.toggle('on',b.textContent===cat));drawShop()});
grid.addEventListener('click',e=>{const id=+e.target.dataset.add;if(!id)return;
 const p=PRODUCTS.find(x=>x.id===id),size=document.getElementById('s'+id).value,hit=cart.find(c=>c.id===id&&c.size===size);
 hit?hit.q++:cart.push({id,name:p.name,price:p.price,size,q:1});save();e.target.textContent='Added ✓';setTimeout(()=>e.target.textContent='Add to cart',900)});
cartEl.addEventListener('click',e=>{const i=e.target.dataset.q;if(i===undefined)return;cart[i].q+=+e.target.dataset.d;if(cart[i].q<1)cart.splice(i,1);save()});
const dr=document.getElementById('drawer');
document.getElementById('open-cart').onclick=()=>dr.classList.add('open');
dr.querySelector('.close').onclick=()=>dr.classList.remove('open');
addEventListener('keydown',e=>e.key==='Escape'&&dr.classList.remove('open'));
document.getElementById('checkout').addEventListener('submit',e=>{e.preventDefault();
 const t=document.getElementById('msg');t.className='toast show';
 if(!cart.length){t.textContent='Add at least one item first.';return}
 const f=e.target,total=cart.reduce((a,c)=>a+c.q*c.price,0);
 const lines=['New order from the website',`Name: ${f.cname.value}`,`Phone: ${f.cphone.value}`,`Delivery area: ${f.carea.value||'—'}`,'',...cart.map(c=>`• ${c.name} (size ${c.size}) x${c.q} = ${fmt(c.q*c.price)}`),'',`Total: ${fmt(total)}`];
 window.open(`https://wa.me/${SHOP.wa}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank');
 t.textContent='Opening WhatsApp. Send the message to confirm your order.';cart=[];save();f.reset()});
drawShop();drawCart();