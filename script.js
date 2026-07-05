/* ============================================================
   AL-BAZ GROUP — site behaviour
   Sections: page nav · language switch · image galleries
   ============================================================ */

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- page navigation ---------------- */
const pages = ['home','about','projects','contact'];

function go(page){
  pages.forEach(p => {
    document.getElementById('page-' + p).classList.toggle('on', p === page);
    document.querySelector('nav a[data-page="' + p + '"]').classList.toggle('active', p === page);
  });
  document.getElementById('nav').classList.remove('open');
  history.replaceState(null, '', '#' + page);
  window.scrollTo({top: 0, behavior: 'instant'});
  // galleries only autoplay while the projects page is visible
  Object.keys(galleries).forEach(id => {
    if (page === 'projects') startAuto(id); else stopAuto(id);
  });
}

function goProject(id){
  go('projects');
  requestAnimationFrame(() => {
    const el = document.getElementById('proj-' + id);
    if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
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
}

/* ============================================================
   IMAGE GALLERIES
   ------------------------------------------------------------
   HOW TO ADD YOUR PHOTOS
   Drop image files into  assets/<folder>/  and list them below.
   Each entry: { src: 'assets/foods/1.jpg', alt: 'caption', altAr: 'وصف' }
   Add as many as you like — the dots and arrows adjust automatically.
   If an image file is missing, a labelled placeholder shows instead,
   so the site never breaks while you are still collecting photos.
   ============================================================ */

const galleryData = {
  foods: {
    grad: 'linear-gradient(135deg,#4D9BFF,#1D5FD6)',
    images: [
      { src: 'assets/foods/1.jpg', alt: 'Production line', altAr: 'خط الإنتاج' },
      { src: 'assets/foods/2.jpg', alt: 'Product range',  altAr: 'تشكيلة المنتجات' },
      { src: 'assets/foods/3.jpg', alt: 'Packaging',      altAr: 'التعبئة والتغليف' }
    ]
  },
  tobacco: {
    grad: 'linear-gradient(135deg,#1E3A8A,#0A1E3F)',
    images: [
      { src: 'assets/tobacco/1.jpg', alt: 'Flavoring',   altAr: 'التنكيه' },
      { src: 'assets/tobacco/2.jpg', alt: 'Packing line', altAr: 'خط التعبئة' },
      { src: 'assets/tobacco/3.jpg', alt: 'Products',     altAr: 'المنتجات' }
    ]
  },
  visions: {
    grad: 'linear-gradient(135deg,#5E86C0,#1E3A6F)',
    images: [
      { src: 'assets/visions/1.jpg', alt: 'Warehouse', altAr: 'المستودع' },
      { src: 'assets/visions/2.jpg', alt: 'Logistics', altAr: 'اللوجستيات' },
      { src: 'assets/visions/3.jpg', alt: 'Goods',     altAr: 'البضائع' }
    ]
  },
  tayeb: {
    grad: 'linear-gradient(135deg,#2458B8,#0B2A66)',
    images: [
      { src: 'assets/tayeb/1.jpg', alt: 'Property', altAr: 'عقار' },
      { src: 'assets/tayeb/2.jpg', alt: 'Development', altAr: 'التطوير' },
      { src: 'assets/tayeb/3.jpg', alt: 'Investment', altAr: 'الاستثمار' }
    ]
  },
  beethoven: {
    grad: 'linear-gradient(135deg,#3B7DD8,#12305F)',
    images: [
      { src: 'assets/beethoven/1.jpg', alt: 'Dining room', altAr: 'صالة الطعام' },
      { src: 'assets/beethoven/2.jpg', alt: 'Coffee bar',  altAr: 'ركن القهوة' },
      { src: 'assets/beethoven/3.jpg', alt: 'Interior',    altAr: 'التصميم الداخلي' }
    ]
  }
};

const AUTO_MS = 4000;          // slide interval
const galleries = {};          // runtime state per gallery

function buildGallery(id){
  const root = document.querySelector('.gallery[data-gallery="' + id + '"]');
  if (!root) return;
  const data  = galleryData[id];
  const track = root.querySelector('.g-track');
  const dots  = root.querySelector('.g-dots');
  track.innerHTML = '';
  dots.innerHTML  = '';

  data.images.forEach((img, i) => {
    const slide = document.createElement('div');
    slide.className = 'g-slide' + (i === 0 ? ' on' : '');
    slide.style.background = data.grad;

    // real image; if it fails to load we keep the gradient + label placeholder
    const el = document.createElement('img');
    el.src = img.src;
    el.alt = img.alt;
    el.loading = 'lazy';
    el.onerror = () => { el.remove(); slide.classList.add('is-placeholder'); };

    const label = document.createElement('span');
    label.className = 'g-ph-label';
    label.dataset.ar = img.altAr;
    label.dataset.en = img.alt;
    label.textContent = (lang === 'ar') ? img.altAr : img.alt;

    slide.appendChild(el);
    slide.appendChild(label);
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'g-dot' + (i === 0 ? ' on' : '');
    dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
    dot.onclick = () => { galGo(id, i); };
    dots.appendChild(dot);
  });

  galleries[id] = { index: 0, count: data.images.length, timer: null, playing: true, root };
}

function render(id){
  const g = galleries[id];
  const slides = g.root.querySelectorAll('.g-slide');
  const dots   = g.root.querySelectorAll('.g-dot');
  slides.forEach((s, i) => s.classList.toggle('on', i === g.index));
  dots.forEach((d, i) => d.classList.toggle('on', i === g.index));
}

function galGo(id, i){
  const g = galleries[id];
  g.index = (i + g.count) % g.count;
  render(id);
  if (g.playing) startAuto(id);   // reset the timer after manual move
}
function galNext(id){ galGo(id, galleries[id].index + 1); }
function galPrev(id){ galGo(id, galleries[id].index - 1); }

function startAuto(id){
  const g = galleries[id];
  if (!g || !g.playing) return;
  stopAuto(id);
  g.timer = setInterval(() => { g.index = (g.index + 1) % g.count; render(id); }, AUTO_MS);
}
function stopAuto(id){
  const g = galleries[id];
  if (g && g.timer){ clearInterval(g.timer); g.timer = null; }
}

function galToggle(id){
  const g = galleries[id];
  g.playing = !g.playing;
  const btn = g.root.querySelector('.g-play');
  btn.dataset.playing = g.playing ? 'true' : 'false';
  btn.setAttribute('aria-label', g.playing ? 'Pause slideshow' : 'Play slideshow');
  if (g.playing) startAuto(id); else stopAuto(id);
}

/* pause a gallery while the pointer is hovering it */
function wireHover(id){
  const g = galleries[id];
  g.root.addEventListener('mouseenter', () => stopAuto(id));
  g.root.addEventListener('mouseleave', () => { if (g.playing) startAuto(id); });
}

/* build every gallery on load */
Object.keys(galleryData).forEach(id => { buildGallery(id); wireHover(id); });

/* ---------------- startup ---------------- */
const start = location.hash.replace('#','');
go(pages.includes(start) ? start : 'home');

/* contact form: graceful demo when the placeholder email is still set */
document.getElementById('contact-form').addEventListener('submit', function(e){
  if (this.action.includes('REPLACE_WITH_YOUR_EMAIL')) {
    e.preventDefault();
    const m = document.getElementById('sent-msg');
    m.style.display = 'block';
    m.scrollIntoView({behavior:'smooth', block:'center'});
  }
});
