/**
 * SCALEBIZ TIER-BASED LEAD GENERATION ENGINE
 * 
 * Mesin pencari prospek otomatis berbasis Matriks Tier Prioritas:
 * - Mengeksekusi pencarian berjenjang (Tier 1 -> Tier 2 -> dst.)
 * - Menolak junk leads otomatis (scrap, junkyard, rongsokan) via blocklist
 * - Menyaring nomor telepon, alamat, rating, ulasan, dan status ketiadaan website
 * - Menyimpan metadata Tier untuk mempermudah eksekusi sales & outreach
 */

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const { SCRAPING_TIERS, isJunkListing } = require('../config/scraping_tiers');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const leadsDir = path.join(__dirname, '..', '..', 'leads');

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

// Helper re-generate Excel ber-tier
async function saveTieredExcel(allRows, goldenRows, outputPath) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Scalebiz Tier-Based Engine';
  workbook.lastModifiedBy = 'Scalebiz AI';
  workbook.created = new Date();

  const setupSheet = (sheet, title, dataRows, isGolden) => {
    sheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];
    sheet.properties.tabColor = { argb: isGolden ? 'FFFFD700' : 'FF2563EB' };

    const headers = [
      'No', 'Tier Category', 'Deal Potential', 'Business Name', 'Niche / Category',
      'Address', 'Phone Number', 'Direct Dial Link', 'Google Rating', 'Reviews Count',
      'Website Status', 'Existing URL', 'Google Maps Link', 'Lead Quality', 'Contact Status'
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
        idx + 1,
        row.tierLabel || 'Tier 1',
        row.dealValue || '$5k - $25k',
        row.name,
        row.category,
        row.address,
        row.phone,
        row.telLink,
        row.rating,
        row.reviews,
        row.websiteStatus,
        row.website || row.existingUrl || '-',
        row.mapsUrl,
        row.leadQuality,
        row.contactStatus || 'New Lead'
      ]);
      r.height = 24;
      r.alignment = { vertical: 'middle' };

      // Styling badge Tier
      const tierCell = r.getCell(2);
      if (row.tierId === 1) {
        tierCell.font = { bold: true, color: { argb: 'FFB45309' } };
        tierCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } };
      } else if (row.tierId === 2) {
        tierCell.font = { bold: true, color: { argb: 'FF9D174D' } };
        tierCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFCE7F3' } };
      }

      r.getCell(7).font = { bold: true, color: { argb: 'FF0D9488' } };

      if (row.telLink && row.telLink.startsWith('tel:')) {
        const linkCell = r.getCell(8);
        linkCell.value = { text: '📞 ' + row.phone, hyperlink: row.telLink };
        linkCell.font = { color: { argb: 'FF2563EB' }, underline: true };
      }

      if (row.mapsUrl && row.mapsUrl.startsWith('http')) {
        const mapCell = r.getCell(13);
        mapCell.value = { text: '📍 View on Maps', hyperlink: row.mapsUrl };
        mapCell.font = { color: { argb: 'FF4F46E5' }, underline: true };
      }

      const qualityCell = r.getCell(14);
      if (row.isGoldenLead || (row.leadQuality && row.leadQuality.includes('HIGH'))) {
        qualityCell.font = { bold: true, color: { argb: 'FF15803D' } };
        qualityCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0FDF4' } };
      }

      if (idx % 2 === 1) {
        for (let c = 1; c <= 15; c++) {
          const cell = r.getCell(c);
          if (!cell.fill) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
        }
      }
    });

    sheet.columns = [
      { width: 6 }, { width: 26 }, { width: 18 }, { width: 34 }, { width: 28 },
      { width: 44 }, { width: 20 }, { width: 22 }, { width: 14 }, { width: 15 },
      { width: 34 }, { width: 25 }, { width: 22 }, { width: 20 }, { width: 18 }
    ];
    sheet.autoFilter = { from: 'A1', to: `O${dataRows.length + 1}` };
  };

  const goldenSheet = workbook.addWorksheet('GOLDEN LEADS (Priority Tiers)');
  setupSheet(goldenSheet, 'Golden Leads', goldenRows, true);

  const allSheet = workbook.addWorksheet('All Scraped Businesses');
  setupSheet(allSheet, 'All Scraped Businesses', allRows, false);

  try {
    await workbook.xlsx.writeFile(outputPath);
    console.log(`✅ Tiered Excel saved to: ${outputPath}`);
  } catch (err) {
    console.warn(`⚠️ Warning: could not write to ${outputPath}:`, err.message);
  }
}

