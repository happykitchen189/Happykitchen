/* =========================================================
   CART / PESANAN STATE
   ========================================================= */
let pesanan = JSON.parse(localStorage.getItem('pesanan') || '[]');
let orderDate = localStorage.getItem('orderDate') || '';
let orderNotes = localStorage.getItem('orderNotes') || '';

function savePesanan() {
  localStorage.setItem('pesanan', JSON.stringify(pesanan));
  localStorage.setItem('orderDate', orderDate);
  localStorage.setItem('orderNotes', orderNotes);
  updateCartCount();
}

function updateCartCount() {
  const count = pesanan.reduce((s,i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = count;
}

function addToPesanan(productId, qty = 1) {
  const product = ALL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = pesanan.find(p => p.id === productId);
  if (existing) existing.qty += qty;
  else pesanan.push({ id: product.id, name: product.name, price: product.price, unit: product.unit || 'per porsi', categoryId: product.categoryId, qty });
  savePesanan();
  showToast(`✓ ${product.name} ditambahkan`);
}

function updateQty(productId, delta) {
  const item = pesanan.find(p => p.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  savePesanan();
  if (currentRoute === 'pesanan') renderPesananPage();
}

function setQty(productId, qty) {
  const item = pesanan.find(p => p.id === productId);
  if (!item) return;
  item.qty = Math.max(1, qty);
  savePesanan();
  if (currentRoute === 'pesanan') renderPesananPage();
}

function removeItem(productId) {
  pesanan = pesanan.filter(p => p.id !== productId);
  savePesanan();
  if (currentRoute === 'pesanan') renderPesananPage();
}

function formatRp(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = 'position:fixed;bottom:88px;left:50%;transform:translateX(-50%) translateY(10px);background:var(--primary);color:var(--neutral);padding:12px 20px;border-radius:var(--r-sm);font-family:var(--font-mono);font-size:13px;z-index:300;opacity:0;transition:all 300ms;pointer-events:none;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
  }, 1800);
}

/* =========================================================
   WHATSAPP
   ========================================================= */
function buildWhatsAppMessage() {
  if (pesanan.length === 0) {
    return `Halo kak Happy Kitchen, saya tertarik dengan menu-menu di website. Boleh dibantu info lebih lanjut? 🙏`;
  }
  const items = pesanan.map(p => `• ${p.name} x${p.qty}`).join('\n');
  const total = pesanan.reduce((s,p) => s + p.price * p.qty, 0);
  let msg = `Halo kak Happy Kitchen, saya mau tanya apakah menu berikut masih tersedia:\n\n${items}\n\n`;
  if (orderDate) {
    const d = new Date(orderDate);
    const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    const pretty = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    msg += `Untuk tanggal:\n${pretty}\n\n`;
    msg += `Apakah masih bisa untuk tanggal tersebut? 🙏`;
  } else {
    msg += `Mohon info ketersediaan dan tanggal terdekat ya kak. 🙏`;
  }
  if (orderNotes) {
    msg += `\n\nCatatan:\n${orderNotes}`;
  }
  msg += `\n\nEstimasi total: ${formatRp(total)}`;
  return msg;
}

function openWhatsApp() {
  const msg = encodeURIComponent(buildWhatsAppMessage());
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
}

function sendOrderToWA() {
  if (pesanan.length === 0) {
    showToast('Daftar pesanan masih kosong');
    return;
  }
  openWhatsApp();
}

/* =========================================================
   ROUTER
   ========================================================= */
let currentRoute = 'home';
let currentRouteParam = null;
let currentCatFilter = 'all';
let currentSort = 'default';
let currentPage = 1;
const PER_PAGE = 12;

function navigate(route, param = null) {
  if (param) window.location.hash = `#/${route}/${param}`;
  else window.location.hash = `#/${route}`;
  toggleMobileNav(false);
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function parseRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '') || 'home';
  const parts = hash.split('/');
  return { route: parts[0] || 'home', param: parts[1] || null };
}

function renderRoute() {
  const { route, param } = parseRoute();
  currentRoute = route;
  currentRouteParam = param;
  const app = document.getElementById('app');
  app.classList.remove('fade-in');
  void app.offsetWidth;
  app.classList.add('fade-in');

  switch(route) {
    case 'home': renderHome(); break;
    case 'kategori':
      if (param) renderCategoryDetail(param);
      else renderKategoriAll();
      break;
    case 'produk': renderProductDetail(param); break;
    case 'pesanan': renderPesananPage(); break;
    case 'tentang': renderTentangPage(); break;
    case 'kontak': renderKontakPage(); break;
    default: renderHome();
  }

  updateNavActive();
  updateCartCount();
}

window.addEventListener('hashchange', renderRoute);

/* =========================================================
   NAV
   ========================================================= */
function renderNav() {
  const links = [
    { id: 'home', label: 'Beranda', route: 'home' },
    { id: 'kategori', label: 'Kategori', route: 'kategori' },
    { id: 'tentang', label: 'Tentang', route: 'tentang' },
    { id: 'kontak', label: 'Kontak', route: 'kontak' },
  ];
  document.getElementById('navLinks').innerHTML = links.map(l =>
    `<a data-route="${l.route}" onclick="navigate('${l.route}')">${l.label}</a>`
  ).join('');
  document.getElementById('mobileNavList').innerHTML = links.map(l =>
    `<li><a data-route="${l.route}" onclick="navigate('${l.route}')">${l.label}</a></li>`
  ).join('') + `<li><a data-route="pesanan" onclick="navigate('pesanan')">Daftar Pesanan</a></li>`;
  // Footer categories (top 6)
  document.getElementById('footerCats').innerHTML = CATEGORIES.slice(0,6).map(c =>
    `<li><a onclick="navigate('kategori','${c.id}')">${c.name}</a></li>`
  ).join('');
}

