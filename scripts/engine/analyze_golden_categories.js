const fs = require('fs');
const path = require('path');

const leadsPath = path.join(__dirname, '../../leads/leads_buffalo_ny.json');
const dosMatchesPath = path.join(__dirname, '../../leads/strict_ny_dos_matches.json');

const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
const dosMatches = fs.existsSync(dosMatchesPath) ? JSON.parse(fs.readFileSync(dosMatchesPath, 'utf8')) : {};

console.log(`Loaded ${leads.length} total leads.`);
console.log(`Loaded ${Object.keys(dosMatches).length} strict NY DOS corporate matches.`);

// Let's inspect the categories of Golden Leads
const goldenLeads = leads.filter(l => l.isGoldenLead || (l.websiteStatus && l.websiteStatus.includes('GOLDEN')));
console.log(`Total Golden Leads: ${goldenLeads.length}`);

const categoryCounts = {};
goldenLeads.forEach(l => {
  categoryCounts[l.category] = (categoryCounts[l.category] || 0) + 1;
});

console.log('\nGolden Leads by Category:');
Object.entries(categoryCounts).sort((a,b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(` - ${cat}: ${count}`);
});
