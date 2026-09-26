export interface ServiceItem {
  name: string;
  price: string;
  duration: string;
  description: string;
  popular?: boolean;
}

export interface ServiceCategory {
  title: string;
  categoryKey: string;
  items: ServiceItem[];
}

export interface StylistMember {
  id: string;
  name: string;
  role: string;
  category: "all" | "blonding-extensions" | "hair-color" | "lashes-makeup" | "nails-waxing" | "bridal";
  specialties: string[];
  phone: string;
  phoneDisplay: string;
  contactMode: string;
  avatar: string;
  instagram?: string;
  bookingUrl?: string;
  note?: string;
  featured?: boolean;
  servicesOffered: string[];
}

export interface TestimonialItem {
  author: string;
  location: string;
  rating: number;
  date: string;
  review: string;
  service: string;
  stylist: string;
}

export interface TrulyOrganicData {
  businessName: string;
  tagline: string;
  subtitle: string;
  address: string;
  cityStateZip: string;
  ownerName: string;
  primaryPhone: string;
  primaryPhoneDisplay: string;
  instagram: string;
  facebookUrl: string;
  salonNotice: string;
  philosophy: {
    title: string;
    description: string;
    iconType: "leaf" | "suite" | "artisan" | "calendar";
  }[];
  services: ServiceCategory[];
  gallery: {
    src: string;
    alt: string;
    caption: string;
    tag: string;
    stylistCredit: string;
  }[];
  testimonials: TestimonialItem[];
  stylists: StylistMember[];
}

