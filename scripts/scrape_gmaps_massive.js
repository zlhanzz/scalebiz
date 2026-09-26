const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputCsvPath = path.join(__dirname, '..', 'leads', 'leads_makassar_massive.csv');
const outputJsonPath = path.join(__dirname, '..', 'leads', 'leads_makassar_massive.json');

// Pastikan direktori leads ada
const leadsDir = path.join(__dirname, '..', 'leads');
if (!fs.existsSync(leadsDir)) {
  fs.mkdirSync(leadsDir, { recursive: true });
}

// Target keywords lintas sektor Makassar
const DEFAULT_QUERIES = [
  'wedding organizer makassar',
  'dekorasi pernikahan makassar',
  'studio foto makassar',
  'fotografer makassar',
  'klinik gigi makassar',
  'dokter gigi makassar',
  'desain interior makassar',
  'kontraktor interior makassar',
  'kitchen set makassar',
  'bimbingan belajar makassar',
  'bimbel kedinasan makassar',
  'pet shop makassar',
  'florist makassar',
  'kafe makassar',
  'butik makassar',
  'klinik kecantikan makassar',
  'skincare makassar'
];

// Helper: Format nomor telepon menjadi nomor internasional WhatsApp (628...)
function formatWhatsAppNumber(rawPhone) {
  if (!rawPhone) return { phoneDisplay: '-', waLink: '-' };
  let clean = rawPhone.replace(/[^0-9]/g, '');
  if (clean.startsWith('0')) {
    clean = '62' + clean.slice(1);
  } else if (!clean.startsWith('62')) {
    clean = '62' + clean;
  }
  // Hanya buatkan wa.me jika panjang digit masuk akal (10-15 digit) dan berawalan 628
  if (clean.startsWith('628') && clean.length >= 10 && clean.length <= 15) {
    return {
      phoneDisplay: rawPhone.trim(),
      waLink: `https://wa.me/${clean}`
    };
  }
  return {
    phoneDisplay: rawPhone.trim(),
    waLink: '-'
  };
}

// Helper: Analisis status website
function analyzeWebsiteStatus(websiteUrl) {
  if (!websiteUrl || websiteUrl.trim() === '') {
    return { status: 'TIDAK ADA WEBSITE (GOLDEN LEAD 🔥)', type: 'None' };
  }
  const lower = websiteUrl.toLowerCase();
  if (lower.includes('linktr.ee') || lower.includes('bio.link') || lower.includes('wa.me') || lower.includes('bit.ly') || lower.includes('instagram.com') || lower.includes('facebook.com') || lower.includes('business.site')) {
    return { status: 'HANYA LINKTREE/MEDSOS (GOLDEN LEAD 🔥)', type: 'Linktree/Social' };
  }
  return { status: 'SUDAH ADA WEBSITE', type: 'Official' };
}

// Inisialisasi file CSV dengan header jika belum ada
function initCsvFile() {
  const headers = [
    'No',
    'Nama Bisnis',
    'Kategori',
    'Area / Alamat',
    'Telepon Asli',
    'Link Chat WhatsApp',
    'Rating',
    'Jumlah Review',
    'Status Website',
    'Website / Linktree URL',
    'Google Maps URL',
    'Status Follow-Up'
  ];
  if (!fs.existsSync(outputCsvPath)) {
    fs.writeFileSync(outputCsvPath, '\uFEFF' + headers.map(h => `"${h}"`).join(',') + '\n', 'utf8');
  }
}

