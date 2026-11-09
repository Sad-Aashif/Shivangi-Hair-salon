import { ServiceItem, ReviewItem } from '../types';

export const SALON_INFO = {
  name: "Shivangi Hair Salon",
  headline: "Sirf Haircut Nahi, Aapka Pura Look Upgrade Karte Hain.",
  subHeadline: "Haircuts, beard detailing, and grooming in Bhopal.",
  tagline: "Sharp Cuts & Clean Grooming",
  phone: "+91 9575830421",
  rawPhone: "919575830421",
  whatsAppUrl: "https://wa.me/919575830421",
  instagramHandle: "@shivangihairsalon.in",
  instagramUrl: "https://www.instagram.com/shivangihairsalon.in/",
  facebookUrl: "https://www.facebook.com/people/Shivangi-Hair-Salon/61594677009353/?rdid=rYcbsxiBq3xAj4fr&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GM1K42WCV%2F%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio",
  address: "7897+5X4, Bhensakhedi Road, near The Fitness Planet, Bhopal, MP 462030",
  plusCode: "7897+5X4 Bhopal",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=7897%2B5X4,+Bhensakhedi+Road,+near+The+Fitness+Planet,+Bhopal,+MP+462030",
  schedule: {
    days: "Mon, Wed – Sun (Tuesday Closed)",
    hours: "8:30 AM – 9:30 PM",
    closedDay: "Tuesday",
  },
  rating: 4.9,
  reviewCount: 148,
  establishedYear: 2018,
};

export const TRUST_SIGNALS = [
  { icon: 'star', label: '4.9 Google Rating', sub: '148+ Happy Bhopal Customers' },
  { icon: 'uv', label: 'UV Cleaned Tools', sub: 'Sanitized after every customer' },
  { icon: 'blade', label: '100% Fresh Blades', sub: 'New blade opened in front of you' },
  { icon: 'walkin', label: 'Walk-ins Welcome', sub: 'WhatsApp bookings get priority' },
];

export const SERVICES: ServiceItem[] = [
  // Haircuts & Fades
  {
    id: "sig-cut",
    name: "Signature Haircut & Skin Fade",
    category: "hair",
    durationMinutes: 45,
    priceMin: 350,
    priceMax: 450,
    shortDesc: "Haircut styled for your face shape with a smooth skin or low fade, refreshing hair wash, and natural matte styling.",
    inclusions: [
      "Quick face-shape & hair growth check",
      "Clean scissor cut & smooth clipper fade",
      "Refreshing shampoo hair wash",
      "Blow-dry & natural matte wax finish"
    ],
    popular: true,
  },
  {
    id: "executive-scissor",
    name: "Classic Scissor Cut & Taper",
    category: "hair",
    durationMinutes: 40,
    priceMin: 300,
    priceMax: 400,
    shortDesc: "Neat scissor haircut with clean sideburns, sharp neck line-up, and a smart everyday finish for office or daily wear.",
    inclusions: [
      "Style check according to your hair volume",
      "Full scissor layering & side taper",
      "Warm foam neck razor clean-up",
      "Cooling hair tonic massage"
    ],
  },
  {
    id: "tattoo-line",
    name: "Sharp Razor Line & Hair Design Cut",
    category: "hair",
    durationMinutes: 50,
    priceMin: 500,
    priceMax: 700,
    shortDesc: "Clean skin fade with a sharp razor side-part or custom hair line design using a fresh straight blade.",
    inclusions: [
      "Custom side-part or razor line design",
      "Fresh single-use straight blade detailing",
      "Soothing after-cut skin spray",
      "Smooth all-around fade blend"
    ],
    popular: true,
  },

  // Beard Trimming
  {
    id: "beard-detail",
    name: "Sharp Beard Trim & Razor Line-Up",
    category: "beard",
    durationMinutes: 30,
    priceMin: 200,
    priceMax: 300,
    shortDesc: "Crisp cheek and neck lines with a fresh blade, warm towel steam to soften hair, and nourishing beard oil.",
    inclusions: [
      "Warm steam towel to soften beard",
      "Fresh single-use blade for sharp cheek & neck lines",
      "Mustache & jawline length balancing",
      "Cooling alum rub & non-sticky beard oil"
    ],
    popular: true,
  },
  {
    id: "royal-shave",
    name: "Hot Towel Straight Razor Shave",
    category: "beard",
    durationMinutes: 35,
    priceMin: 250,
    priceMax: 350,
    shortDesc: "Relaxing warm towel steam, rich shaving foam, and a smooth zero-irritation shave with a brand-new blade.",
    inclusions: [
      "Pre-shave softening oil",
      "Warm rich lather application",
      "Smooth shave with a fresh sealed blade",
      "Cool towel press & soothing aftershave balm"
    ],
  },

  // Scalp & Facial Care
  {
    id: "scalp-spa",
    name: "Relaxing Head Massage & Hair Spa",
    category: "spa",
    durationMinutes: 40,
    priceMin: 600,
    priceMax: 800,
    shortDesc: "Deeply relaxing 20-minute head and shoulder massage, warm hair steam, and anti-dandruff scalp wash.",
    inclusions: [
      "Scalp dryness & dandruff check",
      "20-minute warm oil head & neck massage",
      "Gentle steam towel treatment",
      "Cool wash & hair strengthening serum"
    ],
    popular: true,
  },
  {
    id: "charcoal-detox",
    name: "Charcoal Face Clean-Up & Detan",
    category: "spa",
    durationMinutes: 25,
    priceMin: 300,
    priceMax: 400,
    shortDesc: "Removes dust, oil, and sun tan with an active charcoal scrub, warm steam, and a cooling aloe vera mask.",
    inclusions: [
      "Deep face wash & warm pore-opening steam",
      "Charcoal scrub to clear blackheads & tan",
      "Cooling aloe vera & mint face pack"
    ],
  },
  {
    id: "royal-experience",
    name: "Full Grooming Combo (Haircut + Beard + Massage + Face Clean-Up)",
    category: "spa",
    durationMinutes: 90,
    priceMin: 1200,
    priceMax: 1500,
    shortDesc: "Complete 90-minute makeover: Signature Haircut, Sharp Beard Line-Up, Head Massage Spa, and Charcoal Face Clean-Up.",
    inclusions: [
      "All 4 popular salon services included",
      "25-minute relaxing head, neck & shoulder massage",
      "Easy daily hair & beard styling tips",
      "Zero-wait priority chair booking"
    ],
    popular: true,
  }
];

