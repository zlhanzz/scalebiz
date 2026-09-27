export interface FenceMaterialOption {
  id: string;
  name: string;
  shortName: string;
  category: "vinyl" | "chain-link" | "wood" | "commercial";
  pricePerFoot: { min: number; max: number };
  lifespanYears: string;
  maintenanceLevel: "Zero Maintenance" | "Low Maintenance" | "Moderate Maintenance";
  privacyLevel: string;
  windSnowRating: "Superior (WNY Frost-Tested)" | "Extreme Wind Resistant" | "Heavy-Duty Weathered";
  popularFor: string;
  description: string;
  features: string[];
}

export interface TotalFenceData {
  businessName: string;
  legalEntity: string;
  tagline: string;
  headline: string;
  subheadline: string;
  phone: string;
  cleanPhone: string;
  email: string;
  facebookUrl: string;
  messengerUrl: string;
  location: string;
  serviceAreas: string[];
  materials: FenceMaterialOption[];
  stats: { label: string; value: string; detail: string }[];
  frostLineStandard: {
    depthInches: number;
    concreteBagsPerPost: string;
    warrantyYears: number;
    explanation: string;
  };
  neighborDiscount: {
    title: string;
    discountPercent: number;
    description: string;
    reviewQuote: string;
    reviewAuthor: string;
  };
}

