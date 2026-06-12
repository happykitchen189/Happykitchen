/* =========================================================
   MOCK KATEGORI.MD DATA
   ========================================================= */
const IMG = {
  hero: 'https://image.qwenlm.ai/public_source/62b0b035-1d5f-4640-adc1-3586db431539/1e1136f1e-bae8-428d-8548-10f2ea34d4ac.png',
  kitchen: 'https://image.qwenlm.ai/public_source/62b0b035-1d5f-4640-adc1-3586db431539/1547f3292-981a-428f-971f-3b9ca032b4.png'.replace('3586db431539/1547f3292-981a-428f-971f-3b9ca032b4', '62b0b035-1d5f-4640-adc1-3586db431539/1547f3292-981a-428f-971f-3b9ca032b4'),
  cats: {
    'kue-pasar': 'https://image.qwenlm.ai/public_source/62b0b035-1d5f-4640-adc1-3586db431539/149e8b9ef-147c-48db-bcf8-51028a7b1ec7.png',
    'jajanan-tradisional': 'https://image.qwenlm.ai/public_source/62b0b035-1d5f-4640-adc1-3586db431539/16be76c0a-dcd9-4e61-bf0f-49aab5c10537.png',
    'dessert': 'https://image.qwenlm.ai/public_source/62b0b035-1d5f-4640-adc1-3586db431539/188dd0501-a830-4743-b67c-265e737258be.png',
    'snack-box': 'https://image.qwenlm.ai/public_source/62b0b035-1d5f-4640-adc1-3586db431539/18b876098-63a2-464d-8839-4072e3fcd776.png',
    'nasi-kotak': 'https://image.qwenlm.ai/public_source/62b0b035-1d5f-4640-adc1-3586db431539/19986a21b-997b-9208-b17f-8517da73d79c.png',
    'catering': 'https://image.qwenlm.ai/public_source/62b0b035-1d5f-4640-adc1-3586db431539/1298255b8-7022-4f76-8310-52b04ead7732.png',
    'homemade': 'https://image.qwenlm.ai/public_source/62b0b035-1d5f-4640-adc1-3586db431539/1f983168d-fa59-91e3-956e-aee49d969bfd.png',
    'musiman': 'https://image.qwenlm.ai/public_source/62b0b035-1d5f-4640-adc1-3586db431539/1464a6c93-57d5-4e9b-9c0a-42897e4ca133.png',
  },
  best: [
    'https://image.qwenlm.ai/public_source/62b0b035-1d5f-4640-adc1-3586db431539/1cf285f07-2aeb-45ef-8079-15d37a84ff2b.png',
    'https://image.qwenlm.ai/public_source/62b0b035-1d5f-4640-adc1-3586db431539/1d2c30eaf-e0f4-4b04-a24a-b2b0a6186c79.png',
  ]
};
// Fix kitchen URL
IMG.kitchen = 'https://image.qwenlm.ai/public_source/62b0b035-1d5f-4640-adc1-3586db431539/1547f3292-981a-428f-971f-3b9ca032b4.png';

