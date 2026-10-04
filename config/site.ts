/**
 * DERIVED — do not put client details here. Edit events/<slug>.config.ts instead.
 * This adapter exposes the active event as the flat `site` object the sections use.
 */
import { event } from "@/event.config";
import { templateCopy } from "@/config/template";
import { t, asset } from "@/lib/copy";

export { event };
export const copy = templateCopy;

export const site = {
  name: event.brand.name,
  fullName: event.brand.fullName,
  descriptor: event.brand.descriptor,
  kicker: event.brand.kicker,
  tagline: event.brand.tagline,
  city: `${event.location.city}, ${event.location.region}`,
  district: event.location.district,
  region: event.location.region,
  area: event.location.area,
  phone: event.contact.phone,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || event.contact.whatsapp,
  address: event.location.address,
  serviceAreas: event.location.serviceAreas,
  rating: event.reputation.rating,
  reviews: event.reputation.reviews,
  hours: event.location.hours,
  delivery: event.location.delivery ?? false,
  mapsLink: event.location.mapsLink,
  mapEmbed: event.location.mapEmbed,
  url: event.web.url,
  instagram: event.web.instagram,
} as const;

export const DEFAULT_WA_MESSAGE = t(templateCopy.cta.waMessage);

export const waLink = (text: string = DEFAULT_WA_MESSAGE) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const telLink = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

export const navLinks = templateCopy.nav;

/** Brand icon + share image paths for this event. */
export const brandAssets = {
  dir: asset(event.media.brandDir ?? "brand"),
  ogImage: asset(event.media.ogImage),
  heroPoster: asset(event.media.heroPoster),
};

export const icon = (file: string) => `${brandAssets.dir.replace(/\/$/, "")}/${file}`;