export interface QuizOption {
  id: string;
  label: string;
  description: string;
}

export const QUIZ_QUESTIONS = {
  faceShapes: [
    { id: 'square', label: 'Square / Strong Jaw', description: 'Broad forehead and a sharp, wide jawline' },
    { id: 'oval', label: 'Oval / Balanced', description: 'Evenly balanced face length with a slightly rounded chin' },
    { id: 'round', label: 'Round Face', description: 'Full cheeks with soft corners around the chin and jaw' },
    { id: 'diamond', label: 'Sharp Cheekbones / Angular', description: 'Wide cheekbones with a narrower forehead and chin' },
  ],
  hairTypes: [
    { id: 'straight', label: 'Straight & Silky', description: 'Sits flat easily — looks great with textured volume on top' },
    { id: 'wavy', label: 'Wavy / Medium Thick', description: 'Natural wave that holds side parts, crops, and fades well' },
    { id: 'coarse', label: 'Thick or Curly', description: 'Heavy volume — looks super clean with short faded sides' },
    { id: 'receding', label: 'Thinning / High Forehead', description: 'Needs a smart crop or neat short cut that makes hair look fuller' },
  ],
  vibes: [
    { id: 'executive', label: 'Clean Office Look', description: 'Neat scissor cut and tidy sides that stay sharp all week' },
    { id: 'streetwear', label: 'Trendy Skin Fade', description: 'Sharp drop fade on the sides with textured volume on top' },
    { id: 'classic', label: 'Classic Gentleman', description: 'Clean side part with a well-shaped beard and razor line-up' },
    { id: 'edgy', label: 'Bold Razor Line & Fade', description: 'High skin fade with a crisp razor line and sharp beard edges' },
  ]
};

export interface RecommendationResult {
  title: string;
  fadeType: string;
  beardAdvice: string;
  stylingTip: string;
  matchScore: string;
}

