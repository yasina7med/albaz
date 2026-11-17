/* ============================================================
   AL-BAZ GROUP — site behaviour
   page nav · language · logos · photo galleries · product catalog
   ============================================================ */

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- companies (logo folders) ---------------- */
const companies = {
  foods:     { folder: 'foods',     name: 'Al-Baz Foods',   nameAr: 'باز' },
  tobacco:   { folder: 'tobacco',   name: 'Al-Baz Tobacco', nameAr: 'الباز' },
  visions:   { folder: 'visions',   name: 'Modern Visions', nameAr: 'الرؤى' },
  tayeb:     { folder: 'tayeb',     name: 'Tayeb Al-Khair', nameAr: 'طيب الخير' },
  beethoven: { folder: 'beethoven', name: 'Beethoven',      nameAr: 'بيتهوفن' }
};

/* ---------------- product catalog (grouped by company) ---------------- */
const F = 'assets/foods/web/', J = 'assets/juice/web/', T = 'assets/tobacco/web/';
const ranges = [
  { en:'Baz Chips', ar:'شبس باز', note:'Corn snack', noteAr:'سناك الذرة', items:[
    { img:F+'1.jpg',  en:'Original',            ar:'الأصلي' },
    { img:F+'2.jpg',  en:'Barbecue',            ar:'باربيكيو' },
    { img:F+'10.jpg', en:'French Cheese',       ar:'جبنة فرنسية' },
    { img:F+'16.jpg', en:'Sweet Chili Pepper',  ar:'فلفل حار حلو' },
    { img:F+'20.png', en:'Lemon',      ar:'ليمون' }
  ]},
  { en:'Boshar', ar:'بوشار', note:'Popcorn', noteAr:'بوشار', items:[
    { img:F+'4.jpg', en:'Cheese',          ar:'جبنة' },
    { img:F+'5.jpg', en:'Pizza',           ar:'بيتزا' },
    { img:F+'6.jpg', en:'Salt & Vinegar',  ar:'ملح وخل' }
  ]},
  { en:'Tarbosh', ar:'طربوش', note:'Cones', noteAr:'طربوش', items:[
    { img:F+'7.jpg', en:'Cheese',        ar:'بطعم الجبنة' },
    { img:F+'8.jpg', en:'Sweet & Chili', ar:'الحار الحلو' }
  ]},
  { en:'Baz Max', ar:'باز ماكس', note:'Rippled potato chips', noteAr:'شرائح البطاطا المموجة', items:[
    { img:F+'12.jpg', en:'Salt & Vinegar', ar:'ملح وخل' },
    { img:F+'13.jpg', en:'Ketchup',        ar:'كاتشب' },
    { img:F+'14.jpg', en:'Yogurt & Herbs', ar:'لبن وأعشاب' },
    { img:F+'15.jpg', en:'Cheese',         ar:'جبنة' },
    { img:F+'11.jpg', en:'Cheese',         ar:'جبنة', chip:'Family', chipAr:'عائلي' },
    { img:F+'3.jpg',  en:'Peanut Snack',   ar:'بطعم الفستق' }
  ]},
  { en:'Baz Mix', ar:'مشكل باز', note:'Mixed snack', noteAr:'مشكل', items:[
    { img:F+'18.jpg', en:'Cheese Mix',  ar:'مشكل جبنة' },
    { img:F+'17.jpg', en:'Ketchup Mix', ar:'مشكل كاتشب' },
    { img:F+'19.jpg', en:'BBQ Mix',     ar:'مشكل مشاوي' },
    { img:F+'23.jpg', en:'Cheese Chips Mix',  ar:'مشكل شيبس جبنة', chip:'New', chipAr:'جديد' },
    { img:F+'24.jpg', en:'Ketchup Chips Mix', ar:'مشكل شيبس كاتشب', chip:'New', chipAr:'جديد' }
  ]},
  { en:'Puffs', ar:'بافز', note:'Puff snack', noteAr:'سناك البافز', items:[
    { img:F+'21.png', en:'Cheese Puffs',  ar:'بافز الجبنة' },
    { img:F+'22.png', en:'Ketchup Puffs', ar:'بافز الكاتشب' }
  ]},
  { en:'Baz Juice', ar:'عصائر باز', note:'250 ml', noteAr:'٢٥٠ مل', items:[
    { img:J+'1.jpg', en:'Orange',      ar:'برتقال' },
    { img:J+'2.jpg', en:'Pomegranate', ar:'رمان' },
    { img:J+'3.jpg', en:'Grape',       ar:'عنب' },
    { img:J+'4.jpg', en:'Peach',       ar:'خوخ' },
    { img:J+'5.jpg', en:'Mandarin (Lalanki)', ar:'لالنكي', chip:'New', chipAr:'جديد' },
    { img:J+'6.jpg', en:'Lemon',       ar:'ليمون', chip:'New', chipAr:'جديد' }
  ]}
];