/**
 * Runner Utama Mesin Scraper Ber-Tier
 */
async function runTieredScraper(options = {}) {
  const city = options.city || 'Buffalo, NY';
  const targetTiers = options.tiers || [1, 2]; // Default: Prioritaskan Tier 1 & Tier 2
  const maxGoldenPerQuery = options.maxGoldenPerQuery || 5;

  console.log('================================================================');
  console.log(`👑 SCALEBIZ TIER-BASED LEAD GENERATION ENGINE`);
  console.log(`📍 Target Wilayah : ${city}`);
  console.log(`🎯 Target Tiers   : ${targetTiers.map(t => `Tier ${t}`).join(', ')}`);
  console.log(`🛡️ Anti-Junk Filter: Aktif (Auto-reject junkyard & scrap yards)`);
  console.log('================================================================\n');

  if (!fs.existsSync(leadsDir)) fs.mkdirSync(leadsDir, { recursive: true });

  const safeCitySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  const cityJsonPath = path.join(leadsDir, `leads_${safeCitySlug}.json`);
  const cityAllCsvPath = path.join(leadsDir, `leads_${safeCitySlug}_all.csv`);
  const cityGoldenCsvPath = path.join(leadsDir, `leads_${safeCitySlug}_no_website.csv`);
  const cityExcelPath = path.join(leadsDir, `DATABASE_LEADS_${safeCitySlug.toUpperCase()}_EXCEL.xlsx`);
  const cityExcelLatest = path.join(leadsDir, `DATABASE_LEADS_${safeCitySlug.toUpperCase()}_EXCEL_LATEST.xlsx`);

  // Helper klasifikasi Tier otomatis berdasarkan kategori
  function detectTier(cat = '', name = '') {
    const text = `${cat} ${name}`.toLowerCase();
    if (text.includes('roof') || text.includes('plumb') || text.includes('electr') || text.includes('hvac') || text.includes('remodel') || text.includes('tree') || text.includes('contractor') || text.includes('mason') || text.includes('waterproof')) {
      return { id: 1, label: 'Tier 1 (Home Services)', deal: '$5k - $25k' };
    }
    if (text.includes('salon') || text.includes('barber') || text.includes('spa') || text.includes('hair') || text.includes('nail') || text.includes('tattoo') || text.includes('lash') || text.includes('beauty')) {
      return { id: 2, label: 'Tier 2 (Beauty & Wellness)', deal: '$80 - $350/visit' };
    }
    if (text.includes('law') || text.includes('cpa') || text.includes('tax') || text.includes('dental') || text.includes('chiro') || text.includes('realt') || text.includes('doctor')) {
      return { id: 3, label: 'Tier 3 (Professional & Health)', deal: '$1,000 - $10,000' };
    }
    return { id: 4, label: 'Tier 4 (Automotive / Other)', deal: '$300 - $2,500' };
  }

  // Load existing leads
  let existingLeads = [];
  const seenUrls = new Set();
  const seenNames = new Set();

  if (fs.existsSync(cityJsonPath)) {
    try {
      existingLeads = JSON.parse(fs.readFileSync(cityJsonPath, 'utf8'));
      existingLeads.forEach(l => {
        if (l.mapsUrl) seenUrls.add(l.mapsUrl);
        if (l.name) seenNames.add(l.name.toLowerCase().trim());
        if (!l.tierId) {
          const t = detectTier(l.category, l.name);
          l.tierId = t.id;
          l.tierLabel = t.label;
          l.dealValue = t.deal;
        }
      });
      console.log(`ℹ️ Memuat ${existingLeads.length} leads riwayat Buffalo (${existingLeads.filter(l => l.isGoldenLead || l.websiteStatus?.includes('GOLDEN')).length} Golden Leads).`);
    } catch {}
  }


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

  let totalNewGolden = 0;
  let totalNewAll = 0;

  for (const tierNum of targetTiers) {
    const tierConfig = SCRAPING_TIERS[`tier${tierNum}`];
    if (!tierConfig) continue;

    console.log(`\n----------------------------------------------------------------`);
    console.log(`🚀 MEMULAI EKSEKUSI: ${tierConfig.name.toUpperCase()}`);
    console.log(`💎 Potensi Nilai : ${tierConfig.dealValue}`);
    console.log(`💡 Karakteristik : ${tierConfig.whyHighConversion}`);
    console.log(`----------------------------------------------------------------\n`);

    for (const rawQuery of tierConfig.queries) {
      const fullQuery = `${rawQuery} in ${city}`;
      console.log(`\n🔍 [Tier ${tierNum}] Mencari: "${fullQuery}"`);

      try {
        const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(fullQuery)}`;
        await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForSelector('div[role="feed"]', { timeout: 10000 }).catch(() => null);

        // Scroll feed
        for (let s = 0; s < 3; s++) {
          await page.evaluate(() => {
            const feed = document.querySelector('div[role="feed"]');
            if (feed) feed.scrollTop += 1800;
          });
          await new Promise(r => setTimeout(r, 600));
        }

        // Ambil link listing
        const listings = await page.evaluate(() => {
          const results = [];
          const items = document.querySelectorAll('div[role="feed"] > div > div > a[href*="/maps/place/"]');
          items.forEach(a => {
            const href = a.getAttribute('href');
            const name = a.getAttribute('aria-label') || a.innerText.split('\n')[0] || '';
            if (href && name) results.push({ name: name.trim(), href });
          });
          return results;
        });

        console.log(`   Ditemukan ${listings.length} listing di feed.`);

        let queryGoldenCount = 0;

        for (const item of listings) {
          if (queryGoldenCount >= maxGoldenPerQuery) break;
          const nameLower = item.name.toLowerCase().trim();

          // Cek duplikasi
          if (seenUrls.has(item.href) || seenNames.has(nameLower)) continue;

          // Cek Anti-Junk Filter
          if (isJunkListing(item.name)) {
            console.log(`   🚫 [JUNK BLOCKED] Mengabaikan: "${item.name}"`);
            continue;
          }

          process.stdout.write(`   [Tier ${tierNum}] "${item.name.slice(0, 26)}"... `);

          try {
            await page.goto(item.href, { waitUntil: 'domcontentloaded', timeout: 16000 });
            await page.waitForSelector('h1', { timeout: 5000 }).catch(() => null);

            const placeData = await page.evaluate(() => {
              const title = document.querySelector('h1')?.innerText?.trim() || '';
              const rating = document.querySelector('div.F7nice span[aria-hidden="true"]')?.innerText?.trim() || '-';
              const reviews = document.querySelector('div.F7nice span:last-child')?.innerText?.replace(/[\(\)]/g, '')?.trim() || '0';
              const category = document.querySelector('button[jsaction*="category"]')?.innerText?.trim() || 'Local Business';

              const addressEl = document.querySelector('button[data-item-id="address"]');
              const address = addressEl ? addressEl.getAttribute('aria-label')?.replace(/^Address:\s*/i, '')?.trim() : 'Buffalo, NY';

              const websiteEl = document.querySelector('a[data-item-id="authority"]');
              const website = websiteEl ? websiteEl.getAttribute('href') : null;

              const phoneEl = document.querySelector('[data-item-id^="phone:tel:"]');
              let phone = null;
              if (phoneEl) {
                phone = phoneEl.getAttribute('data-item-id')?.replace('phone:tel:', '')?.trim();
              }

              if (!phone) {
                const bodyText = document.body.innerText;
                const phoneMatch = bodyText.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
                if (phoneMatch) phone = phoneMatch[0];
              }

              return { title, rating, reviews, category, address, website, phone };
            });

            // Re-check kategori dengan anti-junk
            if (isJunkListing(placeData.title, placeData.category)) {
              console.log(`🚫 [Junk Category Filtered: ${placeData.category}]`);
              continue;
            }

            const cleanPhone = formatUSPhoneNumber(placeData.phone);
            const webAnalysis = analyzeWebsite(placeData.website);

            const record = {
              id: existingLeads.length + 1,
              tierId: tierConfig.id,
              tierLabel: tierConfig.shortName,
              dealValue: tierConfig.dealValue,
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

            existingLeads.push(record);
            seenUrls.add(item.href);
            seenNames.add(nameLower);
            totalNewAll++;

            if (webAnalysis.isLead) {
              queryGoldenCount++;
              totalNewGolden++;
              console.log(`🔥 [GOLDEN TIER ${tierNum} #${totalNewGolden}] ${record.phone} | ${record.category}`);
            } else {
              console.log(`🌐 [Has Web: ${record.category}]`);
            }

            await new Promise(r => setTimeout(r, 400));
          } catch (itemErr) {
            console.log(`❌ ${itemErr.message}`);
          }
        }
      } catch (qErr) {
        console.warn(`   ⚠️ Gagal kueri "${fullQuery}":`, qErr.message);
      }
    }
  }

  await browser.close();

  // Bersihkan temp profiles
  const tempDir = process.env.TEMP;
  try {
    fs.readdirSync(tempDir).filter(f => f.startsWith('puppeteer_dev_chrome_profile')).forEach(f => {
      try { fs.rmSync(path.join(tempDir, f), { recursive: true, force: true }); } catch {}
    });
  } catch {}

  // Simpan JSON
  fs.writeFileSync(cityJsonPath, JSON.stringify(existingLeads, null, 2), 'utf8');

  // Pisahkan Golden Leads & All Leads
  const goldenLeads = existingLeads.filter(l => l.isGoldenLead || l.websiteStatus?.includes('GOLDEN'));

  // Simpan Excel ber-Tier
  await saveTieredExcel(existingLeads, goldenLeads, cityExcelLatest);
  await saveTieredExcel(existingLeads, goldenLeads, cityExcelPath);

  console.log('\n================================================================');
  console.log(`🎉 EKSEKUSI TIER-BASED ENGINE SELESAI!`);
  console.log(`📈 Total Bisnis Terkumpul : ${existingLeads.length} Bisnis`);
  console.log(`🌟 Total Golden Leads     : ${goldenLeads.length} Bisnis Tanpa Website`);
  console.log(`💎 Distribusi per Tier:`);
  [1, 2, 3, 4].forEach(t => {
    const count = goldenLeads.filter(g => g.tierId === t).length;
    if (count > 0) {
      console.log(`   - Tier ${t}: ${count} Golden Leads`);
    }
  });
  console.log('================================================================\n');

  return { total: existingLeads.length, golden: goldenLeads.length };
}

if (require.main === module) {
  // Parse command line args
  // Contoh: node tier_lead_scraper.js --city="Buffalo, NY" --tiers=1,2
  const args = process.argv.slice(2);
  let city = 'Buffalo, NY';
  let tiers = [1, 2];

  args.forEach(arg => {
    if (arg.startsWith('--city=')) city = arg.split('=')[1].replace(/"/g, '');
    if (arg.startsWith('--tiers=')) tiers = arg.split('=')[1].split(',').map(Number);
  });

  runTieredScraper({ city, tiers, maxGoldenPerQuery: 4 }).catch(err => {
    console.error('Fatal engine error:', err);
    process.exit(1);
  });
}

module.exports = { runTieredScraper };