// Append 1 baris ke CSV
function appendToCsv(row, index) {
  const csvRow = [
    index,
    row.name.replace(/"/g, '""'),
    row.category.replace(/"/g, '""'),
    row.address.replace(/"/g, '""'),
    row.phone.replace(/"/g, '""'),
    row.waLink,
    row.rating,
    row.reviews,
    row.websiteStatus.replace(/"/g, '""'),
    (row.website || '-').replace(/"/g, '""'),
    row.mapsUrl,
    'Belum Dihubungi'
  ];
  fs.appendFileSync(outputCsvPath, csvRow.map(v => `"${v}"`).join(',') + '\n', 'utf8');
}

async function scrapeMassiveLeads(options = {}) {
  const targetMax = options.max || 100;
  const queries = options.queries || DEFAULT_QUERIES;

  console.log('====================================================');
  console.log('🚀 SCALEBIZ MASSIVE GMAPS LEADS SCRAPER - MAKASSAR');
  console.log(`🎯 Target Total Leads: Minimal ${targetMax} bisnis`);
  console.log(`📌 Kategori Target: ${queries.length} klaster pencarian`);
  console.log('====================================================\n');

  initCsvFile();

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--lang=id-ID,id'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  // Load existing leads to avoid duplicate URLs
  const existingUrls = new Set();
  const allLeads = [];

  if (fs.existsSync(outputJsonPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(outputJsonPath, 'utf8'));
      existing.forEach(item => {
        if (item.mapsUrl) existingUrls.add(item.mapsUrl);
        if (item.phone && item.phone !== '-') existingUrls.add(item.phone);
        allLeads.push(item);
      });
      console.log(`ℹ️ Memuat ${allLeads.length} leads yang sudah ada dari batch sebelumnya.`);
    } catch {
      // Ignore
    }
  }

  // TAHAP 1: Kumpulkan seluruh link listing unik dari semua search queries
  const collectedPlaceListings = [];
  const seenHrefs = new Set(existingUrls);

  const neededNew = Math.max(30, (targetMax - allLeads.length) * 2);

  for (const q of queries) {
    if (collectedPlaceListings.length >= neededNew) break;

    console.log(`\n🔍 Mencari: "${q}"...`);
    const encoded = encodeURIComponent(q);
    const searchUrl = `https://www.google.com/maps/search/${encoded}/@-5.147665,119.432731,13z?hl=id`;

    try {
      await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForSelector('div[role="feed"], a.hfpxzc', { timeout: 15000 }).catch(() => null);

      // Auto-scroll sidebar feed 8-12 kali
      for (let s = 0; s < 10; s++) {
        await page.evaluate(() => {
          const feed = document.querySelector('div[role="feed"]');
          if (feed) feed.scrollBy(0, 1800);
        });
        await new Promise(r => setTimeout(r, 1200));
      }

      // Ambil semua listing links
      const listings = await page.$$eval('a.hfpxzc', els => els.map(el => ({
        name: el.getAttribute('aria-label') || '',
        href: el.getAttribute('href') || ''
      })));

      let addedCount = 0;
      for (const item of listings) {
        if (item.href && !seenHrefs.has(item.href)) {
          seenHrefs.add(item.href);
          collectedPlaceListings.push(item);
          addedCount++;
        }
      }

      console.log(`   ↳ Berhasil mengumpulkan +${addedCount} listing unik (Total antrean: ${collectedPlaceListings.length})`);
    } catch (err) {
      console.warn(`   ⚠️ Gagal mencari query "${q}":`, err.message);
    }
  }

  console.log(`\n====================================================`);
  console.log(`📋 Selesai mengumpulkan ${collectedPlaceListings.length} listing calon bisnis.`);
  console.log(`📥 Mulai ekstraksi detail kontak, telepon & website...`);
  console.log(`====================================================\n`);

  let countScraped = allLeads.length;

  // TAHAP 2: Ekstraksi nomor telepon, alamat, dan website dari setiap listing
  for (let i = 0; i < collectedPlaceListings.length; i++) {
    if (countScraped >= targetMax) {
      console.log(`\n🎉 Target ${targetMax} leads terpenuhi!`);
      break;
    }

    const item = collectedPlaceListings[i];
    process.stdout.write(`[${i + 1}/${collectedPlaceListings.length}] Mengambil data: "${item.name.slice(0, 35)}"... `);

    try {
      await page.goto(item.href, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForSelector('h1', { timeout: 8000 }).catch(() => null);

      const placeData = await page.evaluate(() => {
        const title = document.querySelector('h1')?.innerText?.trim() || '';
        const rating = document.querySelector('div.F7nice span[aria-hidden="true"]')?.innerText?.trim() || '-';
        const reviews = document.querySelector('div.F7nice span:last-child')?.innerText?.replace(/[\(\)]/g, '')?.trim() || '0';
        const category = document.querySelector('button[jsaction*="category"]')?.innerText?.trim() || 'Bisnis Lokal';

        // Cari tombol-tombol detail
        const addressEl = document.querySelector('button[data-item-id="address"]');
        const address = addressEl ? addressEl.getAttribute('aria-label')?.replace(/^Alamat:\s*/i, '')?.trim() : '-';

        const websiteEl = document.querySelector('a[data-item-id="authority"]');
        const website = websiteEl ? websiteEl.getAttribute('href') : null;

        // Cari nomor telepon
        const phoneEl = document.querySelector('[data-item-id^="phone:tel:"]');
        let phone = null;
        if (phoneEl) {
          phone = phoneEl.getAttribute('data-item-id')?.replace('phone:tel:', '')?.trim();
        }

        // Fallback pencarian nomor telepon jika data-item-id berbeda
        if (!phone) {
          const allText = Array.from(document.querySelectorAll('button[data-item-id], div.Io6YTe')).map(e => e.innerText?.trim()).join(' ');
          const match = allText.match(/(?:\+62|08|0411)[0-9\s\-]{6,16}/);
          if (match) phone = match[0].trim();
        }

        return { title, rating, reviews, category, address, website, phone };
      });

      const { phoneDisplay, waLink } = formatWhatsAppNumber(placeData.phone);
      const { status: webStatus } = analyzeWebsiteStatus(placeData.website);

      // Hanya simpan bisnis yang memiliki nomor kontak
      if (phoneDisplay && phoneDisplay !== '-') {
        countScraped++;
        const record = {
          no: countScraped,
          name: placeData.title || item.name,
          category: placeData.category,
          address: placeData.address !== '-' ? placeData.address : 'Makassar',
          phone: phoneDisplay,
          waLink: waLink,
          rating: placeData.rating,
          reviews: placeData.reviews,
          websiteStatus: webStatus,
          website: placeData.website || '-',
          mapsUrl: item.href
        };

        allLeads.push(record);
        appendToCsv(record, countScraped);
        fs.writeFileSync(outputJsonPath, JSON.stringify(allLeads, null, 2), 'utf8');

        console.log(`✅ [${record.phone}] (${webStatus})`);
      } else {
        console.log(`⏭️ Dilewati (Tidak ada nomor telepon publik)`);
      }
    } catch (err) {
      console.log(`❌ Error (${err.message.slice(0, 30)})`);
    }

    // Delay wajar antar kunjungan agar tidak dianggap bot abuse
    await new Promise(r => setTimeout(r, 600));
  }

  await browser.close();

  console.log('\n====================================================');
  console.log(`🎉 SCRAPING SELESAI!`);
  console.log(`📊 Total Leads Valid Tersimpan: ${countScraped} bisnis`);
  console.log(`📁 File CSV: ${outputCsvPath}`);
  console.log(`📁 File JSON: ${outputJsonPath}`);
  console.log('====================================================\n');

  return allLeads;
}

// Jalankan jika dieksekusi langsung
if (require.main === module) {
  const args = process.argv.slice(2);
  let max = 120; // Default target minimal 120 leads
  const maxIdx = args.indexOf('--max');
  if (maxIdx !== -1 && args[maxIdx + 1]) {
    max = parseInt(args[maxIdx + 1], 10);
  }

  scrapeMassiveLeads({ max }).catch(err => {
    console.error('Fatal Scraper Error:', err);
    process.exit(1);
  });
}

module.exports = { scrapeMassiveLeads };
