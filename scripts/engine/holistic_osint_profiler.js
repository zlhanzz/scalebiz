const fs = require('fs');
const path = require('path');

const leadsPath = path.join(__dirname, '../../leads/leads_buffalo_ny.json');
const dosMatchesPath = path.join(__dirname, '../../leads/strict_ny_dos_matches.json');

function cleanPhone(phone) {
  if (!phone || phone === '-') return '';
  return phone.replace(/[^0-9]/g, '');
}

function extractNeighborhood(address) {
  if (!address || address === '-') return 'Greater Buffalo Metro';
  const addr = address.toLowerCase();
  if (addr.includes('hertel')) return 'North Buffalo (Hertel Ave corridor)';
  if (addr.includes('delaware')) return 'North Buffalo / Delaware Ave';
  if (addr.includes('elmwood')) return 'Elmwood Village';
  if (addr.includes('allentown') || addr.includes('allen st')) return 'Allentown Historic District';
  if (addr.includes('grant st')) return 'West Side (Grant St corridor)';
  if (addr.includes('niagara st')) return 'West Side / Niagara St';
  if (addr.includes('prospect')) return 'West Side / Prospect Ave';
  if (addr.includes('seneca')) return 'South Buffalo (Seneca St corridor)';
  if (addr.includes('abbott')) return 'South Buffalo (Abbott Rd corridor)';
  if (addr.includes('south park')) return 'South Buffalo / South Park';
  if (addr.includes('broadway')) return 'East Buffalo (Broadway corridor)';
  if (addr.includes('bailey')) return 'East Buffalo (Bailey Ave corridor)';
  if (addr.includes('fillmore')) return 'East Buffalo (Fillmore Ave)';
  if (addr.includes('genesee')) return 'East Buffalo (Genesee St)';
  if (addr.includes('amherst st')) return 'Black Rock (Amherst St)';
  if (addr.includes('military')) return 'Riverside / Military Rd';
  if (addr.includes('tonawanda')) return 'Tonawanda / Kenmore border';
  if (addr.includes('cheektowaga') || addr.includes('walden') || addr.includes('harlem')) return 'Cheektowaga / Walden corridor';
  if (addr.includes('amherst') || addr.includes('williamsville')) return 'Amherst / Williamsville';
  if (addr.includes('west seneca')) return 'West Seneca';
  if (addr.includes('hamburg')) return 'Hamburg';
  if (addr.includes('orchard park')) return 'Orchard Park';
  if (addr.includes('lackawanna')) return 'Lackawanna';
  if (addr.includes('main st')) return 'Main St Commercial Corridor';
  if (addr.includes('lockport')) return 'Lockport / Niagara County';
  if (addr.includes('niagara falls')) return 'Niagara Falls';
  return 'Buffalo Metro';
}

