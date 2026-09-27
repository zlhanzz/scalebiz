const fs = require('fs');

async function testMatch() {
  const sampleNames = [
    "BLUE CORD PLUMBING",
    "BOCK & WHITMAN",
    "J CAP CONTRACTORS",
    "TOTAL FENCE",
    "DIAMOND CONCRETE",
    "CRISPELL MASONRY",
    "BURKS"
  ];

  for (const name of sampleNames) {
    const clean = encodeURIComponent(name.replace(/[^a-zA-Z0-9 ]/g, ' ').trim());
    const url = `https://data.ny.gov/resource/n9v6-gdp6.json?$where=upper(current_entity_name)+like+%27%25${clean}%25%27+and+county=%27Erie%27&$limit=3`;
    console.log(`\nChecking: ${name}`);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(`Found ${data.length} matches:`);
      data.forEach(d => {
        console.log(` -> Entity: ${d.current_entity_name}`);
        console.log(`    Contact/Agent: ${d.dos_process_name}`);
        console.log(`    Address: ${d.dos_process_address_1}, ${d.dos_process_city} ${d.dos_process_zip}`);
        console.log(`    Filing Date: ${d.initial_dos_filing_date}`);
      });
    } catch (e) {
      console.error(e.message);
    }
  }
}

testMatch();
