/**
 * SCALEBIZ GOOGLE MAPS LEADS SCRAPER - BUFFALO, NEW YORK (MASSIVE DEEP PIPELINE)
 * 
 * Target: Seluruh distrik kota Buffalo, NY (Erie County, Area Code 716)
 * Cakupan: South Buffalo, North Buffalo, East Side, West Side, Elmwood, Hertel, University District, Cheektowaga, Lackawanna
 * 
 * Output:
 * 1. leads/leads_buffalo_ny_all.csv
 * 2. leads/leads_buffalo_ny_no_website.csv (GOLDEN LEADS 🔥)
 * 3. leads/leads_buffalo_ny.json
 * 4. DATABASE_LEADS_BUFFALO_EXCEL.xlsx
 */

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const { generateBuffaloExcel } = require('./convert_buffalo_to_excel');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const leadsDir = path.join(__dirname, '..', 'leads');

if (!fs.existsSync(leadsDir)) {
  fs.mkdirSync(leadsDir, { recursive: true });
}

const csvAllPath = path.join(leadsDir, 'leads_buffalo_ny_all.csv');
const csvNoWebPath = path.join(leadsDir, 'leads_buffalo_ny_no_website.csv');
const jsonPath = path.join(leadsDir, 'leads_buffalo_ny.json');

// Kueri pencarian mendalam lintas sektor & koridor wilayah Buffalo, NY
const TARGET_QUERIES = [
  // --- KLASTER 1: OTOMOTIF & BENGKEL PER WILAYAH ---
  'auto repair South Buffalo NY',
  'car mechanic 14210 Buffalo NY',
  'auto body shop Broadway Buffalo NY',
  'mechanic Bailey Ave Buffalo NY',
  'auto repair Hertel Ave Buffalo NY',
  'car repair Grant St Buffalo NY',
  'auto mechanic 14207 Buffalo NY',
  'transmission repair Cheektowaga NY',
  'truck repair Buffalo NY 14206',
  'towing service 14213 Buffalo NY',
  'tire repair Seneca St Buffalo NY',
  'auto collision Abbott Rd Buffalo NY',
  'mobile mechanic Buffalo NY',
  'muffler brake shop Buffalo NY',
  'used auto parts Buffalo NY',

  // --- KLASTER 2: KONTRAKTOR, ATAP & HOME SERVICES ---
  'roofing contractor Buffalo NY 14215',
  'roof repair South Buffalo NY',
  'plumber South Buffalo NY 14220',
  'plumbing contractor 14213 Buffalo NY',
  'hvac repair Cheektowaga NY',
  'heating cooling 14207 Buffalo NY',
  'electrician Buffalo NY 14216',
  'electrical contractor 14211 Buffalo NY',
  'masonry contractor Buffalo NY',
  'painting contractor Elmwood Buffalo NY',
  'fencing contractor Buffalo NY',
  'concrete contractor South Buffalo NY',
  'handyman Buffalo NY 14222',
  'general contractor Buffalo NY 14201',
  'waterproofing basement Buffalo NY',

  // --- KLASTER 3: LANDSCAPING, LAWN & TREE SERVICE ---
  'landscaping lawn care 14220 Buffalo NY',
  'lawn maintenance Cheektowaga NY',
  'tree service 14215 Buffalo NY',
  'tree removal South Buffalo NY',
  'snow plowing service Buffalo NY',
  'paving contractor Buffalo NY',

  // --- KLASTER 4: SALON, BARBERSHOP & BEAUTY ---
  'hair salon Hertel Ave Buffalo NY',
  'barbershop South Buffalo NY',
  'hair salon 14213 Buffalo NY',
  'barbershop Broadway Buffalo NY',
  'nail salon 14216 Buffalo NY',
  'nail salon Elmwood Buffalo NY',
  'hair salon Kensington Buffalo NY',
  'tattoo shop Buffalo NY 14201',
  'barbershop Bailey Ave Buffalo NY',
  'beauty salon 14207 Buffalo NY',
  'braiding salon Buffalo NY',

  // --- KLASTER 5: RESTORAN LOKAL, PIZZERIA & KULINER ---
  'pizzeria South Buffalo NY',
  'pizzeria 14207 Buffalo NY',
  'pizzeria Bailey Ave Buffalo NY',
  'diner South Buffalo NY 14210',
  'diner 14207 Buffalo NY',
  'bakery Hertel Ave Buffalo NY',
  'bakery Broadway Buffalo NY',
  'deli Buffalo NY 14213',
  'bbq restaurant Buffalo NY',
  'soul food restaurant Buffalo NY',
  'jamaican restaurant Buffalo NY',
  'tacos mexican restaurant Buffalo NY',

  // --- KLASTER 6: LAYANAN KOMERSIAL & PERSONAL ---
  'pet grooming Buffalo NY 14222',
  'dog grooming South Buffalo NY',
  'locksmith 14201 Buffalo NY',
  'house cleaning service Buffalo NY',
  'carpet cleaning Buffalo NY',
  'dry cleaners Buffalo NY 14216'
];

