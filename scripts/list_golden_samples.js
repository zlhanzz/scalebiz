const fs = require('fs');
const leads = JSON.parse(fs.readFileSync('leads/leads_buffalo_ny.json', 'utf8'));
const golden = leads.filter(l => l.isGoldenLead || (l.websiteStatus && l.websiteStatus.includes('GOLDEN')));

console.log('Total Golden Leads:', golden.length);

const t1 = golden.filter(l => l.tierId === 1 || l.category.toLowerCase().includes('roof') || l.category.toLowerCase().includes('plumb') || l.category.toLowerCase().includes('electr') || l.category.toLowerCase().includes('contractor') || l.category.toLowerCase().includes('concrete') || l.category.toLowerCase().includes('masonry') || l.category.toLowerCase().includes('tree'));
console.log('\n--- TIER 1 HOME SERVICES (' + t1.length + ' leads) ---');
t1.slice(0, 20).forEach((l, i) => {
  console.log(`${i+1}. [${l.name}] - Cat: ${l.category} | Addr: ${l.address} | Phone: ${l.phone} | Owner: ${l.ownerName || '-'} | FB: ${l.facebookUrl || '-'}`);
});

const t2 = golden.filter(l => l.category && (l.category.toLowerCase().includes('salon') || l.category.toLowerCase().includes('barber') || l.category.toLowerCase().includes('tato') || l.category.toLowerCase().includes('tattoo') || l.category.toLowerCase().includes('spa') || l.category.toLowerCase().includes('beauty') || l.category.toLowerCase().includes('cukur')));
console.log('\n--- TIER 2 BEAUTY & WELLNESS (' + t2.length + ' leads) ---');
t2.slice(0, 20).forEach((l, i) => {
  console.log(`${i+1}. [${l.name}] - Cat: ${l.category} | Addr: ${l.address} | Phone: ${l.phone} | Owner: ${l.ownerName || '-'} | FB: ${l.facebookUrl || '-'}`);
});

const t4 = golden.filter(l => l.category && (l.category.toLowerCase().includes('auto') || l.category.toLowerCase().includes('tire') || l.category.toLowerCase().includes('towing') || l.category.toLowerCase().includes('mechanic') || l.category.toLowerCase().includes('bengkel')));
console.log('\n--- TIER 4 AUTOMOTIVE (' + t4.length + ' leads) ---');
t4.slice(0, 20).forEach((l, i) => {
  console.log(`${i+1}. [${l.name}] - Cat: ${l.category} | Addr: ${l.address} | Phone: ${l.phone} | Owner: ${l.ownerName || '-'} | FB: ${l.facebookUrl || '-'}`);
});
