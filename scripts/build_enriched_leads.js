const fs = require('fs');
const path = require('path');

const parsedLeads = require('../leads/parsed_61_leads.json');
const enrichedCsvPath = path.join(__dirname, '..', 'leads', 'leads_lockport_ny_enriched.csv');
const enrichedJsonPath = path.join(__dirname, '..', 'leads', 'leads_lockport_ny_enriched.json');

// Database pengkayaan data (Enrichment Dictionary) berdasarkan hasil investigasi OSINT & Dorking
const ENRICHMENT_DATA = {
  "1": {
    owner: "Ray Brigham & Family",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-433-6613)",
    notes: "Shares address (640-760 Richfield St) with Brigham Construction Supplies. Established local concrete contractor."
  },
  "2": {
    owner: "Glen Miller",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-434-8807)",
    notes: "Founded 1961 by Robert K. Miller. Glen Miller is managing member."
  },
  "3": {
    owner: "Family-Owned (Custom Crews)",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-434-6600)",
    notes: "Operating since 1970. Specialized in fiber optic, copper, and conduit infrastructure."
  },
  "4": {
    owner: "Jason Benedict",
    facebook: "https://www.facebook.com/Benedicts-plumbing-1566681676962642/",
    messenger: "https://m.me/1566681676962642",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Facebook Messenger (m.me/1566681676962642)",
    notes: "Owner Jason Benedict actively communicates on Facebook. Full plumbing and contracting service."
  },
  "5": {
    owner: "Scott L. Walters",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-308-8229)",
    notes: "Drywall contractor located at 256 Chestnut St."
  },
  "6": {
    owner: "Jim & David Sparks",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-589-7566)",
    notes: "High-ticket custom home developers in Lockport since 2002 (James Francis & Clarkview Estates)."
  },
  "7": {
    owner: "Brigham Family",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-439-9078)",
    notes: "Retail construction supplies store affiliated with Ray Brigham Concrete."
  },
  "8": {
    owner: "Clack Family",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-434-7422)",
    notes: "Local drywall contractor on Ridge Rd."
  },
  "9": {
    owner: "Thomas Hildreth",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "https://www.linkedin.com/company/hildreth-electric",
    email: "-",
    channel: "LinkedIn / Phone (+1 716-439-0518)",
    notes: "Founded 1989. Major local electrical contractor, now affiliated with KBW Group."
  },
  "10": {
    owner: "-",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-433-7915)",
    notes: "Ready mix concrete supply yard on Richfield St."
  },
  "11": {
    owner: "Independent Master Electrician",
    facebook: "https://www.facebook.com/search/top/?q=Electrical%20Solutions%20Lockport%20NY",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-513-6830) / Facebook",
    notes: "Accepts digital inquiries via Thumbtack & Facebook."
  },
  "12": {
    owner: "Steve Frazer & John Hollingsworth",
    facebook: "https://www.facebook.com/FHLandServices",
    messenger: "https://m.me/FHLandServices",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Facebook Messenger (m.me/FHLandServices)",
    notes: "Steve Frazer actively posts in Lockport community groups. Direct mobile: (716) 523-8341 / (585) 447-8083."
  },
  "13": {
    owner: "Housing Visions Unlimited (Non-Profit)",
    facebook: "https://www.facebook.com/HousingVisions/",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "https://www.linkedin.com/company/housing-visions",
    email: "info@housingvisions.org",
    channel: "SKIP (Non-Profit Affordable Housing Agency)",
    notes: "Non-profit housing development org based in Syracuse. Not a standard local commercial lead."
  },
  "14": {
    owner: "Powell Family",
    facebook: "https://www.facebook.com/search/top/?q=Powell%27s%20Heating%20Cooling%20Lockport",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-417-6686)",
    notes: "Family-owned HVAC company located on 210 Walnut St, Lockport. BBB accredited."
  },
  "15": {
    owner: "Zach Bohlman",
    facebook: "https://www.facebook.com/search/top/?q=Zach%27s%20Garage%20Door%20Service%20Lockport",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Facebook / Phone (+1 716-438-6805)",
    notes: "Owner Zach Bohlman actively posts customer testimonials in Niagara community groups. Over 118 reviews."
  },
  "16": {
    owner: "Haley Family",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-433-3900)",
    notes: "Independent mechanic shop on 100 Market St."
  },
  "17": {
    owner: "Sunshine Auto LLC Management",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-799-3695)",
    notes: "NAPA Auto Care center at 32 S Niagara St."
  },
  "18": {
    owner: "Tim (Master Mechanic)",
    facebook: "https://www.facebook.com/search/top/?q=Lincoln%20Car%20Care%20Lockport%20NY",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-433-2000) / Facebook",
    notes: "Beloved neighborhood shop. Highly praised for honesty ('Tim & his crew')."
  },
  "19": {
    owner: "Doug",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-439-4483)",
    notes: "Auto body shop at 435 Park Ave (shared automotive bay)."
  },
  "20": {
    owner: "Dan Hunt & Ryan Hunt",
    facebook: "https://www.facebook.com/search/top/?q=Dan%20Hunt%20Automotive%20Lockport",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Direct Cell (Dan: 716-983-7615 / Ryan: 716-280-1788)",
    notes: "GOLDEN LEAD: Direct owner cell phones available. Shop: (716) 434-2333. NYS Inspection station."
  },
  "21": {
    owner: "Austin Herman",
    facebook: "https://www.facebook.com/search/top/?q=Herman%27s%20Auto%20Repair%20Lockport",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-433-7190) / Facebook",
    notes: "Independent repair shop at 169 N Transit St."
  },
  "22": {
    owner: "Independent Operator",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-434-8926)",
    notes: "Auto & truck service in business since 1987 on Ridge Rd."
  },
  "23": {
    owner: "Mel",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-433-8401)",
    notes: "NYS vehicle inspection station and general mechanic on 616 West Ave."
  },
  "24": {
    owner: "Dennis",
    facebook: "https://www.facebook.com/search/top/?q=Davis%20Automotive%20Lockport%20NY",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-210-3342)",
    notes: "In business over 15 years on 6099 Robinson Rd. Owner Dennis praised for customer care."
  },
  "25": {
    owner: "West Ave Auto Operator",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "In-Person Visit (450 West Ave)",
    notes: "Small local repair garage. No public phone listed."
  },
  "26": {
    owner: "Gothard Family (Owner-Operated)",
    facebook: "https://www.facebook.com/search/top/?q=Gothard%20Auto%20Wrecking%20Lockport",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-439-9037)",
    notes: "Emphasizes 'deal directly with an owner' on 7264 Akron Rd."
  },
  "27": {
    owner: "S.H. Auto Management",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-817-4441)",
    notes: "Perfect 5.0 rating on Google Maps with reliable repair services at 205 Washburn St."
  },
  "28": {
    owner: "Kevin",
    facebook: "https://www.facebook.com/profile.php?id=100067071229894",
    messenger: "https://m.me/100067071229894",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Facebook Messenger / Cell (+1 716-570-4452)",
    notes: "Contact Kevin. Truck & auto repair + U-Haul dealer at 5596 Murphy Rd. Shop: (716) 433-5805."
  },
  "29": {
    owner: "Mavis Tires & Brakes (Corporate)",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "SKIP (Corporate Chain Acquired)",
    notes: "Former Cole Muffler now converted into corporate chain Mavis Discount Tire network."
  },
  "30": {
    owner: "Pat",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-251-4275)",
    notes: "Express lube and quick oil change shop at 40 S Niagara St."
  },
  "31": {
    owner: "Frank",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-523-5691)",
    notes: "Independent mechanic at 435 Park Ave."
  },
  "32": {
    owner: "Dahlquist Family",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-434-5286)",
    notes: "Local auto repair shop at 6850 Akron Rd."
  },
  "33": {
    owner: "S&S Fleet Management",
    facebook: "https://www.facebook.com/search/top/?q=S%26S%20Fleet%20Solutions%20Lockport",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-438-3780) / Facebook",
    notes: "Top diesel and commercial fleet repair shop in Niagara County. NAPA Auto Care."
  },
  "34": {
    owner: "Property Listed for Sale",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "SKIP (Building Vacant for Sale)",
    notes: "330 West Ave is currently listed as a vacant auto retail building for sale on LoopNet."
  },
  "35": {
    owner: "Pete (Manager: Vern)",
    facebook: "https://www.facebook.com/search/top/?q=Pete%27s%20Collision%20Lockport%20NY",
    messenger: "-",
    instagram: "-",
    yelp: "https://www.yelp.com/biz/petes-collision-lockport",
    linkedin: "-",
    email: "-",
    channel: "Facebook / Phone (+1 716-434-3572)",
    notes: "4.7 stars on 61 reviews. Vern is highly praised by customers in community groups."
  },
  "36": {
    owner: "Michael Daddeo",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-433-4444)",
    notes: "Owner Michael Daddeo. Independent auto sales and repair on 112 W Genesee St."
  },
  "37": {
    owner: "Comtruck Fleet Management",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-625-8434)",
    notes: "Commercial truck repair facility on 6310 S Transit Rd."
  },
  "38": {
    owner: "JP Madison Management",
    facebook: "https://www.facebook.com/JPMadisonHair",
    messenger: "https://m.me/JPMadisonHair",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Facebook Messenger (m.me/JPMadisonHair)",
    notes: "Active Facebook page 'Jp Madison Hair'. Hair styling & technology at 241 S Transit St."
  },
  "39": {
    owner: "Stylist Evan",
    facebook: "https://www.facebook.com/BlueDoorSalon/",
    messenger: "https://m.me/BlueDoorSalon",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Facebook Messenger (m.me/BlueDoorSalon)",
    notes: "Active salon page on Davison Rd. Stylist Evan highlighted in community."
  },
  "40": {
    owner: "Amanda Gorko",
    facebook: "https://www.facebook.com/search/top/?q=Mia%20Bella%E2%80%99s%20Hair%20Salon%20Lockport",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-395-6352) / Facebook",
    notes: "GOLDEN LEAD: Owner Amanda Gorko verified via Lockport City official records. 329 East Ave."
  },
  "41": {
    owner: "Salon Life Management",
    facebook: "https://www.facebook.com/search/top/?q=Salon%20Life%20716%20Lockport",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Facebook Page Message",
    notes: "Salon suite located at 80 Main St Ste B, Lockport."
  },
  "42": {
    owner: "Lisa Lewandowski",
    facebook: "https://www.facebook.com/search/top/?q=Hairs%20To%20You%20Lockport%20NY",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-434-9385) / Facebook",
    notes: "GOLDEN LEAD: Owner Lisa Lewandowski confirmed. Located on 5679 S Transit Rd next to UPS store."
  },
  "43": {
    owner: "Capelli Management",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-433-3898)",
    notes: "Independent salon at 411 West Ave."
  },
  "44": {
    owner: "Hayley Baes",
    facebook: "https://www.facebook.com/TrulyOrganicHairStudio",
    messenger: "https://m.me/TrulyOrganicHairStudio",
    instagram: "https://www.instagram.com/explore/tags/trulyorganichairstudio/",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Facebook Messenger / GlossGenius",
    notes: "GOLDEN LEAD: Stylist/Owner Hayley Baes. Direct cell: (716) 638-7715. Eco-friendly organic hair studio."
  },
  "45": {
    owner: "The Glossary Hair Team",
    facebook: "https://www.facebook.com/search/top/?q=The%20Glossary%20Hair%20%26%20Co.",
    messenger: "-",
    instagram: "https://www.instagram.com/the.glossary.hair.co/",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Instagram DM (@the.glossary.hair.co)",
    notes: "GOLDEN LEAD: Active official Instagram (@the.glossary.hair.co) specializing in blonding & dimensional color."
  },
  "46": {
    owner: "Bob",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-434-5650)",
    notes: "Traditional local barber shop on 368 East Ave. Sponsor of youth sports."
  },
  "47": {
    owner: "Sanitary Barber Team",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-433-3475)",
    notes: "Neighborhood barber on 151 West Ave."
  },
  "48": {
    owner: "Sandy",
    facebook: "https://www.facebook.com/groups/299683311179009/posts/927755658371768/",
    messenger: "-",
    instagram: "-",
    yelp: "https://www.yelp.com/biz/sandys-barber-stylist-for-men-lockport",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-434-3333) / Yelp",
    notes: "GOLDEN LEAD: Over 50 years in business! Traditional appointment-only cuts on 241 S Transit St."
  },
  "49": {
    owner: "Sullivan Family",
    facebook: "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "SKIP (Indicated Closed in Community)",
    notes: "Indicated closed in recent local community discussions."
  },
  "50": {
    owner: "DiPaolo Family",
    facebook: "https://www.facebook.com/pg/DiPaolos-Barber-shop-308188411609/",
    messenger: "https://m.me/DiPaolos-Barber-shop-308188411609",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Facebook Messenger (m.me/DiPaolos-Barber-shop...)",
    notes: "GOLDEN LEAD: 5.0 rating on Google Maps. Active page on Facebook."
  },
  "51": {
    owner: "Bea & Hai",
    facebook: "https://www.facebook.com/people/Trendy-Nail-Spa-Lockport-NY/100083194757081/",
    messenger: "https://m.me/100083194757081",
    instagram: "-",
    yelp: "https://www.yelp.com/biz/trendy-nail-spa-lockport-2",
    linkedin: "-",
    email: "-",
    channel: "Facebook Messenger (m.me/100083194757081)",
    notes: "GOLDEN LEAD: Owners Bea & husband Hai. 1.1K FB followers. Explicitly requests clients to message on FB!"
  },
  "52": {
    owner: "Danny Do",
    facebook: "https://www.facebook.com/danny.do.7798",
    messenger: "https://m.me/danny.do.7798",
    instagram: "https://www.instagram.com/evolutionnailsspanewyork/",
    yelp: "https://www.yelp.com/biz/evolution-nails-spa-lockport",
    linkedin: "-",
    email: "-",
    channel: "Facebook Messenger / Instagram DM",
    notes: "GOLDEN LEAD: Owner Danny Do. Active IG (@evolutionnailsspanewyork) & Facebook profile."
  },
  "53": {
    owner: "Glow Beauty Management",
    facebook: "https://www.facebook.com/search/top/?q=Glow%20Beauty%20Head%20Spa%20Lockport",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "glowbeautyheadspanail@gmail.com",
    channel: "Direct Email (glowbeautyheadspanail@gmail.com)",
    notes: "GOLDEN LEAD: Official verified email (glowbeautyheadspanail@gmail.com). Head spa & nails on 5905 S Transit Rd."
  },
  "54": {
    owner: "Lee & Stephen",
    facebook: "https://www.facebook.com/search/top/?q=Le%27s%20Nails%20Lockport%20NY",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Facebook / Phone (+1 716-433-4320)",
    notes: "52 Pine St. Known staff Lee & Stephen praised by locals for quality nail sets."
  },
  "55": {
    owner: "Glow Beauty / Z Nails",
    facebook: "https://www.facebook.com/search/top/?q=Z%20Nails%20Lockport%20NY",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "glowbeautyheadspanail@gmail.com",
    channel: "Direct Email (glowbeautyheadspanail@gmail.com)",
    notes: "Same location as Glow Beauty (rebranded/co-located). Direct email available."
  },
  "56": {
    owner: "Divinety Management",
    facebook: "https://www.facebook.com/search/top/?q=Divinety%20Hair%20Nails%20Lockport",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Facebook Page Message",
    notes: "Full service hair & nails at 39 East Ave."
  },
  "57": {
    owner: "Donna Carnevale & Jeff Thurston",
    facebook: "https://www.facebook.com/search/top/?q=Full%20Circle%20Salon%20Lockport",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "SKIP (Temporarily Closed)",
    notes: "Owners Donna & Jeff. Currently listed as temporarily closed in directory records."
  },
  "58": {
    owner: "Jonathan Reid (Grandson of founder Jack Reid)",
    facebook: "https://www.facebook.com/reids.in",
    messenger: "https://m.me/reids.in",
    instagram: "-",
    yelp: "https://www.yelp.com/biz/reids-lockport",
    linkedin: "-",
    email: "-",
    channel: "Facebook Messenger (m.me/reids.in)",
    notes: "GOLDEN LEAD: Historic drive-in diner since 1946! Operator Jonathan Reid. (716) 433-2488 / (716) 471-0701."
  },
  "59": {
    owner: "Jon",
    facebook: "https://www.facebook.com/p/Lockport-Seafood-Shack-61559405106967/",
    messenger: "https://m.me/61559405106967",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: "Facebook Messenger (m.me/61559405106967)",
    notes: "GOLDEN LEAD: Owner Jon. 20 Lock St in Locks District. Highly active on Facebook posting weekly specials!"
  },
  "60": {
    owner: "Family-Operated Diner",
    facebook: "https://www.facebook.com/search/top/?q=Dee%27s%20Sugar%20Shack%20Lockport",
    messenger: "-",
    instagram: "-",
    yelp: "https://www.yelp.com/biz/dees-sugar-shack-lockport",
    linkedin: "-",
    email: "-",
    channel: "Phone (+1 716-433-9538) / Yelp",
    notes: "GOLDEN LEAD: Beloved breakfast & lunch comfort diner at 460 West Ave."
  },
  "61": {
    owner: "Family-Operated Cafe",
    facebook: "https://www.facebook.com/cousinscafelockport/",
    messenger: "https://m.me/cousinscafelockport",
    instagram: "-",
    yelp: "https://www.yelp.com/biz/cousins-cafe-lockport",
    linkedin: "-",
    email: "-",
    channel: "Facebook Messenger (m.me/cousinscafelockport)",
    notes: "GOLDEN LEAD: Bewley Building cafe (10 Market St). Active Facebook page with daily specials & menu!"
  }
};

