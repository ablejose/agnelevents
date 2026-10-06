"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { brandAssets, copy, site, waLink } from "@/config/site";
import { t } from "@/lib/copy";

export default function Hero() {
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (r) return;
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.to(mediaRef.current, {
          scale: 1.08,
          y: 60,
          ease: "none",
          scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
        });
      });
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="hero" className="relative h-[100svh] w-full overflow-hidden bg-espresso">
      <div
        ref={mediaRef}
        className="absolute inset-0"
        style={{ willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
      >
        {/* Fixed hero slideshow, identical on every site: 01 -> 03 -> 04, swapping every 0.8s. */}
        {HERO_SLIDES.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={t(copy.hero.posterAlt)}
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === slide ? 1 : 0, transition: "opacity 150ms linear" }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, rgba(20,16,12,0.2) 0%, rgba(20,16,12,0.55) 60%, rgba(20,16,12,0.82) 100%), linear-gradient(to top, rgba(20,16,12,0.9) 0%, rgba(20,16,12,0) 45%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-shell flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow" style={{ color: "#ffffff", textShadow: "0 1px 20px rgba(255,255,255,0.45)" }}>
          {t(copy.hero.eyebrow)}
        </p>
        <h1 className="mt-5 flex flex-col items-center">
          <span
            className="display-xl"
            style={{ color: "#ffffff", fontSize: "clamp(2.9rem, 7vw, 5.6rem)", textShadow: "0 2px 34px rgba(255,255,255,0.4)" }}
          >
            {site.name}
          </span>
          <span
            className="display mt-1"
            style={{ fontSize: "clamp(1.05rem, 2.6vw, 2rem)", letterSpacing: "0.06em", color: "#ffffff" }}
          >
            {site.descriptor}
          </span>
        </h1>

        {/* Local hero headline — falls back to the tagline when unset (config/event-schema.ts brand.headline). */}
        <p
          className="mt-5 max-w-xl font-sans text-lg font-medium leading-snug"
          style={{ color: "#ffffff", textShadow: "0 1px 20px rgba(0,0,0,0.35)" }}
        >
          {site.headline}
        </p>

        {site.taglineMl && (
          <p className="mt-1 max-w-xl font-sans text-sm font-light" style={{ color: "rgba(255,255,255,0.85)" }}>
            {site.taglineMl}
          </p>
        )}

        <p
          className="mt-6 max-w-xl font-sans text-base font-light leading-relaxed"
          style={{ color: "rgba(255,255,255,0.9)", textShadow: "0 1px 20px rgba(0,0,0,0.4)" }}
        >
          {t(copy.hero.body)}
        </p>

        {site.highlights.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {site.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border px-3.5 py-1.5 font-sans text-xs font-medium"
                style={{ borderColor: "rgba(255,255,255,0.35)", color: "#ffffff", background: "rgba(255,255,255,0.08)" }}
              >
                {h}
              </span>
            ))}
          </div>
        )}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href={waLink()} variant="whatsapp" external>
            <WhatsAppIcon size={18} /> {copy.cta.primary}
          </Button>
          <Button href="#gallery" variant="outline" className="border-ivory/60 text-ivory hover:bg-ivory/10">
            {copy.cta.secondary}
          </Button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2">
        <span className="block h-10 w-px origin-bottom" style={{ background: "var(--saffron)", animation: "scroll-hint 2.2s ease-in-out infinite" }} />
        <span className="eyebrow text-ivory/60">{copy.hero.scroll}</span>
      </div>
    </section>
  );
}