const CATEGORIES = [
  {
    id: 'kue-pasar', name: 'Kue Pasar', tagline: 'Klasik & selalu dinanti',
    desc: 'Aneka kue basah khas pasar, dibuat fresh setiap pagi dengan resep tradisional yang tak lekang oleh waktu.',
    emoji: '🥮',
    products: [
      { id: 'risol-mayo', name: 'Risol Mayo', price: 5000, desc: 'Kulit renyah isi ragout, smoked beef, telur, dan mayonaise.', bestseller: true, tag: 'Favorit' },
      { id: 'pastel-tutup', name: 'Pastel Tutup', price: 4500, desc: 'Pastel isi sayur & bihun, kulit homemade renyah.' },
      { id: 'lemper-ayam', name: 'Lemper Ayam', price: 4000, desc: 'Ketan pulen isi ayam suwir bumbu rempah.' },
      { id: 'arem-arem', name: 'Arem-arem Oncom', price: 3500, desc: 'Lontong beras isi oncom pedas manis.' },
      { id: 'dadar-gulung', name: 'Dadar Gulung', price: 3500, desc: 'Crepe pandan isi kelapa parut gula merah.' },
      { id: 'lumpia-semarang', name: 'Lumpia Semarang', price: 5500, desc: 'Lumpia rebung ayam udang dengan saus khas.' },
      { id: 'kue-soes', name: 'Kue Soes Vanilla', price: 4000, desc: 'Choux pastry isi vla vanilla lembut.' },
      { id: 'panada', name: 'Panada Manado', price: 4500, desc: 'Roti goreng isi cakalang fufu pedas.' },
    ]
  },
  {
    id: 'jajanan-tradisional', name: 'Jajanan Tradisional', tagline: 'Warisan rasa Nusantara',
    desc: 'Kumpulan jajanan pasar legendaris — manis, gurih, dan penuh kenangan. Cocok untuk arisan, hajatan, atau oleh-oleh.',
    emoji: '🍡',
    products: [
      { id: 'klepon', name: 'Klepon Gula Merah', price: 2500, desc: 'Bola ketan pandan isi gula merah, taburan kelapa.' },
      { id: 'onde-onde', name: 'Onde-onde Kacang Hijau', price: 3000, desc: 'Bola wijen renyah isi kacang hijau manis.' },
      { id: 'kue-lapis', name: 'Kue Lapis Beras', price: 3500, desc: 'Lapisan warna-warni kenyal dari tepung beras.' },
      { id: 'getuk-lindu', name: 'Getuk Lindu', price: 3000, desc: 'Singkong kukus manis dengan kelapa parut.' },
      { id: 'cenil', name: 'Cenil Kuah Santan', price: 3000, desc: 'Cenil warna-warni dalam kuah santan gula merah.' },
      { id: 'serabi-solo', name: 'Serabi Solo', price: 3500, desc: 'Pancake tradisional dengan kuah kinca.' },
      { id: 'kue-talam', name: 'Kue Talam', price: 3000, desc: 'Kue dua lapis santan & gula merah.' },
      { id: 'bika-ambon', name: 'Bika Ambon', price: 4000, desc: 'Kue berongga khas Medan, legit dan wangi.' },
    ]
  },
  {
    id: 'dessert', name: 'Dessert', tagline: 'Penutup yang memanjakan',
    desc: 'Pilihan dessert modern dan klasik, dari pudding hingga tiramisu. Dibuat tanpa pengawet, siap memanjakan lidah.',
    emoji: '🍮',
    products: [
      { id: 'pudding-caramel', name: 'Pudding Caramel', price: 18000, desc: 'Silky pudding caramel dengan saus vanilla.', bestseller: true },
      { id: 'panna-cotta', name: 'Panna Cotta Berry', price: 22000, desc: 'Italian panna cotta dengan saus mixed berry.' },
      { id: 'tiramisu', name: 'Tiramisu Cup', price: 25000, desc: 'Ladyfinger, espresso, mascarpone dalam cup.' },
      { id: 'chocolate-mousse', name: 'Chocolate Mousse', price: 22000, desc: 'Dark chocolate mousse dengan whipped cream.' },
      { id: 'mango-sticky', name: 'Mango Sticky Rice', price: 20000, desc: 'Ketan santan dengan mangga harum manis.' },
      { id: 'es-buah-naga', name: 'Es Buah Naga', price: 15000, desc: 'Es serut buah naga dengan susu dan jelly.' },
    ]
  },
  {
    id: 'snack-box', name: 'Snack Box', tagline: 'Paket rapat & arisan',
    desc: 'Paket snack box siap saji untuk rapat, arisan, syukuran, atau acara kantor. Minimal order 10 box.',
    emoji: '🎁',
    products: [
      { id: 'snack-ekonomis', name: 'Snack Box Ekonomis', price: 15000, unit: 'per box', desc: '3 kue + 1 air mineral. Cocok untuk rapat santai.' },
      { id: 'snack-reguler', name: 'Snack Box Reguler', price: 22000, unit: 'per box', desc: '4 kue + 1 roti + 1 air mineral.', bestseller: true },
      { id: 'snack-premium', name: 'Snack Box Premium', price: 32000, unit: 'per box', desc: '5 kue premium + pastry + air mineral.' },
      { id: 'snack-vip', name: 'Snack Box VIP', price: 45000, unit: 'per box', desc: '6 kue premium + pastry + dessert cup + jus.' },
    ]
  },
  {
    id: 'nasi-kotak', name: 'Nasi Kotak', tagline: 'Praktis & mengenyangkan',
    desc: 'Paket nasi kotak dengan lauk lengkap, cocok untuk acara kantor, pengajian, atau syukuran. Minimal order 20 box.',
    emoji: '🍱',
    products: [
      { id: 'nasi-ayam-bakar', name: 'Nasi Ayam Bakar', price: 28000, unit: 'per box', desc: 'Nasi putih, ayam bakar, sambal, lalapan, tempe.', bestseller: true },
      { id: 'nasi-ayam-goreng', name: 'Nasi Ayam Goreng', price: 26000, unit: 'per box', desc: 'Nasi putih, ayam goreng bumbu kuning, sambal.' },
      { id: 'nasi-rendang', name: 'Nasi Rendang', price: 32000, unit: 'per box', desc: 'Nasi, rendang Padang, daun singkong, sambal.' },
      { id: 'nasi-ikan-bakar', name: 'Nasi Ikan Bakar', price: 30000, unit: 'per box', desc: 'Nasi, ikan kembung bakar, sambal matah, lalapan.' },
      { id: 'nasi-kuning-mini', name: 'Nasi Kuning Mini', price: 25000, unit: 'per box', desc: 'Nasi kuning tumpeng mini, ayam goreng, sambal goreng kentang, perkedel.' },
      { id: 'nasi-uduk', name: 'Nasi Uduk Komplit', price: 27000, unit: 'per box', desc: 'Nasi uduk, ayam goreng, orek tempe, sambal.' },
    ]
  },
  {
    id: 'catering', name: 'Catering Rumahan', tagline: 'Untuk acara spesialmu',
    desc: 'Paket catering rumahan untuk 20-100 porsi. Menu bisa disesuaikan sesuai acara dan budget. Pre-order minimal H-3.',
    emoji: '🍽️',
    products: [
      { id: 'prasmanan-ekonomis', name: 'Prasmanan Ekonomis', price: 35000, unit: 'per porsi', desc: 'Nasi + 2 lauk + 1 sayur + kerupuk. Min 30 porsi.' },
      { id: 'prasmanan-standar', name: 'Prasmanan Standar', price: 48000, unit: 'per porsi', desc: 'Nasi + 3 lauk + 2 sayur + buah + air. Min 30 porsi.', bestseller: true },
      { id: 'prasmanan-premium', name: 'Prasmanan Premium', price: 68000, unit: 'per porsi', desc: 'Nasi + 4 lauk + 2 sayur + dessert + air. Min 30 porsi.' },
      { id: 'catering-harian', name: 'Catering Harian', price: 42000, unit: 'per hari', desc: 'Paket makan siang untuk 5-15 orang. Menu berganti tiap hari.' },
    ]
  },
  {
    id: 'homemade', name: 'Makanan Homemade', tagline: 'Rasa rumahan autentik',
    desc: 'Hidangan rumahan yang dimasak dengan hati-hati, seperti masakan ibu. Cocok untuk stok di rumah atau acara keluarga.',
    emoji: '🍲',
    products: [
      { id: 'rendang-padang', name: 'Rendang Padang', price: 85000, unit: 'per 500gr', desc: 'Rendang sapi 8 jam masak, bumbu rempah lengkap.' },
      { id: 'opor-ayam', name: 'Opor Ayam Kampung', price: 65000, unit: 'per porsi besar', desc: 'Opor ayam kampung kuah santan kental.' },
      { id: 'soto-betawi', name: 'Soto Betawi', price: 45000, unit: 'per porsi besar', desc: 'Soto daging kuah santan, isian emping & acar.' },
      { id: 'nasi-goreng-sp', name: 'Nasi Goreng Spesial', price: 35000, unit: 'per porsi', desc: 'Nasi goreng kampung dengan telur & ayam suwir.' },
      { id: 'mie-goreng', name: 'Mie Goreng Jawa', price: 32000, unit: 'per porsi', desc: 'Mie goreng khas Jawa dengan bumbu manis gurih.' },
      { id: 'sambal-cumi', name: 'Sambal Cumi Asin', price: 55000, unit: 'per 250gr', desc: 'Sambal cumi asin pedas, cocok untuk stok lauk.' },
    ]
  },
  {
    id: 'musiman', name: 'Menu Musiman', tagline: 'Spesial hari raya & momen',
    desc: 'Menu spesial untuk Lebaran, Natal, Imlek, dan momen lainnya. Hanya tersedia di musim tertentu — pre-order dibuka terbatas.',
    emoji: '🎉',
    products: [
      { id: 'nastar-premium', name: 'Nastar Premium', price: 95000, unit: 'per toples 500gr', desc: 'Nastar nanas legit dengan keju edam.', tag: 'Lebaran' },
      { id: 'kastengel', name: 'Kastengel Keju', price: 90000, unit: 'per toples 400gr', desc: 'Kue kering keju edam & cheddar.', tag: 'Lebaran' },
      { id: 'ketupat-opor', name: 'Paket Ketupat Opor', price: 150000, unit: 'per paket 4 org', desc: 'Ketupat, opor ayam, rendang, sambal goreng.', tag: 'Lebaran' },
      { id: 'kue-keranjang', name: 'Kue Keranjang Goreng', price: 65000, unit: 'per 500gr', desc: 'Kue keranjang goreng tepung renyah.', tag: 'Imlek' },
    ]
  },
];

