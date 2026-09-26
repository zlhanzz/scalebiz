/**
 * SCALEBIZ GOOGLE MAPS LEADS SCRAPER - LOCKPORT, NEW YORK
 * 
 * Target: Bisnis lokal di area Lockport, New York (kode area 716)
 * Fokus: Bisnis yang BELUM memiliki website atau hanya memiliki Facebook/Linktree/Direktori
 * 
 * Output:
 * 1. leads/leads_lockport_ny_all.csv (Semua data yang terkumpul)
 * 2. leads/leads_lockport_ny_no_website.csv (Khusus GOLDEN LEADS tanpa website)
 * 3. leads/leads_lockport_ny.json
 */

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const leadsDir = path.join(__dirname, '..', 'leads');

if (!fs.existsSync(leadsDir)) {
  fs.mkdirSync(leadsDir, { recursive: true });
}

const csvAllPath = path.join(leadsDir, 'leads_lockport_ny_all.csv');
const csvNoWebPath = path.join(leadsDir, 'leads_lockport_ny_no_website.csv');
const jsonPath = path.join(leadsDir, 'leads_lockport_ny.json');

// Kategori bisnis potensial tinggi di Lockport, NY yang seringkali belum memiliki website profesional
const TARGET_QUERIES = [
  'auto repair Lockport NY',
  'car mechanic Lockport NY',
  'hair salon Lockport NY',
  'barbershop Lockport NY',
  'nail salon Lockport NY',
  'restaurants Lockport NY',
  'diner Lockport NY',
  'pizzeria Lockport NY',
  'plumbers Lockport NY',
  'electricians Lockport NY',
  'roofing Lockport NY',
  'hvac repair Lockport NY',
  'landscaping lawn care Lockport NY',
  'tree service Lockport NY',
  'house cleaning Lockport NY',
  'handyman Lockport NY',
  'painting contractor Lockport NY',
  'contractors Lockport NY',
  'towing service Lockport NY',
  'bakery Lockport NY',
  'pet grooming Lockport NY',
  'auto body shop Lockport NY',
  'flooring contractor Lockport NY',
  'fencing Lockport NY',
  'locksmith Lockport NY',
  'florist Lockport NY'
];

// Helper: Format nomor telepon US (+1 (XXX) XXX-XXXX)
function formatUSPhoneNumber(rawPhone) {
  if (!rawPhone) return { phoneDisplay: '-', cleanNumber: '-', telLink: '-' };
  
  // Ambil hanya angka
  let digits = rawPhone.replace(/\D/g, '');
  
  // Jika 11 digit dan berawalan 1, hapus 1
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
  
  // Cek apakah website hanya berupa media sosial atau direktori profil
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

// Inisialisasi CSV Files
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

// Append ke file CSV
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
  fs.appendFileSync(filePath, csvRow.map(v => `"${v}"`).join(',') + '\n', 'utf8');
}

