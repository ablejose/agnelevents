/** DERIVED — the client's own photos/videos, resolved against media.base. */
import { event } from "@/event.config";
import { templateCopy } from "@/config/template";
import { asset } from "@/lib/copy";

export interface GalleryItem {
  src: string;
  alt: string;
  wide?: boolean;
}

/** OUR WORK — images. Personal event photos only (public/events/<slug>/...). */
export const galleryImages: GalleryItem[] = event.media.gallery.map((g) => ({
  src: asset(g.src),
  alt: g.alt,
}));

/** About-section crossfade pair. */
export const aboutImages: GalleryItem[] = event.media.about.map((a) => ({
  src: asset(a.src),
  alt: a.alt,
}));

export const gallerySettings = templateCopy.gallerySettings;