// Helper: Format nomor telepon US (+1 (XXX) XXX-XXXX)
function formatUSPhoneNumber(rawPhone) {
  if (!rawPhone) return { phoneDisplay: '-', cleanNumber: '-', telLink: '-' };
  
  let digits = rawPhone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }
  
  if (digits.length === 10) {
    const area = digits.slice(0, 3);
    const mid = digits.slice(3, 6);
    const last = digits.slice(6, 10);
    const formatted = `+1 (${area}) ${mid}-${last}`;
    return {
      phoneDisplay: formatted,
      cleanNumber: `1${digits}`,
      telLink: `tel:+1${digits}`
    };
  }
  
  return {
    phoneDisplay: rawPhone.trim(),
    cleanNumber: rawPhone.replace(/\D/g, ''),
    telLink: `tel:${rawPhone.replace(/\D/g, '')}`
  };
}

// Helper: Analisis status website
function analyzeWebsite(websiteUrl) {
  if (!websiteUrl || websiteUrl.trim() === '' || websiteUrl === '-') {
    return {
      isLead: true,
      label: 'NO WEBSITE (GOLDEN LEAD 🔥)',
      category: 'No Website'
    };
  }

  const urlLower = websiteUrl.toLowerCase();
  
  const isSocialOrDir = [
    'facebook.com',
    'fb.com',
    'instagram.com',
    'yelp.com',
    'yellowpages.com',
    'business.site',
    'linktr.ee',
    'bio.link',
    'tiktok.com',
    'google.com'
  ].some(domain => urlLower.includes(domain));

  if (isSocialOrDir) {
    return {
      isLead: true,
      label: 'SOCIAL/DIRECTORY ONLY (GOLDEN LEAD 🔥)',
      category: 'Social/Directory'
    };
  }

  return {
    isLead: false,
    label: 'HAS OFFICIAL WEBSITE',
    category: 'Custom Website'
  };
}

// Inisialisasi CSV Files jika belum ada
function initCsvFiles() {
  const headers = [
    'No',
    'Business Name',
    'Category',
    'Address',
    'Phone',
    'Tel Link',
    'Rating',
    'Review Count',
    'Website Status',
    'Existing URL',
    'Google Maps URL',
    'Lead Quality',
    'Contact Status'
  ];

  const headerLine = '\uFEFF' + headers.map(h => `"${h}"`).join(',') + '\n';
  
  if (!fs.existsSync(csvAllPath)) {
    fs.writeFileSync(csvAllPath, headerLine, 'utf8');
  }
  if (!fs.existsSync(csvNoWebPath)) {
    fs.writeFileSync(csvNoWebPath, headerLine, 'utf8');
  }
}

