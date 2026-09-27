export interface TattooArtist {
  id: string;
  name: string;
  title: string;
  styles: string[];
  bio: string;
  portraitImage: string;
  sampleWorkImage: string;
  sampleWorkTitle: string;
  startingRate: string;
  instagramHandle?: string;
  badge?: string;
}

export interface PortfolioPiece {
  id: string;
  title: string;
  category: "realism" | "fineline" | "color" | "neotrad" | "blackwork";
  image: string;
  artistId: string;
  artistName: string;
  description: string;
}

export interface InktellectualData {
  businessName: string;
  estYear: string;
  tagline: string;
  headline: string;
  subheadline: string;
  phone: string;
  cleanPhone: string;
  address: string;
  cityStateZip: string;
  neighborhood: string;
  campusDistance: string;
  studentDiscount: {
    title: string;
    discountAmount: string;
    badgeText: string;
    description: string;
    eligibility: string;
  };
  hygienePillars: {
    title: string;
    description: string;
  }[];
  artists: TattooArtist[];
  portfolio: PortfolioPiece[];
  hours: {
    days: string;
    time: string;
    note?: string;
  }[];
  faq: {
    q: string;
    a: string;
  }[];
}

export const INKTELLECTUAL_DATA: InktellectualData = {
  businessName: "Inktellectual Tattoo",
  estYear: "est. 2016",
  tagline: "Where Master Craftsmanship Meets Bespoke Storytelling",
  headline: "Fine Art. Sterile Precision. Lifelong Ink.",
  subheadline:
    "Buffalo's premier collective of specialized tattoo artists and piercers on Amherst Street. From hyper-realistic black & grey portraits to surgical fine-line botanicals, we craft custom body art engineered to age flawlessly.",
  phone: "(716) 226-1167",
  cleanPhone: "17162261167",
  address: "408 Amherst St",
  cityStateZip: "Buffalo, NY 14207",
  neighborhood: "Black Rock / Elmwood Village Corridor",
  campusDistance: "3 Minutes from SUNY Buffalo State University",
  studentDiscount: {
    title: "Buffalo State Student Special",
    discountAmount: "$20 OFF",
    badgeText: "BUFF STATE BENGALS EXCLUSIVE",
    description:
      "Show your valid SUNY Buffalo State (or local WNY college) student ID card at our 408 Amherst St studio and automatically receive $20 off your custom tattoo session or flash piece.",
    eligibility: "Valid for all registered students with current university photo ID."
  },
  hygienePillars: [
    {
      title: "100% Single-Use Membrane Needles",
      description: "Every cartridge is pre-sterilized with ethylene oxide gas and opened directly in front of you. Zero needle reuse, ever."
    },
    {
      title: "Hospital-Grade Autoclave & Barrier Film",
      description: "Full medical barrier wrapping on all power cords, machines, clip cords, and armrests with ultrasonic hospital sanitization."
    },
    {
      title: "Vegan & Heavy-Metal Free Organic Pigments",
      description: "We use premium American-made organic inks that deliver deep saturation without toxic industrial fillers or scarring."
    },
    {
      title: "NYS Health Department Inspected & Certified",
      description: "Fully licensed studio adhering to Erie County Sanitary Code and New York State Body Art regulations with pristine inspection records."
    }
  ],
  artists: [
    {
      id: "kobi",
      name: "Kobi",
      title: "Resident Realism & Dark Art Specialist",
      styles: ["Black & Grey Realism", "Portraits", "Dark Surrealism", "Scripture & Memorials"],
      bio: "Master of smooth ink transitions and photographic skin tone realism. Known for hyper-detailed face portraits, clock & eye compositions, and monumental black & grey sleeves that heal with buttery depth.",
      portraitImage: "/images/demo/inktellectual/artist-kobi.jpg",
      sampleWorkImage: "/images/demo/inktellectual/work-skull-clock-eye.jpg",
      sampleWorkTitle: "Blue Eye & Skull Realism Sleeve",
      startingRate: "From $150 / hr",
      badge: "Realism Lead"
    },
    {
      id: "brandi",
      name: "Brandi Vogt",
      title: "Fine-Line Botanical & Illustrative Color Specialist",
      styles: ["Fine-Line Botanical", "Soft Watercolor", "Micro-Florals", "Whimsical Color"],
      bio: "Celebrated across Western New York for feather-light linework that heals crisp without ink blowout. Specializes in intricate spinal peony cascades, delicate monarch butterflies, and ethereal watercolor washes.",
      portraitImage: "/images/demo/inktellectual/artist-brandi.jpg",
      sampleWorkImage: "/images/demo/inktellectual/work-floral-spine.jpg",
      sampleWorkTitle: "Anatomical Peony Spine Cascade",
      startingRate: "From $140 / hr",
      badge: "Fine-Line Specialist"
    },
    {
      id: "mikey",
      name: "Mikey Hollywould",
      title: "Neo-Traditional & Pop-Culture Color Artist",
      styles: ["Neo-Traditional", "Comic Book Realism", "Custom Flash", "Vibrant Color"],
      bio: "Known for saturated color palettes that refuse to fade over decades. Whether it's classic comic splits like Batman & Joker or bold modern flash, Mikey delivers surgical linework with striking contrast.",
      portraitImage: "/images/demo/inktellectual/artist-mikey.jpg",
      sampleWorkImage: "/images/demo/inktellectual/work-batman-joker.jpg",
      sampleWorkTitle: "Dual Batman & Joker Watercolor Split",
      startingRate: "From $130 / hr",
      badge: "Color Master"
    },
    {
      id: "spyder",
      name: "Spyder",
      title: "Precision Body Piercing & Sacred Geometry",
      styles: ["Body Piercings", "Sacred Geometry", "Fine-Line Flash", "High-Contrast Blackwork"],
      bio: "Buffalo's trusted body modification authority with comprehensive aseptic piercing technique. Alongside anatomical jewelry styling, Spyder creates high-impact geometric scarabs and sharp blackwork.",
      portraitImage: "/images/demo/inktellectual/artist-spyder.jpg",
      sampleWorkImage: "/images/demo/inktellectual/work-scarab.jpg",
      sampleWorkTitle: "Sacred Winged Scarab Geometry",
      startingRate: "Piercings from $40 • Tattoos from $100",
      badge: "Piercing & Line Specialist"
    },
    {
      id: "dave",
      name: "Dave Pantano",
      title: "Heavy Blackwork & Custom Script Architect",
      styles: ["Horror Realism", "Full Arm Sleeves", "Custom Lettering", "Dark Art"],
      bio: "Specialist in large-scale dark art compositions and heavy solid blacks. From iconic Beetlejuice quote scrolls to macabre storytelling sleeves, Dave brings an unmatched gritty elegance to every piece.",
      portraitImage: "/images/demo/inktellectual/artist-dave.jpg",
      sampleWorkImage: "/images/demo/inktellectual/work-beetlejuice.jpg",
      sampleWorkTitle: "Strange & Unusual Custom Scroll",
      startingRate: "From $150 / hr",
      badge: "Heavy Blackwork"
    },
    {
      id: "dominic",
      name: "Dominic Soto",
      title: "Full Backpiece & Japanese Illustrative Specialist",
      styles: ["Full Backpieces", "Japanese Illustrative", "Anatomy Matching", "Chicano Script"],
      bio: "Specializes in full-scale backpieces and anatomical flow where tattoos move seamlessly with body musculature. Expert in monumental winged crosses, Japanese dragons, and full body suit layout.",
      portraitImage: "/images/demo/inktellectual/artist-dominic.jpg",
      sampleWorkImage: "/images/demo/inktellectual/work-winged-cross.jpg",
      sampleWorkTitle: "Winged Cross Epic Backpiece",
      startingRate: "From $160 / hr",
      badge: "Large-Scale Architect"
    }
  ],
  portfolio: [
    {
      id: "1",
      title: "Sacred Winged Scarab",
      category: "fineline",
      image: "/images/demo/inktellectual/work-scarab.jpg",
      artistId: "spyder",
      artistName: "Spyder",
      description: "Sacred geometry scarab beetle with stippling and micro-dot linework."
    },
    {
      id: "2",
      title: "Winged Cross Masterpiece",
      category: "blackwork",
      image: "/images/demo/inktellectual/work-winged-cross.jpg",
      artistId: "dominic",
      artistName: "Dominic Soto",
      description: "Full upper back archangel wings cradling an ornate stone Latin cross."
    },
    {
      id: "3",
      title: "Blue Eye & Skull Timepiece",
      category: "realism",
      image: "/images/demo/inktellectual/work-skull-clock-eye.jpg",
      artistId: "kobi",
      artistName: "Kobi",
      description: "Photorealistic piercing blue eye emerging from cracked skull and Roman numeral clock."
    },
    {
      id: "4",
      title: "Anatomical Peony Spine Piece",
      category: "fineline",
      image: "/images/demo/inktellectual/work-floral-spine.jpg",
      artistId: "brandi",
      artistName: "Brandi Vogt",
      description: "Flowing botanical bouquet custom-fit to the vertebrae contour with soft shading."
    },
    {
      id: "5",
      title: "Dual Batman & Joker Watercolor",
      category: "color",
      image: "/images/demo/inktellectual/work-batman-joker.jpg",
      artistId: "mikey",
      artistName: "Mikey Hollywould",
      description: "Saturated pop-culture split mask with dynamic watercolor splash background."
    },
    {
      id: "6",
      title: "Cosmic Crystal Hourglass",
      category: "neotrad",
      image: "/images/demo/inktellectual/work-galaxy-hourglass.jpg",
      artistId: "mikey",
      artistName: "Mikey Hollywould",
      description: "Neo-traditional ornate wooden hourglass filled with vibrant cosmic nebulas."
    },
    {
      id: "7",
      title: "Crescent Moon & Chrysanthemum",
      category: "fineline",
      image: "/images/demo/inktellectual/work-moon-chrysanthemum.jpg",
      artistId: "brandi",
      artistName: "Brandi Vogt",
      description: "Celestial cratered moon blooming with detailed Japanese chrysanthemums on thigh."
    },
    {
      id: "8",
      title: "Strange & Unusual Banner",
      category: "blackwork",
      image: "/images/demo/inktellectual/work-beetlejuice.jpg",
      artistId: "dave",
      artistName: "Dave Pantano",
      description: "Dark art tribute featuring Beetlejuice sandworm and ornate gothic banner script."
    },
    {
      id: "9",
      title: "Greek Medusa Gaze",
      category: "realism",
      image: "/images/demo/inktellectual/work-medusa.jpg",
      artistId: "kobi",
      artistName: "Kobi",
      description: "Illustrative classical mythology sleeve with intertwined serpents and stone texture."
    },
    {
      id: "10",
      title: "Dragon of the Eastern Moon",
      category: "neotrad",
      image: "/images/demo/inktellectual/work-dragon-beast.jpg",
      artistId: "dominic",
      artistName: "Dominic Soto",
      description: "Japanese mythical beast with intense crimson eyes and heavy ink gradients."
    }
  ],
  hours: [
    { days: "Tuesday – Saturday", time: "12:00 PM – 8:00 PM", note: "Appointments & Walk-Ins" },
    { days: "Sunday – Monday", time: "By Appointment Only", note: "Private Custom Sessions" }
  ],
  faq: [
    {
      q: "Do you take walk-ins or is an appointment required?",
      a: "We welcome walk-ins every Tuesday through Saturday from 12 PM to 8 PM based on artist chair availability for small-to-medium pieces and piercings. For large custom projects (half/full sleeves and backpieces), we recommend booking a dedicated consultation."
    },
    {
      q: "How does the Buffalo State $20 student discount work?",
      a: "Simply show your valid Buffalo State University (or local college) student ID during checkout or when booking your consultation. $20 will be immediately deducted from your session price."
    },
    {
      q: "What are your deposit and consultation policies?",
      a: "Consultations are 100% free! When you lock in your appointment date, a non-refundable deposit ($50 to $100 depending on size) is applied toward your final tattoo price to compensate the artist for drafting your custom artwork."
    },
    {
      q: "What pigments and needles do you use?",
      a: "We exclusively utilize 100% single-use ethylene oxide sterilized needle cartridges, unopened in front of you. Our pigments are vegan, heavy-metal free, and rigorously tested for skin biocompatibility and long-term vibrancy."
    }
  ]
};
