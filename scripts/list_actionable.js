const fs = require('fs');
const leads = JSON.parse(fs.readFileSync('./leads/leads_lockport_ny_enriched.json', 'utf8'));

const actionable = leads.filter(l => 
  (l.messengerLink && l.messengerLink !== '-') || 
  (l.instagramUrl && l.instagramUrl !== '-') || 
  (l.emailDetected && l.emailDetected !== '-')
);

console.log(`Total actionable leads with DM/Email: ${actionable.length}\n`);
actionable.forEach((l, i) => {
  console.log(`[${i+1}] ${l.name}`);
  console.log(`    Category : ${l.category}`);
  console.log(`    Owner    : ${l.ownerName}`);
  console.log(`    Channel  : ${l.primaryDMChannel}`);
  console.log(`    Notes    : ${l.intelligenceNotes}`);
  console.log('----------------------------------------------------');
});