export function computeQuizRecommendation(
  _face: string,
  _hair: string,
  vibe: string
): RecommendationResult {
  if (vibe === 'streetwear') {
    return {
      title: 'Textured Crop with Low Drop Skin Fade',
      fadeType: 'Clean low-to-mid skin fade on the sides with a sharp neck line',
      beardAdvice: 'Short neat stubble with a crisp razor line on the cheeks',
      stylingTip: 'Rub a pinch of matte hair powder or clay on dry hair with your fingers.',
      matchScore: '98% Style Match',
    };
  }

  if (vibe === 'executive') {
    return {
      title: 'Smart Scissor Cut with Clean Low Taper',
      fadeType: 'Neat scissor taper around the ears and neck — not too bare',
      beardAdvice: 'Well-trimmed beard blended smoothly into the sideburns',
      stylingTip: 'Use a light hair cream after towel-drying and comb neatly to one side.',
      matchScore: '96% Style Match',
    };
  }

  if (vibe === 'edgy') {
    return {
      title: 'High Skin Fade with Sharp Razor Parting',
      fadeType: 'High zero fade with a clean straight-blade line on the side',
      beardAdvice: 'Sharp angular beard or goatee with crisp neck and cheek edges',
      stylingTip: 'Apply strong-hold matte clay to keep the top standing sharp all day.',
      matchScore: '97% Style Match',
    };
  }

  // default / classic
  return {
    title: 'Classic Side Part with Smooth Taper Fade',
    fadeType: 'Medium taper fade that keeps natural fullness on the sides',
    beardAdvice: 'Natural full beard with a hot towel straight-razor neck clean-up',
    stylingTip: 'Blow-dry lightly and finish with a medium-hold styling paste.',
    matchScore: '99% Style Match',
  };
}

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    clientName: "Aashif Khan",
    rating: 5,
    reviewDate: "2 weeks ago",
    serviceDone: "Signature Haircut & Beard Shaping",
    comment: "Incredible attention to detail. The master barber actually checks your face shape and hair growth before picking up a clipper. Best salon experience in Bhopal.",
    badge: "Verified Regular",
  },
  {
    id: "rev-2",
    clientName: "Anil",
    rating: 5,
    reviewDate: "1 month ago",
    serviceDone: "Skin Drop Fade & Hot Towel Beard Line-Up",
    comment: "Best fade and razor beard line-up on Bhensakhedi Road. The warm towel steam and fresh blade finish are unmatched anywhere near The Fitness Planet.",
    badge: "Verified Local Guide",
  },
  {
    id: "rev-3",
    clientName: "Mannu",
    rating: 5,
    reviewDate: "3 weeks ago",
    serviceDone: "Head Massage Spa & Classic Cut",
    comment: "Super clean salon, UV-cleaned tools, fresh blades, and zero rush. You get full attention for 45 minutes and walk out looking sharp every time.",
    badge: "Verified Customer",
  },
  {
    id: "rev-4",
    clientName: "Raju Bhai",
    rating: 5,
    reviewDate: "2 months ago",
    serviceDone: "Full Grooming Combo",
    comment: "Shivangi Hair Salon is the best around Bhopal. Clean razor cuts every single time with zero skin irritation. Book on WhatsApp before coming on weekends!",
    badge: "Verified Customer",
  }
];

export interface LookbookItem {
  id: string;
  title: string;
  category: 'Skin Fade' | 'Beard Detailing' | 'Hot Towel Shave' | 'Salon';
  desc: string;
  locationTag: string;
  image: string;
  imageClassName?: string;
  isSalonPhoto?: boolean;
}

/**
 * 16 Gallery Items — Strictly 4 items per category (Skin Fade, Beard Detailing, Hot Towel Shave, Salon).
 * NEVER uses /barber.jpg or /logo.jpg.
 */
