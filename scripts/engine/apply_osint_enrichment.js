const fs = require('fs');
const path = require('path');

const leadsPath = path.join(__dirname, '../../leads/leads_buffalo_ny.json');

const osintDatabase = [
  {
    matchNames: ['House of Masters Grooming Lounge'],
    data: {
      ownerName: 'Sean Don (Master Barber & Founder)',
      facebookUrl: 'https://www.facebook.com/homgroominglounge',
      instagramUrl: 'https://www.instagram.com/seandon_houseofmastersbs',
      socialDmLink: 'https://m.me/homgroominglounge',
      bookingPortal: 'Squire & Walk-in',
      operatingNotes: 'High-end downtown grooming lounge at 846 Main St, Buffalo',
      osintVerified: true
    }
  },
  {
    matchNames: ['Divine Esthetics'],
    data: {
      ownerName: 'Licensed Esthetics Team',
      facebookUrl: 'https://www.facebook.com/DivineEstheticsBuffalo',
      instagramUrl: 'https://linktr.ee/DivineEsthetics',
      socialDmLink: 'https://m.me/DivineEstheticsBuffalo',
      bookingPortal: 'GlossGenius (divineestheticsbflo.glossgenius.com)',
      operatingNotes: 'Boutique studio at 111 Elmwood Ave; facials, lashes, brow lamination',
      osintVerified: true
    }
  },
  {
    matchNames: ["EJ's Lash Studio WNY", "EJ's Lash Studio"],
    data: {
      ownerName: 'Evelyn Mora (Lash Technician & Founder)',
      instagramUrl: 'https://linktr.ee/ejlashandbeauty2',
      socialDmLink: 'https://linktr.ee/ejlashandbeauty2',
      bookingPortal: 'Fresha & Linktree',
      operatingNotes: 'Specialized eyelash extensions and beauty studio since 2018',
      osintVerified: true
    }
  },
  {
    matchNames: ['The Barbers Factory'],
    data: {
      ownerName: 'Barbers Factory Team',
      facebookUrl: 'https://www.facebook.com/TheBarbersFactoryBuffalo',
      socialDmLink: 'https://m.me/TheBarbersFactoryBuffalo',
      bookingPortal: 'Square Appointments',
      operatingNotes: 'Active community barbershop at 941 Tonawanda St, Buffalo',
      osintVerified: true
    }
  },
  {
    matchNames: ['Inktellectual Tattoo'],
    data: {
      ownerName: 'Mikey Hollywould & Artist Collective',
      facebookUrl: 'https://www.facebook.com/inktellectualtattoos',
      socialDmLink: 'https://m.me/inktellectualtattoos',
      bookingPortal: 'Facebook DM & Phone',
      operatingNotes: 'Established tattoo studio at 408 Amherst St, Buffalo',
      osintVerified: true
    }
  },
  {
    matchNames: ['Lucky Leaf Tattoo'],
    data: {
      ownerName: 'Din Tran (Founder & Head Artist)',
      facebookUrl: 'https://www.facebook.com/luckyleaftattoo',
      instagramUrl: 'https://www.instagram.com/luckyleaftattoo',
      socialDmLink: 'https://ig.me/m/luckyleaftattoo',
      bookingPortal: 'Appointment Only / Direct DM',
      operatingNotes: 'Private studio at 1809 Hertel Ave; custom tattoo & piercing',
      osintVerified: true
    }
  },
  {
    matchNames: ['Wishful Inking Tattoos & Piercings', 'Wishful Inking'],
    data: {
      ownerName: 'Wishful Inking Artists',
      facebookUrl: 'https://www.facebook.com/WishfulInking',
      socialDmLink: 'https://m.me/WishfulInking',
      bookingPortal: 'Walk-in & Phone',
      operatingNotes: 'Prominent studio at 581 Niagara Street, Buffalo',
      osintVerified: true
    }
  },
  {
    matchNames: ['Blue Cord Plumbing and HVAC Inc.', 'Blue Cord Plumbing'],
    data: {
      ownerName: 'Garrett Jackson (President)',
      email: 'garrett.a.jackson@gmail.com',
      facebookUrl: 'https://www.facebook.com/bluecordplumbing',
      socialDmLink: 'https://m.me/bluecordplumbing',
      bookingPortal: 'Direct Phone & Email',
      operatingNotes: 'Service-Disabled Veteran-Owned Business (SDVOB); Tesla & Bills Stadium contractor',
      osintVerified: true
    }
  },
  {
    matchNames: ["Larry & Janine's Plumbing & Repairs, Inc.", "Larry & Janine's Plumbing"],
    data: {
      ownerName: 'Larry & Janine Filippone',
      facebookUrl: 'https://www.facebook.com/larrytheplumber4u',
      socialDmLink: 'https://m.me/larrytheplumber4u',
      bookingPortal: 'Call or Text (Appointment Only)',
      operatingNotes: 'Incorporated 2004; West Seneca & Greater Buffalo residential plumbing',
      osintVerified: true
    }
  },
  {
    matchNames: ['J Cap Contractors LLC'],
    data: {
      ownerName: 'Joseph Capaccio',
      bookingPortal: 'Direct Phone',
      operatingNotes: 'GAF Certified Roofing Contractor at 2004 Sweet Home Rd, Amherst/Buffalo',
      osintVerified: true
    }
  },
  {
    matchNames: ['Diamond Concrete WNY', 'Diamond Concrete WNY Inc.'],
    data: {
      ownerName: 'Joshua L. Knapczyk (Justin Fetes, Supervisor)',
      bookingPortal: 'Direct Phone',
      operatingNotes: 'Decorative concrete contractor (stamped, stained, aggregate)',
      osintVerified: true
    }
  },
  {
    matchNames: ['Crispell Masonry Restoration', 'Crispell Masonry'],
    data: {
      ownerName: 'Crispell Masonry Team',
      instagramUrl: 'https://www.instagram.com/crispellmasonry',
      socialDmLink: 'https://ig.me/m/crispellmasonry',
      bookingPortal: 'Instagram DM & Phone',
      operatingNotes: 'Historic and residential masonry restoration across Buffalo',
      osintVerified: true
    }
  },
  {
    matchNames: ['KAT Masonry Construction', 'KAT Masonry Construction Inc.'],
    data: {
      ownerName: 'Dave',
      bookingPortal: 'Direct Phone',
      operatingNotes: 'Brick, stone, foundation drainage & basement waterproofing (Williamsville/Buffalo)',
      osintVerified: true
    }
  },
  {
    matchNames: ['JM Masonry'],
    data: {
      ownerName: 'Joseph B. McCormick',
      bookingPortal: 'Direct Phone',
      operatingNotes: 'Residential masonry & foundation repair at 70 Orchard Pl',
      osintVerified: true
    }
  },
  {
    matchNames: ['Bock & Whitman Construction Inc.', 'Bock & Whitman Construction'],
    data: {
      ownerName: 'Joanne Whitman',
      bookingPortal: 'Direct Phone',
      operatingNotes: 'General roofing and residential construction at 532 Norfolk Ave, Buffalo',
      osintVerified: true
    }
  },
  {
    matchNames: ['Done Well Home Improvement'],
    data: {
      ownerName: 'Rick & Sean',
      bookingPortal: 'Direct Phone',
      operatingNotes: 'Contractor and home improvement at 1121 Seneca St, Buffalo',
      osintVerified: true
    }
  },
  {
    matchNames: ['Paul E Vogel Plumbing & Heating Inc', 'Paul E Vogel Plumbing'],
    data: {
      ownerName: 'Barbara M. Vogel',
      bookingPortal: 'Direct Phone',
      operatingNotes: 'Established in 1944 (82 years continuous operation in South Buffalo)',
      osintVerified: true
    }
  },
  {
    matchNames: ['Total Fence of WNY', 'Total Fence of WNY Inc'],
    data: {
      ownerName: 'Total Fence Management',
      facebookUrl: 'https://www.facebook.com/TotalFenceOfficial',
      socialDmLink: 'https://m.me/TotalFenceOfficial',
      bookingPortal: 'Facebook Messenger & Phone',
      operatingNotes: 'Residential and commercial fencing contractor',
      osintVerified: true
    }
  },
  {
    matchNames: ['Salon Of Essence'],
    data: {
      ownerName: 'Elizabeth Dugan & Essence Team',
      facebookUrl: 'https://www.facebook.com/elizabethduganhairstylistandmakeupartist',
      instagramUrl: 'https://www.instagram.com/essencesalonandspa',
      socialDmLink: 'https://ig.me/m/essencesalonandspa',
      bookingPortal: 'Instagram & Facebook DM',
      operatingNotes: 'Full-service salon and spa styling in Buffalo',
      osintVerified: true
    }
  },
  {
    matchNames: ['Anthony Paul Salon'],
    data: {
      ownerName: 'Anthony Paul & Styling Staff',
      email: 'anthonypaulsalon@aol.com',
      facebookUrl: 'https://www.facebook.com/AnthonyPaulSalonBuffalo',
      socialDmLink: 'https://m.me/AnthonyPaulSalonBuffalo',
      bookingPortal: 'Direct Phone & Facebook DM',
      operatingNotes: 'Prominent salon at 1643 Hertel Ave, Buffalo',
      osintVerified: true
    }
  },
  {
    matchNames: ['Kallista For Hair'],
    data: {
      ownerName: 'Kallista Styling Collective',
      facebookUrl: 'https://www.facebook.com/kallistaforthehair',
      socialDmLink: 'https://m.me/kallistaforthehair',
      bookingPortal: 'Direct Phone & Facebook DM',
      operatingNotes: 'Elmwood Village hair salon at 721 Elmwood Ave',
      osintVerified: true
    }
  },
  {
    matchNames: ['Salina Paris Salon and Barbershop', 'Salina Paris Salon'],
    data: {
      ownerName: 'Salina Paris Management',
      bookingPortal: 'Fresha & Phone',
      operatingNotes: 'Neighborhood salon & barbershop at 1569 Hertel Ave',
      osintVerified: true
    }
  },
  {
    matchNames: ['Ace Of Fades barbershop', 'Ace Of Fades'],
    data: {
      ownerName: 'Ace Of Fades Barbers',
      bookingPortal: 'Booksy & Fresha',
      operatingNotes: 'Active modern fades shop at 1807 South Park Ave',
      osintVerified: true
    }
  },
  {
    matchNames: ['88 South Barbershop'],
    data: {
      ownerName: '88 South Barbers',
      bookingPortal: 'Booksy & Fresha',
      operatingNotes: 'Barbershop at 219 Orchard Park Rd, West Seneca',
      osintVerified: true
    }
  },
  {
    matchNames: ['Str8 Fad3d Cut N Shave'],
    data: {
      ownerName: 'Str8 Fad3d Barbers',
      bookingPortal: 'Fresha & Square',
      operatingNotes: 'Barbershop at 920 Niagara Falls Blvd, Buffalo',
      osintVerified: true
    }
  },
  {
    matchNames: ['North Studio Nail Salon'],
    data: {
      ownerName: 'North Studio Technicians',
      bookingPortal: 'Fresha',
      operatingNotes: 'Hertel Ave nail salon specializing in acrylics (1366 Hertel Ave)',
      osintVerified: true
    }
  },
  {
    matchNames: ['LOVEJOY NATURAL HAIR SALON'],
    data: {
      ownerName: 'Lovejoy Braiding & Natural Hair Specialists',
      bookingPortal: 'Direct Phone',
      operatingNotes: 'Natural hair care, locs and braiding at 1080 E Lovejoy St',
      osintVerified: true
    }
  }
];