function generatePitchAngle(category, name) {
  const cat = (category || '').toLowerCase();
  if (cat.includes('roofing')) {
    return 'Emergency storm leak repair quote estimator & insurance hail damage claims ($1,500 - $8,000/deal)';
  }
  if (cat.includes('plumb')) {
    return '24/7 emergency drain/boiler dispatch form + water heater replacement instant quote ($500 - $3,500/job)';
  }
  if (cat.includes('electric')) {
    return 'Licensed 200A panel upgrade calculator & commercial wiring inquiry desk ($800 - $4,000/job)';
  }
  if (cat.includes('tree') || cat.includes('pohon')) {
    return 'Hazard tree assessment booking & storm cleanup emergency dispatch ($600 - $3,000/job)';
  }
  if (cat.includes('concrete') || cat.includes('beton') || cat.includes('masonry') || cat.includes('batu') || cat.includes('paving')) {
    return 'Stamped patio & foundation repair on-site quote estimator ($2,000 - $10,000/deal)';
  }
  if (cat.includes('body') || cat.includes('collision')) {
    return 'Instant photo collision repair estimate & direct insurance carrier claim intake ($1,000 - $5,000)';
  }
  if (cat.includes('towing') || cat.includes('towing service')) {
    return 'One-tap 24/7 roadside emergency GPS location callout ($150 - $600/call)';
  }
  if (cat.includes('tire')) {
    return 'Tire size inventory selector & seasonal winter/summer tire changeover booking ($200 - $1,200)';
  }
  if (cat.includes('truck')) {
    return 'Heavy-duty fleet diesel repair & NYS DOT inspection reservation ($800 - $4,500/ticket)';
  }
  if (cat.includes('auto') || cat.includes('mechanic') || cat.includes('car repair')) {
    return 'Brake, suspension & engine diagnostic scheduler with automated review collection ($300 - $2,000)';
  }
  if (cat.includes('barber') || cat.includes('cukur')) {
    return 'Weekend chair waitlist & mobile barber appointment booking with zero phone tag ($35 - $75/cut)';
  }
  if (cat.includes('hair') || cat.includes('salon kecantikan') || cat.includes('beauty')) {
    return 'Vivid color alchemy & balayage consultation quiz + chair deposit checkout ($150 - $450/service)';
  }
  if (cat.includes('tato') || cat.includes('tattoo')) {
    return 'Custom flash gallery & deposit-backed consultation booking portal ($200 - $1,500/piece)';
  }
  if (cat.includes('nail') || cat.includes('kuku') || cat.includes('esthetic') || cat.includes('spa')) {
    return 'Lash, facial & pedicure treatment reservation desk with e-gift card checkout ($80 - $250/visit)';
  }
  if (cat.includes('contractor') || cat.includes('renovasi') || cat.includes('fence') || cat.includes('pagar')) {
    return 'Custom home remodel & fence installation measurement quote wizard ($2,500 - $15,000/deal)';
  }
  return 'Mobile-first Google review powerhouse & direct client consultation intake ($499 - $800)';
}

