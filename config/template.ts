/**
 * TEMPLATE LAYER — shared across every event site. NOT client-specific.
 *
 * "How we work", "What we do", section headings and stock art live here, so a
 * new event inherits them for free. Strings may use {tokens}, filled at render
 * time from the active event config (see lib/copy.ts):
 *
 *   {brand} {fullName} {descriptor} {tagline}
 *   {city} {district} {region} {area} {address} {phone} {hours}
 *   {areas}  -> service areas joined with " · "
 *   {rating} {reviews}
 *
 * Anything here can be overridden per event via `overrides` in events/<slug>.config.ts.
 */

export interface TemplateService {
  id: string;
  title: string;
  blurb: string;
  bullets: string[];
  /** Stock art shipped with the template. Events may override with their own. */
  image: string;
}

export interface TemplateStep {
  n: string;
  title: string;
  text: string;
}

/** WHAT WE DO — the offer. Same three pillars for every catering/event client. */
export const templateServices: TemplateService[] = [
  {
    id: "wedding-catering",
    title: "Wedding Catering",
    blurb:
      "Full buffet spreads for weddings, nikah and receptions — cooked fresh and served hot at any scale.",
    bullets: ["Wedding & reception buffets", "Traditional & multi-cuisine menus", "Trained serving crew"],
    image: "/template/service-1.webp",
  },
  {
    id: "event-management",
    title: "Event Management",
    blurb: "Complete event setup — stage and floral décor, lighting, seating and on-day coordination.",
    bullets: ["Stage & floral décor", "Lighting & seating", "On-day coordination"],
    image: "/template/service-2.webp",
  },
  {
    id: "bulk-catering",
    title: "Function & Bulk Catering",
    blurb: "Large-volume cooking for functions and gatherings, with delivery available across the area.",
    bullets: ["High-volume preparation", "Functions & house events", "Delivery available"],
    image: "/template/service-3.webp",
  },
];

/** HOW WE WORK — the process. Generic to catering + event management. */
export const templateProcess: TemplateStep[] = [
  { n: "01", title: "Understand", text: "We start with your date, guest count, venue and the kind of day you have in mind." },
  { n: "02", title: "Menu & concept", text: "We shape the menu and the look — buffet spread, live counters, stage and floral décor." },
  { n: "03", title: "Plan & coordinate", text: "We lock quantities, timeline, staffing and logistics so nothing is left to the last minute." },
  { n: "04", title: "Cook fresh & set up", text: "Food is cooked fresh on the day while our team sets up counters, seating and décor." },
  { n: "05", title: "Serve & manage", text: "Trained crew serve hot and keep the day running — so you get to enjoy the occasion." },
];

