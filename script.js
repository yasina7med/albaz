/* ============================================================
   AL-BAZ GROUP — site behaviour
   Sections: page nav · language switch · logos · image galleries
   ============================================================ */

document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================================
   COMPANIES
   ------------------------------------------------------------
   One entry per company. `folder` is the assets sub-folder.
   `name` / `nameAr` are used as the fallback logo monogram text.
   ============================================================ */
const companies = {
  foods:     { folder: 'foods',     name: 'Baz Foods',      nameAr: 'باز' },
  tobacco:   { folder: 'tobacco',   name: 'Al-Baz Tobacco', nameAr: 'الباز' },
  visions:   { folder: 'visions',   name: 'Modern Visions', nameAr: 'الرؤى' },
  tayeb:     { folder: 'tayeb',     name: 'Tayeb Al-Khair', nameAr: 'طيب الخير' },
  beethoven: { folder: 'beethoven', name: 'Beethoven',      nameAr: 'بيتهوفن' }
};

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
  // keep placeholder monogram text in the current language
  document.querySelectorAll('.logo-mono').forEach(m => {
    m.textContent = (lang === 'ar') ? (m.dataset.ar || '') : (m.dataset.en || '');
  });
}

/* ============================================================
   LOGOS
   ------------------------------------------------------------
   Each company slot tries to load, in order:
       assets/<folder>/logo.png
       assets/<folder>/logo.svg
       assets/<folder>/logo.jpg
   The first that loads is shown. If none exist, a clean monogram
   (first letters of the name) is drawn instead — no broken images.
   Just drop a "logo.png" into the folder and it appears everywhere.
   ============================================================ */
const LOGO_EXTS = ['png', 'svg', 'jpg', 'jpeg', 'webp'];

function mountLogo(slot){
  const key = slot.dataset.company;
  const c = companies[key];
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
      // no logo file found — draw a monogram fallback
      img.remove();
      const mono = document.createElement('span');
      mono.className = 'logo-mono';
      mono.dataset.en = monogram(c.name);
      mono.dataset.ar = c.nameAr;
      mono.textContent = (lang === 'ar') ? c.nameAr : monogram(c.name);
      slot.appendChild(mono);
    }
  };

  img.src = 'assets/' + c.folder + '/logo.' + LOGO_EXTS[0];
  slot.innerHTML = '';
  slot.appendChild(img);
}

function monogram(name){
  return name.split(/\s+/).map(w => w[0]).join('').slice(0,3).toUpperCase();
}

const GRADS = {
  // foods:     'linear-gradient(135deg,#4D9BFF,#1D5FD6)',
  tobacco:   'linear-gradient(135deg,#1E3A8A,#0A1E3F)',
  visions:   'linear-gradient(135deg,#5E86C0,#1E3A6F)',
  tayeb:     'linear-gradient(135deg,#2458B8,#0B2A66)',
  beethoven: 'linear-gradient(135deg,#3B7DD8,#12305F)'
};

const IMG_EXTS = ['png','jpg','jpeg','webp','gif'];
const MAX_PROBE = 40;   // safety cap on how many numbers to check
const AUTO_MS = 4000;
const galleries = {};

/* try to load one image; resolve with the working URL or null */
function tryImage(base){
  return new Promise(resolve => {
    let i = 0;
    const attempt = () => {
      if (i >= IMG_EXTS.length){ resolve(null); return; }
      const url = base + '.' + IMG_EXTS[i];
      const im = new Image();
      im.onload  = () => resolve(url);
      im.onerror = () => { i++; attempt(); };
      im.src = url;
    };
    attempt();
  });
}

/* probe 1,2,3... in a folder until a number is missing */
async function probeFolder(key){
  const folder = companies[key].folder;
  const found = [];
  for (let n = 1; n <= MAX_PROBE; n++){
    const url = await tryImage('assets/' + folder + '/' + n);
    if (!url) break;          // first gap = end of the sequence
    found.push({ src: url, alt: 'Image ' + n, altAr: 'صورة ' + n });
  }
  return found;
}

