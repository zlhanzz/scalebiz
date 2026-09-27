const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const leadsDir = path.join(__dirname, '..', 'leads');
const jsonPath = path.join(leadsDir, 'leads_buffalo_ny.json');
const rootXlsxPath = path.join(__dirname, '..', 'DATABASE_LEADS_BUFFALO_EXCEL.xlsx');
const vipXlsxPath = path.join(__dirname, '..', 'DATABASE_LEADS_BUFFALO_VIP_OSINT.xlsx');
const leadsXlsxPath = path.join(leadsDir, 'DATABASE_LEADS_BUFFALO_EXCEL.xlsx');
const leadsVipXlsxPath = path.join(leadsDir, 'DATABASE_LEADS_BUFFALO_VIP_OSINT.xlsx');
const latestXlsxPath = path.join(leadsDir, 'DATABASE_LEADS_BUFFALO_NY_EXCEL_LATEST.xlsx');

async function generateBuffaloExcel() {
  console.log('📊 Generating concrete, audited OSINT Excel workbook for Buffalo NY...');

  if (!fs.existsSync(jsonPath)) {
    console.error('❌ Error: leads_buffalo_ny.json not found!');
    return;
  }

  const allLeads = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const goldenLeads = allLeads.filter(l => l.isGoldenLead || l.websiteStatus?.includes('GOLDEN'));

  const digitalLeads = goldenLeads.filter(l => l.verificationStatus === 'VERIFIED_DIGITAL_ACTIVE');
  const offlineLeads = goldenLeads.filter(l => l.verificationStatus === 'VERIFIED_OFFLINE_TRADE');
  const ghostLeads = goldenLeads.filter(l => l.verificationStatus === 'GHOST_LEADGEN_SUSPECT');

  console.log(`Lead Breakdown:`);
  console.log(` - Master Scraped Businesses : ${allLeads.length}`);
  console.log(` - Total Golden Leads        : ${goldenLeads.length}`);
  console.log(` - 🟢 Digital Active Direct DM : ${digitalLeads.length}`);
  console.log(` - 📞 Verified Offline Trades  : ${offlineLeads.length}`);
  console.log(` - ⚠️ Flagged Ghost Listings   : ${ghostLeads.length}`);

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Scalebiz Client Acquisition Engine';
  workbook.lastModifiedBy = 'Scalebiz AI Pair Programmer';
  workbook.created = new Date();
  workbook.modified = new Date();

  // -------------------------------------------------------------
  // SHEET 1: 🎯 VIP DIGITAL OUTREACH (27 Prospek dengan DM/FB/IG/Email)
  // -------------------------------------------------------------
  const vipSheet = workbook.addWorksheet('🎯 VIP DIGITAL OUTREACH');
  vipSheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];
  vipSheet.properties.tabColor = { argb: 'FF10B981' }; // Emerald Green

  const vipHeaders = [
    'No',
    'Tier / Industry',
    'Business Name',
    'Legal Corporate Name (NY DOS)',
    'Owner / Key Contact',
    'Est. Deal Value',
    'Phone Number',
    'Direct DM / Social Outreach',
    'Direct Dial Link',
    'Click-to-SMS',
    'Booking / Quote Portal',
    'Facebook Page',
    'Instagram / Linktree',
    'Email Address',
    'Operating & Field Notes',
    'Full Street Address',
    'Google Rating',
    'Reviews',
    'Google Maps Link',
    'Outreach Status'
  ];

  vipSheet.addRow(vipHeaders);

  const vipHeaderRow = vipSheet.getRow(1);
  vipHeaderRow.height = 34;
  vipHeaderRow.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  vipHeaderRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  vipHeaderRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF064E3B' } // Deep Forest Emerald
  };

  digitalLeads.forEach((lead, idx) => {
    const row = vipSheet.addRow([
      idx + 1,
      lead.tierLabel || (lead.tierId ? `Tier ${lead.tierId}` : 'Tier 1 (Home Services)'),
      lead.name,
      lead.legalEntityName || '-',
      lead.ownerName || '-',
      lead.dealValue || '$1,500 - $8,000/deal',
      lead.phone || '-',
      lead.socialDmLink && lead.socialDmLink !== '-' ? lead.socialDmLink : '-',
      lead.telLink || (lead.cleanPhone ? `tel:${lead.cleanPhone}` : '-'),
      lead.smsLink || (lead.cleanPhone ? `sms:${lead.cleanPhone}` : '-'),
      lead.bookingPortal || '-',
      lead.facebookUrl && lead.facebookUrl !== '-' ? lead.facebookUrl : '-',
      lead.instagramUrl && lead.instagramUrl !== '-' ? lead.instagramUrl : '-',
      lead.email && lead.email !== '-' ? lead.email : '-',
      lead.operatingNotes || '-',
      lead.address ? lead.address.replace('Alamat: ', '').replace(', Amerika Serikat', '') : '-',
      parseFloat(lead.rating) || lead.rating || '-',
      parseInt(lead.reviews, 10) || 0,
      lead.mapsUrl || '-',
      'Ready to DM / Message'
    ]);

    row.height = 26;
    row.alignment = { vertical: 'middle' };

    // Format Business Name
    row.getCell(3).font = { bold: true, color: { argb: 'FF0F172A' } };

    // Format Legal Entity Name
    const legalCell = row.getCell(4);
    if (lead.legalEntityName && lead.legalEntityName !== '-') {
      legalCell.font = { bold: true, color: { argb: 'FF1E3A8A' } };
      legalCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    }

    // Format Owner Name
    const ownerCell = row.getCell(5);
    if (lead.ownerName && lead.ownerName !== '-' && lead.ownerName !== 'Management / Principal Owner') {
      ownerCell.font = { bold: true, color: { argb: 'FF065F46' } };
      ownerCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFECFDF5' } };
    }

    // Format Deal Value
    const dealCell = row.getCell(6);
    dealCell.font = { bold: true, color: { argb: 'FF92400E' } };
    dealCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } };

    // Format Direct DM Link
    const dmCell = row.getCell(8);
    if (lead.socialDmLink && lead.socialDmLink.startsWith('http')) {
      const label = lead.socialDmLink.includes('m.me') ? '💬 Open Messenger' :
                    lead.socialDmLink.includes('ig.me') ? '📸 Open Instagram DM' : '🔗 Open Linktree';
      dmCell.value = { text: label, hyperlink: lead.socialDmLink };
      dmCell.font = { bold: true, color: { argb: 'FF2563EB' }, underline: true };
      dmCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    }

    // Format Tel Link
    const telCell = row.getCell(9);
    if (lead.telLink && lead.telLink.startsWith('tel:')) {
      telCell.value = { text: '📞 ' + (lead.phone || 'Call'), hyperlink: lead.telLink };
      telCell.font = { color: { argb: 'FF0D9488' }, underline: true };
    }

    // Format SMS Link
    const smsCell = row.getCell(10);
    if (lead.smsLink && lead.smsLink.startsWith('sms:')) {
      smsCell.value = { text: '💬 Text via SMS', hyperlink: lead.smsLink };
      smsCell.font = { color: { argb: 'FF059669' }, underline: true };
    }

    // Format Facebook Link
    const fbCell = row.getCell(12);
    if (lead.facebookUrl && lead.facebookUrl.startsWith('http')) {
      fbCell.value = { text: '📘 View FB Page', hyperlink: lead.facebookUrl };
      fbCell.font = { color: { argb: 'FF1D4ED8' }, underline: true };
    }

    // Format Instagram Link
    const igCell = row.getCell(13);
    if (lead.instagramUrl && lead.instagramUrl.startsWith('http')) {
      igCell.value = { text: '📷 View Profile', hyperlink: lead.instagramUrl };
      igCell.font = { color: { argb: 'FFBE185D' }, underline: true };
    }

    // Format Map Link
    const mapCell = row.getCell(19);
    if (lead.mapsUrl && lead.mapsUrl.startsWith('http')) {
      mapCell.value = { text: '📍 View on Maps', hyperlink: lead.mapsUrl };
      mapCell.font = { color: { argb: 'FF4F46E5' }, underline: true };
    }

    // Zebra striping
    if (idx % 2 === 1) {
      for (let c = 1; c <= vipHeaders.length; c++) {
        const cell = row.getCell(c);
        if (!cell.fill) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF9FAFB' } };
        }
      }
    }
  });

  vipSheet.columns = [
    { width: 6 },  // No
    { width: 26 }, // Tier
    { width: 34 }, // Name
    { width: 34 }, // Legal Entity Name
    { width: 28 }, // Owner
    { width: 22 }, // Deal Value
    { width: 18 }, // Phone
    { width: 26 }, // DM Link
    { width: 20 }, // Direct Dial
    { width: 18 }, // SMS Link
    { width: 30 }, // Booking Portal
    { width: 20 }, // FB
    { width: 20 }, // IG
    { width: 28 }, // Email
    { width: 50 }, // Notes & Hooks
    { width: 38 }, // Address
    { width: 14 }, // Rating
    { width: 12 }, // Reviews
    { width: 18 }, // Map
    { width: 22 }  // Outreach Status
  ];

  vipSheet.autoFilter = { from: 'A1', to: `T${digitalLeads.length + 1}` };

  // -------------------------------------------------------------
  // SHEET 2: 📞 VERIFIED OFFLINE TRADES (181 Bisnis Offline Riil)
  // -------------------------------------------------------------
  const offlineSheet = workbook.addWorksheet('📞 VERIFIED OFFLINE TRADES');
  offlineSheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];
  offlineSheet.properties.tabColor = { argb: 'FF2563EB' }; // Royal Blue

  const offlineHeaders = [
    'No',
    'Tier / Industry',
    'Business Name',
    'Legal Corporate Name (NY DOS)',
    'Owner / Management',
    'Est. Deal Value',
    'Phone Number',
    'Direct Dial Link',
    'Click-to-SMS Link',
    'Full Street Address',
    'Google Rating',
    'Reviews Count',
    'Channel Strategy',
    'Operating & Field Notes',
    'Google Maps Link',
    'Outreach Status'
  ];

  offlineSheet.addRow(offlineHeaders);

  const offlineHeaderRow = offlineSheet.getRow(1);
  offlineHeaderRow.height = 32;
  offlineHeaderRow.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  offlineHeaderRow.alignment = { vertical: 'middle', horizontal: 'center' };
  offlineHeaderRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1E3A8A' } // Deep Navy Blue
  };

  offlineLeads.forEach((lead, idx) => {
    const row = offlineSheet.addRow([
      idx + 1,
      lead.tierLabel || (lead.tierId ? `Tier ${lead.tierId}` : 'Tier 4 (Automotive)'),
      lead.name,
      lead.legalEntityName || '-',
      lead.ownerName || 'Management / Principal Owner',
      lead.dealValue || '$500 - $3,000/deal',
      lead.phone || '-',
      lead.telLink || (lead.cleanPhone ? `tel:${lead.cleanPhone}` : '-'),
      lead.smsLink || (lead.cleanPhone ? `sms:${lead.cleanPhone}` : '-'),
      lead.address ? lead.address.replace('Alamat: ', '').replace(', Amerika Serikat', '') : '-',
      parseFloat(lead.rating) || lead.rating || '-',
      parseInt(lead.reviews, 10) || 0,
      'Direct Phone Call & SMS',
      lead.operatingNotes || 'Verified brick-and-mortar trade with physical location in Buffalo. Direct phone call is primary.',
      lead.mapsUrl || '-',
      'Ready to Cold Call / Text'
    ]);

    row.height = 24;
    row.alignment = { vertical: 'middle' };

    row.getCell(3).font = { bold: true };

    const telCell = row.getCell(8);
    if (lead.telLink && lead.telLink.startsWith('tel:')) {
      telCell.value = { text: '📞 ' + lead.phone, hyperlink: lead.telLink };
      telCell.font = { color: { argb: 'FF2563EB' }, underline: true };
    }

    const smsCell = row.getCell(9);
    if (lead.smsLink && lead.smsLink.startsWith('sms:')) {
      smsCell.value = { text: '💬 Send SMS', hyperlink: lead.smsLink };
      smsCell.font = { color: { argb: 'FF059669' }, underline: true };
    }

    const mapCell = row.getCell(15);
    if (lead.mapsUrl && lead.mapsUrl.startsWith('http')) {
      mapCell.value = { text: '📍 View Map', hyperlink: lead.mapsUrl };
      mapCell.font = { color: { argb: 'FF4F46E5' }, underline: true };
    }

    if (idx % 2 === 1) {
      for (let c = 1; c <= offlineHeaders.length; c++) {
        const cell = row.getCell(c);
        if (!cell.fill) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
      }
    }
  });

  offlineSheet.columns = [
    { width: 6 },  // No
    { width: 24 }, // Tier
    { width: 34 }, // Name
    { width: 32 }, // Legal
    { width: 26 }, // Owner
    { width: 20 }, // Deal Value
    { width: 18 }, // Phone
    { width: 20 }, // Dial
    { width: 18 }, // SMS
    { width: 38 }, // Address
    { width: 14 }, // Rating
    { width: 14 }, // Reviews
    { width: 24 }, // Strategy
    { width: 48 }, // Notes
    { width: 16 }, // Map
    { width: 22 }  // Status
  ];

  offlineSheet.autoFilter = { from: 'A1', to: `P${offlineLeads.length + 1}` };

  // -------------------------------------------------------------
  // SHEET 3: ⚠️ GHOST & CALO LEAD (16 Listing Virtual - SKIP)
  // -------------------------------------------------------------
  const ghostSheet = workbook.addWorksheet('⚠️ GHOST LISTINGS (SKIP)');
  ghostSheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];
  ghostSheet.properties.tabColor = { argb: 'FFDC2626' }; // Red

  const ghostHeaders = [
    'No',
    'Business Listing Name',
    'Category',
    'Recorded Phone Number',
    'Suspected Origin / Reason',
    'Recorded Address',
    'Recommendation',
    'Google Maps Link'
  ];

  ghostSheet.addRow(ghostHeaders);

  const ghostHeaderRow = ghostSheet.getRow(1);
  ghostHeaderRow.height = 32;
  ghostHeaderRow.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  ghostHeaderRow.alignment = { vertical: 'middle', horizontal: 'center' };
  ghostHeaderRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF991B1B' } // Dark Crimson
  };

  ghostLeads.forEach((lead, idx) => {
    const row = ghostSheet.addRow([
      idx + 1,
      lead.name,
      lead.category || '-',
      lead.phone || '-',
      lead.operatingNotes || 'Out-of-state virtual call-forwarder',
      lead.address ? lead.address.replace('Alamat: ', '').replace(', Amerika Serikat', '') : '-',
      'DO NOT CONTACT (Save time & phone bills)',
      lead.mapsUrl || '-'
    ]);

    row.height = 24;
    row.alignment = { vertical: 'middle' };

    row.getCell(2).font = { bold: true, color: { argb: 'FF991B1B' } };
    row.getCell(7).font = { bold: true, color: { argb: 'FFDC2626' } };

    const mapCell = row.getCell(8);
    if (lead.mapsUrl && lead.mapsUrl.startsWith('http')) {
      mapCell.value = { text: '📍 View Listing', hyperlink: lead.mapsUrl };
      mapCell.font = { color: { argb: 'FF4F46E5' }, underline: true };
    }

    if (idx % 2 === 1) {
      for (let c = 1; c <= ghostHeaders.length; c++) {
        const cell = row.getCell(c);
        if (!cell.fill) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFDF2F2' } };
      }
    }
  });

  ghostSheet.columns = [
    { width: 6 },
    { width: 34 },
    { width: 22 },
    { width: 22 },
    { width: 50 },
    { width: 38 },
    { width: 34 },
    { width: 16 }
  ];

  ghostSheet.autoFilter = { from: 'A1', to: `H${ghostLeads.length + 1}` };

  // -------------------------------------------------------------
  // SHEET 4: 📋 ALL 707 BUSINESSES (Master Scraped Directory)
  // -------------------------------------------------------------
  const allSheet = workbook.addWorksheet('📋 ALL 707 BUSINESSES');
  allSheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];
  allSheet.properties.tabColor = { argb: 'FF6B7280' }; // Gray

  const allHeaders = [
    'No',
    'Business Name',
    'Category',
    'Phone',
    'Address',
    'Website',
    'Rating',
    'Reviews',
    'Is Golden Lead',
    'Google Maps Link'
  ];

  allSheet.addRow(allHeaders);
  const allHeaderRow = allSheet.getRow(1);
  allHeaderRow.height = 30;
  allHeaderRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  allHeaderRow.alignment = { vertical: 'middle', horizontal: 'center' };
  allHeaderRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF374151' } };

  allLeads.forEach((lead, idx) => {
    const isGolden = lead.isGoldenLead || (lead.websiteStatus && lead.websiteStatus.includes('GOLDEN'));
    const row = allSheet.addRow([
      idx + 1,
      lead.name,
      lead.category || '-',
      lead.phone || '-',
      lead.address ? lead.address.replace('Alamat: ', '').replace(', Amerika Serikat', '') : '-',
      lead.website || '-',
      parseFloat(lead.rating) || lead.rating || '-',
      parseInt(lead.reviews, 10) || 0,
      isGolden ? 'YES (No Website)' : 'NO (Has Website)',
      lead.mapsUrl || '-'
    ]);

    row.height = 20;
    row.alignment = { vertical: 'middle' };

    if (isGolden) {
      row.getCell(9).font = { bold: true, color: { argb: 'FF047857' } };
      row.getCell(9).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD1FAE5' } };
    }
  });

  allSheet.columns = [
    { width: 6 },
    { width: 34 },
    { width: 24 },
    { width: 18 },
    { width: 38 },
    { width: 28 },
    { width: 12 },
    { width: 12 },
    { width: 18 },
    { width: 18 }
  ];

  allSheet.autoFilter = { from: 'A1', to: `J${allLeads.length + 1}` };

  // Write files with lock protection
  const targets = [
    rootXlsxPath,
    vipXlsxPath,
    leadsXlsxPath,
    leadsVipXlsxPath,
    latestXlsxPath,
    path.join(__dirname, '..', 'DATABASE_LEADS_BUFFALO_VIP_AUDITED.xlsx')
  ];

  for (const t of targets) {
    try {
      await workbook.xlsx.writeFile(t);
      console.log(`✅ Saved: ${t}`);
    } catch (err) {
      if (err.code === 'EBUSY') {
        console.warn(`⚠️ Warning: ${path.basename(t)} is currently open in Microsoft Excel. Created updated copy as DATABASE_LEADS_BUFFALO_VIP_AUDITED.xlsx`);
      } else {
        console.error(`❌ Error writing to ${t}:`, err.message);
      }
    }
  }

  console.log(`\n🎉 Excel workbook generation finished!`);
}

generateBuffaloExcel();