const TP = 'assets/tobacco/packets/', TB = 'assets/tobacco/buckets/', V = 'assets/visions/web/';
const tobaccoRanges = [
  { en:'Flavor Boxes', ar:'علب النكهات', note:'Premium hookah flavors', noteAr:'نكهات الأركيلة الفاخرة', items:[
    { img:T+'1.jpg',  en:'Two Apple',        ar:'تفاحتين' },
    { img:T+'2.jpg',  en:'Grape',            ar:'عنب' },
    { img:T+'3.jpg',  en:'Strawberry',       ar:'فراولة' },
    { img:T+'4.jpg',  en:'Blueberry',        ar:'توت أزرق' },
    { img:T+'5.jpg',  en:'Lemon',            ar:'ليمون' },
    { img:T+'6.jpg',  en:'Orange',           ar:'برتقال' },
    { img:T+'7.jpg',  en:'Citrus',           ar:'حمضيات' },
    { img:T+'8.jpg',  en:'Melon',            ar:'شمّام' },
    { img:T+'9.jpg',  en:'Mint',             ar:'نعناع' },
    { img:T+'10.jpg', en:'Lemon & Mint',     ar:'ليمون ونعناع' },
    { img:T+'11.jpg', en:'Ice Lemon',        ar:'ليمون آيس' },
    { img:T+'12.jpg', en:'Ice Lemon & Mint', ar:'ليمون ونعناع مثلج' },
    { img:T+'13.jpg', en:'Gum',              ar:'علكة' },
    { img:T+'14.jpg', en:'Gum & Mint',       ar:'علكة ونعناع' },
    { img:T+'15.jpg', en:'Gum & Melon',      ar:'علكة وشمّام' },
    { img:T+'16.jpg', en:'Vanilla',          ar:'فانيلا' },
    { img:T+'17.jpg', en:'Ice Cream',        ar:'آيس كريم' },
    { img:T+'18.jpg', en:'Love 66',          ar:'لوف ٦٦' },
    { img:T+'19.jpg', en:'Dejavu',           ar:'ديجافو' },
    { img:T+'20.jpg', en:'Havana',           ar:'هافانا' },
    { img:T+'21.jpg', en:'Beethoven',        ar:'بيتهوفن' },
    { img:T+'22.jpg', en:'English',          ar:'إنجليزي' }
  ]},
  { en:'Molasses Packets', ar:'باكيت المعسل', note:'alBaz cartons', noteAr:'كراتين الباز', wide:true, items:[
    { img:TP+'1.jpg',  en:'Two Apple',       ar:'تفاحتين' },
    { img:TP+'2.jpg',  en:'Strawberry',      ar:'فراولة' },
    { img:TP+'3.jpg',  en:'Fresh Orange',    ar:'برتقال منعش' },
    { img:TP+'4.jpg',  en:'Fresh Lemon',     ar:'ليمون منعش' },
    { img:TP+'5.jpg',  en:'Lemon & Mint',    ar:'ليمون ونعناع' },
    { img:TP+'6.jpg',  en:'Gum & Mint',      ar:'علكة ونعناع' },
    { img:TP+'7.jpg',  en:'Fresh Gum',       ar:'علكة منعشة' },
    { img:TP+'8.jpg',  en:'Gum',             ar:'علكة' },
    { img:TP+'9.jpg',  en:'Iced Gum',        ar:'علكة مثلجة' },
    { img:TP+'10.jpg', en:'Ice Cream',       ar:'آيس كريم' },
    { img:TP+'11.jpg', en:'Love 66',         ar:'لوف ٦٦' },
    { img:TP+'12.jpg', en:'Havana',          ar:'هافانا' }
  ]},
  { en:'Hook Molasses', ar:'معسل هوك', note:'Hook cartons', noteAr:'كراتين هوك', wide:true, items:[
    { img:TP+'13.jpg', en:'Two Apple',       ar:'تفاحتين' },
    { img:TP+'14.jpg', en:'Lemon',           ar:'ليمون' },
    { img:TP+'15.jpg', en:'Iced Mint',       ar:'نعناع مثلج' },
    { img:TP+'16.jpg', en:'White Mint',      ar:'نعناع أبيض' },
    { img:TP+'17.jpg', en:'Apple',           ar:'تفاح' },
    { img:TP+'18.jpg', en:'French',          ar:'فرنسية' }
  ]},
  { en:'Molasses Buckets', ar:'سطل المعسل', note:'Bulk tubs', noteAr:'عبوات كبيرة', items:[
    { img:TB+'1.jpg',  en:'Two Apple',       ar:'تفاحتين' },
    { img:TB+'2.jpg',  en:'Fresh Citrus',    ar:'حمضيات منعشة' },
    { img:TB+'3.jpg',  en:'Fresh Orange',    ar:'برتقال منعش' },
    { img:TB+'4.jpg',  en:'Fresh Lemon',     ar:'ليمون منعش' },
    { img:TB+'5.jpg',  en:'Red Lemon & Mint', ar:'ليمون ونعناع أحمر' },
    { img:TB+'6.jpg',  en:'Gum',             ar:'علكة' },
    { img:TB+'7.jpg',  en:'Fresh Gum',       ar:'علكة منعشة' },
    { img:TB+'8.jpg',  en:'Iced Gum',        ar:'علكة مثلجة' },
    { img:TB+'9.jpg',  en:'Gum & Mint',      ar:'علكة ونعناع' },
    { img:TB+'10.jpg', en:'Melon & Gum',     ar:'شمّام وعلكة' },
    { img:TB+'11.jpg', en:'Vanilla',         ar:'فانيلا' },
    { img:TB+'12.jpg', en:'Beethoven',       ar:'بيتهوفن' },
    { img:TB+'13.jpg', en:'Dejavu',          ar:'ديجافو' },
    { img:TB+'14.jpg', en:'Love',            ar:'لوف' },
    { img:TB+'15.jpg', en:'Lady Care',       ar:'ليدي كير' },
    { img:TB+'16.jpg', en:'English',         ar:'إنجليزي' }
  ]}
];

