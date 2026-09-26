const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const csvPath = path.join(__dirname, '..', 'leads', 'leads_lockport_ny_no_website.csv');
const xlsxPath = path.join(__dirname, '..', 'leads', 'leads_lockport_ny_no_website.xlsx');

async function convertCsvToExcelTable() {
  if (!fs.existsSync(csvPath)) return;

  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);

  const parseLine = (line) => {
    let inQuotes = false;
    let current = '';
    const cols = [];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cols.push(current.replace(/^"|"$/g, '').trim());
        current = '';
      } else {
        current += char;
      }
    }
    cols.push(current.replace(/^"|"$/g, '').trim());
    return cols;
  };

  const rawHeaders = parseLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseLine(lines[i]);
    if (cols.length >= 10) {
      rows.push([
        parseInt(cols[0], 10) || cols[0],
        cols[1],
        cols[2],
        cols[3],
        cols[4],
        cols[5],
        cols[6],
        cols[7],
        cols[8],
        cols[9],
        cols[10],
        cols[11] || 'HIGH PRIORITY 🎯',
        cols[12] || 'New Lead'
      ]);
    }
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Lockport Leads (No Website)', {
    views: [{ state: 'frozen', xSplit: 0, ySplit: 1 }],
    properties: { tabColor: { argb: 'FF2563EB' } }
  });

  const tableColumns = rawHeaders.map(h => ({ name: h, filterButton: true }));

  worksheet.addTable({
    name: 'RawGoldenLeads',
    ref: 'A1',
    headerRow: true,
    totalsRow: false,
    style: {
      theme: 'TableStyleMedium2',
      showRowStripes: true,
    },
    columns: tableColumns,
    rows: rows
  });

  const widths = [6, 32, 24, 42, 20, 20, 10, 14, 28, 35, 35, 20, 16];
  widths.forEach((w, i) => worksheet.getColumn(i + 1).width = w);

  const headerRow = worksheet.getRow(1);
  headerRow.height = 28;
  headerRow.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

  for (let r = 2; r <= rows.length + 1; r++) {
    const row = worksheet.getRow(r);
    row.height = 22;
    row.alignment = { vertical: 'middle' };
    row.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(5).alignment = { vertical: 'middle', horizontal: 'center' };

    // Hyperlinks
    const gmapsCell = row.getCell(11);
    if (gmapsCell.value && String(gmapsCell.value).startsWith('http')) {
      const url = gmapsCell.value;
      gmapsCell.value = { text: '📍 Google Maps', hyperlink: url };
      gmapsCell.font = { color: { argb: 'FF0D6EFD' }, underline: true };
    }
    const existCell = row.getCell(10);
    if (existCell.value && String(existCell.value).startsWith('http')) {
      const url = existCell.value;
      existCell.value = { text: url, hyperlink: url };
      existCell.font = { color: { argb: 'FF0D6EFD' }, underline: true };
    }
  }

  await workbook.xlsx.writeFile(xlsxPath);
  console.log(`Saved: ${xlsxPath}`);
}

convertCsvToExcelTable();