async function buildGallery(key){
  const root = document.querySelector('.gallery[data-gallery="' + key + '"]');
  if (!root) return;
  const track = root.querySelector('.g-track');
  const dots  = root.querySelector('.g-dots');
  const grad  = GRADS[key];
  track.innerHTML = '';
  dots.innerHTML  = '';

  let images = await probeFolder(key);

  if (images.length === 0){
    images = [{ src: '', alt: 'Photos coming soon', altAr: 'الصور قريباً' }];
  }

  images.forEach((img, i) => {
    const slide = document.createElement('div');
    slide.className = 'g-slide' + (i === 0 ? ' on' : '');

    if (img.src){
      const el = document.createElement('img');
      el.src = img.src;
      el.alt = img.alt;
      el.loading = 'lazy';
      slide.appendChild(el);
    } else {
      // only the empty-folder placeholder gets the coloured gradient
      slide.style.background = grad;
      slide.classList.add('is-placeholder');
    }

    const label = document.createElement('span');
    label.className = 'g-ph-label';
    label.dataset.ar = img.altAr || img.alt;
    label.dataset.en = img.alt;
    label.textContent = (lang === 'ar') ? (img.altAr || img.alt) : img.alt;
    slide.appendChild(label);

    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'g-dot' + (i === 0 ? ' on' : '');
    dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
    dot.onclick = () => galGo(key, i);
    dots.appendChild(dot);
  });

  const single = images.length < 2;
  root.querySelectorAll('.g-arrow, .g-play, .g-dots').forEach(c => {
    c.style.display = single ? 'none' : '';
  });

  galleries[key] = { index: 0, count: images.length, timer: null, playing: !single, root };
}

function render(id){
  const g = galleries[id];
  g.root.querySelectorAll('.g-slide').forEach((s, i) => s.classList.toggle('on', i === g.index));
  g.root.querySelectorAll('.g-dot').forEach((d, i) => d.classList.toggle('on', i === g.index));
}

function galGo(id, i){
  const g = galleries[id];
  if (!g) return;
  g.index = (i + g.count) % g.count;
  render(id);
  if (g.playing) startAuto(id);
}
function galNext(id){ galGo(id, galleries[id].index + 1); }
function galPrev(id){ galGo(id, galleries[id].index - 1); }

function startAuto(id){
  const g = galleries[id];
  if (!g || !g.playing || g.count < 2) return;
  stopAuto(id);
  g.timer = setInterval(() => { g.index = (g.index + 1) % g.count; render(id); }, AUTO_MS);
}
function stopAuto(id){
  const g = galleries[id];
  if (g && g.timer){ clearInterval(g.timer); g.timer = null; }
}

function galToggle(id){
  const g = galleries[id];
  if (!g) return;
  g.playing = !g.playing;
  const btn = g.root.querySelector('.g-play');
  btn.dataset.playing = g.playing ? 'true' : 'false';
  btn.setAttribute('aria-label', g.playing ? 'Pause slideshow' : 'Play slideshow');
  if (g.playing) startAuto(id); else stopAuto(id);
}

function wireHover(id){
  const g = galleries[id];
  if (!g) return;
  g.root.addEventListener('mouseenter', () => stopAuto(id));
  g.root.addEventListener('mouseleave', () => { if (g.playing) startAuto(id); });
}

/* ---------------- startup ---------------- */
// mount logos everywhere they appear
document.querySelectorAll('.logo-slot[data-company]').forEach(mountLogo);

// build galleries (async), then wire hover-pause
(async () => {
  for (const key of Object.keys(companies)){
    await buildGallery(key);
    wireHover(key);
  }
  const start = location.hash.replace('#','');
  go(pages.includes(start) ? start : 'home');
})();

/* contact form: graceful demo when the placeholder email is still set */
document.getElementById('contact-form').addEventListener('submit', function(e){
  if (this.action.includes('REPLACE_WITH_YOUR_EMAIL')) {
    e.preventDefault();
    const m = document.getElementById('sent-msg');
    m.style.display = 'block';
    m.scrollIntoView({behavior:'smooth', block:'center'});
  }
});