const visionsRanges = [
  { en:'Hookah Accessories', ar:'مستلزمات الأركيلة', note:'Foil · charcoal · bowls · hoses', noteAr:'سلفان · فحم · رؤوس · قماجي', items:[
    { img:V+'1.jpg', en:'alBaz Aluminium Foil',     ar:'سلفان الباز' },
    { img:V+'2.jpg', en:'Hook Aluminium Foil',      ar:'سلفان هوك' },
    { img:V+'3.jpg', en:'alBaz Charcoal',           ar:'فحم الباز' },
    { img:V+'4.jpg', en:'Clay Bowl — Phunnel',      ar:'رأس أركيلة فخاري' },
    { img:V+'5.jpg', en:'Clay Bowl — Classic',      ar:'رأس أركيلة فخاري كلاسيك' },
    { img:V+'6.jpg', en:'Disposable Hookah Hose',   ar:'قمجي أركيلة' },
    { img:V+'7.jpg', en:'Charcoal Heating Basket',  ar:'سلة تسخين الفحم' },
    { img:V+'8.jpg', en:'Charcoal Basket with Handle', ar:'مقلاة الفحم' },
    { img:V+'9.jpg', en:'alBaz Molasses Carton',    ar:'كرتون معسل الباز' }
  ]}
];

