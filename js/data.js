/* =========================================================
   DATA — Happy Kitchen
   Kategori & produk sesuai kategori.md
   Gambar dari: public/images/<folder>/<nama>.jpg
   ========================================================= */

/* ---------- PATH HELPER ---------- */
function img(folder, file) {
  return `public/images/${folder}/${file}`;
}

/* ---------- HERO / KITCHEN IMAGES ---------- */
const IMG = {
  hero:    img('hero', 'hero.jpg'),
  kitchen: img('hero', 'kitchen.jpg'),
  cats: {
    'manis':   img('manis',   'manis.jpg'),
    'gurih':   img('gurih',   'gurih.jpg'),
    'ngisi':   img('ngisi',   'ngisi.jpg'),
    'bakery':  img('bakery',  'bakery.jpg'),
    'dingin':  img('dingin',  'dingin.jpg'),
    'acara':   img('acara',   'acara.jpg'),
  },
};

/* =========================================================
   KATEGORI
   ========================================================= */
const CATEGORIES = [

  /* ────────────── 1. MANIS ────────────── */
  {
    id: 'manis',
    name: 'yang manis kaya kamu',
    tagline: 'Manisan homemade yang bikin nagih',
    desc: 'Aneka kue manis, cake, bolu, puding, dan pastry legendaris — dibuat fresh dengan resep turun-temurun.',
    emoji: '🍭',
    products: [
      { id: 'cake-marmer',              name: 'Cake Marmer',              price: 55000, desc: 'Cake marmer lembut dengan motif swirl coklat vanilla.' },
      { id: 'cake-mini-keju',           name: 'Cake Mini Keju',           price: 8000,  desc: 'Cake mungil dengan topping keju parut melimpah.' },
      { id: 'cake-mini-mises',          name: 'Cake Mini Mises',          price: 8000,  desc: 'Cake mini taburan meses coklat yang gemes.' },
      { id: 'bolu-kukus-pandan',        name: 'Bolu Kukus Pandan',        price: 7000,  desc: 'Bolu kukus pandan wangi, lembut, dan mekar sempurna.' },
      { id: 'bolu-gulung',              name: 'Bolu Gulung',              price: 45000, desc: 'Bolu gulung isi krim lembut, sajian klasik yang tak lekang waktu.' },
      { id: 'brownies-kukus',           name: 'Brownies Kukus',           price: 50000, desc: 'Brownies kukus coklat pekat, lembab dan moist.' },
      { id: 'bolu-sarang-semut',        name: 'Bolu Sarang Semut',        price: 50000, desc: 'Bolu karamel khas dengan rongga-rongga unik yang menggoda.' },
      { id: 'puding-lumut',             name: 'Puding Lumut',             price: 12000, desc: 'Puding dua lapis pandan santan, tampilan cantik seperti lumut.' },
      { id: 'puding-marie',             name: 'Puding Marie',             price: 12000, desc: 'Puding berlapis biskuit marie, creamy dan legit.' },
      { id: 'puding-buah-naga',         name: 'Puding Buah Naga',         price: 13000, desc: 'Puding segar berwarna merah alami dari buah naga.' },
      { id: 'puding-buah-cup',          name: 'Puding Buah Cup',          price: 10000, desc: 'Puding buah segar dalam cup, cocok untuk bekal.' },
      { id: 'puding-jus-mangga',        name: 'Puding Jus Mangga',        price: 12000, desc: 'Puding mangga segar dengan warna kuning cerah.' },
      { id: 'cake-matcha-puding',       name: 'Aneka Cake Matcha Puding', price: 15000, desc: 'Paduan cake dan puding dengan aroma matcha yang khas.' },
      { id: 'cake-taro-puding',         name: 'Aneka Cake Taro Puding',   price: 15000, desc: 'Cake puding ungu dengan rasa taro yang lembut.' },
      { id: 'pie-buah',                 name: 'Pie Buah',                 price: 18000, desc: 'Pie kering isi vla dengan topping aneka buah segar.' },
      { id: 'pie-keju',                 name: 'Pie Keju',                 price: 15000, desc: 'Pie renyah dengan isian keju lembut gurih.' },
      { id: 'soes-ori',                 name: 'Soes Ori',                 price: 5000,  desc: 'Choux pastry isi vla vanilla klasik.' },
      { id: 'soes-buah',               name: 'Soes Buah',                price: 6000,  desc: 'Soes isi vla dengan potongan buah segar.' },
      { id: 'soes-coklat',             name: 'Soes Coklat',              price: 6000,  desc: 'Soes isi vla coklat dengan topping coklat leleh.' },
      { id: 'klapertart',              name: 'Klapertart',               price: 20000, desc: 'Klapertart khas Manado, creamy dengan kelapa muda dan kayu manis.' },
      { id: 'kue-ku',                  name: 'Kue Ku',                   price: 5000,  desc: 'Kue ku merah berisi kacang hijau manis, simbol keberuntungan.' },
      { id: 'pukis',                   name: 'Pukis',                    price: 4000,  desc: 'Kue pukis half-moon, soft dan wangi kelapa.' },
      { id: 'srikaya-ketan-cup',       name: 'Srikaya Ketan Cup',        price: 10000, desc: 'Ketan putih disajikan dengan srikaya pandan dalam cup.' },
      { id: 'srikaya-ketan-iris',      name: 'Srikaya Ketan Iris',       price: 9000,  desc: 'Ketan putih kukus dengan selai srikaya pandan harum.' },
      { id: 'lapis-legit',             name: 'Lapis Legit',              price: 150000, desc: 'Lapis legit premium berlapis-lapis, legit dan padat.' },
      { id: 'lapis-engka-ketan',       name: 'Lapis Engka Ketan',        price: 80000, desc: 'Lapis ketan kenyal dengan tekstur lapis yang cantik.' },
    ]
  },

  /* ────────────── 2. GURIH ────────────── */
  {
    id: 'gurih',
    name: 'tim gurih tapi anti gagal',
    tagline: 'Gorengan & kue gurih yang selalu ludes',
    desc: 'Aneka jajanan gurih homemade — risol, pastel, lemper, sosis solo — cocok untuk snack box dan hajatan.',
    emoji: '🧂',
    products: [
      { id: 'lemper',              name: 'Lemper',              price: 5000,  desc: 'Ketan pulen isi ayam suwir bumbu rempah, dibungkus daun pisang.' },
      { id: 'arem-arem',           name: 'Arem Arem',           price: 4500,  desc: 'Lontong beras isi sayur dan sambal, klasik dan mengenyangkan.' },
      { id: 'risol-ragout',        name: 'Risol Ragout',        price: 5000,  desc: 'Kulit renyah isi ragout sayur dan bihun.', bestseller: true },
      { id: 'risol-bolognese',     name: 'Risol Bolognese',     price: 6000,  desc: 'Risol dengan isi daging bolognese gurih.' },
      { id: 'risol-mayo',          name: 'Risol Mayo',          price: 6000,  desc: 'Kulit renyah isi ragout, smoked beef, telur, dan mayonaise.', bestseller: true },
      { id: 'sosis-solo',          name: 'Sosis Solo',          price: 5000,  desc: 'Crepe tipis gulung isi daging ayam berbumbu khas Solo.' },
      { id: 'martabak-kentang',    name: 'Martabak Kentang',    price: 7000,  desc: 'Martabak tipis isi kentang bumbu kari.' },
      { id: 'pastel-ragout',       name: 'Pastel Ragout',       price: 5500,  desc: 'Pastel goreng renyah isi ragout sayur dan bihun.' },
      { id: 'pastel-kare-panggang',name: 'Pastel Kare Panggang',price: 6500,  desc: 'Pastel panggang isi isian kare yang gurih.' },
      { id: 'pastry-lemper',       name: 'Pastry Lemper',       price: 8000,  desc: 'Lemper dibalut kulit pastry renyah berlapis.' },
      { id: 'wingko',              name: 'Wingko',              price: 6000,  desc: 'Wingko babat khas Semarang, gurih manis dari kelapa dan ketan.' },
      { id: 'onde-onde',           name: 'Onde Onde',           price: 4000,  desc: 'Bola wijen renyah di luar, isi kacang hijau manis.' },
    ]
  },

  /* ────────────── 3. NGISI ────────────── */
  {
    id: 'ngisi',
    name: 'yang ngisi perut tapi tetep enak',
    tagline: 'Roti & kue basah yang bikin kenyang',
    desc: 'Roti homemade, dadar gulung, dan kue tradisional yang pas untuk sarapan atau bekal.',
    emoji: '🍞',
    products: [
      { id: 'roti-keju',              name: 'Roti Keju',              price: 8000,  desc: 'Roti lembut dengan isian dan topping keju.' },
      { id: 'roti-coklat',            name: 'Roti Coklat',            price: 7500,  desc: 'Roti empuk isi selai coklat premium.' },
      { id: 'roti-durian',            name: 'Roti Durian',            price: 9000,  desc: 'Roti lembut isi vla durian asli, harum menggoda.' },
      { id: 'roti-4-rasa',            name: 'Roti 4 Rasa',            price: 10000, desc: 'Satu loyang roti dengan 4 pilihan rasa dalam satu sajian.' },
      { id: 'roti-kacang-hijau',      name: 'Roti Kacang Hijau',      price: 7500,  desc: 'Roti empuk isi pasta kacang hijau manis lembut.' },
      { id: 'roti-kacang-coklat-keju',name: 'Roti Kacang Coklat Keju',price: 9000,  desc: 'Perpaduan kacang, coklat, dan keju dalam satu roti.' },
      { id: 'roti-coklat-keju',       name: 'Roti Coklat Keju',       price: 8500,  desc: 'Roti dengan isian coklat dan taburan keju.' },
      { id: 'pisang-garing',          name: 'Pisang Garing',          price: 5000,  desc: 'Pisang goreng crispy dengan balutan tepung renyah.' },
      { id: 'dadar-gulung-labu',      name: 'Dadar Gulung Isi Labu',  price: 5000,  desc: 'Crepe pandan dengan isi labu kuning manis berbumbu.' },
      { id: 'lumpur-kentang',         name: 'Lumpur Kentang',         price: 5000,  desc: 'Kue lumpur berbasis kentang, lembut dan empuk.' },
      { id: 'bolu-kojo',              name: 'Bolu Kojo',              price: 40000, desc: 'Bolu khas Palembang dari tepung beras dan santan, harum pandan.' },
    ]
  },

  /* ────────────── 4. BAKERY ────────────── */
  {
    id: 'bakery',
    name: 'vibes bakery & pastry',
    tagline: 'Laminasi & pastry ala kafe rumahan',
    desc: 'Aneka pastry berlapis, muffin, dan cake keju ala bakery — bikin pagi makin istimewa.',
    emoji: '🥐',
    products: [
      { id: 'pastry-cum-cum',           name: 'Pastry Cum Cum',           price: 10000, desc: 'Pastry lipat berbentuk cum-cum, renyah dan buttery.' },
      { id: 'pastry-segi-blueberry',    name: 'Pastry Segi Blueberry',    price: 11000, desc: 'Pastry persegi dengan topping blueberry segar.' },
      { id: 'pastry-segi-buah',         name: 'Pastry Segi Buah',         price: 11000, desc: 'Pastry persegi dengan topping aneka buah.' },
      { id: 'pastry-bundar-blueberry',  name: 'Pastry Bundar Blueberry',  price: 11000, desc: 'Pastry bundar isi selai blueberry.' },
      { id: 'pastry-bundar-buah',       name: 'Pastry Bundar Buah',       price: 11000, desc: 'Pastry bundar dengan vla dan potongan buah.' },
      { id: 'pastry-tape',              name: 'Pastry Tape',              price: 10000, desc: 'Pastry isi tape singkong manis dengan aroma khas.' },
      { id: 'pastry-selai-nanas',       name: 'Pastry Selai Nanas',       price: 10000, desc: 'Pastry renyah dengan isian selai nanas homemade.' },
      { id: 'pastry-pisang-coklat',     name: 'Pastry Pisang Coklat',     price: 11000, desc: 'Pastry isi pisang dan coklat, kombinasi sempurna.' },
      { id: 'pastry-kipas-strawberry',  name: 'Pastry Kipas Strawberry',  price: 12000, desc: 'Pastry berbentuk kipas dengan topping strawberry.', bestseller: true },
      { id: 'muffin-keju-cup',          name: 'Muffin Keju Cup',          price: 9000,  desc: 'Muffin keju dalam cup, lembut dan gurih.' },
      { id: 'cake-tape-keju',           name: 'Cake Tape Keju',           price: 65000, desc: 'Cake dengan perpaduan tape dan keju yang unik dan legit.' },
      { id: 'cake-muffin-keju',         name: 'Cake Muffin Keju',         price: 55000, desc: 'Loyang cake bertekstur muffin dengan topping keju parut.' },
    ]
  },

  /* ────────────── 5. DINGIN ────────────── */
  {
    id: 'dingin',
    name: 'yang dingin, lembut, dan bikin candu',
    tagline: 'Puding segar pelepas dahaga',
    desc: 'Aneka puding dingin dan segar — buah naga, mangga, lumut, hingga puding telang cantik.',
    emoji: '🍮',
    products: [
      { id: 'puding-buah-cup-d',   name: 'Puding Buah Cup',    price: 10000, desc: 'Puding buah segar dalam cup, cocok untuk bekal.' },
      { id: 'puding-jus-mangga-d', name: 'Puding Jus Mangga',  price: 12000, desc: 'Puding mangga segar dari perasan jus mangga asli.' },
      { id: 'puding-telang',       name: 'Puding Telang',       price: 13000, desc: 'Puding biru cantik dari bunga telang, segar dan instagramable.', bestseller: true },
      { id: 'puding-lumut-d',      name: 'Puding Lumut',        price: 12000, desc: 'Puding dua lapis pandan dan santan yang menyegarkan.' },
      { id: 'puding-marie-d',      name: 'Puding Marie',        price: 12000, desc: 'Puding berlapis biskuit marie, creamy dan legit.' },
      { id: 'puding-buah-naga-d',  name: 'Puding Buah Naga',    price: 13000, desc: 'Puding berwarna merah alami dari buah naga.' },
      { id: 'aneka-puding-buah',   name: 'Aneka Puding Buah',   price: 14000, desc: 'Variasi puding dengan topping aneka buah segar pilihan.' },
      { id: 'aneka-cake-puding',   name: 'Aneka Cake Puding',   price: 15000, desc: 'Perpaduan cake dan puding dalam satu sajian menarik.' },
    ]
  },

  /* ────────────── 6. ACARA ────────────── */
  {
    id: 'acara',
    name: 'cocok buat acara, hampers, dan rame-rame',
    tagline: 'Edisi loyang & hadiah spesial',
    desc: 'Sajian ukuran loyang dan paket hampers — sempurna untuk arisan, pengajian, ulang tahun, dan hantaran.',
    emoji: '🎂',
    products: [
      { id: 'lapis-legit-loyang',   name: 'Lapis Legit Loyang',   price: 250000, unit: 'per loyang', desc: 'Lapis legit premium ukuran loyang, cocok untuk hantaran dan hampers.' },
      { id: 'lapis-engka-ketan-l',  name: 'Lapis Engka Ketan',    price: 120000, unit: 'per loyang', desc: 'Lapis ketan kenyal cantik, pilihan hampers modern.' },
      { id: 'bolu-kojo-loyang',     name: 'Bolu Kojo Loyang',     price: 75000,  unit: 'per loyang', desc: 'Bolu kojo khas Palembang ukuran loyang, harum dan lembab.' },
      { id: 'cake-marmer-loyang',   name: 'Cake Marmer Loyang',   price: 90000,  unit: 'per loyang', desc: 'Cake marmer ukuran loyang penuh, cocok untuk acara.' },
      { id: 'puding-lumut-loyang',  name: 'Puding Lumut Loyang',  price: 45000,  unit: 'per loyang', desc: 'Puding lumut dua lapis ukuran loyang, cantik untuk sajian meja.' },
      { id: 'cake-tape-keju-l',     name: 'Cake Tape Keju',       price: 65000,  unit: 'per loyang', desc: 'Cake tape keju loyang, unik dan jadi incaran di arisan.' },
      { id: 'cake-muffin-keju-l',   name: 'Cake Muffin Keju',     price: 55000,  unit: 'per loyang', desc: 'Loyang cake bertekstur muffin dengan keju parut melimpah.' },
      { id: 'bolu-gulung-l',        name: 'Bolu Gulung',          price: 55000,  unit: 'per gulung', desc: 'Bolu gulung krim lembut ukuran panjang untuk berbagi.', bestseller: true },
      { id: 'puding-buah-loyang',   name: 'Puding Buah Loyang',   price: 50000,  unit: 'per loyang', desc: 'Puding buah segar ukuran loyang, cocok sajian acara keluarga.' },
      { id: 'puding-telang-l',      name: 'Puding Telang',        price: 45000,  unit: 'per loyang', desc: 'Puding telang biru cantik ukuran loyang, jadi pusat perhatian.' },
    ]
  },

];

