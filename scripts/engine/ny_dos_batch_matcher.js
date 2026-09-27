const fs = require('fs');
const path = require('path');

const leadsPath = path.join(__dirname, '../../leads/leads_buffalo_ny.json');

async function cleanCompanyName(name) {
  return name
    .replace(/\b(Inc|LLC|Ltd|Co|Corp|Corporation|Company)\b\.?/gi, '')
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

async function queryNYDOS(searchTerm) {
  try {
    const encoded = encodeURIComponent(searchTerm.toUpperCase());
    // Query NY State Active Corporations
    const url = `https://data.ny.gov/resource/n9v6-gdp6.json?$where=upper(current_entity_name)+like+%27%25${encoded}%25%27&$limit=3`;
    const res = await fetch(url);
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
}

async function runBatchMatcher() {
  console.log('🏛️ Starting NY State Department of State Batch Matcher for Buffalo Leads...');
  const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
  const goldenLeads = leads.filter(l => l.isGoldenLead || (l.websiteStatus && l.websiteStatus.includes('GOLDEN')));

  console.log(`Found ${goldenLeads.length} Golden Leads to query against NY DOS.`);

  let matchedCount = 0;
  const matchResults = [];

  for (let i = 0; i < goldenLeads.length; i++) {
    const lead = goldenLeads[i];
    const cleaned = await cleanCompanyName(lead.name);
    const words = cleaned.split(' ').filter(w => w.length > 2);
    if (words.length === 0) continue;

    // Search with top 2 significant words
    const queryTerm = words.slice(0, 2).join(' ');
    const results = await queryNYDOS(queryTerm);

    if (results && results.length > 0) {
      // Find best match in Erie/Niagara or with matching address
      const erieMatch = results.find(r => 
        (r.county && ['Erie', 'Niagara'].includes(r.county)) ||
        (r.dos_process_city && ['BUFFALO', 'CHEEKTOWAGA', 'AMHERST', 'WEST SENECA', 'LACKAWANNA', 'TONAWANDA'].includes(r.dos_process_city.toUpperCase()))
      ) || results[0];

      if (erieMatch) {
        matchedCount++;
        const matchData = {
          leadName: lead.name,
          category: lead.category,
          address: lead.address,
          legalName: erieMatch.current_entity_name,
          agentName: erieMatch.dos_process_name,
          legalAddress: `${erieMatch.dos_process_address_1 || ''}, ${erieMatch.dos_process_city || ''} ${erieMatch.dos_process_zip || ''}`.trim(),
          filingDate: erieMatch.initial_dos_filing_date ? erieMatch.initial_dos_filing_date.split('T')[0] : '-',
          county: erieMatch.county || '-',
          entityType: erieMatch.entity_type || '-'
        };
        matchResults.push(matchData);
        console.log(`[${matchedCount}] MATCH: "${lead.name}" -> Legal: ${erieMatch.current_entity_name} | Contact: ${erieMatch.dos_process_name} | City: ${erieMatch.dos_process_city}`);
      }
    }

    // Gentle delay to respect API rate limits
    if (i % 10 === 0) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  console.log(`\n==============================================`);
  console.log(`✅ NY DOS Matching Completed!`);
  console.log(`Total Leads Queried: ${goldenLeads.length}`);
  console.log(`Total Legal Corporate Matches: ${matchedCount}`);

  fs.writeFileSync(
    path.join(__dirname, '../../leads/ny_dos_matched_leads.json'),
    JSON.stringify(matchResults, null, 2),
    'utf8'
  );
  console.log(`Saved matched results to leads/ny_dos_matched_leads.json`);
}

runBatchMatcher();