/* products organized by the company that makes them */
const catalog = [
  { company:'Al-Baz Foods',   companyAr:'شركة باز للأطعمة الجاهزة', logo:'foods',
    tag:'Chips · Snacks · Juices', tagAr:'شبس · وجبات خفيفة · عصائر', groups:ranges },
  { company:'Al-Baz Tobacco', companyAr:'شركة الباز للتبوغ المعسلة', logo:'tobacco',
    tag:'Premium hookah molasses', tagAr:'تبغ الأركيلة المعسل الفاخر', groups:tobaccoRanges },
  { company:'Modern Visions', companyAr:'الرؤى الحديثة', logo:'visions',
    tag:'Hookahs & Supplies', tagAr:'الأراكيل ومستلزماتها', groups:visionsRanges }
];

function prodCard(p, click){
  const chip = p.chip ? `<span class="chip" data-ar="${p.chipAr||p.chip}">${p.chip}</span>` : '';
  const attrs = click ? ` role="button" tabindex="0" onclick="${click}" onkeypress="if(event.key==='Enter'||event.key===' '){${click};event.preventDefault()}"` : '';
  return `<div class="prod${p.wide ? ' wide' : ''}"${attrs}>
    <div class="shot"><img src="${p.img}" alt="${p.en}" loading="lazy"></div>
    <div class="prod-body">
      <div class="prod-name" data-ar="${p.ar}">${p.en}</div>
      <div class="prod-ar" data-ar="${p.en}">${p.ar}</div>
      ${chip}
    </div>
  </div>`;
}

function shotTile(src, alt, click){
  return `<div class="cp-shot" role="button" tabindex="0" onclick="${click}" onkeypress="if(event.key==='Enter'){${click}}"><img src="${src}" alt="${alt||''}" loading="lazy"></div>`;
}

/* restaurant / venue photos for companies that show a photo gallery */
const beethovenPhotos = [1,2,3,4,5,6,7,8,9].map(n => 'assets/beethoven/' + n + '.jpeg');   // Karrada (main)
const beethoven2Photos = [1,2,3,4,5,6,7].map(n => 'assets/beethoven2/' + n + '.jpg');       // Mansour (new)

function renderProducts(){
  // home auto-scrolling marquee (duplicated for a seamless loop)
  const track = document.getElementById('pc-track');
  if (track){
    const tiles = allProducts.map((p, i) => prodCard(p, `openGalleryAt(${i})`)).join('');
    track.innerHTML = tiles + tiles;
    track.style.animationDuration = Math.round(allProducts.length * 3.2) + 's';  // constant pace however many products
  }
  // each product company: one big feature image + a full product gallery below
  catalog.forEach(c => {
    const list = c.groups.reduce((a, g) => a.concat(g.items), []);
    const shots = document.getElementById('shots-' + c.logo);
    if (shots) shots.innerHTML = shotTile(list[0].img, list[0].en, `openGalleryKey('${c.logo}',0)`);
    const gal = document.getElementById('gallery-' + c.logo);
    if (!gal) return;
    // one sub-heading + grid per range; index keeps counting across ranges for the lightbox
    let idx = 0;
    gal.innerHTML = c.groups.map(g => {
      const head = c.groups.length > 1 ? `<div class="range-head">
          <h3 data-ar="${g.ar}">${g.en}</h3>
          ${g.note ? `<span class="r-note" data-ar="${g.noteAr||g.note}">${g.note}</span>` : ''}
          <span class="r-count">${g.items.length}</span>
        </div>` : '';
      const cards = g.items.map(p => prodCard(Object.assign({ wide: !!g.wide }, p), `openGalleryKey('${c.logo}',${idx++})`)).join('');
      return `<div class="range">${head}<div class="prod-grid${g.wide ? ' wide' : ''}">${cards}</div></div>`;
    }).join('');
  });
  // Beethoven — one photo set per branch
  photoSection('beethoven',  beethovenPhotos,  'Beethoven — Karrada', 'بيتهوفن — الكرادة');
  photoSection('beethoven2', beethoven2Photos, 'Beethoven — Mansour', 'بيتهوفن — المنصور');
}