function updateNavActive() {
  document.querySelectorAll('.nav-links a, .mobile-nav-list a').forEach(a => {
    const r = a.getAttribute('data-route');
    if (r === currentRoute || (r === 'kategori' && currentRoute === 'kategori')) a.classList.add('active');
    else a.classList.remove('active');
  });
}

function toggleMobileNav(open) {
  document.getElementById('mobileNav').classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

/* =========================================================
   HOME PAGE
   ========================================================= */
function renderHome() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <!-- Hero -->
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <div class="hero-eyebrow">Homemade · Pre-order</div>
          <h1 class="h-display">Rasa rumahan,<br/>dibuat dengan <em>cinta</em>.</h1>
          <p class="lead">Dari kue pasar klasik hingga catering rumahan — setiap hidangan Happy Kitchen dimasak fresh dengan resep turun-temurun. Sistem pre-order H-2 untuk hasil terbaik.</p>
          <div class="hero-ctas">
            <button class="btn btn-primary" onclick="navigate('kategori')">Jelajahi Menu →</button>
            <button class="btn btn-secondary" onclick="openWhatsApp()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Tanya via WhatsApp
            </button>
          </div>
          <div class="hero-meta">
            <div class="hero-meta-item">
              <div class="num">${ALL_PRODUCTS.length}+</div>
              <div class="lbl">Menu tersedia</div>
            </div>
            <div class="hero-meta-item">
              <div class="num">${CATEGORIES.length}</div>
              <div class="lbl">Kategori</div>
            </div>
            <div class="hero-meta-item">
              <div class="num">H-2</div>
              <div class="lbl">Sistem Pre-order</div>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <img src="${IMG.hero}" alt="Hidangan Happy Kitchen" />
          <div class="tag">✦ Edisi Minggu Ini</div>
          <div class="tag-bottom">
            <div>
              <div class="t">Fresh Daily</div>
              <div style="opacity:0.7;font-size:11px;font-family:var(--font-mono);letter-spacing:0.04em;margin-top:2px;">DIMASAK HARI INI</div>
            </div>
            <div class="s">● tersedia</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Seller -->
    <section class="section" style="padding-top:60px;">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">✦ Best Seller</div>
            <h2 class="h-lg">Yang paling sering <em style="font-family:var(--font-display);font-style:italic;">dipesan</em></h2>
            <p class="sub">Pilihan favorit pelanggan kami. Selalu habis duluan setiap minggu.</p>
          </div>
          <a class="more" onclick="navigate('kategori')">Semua menu →</a>
        </div>
        <div class="bs-grid">
          ${renderBestSellerCards()}
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">✦ Jelajahi</div>
            <h2 class="h-lg">Pilih kategori <em style="font-family:var(--font-display);font-style:italic;">favoritmu</em></h2>
            <p class="sub">Enam kategori lengkap, dari kudapan manis hingga sajian acara spesial.</p>
          </div>
          <a class="more" onclick="navigate('kategori')">Semua kategori →</a>
        </div>
        <div class="cat-featured">
          ${renderFeaturedCategories()}
        </div>
        <div class="cat-grid">
          ${CATEGORIES.slice(2).map(c => renderCategoryCard(c)).join('')}
        </div>
      </div>
    </section>

    <!-- About Teaser -->
    <section class="section">
      <div class="container about-grid">
        <div class="about-img">
          <img src="${IMG.kitchen}" alt="Dapur kami" />
        </div>
        <div class="about-text">
          <div class="label" style="color:var(--muted);margin-bottom:16px;">✦ Tentang Kami</div>
          <h2 class="h-lg">Dari dapur rumah, untuk <em style="font-family:var(--font-display);font-style:italic;">keluarga</em> Indonesia.</h2>
          <p class="body-lg" style="color:var(--muted);margin-top:16px;">Happy Kitchen lahir dari kecintaan pada masakan rumahan. Kami bukan restoran besar — kami dapur kecil yang percaya bahwa makanan terbaik datang dari tangan yang peduli.</p>
          <div class="about-points">
            <div class="about-point">
              <div class="ic">🌿</div>
              <h4>Fresh Daily</h4>
              <p>Dimasak di hari yang sama dengan bahan pilihan dari pasar lokal.</p>
            </div>
            <div class="about-point">
              <div class="ic">📅</div>
              <h4>Pre-order H-2</h4>
              <p>Sistem PO menjaga kualitas & mengurangi waste makanan.</p>
            </div>
            <div class="about-point">
              <div class="ic">👩‍🍳</div>
              <h4>Resep Turun-temurun</h4>
              <p>Resep keluarga yang dijaga otentisitasnya selama puluhan tahun.</p>
            </div>
            <div class="about-point">
              <div class="ic">💬</div>
              <h4>Langsung Chat Admin</h4>
              <p>Tanpa sistem ribet — langsung tanya jawab di WhatsApp.</p>
            </div>
          </div>
          <div style="margin-top:32px;">
            <button class="btn btn-primary" onclick="navigate('tentang')">Cerita lengkap →</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">✦ Testimoni</div>
            <h2 class="h-lg">Kata mereka yang sudah <em style="font-family:var(--font-display);font-style:italic;">mencoba</em></h2>
          </div>
        </div>
        <div class="testi-grid">
          ${renderTestimonials()}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="padding-top:20px;">
      <div class="container">
        <div style="background:var(--primary);border-radius:var(--r-md);padding:60px 40px;text-align:center;color:var(--neutral);">
          <div class="label" style="color:var(--success);margin-bottom:16px;">✦ Siap Memesan?</div>
          <h2 class="h-lg" style="color:var(--neutral);max-width:620px;margin:0 auto;">Mulai dari WhatsApp. Tanpa ribet.</h2>
          <p style="font-family:var(--font-mono);font-size:15px;color:var(--secondary);opacity:0.8;max-width:460px;margin:16px auto 0;">Pilih menu, tentukan tanggal, kirim pesan. Admin kami akan konfirmasi ketersediaan & jadwal pengambilan.</p>
          <div style="margin-top:32px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
            <button class="btn" style="background:var(--success);color:var(--overlay);" onclick="openWhatsApp()">
              Chat WhatsApp Sekarang
            </button>
            <button class="btn btn-secondary" onclick="navigate('kategori')">Lihat Menu</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderBestSellerCards() {
  const bs = BESTSELLERS.slice(0, 3);
  return bs.map((p, i) => {
    const isBig = i === 0;
    return `
      <div class="bs-card ${isBig ? 'bs-big' : ''}" onclick="navigate('produk','${p.id}')">
        <div class="img">
          ${renderProductImage(p, p.categoryId)}
          <div style="position:absolute;top:12px;left:12px;" class="badge badge-preorder">✦ Best Seller</div>
        </div>
        <div class="body">
          <div class="sku">${p.categoryName}</div>
          <div class="name">${p.name}</div>
          <div class="desc">${p.desc}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:14px;border-top:1px solid var(--border);">
            <span class="price-lg">${formatRp(p.price)}</span>
            <span class="label-sm muted">${p.unit || 'per porsi'}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderFeaturedCategories() {
  const [c1, c2] = CATEGORIES;
  return `
    <div class="big" onclick="navigate('kategori','${c1.id}')">
      <img src="${IMG.cats[c1.id]}" alt="${c1.name}" />
      <div class="overlay"></div>
      <div class="info">
        <div class="label-sm" style="color:var(--success);margin-bottom:8px;">✦ POPULER</div>
        <div class="name">${c1.name}</div>
        <div class="desc">${c1.tagline} · ${c1.products.length} menu</div>
      </div>
    </div>
    <div class="stack">
      <div class="big" style="flex:1;aspect-ratio:16/9;" onclick="navigate('kategori','${c2.id}')">
        <img src="${IMG.cats[c2.id]}" alt="${c2.name}" />
        <div class="overlay"></div>
        <div class="info">
          <div class="name" style="font-size:24px;">${c2.name}</div>
          <div class="desc">${c2.products.length} menu</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        ${CATEGORIES.slice(2,4).map(c => `
          <div style="position:relative;aspect-ratio:1;border-radius:var(--r-md);overflow:hidden;cursor:pointer;background:var(--primary);" onclick="navigate('kategori','${c.id}')">
            <img src="${IMG.cats[c.id]}" style="width:100%;height:100%;object-fit:cover;" alt="${c.name}" />
            <div class="overlay" style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,20,23,0) 30%,rgba(20,20,23,0.78) 100%);"></div>
            <div style="position:absolute;left:12px;bottom:12px;color:var(--neutral);">
              <div style="font-family:var(--font-display);font-size:16px;letter-spacing:-0.02em;line-height:1.15;">${c.name}</div>
              <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.06em;text-transform:uppercase;margin-top:4px;opacity:0.85;">${c.products.length} menu</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderCategoryCard(c) {
  return `
    <div class="cat-card" onclick="navigate('kategori','${c.id}')">
      <img src="${IMG.cats[c.id]}" alt="${c.name}" loading="lazy" />
      <div class="overlay"></div>
      <div class="info">
        <div class="name">${c.name}</div>
        <div class="count">${c.products.length} menu</div>
      </div>
      <div class="arrow">→</div>
    </div>
  `;
}

function renderTestimonials() {
  const items = [
    { name: 'Sari W.', role: 'Pelanggan Arisan', stars: 5, text: 'Risol mayonya juara! Renyah di luar, creamy di dalam. Tiap arisan pasti pesan di Happy Kitchen.' },
    { name: 'Pak Hadi', role: 'Catering Kantor', stars: 5, text: 'Catering untuk acara 50 orang, semua tamu puas. Rasa rumahan banget, porsinya pas. Recommended!' },
    { name: 'Mbak Dinda', role: 'Hampers Lebaran', stars: 5, text: 'Nastar premiumnya legit, keju edamnya berasa. Packaging rapi, cocok buat hampers keluarga.' },
  ];
  return items.map(t => `
    <div class="testi-card">
      <div class="stars">${'★'.repeat(t.stars)}</div>
      <div class="quote">"${t.text}"</div>
      <div class="person">
        <div class="avatar">${t.name.charAt(0)}</div>
        <div class="who">
          <div class="n">${t.name}</div>
          <div class="r">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');
}

/* =========================================================
   KATEGORI ALL PAGE
   ========================================================= */
function renderKategoriAll() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="container">
      <div class="breadcrumb">
        <a onclick="navigate('home')">Beranda</a>
        <span class="sep">/</span>
        <span class="current">Semua Kategori</span>
      </div>
      <div class="page-title-bar" style="margin-bottom:48px;">
        <div class="label" style="color:var(--muted);margin-bottom:12px;">✦ Eksplorasi</div>
        <h1 class="h-display">Semua Kategori</h1>
        <p class="sub" style="margin-top:12px;">${CATEGORIES.length} kategori · ${ALL_PRODUCTS.length} menu · pilih sesuai kebutuhanmu.</p>
      </div>

      <!-- All categories -->
      <div style="margin-bottom:60px;">
        <div class="cat-grid">
          ${CATEGORIES.map(c => renderCategoryCard(c)).join('')}
        </div>
      </div>

      <!-- Popular products across categories -->
      <div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
          <div>
            <div class="eyebrow label-sm" style="color:var(--muted);margin-bottom:8px;">✦ POPULER</div>
            <h2 class="h-md" style="margin:0;">Menu Favorit Minggu Ini</h2>
          </div>
        </div>
        <div class="product-grid">
          ${BESTSELLERS.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </div>
  `;
}

/* =========================================================
   CATEGORY DETAIL PAGE (FULL)
   ========================================================= */
function renderCategoryDetail(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  if (!cat) { renderKategoriAll(); return; }

  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="container">
      <div class="breadcrumb">
        <a onclick="navigate('home')">Beranda</a>
        <span class="sep">/</span>
        <a onclick="navigate('kategori')">Kategori</a>
        <span class="sep">/</span>
        <span class="current">${cat.name}</span>
      </div>

      <div class="cat-hero">
        <div class="cat-hero-img" style="background:#e2e2e2;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:64px;opacity:0.25;filter:grayscale(1);">${cat.emoji}</span>
        </div>
        <div class="cat-hero-text">
          <div class="label" style="color:var(--muted);margin-bottom:12px;">✦ KATEGORI</div>
          <h1 class="h-display">${cat.name}</h1>
          <p class="desc">${cat.desc}</p>
          <div class="meta">
            <div><div class="n">${cat.products.length}</div><div class="l">Menu</div></div>
            <div><div class="n">${formatRp(Math.min(...cat.products.map(p=>p.price)))}+</div><div class="l">Mulai dari</div></div>
            <div><div class="n">H-2</div><div class="l">Pre-order</div></div>
          </div>
        </div>
      </div>

      <!-- Pilih kategori — horizontal scroll, no sidebar -->
      <div class="cat-filter-bar">
        <div class="cat-chips-scroll">
          <div class="chip" onclick="navigate('kategori')">
            🍽️ Semua <span class="chip-count">${ALL_PRODUCTS.length}</span>
          </div>
          ${CATEGORIES.map(c => `
            <div class="chip ${c.id === catId ? 'active' : ''}" onclick="navigate('kategori','${c.id}')">
              ${c.emoji} ${c.name} <span class="chip-count">${c.products.length}</span>
            </div>
          `).join('')}
        </div>
        <div class="scroll-hint-arrow" aria-hidden="true">
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
            <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <!-- Sort chips -->
      <div class="filter-chips sort-chips">
        <div class="chip ${currentSort==='default'?'active':''}" data-sort="default" onclick="setSort('default')">Urutkan</div>
        <div class="chip ${currentSort==='price-asc'?'active':''}" data-sort="price-asc" onclick="setSort('price-asc')">Termurah</div>
        <div class="chip ${currentSort==='price-desc'?'active':''}" data-sort="price-desc" onclick="setSort('price-desc')">Termahal</div>
        <div class="chip ${currentSort==='name'?'active':''}" data-sort="name" onclick="setSort('name')">A–Z</div>
        <div class="chip ${currentSort==='best'?'active':''}" data-sort="best" onclick="setSort('best')">Best Seller</div>
      </div>

      <div class="toolbar">
        <div class="count" id="resultCount"></div>
      </div>

      <div id="productList" class="product-grid"></div>
      <div id="paginationArea"></div>
    </div>
  `;

  renderCategoryProducts(cat);
}

function setCatFilter(f) { currentCatFilter = f; currentPage = 1; }
function setSort(s) {
  currentSort = s;
  currentPage = 1;
  // Update active chip di DOM langsung — tidak re-render seluruh halaman, jadi tidak ada glitch scroll ke atas
  document.querySelectorAll('.sort-chips .chip').forEach(el => {
    el.classList.toggle('active', el.dataset.sort === s);
  });
  const { param } = parseRoute();
  const cat = CATEGORIES.find(c => c.id === param);
  if (cat) renderCategoryProducts(cat);
  else renderRoute();
}

function renderCategoryProducts(cat) {
  let products = [...cat.products];

  // Filter
  if (currentCatFilter === 'low') products = products.filter(p => p.price < 10000);
  else if (currentCatFilter === 'mid') products = products.filter(p => p.price >= 10000 && p.price <= 30000);
  else if (currentCatFilter === 'high') products = products.filter(p => p.price > 30000);

  // Sort
  if (currentSort === 'price-asc') products.sort((a,b) => a.price - b.price);
  else if (currentSort === 'price-desc') products.sort((a,b) => b.price - a.price);
  else if (currentSort === 'name') products.sort((a,b) => a.name.localeCompare(b.name));
  else if (currentSort === 'best') products.sort((a,b) => (b.bestseller?1:0) - (a.bestseller?1:0));

  // Paginate
  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  if (currentPage > totalPages) currentPage = 1;
  const start = (currentPage - 1) * PER_PAGE;
  const pageItems = products.slice(start, start + PER_PAGE);

  document.getElementById('resultCount').innerHTML =
    `<span style="color:var(--primary);font-weight:500;">${total}</span> menu ditemukan`;

  const list = document.getElementById('productList');
  list.innerHTML = pageItems.length ? pageItems.map(p => renderProductCard(p)).join('') : `
    <div class="empty-state" style="grid-column:1/-1;">
      <div class="ic"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></div>
      <h3>Tidak ada menu cocok</h3>
      <p>Coba ubah filter atau kategori untuk melihat pilihan lain.</p>
      <button class="btn btn-ghost" onclick="setSort('default')">Reset urutan</button>
    </div>
  `;

  // Pagination
  if (totalPages > 1) {
    let html = '<div class="pagination">';
    html += `<button class="page-btn arrow" ${currentPage===1?'disabled':''} onclick="goPage(${currentPage-1})">← Prev</button>`;
    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="page-btn ${i===currentPage?'active':''}" onclick="goPage(${i})">${i}</button>`;
    }
    html += `<button class="page-btn arrow" ${currentPage===totalPages?'disabled':''} onclick="goPage(${currentPage+1})">Next →</button>`;
    html += '</div>';
    document.getElementById('paginationArea').innerHTML = html;
  } else {
    document.getElementById('paginationArea').innerHTML = '';
  }
}

function goPage(p) {
  currentPage = p;
  const { param } = parseRoute();
  const cat = CATEGORIES.find(c => c.id === param);
  if (cat) renderCategoryProducts(cat);
  window.scrollTo({ top: document.querySelector('.toolbar')?.offsetTop - 100 || 0, behavior: 'smooth' });
}

/* =========================================================
   PRODUCT CARD (shared)
   ========================================================= */
function renderProductCard(p) {
  const hasDiscount = p.price < 10000;
  return `
    <div class="product-card" onclick="navigate('produk','${p.id}')">
      <div class="img-wrap">
        ${renderProductImage(p, p.categoryId)}
        <div class="badges">
          ${p.bestseller ? '<span class="badge badge-preorder">✦ Best</span>' : ''}
          ${p.tag ? `<span class="badge" style="background:var(--neutral);color:var(--primary);">${p.tag}</span>` : ''}
        </div>
        <button class="wish" onclick="event.stopPropagation();toggleWish(this)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </button>
      </div>
      <div class="body">
        <div class="sku">${p.categoryName}</div>
        <div class="name">${p.name}</div>
        <div class="desc">${p.desc}</div>
        <div class="price-row">
          <span class="price-md">${formatRp(p.price)}</span>
          <span class="label-sm muted">${p.unit || 'per porsi'}</span>
        </div>
        <div class="add" onclick="event.stopPropagation();addToPesanan('${p.id}')">
          <span>+ Tambah</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </div>
      </div>
    </div>
  `;
}

function toggleWish(btn) {
  btn.classList.toggle('active');
}

/* =========================================================
   PRODUCT DETAIL PAGE
   ========================================================= */
function renderProductDetail(productId) {
  const p = ALL_PRODUCTS.find(x => x.id === productId);
  if (!p) { renderKategoriAll(); return; }
  const cat = CATEGORIES.find(c => c.id === p.categoryId);

  // Build thumbnails from variations of category image
  const thumbs = [0,1,2,3].map(i => ({
    url: IMG.cats[cat.id],
    angle: i * 90,
    filter: ['none','grayscale(20%)','sepia(15%)','brightness(95%)'][i]
  }));

  const related = cat.products.filter(x => x.id !== p.id).slice(0, 4);

  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="container">
      <div class="breadcrumb">
        <a onclick="navigate('home')">Beranda</a>
        <span class="sep">/</span>
        <a onclick="navigate('kategori')">Kategori</a>
        <span class="sep">/</span>
        <a onclick="navigate('kategori','${cat.id}')">${cat.name}</a>
        <span class="sep">/</span>
        <span class="current">${p.name}</span>
      </div>

      <div class="detail-grid">
        <div>
          <div class="gallery-main" id="mainGallery">
            <img src="${thumbs[0].url}" alt="${p.name}" style="filter:${thumbs[0].filter};" id="mainImage" />
          </div>
          <div class="gallery-thumbs">
            ${thumbs.map((t,i) => `
              <div class="thumb ${i===0?'active':''}" onclick="changeThumb(${i},'${t.url}','${t.filter}',this)">
                <img src="${t.url}" style="filter:${t.filter};" alt="thumb ${i+1}" />
              </div>
            `).join('')}
          </div>
        </div>

        <div class="detail-info">
          <div class="sku">SKU · ${p.id.toUpperCase()}</div>
          <div class="label-sm muted">${cat.name}</div>
          <h1>${p.name}</h1>
          <div style="display:flex;gap:8px;align-items:center;">
            <span class="badge badge-stock">● Pre-order tersedia</span>
            ${p.bestseller ? '<span class="badge badge-preorder">✦ Best Seller</span>' : ''}
          </div>

          <div class="price-row">
            <span class="price-display">${formatRp(p.price)}</span>
            <span class="label-lg muted">${p.unit || 'per porsi'}</span>
          </div>

          <p class="desc">${p.desc}</p>

          <ul class="features">
            <li>Dibuat fresh di hari pesanan (H-2)</li>
            <li>Tanpa pengawet & bahan tambahan berbahaya</li>
            <li>Kemasan food-grade, aman untuk dibawa</li>
            <li>Bisa custom jumlah & catatan khusus</li>
          </ul>

          <div style="padding-top:8px;">
            <div class="label-sm muted" style="margin-bottom:8px;">JUMLAH</div>
            <div class="qty-row">
              <div class="qty-stepper">
                <button onclick="detailQty(-1)" id="detailMinus">−</button>
                <div class="num" id="detailQty">1</div>
                <button onclick="detailQty(1)">+</button>
              </div>
              <div class="label-sm muted">Stok tersedia</div>
            </div>
          </div>

          <div>
            <div class="label-sm muted" style="margin-bottom:8px;">TANGGAL PESANAN</div>
            <input type="date" class="date-input" id="orderDateInput" value="${orderDate}" min="${new Date(Date.now()+86400000).toISOString().split('T')[0]}" onchange="orderDate=this.value;savePesanan();" />
            <div class="label-sm muted" style="margin-top:6px;">Rekomendasi minimal H-2 dari hari ini</div>
          </div>

          <div>
            <div class="label-sm muted" style="margin-bottom:8px;">CATATAN (OPSIONAL)</div>
            <textarea class="notes-input" id="orderNotesInput" placeholder="Contoh: tidak pedas, dipisah sambalnya, dll." onchange="orderNotes=this.value;savePesanan();">${orderNotes}</textarea>
          </div>

          <div style="display:flex;gap:10px;flex-wrap:wrap;padding-top:8px;">
            <button class="btn btn-primary btn-block" style="flex:2;" onclick="addFromDetail('${p.id}')">
              + Tambah ke Daftar Pesanan
            </button>
            <button class="btn btn-secondary" style="flex:1;" onclick="addFromDetail('${p.id}', true)">
              Langsung WA
            </button>
          </div>

          <div class="summary-note" style="margin-top:12px;">
            💡 Pesanan akan dikonfirmasi admin via WhatsApp. Admin akan cek ketersediaan & jadwal.
          </div>
        </div>
      </div>

      ${related.length > 0 ? `
        <div style="margin-top:80px;">
          <div class="section-head">
            <div>
              <div class="eyebrow label-sm" style="color:var(--muted);margin-bottom:8px;">✦ Dari Kategori yang Sama</div>
              <h2 class="h-md" style="margin:0;">Menu Lain di ${cat.name}</h2>
            </div>
            <a class="more" onclick="navigate('kategori','${cat.id}')">Lihat semua →</a>
          </div>
          <div class="product-grid">
            ${related.map(r => renderProductCard(r)).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

let detailQtyValue = 1;
function detailQty(delta) {
  detailQtyValue = Math.max(1, detailQtyValue + delta);
  document.getElementById('detailQty').textContent = detailQtyValue;
  const minus = document.getElementById('detailMinus');
  minus.disabled = detailQtyValue === 1;
}

function addFromDetail(productId, sendWA = false) {
  addToPesanan(productId, detailQtyValue);
  detailQtyValue = 1;
  if (sendWA) {
    setTimeout(() => openWhatsApp(), 400);
  } else {
    setTimeout(() => {
      if (confirm('Lihat daftar pesanan sekarang?')) navigate('pesanan');
    }, 300);
  }
}

function changeThumb(i, url, filter, el) {
  document.getElementById('mainImage').src = url;
  document.getElementById('mainImage').style.filter = filter;
  document.querySelectorAll('.gallery-thumbs .thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

/* =========================================================
   PESANAN PAGE
   ========================================================= */
function renderPesananPage() {
  const app = document.getElementById('app');
  const total = pesanan.reduce((s,i) => s + i.price * i.qty, 0);
  const itemCount = pesanan.length;
  const totalQty = pesanan.reduce((s,i) => s + i.qty, 0);

  if (pesanan.length === 0) {
    app.innerHTML = `
      <div class="container">
        <div class="breadcrumb">
          <a onclick="navigate('home')">Beranda</a>
          <span class="sep">/</span>
          <span class="current">Daftar Pesanan</span>
        </div>
        <div class="page-title-bar" style="margin-bottom:40px;">
          <h1 class="h-display">Daftar Pesanan</h1>
        </div>
        <div class="empty-state">
          <div class="ic">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          </div>
          <h3>Belum ada menu dipilih</h3>
          <p>Yuk jelajahi menu dan tambahkan favoritmu ke daftar pesanan.</p>
          <button class="btn btn-primary" onclick="navigate('kategori')">Jelajahi Menu →</button>
        </div>
      </div>
    `;
    return;
  }

  app.innerHTML = `
    <div class="container">
      <div class="breadcrumb">
        <a onclick="navigate('home')">Beranda</a>
        <span class="sep">/</span>
        <span class="current">Daftar Pesanan</span>
      </div>
      <div class="page-title-bar" style="margin-bottom:40px;">
        <div class="label" style="color:var(--muted);margin-bottom:12px;">✦ ${totalQty} ITEM</div>
        <h1 class="h-display">Daftar Pesanan</h1>
        <p class="sub" style="margin-top:12px;">Periksa kembali pesananmu, lalu kirim via WhatsApp untuk konfirmasi admin.</p>
      </div>

      <div class="order-layout">
        <div>
          <div class="order-items">
            ${pesanan.map(p => `
              <div class="order-item">
                <div class="thumb">
                  ${(() => {
                    const prod = ALL_PRODUCTS.find(x=>x.id===p.id);
                    if (!prod) return `<div style="background:var(--surface);width:100%;height:100%;"></div>`;
                    return renderProductImage(prod, prod.categoryId);
                  })()}
                </div>
                <div class="info">
                  <div class="cat">${p.categoryName || 'Menu'}</div>
                  <div class="name">${p.name}</div>
                  <div class="unit">${formatRp(p.price)} · ${p.unit}</div>
                  <div class="item-actions">
                    <div class="qty-stepper" style="height:36px;">
                      <button onclick="updateQty('${p.id}',-1)" style="width:36px;" ${p.qty<=1?'disabled':''}>−</button>
                      <div class="num" style="min-width:32px;">${p.qty}</div>
                      <button onclick="updateQty('${p.id}',1)" style="width:36px;">+</button>
                    </div>
                    <button class="remove" onclick="removeItem('${p.id}')">Hapus</button>
                  </div>
                </div>
                <div class="price">${formatRp(p.price * p.qty)}</div>
              </div>
            `).join('')}
          </div>

          <div style="margin-top:32px;padding-top:24px;border-top:1px solid var(--border);">
            <div class="label-sm muted" style="margin-bottom:12px;">TANGGAL PESANAN</div>
            <input type="date" class="date-input" id="orderDateInput2" value="${orderDate}" min="${new Date(Date.now()+86400000).toISOString().split('T')[0]}" onchange="orderDate=this.value;savePesanan();" style="width:100%;max-width:320px;" />

            <div class="label-sm muted" style="margin:20px 0 12px;">CATATAN UNTUK ADMIN</div>
            <textarea class="notes-input" id="orderNotesInput2" placeholder="Misal: minta dipisah sambalnya, delivery jam 10 pagi, dll." onchange="orderNotes=this.value;savePesanan();">${orderNotes}</textarea>
          </div>
        </div>

        <div class="order-summary">
          <h3>Ringkasan Pesanan</h3>
          <div class="summary-row">
            <span class="l">Jumlah item</span>
            <span>${itemCount} menu</span>
          </div>
          <div class="summary-row">
            <span class="l">Total porsi</span>
            <span>${totalQty}</span>
          </div>
          <div class="summary-row">
            <span class="l">Subtotal</span>
            <span>${formatRp(total)}</span>
          </div>
          <div class="summary-row total">
            <span>Estimasi Total</span>
            <span>${formatRp(total)}</span>
          </div>

          <div class="summary-note">
            💡 Total final bisa berbeda tergantung ketersediaan & konfirmasi admin. Kami akan informasikan detail via WhatsApp.
          </div>

          <button class="btn btn-primary btn-block" style="height:52px;font-size:13px;" onclick="sendOrderToWA()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Kirim via WhatsApp
          </button>
          <button class="btn btn-secondary btn-block btn-sm" onclick="if(confirm('Hapus semua pesanan?')){pesanan=[];savePesanan();renderPesananPage();}">
            Kosongkan Daftar
          </button>
        </div>
      </div>
    </div>
  `;
}

/* =========================================================
   TENTANG PAGE
   ========================================================= */
function renderTentangPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="container">
      <div class="breadcrumb">
        <a onclick="navigate('home')">Beranda</a>
        <span class="sep">/</span>
        <span class="current">Tentang Kami</span>
      </div>

      <div class="cat-hero" style="margin-bottom:60px;">
        <div class="cat-hero-img">
          <img src="${IMG.kitchen}" alt="Dapur kami" />
        </div>
        <div class="cat-hero-text">
          <div class="label" style="color:var(--muted);margin-bottom:12px;">✦ CERITA KAMI</div>
          <h1 class="h-display">Dari dapur kecil, untuk keluarga besar.</h1>
          <p class="desc" style="margin-top:16px;">Happy Kitchen dimulai dari dapur rumah di tahun 2019. Berawal dari pesanan kue untuk arisan tetangga, kini kami melayani ratusan pelanggan setia setiap bulannya.</p>
        </div>
      </div>

      <div style="max-width:720px;margin:0 auto;">
        <h2 class="h-md" style="margin-bottom:20px;">Filosofi kami sederhana</h2>
        <p class="body-lg" style="color:var(--on-surface);margin-bottom:16px;">Kami percaya makanan terbaik datang dari tangan yang peduli. Bukan dari pabrik, bukan dari mesin — tapi dari dapur yang dimasak dengan cinta, seperti masakan ibu di rumah.</p>
        <p class="body-lg" style="color:var(--muted);margin-bottom:40px;">Itu sebabnya kami memilih sistem pre-order. Agar setiap hidangan bisa dimasak fresh di hari yang sama, dengan bahan yang baru dari pasar, dan perhatian penuh pada detail.</p>

        <div class="about-points" style="grid-template-columns:1fr 1fr;">
          <div class="about-point">
            <div class="ic" style="font-size:24px;">🌿</div>
            <h4>Fresh Daily</h4>
            <p>Dimasak di hari yang sama dengan pesanan. Tidak ada makanan kemarin.</p>
          </div>
          <div class="about-point">
            <div class="ic" style="font-size:24px;">🥬</div>
            <h4>Bahan Pilihan</h4>
            <p>Sayur & bahan utama dari pasar tradisional, dipilih langsung setiap pagi.</p>
          </div>
          <div class="about-point">
            <div class="ic" style="font-size:24px;">👩‍🍳</div>
            <h4>Tanpa Pengawet</h4>
            <p>Semua menu dibuat natural, tanpa pengawet, tanpa pewarna buatan.</p>
          </div>
          <div class="about-point">
            <div class="ic" style="font-size:24px;">💬</div>
            <h4>Langsung Admin</h4>
            <p>Tanpa sistem ribet. Chat admin langsung untuk konsultasi menu & jadwal.</p>
          </div>
        </div>

        <div style="margin-top:60px;padding:40px;background:var(--primary);border-radius:var(--r-md);color:var(--neutral);text-align:center;">
          <h2 class="h-md" style="color:var(--neutral);margin:0 0 12px;">Ingin mencoba?</h2>
          <p style="font-family:var(--font-mono);font-size:15px;opacity:0.8;max-width:400px;margin:0 auto 24px;">Kami siap bantu pilihkan menu terbaik untuk acaramu.</p>
          <button class="btn" style="background:var(--success);color:var(--overlay);" onclick="openWhatsApp()">Chat Admin Sekarang</button>
        </div>
      </div>
    </div>
  `;
}

/* =========================================================
   KONTAK PAGE
   ========================================================= */
function renderKontakPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="container">
      <div class="breadcrumb">
        <a onclick="navigate('home')">Beranda</a>
        <span class="sep">/</span>
        <span class="current">Kontak</span>
      </div>

      <div class="page-title-bar" style="margin-bottom:48px;">
        <div class="label" style="color:var(--muted);margin-bottom:12px;">✦ HUBUNGI KAMI</div>
        <h1 class="h-display">Ayo ngobrol.</h1>
        <p class="sub" style="margin-top:12px;">Pilih cara paling nyaman buatmu. Tim admin kami siap bantu dari jam 08:00 — 20:00 WIB.</p>
      </div>

      <div class="contact-grid">
        <a class="contact-card" onclick="openWhatsApp()">
          <div class="ic">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--primary)"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <h4>WhatsApp</h4>
          <p>Cara tercepat untuk pesan & tanya-tanya.</p>
          <span class="val">+62 812-3456-7890</span>
        </a>

        <a class="contact-card" href="https://instagram.com/happykitchen" target="_blank">
          <div class="ic">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </div>
          <h4>Instagram</h4>
          <p>Lihat menu terbaru, promo, & behind the scene.</p>
          <span class="val">@happykitchen</span>
        </a>

        <div class="contact-card">
          <div class="ic">📅</div>
          <h4>Sistem Pre-order</h4>
          <p>Pesanan minimal H-2 dari tanggal acara. Untuk same-day order, konfirmasi langsung ke admin.</p>
          <span class="val">Buka setiap hari</span>
        </div>

        <div class="contact-card">
          <div class="ic">🚚</div>
          <h4>Jangkauan Layanan</h4>
          <p>Melayani area Jakarta, Tangerang, Bekasi, Depok. Pengiriman via ojek online atau pickup.</p>
          <span class="val">Jabodetabek</span>
        </div>
      </div>

      <div style="margin-top:60px;">
        <h2 class="h-md" style="margin-bottom:20px;">Cara Memesan</h2>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;" class="steps-grid">
          <div class="about-point">
            <div class="ic" style="font-family:var(--font-display);font-size:18px;">01</div>
            <h4>Pilih Menu</h4>
            <p>Jelajahi katalog dan tambahkan menu favorit ke daftar pesanan.</p>
          </div>
          <div class="about-point">
            <div class="ic" style="font-family:var(--font-display);font-size:18px;">02</div>
            <h4>Tentukan Tanggal</h4>
            <p>Pilih tanggal acara dan tambahkan catatan khusus bila perlu.</p>
          </div>
          <div class="about-point">
            <div class="ic" style="font-family:var(--font-display);font-size:18px;">03</div>
            <h4>Kirim via WA</h4>
            <p>Klik tombol WhatsApp, pesanan otomatis terkirim ke admin.</p>
          </div>
          <div class="about-point">
            <div class="ic" style="font-family:var(--font-display);font-size:18px;">04</div>
            <h4>Konfirmasi</h4>
            <p>Admin akan konfirmasi ketersediaan, jadwal, dan cara pengambilan.</p>
          </div>
        </div>
      </div>
    </div>

    <style>
      @media (max-width: 800px) { .steps-grid { grid-template-columns: 1fr 1fr !important; } }
      @media (max-width: 500px) { .steps-grid { grid-template-columns: 1fr !important; } }
    </style>
  `;
}

/* =========================================================
   INIT
   ========================================================= */
function init() {
  renderNav();
  if (!window.location.hash) window.location.hash = '#/home';
  renderRoute();
  updateCartCount();
}

document.addEventListener('DOMContentLoaded', init);
if (document.readyState !== 'loading') init();