const enrichedList = parsedLeads.map(lead => {
  const enrich = ENRICHMENT_DATA[lead.id] || {
    owner: "-",
    facebook: lead.existingUrl && lead.existingUrl.includes('facebook') ? lead.existingUrl : "-",
    messenger: "-",
    instagram: "-",
    yelp: "-",
    linkedin: "-",
    email: "-",
    channel: lead.phone ? `Phone (${lead.phone})` : "-",
    notes: "Local business in Lockport NY"
  };

  return {
    id: lead.id,
    name: lead.name,
    category: lead.category,
    address: lead.address,
    phone: lead.phone,
    telLink: lead.telLink,
    rating: lead.rating,
    ownerName: enrich.owner,
    primaryDMChannel: enrich.channel,
    facebookUrl: enrich.facebook,
    messengerLink: enrich.messenger,
    instagramUrl: enrich.instagram,
    yelpUrl: enrich.yelp,
    linkedinUrl: enrich.linkedin,
    emailDetected: enrich.email,
    gmapsUrl: lead.gmapsUrl,
    intelligenceNotes: enrich.notes
  };
});

// Write to JSON
fs.writeFileSync(enrichedJsonPath, JSON.stringify(enrichedList, null, 2), 'utf8');

// Write to CSV with UTF-8 BOM for Excel
const csvHeaders = [
  "No",
  "Business Name",
  "Category",
  "Address",
  "Phone",
  "Owner / Key Contact",
  "Primary DM / Outreach Channel",
  "Facebook Page",
  "Direct Messenger Link (m.me)",
  "Instagram Profile",
  "Yelp Profile",
  "LinkedIn",
  "Email Address",
  "Google Maps URL",
  "OSINT Intelligence Notes"
];

function escapeCsv(val) {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

const csvRows = [csvHeaders.map(escapeCsv).join(',')];

enrichedList.forEach(item => {
  const row = [
    item.id,
    item.name,
    item.category,
    item.address,
    item.phone,
    item.ownerName,
    item.primaryDMChannel,
    item.facebookUrl,
    item.messengerLink,
    item.instagramUrl,
    item.yelpUrl,
    item.linkedinUrl,
    item.emailDetected,
    item.gmapsUrl,
    item.intelligenceNotes
  ];
  csvRows.push(row.map(escapeCsv).join(','));
});

// UTF-8 BOM
const BOM = '\uFEFF';
fs.writeFileSync(enrichedCsvPath, BOM + csvRows.join('\r\n'), 'utf8');

console.log(`\nSUCCESS: Enriched ${enrichedList.length} leads!`);
console.log(`JSON Output: ${enrichedJsonPath}`);
console.log(`CSV Output: ${enrichedCsvPath}`);
