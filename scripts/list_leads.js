const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'leads', 'leads_lockport_ny_no_website.csv');
const jsonOutPath = path.join(__dirname, '..', 'leads', 'parsed_61_leads.json');

const content = fs.readFileSync(csvPath, 'utf8');
const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);

const parsed = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
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
  
  if (cols.length >= 10) {
    parsed.push({
      id: cols[0],
      name: cols[1],
      category: cols[2],
      address: cols[3],
      phone: cols[4],
      telLink: cols[5],
      rating: cols[6],
      reviewCount: cols[7],
      websiteStatus: cols[8],
      existingUrl: cols[9],
      gmapsUrl: cols[10]
    });
  }
}

fs.writeFileSync(jsonOutPath, JSON.stringify(parsed, null, 2), 'utf8');
console.log(`Saved ${parsed.length} parsed leads to ${jsonOutPath}`);
