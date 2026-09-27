export interface FlashDesign {
  id: string;
  title: string;
  category: "Botanical" | "Japanese Line Art" | "Fauna" | "Talisman";
  minSize: string;
  image: string;
  description: string;
  isOneOfOne: boolean;
  status: "Available" | "Reserved";
  recommendedPlacement: string;
  estimatedPrice: string;
}

export interface PortfolioWork {
  id: string;
  title: string;
  category: "Botanical" | "Micro-Realism" | "Fauna" | "Symbolic";
  image: string;
  placement: string;
  caption: string;
}

export interface ClientReview {
  id: string;
  author: string;
  badge?: string;
  rating: number;
  timeAgo: string;
  priceRange: string;
  services: string[];
  text: string;
  highlightTheme: "Clean & Welcoming" | "Non-Intimidating" | "Paper Cranes Project" | "Impeccable Linework";
}

export const LUCKY_LEAF_DATA = {
  businessName: "Lucky Leaf Tattoo",
  artistName: "Din Tran",
  artistHandle: "@dintran",
  instagramUrl: "https://instagram.com/luckyleaftattoo",
  instagramHandle: "@luckyleaftattoo",
  instagramFollowers: "3.4k+",
  address: "1809 Hertel Avenue, Buffalo, NY 14216",
  neighborhood: "North Buffalo • Hertel Arts & Dining District",
  googleRating: 5.0,
  googleReviewCount: 112,
  studioType: "Private Appointment-Only Sanctuary",
  headline: "Fine-Line Botanical, Fauna & Mindful Body Art",
  subheadline:
    "An inclusive, non-intimidating private tattoo sanctuary on Hertel Avenue. Crafted with surgical precision, gentle pacing, and a serene atmosphere where you are truly taken care of.",
  brandKeywords: [
    "Private Sanctuary",
    "Appointment Only",
    "Fine-Line Botanicals",
    "1,000 Paper Cranes Project",
    "Inclusive & Welcoming",
    "1-of-1 Original Flash"
  ],

  // Deposit & Booking Policy (Directly from Din Tran's Studio Guidelines)
  bookingPolicies: {
    leadTime: "Currently accepting inquiries for next month",
    depositRequired: true,
    depositNote: "A non-refundable deposit is required to secure your date, applied directly toward your tattoo total.",
    sketchTimeline: "Custom sketch delivered 3 to 5 days prior to your appointment with full revision flexibility.",
    rules: [
      {
        title: "3–5 Day Sketch Collaboration",
        desc: "You will receive a personalized sketch 3-5 days before your session with time for revisions. Designing starts once your deposit is confirmed."
      },
      {
        title: "Punctuality & Grace Period",
        desc: "Please arrive on time. Arriving more than 20 minutes late without prior notice forfeits your deposit to respect client appointments."
      },
      {
        title: "5-Day Rescheduling Notice",
        desc: "Life happens! You may reschedule once with at least 5 days advance notice without losing your deposit."
      },
      {
        title: "Scope & Reference Integrity",
        desc: "Significant adjustments to sizing or subject matter after the sketch is finalized requires advance discussion so adequate session time is reserved."
      }
    ]
  },

  // 1,000 Paper Cranes Milestone (Senbazuru)
  paperCranesStory: {
    title: "The 1,000 Paper Cranes Journey (Senbazuru)",
    subtitle: "A living art project woven across Buffalo",
    description:
      "Inspired by the ancient Japanese legend of Senbazuru—where folding 1,000 origami paper cranes grants a sacred wish of healing, peace, and longevity—Din Tran is on an ongoing journey tattooing 1,000 uniquely stylized origami cranes across Buffalo collectors. Each crane is custom-tailored, serving as a permanent talisman of personal renewal.",
    badge: "Special Cultural Project"
  },

  // One-of-a-Kind Flash Catalog (Tattooed ONLY ONCE, Calendar Priority & Discounted Rate)
  availableFlashDesigns: [
    {
      id: "flash-butterfly-omamori",
      title: "Butterfly Omamori Talisman",
      category: "Japanese Line Art",
      minSize: '7.0" (Inches)',
      image: "/images/demo/lucky-leaf/flash-butterfly-omamori.jpg",
      description: "Sacred Japanese protective talisman framed with blooming petals, a delicate fine-line swallowtail butterfly, and sacred braided silk cord.",
      isOneOfOne: true,
      status: "Available",
      recommendedPlacement: "Forearm, Calf, Thigh, or Sternum",
      estimatedPrice: "$280 – $340 (Special 1-of-1 Rate)"
    },
    {
      id: "flash-peony",
      title: "Imperial Peony Blossom",
      category: "Botanical",
      minSize: '6.0" (Inches)',
      image: "/images/demo/lucky-leaf/flash-peony.jpg",
      description: "Lush botanical peony featuring micro-veined translucent petals, deep ink striped foliage, and fluid stem curvature.",
      isOneOfOne: true,
      status: "Available",
      recommendedPlacement: "Shoulder blade, Upper Thigh, Ribcage, or Hip",
      estimatedPrice: "$260 – $320 (Special 1-of-1 Rate)"
    },
    {
      id: "flash-goldfish-pair",
      title: "Goldfishy Serenity (Pair)",
      category: "Fauna",
      minSize: '3.5" (Inches) Each',
      image: "/images/demo/lucky-leaf/flash-goldfish-pair.jpg",
      description: "Delicate pair of Ryukin fancy goldfish accompanied by floating cherry blossoms with soft pepper shading and stippled scales.",
      isOneOfOne: true,
      status: "Available",
      recommendedPlacement: "Inner forearm, Ankle, Bicep, or Nape",
      estimatedPrice: "$200 – $240 Each (Special 1-of-1 Rate)"
    },
    {
      id: "flash-geisha-masks",
      title: "Geisha with Kitsune & Hannya",
      category: "Japanese Line Art",
      minSize: '6.0" (Inches) Each',
      image: "/images/demo/lucky-leaf/flash-geisha-masks.jpg",
      description: "Dual aesthetic profile studies of a geisha crowned with hand-carved traditional Noh masks (Kitsune fox & Hannya protection).",
      isOneOfOne: true,
      status: "Available",
      recommendedPlacement: "Outer forearm, Tricep, Upper Thigh, or Back",
      estimatedPrice: "$270 – $330 (Special 1-of-1 Rate)"
    },
    {
      id: "flash-bluejay",
      title: "Blue Jay on Winter Berry",
      category: "Fauna",
      minSize: '7.5" (Inches)',
      image: "/images/demo/lucky-leaf/flash-bluejay.jpg",
      description: "Finely rendered native songbird perched upon an organic twig with wild winter berries and micro-crosshatched feathers.",
      isOneOfOne: true,
      status: "Available",
      recommendedPlacement: "Upper Arm, Ribs, Thigh, or Spine",
      estimatedPrice: "$300 – $380 (Special 1-of-1 Rate)"
    },
    {
      id: "flash-flowing-goldfish",
      title: "Veiltail Goldfish & River Flora",
      category: "Fauna",
      minSize: '7.0" (Inches)',
      image: "/images/demo/lucky-leaf/flash-flowing-goldfish.jpg",
      description: "Fluid, ribbon-like veil fins descending harmoniously through delicate river branches and shaded botanical leaves.",
      isOneOfOne: true,
      status: "Available",
      recommendedPlacement: "Forearm, Side ribcage, or Spine",
      estimatedPrice: "$290 – $350 (Special 1-of-1 Rate)"
    }
  ] as FlashDesign[],

  // Portfolio Works (Real client healed photos)
  portfolioWorks: [
    {
      id: "work-dagger-cherry",
      title: "Dagger & Blooming Sakura",
      category: "Symbolic",
      image: "/images/demo/lucky-leaf/work-dagger-cherry.jpg",
      placement: "Thigh",
      caption: "Medieval fine-line dagger intertwined with delicate blossoming cherry branches and falling petals."
    },
    {
      id: "work-ginkgo-tattoo",
      title: "The Lucky Ginkgo Leaf",
      category: "Botanical",
      image: "/images/demo/lucky-leaf/work-ginkgo-tattoo.jpg",
      placement: "Inner Forearm",
      caption: "The studio's signature Ginkgo biloba leaf symbol of resilience and lasting peace."
    },
    {
      id: "work-lily-valley",
      title: "Lily of the Valley Clavicle",
      category: "Botanical",
      image: "/images/demo/lucky-leaf/work-lily-valley.jpg",
      placement: "Clavicle",
      caption: "Soft bell-shaped botanical florets contoured naturally along the collarbone."
    },
    {
      id: "work-moth",
      title: "Symmetrical Botanical Moth",
      category: "Fauna",
      image: "/images/demo/lucky-leaf/work-moth.jpg",
      placement: "Above Elbow / Tricep",
      caption: "Geometric nocturnal moth with stippled wing eyes and velvety antennae."
    },
    {
      id: "work-cherry-blossom",
      title: "Drifting Sakura Shoulder Branch",
      category: "Botanical",
      image: "/images/demo/lucky-leaf/work-cherry-blossom.jpg",
      placement: "Shoulder / Back",
      caption: "Delicate branch with softly shaded cherry blossom petals drifting gracefully downward."
    },
    {
      id: "work-daffodil",
      title: "Spring Botanical Daffodils",
      category: "Botanical",
      image: "/images/demo/lucky-leaf/work-daffodil.jpg",
      placement: "Forearm",
      caption: "Crisp botanical illustration with gentle pointillism stippling on the leaves."
    },
    {
      id: "work-tulip",
      title: "Single-Needle Minimalist Tulip",
      category: "Botanical",
      image: "/images/demo/lucky-leaf/work-tulip.jpg",
      placement: "Inner Bicep",
      caption: "A single elegant tulip rendered in ultra-fine line art, graceful and timeless."
    },
    {
      id: "work-foliage-sleeve",
      title: "Botanical Vine & Leaf Wrap",
      category: "Botanical",
      image: "/images/demo/lucky-leaf/work-foliage-sleeve.jpg",
      placement: "Forearm & Wrist Wrap",
      caption: "Organic wild leaves and vines flowing naturally around forearm musculature."
    }
  ] as PortfolioWork[],

  // Verified Reviews (100% Real from Google 5.0 Star Feedback)
  reviews: [
    {
      id: "review-katie",
      author: "Katie Ventresca",
      badge: "Local Guide • 14 reviews",
      rating: 5,
      timeAgo: "3 months ago",
      priceRange: "$200–250",
      services: ["Fine-line Tattoo", "Tattoo Aftercare", "Custom Design"],
      highlightTheme: "Paper Cranes Project",
      text: "I'm over the moon excited about my two new tattoo additions from Lucky Leaf Tattoo! Din is AMAZING and the space he has created for his clients is clean, bright, welcoming, and comforting. The tattoos were so easy and nearly pain free and I credit a lot of that to Din making sure I was comfortable and taken care of for my session. His journey of tattooing 1,000 paper cranes is so fun and unique. I highly recommend and would 100% go back for another tattoo."
    },
    {
      id: "review-nicole",
      author: "Nicole Huard",
      badge: "8 reviews",
      rating: 5,
      timeAgo: "10 months ago",
      priceRange: "$300–350",
      services: ["Fine-line Tattoo", "Tattoo for Women", "Custom Lettering"],
      highlightTheme: "Non-Intimidating",
      text: "Din is awesome! He makes the tattoo process so much less intimidating than other shops. His communication is excellent pre-appointment. His work is impeccable. His patience is superb. I wouldn't go anywhere else now that I've discovered Lucky Leaf!"
    },
    {
      id: "review-kaitlyn",
      author: "Kaitlyn Braun",
      badge: "5 reviews",
      rating: 5,
      timeAgo: "2 years ago",
      priceRange: "$250–300",
      services: ["Custom Botanical Tattoo", "Fine Linework"],
      highlightTheme: "Clean & Welcoming",
      text: "Din is the most amazing tattoo artist. Not only is his shop clean and welcoming, he is also a wonderful human being. I'll continue to go to Din for my tattoos for the rest of my life."
    }
  ] as ClientReview[],

  // Frequently Asked Questions
  faq: [
    {
      q: "Where is Lucky Leaf Tattoo located and is there parking?",
      a: "We are located at 1809 Hertel Avenue in the heart of North Buffalo (Hertel Arts & Dining District). Free and convenient street parking is available along Hertel Ave and adjacent residential side streets."
    },
    {
      q: "Why is the studio appointment-only and private?",
      a: "We believe getting a tattoo should be a calm, restorative, and personal experience. By keeping our studio private and appointment-only, you receive Din's undivided focus without strangers or noise walking through during your session."
    },
    {
      q: "When will I see the design sketch for my custom tattoo?",
      a: "Din creates bespoke illustrations for each custom piece and will send a detailed sketch 3 to 5 days before your appointment date. You will have full opportunity to review and request any fine adjustments."
    },
    {
      q: "What is your deposit and rescheduling policy?",
      a: "A non-refundable deposit is required to lock in your spot and is deducted from your final balance. You can reschedule once with at least 5 days notice. Arriving more than 20 minutes late without notice forfeits the deposit."
    },
    {
      q: "How does claiming a 1-of-1 Flash Design work?",
      a: "Designs in our Available Flash gallery are tattooed strictly ONCE and never repeated. When you claim a flash piece through our booking desk, it is immediately reserved for you on the calendar with priority scheduling and special rate."
    }
  ]
};
