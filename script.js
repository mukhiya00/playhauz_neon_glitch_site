
const qs = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => [...el.querySelectorAll(s)];

function smoothScrollTo(id){
  const target = document.querySelector(id);
  if(!target) return;
  target.scrollIntoView({behavior:'smooth', block:'start'});
}

qsa('[data-scroll]').forEach(btn=>{
  btn.addEventListener('click', ()=> smoothScrollTo(btn.getAttribute('data-scroll')));
});

const burger = qs('.burger');
const nav = qs('.nav');
if(burger){
  burger.addEventListener('click', ()=>{
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    nav.style.display = open ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '58px';
    nav.style.right = '12px';
    nav.style.padding = '10px';
    nav.style.background = 'rgba(5,2,12,.85)';
    nav.style.backdropFilter = 'blur(14px)';
    nav.style.border = '1px solid rgba(255,255,255,.10)';
    nav.style.borderRadius = '16px';
  });
}

/* Occasion toggle */
qsa('.occ').forEach(b=>{
  b.addEventListener('click', ()=>{
    qsa('.occ').forEach(x=>x.classList.remove('is-active'));
    b.classList.add('is-active');
  });
});

/* Add-on total demo */
const baseTotal = 3049;
const addonPrices = new Map([
  ['Rose Heart Balloon',150],
  ['Candle Path',300],
  ['LED Numbers',100],
  ['Small Heart Pillow',200],
  ['Event Sash',100],
  ['Crown',150],
  ['Bouquet (10 roses)',350],
  ['Luxe Bouquet',499],
  ['Sparkle Candle',30],
  ['Photoshoot (15 min)',300],
  ['Photoshoot (30 min)',700],
  ['Fog Entry (3 pots)',990],
]);

function calcTotal(){
  let count = 0;
  let extra = 0;
  qsa('.addon').forEach(lbl=>{
    const cb = lbl.querySelector('input[type=checkbox]');
    const name = lbl.querySelector('span')?.textContent?.trim() || '';
    if(cb && cb.checked){
      count++;
      extra += addonPrices.get(name) || 0;
    }
  });
  qs('#addonCount').textContent = String(count);
  qs('#estimatedTotal').textContent = '₹ ' + String(baseTotal + extra);
}
qsa('.addon input[type=checkbox]').forEach(cb=>cb.addEventListener('change', calcTotal));
calcTotal();

/* Terms agree */
const agree = qs('#agree');
const finalBtn = qs('#finalBtn');
if(agree && finalBtn){
  agree.addEventListener('change', ()=>{ finalBtn.disabled = !agree.checked; });
}
