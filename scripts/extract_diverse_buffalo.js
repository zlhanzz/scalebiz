/**
 * SCALEBIZ DIVERSE CATEGORY EXTRACTOR - BUFFALO, NY
 * 
 * Target: Mengekstrak antrean non-otomotif dari buffalo_listings_cache.json
 * Klaster:
 * 1. Beauty & Salons (Barbershops, Hair Salons, Nail Spas, Tattoo)
 * 2. Contractors & Trades (Roofing, Plumbing, HVAC, Electricians, Masonry, Landscaping)
 * 3. Food & Dining (Pizzerias, Diners, Bakeries, Delis, Cafes)
 * 4. Commercial Services (Cleaning Services, Pet Grooming, Locksmiths)
 */

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const leadsDir = path.join(__dirname, '..', 'leads');
const cachePath = path.join(leadsDir, 'buffalo_listings_cache.json');
const jsonPath = path.join(leadsDir, 'leads_buffalo_ny.json');
const csvAllPath = path.join(leadsDir, 'leads_buffalo_ny_all.csv');
const csvNoWebPath = path.join(leadsDir, 'leads_buffalo_ny_no_website.csv');
const rootXlsxPath = path.join(__dirname, '..', 'DATABASE_LEADS_BUFFALO_EXCEL.xlsx');
const leadsXlsxPath = path.join(leadsDir, 'DATABASE_LEADS_BUFFALO_EXCEL.xlsx');
const leadsNoWebXlsxPath = path.join(leadsDir, 'leads_buffalo_ny_no_website.xlsx');
const leadsAllXlsxPath = path.join(leadsDir, 'leads_buffalo_ny_all.xlsx');

// Helper format US phone
function formatUSPhoneNumber(rawPhone) {
  if (!rawPhone) return { phoneDisplay: '-', cleanNumber: '-', telLink: '-' };
  let digits = rawPhone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
  if (digits.length === 10) {
    const area = digits.slice(0, 3);
    const mid = digits.slice(3, 6);
    const last = digits.slice(6, 10);
    return {
      phoneDisplay: `+1 (${area}) ${mid}-${last}`,
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

// Helper analisa website
function analyzeWebsite(websiteUrl) {
  if (!websiteUrl || websiteUrl.trim() === '' || websiteUrl === '-') {
    return { isLead: true, label: 'NO WEBSITE (GOLDEN LEAD 🔥)', category: 'No Website' };
  }
  const urlLower = websiteUrl.toLowerCase();
  const isSocialOrDir = [
    'facebook.com', 'fb.com', 'instagram.com', 'yelp.com',
    'yellowpages.com', 'business.site', 'linktr.ee', 'bio.link',
    'tiktok.com', 'google.com'
  ].some(domain => urlLower.includes(domain));

  if (isSocialOrDir) {
    return { isLead: true, label: 'SOCIAL/DIRECTORY ONLY (GOLDEN LEAD 🔥)', category: 'Social/Directory' };
  }
  return { isLead: false, label: 'HAS OFFICIAL WEBSITE', category: 'Custom Website' };
}

// Helper append CSV dengan safe catch EBUSY
function appendCsvSafe(filePath, row, index) {
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
    // Abaikan jika terkunci sementara
  }
}

// Helper re-generate Excel
async function regenerateExcel(allRows, goldenRows) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Scalebiz Client Acquisition Engine';
  workbook.lastModifiedBy = 'Scalebiz AI';
  workbook.created = new Date();
  workbook.modified = new Date();

  const setupSheet = (sheet, title, dataRows, isGolden) => {
    sheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];
    sheet.properties.tabColor = { argb: isGolden ? 'FFFFD700' : 'FF2563EB' };

    const headers = [
      'No', 'Business Name', 'Category / Niche', 'Full Address (Buffalo, NY)',
      'Phone Number', 'Direct Dial Link', 'Google Rating', 'Reviews Count',
      'Website Status', 'Existing URL', 'Google Maps Link', 'Lead Quality', 'Outreach Status'
    ];
    sheet.addRow(headers);

    const headerRow = sheet.getRow(1);
    headerRow.height = 32;
    headerRow.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.fill = {
      type: 'pattern', pattern: 'solid',
      fgColor: { argb: isGolden ? 'FF1E293B' : 'FF0F172A' }
    };

    dataRows.forEach((row, idx) => {
      const r = sheet.addRow([
        idx + 1, row.name, row.category, row.address, row.phone,
        row.telLink, row.rating, row.reviews, row.websiteStatus,
        row.website || row.existingUrl || '-', row.mapsUrl, row.leadQuality, row.contactStatus || 'New Lead'
      ]);
      r.height = 24;
      r.alignment = { vertical: 'middle' };

      r.getCell(5).font = { bold: true, color: { argb: 'FF0D9488' } };

      if (row.telLink && row.telLink.startsWith('tel:')) {
        const linkCell = r.getCell(6);
        linkCell.value = { text: '📞 ' + row.phone, hyperlink: row.telLink };
        linkCell.font = { color: { argb: 'FF2563EB' }, underline: true };
      }

      if (row.mapsUrl && row.mapsUrl.startsWith('http')) {
        const mapCell = r.getCell(11);
        mapCell.value = { text: '📍 View on Maps', hyperlink: row.mapsUrl };
        mapCell.font = { color: { argb: 'FF4F46E5' }, underline: true };
      }

      const qualityCell = r.getCell(12);
      if (row.isGoldenLead || (row.leadQuality && row.leadQuality.includes('HIGH'))) {
        qualityCell.font = { bold: true, color: { argb: 'FF15803D' } };
        qualityCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0FDF4' } };
      }

      if (idx % 2 === 1) {
        for (let c = 1; c <= 13; c++) {
          const cell = r.getCell(c);
          if (!cell.fill) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
        }
      }
    });

    sheet.columns = [
      { width: 6 }, { width: 34 }, { width: 28 }, { width: 44 },
      { width: 20 }, { width: 22 }, { width: 14 }, { width: 15 },
      { width: 34 }, { width: 25 }, { width: 22 }, { width: 20 }, { width: 18 }
    ];
    sheet.autoFilter = { from: 'A1', to: `M${dataRows.length + 1}` };
  };

  const goldenSheet = workbook.addWorksheet('Buffalo GOLDEN LEADS (No Web)');
  setupSheet(goldenSheet, 'Buffalo Golden Leads', goldenRows, true);

  const allSheet = workbook.addWorksheet('All Scraped Buffalo Businesses');
  setupSheet(allSheet, 'All Scraped Businesses', allRows, false);

  const targetPaths = [
    path.join(leadsDir, 'DATABASE_LEADS_BUFFALO_EXCEL_LATEST.xlsx'),
    rootXlsxPath,
    leadsXlsxPath,
    leadsNoWebXlsxPath,
    leadsAllXlsxPath
  ];

  let successCount = 0;
  for (const p of targetPaths) {
    try {
      await workbook.xlsx.writeFile(p);
      successCount++;
    } catch (err) {
      // Abaikan jika salah satu file sedang dibuka di Excel
    }
  }
  console.log(`✅ Excel synchronized: ${successCount} files updated (${goldenRows.length} Golden Leads, ${allRows.length} Total).`);
}