/* =========================================================
   COMPUTED HELPERS
   ========================================================= */
CATEGORIES.forEach(c => {
  c.products.forEach(p => {
    p.categoryId   = c.id;
    p.categoryName = c.name;
    if (!p.unit) p.unit = 'per porsi';
  });
});

const ALL_PRODUCTS  = CATEGORIES.flatMap(c => c.products);
const BESTSELLERS   = ALL_PRODUCTS.filter(p => p.bestseller);
const WA_NUMBER     = '6281234567890';

/* =========================================================
   IMAGE HELPERS
   ========================================================= */
const CATEGORY_GRADIENTS = {
  'manis':  ['#e8c4d4', '#d4a0b8'],
  'gurih':  ['#d4a574', '#b8854a'],
  'ngisi':  ['#d4b896', '#b89870'],
  'bakery': ['#e6d4a8', '#c9b078'],
  'dingin': ['#a8d4e8', '#78b0c8'],
  'acara':  ['#e4b896', '#c49876'],
};

function productImage(product) {
  const catImg = IMG.cats[product.categoryId];
  return catImg || null;
}

function renderProductImage(product, categoryId) {
  const url = IMG.cats[categoryId];
  if (url) {
    return `<img src="${url}" alt="${product.name}" loading="lazy"
              onerror="this.parentElement.innerHTML=placeholderHTML('${categoryId}','${escapeAttr(product.name)}')"/>`;
  }
  return placeholderHTML(categoryId, product.name);
}

function escapeAttr(s) {
  return String(s).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function placeholderHTML(categoryId, name) {
  const g = CATEGORY_GRADIENTS[categoryId] || ['#c4a876', '#a88856'];
  const emoji = (CATEGORIES.find(c => c.id === categoryId) || {}).emoji || '🍽️';
  return `<div class="product-image-placeholder"
    style="background:linear-gradient(135deg,${g[0]} 0%,${g[1]} 100%);">
    <span>${emoji}</span>
  </div>`;
}