// Add category refs to products
CATEGORIES.forEach(c => {
  c.products.forEach(p => {
    p.categoryId = c.id;
    p.categoryName = c.name;
  });
});

const ALL_PRODUCTS = CATEGORIES.flatMap(c => c.products);
const BESTSELLERS = ALL_PRODUCTS.filter(p => p.bestseller);
const WA_NUMBER = '6281234567890';

/* =========================================================
   IMAGE HELPERS
   ========================================================= */
const CATEGORY_GRADIENTS = {
  'kue-pasar': ['#d4a574', '#b8854a'],
  'jajanan-tradisional': ['#c9a876', '#a88856'],
  'dessert': ['#e8c4d4', '#d4a0b8'],
  'snack-box': ['#e6d4a8', '#c9b078'],
  'nasi-kotak': ['#d4b896', '#b89870'],
  'catering': ['#c4a876', '#a88856'],
  'homemade': ['#d8a878', '#b8885a'],
  'musiman': ['#e4b896', '#c49876'],
};

function productImage(product, categoryId) {
  // For bestsellers, try to use specific images
  if (product.id === 'risol-mayo') return IMG.best[0];
  if (product.id === 'nasi-kuning-mini') return IMG.best[1];
  // For others, use category image with gradient variation
  const catImg = IMG.cats[categoryId];
  if (catImg) return catImg;
  // Fallback gradient
  const g = CATEGORY_GRADIENTS[categoryId] || ['#ccc', '#999'];
  return null;
}

function renderProductImage(product, categoryId, big = false) {
  const url = productImage(product, categoryId);
  if (url) {
    return `<img src="${url}" alt="${product.name}" loading="lazy" onerror="this.parentElement.innerHTML=placeholderHTML('${categoryId}', '${escapeAttr(product.name)}')"/>`;
  }
  return placeholderHTML(categoryId, product.name);
}

function escapeAttr(s){ return String(s).replace(/'/g,"\\'").replace(/"/g,'&quot;'); }

function placeholderHTML(categoryId, name) {
  const g = CATEGORY_GRADIENTS[categoryId] || ['#c4a876', '#a88856'];
  const initial = String(name).charAt(0).toUpperCase();
  const emoji = (CATEGORIES.find(c=>c.id===categoryId)||{}).emoji || '🍽️';
  return `<div class="product-image-placeholder" style="background: linear-gradient(135deg, ${g[0]} 0%, ${g[1]} 100%);"><span>${emoji}</span></div>`;
}
