const fs = require('fs');
const path = require('path');

const leadsPath = path.join(__dirname, '../leads/leads_buffalo_ny.json');
const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));

const golden = leads.filter(l => l.isGoldenLead || (l.websiteStatus && l.websiteStatus.includes('GOLDEN')));

console.log('========================================================================');
console.log('🎯 SCALEBIZ OSINT ACTIONABLE INTELLIGENCE - BUFFALO, NY');
console.log('========================================================================\n');

const digitalActive = golden.filter(l => l.verificationStatus === 'VERIFIED_DIGITAL_ACTIVE');
const ghostListings = golden.filter(l => l.verificationStatus === 'GHOST_LEADGEN_SUSPECT');
const offlineTrades = golden.filter(l => l.verificationStatus === 'VERIFIED_OFFLINE_TRADE');

console.log(`📌 SUMMARY:`);
console.log(` - 🟢 Digital Active Direct DM/Socials : ${digitalActive.length} businesses`);
console.log(` - 📞 Verified Offline Brick-and-Mortar: ${offlineTrades.length} businesses`);
console.log(` - 🚫 Ghost / Calo Lead Disaring (Skip): ${ghostListings.length} listings\n`);

console.log('------------------------------------------------------------------------');
console.log('🔥 [BAGIAN 1: PROSPEK SIAP KONTAK LANGSUNG VIA DM / FB / IG]');
console.log('------------------------------------------------------------------------');

digitalActive.forEach((l, i) => {
  console.log(`\n[#${i + 1}] ${l.name}`);
  console.log(`   🏷️  Tier / Industri : ${l.tierLabel || l.category}`);
  console.log(`   👤  Decision Maker  : ${l.ownerName || '-'}`);
  console.log(`   💬  Direct DM Link  : ${l.socialDmLink || '-'}`);
  console.log(`   📘  Facebook Page   : ${l.facebookUrl || '-'}`);
  console.log(`   📸  Instagram / Web : ${l.instagramUrl || '-'}`);
  console.log(`   ✉️  Direct Email    : ${l.email || '-'}`);
  console.log(`   📞  Phone Dial Link : ${l.telLink || l.phone}`);
  console.log(`   📍  Address         : ${l.address}`);
  console.log(`   💡  Notes           : ${l.operatingNotes}`);
});

console.log('\n------------------------------------------------------------------------');
console.log('⚠️ [BAGIAN 2: LISTING BAYANGAN / CALO LEAD GEN YANG HARUS DI-SKIP]');
console.log('------------------------------------------------------------------------');

ghostListings.forEach((l, i) => {
  console.log(`[x] ${l.name} | Phone: ${l.phone} | ${l.operatingNotes}`);
});
