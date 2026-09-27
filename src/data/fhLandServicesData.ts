export interface ServiceItem {
  id: string;
  name: string;
  season: "summer" | "winter" | "all";
  tagline: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface GalleryItem {
  src: string;
  title: string;
  category: "Landscaping" | "Lawn Care" | "Bed Edging" | "Snow Removal";
  location: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  town: string;
  service: string;
  rating: number;
}

export interface FHLandData {
  businessName: string;
  tagline: string;
  subtagline: string;
  phone: string;
  phoneDisplay: string;
  secondaryPhone: string;
  messengerUrl: string;
  facebookUrl: string;
  serviceAreas: string[];
  team: {
    steve: string;
    kenny: string;
  };
  services: {
    summer: ServiceItem[];
    winter: ServiceItem[];
  };
  gallery: GalleryItem[];
  testimonials: TestimonialItem[];
  stats: { label: string; value: string }[];
}

export const FH_LAND_DATA: FHLandData = {
  businessName: "FH Land Services",
  tagline: "Lockport's Dependable Landscaping & All-Season Snow Removal",
  subtagline: "Crisp bed edges, striped green lawns, and reliable winter plow routes. Residential & commercial property care done right by local craftsmen.",
  phone: "+17165238341",
  phoneDisplay: "(716) 523-8341",
  secondaryPhone: "(585) 447-8083",
  messengerUrl: "https://m.me/FHLandServices",
  facebookUrl: "https://www.facebook.com/FHLandServices/",
  serviceAreas: [
    "Lockport, NY",
    "Pendleton",
    "Amherst",
    "Clarence",
    "Cambria",
    "Newfane",
    "Niagara County"
  ],
  team: {
    steve: "Steve Frazer",
    kenny: "Kenny Jordan"
  },
  stats: [
    { label: "On-Time Arrival Rate", value: "99.8%" },
    { label: "Community Rating", value: "5.0 Stars" },
    { label: "Plow Response Time", value: "< 4 Hours" },
    { label: "Property Coverage", value: "100% Insured" }
  ],
  services: {
    summer: [
      {
        id: "lawn-mowing-striping",
        name: "Lawn Mowing & Turf Striping",
        season: "summer",
        tagline: "Golf-course quality curb appeal every single week",
        description: "Weekly commercial zero-turn mowing with razor-sharp blades, tight perimeter weed-whipping, driveway & patio string edging, and spotless blower cleanup of all hard surfaces.",
        features: [
          "Cross-hatch & diamond striping patterns",
          "Clean perimeter string edging every visit",
          "Zero grass clippings left on drives or beds",
          "Commercial low-impact turf tires (no lawn ruts)"
        ],
        popular: true
      },
      {
        id: "mulch-bed-edging",
        name: "Deep Mulch & Crisp Trench Edging",
        season: "summer",
        tagline: "Showstopping curb appeal with deep defined borders",
        description: "We spade-dig a true 3-to-4 inch deep mechanical trench border to stop invasive grass creep, followed by hand-spread premium organic dark black or rich brown triple-shred mulch.",
        features: [
          "Hand-sculpted crisp edge trench line",
          "Pre-emergent weed prevention prep",
          "Premium triple-shred hardwood dark mulch",
          "Nutrient insulation for shrub root systems"
        ],
        popular: true
      },
      {
        id: "shrub-hedge-trimming",
        name: "Shrub Pruning & Hedge Shaping",
        season: "summer",
        tagline: "Precision sculptural pruning for lush, healthy foliage",
        description: "Careful trimming of ornamental bushes, boxwoods, flowering shrubs, and perimeter hedges to promote uniform sunlight, remove deadwood, and preserve plant health.",
        features: [
          "Spherical, rounded, or formal flat hedge cuts",
          "Seasonal timing tailored to plant blooming cycle",
          "Total debris cleanup & organic haul-away",
          "Perimeter clearance around walkways & AC units"
        ]
      },
      {
        id: "spring-fall-cleanups",
        name: "Seasonal Yard & Leaf Cleanups",
        season: "summer",
        tagline: "Complete property reset before summer & winter",
        description: "Heavy leaf vacuuming, stick and branch pickup, garden bed blow-outs, and winter debris removal to prevent lawn mold and leave your grounds immaculate.",
        features: [
          "High-volume leaf collection & off-site hauling",
          "Garden bed dethatching & cutting back perennials",
          "Gutter downspout clearance around foundation",
          "Prepares turf for vigorous spring green-up"
        ]
      }
    ],
    winter: [
      {
        id: "driveway-snow-plowing",
        name: "Residential Driveway Snow Plowing",
        season: "winter",
        tagline: "Cleared and driveable before you leave for work",
        description: "Dedicated Western NY winter plow routes equipped with heavy-duty GMC trucks. We monitor lake-effect snow squalls 24/7 so you never get trapped in your driveway.",
        features: [
          "Early morning clearing before 6:30 AM commute",
          "Safety boundary stake markers installed in fall",
          "Careful blade clearance (no scraped lawn sod)",
          "Automatic dispatch triggers at 2-3 inches of snow"
        ],
        popular: true
      },
      {
        id: "commercial-snow-clearing",
        name: "Commercial Lots & Industrial Clearing",
        season: "winter",
        tagline: "Zero-liability access for employees and customers",
        description: "Commercial parking lot plowing, emergency vehicle lane clearance, snow stacking, and off-site loader hauling for Lockport businesses, retail, and office parks.",
        features: [
          "Continuous storm cycle clearing during blizzards",
          "Front entrance and loading dock priority",
          "Documentation & salt log for liability protection",
          "Heavy equipment for massive snow drift relocation"
        ],
        popular: true
      },
      {
        id: "salting-deicing",
        name: "Salting & Walkway De-Icing",
        season: "winter",
        tagline: "Prevent slips, falls, and black ice hazards",
        description: "Commercial broadcast salting for parking lots and pet-safe calcium chloride applications for residential walkways, steps, and front porches.",
        features: [
          "Fast-acting treated rock salt & brine blends",
          "Gentle formulations for concrete & stone paver patios",
          "Post-thaw refreeze prevention treatments",
          "Scheduled automatically with each storm route"
        ]
      }
    ]
  },
  gallery: [
    {
      src: "/images/demo/fh-land/mulch-estate-2.jpg",
      title: "Deep Trench Edging & Midnight Black Mulch",
      category: "Bed Edging",
      location: "Davison Rd Estate • Lockport, NY"
    },
    {
      src: "/images/demo/fh-land/lawn-striping-estate.jpg",
      title: "Commercial Diamond Lawn Striping",
      category: "Lawn Care",
      location: "Pendleton Residential Property"
    },
    {
      src: "/images/demo/fh-land/curved-bed-edging.jpg",
      title: "Curved Turf Border & Ornamental Shrub Sculpting",
      category: "Landscaping",
      location: "Chestnut Ridge Area • Lockport, NY"
    },
    {
      src: "/images/demo/fh-land/brick-manor-lawn.jpg",
      title: "Brick Manor Full Property Maintenance",
      category: "Lawn Care",
      location: "Clarence Suburban Estate"
    },
    {
      src: "/images/demo/fh-land/flowering-tree-mulch.jpg",
      title: "Spring Tree Ring & Flowering Shrub Bed",
      category: "Bed Edging",
      location: "Amherst Border Residence"
    },
    {
      src: "/images/demo/fh-land/commercial-mower.jpg",
      title: "High-Acreage Commercial Turf Mowing",
      category: "Lawn Care",
      location: "Niagara County Commercial Facility"
    }
  ],
  testimonials: [
    {
      quote: "Steve and Kenny are by far the most reliable crew we've hired in Lockport. Our lawn has never had such sharp striping lines, and the deep mulch edge looks like an upscale golf club. Wouldn't trust anyone else with our property.",
      author: "Mark & Diane V.",
      town: "Lockport, NY",
      service: "Weekly Mowing & Mulch Refresh",
      rating: 5
    },
    {
      quote: "When that massive lake-effect storm hit Western NY last winter, our driveway was plowed clean before 6 AM both mornings so my husband could make his hospital shift. These guys work tirelessly and truly go the extra mile.",
      author: "Sarah K.",
      town: "Pendleton, NY",
      service: "Winter Snow Plowing Season Pass",
      rating: 5
    },
    {
      quote: "Great local guys with honest prices. They don't leave grass clippings in the mulch beds or scratch up the turf edges. You can tell they actually take pride in the work.",
      author: "David R.",
      town: "Amherst Border",
      service: "Spring Cleanup & Bed Edging",
      rating: 5
    }
  ]
};