/** Every string the sections render. Tokens are filled from the event config. */
export const templateCopy = {
  nav: [
    { label: "Services", href: "#services" },
    { label: "Our work", href: "#gallery" },
    { label: "How we work", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  cta: {
    primary: "Plan your event",
    whatsapp: "Chat on WhatsApp",
    secondary: "View our work",
    /** Prefilled WhatsApp enquiry. */
    waMessage: "Hi {brand}, I'd like an enquiry for an event. Date: [date], Guests: [guests].",
    waFormIntro: "Hi {brand}, I'd like to plan an event.",
  },

  hero: {
    eyebrow: "{city} · {district}",
    body: "Weddings, receptions and functions across {district} — cooked fresh, styled beautifully, and run end to end.",
    posterAlt: "A celebration catered and staged by {brand}",
    scroll: "Scroll",
  },

  trustBar: {
    /** Extra pills after the rating/review ones. */
    items: ["{hours}", "Delivery available", "{city}, {region}"],
  },

  services: {
    eyebrow: "What we do",
    heading: "Catering & complete event management",
    tapHint: "Tap to see more",
    closeHint: "Tap to close",
  },

  gallery: {
    eyebrow: "Our work",
    heading: "Imagine your event like this",
    body: "Real weddings and functions we've catered and styled across {district} — the spreads, the stage and the crowd on the day.",
    photoQuote: "Every plate, petal and place setting — styled by hand.",
    photoBody: "A closer look at the spreads, stages and tables we create on the day — tap any photo to see it full-size.",
    photoHint: "Tap the photo to view it full-size",
  },

  process: {
    eyebrow: "How we work",
    heading: "One team, from the first message to the last plate.",
    body: "Catering and event management handled together, by one team — so the food, the décor and the day all run as one.",
  },

  about: {
    eyebrow: "About us",
    headingLead: "Feasts and functions, handled with",
    headingAccent: "care.",
    body:
      "{fullName} is based in {area}, {city}. From weddings and receptions to house functions and inaugurations, we handle the whole day — fresh food and buffets, live counters, floral and stage décor, and on-ground coordination. Cooked fresh, served hot, and managed so you can enjoy the occasion.",
    points: ["{hours}", "Delivery available", "Serving {city} & {district}"],
    reviewsLink: "Read our {reviews} reviews on Google",
  },

  testimonials: {
    eyebrow: "Reviews",
    heading: "What our customers say",
    ratingLink: "Rated {rating} from {reviews} reviews on Google",
    sourceLabel: "Google review",
  },

  contact: {
    eyebrow: "Plan your event",
    heading: "Let's plan your event together.",
    body: "Share a few details and we'll pick it up on WhatsApp — with a menu and a clear quote.",
    image: "/template/plan-your-event.webp",
    imageAlt: "Illustration of a wedding planner guiding a couple under a floral arch",
    ratingLine: "Rated {rating} on Google · {reviews} reviews · {hours}",
    submit: "Send on WhatsApp",
    submitNote: "Opens WhatsApp with your details ready to send.",
    fields: {
      email: "Your Email",
      emailPlaceholder: "you@email.com",
      phone: "Your Phone",
      phonePlaceholder: "Your phone number",
      address: "Your Address",
      addressPlaceholder: "Town / venue",
      message: "Message",
      messagePlaceholder: "Event type, date and guest count",
    },
    directions: "Get directions",
  },

  instagram: {
    eyebrow: "Follow our work",
    heading: "See every celebration, in motion",
    body: "Full event films, reels and behind-the-scenes from real weddings and functions — all live on our Instagram.",
    cta: "View our videos on Instagram",
  },

  footer: {
    areasLabel: "Service areas",
    note: "Cooked fresh. Served with care.",
  },

  seo: {
    /** Title + descriptions. Tokens filled from the event config. */
    title: "{fullName} — {city}, {region}",
    titleTemplate: "%s · {brand}, {city}",
    description:
      "{fullName} in {city}, {district} — wedding catering, buffets, live counters and complete event management across {region}. Rated {rating} on Google. {hours}. Call {phone} or enquire on WhatsApp.",
    ogDescription:
      "Wedding catering, buffets and complete event management across {city} & {district}. Rated {rating} on Google. {hours}.",
    category: "Catering & Event Management",
    /** Generated keyword patterns — {city}/{district}/{region} filled per event. */
    keywords: [
      "catering {city}",
      "wedding catering {district}",
      "event management {city}",
      "wedding buffet {region}",
      "catering service {city}",
      "wedding caterers {district}",
      "function catering {region}",
      "buffet catering {city}",
    ],
    cuisines: ["Indian", "Kerala", "Multi-cuisine"],
    priceRange: "₹₹",
    currency: "INR",
    payment: "Cash, UPI",
    locale: "en_IN",
    lang: "en-IN",
    manifestCategories: ["food", "business", "events"],
  },

  /** Motion knobs for the Our work section. */
  gallerySettings: {
    /** Photo card crossfade transition (seconds). */
    photoTransitionSeconds: 0.8,
    /** Photo card crossfade interval (ms). */
    photoIntervalMs: 3200,
    /** About image crossfade interval (ms). */
    aboutIntervalMs: 3800,
  },

  theme: {
    themeColor: "#241C15",
    backgroundColor: "#FDFAF3",
  },
} as const;
