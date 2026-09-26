const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'leads', 'leads_lockport_ny_enriched.json');
const enrichedXlsxPath = path.join(__dirname, '..', 'leads', 'leads_lockport_ny_enriched.xlsx');
const rootXlsxPath = path.join(__dirname, '..', 'DATABASE_LEADS_LOCKPORT_EXCEL.xlsx');
const csvPath = path.join(__dirname, '..', 'leads', 'leads_lockport_ny_enriched.csv');

async function fixAll() {
  const leads = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const csvHeaders = [
    "No",
    "Business Name",
    "Category",
    "Address",
    "Phone",
    "Owner / Key Contact",
    "Primary DM / Outreach Channel",
    "Facebook Page",
    "Direct Messenger Link (m.me)",
    "Instagram Profile",
    "Yelp Profile",
    "LinkedIn",
    "Email Address",
    "Google Maps URL",
    "OSINT Intelligence Notes"
  ];

  // 1. GENERATE THE NATIVE EXCEL WORKBOOK (.xlsx)
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Scalebiz Intelligence';
  workbook.lastModifiedBy = 'Zhull | Scalebiz';

  const ws = workbook.addWorksheet('Lockport NY Leads', {
    views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }]
  });

  const tableColumns = csvHeaders.map(h => ({ name: h, filterButton: true }));

  const rows = leads.map(l => [
    parseInt(l.id, 10),
    l.name,
    l.category,
    l.address,
    l.phone,
    l.ownerName,
    l.primaryDMChannel,
    l.facebookUrl !== '-' ? l.facebookUrl : '-',
    l.messengerLink !== '-' ? l.messengerLink : '-',
    l.instagramUrl !== '-' ? l.instagramUrl : '-',
    l.yelpUrl !== '-' ? l.yelpUrl : '-',
    l.linkedinUrl !== '-' ? l.linkedinUrl : '-',
    l.emailDetected !== '-' ? l.emailDetected : '-',
    l.gmapsUrl,
    l.intelligenceNotes
  ]);

  ws.addTable({
    name: 'LockportGoldenLeadsTable',
    ref: 'A1',
    headerRow: true,
    totalsRow: false,
    style: {
      theme: 'TableStyleMedium9', // Professional Blue Table theme with zebra stripes
      showRowStripes: true,
    },
    columns: tableColumns,
    rows: rows
  });

  const colWidths = [
    8,   // No
    32,  // Business Name
    25,  // Category
    42,  // Address
    20,  // Phone
    26,  // Owner / Key Contact
    36,  // Primary Outreach Channel
    35,  // Facebook Page
    35,  // Direct Messenger
    32,  // Instagram
    35,  // Yelp Profile
    30,  // LinkedIn
    32,  // Email Address
    35,  // Google Maps Link
    55   // OSINT Notes
  ];

  colWidths.forEach((w, i) => {
    ws.getColumn(i + 1).width = w;
  });

  const headerRow = ws.getRow(1);
  headerRow.height = 28;
  headerRow.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

  for (let r = 2; r <= leads.length + 1; r++) {
    const row = ws.getRow(r);
    row.height = 22;
    row.alignment = { vertical: 'middle' };

    row.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(5).alignment = { vertical: 'middle', horizontal: 'center' };

    const makeHyperlink = (colIdx, text, url) => {
      if (url && url.startsWith('http')) {
        const cell = row.getCell(colIdx);
        cell.value = {
          text: text,
          hyperlink: url,
          tooltip: `Open: ${url}`
        };
        cell.font = { name: 'Segoe UI', size: 10, color: { argb: 'FF0D6EFD' }, underline: true };
      }
    };

    const makeMailto = (colIdx, email) => {
      if (email && email.includes('@')) {
        const cell = row.getCell(colIdx);
        cell.value = {
          text: email,
          hyperlink: `mailto:${email}`,
          tooltip: `Send email to ${email}`
        };
        cell.font = { name: 'Segoe UI', size: 10, color: { argb: 'FF0D6EFD' }, underline: true };
      }
    };

    const lead = leads[r - 2];
    if (lead) {
      if (lead.facebookUrl && lead.facebookUrl !== '-') makeHyperlink(8, 'Open Facebook Page', lead.facebookUrl);
      if (lead.messengerLink && lead.messengerLink !== '-') makeHyperlink(9, '💬 Send Messenger Chat', lead.messengerLink);
      if (lead.instagramUrl && lead.instagramUrl !== '-') makeHyperlink(10, '📸 Open Instagram DM', lead.instagramUrl);
      if (lead.yelpUrl && lead.yelpUrl !== '-') makeHyperlink(11, '⭐ View Yelp Profile', lead.yelpUrl);
      if (lead.linkedinUrl && lead.linkedinUrl !== '-') makeHyperlink(12, '💼 View LinkedIn', lead.linkedinUrl);
      if (lead.emailDetected && lead.emailDetected !== '-') makeMailto(13, lead.emailDetected);
      if (lead.gmapsUrl) makeHyperlink(14, '📍 View on Google Maps', lead.gmapsUrl);
    }
  }

  try {
    await workbook.xlsx.writeFile(enrichedXlsxPath);
    console.log('Saved enriched xlsx to leads/ folder:', enrichedXlsxPath);
  } catch(e) {
    console.log('enrichedXlsx was locked, skipping overwrite:', e.message);
  }

  await workbook.xlsx.writeFile(rootXlsxPath);
  console.log('SUCCESS! Saved standalone Excel Table to root workspace:', rootXlsxPath);

  // Try updating CSV with sep=,
  try {
    function escapeCsv(val) {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/[\r\n]+/g, ' ').replace(/"/g, '""');
      return `"${str}"`;
    }

    const csvLines = [
      'sep=,',
      csvHeaders.map(escapeCsv).join(',')
    ];

    leads.forEach(item => {
      const row = [
        item.id,
        item.name,
        item.category,
        item.address,
        item.phone,
        item.ownerName,
        item.primaryDMChannel,
        item.facebookUrl,
        item.messengerLink,
        item.instagramUrl,
        item.yelpUrl,
        item.linkedinUrl,
        item.emailDetected,
        item.gmapsUrl,
        item.intelligenceNotes
      ];
      csvLines.push(row.map(escapeCsv).join(','));
    });

    const BOM = '\uFEFF';
    fs.writeFileSync(csvPath, BOM + csvLines.join('\r\n'), 'utf8');
    console.log('Updated CSV with sep=, directive:', csvPath);
  } catch(err) {
    console.log('CSV is currently opened in Excel by the user, skipping CSV rewrite.');
  }
}

fixAll();
