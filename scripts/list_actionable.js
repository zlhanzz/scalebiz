const fs = require('fs');
const path = require('path');

// 1. Lockport Actionable Leads
const lockportPath = path.join(__dirname, '../leads/leads_lockport_ny_enriched.json');
let lockportLeads = [];
if (fs.existsSync(lockportPath)) {
  const raw = JSON.parse(fs.readFileSync(lockportPath, 'utf8'));
  lockportLeads = raw.filter(l => 
    (l.messengerLink && l.messengerLink !== '-') || 
    (l.instagramUrl && l.instagramUrl !== '-') || 
    (l.emailDetected && l.emailDetected !== '-')
  );
}

// 2. Buffalo Actionable Leads
const buffaloPath = path.join(__dirname, '../leads/leads_buffalo_ny.json');
let buffaloLeads = [];
if (fs.existsSync(buffaloPath)) {
  const raw = JSON.parse(fs.readFileSync(buffaloPath, 'utf8'));
  buffaloLeads = raw.filter(l => 
    l.verificationStatus === 'VERIFIED_DIGITAL_ACTIVE' ||
    (l.facebookUrl && l.facebookUrl !== '-') || 
    (l.instagramUrl && l.instagramUrl !== '-') || 
    (l.email && l.email !== '-')
  );
}

console.log('========================================================================');
console.log('👑 SCALEBIZ VIP ACTIONABLE OUTREACH DATABASE (WESTERN NEW YORK)');
console.log('========================================================================');
console.log(`📍 Buffalo, NY  : ${buffaloLeads.length} Prospek Siap Kontak (FB Page / IG / Direct DM / Email)`);
console.log(`📍 Lockport, NY : ${lockportLeads.length} Prospek Siap Kontak (FB Messenger / IG / Email)`);
console.log(`🔥 TOTAL DIGITAL ACTIVE ACTIONABLE TARGETS: ${buffaloLeads.length + lockportLeads.length} BISNIS`);
console.log('========================================================================\n');

console.log('--- [BUFFALO, NY - DIGITAL ACTIVE VIP LEADS] ---');
buffaloLeads.forEach((l, i) => {
  console.log(`[BFLO-${i+1}] ${l.name}`);
  console.log(`    Tier / Niche : ${l.tierLabel || l.category}`);
  console.log(`    Owner        : ${l.ownerName || '-'}`);
  console.log(`    DM / Social  : ${l.socialDmLink || '-'}`);
  console.log(`    Facebook     : ${l.facebookUrl || '-'}`);
  console.log(`    Instagram    : ${l.instagramUrl || '-'}`);
  console.log(`    Email        : ${l.email || '-'}`);
  console.log(`    Direct Dial  : ${l.phone || '-'}`);
  console.log(`    Notes        : ${l.operatingNotes || '-'}`);
  console.log('----------------------------------------------------');
});

console.log('\n--- [LOCKPORT, NY - DIGITAL ACTIVE VIP LEADS] ---');
lockportLeads.forEach((l, i) => {
  console.log(`[LCKP-${i+1}] ${l.name}`);
  console.log(`    Category : ${l.category}`);
  console.log(`    Owner    : ${l.ownerName}`);
  console.log(`    Channel  : ${l.primaryDMChannel || l.messengerLink}`);
  console.log(`    Phone    : ${l.phone || '-'}`);
  console.log(`    Notes    : ${l.intelligenceNotes}`);
  console.log('----------------------------------------------------');
});
