/**
 * SCALEBIZ SCRAPING TIERS & BLOCKLIST CONFIGURATION
 * 
 * Standar Operasional Prosedur (SOP) Prioritas Prospek:
 * - TIER 1: High-Ticket Trades & Home Services ($5,000 - $25,000/deal) -> ROI tercepat
 * - TIER 2: Beauty, Wellness & Lifestyle -> Butuh sistem booking & portofolio visual
 * - TIER 3: Professional & Health Services -> Kredibilitas & form intake klien
 * - TIER 4: Selective High-End & Emergency Automotive -> Estetika detailing / towing 24/7
 */

const SCRAPING_TIERS = {
  tier1: {
    id: 1,
    name: 'Tier 1 - High-Ticket Trades & Home Services',
    shortName: 'Tier 1 (Home Services)',
    dealValue: '$5,000 - $25,000',
    whyHighConversion: 'Nilai per proyek tinggi; hanya butuh 1 klien baru untuk balik modal website.',
    primaryFeatures: ['Estimate Quote Form', 'Before/After Slider', 'Trust Badges & License'],
    queries: [
      'roofing contractor',
      'kitchen remodeling contractor',
      'bathroom remodeling contractor',
      'plumbing and heating',
      'hvac heating and cooling',
      'licensed electrician',
      'tree removal and trimming service',
      'basement waterproofing',
      'concrete contractor and paving',
      'masonry contractor',
      'fence installation contractor',
      'deck builder and patio contractor'
    ]
  },
  tier2: {
    id: 2,
    name: 'Tier 2 - Beauty, Wellness & Booking-Heavy',
    shortName: 'Tier 2 (Beauty & Wellness)',
    dealValue: '$80 - $350/visit',
    whyHighConversion: 'Menghentikan gangguan telepon saat bekerja; butuh kalender reservasi digital.',
    primaryFeatures: ['Digital Chair Booking', 'Service Price Menu', 'Visual Portfolio Gallery'],
    queries: [
      'hair salon hair color specialist',
      'modern barbershop',
      'medical spa and esthetician',
      'nail salon and spa',
      'tattoo and piercing studio',
      'eyelash extensions salon',
      'day spa and massage therapy'
    ]
  },
  tier3: {
    id: 3,
    name: 'Tier 3 - Professional & Healthcare Services',
    shortName: 'Tier 3 (Professional & Health)',
    dealValue: '$1,000 - $10,000',
    whyHighConversion: 'Klien menolak memakai jasa jika tidak memiliki website kredibel.',
    primaryFeatures: ['Consultation Booking', 'Team Experience', 'Client Case Studies'],
    queries: [
      'personal injury lawyer',
      'cpa tax accounting services',
      'chiropractic clinic',
      'family dentist cosmetic dental',
      'veterinary clinic animal hospital',
      'independent real estate brokerage'
    ]
  },
  tier4: {
    id: 4,
    name: 'Tier 4 - Selective Aesthetics & Emergency Automotive',
    shortName: 'Tier 4 (Specialized Auto)',
    dealValue: '$300 - $2,500',
    whyHighConversion: 'Menjual hasil visual kilau mobil atau tombol telepon darurat saat mogok.',
    primaryFeatures: ['One-Click Call 24/7', 'Detailing Package Menu', 'Ceramic Coating Showcase'],
    queries: [
      'auto detailing ceramic coating',
      'car vinyl wrap and window tinting',
      '24/7 emergency towing and recovery',
      'mobile mechanic emergency roadside'
    ]
  }
};

/**
 * NEGATIVE KEYWORDS BLOCKLIST (Anti-Junk Filter)
 * Bisnis dengan nama atau kategori berikut akan LANGSUNG DITOLAK
 * oleh sistem sebelum membuang waktu dan resource untuk ekstraksi detail.
 */
const NEGATIVE_KEYWORDS_BLOCKLIST = [
  'junkyard',
  'junk yard',
  'scrap metal',
  'metal recycling',
  'salvage yard',
  'used parts',
  'u-pull',
  'upull',
  'cash for cars',
  'cash4cars',
  'impound lot',
  'auto auction',
  'gas station',
  'convenience store',
  'used tire shop',
  'used car dealer',
  'auto wrecker',
  'recycling center'
];

/**
 * Helper untuk memeriksa apakah bisnis masuk kategori junk
 */
function isJunkListing(name, category = '') {
  const textToCheck = `${name} ${category}`.toLowerCase();
  return NEGATIVE_KEYWORDS_BLOCKLIST.some(junkWord => textToCheck.includes(junkWord));
}

module.exports = {
  SCRAPING_TIERS,
  NEGATIVE_KEYWORDS_BLOCKLIST,
  isJunkListing
};
