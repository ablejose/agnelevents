"use client";

import { useEffect, useState } from "react";
import { Maximize2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Img } from "@/components/ui/Img";
import Lightbox from "@/components/Lightbox";
import { galleryImages, gallerySettings } from "@/config/gallery";
import { copy } from "@/config/site";
import { t } from "@/lib/copy";

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null); // lightbox index
  const [photo, setPhoto] = useState(0); // big photo-card index

  // Big photo card: show one image at a time, auto-swapping with a 0.8s crossfade.
  // Paused while the lightbox is open.
  useEffect(() => {
    if (active !== null) return;
    const id = setInterval(() => setPhoto((p) => (p + 1) % galleryImages.length), gallerySettings.photoIntervalMs);
    return () => clearInterval(id);
  }, [active]);

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-shell px-6">
        <Reveal>
          <p className="eyebrow">{copy.gallery.eyebrow}</p>
          <h2 id="gallery-heading" className="display mt-4" style={{ fontSize: "clamp(1.9rem, 3.4vw, 3rem)" }}>
            {copy.gallery.heading}
          </h2>
          <p className="body-copy mt-4 max-w-xl">{t(copy.gallery.body)}</p>
        </Reveal>

        {/* PHOTOS — quote on the left, image on the right (desktop) */}
        <Reveal className="mt-12" delay={0.05}>
          <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2 lg:gap-14">
            <div className="order-2 max-w-md lg:order-1 lg:justify-self-center">
              <blockquote className="display text-espresso" style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}>
                &ldquo;{t(copy.gallery.photoQuote)}&rdquo;
              </blockquote>
              <p className="body-copy mt-4">{t(copy.gallery.photoBody)}</p>
            </div>
            <div className="order-1 lg:order-2">
          <button
            onClick={() => setActive(photo)}
            aria-label="Open photo gallery"
            className="group relative mx-auto block w-full max-w-md overflow-hidden rounded-brand bg-sand ring-1 ring-espresso/10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]"
            style={{ aspectRatio: "4 / 5" }}
          >
            {galleryImages.map((item, i) => (
              <Img
                key={item.src}
                src={item.src}
                alt={item.alt}
                fallbackSeed={item.src}
                className="absolute inset-0 h-full w-full object-contain"
                style={{
                  opacity: i === photo ? 1 : 0,
                  transition: `opacity ${gallerySettings.photoTransitionSeconds}s ease-in-out`,
                }}
              />
            ))}
            <span className="pointer-events-none absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ivory/85 text-espresso opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Maximize2 size={18} />
            </span>
          </button>

          {/* Caption for the current photo — prefers the explicit `caption`, falls back to `alt`. */}
          <p className="mx-auto mt-4 max-w-md text-center font-sans text-sm text-ink/80">
            {galleryImages[photo].caption ?? galleryImages[photo].alt}
          </p>

          {/* Dots — jump to any photo */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === photo}
                onClick={() => setPhoto(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === photo ? "w-6 bg-saffron" : "w-2 bg-espresso/25 hover:bg-espresso/45"
                }`}
              />
            ))}
          </div>
          <p className="mt-3 text-center font-sans text-xs text-muted">{copy.gallery.photoHint}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <Lightbox items={galleryImages} index={active} onClose={() => setActive(null)} onNav={setActive} />
    </section>
  );
}
