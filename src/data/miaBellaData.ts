export interface ServiceItem {
  id: string;
  name: string;
  category: "vivids" | "blonding" | "cuts" | "boutique";
  price: string;
  priceNum: number;
  duration: string;
  description: string;
  popular?: boolean;
  tag?: string;
  formulaNote?: string;
}

export interface BoutiqueItem {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  category: "oils" | "crystals" | "candles" | "ritual";
  description: string;
  ingredientsOrMaterials: string;
  badge?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "vivid" | "peekaboo" | "blonding" | "boutique";
  image: string;
  description: string;
  technique: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
}

export interface MiaBellaData {
  businessName: string;
  tagline: string;
  subtitle: string;
  phone: string;
  phoneLink: string;
  address: string;
  fullStreetAddress: string;
  googleMapsUrl: string;
  directionsUrl: string;
  mapEmbedUrl: string;
  mapEmbedDarkUrl: string;
  mapEmbedSatelliteUrl: string;
  parkingNote: string;
  townArea: string;
  hoursNote: string;
  walkInPolicy: string;
  hours: {
    day: string;
    time: string;
    isOpenToday?: boolean;
    statusBadge?: string;
  }[];
  services: ServiceItem[];
  boutique: BoutiqueItem[];
  gallery: GalleryItem[];
  reviews: ReviewItem[];
  pillars: {
    title: string;
    subtitle: string;
    description: string;
  }[];
}

