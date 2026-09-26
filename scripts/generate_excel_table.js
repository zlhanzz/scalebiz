const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const jsonPath = path.join(__dirname, '..', 'leads', 'leads_lockport_ny_enriched.json');
const xlsxPath = path.join(__dirname, '..', 'leads', 'leads_lockport_ny_enriched.xlsx');

async function createExcelWithTable() {
  if (!fs.existsSync(jsonPath)) {
    console.error(`File not found: ${jsonPath}`);
    return;
  }

  const leads = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Scalebiz Intelligence';
  workbook.lastModifiedBy = 'Zhull | Scalebiz';
  workbook.created = new Date();
  workbook.modified = new Date();

  const worksheet = workbook.addWorksheet('Lockport NY Golden Leads', {
    views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }],
    properties: { tabColor: { argb: 'FF10B981' } } // Emerald green tab
  });

  // Define columns
  const tableColumns = [
    { name: 'No', filterButton: true },
    { name: 'Business Name', filterButton: true },
    { name: 'Category', filterButton: true },
    { name: 'Address (Lockport, NY)', filterButton: true },
    { name: 'Phone', filterButton: true },
    { name: 'Owner / Key Contact', filterButton: true },
    { name: 'Primary Outreach Channel', filterButton: true },
    { name: 'Facebook Page', filterButton: true },
    { name: 'Direct Messenger (1-Click)', filterButton: true },
    { name: 'Instagram', filterButton: true },
    { name: 'Yelp Profile', filterButton: true },
    { name: 'LinkedIn', filterButton: true },
    { name: 'Email Address', filterButton: true },
    { name: 'Google Maps Link', filterButton: true },
    { name: 'OSINT Intelligence Notes', filterButton: true }
  ];

  // Prepare table rows
  const tableRows = leads.map(l => [
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

  // Add the native Excel Table
  worksheet.addTable({
    name: 'LockportGoldenLeads',
    ref: 'A1',
    headerRow: true,
    totalsRow: false,
    style: {
      theme: 'TableStyleMedium9', // Professional Blue Table Theme with alternate zebra row colors
      showRowStripes: true,
    },
    columns: tableColumns,
    rows: tableRows
  });

  // Adjust Column Widths & Alignments
  const colWidths = [
    6,   // No
    32,  // Business Name
    24,  // Category
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
    50   // OSINT Notes
  ];

  colWidths.forEach((w, i) => {
    worksheet.getColumn(i + 1).width = w;
  });

  // Format header row
  const headerRow = worksheet.getRow(1);
  headerRow.height = 28;
  headerRow.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

  // Format data cells & Hyperlinks
  for (let r = 2; r <= leads.length + 1; r++) {
    const row = worksheet.getRow(r);
    row.height = 22;
    row.alignment = { vertical: 'middle' };

    // Center "No" column
    row.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };

    // Center "Phone"
    row.getCell(5).alignment = { vertical: 'middle', horizontal: 'center' };

    // Make URLs into real clickable Excel Hyperlinks
    const makeHyperlink = (colIdx, text, url) => {
      if (url && url.startsWith('http')) {
        const cell = row.getCell(colIdx);
        cell.value = {
          text: text,
          hyperlink: url,
          tooltip: `Open link: ${url}`
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

  await workbook.xlsx.writeFile(xlsxPath);
  console.log(`\n🎉 SUCCESS! Generated native Excel Table file:`);
  console.log(`Path: ${xlsxPath}`);
}

createExcelWithTable();
