import type { EventConfig } from "@/config/event-schema";

/**
 * DEMO / SANDBOX EVENT — dummy data only.
 *
 * This is the event `event.config.ts` points at by default, so a fresh clone
 * (and the hosted preview) shows a complete, working site without exposing any
 * real client's details. Nothing here is a real business, person or review.
 *
 * Media is intentionally remote (picsum placeholders + public sample clips) to
 * show that `media.base` accepts absolute URLs — a real event points it at
 * public/events/<slug>/ or a Cloudinary folder instead.
 */
export const demo: EventConfig = {
  slug: "demo",

  brand: {
    name: "Anjali",
    fullName: "Anjali Catering & Event Management",
    descriptor: "Catering & Event Management",
    kicker: "Catering & Events",
    tagline: "Weddings & events, catered with care.",
  },

  contact: {
    phone: "+91 90000 12345",
    whatsapp: "919000012345",
    email: "hello@anjalievents.example",
  },

  location: {
    city: "Thrissur",
    district: "Thrissur",
    region: "Kerala",
    area: "Ollur",
    address: "Near Town Hall, Ollur, Thrissur, Kerala 680306",
    street: "Near Town Hall, Ollur",
    postalCode: "680306",
    country: "IN",
    serviceAreas: ["Thrissur", "Ollur", "Irinjalakuda", "Chalakudy", "Guruvayur"],
    geo: { lat: 10.5276, lng: 76.2144 },
    mapsLink: "https://maps.google.com/?q=10.5276,76.2144",
    mapEmbed: "https://www.google.com/maps?q=10.5276,76.2144&z=15&output=embed",
    hours: "Open 8am - 11pm · all days",
    opens: "08:00",
    closes: "23:00",
    delivery: true,
  },

  web: {
    url: "https://event-template.vercel.app",
    instagram: "https://www.instagram.com/explore/tags/keralawedding/",
  },

  reputation: { rating: 4.9, reviews: 36 },

  media: {
    // Absolute URLs, so the demo needs no binary assets in the repo.
    base: "",
    heroPoster: "https://picsum.photos/seed/demo-hero/1920/1080",
    ogImage: "https://picsum.photos/seed/demo-og/1200/630",
    brandDir: "/template/brand",
    about: [
      { src: "https://picsum.photos/seed/demo-about-1/1200/1500", alt: "Indoor banquet set with gold chairs and a chandelier" },
      { src: "https://picsum.photos/seed/demo-about-2/1200/1500", alt: "Outdoor evening banquet with floral table styling" },
    ],
    gallery: [
      { src: "https://picsum.photos/seed/demo-stage/1200/1500", alt: "Floral wedding stage and mandap set for the ceremony" },
      { src: "https://picsum.photos/seed/demo-hall/1200/1500", alt: "Banquet hall dressed with long tables and candlelight" },
      { src: "https://picsum.photos/seed/demo-buffet/1200/1500", alt: "Buffet spread with gold chafing dishes at a function" },
      { src: "https://picsum.photos/seed/demo-lanterns/1200/1500", alt: "Floral decor and hanging lanterns over a buffet counter" },
      { src: "https://picsum.photos/seed/demo-backdrop/1200/1500", alt: "Floral pillars and monogram backdrop at a reception" },
      { src: "https://picsum.photos/seed/demo-tables/1200/1500", alt: "Golden table settings laid out for a wedding feast" },
      { src: "https://picsum.photos/seed/demo-arch/1200/1500", alt: "Floral arch and lanterns above a served buffet" },
      { src: "https://picsum.photos/seed/demo-centrepiece/1200/1500", alt: "Rose candelabra centrepiece on a banquet table" },
    ],
  },

  // DUMMY reviews — placeholder names for the demo build only.
  reviews: [
    {
      name: "Meera Nair",
      rating: 5,
      quote:
        "They handled our reception end to end — menu, stage, seating, the lot. Food came out hot for 400 guests and the hall looked exactly like the mood board we sent.",
      source: "Demo review",
    },
    {
      name: "Rahul Varghese",
      rating: 5,
      quote: "Clear quote, no surprises on the day, and the serving crew were quick and polite. Easy to recommend.",
      source: "Demo review",
    },
    {
      name: "Fathima Ashraf",
      rating: 4,
      quote:
        "Lovely floral setup and the live counters were a hit. Setup ran slightly late but everything was ready before the guests arrived.",
      source: "Demo review",
    },
  ],

  seo: { keywords: ["demo catering site", "event template demo"] },
};