export const TRULY_ORGANIC_DATA: TrulyOrganicData = {
  businessName: "Truly Organic Hair Studio",
  tagline: "Lockport's Premier Organic Salon & Private Beauty Suites",
  subtitle: "A collaborative sanctuary of 11 independent beauty artisans committed to clean formulations, low-tox hair wellness, and customized one-on-one appointments on Davison Rd.",
  address: "Davison Rd",
  cityStateZip: "Lockport, NY 14094",
  ownerName: "Adriana Bryer",
  primaryPhone: "+17169578317",
  primaryPhoneDisplay: "(716) 957-8317",
  instagram: "trulyorganichairstudio",
  facebookUrl: "https://www.facebook.com/TrulyOrganicHairStudio",
  salonNotice: "Private Salon & Suites Collective • Select your preferred stylist below to book directly via our web portal.",
  philosophy: [
    {
      title: "Clean & Low-Tox Formulations",
      description: "We formulate with ammonia-free, organic, and botanically-derived color lines to nourish hair health, prevent scalp irritation, and preserve long-term vibrancy.",
      iconType: "leaf",
    },
    {
      title: "Private Boutique Suites",
      description: "Escape the loud, chaotic rush of traditional chain salons. Each beauty professional operates in an intimate, private suite tailored for focused pampering.",
      iconType: "suite",
    },
    {
      title: "11 Specialized Artisans",
      description: "From certified hand-tied extensions and lived-in blonding to bespoke bridal parties, luxury lashes, and structured gel nail art under one roof.",
      iconType: "artisan",
    },
    {
      title: "Direct Online Scheduling",
      description: "Our dedicated web booking app connects you directly with your preferred artist's calendar for effortless appointment reservations.",
      iconType: "calendar",
    },
  ],
  services: [
    {
      title: "Blonding & Extensions",
      categoryKey: "blonding-extensions",
      items: [
        {
          name: "Hand-Tied Hair Extensions (Consultation & Install)",
          price: "Custom Quote",
          duration: "2 - 4 hours",
          description: "Seamless, weightless hand-tied weft installation that blends invisibly with natural hair for maximum volume and length without damage.",
          popular: true,
        },
        {
          name: "Full Dimensional Lived-In Blonding",
          price: "$195 - $265",
          duration: "3.5 hours",
          description: "Custom customized foilayage, root melt, and organic conditioning gloss designed to grow out seamlessly for 3-5 months with zero harsh lines.",
          popular: true,
        },
        {
          name: "Partial Blonding & Face-Framing Money Piece",
          price: "$145 - $185",
          duration: "2.5 hours",
          description: "Targeted brightness around the hairline, crown, and partline with custom tone balancing and gloss treatment.",
        },
        {
          name: "Organic Botanical Hair Gloss & Tone Refresh",
          price: "$65 - $85",
          duration: "45 mins",
          description: "Non-ammonia conditioning toner that restores brilliant mirror shine, eliminates brassiness, and seals split ends between major blonding visits.",
        },
      ],
    },
    {
      title: "Haircuts & Creative Color",
      categoryKey: "hair-color",
      items: [
        {
          name: "Signature Precision Haircut & Botanical Blowout",
          price: "$48 - $70",
          duration: "60 mins",
          description: "Detailed consultation, therapeutic scalp cleanse, precision wet/dry scissor tailoring, and organic blowout styling.",
          popular: true,
        },
        {
          name: "Full Transformative Color & Corrective Service",
          price: "$175+",
          duration: "3 hours",
          description: "Complete hair transformation from roots to ends utilizing gentle low-tox pigment technology for rich, multidimensional brunettes, coppers, or reds.",
        },
        {
          name: "Vivid Fashion Colors & Festival Braiding",
          price: "$120+",
          duration: "2.5 hours",
          description: "Creative fashion shades, pastels, accent pieces, or festival feed-in braid styling customized for special events.",
        },
        {
          name: "Organic Grey Blending & Root Retouch",
          price: "$75 - $95",
          duration: "75 mins",
          description: "Clean ammonia-free root coverage that leaves hair soft, touchable, and completely free of harsh chemical fumes.",
        },
      ],
    },
    {
      title: "Lashes & Event Makeup",
      categoryKey: "lashes-makeup",
      items: [
        {
          name: "Custom Lash Extension Full Set (Volume / Hybrid)",
          price: "$130 - $175",
          duration: "2 hours",
          description: "Lightweight, natural-feel synthetic silk lashes hand-applied to individual natural lashes for customizable flutter and everyday fullness.",
          popular: true,
        },
        {
          name: "Lash Fill & Maintenance (2-3 Weeks)",
          price: "$60 - $85",
          duration: "75 mins",
          description: "Gentle outgrown lash removal and fresh fan replenishment to maintain a lush, full lash line.",
        },
        {
          name: "Bridal & Special Occasion Glam Makeup",
          price: "$95 - $140",
          duration: "60 mins",
          description: "Long-wear camera-ready makeup artistry including skin prep, custom contouring, and complimentary strip lashes.",
          popular: true,
        },
        {
          name: "Organic Custom Spray Tan Session",
          price: "$40 - $55",
          duration: "30 mins",
          description: "Natural beet-derived, anti-orange sunless tanning mist for an even, golden sun-kissed glow without UV damage.",
        },
      ],
    },
    {
      title: "Nails & Esthetics",
      categoryKey: "nails-waxing",
      items: [
        {
          name: "Structured Gel Manicure (Builder in a Bottle)",
          price: "$55 - $75",
          duration: "75 mins",
          description: "Reinforced rubber-base gel overlay that promotes natural nail growth and prevents breakage for 3-4+ chip-free weeks.",
          popular: true,
        },
        {
          name: "Hand-Painted Custom Nail Art & Gems",
          price: "$15 - $40",
          duration: "30 mins",
          description: "Intricate French tips, abstract linework, floral motifs, chrome accents, or Swarovski crystal placement.",
        },
        {
          name: "Full Body & Facial Waxing",
          price: "$20 - $80",
          duration: "20 - 45 mins",
          description: "Ultra-gentle hard wax treatment suitable for sensitive skin. Brows, lip, chin, underarms, and bikini.",
        },
      ],
    },
  ],
  gallery: [
    {
      src: "/images/demo/truly-organic/blonde-balayage.jpg",
      alt: "Lived-In Vanilla Blonde Balayage",
      caption: "Dimensional Lived-In Blonding & Seamless Root Melt",
      tag: "Blonding",
      stylistCredit: "Adriana Bryer & Hayley Baes",
    },
    {
      src: "/images/demo/truly-organic/bridal-updo.jpg",
      alt: "Textured Romantic Bridal Bun Updo",
      caption: "Romantic Textured Bridal Updo with Floral Accents",
      tag: "Bridal Styling",
      stylistCredit: "Adriana Bryer & Bridal Team",
    },
    {
      src: "/images/demo/truly-organic/gallery/copper-curls.jpg",
      alt: "Vibrant Auburn Copper Curls",
      caption: "Warm Dimensional Copper Auburn Wave Transformation",
      tag: "Creative Color",
      stylistCredit: "Renee Hulbert & Samantha Handley",
    },
    {
      src: "/images/demo/truly-organic/gallery/lashes-flutter.jpg",
      alt: "Fluttery Hybrid Lash Extensions",
      caption: "Lightweight Hybrid Volume Eyelash Extensions",
      tag: "Lash Artistry",
      stylistCredit: "Lindsay Bryer & Alexis Belonogov",
    },
    {
      src: "/images/demo/truly-organic/gallery/nails-rhinestone.jpg",
      alt: "Structured Gel French Tips with Crystal Accents",
      caption: "Modern Square French Gel Nails with Rhinestone Embellishments",
      tag: "Nail Art",
      stylistCredit: "Camryn Cuzzacrea",
    },
    {
      src: "/images/demo/truly-organic/gallery/festival-braids.jpg",
      alt: "Festival Bubble Braids with Shimmer Accent",
      caption: "Festival Double Bubble Braids with Iridescent Shimmer",
      tag: "Festival Braids",
      stylistCredit: "Renee Hulbert",
    },
  ],
  testimonials: [
    {
      author: "Jessica T.",
      location: "Lockport Local",
      rating: 5,
      date: "1 week ago",
      review: "Adriana is a hair genius! My hand-tied extensions feel completely weightless, and the blonde tone matches my natural hair so seamlessly that people think it's all mine. The private suite vibe is so relaxing!",
      service: "Hand-Tied Extensions & Blonding",
      stylist: "Adriana Bryer",
    },
    {
      author: "Megan S.",
      location: "Niagara County",
      rating: 5,
      date: "3 weeks ago",
      review: "I have sensitive skin and always hated the harsh chemical smell of traditional salons. Truly Organic uses such gentle, clean products. Hayley gave me the most gorgeous lived-in balayage of my life!",
      service: "Lived-In Blonding",
      stylist: "Hayley Baes",
    },
    {
      author: "Courtney B.",
      location: "Newfane, NY",
      rating: 5,
      date: "2 weeks ago",
      review: "Alexis did my lashes and Camryn did my structured gel nails for my wedding weekend. Everything lasted through the entire honeymoon without a single lift or lost lash! Love this entire studio collective.",
      service: "Volume Lashes & Gel Nails",
      stylist: "Alexis & Camryn",
    },
    {
      author: "Danielle M.",
      location: "Lockport, NY",
      rating: 5,
      date: "1 month ago",
      review: "Samantha understood my curly hair like no one else ever has. She gave me the perfect shape and a rich copper gloss that looks so glossy and healthy. Booking on this site was so simple and fast!",
      service: "Curly Cut & Copper Gloss",
      stylist: "Samantha Handley",
    },
  ],
  stylists: [
    {
      id: "adriana-bryer",
      name: "Adriana Bryer",
      role: "Owner & Master Extension Artist",
      category: "blonding-extensions",
      specialties: ["Hand-Tied Extensions", "Bridal Parties", "Dimensional Blonding", "Salon Founder"],
      phone: "+17169578317",
      phoneDisplay: "(716) 957-8317",
      contactMode: "Online Booking / Text Consultation",
      avatar: "/images/demo/truly-organic/team/adriana.jpg",
      instagram: "adrianabryerhairstyling",
      note: "Specializing exclusively in Hand-Tied Extensions, Bridal Parties, and Custom Blonding.",
      featured: true,
      servicesOffered: ["Hand-Tied Hair Extensions", "Full Dimensional Lived-In Blonding", "Bridal Hair & Party Styling"],
    },
    {
      id: "brianna-felder",
      name: "Brianna Felder",
      role: "Stylist & Color Specialist",
      category: "hair-color",
      specialties: ["Lived-In Color", "Dimensional Highlights", "Precision Haircuts", "Blowout Styling"],
      phone: "+17166381646",
      phoneDisplay: "(716) 638-1646",
      contactMode: "Online Booking / Text Preferred",
      avatar: "/images/demo/truly-organic/team/brianna.jpg",
      instagram: "hairbyxbrianna",
      servicesOffered: ["Precision Haircut & Blowout", "Partial Blonding & Highlights", "Organic Grey Blending"],
    },
    {
      id: "hayley-baes",
      name: "Hayley Baes",
      role: "Stylist & Blonding Artist",
      category: "blonding-extensions",
      specialties: ["Custom Blonding", "Seamless Balayage", "Toning & Gloss", "Hair Transformations"],
      phone: "+17166387715",
      phoneDisplay: "(716) 638-7715",
      contactMode: "Online Booking / Text Preferred",
      avatar: "/images/demo/truly-organic/team/hayley.jpg",
      instagram: "hairbyhayley__",
      bookingUrl: "https://www.instagram.com/hairbyhayley__/",
      servicesOffered: ["Full Dimensional Lived-In Blonding", "Partial Blonding & Foilayage", "Botanical Gloss & Tone"],
    },
    {
      id: "renee-hulbert",
      name: "Renee Hulbert",
      role: "Stylist & Creative Colorist",
      category: "hair-color",
      specialties: ["Highlights", "Fashion & Vivid Colors", "Formal Updos", "Festival Braids"],
      phone: "+15852050786",
      phoneDisplay: "(585) 205-0786",
      contactMode: "Online Booking / Text Preferred",
      avatar: "/images/demo/truly-organic/team/renee.jpg",
      instagram: "hairxreneewny",
      note: "Specializing in transformative colors, vivid tones, and festival braid styling.",
      servicesOffered: ["Vivid Fashion Colors", "Festival Braiding & Bubble Braids", "Formal Hair Updos"],
    },
    {
      id: "samantha-handley",
      name: "Samantha Handley",
      role: "Master Stylist (17+ Years Exp)",
      category: "hair-color",
      specialties: ["Lived-In Color", "Vibrant Reds", "Pixie Cuts", "Curly Hair & Perms"],
      phone: "+17165310225",
      phoneDisplay: "(716) 531-0225",
      contactMode: "Online Booking / Text Preferred",
      avatar: "/images/demo/truly-organic/team/samantha.jpg",
      instagram: "samanthahandleyhair",
      note: "17+ years bringing magic to lived-in reds, precision pixies, and textured curls.",
      servicesOffered: ["Curly Cut & Specialized Styling", "Vibrant Red & Copper Tones", "Precision Pixie Cut"],
    },
    {
      id: "hillary-baker",
      name: "Hillary Baker",
      role: "Senior Stylist (21+ Years Exp)",
      category: "hair-color",
      specialties: ["Transformative Colors", "Corrective Color", "All Modern Cuts", "Grey Coverage"],
      phone: "+17169408341",
      phoneDisplay: "(716) 940-8341",
      contactMode: "Online Booking / Text Preferred",
      avatar: "/images/demo/truly-organic/team/hillary.jpg",
      instagram: "hairedbyhillary",
      note: "21+ years expertise in corrective color and modern wearable cuts.",
      servicesOffered: ["Full Transformative & Corrective Color", "Signature Haircut & Style", "Organic Grey Coverage"],
    },
    {
      id: "sarah-blackwell",
      name: "Sarah Blackwell",
      role: "Stylist & Extension Specialist (10+ Years)",
      category: "blonding-extensions",
      specialties: ["Blonding", "Hand-Tied Extensions", "Wedding Hair", "Toning"],
      phone: "+17164223338",
      phoneDisplay: "(716) 422-3338",
      contactMode: "Online Booking / Text Preferred",
      avatar: "/images/demo/truly-organic/team/sarah.jpg",
      instagram: "sarah_beardoeshair",
      note: "10+ years specializing in seamless extensions, dimensional blondes, and bridal looks.",
      servicesOffered: ["Hand-Tied Extensions", "Dimensional Blonding", "Bridal Event Hair"],
    },
    {
      id: "aleza-oconnor",
      name: "Aleza Ann Ring",
      role: "Stylist & Makeup Artist (12+ Years)",
      category: "hair-color",
      specialties: ["Blondes & Balayage", "Formal Hair & Makeup", "Haircutting", "Men's Cuts"],
      phone: "+17168183029",
      phoneDisplay: "(716) 818-3029",
      contactMode: "Online Booking / Text Preferred",
      avatar: "/images/demo/truly-organic/team/aleza.jpg",
      instagram: "alezaannring",
      note: "12+ years in hair & makeup artistry. Specializing in balayage and special occasion looks.",
      servicesOffered: ["Formal Hair & Makeup Package", "Balayage Blonding", "Men's Precision Cut"],
    },
    {
      id: "lindsay-bryer",
      name: "Lindsay Bryer",
      role: "Lash & Spray Tan Specialist",
      category: "lashes-makeup",
      specialties: ["Custom Lash Extensions", "Facials", "Face Waxing", "Custom Spray Tans"],
      phone: "+17165310506",
      phoneDisplay: "(716) 531-0506",
      contactMode: "Online Booking / Text Preferred",
      avatar: "/images/demo/truly-organic/team/lindsay.jpg",
      instagram: "freebirdcreations716",
      note: "Owner of Freebird Creations — your go-to for sunless spray tanning and full lash fans.",
      servicesOffered: ["Custom Organic Spray Tan", "Classic & Hybrid Lash Extensions", "Botanical Facial"],
    },
    {
      id: "alexis-belonogov",
      name: "Alexis Belonogov",
      role: "Lash Artist & Professional MUA",
      category: "lashes-makeup",
      specialties: ["Volume & Hybrid Lashes", "Bridal Makeup", "Event Glam", "Online Booking"],
      phone: "+17162662418",
      phoneDisplay: "(716) 266-2418",
      contactMode: "Online Booking Instant Confirmation",
      avatar: "/images/demo/truly-organic/team/alexis.jpg",
      instagram: "cosmoholiclex",
      bookingUrl: "https://cosmoholic.as.me",
      note: "Owner of Cosmoholic Beauty. Book directly on-app or via Cosmoholic portal.",
      servicesOffered: ["Custom Lash Extension Full Set", "Bridal & Glam Makeup", "Lash Fill & Refresh"],
    },
    {
      id: "camryn-cuzzacrea",
      name: "Camryn Cuzzacrea",
      role: "Nail Artist & Esthetics Specialist",
      category: "nails-waxing",
      specialties: ["Structured Gel Nails", "Custom Nail Art", "Full Body Waxing", "Skin Facials"],
      phone: "+15858885478",
      phoneDisplay: "(585) 888-5478",
      contactMode: "Online Booking Instant Confirmation",
      avatar: "/images/demo/truly-organic/team/camryn.jpg",
      instagram: "cuzzacreaskin",
      bookingUrl: "https://www.cuzzacreaskin.com",
      note: "Owner of Cuzzacrea Skin & Nails. Structured gel manicure and full body waxing specialist.",
      servicesOffered: ["Structured Gel Manicure", "Hand-Painted Custom Nail Art", "Full Body & Facial Waxing"],
    },
    {
      id: "marilyn-mayle",
      name: "Marilyn Mayle",
      role: "Stylist & Hair Care Specialist",
      category: "hair-color",
      specialties: ["Classic Cuts", "Modern Color", "Blowouts & Treatments", "Hair Health"],
      phone: "+15853505775",
      phoneDisplay: "(585) 350-5775",
      contactMode: "Online Booking / Text Preferred",
      avatar: "/images/demo/truly-organic/team/marilyn.jpg",
      servicesOffered: ["Signature Precision Haircut", "Full Color Treatment", "Deep Conditioning Scalp Mask"],
    },
  ],
};
