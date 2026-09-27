const fs = require('fs');
const path = require('path');

const leadsPath = path.join(__dirname, '../../leads/leads_buffalo_ny.json');

const WNY_COUNTIES = ['ERIE', 'NIAGARA', 'GENESEE', 'WYOMING', 'ORLEANS', 'CHAUTAUQUA', 'CATTARAUGUS'];
const WNY_CITIES = [
  'BUFFALO', 'CHEEKTOWAGA', 'AMHERST', 'TONAWANDA', 'WEST SENECA',
  'LACKAWANNA', 'DEPEW', 'LANCASTER', 'HAMBURG', 'ORCHARD PARK',
  'LOCKPORT', 'NIAGARA FALLS', 'KENMORE', 'CLARENCE', 'WILLIAMSVILLE',
  'EAST AMHERST', 'NORTH TONAWANDA', 'GRAND ISLAND', 'ALDEN', 'AKRON',
  'BLASDELL', 'EAST AURORA', 'SPRINGVILLE', 'ELMA', 'GETZVILLE'
];

function cleanBusinessName(name) {
  return name
    .replace(/\b(Inc|LLC|Ltd|Co|Corp|Corporation|Company|Plc|Group|Services?|Service)\b\.?/gi, '')
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

async function queryNYDOS(queryTerm) {
  try {
    const encoded = encodeURIComponent(queryTerm.toUpperCase());
    const url = `https://data.ny.gov/resource/n9v6-gdp6.json?$where=upper(current_entity_name)+like+%27%25${encoded}%25%27&$limit=10`;
    const res = await fetch(url);
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
}

async function main() {
  console.log('🏛️ Running Strict WNY NY-DOS Corporate Matcher...');
  const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
  const goldenLeads = leads.filter(l => l.isGoldenLead || (l.websiteStatus && l.websiteStatus.includes('GOLDEN')));

  console.log(`Processing ${goldenLeads.length} Golden Leads...`);
  const dosMatches = {};

  for (let i = 0; i < goldenLeads.length; i++) {
    const lead = goldenLeads[i];
    const cleaned = cleanBusinessName(lead.name);
    const words = cleaned.split(' ').filter(w => w.length > 2 && !['THE', 'AND', 'FOR', 'NEW', 'ALL'].includes(w.toUpperCase()));
    
    if (words.length === 0) continue;

    // Try first 2 words, or first word if distinctive
    const term = words.slice(0, Math.min(2, words.length)).join(' ');
    const results = await queryNYDOS(term);

    // Look for strict WNY match
    const validMatches = results.filter(r => {
      const county = (r.county || '').toUpperCase();
      const city = (r.dos_process_city || '').toUpperCase();
      const isWNY = WNY_COUNTIES.includes(county) || WNY_CITIES.some(c => city.includes(c));
      return isWNY;
    });

    if (validMatches.length > 0) {
      // Find the one closest to business name
      const best = validMatches.find(m => {
        const entName = (m.current_entity_name || '').toUpperCase();
        return words.every(w => entName.includes(w.toUpperCase()));
      }) || validMatches[0];

      dosMatches[lead.name] = {
        legalName: best.current_entity_name,
        agentName: best.dos_process_name,
        legalAddress: `${best.dos_process_address_1 || ''}, ${best.dos_process_city || ''} ${best.dos_process_zip || ''}`.trim(),
        filingDate: best.initial_dos_filing_date ? best.initial_dos_filing_date.split('T')[0] : '-',
        entityType: best.entity_type || '-',
        county: best.county || 'Erie'
      };
      console.log(`✅ [${Object.keys(dosMatches).length}] MATCH: "${lead.name}" -> ${best.current_entity_name} (${best.dos_process_name}, ${best.dos_process_city})`);
    }

    if (i % 15 === 0) {
      await new Promise(r => setTimeout(r, 150));
    }
  }

  console.log(`\n🎉 Strict WNY Matching complete! Total verified corporate matches: ${Object.keys(dosMatches).length}`);
  fs.writeFileSync(
    path.join(__dirname, '../../leads/strict_ny_dos_matches.json'),
    JSON.stringify(dosMatches, null, 2),
    'utf8'
  );
}

main();