export const LOOKBOOK_ITEMS: LookbookItem[] = [
  // 1. Skin Fade (4 items)
  {
    id: "fade-1",
    title: "Textured Crop & Skin Fade",
    category: "Skin Fade",
    desc: "Clean side fade with natural volume on top.",
    locationTag: "Bhopal Salon",
    image: "/crop_fade.jpg",
    imageClassName: "object-cover object-center",
  },
  {
    id: "fade-2",
    title: "High-Contrast Zero Taper",
    category: "Skin Fade",
    desc: "Sharp temple fade blended smoothly with scissor work.",
    locationTag: "Bhopal Salon",
    image: "/crop_fade.jpg",
    imageClassName: "object-cover object-[35%_20%] scale-[1.14]",
  },
  {
    id: "fade-3",
    title: "Low Drop Fade & Line-Up",
    category: "Skin Fade",
    desc: "Smooth back-and-side fade shaped around your head.",
    locationTag: "Bhopal Salon",
    image: "/crop_fade.jpg",
    imageClassName: "object-cover object-[65%_25%] scale-[1.18]",
  },
  {
    id: "fade-4",
    title: "Classic Side-Part & Taper Cut",
    category: "Skin Fade",
    desc: "Smart everyday look with clean neck and sideburn edges.",
    locationTag: "Bhopal Salon",
    image: "/crop_fade.jpg",
    imageClassName: "object-cover object-[50%_15%] scale-[1.12]",
  },

  // 2. Beard Detailing (4 items)
  {
    id: "beard-1",
    title: "Sharp Razor Beard Line-Up",
    category: "Beard Detailing",
    desc: "Crisp cheek and neck lines with a fresh straight blade.",
    locationTag: "Bhopal Salon",
    image: "/beard_sculpt.jpg",
    imageClassName: "object-cover object-center",
  },
  {
    id: "beard-2",
    title: "Full Beard Shape & Fade",
    category: "Beard Detailing",
    desc: "Smooth blend from sideburns into a well-groomed beard.",
    locationTag: "Bhopal Salon",
    image: "/beard_sculpt.jpg",
    imageClassName: "object-cover object-[35%_30%] scale-[1.15]",
  },
  {
    id: "beard-3",
    title: "Clean Jawline & Mustache Trim",
    category: "Beard Detailing",
    desc: "Balanced beard length that makes your jawline look sharper.",
    locationTag: "Bhopal Salon",
    image: "/beard_sculpt.jpg",
    imageClassName: "object-cover object-[65%_35%] scale-[1.18]",
  },
  {
    id: "beard-4",
    title: "Beard Wash, Oil & Styling",
    category: "Beard Detailing",
    desc: "Softening beard care followed by neat trimmer detailing.",
    locationTag: "Bhopal Salon",
    image: "/beard_sculpt.jpg",
    imageClassName: "object-cover object-[50%_20%] scale-[1.12]",
  },

  // 3. Hot Towel Shave (4 items)
  {
    id: "shave-1",
    title: "Hot Towel Straight Razor Shave",
    category: "Hot Towel Shave",
    desc: "Warm steam towel prep followed by a smooth zero-irritation shave.",
    locationTag: "Bhopal Salon",
    image: "/razor_shave.jpg",
    imageClassName: "object-cover object-center",
  },
  {
    id: "shave-2",
    title: "Double-Towel Refresh Ritual",
    category: "Hot Towel Shave",
    desc: "Hot towel pore cleaning finished with a cool soothing towel.",
    locationTag: "Bhopal Salon",
    image: "/razor_shave.jpg",
    imageClassName: "object-cover object-[30%_25%] scale-[1.15]",
  },
  {
    id: "shave-3",
    title: "Close Feather-Blade Shave",
    category: "Hot Towel Shave",
    desc: "Rich foam lather and a fresh Japanese blade for baby-smooth skin.",
    locationTag: "Bhopal Salon",
    image: "/razor_shave.jpg",
    imageClassName: "object-cover object-[70%_30%] scale-[1.18]",
  },
  {
    id: "shave-4",
    title: "Face Steam & Cooling Aftershave Care",
    category: "Hot Towel Shave",
    desc: "Relaxing steam therapy with cooling post-shave balm.",
    locationTag: "Bhopal Salon",
    image: "/razor_shave.jpg",
    imageClassName: "object-cover object-[50%_18%] scale-[1.12]",
  },

  // 4. Salon (4 items - with watermark crop classes)
  {
    id: "salon-1",
    title: "Main Salon Floor & Barber Chairs",
    category: "Salon",
    desc: "Comfortable black hydraulic grooming chairs at Shivangi Hair Salon.",
    locationTag: "Bhopal Salon",
    image: "/interior_luxury.jpg",
    imageClassName: "object-cover object-[center_15%] scale-[1.12]",
    isSalonPhoto: true,
  },
  {
    id: "salon-2",
    title: "Mirror Stations & Grooming Setup",
    category: "Salon",
    desc: "Bright mirror stations stocked with top hair and beard care products.",
    locationTag: "Bhopal Salon",
    image: "/interior_luxury.jpg",
    imageClassName: "object-cover object-[left_15%] scale-[1.15]",
    isSalonPhoto: true,
  },
  {
    id: "salon-3",
    title: "UV Tool Sanitizer & Clean Setup",
    category: "Salon",
    desc: "UV cabinet and cleaner used after every single customer.",
    locationTag: "Bhopal Salon",
    image: "/interior_luxury.jpg",
    imageClassName: "object-cover object-[right_15%] scale-[1.15]",
    isSalonPhoto: true,
  },
  {
    id: "salon-4",
    title: "Pro Clippers, Scissors & Fresh Blades",
    category: "Salon",
    desc: "High-precision trimmers, scissors, and sealed single-use blades.",
    locationTag: "Bhopal Salon",
    image: "/interior_luxury.jpg",
    imageClassName: "object-cover object-[center_20%] scale-[1.16]",
    isSalonPhoto: true,
  },
];