function photoSection(key, photos, title, titleAr){
  const open = i => `openPhotos(${key}Photos,'${title}','${titleAr}',${i})`;
  const shots = document.getElementById('shots-' + key);
  if (shots) shots.innerHTML = shotTile(photos[0], title, open(0));
  const gal = document.getElementById('gallery-' + key);
  if (gal) gal.innerHTML = photos.map((s, i) =>
    `<div class="prod photo" role="button" tabindex="0" onclick="${open(i)}"><div class="shot"><img src="${s}" alt="${title}" loading="lazy"></div></div>`).join('');
}

/* ============================================================
   PRODUCT GALLERY LIGHTBOX — automatic, pops up
   ============================================================ */
let lbList = [], lbIndex = 0, lbTimer = null, lbPlaying = true;
const LB_MS = 3000;

function openGallery(key){
  lbList = key ? allProducts.filter(p => p.key === key) : allProducts.slice();
  lbIndex = 0; lbRender(); lbOpen();
}
function openGalleryKey(key, i){
  lbList = allProducts.filter(p => p.key === key);
  lbIndex = ((i % lbList.length) + lbList.length) % lbList.length;
  lbRender(); lbOpen();
}
function openGalleryAt(i){
  lbList = allProducts.slice();
  lbIndex = ((i % lbList.length) + lbList.length) % lbList.length;
  lbRender(); lbOpen();
}
/* generic photo viewer (venues, restaurant, etc.) */
function openPhotos(imgs, title, titleAr, i){
  lbList = imgs.map(src => ({ img: src, company: title, companyAr: titleAr, en: '', ar: '' }));
  lbIndex = i || 0; lbRender(); lbOpen();
}
function lbRender(){
  const p = lbList[lbIndex]; if (!p) return;
  const img = document.getElementById('lb-image');
  img.src = p.img; img.alt = p.en;
  document.getElementById('lb-company').textContent = (lang === 'ar') ? p.companyAr : p.company;
  document.getElementById('lb-name').textContent    = (lang === 'ar') ? p.ar : p.en;
  document.getElementById('lb-ar').textContent      = (lang === 'ar') ? p.en : p.ar;
  document.getElementById('lb-count').textContent   = (lbIndex + 1) + ' / ' + lbList.length;
}
function lbOpen(){
  const lb = document.getElementById('lightbox');
  lb.classList.add('on'); lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lbPlaying = true; lbStart();
}
function closeGallery(){
  const lb = document.getElementById('lightbox');
  lb.classList.remove('on'); lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; lbStop();
}
function lbStep(d){ lbIndex = (lbIndex + d + lbList.length) % lbList.length; lbRender(); }
function lbManual(d){ lbStep(d); if (lbPlaying) lbStart(); }   // reset timer on manual nav
function lbStart(){ lbStop(); if (lbPlaying) lbTimer = setInterval(() => lbStep(1), LB_MS); lbPlayBtn(); }
function lbStop(){ if (lbTimer){ clearInterval(lbTimer); lbTimer = null; } }
function lbToggle(){ lbPlaying = !lbPlaying; lbPlaying ? lbStart() : (lbStop(), lbPlayBtn()); }
function lbPlayBtn(){
  const b = document.getElementById('lb-play');
  b.dataset.playing = lbPlaying ? 'true' : 'false';
  b.setAttribute('aria-label', lbPlaying ? 'Pause' : 'Play');
}
// pause while hovering the image/caption
(function(){
  const stage = document.getElementById('lb-stage');
  if (stage){
    stage.addEventListener('mouseenter', lbStop);
    stage.addEventListener('mouseleave', () => { if (lbPlaying) lbStart(); });
  }
  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('on')) return;
    if (e.key === 'Escape') closeGallery();
    else if (e.key === 'ArrowRight') lbManual(1);
    else if (e.key === 'ArrowLeft') lbManual(-1);
  });
})();