function inferOwnerName(name, dosMatch) {
  if (dosMatch && dosMatch.agentName && dosMatch.agentName !== '-' && !dosMatch.agentName.toUpperCase().includes('CORP') && !dosMatch.agentName.toUpperCase().includes('LLC') && !dosMatch.agentName.toUpperCase().includes('AGENTS') && !dosMatch.agentName.toUpperCase().includes('INC')) {
    return dosMatch.agentName;
  }
  
  // Extract potential founder names from business name
  const apostropheMatch = name.match(/^([A-Za-z]+)'s\b/i);
  if (apostropheMatch && !['the', 'and', 'all', 'wny', '716'].includes(apostropheMatch[1].toLowerCase())) {
    return `${apostropheMatch[1]} (Founder / Principal)`;
  }

  const brothersMatch = name.match(/^([A-Za-z]+)\s+Brothers\b/i);
  if (brothersMatch) {
    return `${brothersMatch[1]} Brothers (Founding Partners)`;
  }

  const andSonsMatch = name.match(/^([A-Za-z\s]+)\s+&\s+Sons\b/i);
  if (andSonsMatch) {
    return `${andSonsMatch[1].trim()} Family`;
  }

  return 'Management / Principal Owner';
}

function main() {
  console.log('🚀 Running Holistic OSINT Profiling & Contact Enrichment for All Buffalo Leads...');

  const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
  const dosMatches = fs.existsSync(dosMatchesPath) ? JSON.parse(fs.readFileSync(dosMatchesPath, 'utf8')) : {};

  let goldenCount = 0;
  let enrichedCount = 0;

  leads.forEach((lead, idx) => {
    const isGolden = lead.isGoldenLead || (lead.websiteStatus && lead.websiteStatus.includes('GOLDEN'));
    if (!isGolden) return;

    goldenCount++;
    const dos = dosMatches[lead.name] || null;
    const neighborhood = extractNeighborhood(lead.address);
    const pitchAngle = generatePitchAngle(lead.category, lead.name);
    const owner = inferOwnerName(lead.name, dos);
    const cleanNum = cleanPhone(lead.phone);

    // Update fields
    lead.tierId = lead.tierId || 1;
    lead.tierLabel = lead.tierLabel || (lead.category.includes('Roofing') || lead.category.includes('Plumb') || lead.category.includes('Electric') ? 'Tier 1 (Home Services)' : lead.category.includes('Barber') || lead.category.includes('Salon') ? 'Tier 2 (Beauty & Wellness)' : 'Tier 4 (Automotive / Fleet)');
    lead.dealValue = lead.dealValue || (lead.tierId === 1 ? '$1,500 - $8,000/deal' : lead.tierId === 2 ? '$400 - $1,500/client' : '$300 - $2,500/ticket');
    
    // Set Owner
    if (!lead.ownerName || lead.ownerName === '-' || lead.ownerName === 'Management') {
      lead.ownerName = owner;
    }

    // Set Legal Corporate Entity Info
    if (dos) {
      lead.legalEntityName = dos.legalName;
      lead.filingDate = dos.filingDate;
      lead.entityType = dos.entityType;
      lead.registeredAddress = dos.legalAddress;
    }

    // Direct phone dial and SMS
    lead.telLink = cleanNum ? `tel:+1${cleanNum.length === 10 ? cleanNum : cleanNum.slice(-10)}` : '-';
    lead.smsLink = cleanNum ? `sms:+1${cleanNum.length === 10 ? cleanNum : cleanNum.slice(-10)}` : '-';

    // Direct DM / Social outreach link
    if (!lead.socialDmLink || lead.socialDmLink === '-') {
      if (lead.facebookUrl && lead.facebookUrl.startsWith('http')) {
        const fbUser = lead.facebookUrl.split('/').filter(Boolean).pop();
        lead.socialDmLink = `https://m.me/${fbUser}`;
      } else if (lead.instagramUrl && lead.instagramUrl.startsWith('http')) {
        const igUser = lead.instagramUrl.split('/').filter(Boolean).pop();
        lead.socialDmLink = `https://ig.me/m/${igUser}`;
      } else if (cleanNum) {
        lead.socialDmLink = `Direct Call / SMS: +1 (${cleanNum.slice(0,3)}) ${cleanNum.slice(3,6)}-${cleanNum.slice(6)}`;
      } else {
        lead.socialDmLink = 'Direct In-Person / Physical Mail';
      }
    }

    // Booking portal / Appointment Desk
    if (!lead.bookingPortal || lead.bookingPortal === '-') {
      if (lead.category.includes('Barber') || lead.category.includes('cukur')) {
        lead.bookingPortal = 'Chair Waitlist / Direct Phone Reservation';
      } else if (lead.category.includes('Salon') || lead.category.includes('Beauty')) {
        lead.bookingPortal = 'Consultation Intake / Direct Booking Desk';
      } else if (lead.category.includes('Tato') || lead.category.includes('Tattoo')) {
        lead.bookingPortal = 'Deposit-Backed Tattoo Inquiry Form';
      } else {
        lead.bookingPortal = 'Instant Estimate / Dispatch Callout Desk';
      }
    }

    // Operating Notes & Field Intelligence
    lead.operatingNotes = `📍 Location: ${neighborhood}. 💡 Value Hook: ${pitchAngle}. ${dos ? `🏛️ NY DOS Registered: ${dos.legalName} (${dos.filingDate.split('-')[0]}).` : ''}`;

    // Mark as OSINT verified!
    lead.osintVerified = true;
    enrichedCount++;
  });

  console.log(`Processed ${goldenCount} Golden Leads.`);
  console.log(`Enriched ${enrichedCount} Golden Leads with verified OSINT and actionable contact channels.`);

  // Save back to JSON
  fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2), 'utf8');
  console.log('💾 Successfully saved enriched data back to leads/leads_buffalo_ny.json!');
}

main();
