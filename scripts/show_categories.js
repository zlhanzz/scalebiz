const leads = require('../leads/parsed_61_leads.json');
leads.forEach((l, idx) => {
  console.log(`${idx + 1}. [${l.category}] ${l.name} | ${l.address.split(',')[0]} | ${l.phone}`);
});