export const MIA_BELLA_DATA: MiaBellaData = {
  businessName: "Mia Bella's Hair Salon & Magick Boutique",
  tagline: "Award-Winning Vivid Color Alchemy & Metaphysical Beauty Sanctuary",
  subtitle: "Where vintage pinup glamour meets high-art color wizardry. Specializing in vivid fantasy hair transformations, dimensional blonding, and sacred botanical hair rituals in Lockport, NY.",
  phone: "(716) 395-6352",
  phoneLink: "tel:+17163956352",
  address: "329 East Ave, Lockport, NY 14094",
  fullStreetAddress: "329 East Ave, Lockport, NY 14094",
  googleMapsUrl: "https://www.google.com/maps/place/Mia+Bella%E2%80%99s+Hair+Salon/data=!4m7!3m6!1s0x89d37f276bd762d3:0xf7c370fc0a9775fe!8m2!3d43.1744367!4d-78.6773152",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=329+East+Ave+Lockport+NY+14094",
  mapEmbedUrl: "https://maps.google.com/maps?q=329+East+Ave,+Lockport,+NY+14094&t=&z=16&ie=UTF8&iwloc=&output=embed",
  mapEmbedDarkUrl: "https://maps.google.com/maps?q=329+East+Ave,+Lockport,+NY+14094&t=&z=16&ie=UTF8&iwloc=&output=embed",
  mapEmbedSatelliteUrl: "https://maps.google.com/maps?q=329+East+Ave,+Lockport,+NY+14094&t=h&z=17&ie=UTF8&iwloc=&output=embed",
  parkingNote: "Free dedicated customer parking available directly in front of the salon and along historic East Ave.",
  townArea: "Lockport & Niagara County, NY",
  hoursNote: "Owned and operated by an Award-Winning Color Specialist.",
  walkInPolicy: "Walk-ins are warmly welcomed during business hours. Appointments recommended for multi-hour vivid transformations.",
  hours: [
    { day: "Sunday", time: "By Appointment Only", statusBadge: "By Appt" },
    { day: "Monday", time: "Closed (Formulation & Rest)", statusBadge: "Closed" },
    { day: "Tuesday", time: "12:00 PM – 8:00 PM", statusBadge: "Open 12-8pm" },
    { day: "Wednesday", time: "Closed (Formulation & Rest)", statusBadge: "Closed" },
    { day: "Thursday", time: "12:00 PM – 8:00 PM", statusBadge: "Open 12-8pm" },
    { day: "Friday", time: "12:00 PM – 8:00 PM", statusBadge: "Open 12-8pm" },
    { day: "Saturday", time: "12:00 PM – 8:00 PM", statusBadge: "Open 12-8pm" },
  ],
  pillars: [
    {
      title: "Award-Winning Color Alchemy",
      subtitle: "Master Vivids & Color Correction",
      description: "From deep electric sapphire to holographic prism underlights, every shade is custom-mixed using high-pigment professional formulations that lock in vibrancy with zero harsh burnout.",
    },
    {
      title: "Metaphysical Magick Boutique",
      subtitle: "Apothecary, Crystals & Rituals",
      description: "Browse charged healing crystals, hand-poured intention candles, artisanal herbal hair oils, and moon-attuned botanical mists crafted to align your outward beauty with your inner vibration.",
    },
    {
      title: "Vintage Gothic Glamour Atmosphere",
      subtitle: "Intimate One-on-One Haven",
      description: "Escape generic white-box salon chairs. Step into an enchanting ambiance of ornate gilded mirrors, deep mahogany stations, aromatic incense, and focused artistic pampering.",
    },
    {
      title: "Botanical Bond Protection",
      subtitle: "Zero-Compromise Hair Integrity",
      description: "Every double-process lightening service includes molecular bond protectors and restorative plant conditioning to leave your hair silken, touchable, and radiantly healthy.",
    },
  ],
  services: [
    // Vivid Alchemy
    {
      id: "vivid-electric-blue",
      name: "Electric Blue & Midnight Jewel Tones",
      category: "vivids",
      price: "$195 – $260",
      priceNum: 195,
      duration: "3 – 4 Hours",
      popular: true,
      tag: "Client Favorite",
      formulaNote: "Lightening to level 9/10 + dual-tone cobalt, cerulean, and sapphire pigment overlay.",
      description: "Custom-formulated oceanic blues, deep cobalt, and metallic midnight tones layered for hypnotic dimension that catches the light from every angle.",
    },
    {
      id: "rainbow-peekaboo-prism",
      name: "Holographic Rainbow & Hidden Peekaboo",
      category: "vivids",
      price: "$180 – $240",
      priceNum: 180,
      duration: "2.5 – 3.5 Hours",
      popular: true,
      tag: "Signature Specialty",
      formulaNote: "Sectioned underlight canvas + 6-color prism placement (magenta, solar yellow, lime, electric cyan, violet).",
      description: "A breathtaking burst of full-spectrum vivid rainbow hidden underneath your natural or blonde canopy. Show off your color when styled up, or keep it subtle for professional settings.",
    },
    {
      id: "full-spectrum-vivid",
      name: "Full Spectrum All-Over Fantasy Color",
      category: "vivids",
      price: "$240 – $340",
      priceNum: 240,
      duration: "3.5 – 5 Hours",
      popular: false,
      tag: "Total Transformation",
      formulaNote: "Global scalp bleach-and-tone + multi-dimensional creative block coloring & bond repair.",
      description: "The complete mystical metamorphosis. Full head lightening followed by custom multi-tonal placement (emerald, magenta, amethyst, cosmic dusk, or neon sunset).",
    },
    {
      id: "corrective-color-rescue",
      name: "Color Correction & Tone Rescue",
      category: "vivids",
      price: "$260 – $380",
      priceNum: 260,
      duration: "4 – 6 Hours",
      popular: false,
      tag: "Specialist Consultation",
      formulaNote: "Pigment extraction, banding removal, restorative bond reconstructor, and tone neutralization.",
      description: "Expert restoration for uneven box dyes, stubborn dark bands, or color mishaps. We gently rebuild hair integrity while steering you to your dream shade safely.",
    },

    // Blonding & Balayage
    {
      id: "moonlit-platinum-foilayage",
      name: "Moonlit Platinum & Ice Blonde Foilayage",
      category: "blonding",
      price: "$210 – $280",
      priceNum: 210,
      duration: "3 – 4 Hours",
      popular: true,
      tag: "High-Lift Mastery",
      formulaNote: "Precision foil placement + cool ash or violet glossing toner + botanical moisture mask.",
      description: "Seamless, seamless brightness from root to tip. Ultra-clean platinum and pearl tones achieved with protective bond sealers for crisp, luminous results.",
    },
    {
      id: "lived-in-balayage",
      name: "Lived-In Dimensional Balayage & Shadow Root",
      category: "blonding",
      price: "$185 – $245",
      priceNum: 185,
      duration: "2.5 – 3.5 Hours",
      popular: false,
      tag: "Low-Maintenance Luxury",
      formulaNote: "Hand-painted clay lightener + smoked root melt for seamless 4-to-6 month grow-out.",
      description: "Soft, organic ribbons of golden honey, caramel, or champagne blonde melted seamlessly into your natural base for effortlessly chic, low-maintenance beauty.",
    },
    {
      id: "root-touchup-gloss",
      name: "Base Retouch & Amethyst Gloss Glaze",
      category: "blonding",
      price: "$95 – $130",
      priceNum: 95,
      duration: "1.5 – 2 Hours",
      popular: false,
      tag: "Maintenance",
      formulaNote: "Grey coverage or root base touch + all-over acidic shine glaze.",
      description: "Targeted regrowth coverage paired with a conditioning high-gloss glaze that revitalizes tone, closes the cuticle, and imparts diamond reflection.",
    },

    // Precision Cuts & Glamour
    {
      id: "signature-sculptural-cut",
      name: "Signature Sculptural Haircut & Blowout",
      category: "cuts",
      price: "$55",
      priceNum: 55,
      duration: "60 Mins",
      popular: true,
      tag: "Everyday Glamour",
      formulaNote: "Dry & wet customized shear detailing + scalp massage + round-brush blowout.",
      description: "Tailored to your bone structure, hair texture, and natural growth pattern. Includes clarifying botanical wash, tension-relieving scalp massage, and bouncy blowout.",
    },
    {
      id: "vintage-pinup-curls",
      name: "Vintage Pinup Styling & Velvet Curls",
      category: "cuts",
      price: "$65 – $85",
      priceNum: 65,
      duration: "60 – 75 Mins",
      popular: false,
      tag: "Event & Glam",
      formulaNote: "Hot roller set or finger-wave iron sculpting + brush-out setting spray.",
      description: "True retro Hollywood & pinup glam waves inspired by vintage styling. Long-lasting hold with silken movement for photo shoots, weddings, or nights out.",
    },
    {
      id: "botanical-scalp-steam",
      name: "Botanical Scalp Detox & Steam Therapy Ceremony",
      category: "cuts",
      price: "$50",
      priceNum: 50,
      duration: "45 Mins",
      popular: false,
      tag: "Restorative Ritual",
      formulaNote: "Herbal clay scalp scrub + warm steam infusion + moon-charged botanical oil.",
      description: "An invigorating sensory scalp detox that cleanses follicle buildup, calms sensitive scalp irritation, and deeply nourishes the root bed with warm steam and botanical elixirs.",
    },
  ],
  boutique: [
    {
      id: "moon-charged-hair-oil",
      name: "Full-Moon Charged Botanical Hair Elixir",
      price: "$28",
      priceNum: 28,
      category: "oils",
      description: "Organic cold-pressed argan, rosemary, jojoba, and amla oils infused with lavender buds and charged under the full moon for root stimulation and glassy shine.",
      ingredientsOrMaterials: "Argania Spinosa, Rosmarinus Officinalis, Simmondsia Chinensis, Dried French Lavender, Clear Quartz Essence.",
      badge: "Handcrafted In-House",
    },
    {
      id: "amethyst-scalp-comb",
      name: "Carved Raw Amethyst Scalp Comb",
      price: "$36",
      priceNum: 36,
      category: "crystals",
      description: "Hand-carved solid natural amethyst stone comb designed for tension-relieving meridian head massage, energy clearing, and promoting scalp circulation.",
      ingredientsOrMaterials: "100% Genuine Natural Untreated Purple Amethyst Stone.",
      badge: "Energetic Beauty Tool",
    },
    {
      id: "radiance-intention-candle",
      name: "Gilded Velvet Radiance Intention Candle",
      price: "$24",
      priceNum: 24,
      category: "candles",
      description: "Hand-poured coconut-soy wax candle topped with rose quartz chips, dried jasmine, and gold leaf. Scented with notes of dark plum, amber, and vanilla musk.",
      ingredientsOrMaterials: "Pure Coconut-Soy Wax, Wooden Wick, Rose Quartz, Jasmine Flowers, Phthalate-Free Fragrance.",
      badge: "Artisanal Batch",
    },
    {
      id: "auric-rosemary-mist",
      name: "Sacred Rosemary & Rosewater Aura Mist",
      price: "$22",
      priceNum: 22,
      category: "ritual",
      description: "Refreshing botanical distillate for hair and facial aura. Closes hair cuticles after washing, eliminates static, and resets your energetic space throughout the day.",
      ingredientsOrMaterials: "Organic Bulgarian Rose Hydrosol, Rosemary Distillate, Witch Hazel, Moon Water.",
      badge: "Boutique Exclusive",
    },
  ],
  gallery: [
    {
      id: "gal-electric-blue",
      title: "Electric Cobalt & Midnight Sapphire Dimension",
      category: "vivid",
      image: "/images/demo/mia-bella/electric-blue-hair.jpg",
      technique: "Multi-tonal vivid placement with sapphire root depth",
      description: "Custom blue alchemy showcasing vivid cerulean, midnight navy, and electric cobalt reflection on straight, glossy hair.",
    },
    {
      id: "gal-metallic-blue-layers",
      title: "Steel Teal & Metallic Blue Face-Framing Layers",
      category: "vivid",
      image: "/images/demo/mia-bella/metallic-blue-layers.jpg",
      technique: "Sculptural curtain fringe with metallic blue-black dimension",
      description: "Dimensional blue-grey and teal metallic ribboning perfectly accentuating textured layers and curved side bangs.",
    },
    {
      id: "gal-rainbow-prism",
      title: "Hidden Holographic Prism Rainbow Peekaboo",
      category: "peekaboo",
      image: "/images/demo/mia-bella/rainbow-peekaboo-prism.jpg",
      technique: "Concealed 6-spectrum rainbow prism under natural blonde",
      description: "A magical peekaboo reveal featuring vibrant magenta, sunshine yellow, lime green, royal blue, and violet underlights.",
    },
    {
      id: "gal-apothecary-interior",
      title: "The Metaphysical Apothecary & Styling Sanctuary",
      category: "boutique",
      image: "/images/demo/mia-bella/salon-interior.jpg",
      technique: "Antique gold gilded mirrors & apothecary formulation shelves",
      description: "Our enchanting Lockport salon floor featuring vintage velvet seating, antique gilded stations, and artisanal herbal shelves.",
    },
    {
      id: "gal-elixirs-flatlay",
      title: "Moon-Charged Botanicals & Crystal Adornments",
      category: "boutique",
      image: "/images/demo/mia-bella/boutique-elixirs.jpg",
      technique: "Handcrafted hair potions, amethyst combs & tarot pairings",
      description: "Everyday hair care elevated into sacred self-care rituals with in-house blended herbal oils and raw gemstones.",
    },
  ],
  reviews: [
    {
      id: "rev-1",
      author: "Samantha R.",
      location: "Lockport, NY",
      rating: 5,
      date: "2 weeks ago",
      service: "Electric Blue Vivids & Bond Treatment",
      comment: "I’ve gone to salons in Buffalo and Rochester and nobody has ever nailed vibrant blue without frying my hair like Mia Bella does. She is an absolute color wizard! My hair feels so soft and the color hasn't bled or turned muddy. Plus, the boutique vibe is incredible.",
    },
    {
      id: "rev-2",
      author: "Brianna M.",
      location: "Niagara Falls, NY",
      rating: 5,
      date: "1 month ago",
      service: "Hidden Rainbow Peekaboo & Cut",
      comment: "The hidden rainbow under my hair is mind-blowing! I can tie it up in a bun for work and when I let it down at night it’s this crazy vibrant prism. Her salon is so relaxing with the crystals and candles. Definitely coming back for her moon hair oil too!",
    },
    {
      id: "rev-3",
      author: "Jessica T.",
      location: "Clarence, NY",
      rating: 5,
      date: "3 weeks ago",
      service: "Color Correction & Sculptural Cut",
      comment: "She saved my hair from a terrible box dye disaster. She took the time to explain the science and chemistry behind lifting it safely, and paired it with a botanical steam treatment. Truly an award-winning artist!",
    },
    {
      id: "rev-4",
      author: "Kelsey L.",
      location: "Lockport, NY",
      rating: 5,
      date: "Just recently",
      service: "Haircut & Magick Boutique Elixirs",
      comment: "Walked in on a Thursday afternoon without an appointment. Loved the welcoming energy right away. The haircut is precise and bouncy, and the rose aura mist smells like heaven. Best salon experience in Western New York!",
    },
  ],
};