export const TOTAL_FENCE_DATA: TotalFenceData = {
  businessName: "Total Fence",
  legalEntity: "Total Fence of WNY Inc",
  tagline: "Expect Quality Fences For Your Dollar!",
  headline: "Western New York's Premier Vinyl, Chain Link & Wood Fence Builders",
  subheadline:
    "Engineered with 42-inch frost-line anchored posts to survive Buffalo winters. From private suburban backyard enclosures to heavy-duty commercial perimeters, we build fences that never sag, lean, or rot.",
  phone: "(716) 946-6294",
  cleanPhone: "17169466294",
  email: "sales@rlfence716.com",
  facebookUrl: "https://www.facebook.com/TotalFenceOfficial",
  messengerUrl: "https://m.me/TotalFenceOfficial",
  location: "Serving Niagara County & Greater Buffalo Metro, NY",
  serviceAreas: [
    "Niagara Falls",
    "Buffalo",
    "Tonawanda",
    "North Tonawanda",
    "Amherst",
    "Lockport",
    "Grand Island",
    "Cheektowaga",
    "West Seneca",
    "Clarence",
    "Lewiston",
    "Wheatfield"
  ],
  stats: [
    { label: "WNY Installations", value: "1,200+", detail: "Yards & commercial sites secured" },
    { label: "Average Install Time", value: "3 Days", detail: "Fast 2-fence crews on site" },
    { label: "Post Hole Depth", value: "42 Inches", detail: "Below NYS frost heave line" },
    { label: "Google & FB Rating", value: "5.0 ★", detail: "Unmatched customer satisfaction" }
  ],
  frostLineStandard: {
    depthInches: 42,
    concreteBagsPerPost: "80-120 lbs commercial gravel-concrete mix",
    warrantyYears: 10,
    explanation:
      "Unlike budget contractors who dig shallow 28-inch holes that heave and lean after the first freeze, Total Fence digs down 42 inches into undisturbed subsoil. Every post is set with heavy commercial concrete and crushed drainage stone to guarantee a plumb, straight fence line for decades."
  },
  neighborDiscount: {
    title: "The Good Neighbor Multi-Yard Program",
    discountPercent: 10,
    description:
      "When you and an adjacent neighbor coordinate your fence installation at the same time, both properties receive an instant 10% discount on shared boundary footage and equipment delivery.",
    reviewQuote:
      "Total Fence came and installed a fence for my neighbor and I. Two fences were installed in three days. They brought a great crew, worked hard and we love our new fence. Thank you Total Fence!",
    reviewAuthor: "Verified Niagara Falls Homeowner"
  },
  materials: [
    {
      id: "vinyl-privacy",
      name: "Commercial-Grade Vinyl Privacy Fence",
      shortName: "Vinyl Privacy",
      category: "vinyl",
      pricePerFoot: { min: 38, max: 54 },
      lifespanYears: "30+ Years",
      maintenanceLevel: "Zero Maintenance",
      privacyLevel: "100% Solid Tongue & Groove",
      windSnowRating: "Superior (WNY Frost-Tested)",
      popularFor: "Backyards, Swimming Pools & Modern Neighborhoods",
      description:
        "Heavy-duty virgin vinyl panels that never warp, peel, splinter, or require painting. Includes interlocking tongue-and-groove pickets, reinforced aluminum bottom rail, and decorative pyramid post caps.",
      features: [
        "100% Virgin UV-inhibited vinyl resists yellowing & chalking",
        "Reinforced aluminum bottom rail prevents sagging over time",
        "NYS Pool Barrier Code compliant (child-proof self-latching)",
        "Zero painting, staining, or chemical sealing ever needed"
      ]
    },
    {
      id: "chain-link-black",
      name: "Black Vinyl-Coated Chain Link Fence",
      shortName: "Black Chain Link",
      category: "chain-link",
      pricePerFoot: { min: 22, max: 34 },
      lifespanYears: "25+ Years",
      maintenanceLevel: "Zero Maintenance",
      privacyLevel: "Open Boundary (Optional Slats)",
      windSnowRating: "Extreme Wind Resistant",
      popularFor: "Dog Runs, Large Acreage, Child Safety & Property Borders",
      description:
        "Galvanized steel woven core with an all-weather black vinyl thermal coating. Seamlessly blends into lush green lawn landscapes while delivering heavy-duty containment that won't rust or bend under heavy snow banks.",
      features: [
        "Heavy 9-gauge galvanized core with bonded polymer coating",
        "Unobtrusive black finish blends naturally into landscape",
        "Superior wind permeability – zero snow accumulation drift",
        "Cost-effective perimeter security for large suburban lots"
      ]
    },
    {
      id: "wood-cedar",
      name: "Custom Western Red Cedar & Pine Fencing",
      shortName: "Custom Wood",
      category: "wood",
      pricePerFoot: { min: 34, max: 48 },
      lifespanYears: "15 - 20 Years",
      maintenanceLevel: "Moderate Maintenance",
      privacyLevel: "95% - 100% (Solid or Shadowbox)",
      windSnowRating: "Heavy-Duty Weathered",
      popularFor: "Natural Rustic Yards, Historic Homes & Custom Garden Accents",
      description:
        "Hand-built on site using premium western red cedar or pressure-treated pine pickets. Available in Board-on-Board full privacy, Shadowbox semi-private (allows gentle airflow), or traditional Gothic Point pickets.",
      features: [
        "Naturally insect and rot resistant tight-grain cedar",
        "Custom on-site stick build contours seamlessly over sloped ground",
        "Stainless steel non-corrosive fasteners prevent dark water streaks",
        "Stainable to any color tone (natural honey, redwood, or dark walnut)"
      ]
    },
    {
      id: "commercial-perimeter",
      name: "Heavy-Duty Commercial Security & Gate Systems",
      shortName: "Commercial Fence",
      category: "commercial",
      pricePerFoot: { min: 42, max: 68 },
      lifespanYears: "30+ Years",
      maintenanceLevel: "Low Maintenance",
      privacyLevel: "Perimeter Security & Controlled Access",
      windSnowRating: "Heavy-Duty Weathered",
      popularFor: "Industrial Lots, Storage Facilities, Municipal Parks & HOA Compounds",
      description:
        "Commercial-gauge galvanized steel or heavy industrial vinyl designed for high-traffic access control. Includes double swing gates for heavy trucks, cantilever slide gates, and anti-climb barbed wire options.",
      features: [
        "Heavy-duty SCH-40 steel pipe posts and commercial framework",
        "Wide cantilever and rolling drive gates up to 24ft openings",
        "Heavy-duty tamper-proof lock hardware & keypad gate prep",
        "Turnkey installation compliant with municipal zoning codes"
      ]
    }
  ]
};