// Append row ke CSV dengan proteksi EBUSY (jika file sedang dibuka di Excel)
function appendCsv(filePath, row, index) {
  const csvRow = [
    index,
    (row.name || '').replace(/"/g, '""'),
    (row.category || '').replace(/"/g, '""'),
    (row.address || '').replace(/"/g, '""'),
    (row.phone || '').replace(/"/g, '""'),
    row.telLink || '-',
    row.rating || '-',
    row.reviews || '0',
    row.websiteStatus || '-',
    (row.website || '-').replace(/"/g, '""'),
    row.mapsUrl || '-',
    row.isGoldenLead ? 'HIGH PRIORITY 🎯' : 'LOW PRIORITY',
    'New Lead'
  ];
  const line = csvRow.map(v => `"${v}"`).join(',') + '\n';
  
  try {
    fs.appendFileSync(filePath, line, 'utf8');
  } catch (err) {
    if (err.code === 'EBUSY') {
      const fallbackPath = filePath.replace(/\.csv$/, '_live.csv');
      try {
        fs.appendFileSync(fallbackPath, line, 'utf8');
      } catch {
        // Abaikan jika fallback juga sibuk, data tetap aman di memori & JSON
      }
    }
  }
}

async function scrapeBuffaloMassive(options = {}) {
  const targetNoWebLeads = options.targetNoWebLeads || 350; // Skala masal ratusan leads
  const queries = options.queries || TARGET_QUERIES;

  console.log('================================================================');
  console.log('🚀 SCALEBIZ MASSIVE GMAPS PIPELINE: BUFFALO, NEW YORK');
  console.log(`🎯 Target Skala: Minimal ${targetNoWebLeads} bisnis TANPA WEBSITE`);
  console.log(`📍 Wilayah: Multi-Distrik Buffalo & Erie County (716)`);
  console.log(`🔍 Total Kueri Terencana: ${queries.length} klaster wilayah & industri`);
  console.log('================================================================\n');

  initCsvFiles();

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--lang=en-US,en'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  );

  // Memuat data yang sudah pernah terkumpul untuk deduplikasi otomatis
  const allLeads = [];
  const noWebLeads = [];
  const seenUrls = new Set();
  const seenNames = new Set();

  if (fs.existsSync(jsonPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      existing.forEach(item => {
        if (item.mapsUrl) seenUrls.add(item.mapsUrl);
        if (item.name) seenNames.add(item.name.toLowerCase().trim());
        allLeads.push(item);
        if (item.isGoldenLead) noWebLeads.push(item);
      });
      console.log(`ℹ️ Berhasil memuat riwayat ${allLeads.length} leads Buffalo (${noWebLeads.length} Golden Leads).`);
      console.log(`🔁 Deduplikasi aktif: Melewati entri yang sudah pernah tersimpan.\n`);
    } catch {
      // Ignore
    }
  }

  // TAHAP 1: Kumpulkan link listing unik
  const collectedListings = [];
  const neededListings = Math.max(200, (targetNoWebLeads - noWebLeads.length) * 3);

  console.log(`📥 Tahap 1: Pengumpulan listing dari ${queries.length} klaster pencarian...`);

  const cachePath = path.join(leadsDir, 'buffalo_listings_cache.json');
  if (fs.existsSync(cachePath)) {
    try {
      const cached = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      if (Array.isArray(cached) && cached.length > 50) {
        console.log(`⚡ Menggunakan ${cached.length} listings dari cache lokal yang telah tersimpan.`);
        cached.forEach(c => {
          if (!seenUrls.has(c.href)) {
            collectedListings.push(c);
            seenUrls.add(c.href);
          }
        });
      }
    } catch {}
  }

  if (collectedListings.length < neededListings) {
    for (let q = 0; q < queries.length; q++) {
      if (noWebLeads.length >= targetNoWebLeads) break;

      const query = queries[q];
      console.log(`[Query ${q + 1}/${queries.length}] Mencari: "${query}"...`);
      const encoded = encodeURIComponent(query);
      const searchUrl = `https://www.google.com/maps/search/${encoded}/@42.8864,-78.8784,13z?hl=en`;

      try {
        await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForSelector('div[role="feed"], a.hfpxzc', { timeout: 10000 }).catch(() => null);

        // Scroll sidebar feed
        for (let s = 0; s < 8; s++) {
          await page.evaluate(() => {
            const feed = document.querySelector('div[role="feed"]');
            if (feed) feed.scrollBy(0, 2000);
          });
          await new Promise(r => setTimeout(r, 650));
        }

        // Ekstrak listings
        const listings = await page.$$eval('a.hfpxzc', els =>
          els.map(el => ({
            name: el.getAttribute('aria-label') || '',
            href: el.getAttribute('href') || ''
          }))
        );

        let added = 0;
        for (const item of listings) {
          const cleanName = item.name.toLowerCase().trim();
          if (item.href && !seenUrls.has(item.href) && !seenNames.has(cleanName)) {
            seenUrls.add(item.href);
            seenNames.add(cleanName);
            collectedListings.push(item);
            added++;
          }
        }

        console.log(`   ↳ +${added} listing baru (Antrean ekstraksi: ${collectedListings.length})`);
        
        // Simpan cache listing secara periodik
        fs.writeFileSync(cachePath, JSON.stringify(collectedListings, null, 2), 'utf8');
      } catch (err) {
        console.warn(`   ⚠️ Warning pada kueri "${query}":`, err.message);
      }

      await new Promise(r => setTimeout(r, 400));
    }
  }

  console.log(`\n================================================================`);
  console.log(`📋 Total ${collectedListings.length} listing baru siap diekstraksi.`);
  console.log(`📥 Tahap 2: Mengekstrak detail kontak, alamat & verifikasi website...`);
  console.log(`================================================================\n`);

  let countAll = allLeads.length;
  let countNoWeb = noWebLeads.length;

  for (let i = 0; i < collectedListings.length; i++) {
    if (countNoWeb >= targetNoWebLeads) {
      console.log(`\n🎯 Target masal ${targetNoWebLeads} Golden Leads telah tercapai!`);
      break;
    }

    const item = collectedListings[i];
    process.stdout.write(`[${i + 1}/${collectedListings.length}] "${item.name.slice(0, 28)}"... `);

    try {
      await page.goto(item.href, { waitUntil: 'domcontentloaded', timeout: 18000 });
      await page.waitForSelector('h1', { timeout: 6000 }).catch(() => null);

      const placeData = await page.evaluate(() => {
        const title = document.querySelector('h1')?.innerText?.trim() || '';
        const rating = document.querySelector('div.F7nice span[aria-hidden="true"]')?.innerText?.trim() || '-';
        const reviews = document.querySelector('div.F7nice span:last-child')?.innerText?.replace(/[\(\)]/g, '')?.trim() || '0';
        const category = document.querySelector('button[jsaction*="category"]')?.innerText?.trim() || 'Local Business';

        // Alamat
        const addressEl = document.querySelector('button[data-item-id="address"]');
        const address = addressEl ? addressEl.getAttribute('aria-label')?.replace(/^Address:\s*/i, '')?.trim() : '-';

        // Website link
        const websiteEl = document.querySelector('a[data-item-id="authority"]');
        const website = websiteEl ? websiteEl.getAttribute('href') : null;

        // Nomor Telepon
        const phoneEl = document.querySelector('[data-item-id^="phone:tel:"]');
        let phone = null;
        if (phoneEl) {
          phone = phoneEl.getAttribute('data-item-id')?.replace('phone:tel:', '')?.trim();
        }

        if (!phone) {
          const bodyText = document.body.innerText;
          const phoneMatch = bodyText.match(/\(?716\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
          if (phoneMatch) {
            phone = phoneMatch[0];
          }
        }

        return {
          title,
          rating,
          reviews,
          category,
          address,
          website,
          phone
        };
      });

      const cleanPhone = formatUSPhoneNumber(placeData.phone);
      const webAnalysis = analyzeWebsite(placeData.website);

      const record = {
        id: countAll + 1,
        name: placeData.title || item.name,
        category: placeData.category,
        address: placeData.address,
        phone: cleanPhone.phoneDisplay,
        cleanPhone: cleanPhone.cleanNumber,
        telLink: cleanPhone.telLink,
        rating: placeData.rating,
        reviews: placeData.reviews,
        website: placeData.website || '-',
        websiteStatus: webAnalysis.label,
        websiteType: webAnalysis.category,
        isGoldenLead: webAnalysis.isLead,
        mapsUrl: item.href,
        scrapedAt: new Date().toISOString()
      };

      allLeads.push(record);
      countAll++;
      appendCsv(csvAllPath, record, countAll);

      if (webAnalysis.isLead) {
        countNoWeb++;
        noWebLeads.push(record);
        appendCsv(csvNoWebPath, record, countNoWeb);
        console.log(`🔥 [GOLDEN #${countNoWeb}] ${record.name} | ${record.phone} | ${record.category}`);
      } else {
        console.log(`🌐 [Has Web] ${record.website ? record.website.slice(0, 32) : 'domain'}`);
      }

      // Simpan JSON secara periodik setiap 5 listing
      if (allLeads.length % 5 === 0) {
        fs.writeFileSync(jsonPath, JSON.stringify(allLeads, null, 2), 'utf8');
      }

      await new Promise(r => setTimeout(r, 450));
    } catch (err) {
      console.log(`❌ ${err.message}`);
    }
  }

  // Simpan JSON final
  fs.writeFileSync(jsonPath, JSON.stringify(allLeads, null, 2), 'utf8');
  await browser.close();

  // Otomatis regenerasi file Excel
  console.log('\n📊 Meregenerasi file Excel dengan seluruh data terbaru...');
  try {
    await generateBuffaloExcel();
  } catch (excelErr) {
    console.warn('⚠️ Gagal membuat Excel otomatis:', excelErr.message);
  }

  console.log('\n================================================================');
  console.log('✅ DEEP SCRAPING MASAL SELESAI!');
  console.log(`📊 Total Seluruh Bisnis Terdata  : ${allLeads.length}`);
  console.log(`🔥 Total GOLDEN LEADS (Tanpa Web): ${noWebLeads.length}`);
  console.log(`📁 File Excel Utama : DATABASE_LEADS_BUFFALO_EXCEL.xlsx`);
  console.log(`📁 File CSV Golden  : ${csvNoWebPath}`);
  console.log('================================================================\n');

  return { allLeads, noWebLeads };
}

if (require.main === module) {
  scrapeBuffaloMassive({ targetNoWebLeads: 300 }).catch(err => {
    console.error('Fatal error in massive scraper:', err);
    process.exit(1);
  });
}

module.exports = { scrapeBuffaloMassive };
