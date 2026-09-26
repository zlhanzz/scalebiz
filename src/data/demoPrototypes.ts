export interface ServiceItem {
  name: string;
  price: string;
  duration: string;
  description: string;
  popular?: boolean;
}

export interface ServiceCategory {
  title: string;
  badge: string;
  items: ServiceItem[];
}

export interface TestimonialItem {
  author: string;
  location: string;
  rating: number;
  date: string;
  review: string;
  service: string;
}

export interface BusinessHours {
  day: string;
  hours: string;
  isToday?: boolean;
}

export interface PrototypeData {
  slug: string;
  businessName: string;
  category: string;
  tagline: string;
  announcement: string;
  owners: string;
  phone: string;
  phoneDisplay: string;
  address: string;
  cityStateZip: string;
  rating: number;
  reviewCount: number;
  messengerUrl: string;
  mapsUrl: string;
  heroImage: string;
  galleryImages: {
    src: string;
    alt: string;
    caption: string;
    tag: string;
  }[];
  hours: BusinessHours[];
  serviceCategories: ServiceCategory[];
  testimonials: TestimonialItem[];
  amenities: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const DEMO_PROTOTYPES: Record<string, PrototypeData> = {
  "trendy-nail-spa": {
    slug: "trendy-nail-spa",
    businessName: "Trendy Nail Spa",
    category: "Boutique Nail Salon & Spa",
    tagline: "Modern Nail Artistry, Luxury Pedicures & Pure Relaxation in Lockport",
    announcement: "✨ Walk-ins Welcome • For custom nail art appointments, message us directly!",
    owners: "Bea & Hai",
    phone: "+17162803091",
    phoneDisplay: "(716) 280-3091",
    address: "1195 Lincoln Ave",
    cityStateZip: "Lockport, NY 14094",
    rating: 4.7,
    reviewCount: 104,
    messengerUrl: "https://m.me/100083194757081",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Trendy+Nail+Spa+1195+Lincoln+Ave+Lockport+NY",
    heroImage: "/images/demo/trendy/hero.jpg",
    galleryImages: [
      {
        src: "/images/demo/trendy/glazed-almond.jpg",
        alt: "Glazed Donut Almond Manicure",
        caption: "Signature Pearlescent Glaze Manicure",
        tag: "Gel Nails",
      },
      {
        src: "/images/demo/trendy/pedicure-spa.jpg",
        alt: "Luxury Rose Pedicure Spa",
        caption: "Deluxe Herbal Foot Spa with Rose Petals",
        tag: "Spa Pedicure",
      },
      {
        src: "/images/demo/trendy/french-gold.jpg",
        alt: "French Manicure with Gold Foil Accents",
        caption: "Modern French Tips with Subtle Gold Sparkle",
        tag: "Nail Art",
      },
    ],
    hours: [
      { day: "Monday - Friday", hours: "9:30 AM – 7:00 PM" },
      { day: "Saturday", hours: "9:30 AM – 6:00 PM" },
      { day: "Sunday", hours: "11:00 AM – 4:00 PM" },
    ],
    serviceCategories: [
      {
        title: "Signature Manicures",
        badge: "Most Requested",
        items: [
          {
            name: "Classic Spa Manicure",
            price: "$25",
            duration: "30 mins",
            description: "Nail shaping, gentle cuticle care, light moisturizing hand massage, and regular high-shine polish.",
          },
          {
            name: "Long-Wear Gel Manicure",
            price: "$40",
            duration: "45 mins",
            description: "Full dry manicure with LED-cured high-gloss gel polish. Zero smudge, chip-free for up to 3 weeks.",
            popular: true,
          },
          {
            name: "Deluxe Collagen Hand Spa",
            price: "$50",
            duration: "50 mins",
            description: "Gel manicure paired with warm organic collagen gloves, essential oil hot towel wrap, and deep massage.",
          },
          {
            name: "Dipping Powder (SNS) Full Set",
            price: "$52",
            duration: "50 mins",
            description: "Vitamin-fortified dip powder overlay. No UV light needed, lightweight yet durable natural nail protection.",
            popular: true,
          },
        ],
      },
      {
        title: "Luxury Pedicures",
        badge: "Total Relaxation",
        items: [
          {
            name: "Essential Spa Pedicure",
            price: "$38",
            duration: "40 mins",
            description: "Warm whirlpool soak, nail shaping, cuticle trim, pumice heel buffing, and warm lotion massage.",
          },
          {
            name: "Deluxe Lavender & Rose Spa",
            price: "$55",
            duration: "55 mins",
            description: "Herbal rose bath soak, organic sugar scrub exfoliation, lavender clay mask with hot steaming towels.",
            popular: true,
          },
          {
            name: "Detox Volcano Hot Stone Pedicure",
            price: "$68",
            duration: "65 mins",
            description: "Bubbling detox volcanic crystals, callus treatment, warm basalt stone massage, and deep hydrating paraffin wax.",
            popular: true,
          },
        ],
      },
      {
        title: "Nail Enhancements & Art",
        badge: "Custom Styling",
        items: [
          {
            name: "Full Set Gel-X Extensions",
            price: "$65+",
            duration: "60 mins",
            description: "Full-cover soft gel tips that cause zero damage to natural nail beds. Includes your choice of shape & length.",
            popular: true,
          },
          {
            name: "Ombré / Baby Boomer Finish",
            price: "+$15",
            duration: "15 mins",
            description: "Seamless gradient blend from soft nude pink into crisp milky white or pastel tones.",
          },
          {
            name: "Chrome Glaze / Hailey Bieber Nails",
            price: "+$12",
            duration: "10 mins",
            description: "Ultra-reflective glazed chrome powder buffed over neutral gel base.",
          },
          {
            name: "Hand-Painted Custom Nail Art",
            price: "$5 - $25",
            duration: "15-30 mins",
            description: "Intricate floral lines, geometric french tips, abstract swirls, or seasonal holiday motifs.",
          },
        ],
      },
    ],
    testimonials: [
      {
        author: "Sarah M.",
        location: "Lockport Local",
        rating: 5,
        date: "2 weeks ago",
        review: "Bea and Hai are phenomenal! The salon is always immaculate, clean, and so relaxing. My gel manicures easily last 3+ weeks without any chipping. Best nail spot in Lockport by far!",
        service: "Long-Wear Gel Manicure",
      },
      {
        author: "Jennifer R.",
        location: "Niagara County",
        rating: 5,
        date: "1 month ago",
        review: "Hai did an incredible job on my dip powder ombré set. Very gentle, took his time, and listened to exactly what I wanted. Such a welcoming family atmosphere!",
        service: "Dipping Powder Ombré",
      },
      {
        author: "Ashley K.",
        location: "Lockport, NY",
        rating: 5,
        date: "3 weeks ago",
        review: "The Volcano Hot Stone Pedicure was pure heaven after a long week on my feet. Clean foot baths, sterilized tools, and top-tier service. Will definitely be a regular!",
        service: "Detox Volcano Pedicure",
      },
    ],
    amenities: [
      {
        title: "Medical-Grade Hygiene",
        description: "All metal instruments are sealed and autoclaved. Disposable liners and single-use buffers for every client.",
        icon: "✨",
      },
      {
        title: "Expert Master Technicians",
        description: "Over a decade of combined artistry specializing in damage-free natural nail care and trendsetting nail art.",
        icon: "💅",
      },
      {
        title: "Non-Toxic Premium Products",
        description: "We use high-grade 7-free and 10-free gel formulations that preserve nail strength and prevent yellowing.",
        icon: "🌿",
      },
      {
        title: "Convenient Lockport Location",
        description: "Located on Lincoln Ave with generous free parking directly in front of the salon for quick in-and-out access.",
        icon: "📍",
      },
    ],
  },
};