async function scrapeLockportNY(options = {}) {
  const targetLeads = options.maxLeads || 50; // Target leads tanpa website
  const queries = options.queries || TARGET_QUERIES;

  console.log('================================================================');
  console.log('🚀 SCALEBIZ GMAPS SCRAPER: LOCKPORT, NEW YORK (LEAD GENERATION)');
  console.log(`🎯 Target: Minimal ${targetLeads} bisnis TANPA WEBSITE`);
  console.log(`📍 Lokasi: Lockport, NY (Niagara County)`);
  console.log(`🔍 Kategori Kueri: ${queries.length} klaster pencarian`);
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

  // Load existing leads
  const allLeads = [];
  const noWebLeads = [];
  const seenUrls = new Set();

  if (fs.existsSync(jsonPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      existing.forEach(item => {
        if (item.mapsUrl) seenUrls.add(item.mapsUrl);
        allLeads.push(item);
        if (item.isGoldenLead) noWebLeads.push(item);
      });
      console.log(`ℹ️ Memuat ${allLeads.length} riwayat leads (${noWebLeads.length} tanpa website).\n`);
    } catch {
      // Ignore
    }
  }

  // TAHAP 1: Kumpulkan link listing unik
  const collectedListings = [];
  const neededListings = Math.max(30, targetLeads * 3);

  for (const query of queries) {
    if (noWebLeads.length >= targetLeads || collectedListings.length >= neededListings) break;

    console.log(`🔎 Mencari: "${query}"...`);
    const encoded = encodeURIComponent(query);
    // Lockport NY center: 43.1706° N, 78.6903° W
    const searchUrl = `https://www.google.com/maps/search/${encoded}/@43.1706,-78.6903,13z?hl=en`;

    try {
      await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 35000 });
      await page.waitForSelector('div[role="feed"], a.hfpxzc', { timeout: 12000 }).catch(() => null);

      // Scroll sidebar feed
      for (let s = 0; s < 8; s++) {
        await page.evaluate(() => {
          const feed = document.querySelector('div[role="feed"]');
          if (feed) feed.scrollBy(0, 1800);
        });
        await new Promise(r => setTimeout(r, 1000));
      }

      // Ambil listings
      const listings = await page.$$eval('a.hfpxzc', els =>
        els.map(el => ({
          name: el.getAttribute('aria-label') || '',
          href: el.getAttribute('href') || ''
        }))
      );

      const maxPerQuery = Math.max(8, Math.ceil(neededListings / Math.min(queries.length, 12)));
      let added = 0;
      for (const item of listings) {
        if (added >= maxPerQuery && collectedListings.length >= neededListings) break;
        if (item.href && !seenUrls.has(item.href)) {
          seenUrls.add(item.href);
          collectedListings.push(item);
          added++;
          if (added >= maxPerQuery) break;
        }
      }

      console.log(`   ↳ +${added} listing baru ditemukan (Total antrean: ${collectedListings.length})`);
    } catch (err) {
      console.warn(`   ⚠️ Warning pada kueri "${query}":`, err.message);
    }
  }

  console.log(`\n================================================================`);
  console.log(`📋 Total ${collectedListings.length} listing siap diekstrak.`);
  console.log(`📥 Mengekstrak nomor telepon & mendeteksi website...`);
  console.log(`================================================================\n`);

  let countAll = allLeads.length;
  let countNoWeb = noWebLeads.length;

  for (let i = 0; i < collectedListings.length; i++) {
    if (countNoWeb >= targetLeads) {
      console.log(`\n🎯 Target ${targetLeads} leads tanpa website telah tercapai!`);
      break;
    }

    const item = collectedListings[i];
    process.stdout.write(`[${i + 1}/${collectedListings.length}] "${item.name.slice(0, 30)}"... `);

    try {
      await page.goto(item.href, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForSelector('h1', { timeout: 8000 }).catch(() => null);

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

        // Fallback pencarian nomor telepon US (716 atau format umum)
        if (!phone) {
          const allText = Array.from(document.querySelectorAll('button[data-item-id], div.Io6YTe'))
            .map(e => e.innerText?.trim())
            .join(' ');
          const match = allText.match(/(?:\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
          if (match) phone = match[0].trim();
        }

        return { title, rating, reviews, category, address, website, phone };
      });

      const phoneInfo = formatUSPhoneNumber(placeData.phone);
      const webAnalysis = analyzeWebsite(placeData.website);

      const record = {
        name: placeData.title || item.name,
        category: placeData.category,
        address: placeData.address !== '-' ? placeData.address : 'Lockport, NY',
        phone: phoneInfo.phoneDisplay,
        telLink: phoneInfo.telLink,
        rating: placeData.rating,
        reviews: placeData.reviews,
        websiteStatus: webAnalysis.label,
        website: placeData.website || '-',
        isGoldenLead: webAnalysis.isLead,
        mapsUrl: item.href
      };

      countAll++;
      record.no = countAll;
      allLeads.push(record);
      appendCsv(csvAllPath, record, countAll);

      if (webAnalysis.isLead) {
        countNoWeb++;
        noWebLeads.push(record);
        appendCsv(csvNoWebPath, record, countNoWeb);
        console.log(`🔥 [GOLDEN LEAD #${countNoWeb}] Tel: ${record.phone} | Status: ${webAnalysis.category}`);
      } else {
        console.log(`⚪ Sudah ada web: ${placeData.website.slice(0, 30)}...`);
      }

      // Simpan JSON secara berkala
      fs.writeFileSync(jsonPath, JSON.stringify(allLeads, null, 2), 'utf8');

    } catch (err) {
      console.log(`❌ Error: ${err.message.slice(0, 35)}`);
    }

    // Delay ramah agar tidak terkena rate-limit
    await new Promise(r => setTimeout(r, 600));
  }

  await browser.close();

  console.log('\n================================================================');
  console.log(`🎉 SCRAPING LOCKPORT, NY SELESAI!`);
  console.log(`📊 Total Semua Bisnis Diekstrak: ${countAll}`);
  console.log(`🔥 TOTAL GOLDEN LEADS (TANPA WEBSITE): ${countNoWeb}`);
  console.log(`📁 File Khusus Tanpa Website: ${csvNoWebPath}`);
  console.log(`📁 File Semua Bisnis: ${csvAllPath}`);
  console.log(`📁 File JSON Lengkap: ${jsonPath}`);
  console.log('================================================================\n');

  return { allLeads, noWebLeads };
}

// CLI Execution
if (require.main === module) {
  const args = process.argv.slice(2);
  let maxLeads = 35; // Default: Kumpulkan 35 bisnis tanpa website terlebih dahulu
  
  const maxIdx = args.indexOf('--max');
  if (maxIdx !== -1 && args[maxIdx + 1]) {
    maxLeads = parseInt(args[maxIdx + 1], 10);
  }

  scrapeLockportNY({ maxLeads }).catch(err => {
    console.error('Fatal Scraper Error:', err);
    process.exit(1);
  });
}

module.exports = { scrapeLockportNY };