async function extractDiverseLeads(options = {}) {
  const maxToExtract = options.maxToExtract || 100; // Target batch ini

  console.log('================================================================');
  console.log('🚀 SCALEBIZ DIVERSE CATEGORY EXTRACTOR - BUFFALO, NY');
  console.log(`🎯 Fokus: Kategori Non-Otomotif (Salon, Kontraktor, Pizzeria, Cleaning)`);
  console.log(`📥 Target Batch: ${maxToExtract} bisnis non-otomotif baru`);
  console.log('================================================================\n');

  if (!fs.existsSync(cachePath)) {
    console.error('❌ Cache tidak ditemukan di:', cachePath);
    return;
  }

  const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));

  // Load existing leads
  let allLeads = [];
  const seenUrls = new Set();
  const seenNames = new Set();

  if (fs.existsSync(jsonPath)) {
    try {
      allLeads = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      allLeads.forEach(l => {
        if (l.mapsUrl) seenUrls.add(l.mapsUrl);
        if (l.name) seenNames.add(l.name.toLowerCase().trim());
      });
      console.log(`ℹ️ Memuat ${allLeads.length} riwayat leads Buffalo (${allLeads.filter(l => l.isGoldenLead || l.websiteStatus?.includes('GOLDEN')).length} Golden Leads).`);
    } catch {}
  }

  // Filter khusus klaster Beauty (Salon, Barbershop, Nail, Spa, Tattoo) & Food (Pizzeria, Diner, Bakery, Deli, Cafe)
  const beautyFoodKeywords = ['hair', 'barber', 'salon', 'nail', 'spa', 'tattoo', 'beauty', 'pizza', 'diner', 'bakery', 'deli', 'cafe', 'restaurant', 'grill', 'taco', 'bbq', 'clean', 'pet', 'dog'];
  
  const unvisitedDiverse = cache.filter(c => {
    const nameLower = c.name.toLowerCase().trim();
    if (seenUrls.has(c.href) || seenNames.has(nameLower)) return false;
    
    // Harus memuat kata kunci beauty/food/services
    return beautyFoodKeywords.some(kw => nameLower.includes(kw));
  });

  console.log(`🎯 Ditemukan ${unvisitedDiverse.length} listing Beauty, Salons & Food dalam antrean.`);
  const queueToProcess = unvisitedDiverse.slice(0, maxToExtract);
  console.log(`⚡ Mengambil batch ${queueToProcess.length} listing Beauty & Food untuk diekstrak.\n`);



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
  await page.setViewport({ width: 1366, height: 850 });
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  );

  let newlyAddedGolden = 0;
  let newlyAddedAll = 0;

  for (let i = 0; i < queueToProcess.length; i++) {
    const item = queueToProcess[i];
    process.stdout.write(`[${i + 1}/${queueToProcess.length}] "${item.name.slice(0, 28)}"... `);

    try {
      await page.goto(item.href, { waitUntil: 'domcontentloaded', timeout: 16000 });
      await page.waitForSelector('h1', { timeout: 5000 }).catch(() => null);

      const placeData = await page.evaluate(() => {
        const title = document.querySelector('h1')?.innerText?.trim() || '';
        const rating = document.querySelector('div.F7nice span[aria-hidden="true"]')?.innerText?.trim() || '-';
        const reviews = document.querySelector('div.F7nice span:last-child')?.innerText?.replace(/[\(\)]/g, '')?.trim() || '0';
        const category = document.querySelector('button[jsaction*="category"]')?.innerText?.trim() || 'Local Business';

        // Alamat
        const addressEl = document.querySelector('button[data-item-id="address"]');
        const address = addressEl ? addressEl.getAttribute('aria-label')?.replace(/^Address:\s*/i, '')?.trim() : 'Buffalo, NY';

        // Website
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
          if (phoneMatch) phone = phoneMatch[0];
        }

        return { title, rating, reviews, category, address, website, phone };
      });

      const cleanPhone = formatUSPhoneNumber(placeData.phone);
      const webAnalysis = analyzeWebsite(placeData.website);

      const record = {
        id: allLeads.length + 1,
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
        leadQuality: webAnalysis.isLead ? 'HIGH PRIORITY 🎯' : 'LOW PRIORITY',
        contactStatus: 'New Lead',
        mapsUrl: item.href,
        scrapedAt: new Date().toISOString()
      };

      allLeads.push(record);
      seenUrls.add(item.href);
      seenNames.add(record.name.toLowerCase().trim());
      newlyAddedAll++;

      appendCsvSafe(csvAllPath, record, allLeads.length);

      if (webAnalysis.isLead) {
        newlyAddedGolden++;
        appendCsvSafe(csvNoWebPath, record, newlyAddedGolden);
        console.log(`🔥 [GOLDEN #${newlyAddedGolden}] ${record.name} | ${record.phone} | ${record.category}`);
      } else {
        console.log(`🌐 [Has Web] ${record.category} | ${record.website ? record.website.slice(0, 30) : 'domain'}`);
      }

      // Simpan JSON berkala setiap 5 lead
      if (newlyAddedAll % 5 === 0) {
        fs.writeFileSync(jsonPath, JSON.stringify(allLeads, null, 2), 'utf8');
      }

      await new Promise(r => setTimeout(r, 400));
    } catch (err) {
      console.log(`❌ ${err.message}`);
    }
  }

  // Simpan JSON final
  fs.writeFileSync(jsonPath, JSON.stringify(allLeads, null, 2), 'utf8');
  await browser.close();

  // Bersihkan sisa puppeteer profile di temp agar disk tidak membengkak
  const tempDir = process.env.TEMP;
  try {
    fs.readdirSync(tempDir).filter(f => f.startsWith('puppeteer_dev_chrome_profile')).forEach(f => {
      try { fs.rmSync(path.join(tempDir, f), { recursive: true, force: true }); } catch {}
    });
  } catch {}

  const goldenLeads = allLeads.filter(l => l.isGoldenLead || l.websiteStatus?.includes('GOLDEN'));

  // Regenerasi Excel
  console.log('\n📊 Sinkronisasi Excel dengan kategori baru...');
  await regenerateExcel(allLeads, goldenLeads);

  console.log('\n================================================================');
  console.log('✅ EKSTRAKSI KATEGORI BERAGAM SELESAI!');
  console.log(`📈 Leads Baru Terkumpul    : +${newlyAddedAll} bisnis non-otomotif`);
  console.log(`🔥 Golden Leads Baru       : +${newlyAddedGolden} tanpa website`);
  console.log(`📊 Total Seluruh Database  : ${allLeads.length} Bisnis`);
  console.log(`🌟 Total Seluruh Golden    : ${goldenLeads.length} Bisnis Tanpa Website`);
  console.log('================================================================\n');

  return { totalAll: allLeads.length, totalGolden: goldenLeads.length };
}

if (require.main === module) {
  extractDiverseLeads({ maxToExtract: 50 }).catch(err => {
    console.error('Fatal error in extractor:', err);
    process.exit(1);
  });
}


module.exports = { extractDiverseLeads };
