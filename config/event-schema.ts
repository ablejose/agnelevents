/**
 * EVENT-TEMPLATE — schema for the per-event data file.
 *
 * Everything in this file is the shape of the ONE file you swap per client:
 * `events/<slug>.config.ts`. Nothing here is template copy — template copy
 * ("what we do", "how we work", section headings) lives in `config/template.ts`.
 *
 * Rules of the architecture:
 *   1. Personal data  (name, phone, address, maps, reviews, photos, videos) -> events/<slug>.config.ts
 *   2. Personal media (only their own photos/videos)                        -> public/events/<slug>/...
 *   3. Reusable copy + stock art (how we work / what we do)                 -> config/template.ts + public/template/
 *   4. Sections/components NEVER hardcode a business detail. They read config.
 */

/** A media path. Relative paths ("gallery/01.webp") resolve against `media.base`. */
export type MediaPath = string;

export interface EventImage {
  /** Relative to media.base, or an absolute "/..." / "https://..." URL. */
  src: MediaPath;
  alt: string;
}

export interface EventReview {
  name: string;
  rating: number;
  quote: string;
  /** Where the review came from. Default: "Google review". */
  source?: string;
}

export interface EventConfig {
  /** URL-safe id. Must match the folder name under public/events/<slug>/. */
  slug: string;

  brand: {
    /** Big display word in the hero, header, loader, footer. e.g. "Madeena" */
    name: string;
    /** Legal / full business name used for SEO + schema.org. */
    fullName: string;
    /** Small line under the name. e.g. "Catering & Event Management" */
    descriptor: string;
    /** Tiny uppercase label in header/footer. e.g. "Catering & Events" */
    kicker: string;
    /** One-line promise. e.g. "Weddings & events, catered with care." */
    tagline: string;
  };

  contact: {
    /** Display phone, e.g. "+91 94951 63651". tel: link is derived. */
    phone: string;
    /** wa.me digits only, e.g. "919495163651". */
    whatsapp: string;
    email?: string;
  };

  location: {
    /** Town/city. e.g. "Perintalmanna" */
    city: string;
    /** District or wider area shown next to the city. e.g. "Malappuram" */
    district: string;
    /** State/region. e.g. "Kerala" */
    region: string;
    /** Neighbourhood / landmark area. e.g. "Thelakkad" */
    area?: string;
    /** Full one-line postal address. */
    address: string;
    street: string;
    postalCode: string;
    country: string;
    /** Towns served, used in footer + schema.org areaServed. */
    serviceAreas: string[];
    geo: { lat: number; lng: number };
    /** Share link to the Google Business Profile / Maps pin. */
    mapsLink: string;
    /** Embeddable maps URL (output=embed). */
    mapEmbed?: string;
    /** Human hours line, e.g. "Open 24 hours · all days". */
    hours: string;
    /** schema.org opening hours. */
    opens?: string;
    closes?: string;
    delivery?: boolean;
  };

  web: {
    /** Production origin, no trailing slash. */
    url: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };

  reputation: {
    rating: number;
    reviews: number;
  };

  media: {
    /** Folder holding ONLY this client's own photos/videos. */
    base: string;
    /** Hero still — also used when the visitor prefers reduced motion. */
    heroPoster: MediaPath;
    /** 1200x630 social share image. */
    ogImage: MediaPath;
    /** Favicon/app-icon folder for this brand. */
    brandDir?: MediaPath;
    /** Crossfading pair (or more) in the About section. */
    about: EventImage[];
    /** "Our work" photos — their real events only. */
    gallery: EventImage[];
  };

  /** Real reviews only. Leave empty to hide the Reviews section. */
  reviews: EventReview[];

  seo?: {
    /** Extra keywords on top of the generated ones. */
    keywords?: string[];
    /** Overrides the generated meta description. */
    description?: string;
  };

  /**
   * Optional per-event overrides of template copy. Anything left out falls back
   * to config/template.ts, so a new event usually sets nothing here.
   */
  overrides?: {
    /** Replace the shared service cards for this client. */
    services?: {
      id: string;
      title: string;
      blurb: string;
      bullets: string[];
      image?: MediaPath;
    }[];
    /** Replace the shared "how we work" steps. */
    process?: { n: string; title: string; text: string }[];
    /** About paragraph — supports {tokens}; see config/template.ts. */
    aboutBody?: string;
  };
}