/* flat list of every product, tagged with its company */
const allProducts = [];
catalog.forEach(c => c.groups.forEach(g => g.items.forEach(it =>
  allProducts.push(Object.assign({}, it, {
    key: c.logo, company: c.company, companyAr: c.companyAr, range: g.en, rangeAr: g.ar, wide: !!g.wide
  }))
)));

/* ---------------- page navigation ---------------- */
const pages = ['home','about','companies','contact'];

function go(page){
  if (!pages.includes(page)) page = 'home';
  pages.forEach(p => {
    document.getElementById('page-' + p).classList.toggle('on', p === page);
    const link = document.querySelector('nav a[data-page="' + p + '"]');
    if (link) link.classList.toggle('active', p === page);
  });
  document.getElementById('nav').classList.remove('open');
  history.replaceState(null, '', '#' + page);
  window.scrollTo({ top: 0, behavior: 'instant' });
  Object.keys(galleries).forEach(id => { page === 'companies' ? startAuto(id) : stopAuto(id); });
}

function goCompany(id){
  go('companies');
  requestAnimationFrame(() => {
    const el = document.getElementById('comp-' + id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ---------------- language switch ---------------- */
let lang = 'en';
function toggleLang(){
  lang = (lang === 'en') ? 'ar' : 'en';
  document.querySelectorAll('[data-ar]').forEach(el => {
    if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
    el.innerHTML = (lang === 'ar') ? el.dataset.ar : el.dataset.en;
  });
  document.querySelectorAll('[data-ph-ar]').forEach(el => {
    if (el.dataset.phEn === undefined) el.dataset.phEn = el.placeholder;
    el.placeholder = (lang === 'ar') ? el.dataset.phAr : el.dataset.phEn;
  });
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  document.getElementById('lang-btn').textContent = (lang === 'ar') ? 'English' : 'عربي';
  document.querySelectorAll('.logo-mono').forEach(m => {
    m.textContent = (lang === 'ar') ? (m.dataset.ar || '') : (m.dataset.en || '');
  });
  if (document.getElementById('lightbox').classList.contains('on')) lbRender();
}

/* ---------------- company logos ---------------- */
const LOGO_EXTS = ['png', 'svg', 'jpg', 'jpeg', 'webp'];
function mountLogo(slot){
  const c = companies[slot.dataset.company];
  if (!c) return;
  let attempt = 0;
  const img = document.createElement('img');
  img.className = 'company-logo';
  img.alt = c.name + ' logo';
  img.loading = 'lazy';
  img.onerror = () => {
    attempt++;
    if (attempt < LOGO_EXTS.length){
      img.src = 'assets/' + c.folder + '/logo.' + LOGO_EXTS[attempt];
    } else {
      img.remove();
      const mono = document.createElement('span');
      mono.className = 'logo-mono';
      mono.dataset.en = c.name.split(/\s+/).map(w => w[0]).join('').slice(0,2).toUpperCase();
      mono.dataset.ar = c.nameAr;
      mono.style.cssText = 'font-family:Fraunces,serif;font-size:34px;font-weight:600;color:var(--gold-deep)';
      mono.textContent = (lang === 'ar') ? c.nameAr : mono.dataset.en;
      slot.appendChild(mono);
    }
  };
  img.src = 'assets/' + c.folder + '/logo.' + LOGO_EXTS[0];
  slot.innerHTML = '';
  slot.appendChild(img);
}

/* ---------------- photo galleries (tobacco, beethoven) ---------------- */
const IMG_EXTS = ['jpg','jpeg','png','webp'];
const MAX_PROBE = 30;
const AUTO_MS = 4500;
const galleries = {};

function tryImage(base){
  return new Promise(resolve => {
    let i = 0;
    const attempt = () => {
      if (i >= IMG_EXTS.length){ resolve(null); return; }
      const im = new Image();
      const url = base + '.' + IMG_EXTS[i];
      im.onload = () => resolve(url);
      im.onerror = () => { i++; attempt(); };
      im.src = url;
    };
    attempt();
  });
}
async function probeFolder(folder){
  const found = [];
  for (let n = 1; n <= MAX_PROBE; n++){
    const url = await tryImage('assets/' + folder + '/' + n);
    if (!url) break;
    found.push(url);
  }
  return found;
}
async function buildGallery(key, folder){
  const root = document.querySelector('.gallery[data-gallery="' + key + '"]');
  if (!root) return;
  const track = root.querySelector('.g-track');
  const dots  = root.querySelector('.g-dots');
  const imgs = await probeFolder(folder);
  if (imgs.length === 0) return;
  track.innerHTML = ''; dots.innerHTML = '';
  imgs.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'g-slide' + (i === 0 ? ' on' : '');
    const el = document.createElement('img');
    el.src = src; el.alt = key + ' image ' + (i + 1); el.loading = 'lazy';
    slide.appendChild(el); track.appendChild(slide);
    const dot = document.createElement('button');
    dot.className = 'g-dot' + (i === 0 ? ' on' : '');
    dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
    dot.onclick = () => galGo(key, i);
    dots.appendChild(dot);
  });
  const single = imgs.length < 2;
  root.querySelectorAll('.g-arrow, .g-dots').forEach(c => c.style.display = single ? 'none' : '');
  galleries[key] = { index: 0, count: imgs.length, timer: null, playing: !single, root };
}
function render(id){
  const g = galleries[id];
  g.root.querySelectorAll('.g-slide').forEach((s, i) => s.classList.toggle('on', i === g.index));
  g.root.querySelectorAll('.g-dot').forEach((d, i) => d.classList.toggle('on', i === g.index));
}
function galGo(id, i){
  const g = galleries[id]; if (!g) return;
  g.index = (i + g.count) % g.count; render(id);
  if (g.playing) startAuto(id);
}
function galNext(id){ galGo(id, galleries[id].index + 1); }
function galPrev(id){ galGo(id, galleries[id].index - 1); }
function startAuto(id){
  const g = galleries[id]; if (!g || !g.playing || g.count < 2) return;
  stopAuto(id);
  g.timer = setInterval(() => { g.index = (g.index + 1) % g.count; render(id); }, AUTO_MS);
}
function stopAuto(id){ const g = galleries[id]; if (g && g.timer){ clearInterval(g.timer); g.timer = null; } }
function wireHover(id){
  const g = galleries[id]; if (!g) return;
  g.root.addEventListener('mouseenter', () => stopAuto(id));
  g.root.addEventListener('mouseleave', () => { if (g.playing) startAuto(id); });
}

/* ---------------- company tree scroll-reveal ---------------- */
function initTree(){
  const branches = document.querySelectorAll('#company-tree .branch');
  if (!branches.length) return;
  if (!('IntersectionObserver' in window)){ branches.forEach(b => b.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.3, rootMargin: '0px 0px -8% 0px' });
  branches.forEach(b => io.observe(b));
}

/* ---------------- header shrink / hide on scroll ---------------- */
(function(){
  const header = document.querySelector('header');
  let lastY = window.scrollY, ticking = false;
  function update(){
    const y = window.scrollY;
    const navOpen = document.getElementById('nav').classList.contains('open');
    header.classList.toggle('scrolled', y > 14);
    if (navOpen || y < 260){
      header.classList.remove('hidden');           // always visible near top / with menu open
    } else if (y > lastY + 6){
      header.classList.add('hidden');              // scrolling down → tuck away
    } else if (y < lastY - 6){
      header.classList.remove('hidden');           // scrolling up → reveal
    }
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking){ requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

/* ---------------- startup ---------------- */
renderProducts();
document.querySelectorAll('.logo-slot[data-company]').forEach(mountLogo);
initTree();

const start = location.hash.replace('#','');
go(pages.includes(start) ? start : 'home');

/* contact form: graceful demo when the placeholder email is still set */
document.getElementById('contact-form').addEventListener('submit', function(e){
  if (this.action.includes('REPLACE_WITH_YOUR_EMAIL')){
    e.preventDefault();
    const m = document.getElementById('sent-msg');
    m.style.display = 'block';
    m.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});