function applyEnrichment() {
  console.log('📖 Loading leads database from:', leadsPath);
  const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
  let enrichedCount = 0;

  leads.forEach(lead => {
    // Check if lead matches any item in osintDatabase
    const match = osintDatabase.find(item => {
      return item.matchNames.some(name => {
        return lead.name.toLowerCase().trim() === name.toLowerCase().trim() ||
               lead.name.toLowerCase().includes(name.toLowerCase());
      });
    });

    if (match) {
      Object.assign(lead, match.data);
      enrichedCount++;
      console.log(`✅ [ENRICHED] ${lead.name} -> Owner: ${match.data.ownerName || '-'} | DM: ${match.data.socialDmLink || '-'}`);
    } else {
      // Defaults for leads without enriched data
      lead.ownerName = lead.ownerName || '-';
      lead.facebookUrl = lead.facebookUrl || '-';
      lead.instagramUrl = lead.instagramUrl || '-';
      lead.email = lead.email || '-';
      lead.socialDmLink = lead.socialDmLink || '-';
      lead.bookingPortal = lead.bookingPortal || '-';
      lead.operatingNotes = lead.operatingNotes || '-';
      lead.osintVerified = lead.osintVerified || false;
    }
  });

  fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2), 'utf8');
  console.log(`\n🎉 SUKSES! ${enrichedCount} Prospek Emas berhasil diperkaya dengan data OSINT (Owner, FB, IG, DM, Email, Notes)!`);
}

applyEnrichment();
