"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { processSteps as steps } from "@/config/process";
import { copy } from "@/config/site";
import { t } from "@/lib/copy";
import { cn } from "@/lib/utils";

/**
 * PROCESS TRUST — "How we work". Template-level content (config/template.ts):
 * the same flow works for every catering/event client, so a new event inherits
 * it. Override per event only when the workflow genuinely differs.
 *
 * Desktop: the section pins in the middle of the screen and scrolling drives
 * the story — the line draws across and each step lights up in turn — then the
 * page releases and carries on into About. Phones: steps light up one by one
 * as each reaches the middle of the screen. Reduced motion: everything shown.
 */
const SCROLL_PER_STEP = 260; // px of scrolling spent on each step while pinned

export default function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [lit, setLit] = useState(0); // how many steps are lit

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(steps.length);
      if (lineRef.current) lineRef.current.style.transform = "scaleX(1)";
      return;
    }

    if (!window.matchMedia("(min-width: 1024px)").matches) {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setLit((n) => Math.max(n, idx + 1));
          }),
        { threshold: 0, rootMargin: "0px 0px -50% 0px" }
      );
      liRefs.current.forEach((li) => li && io.observe(li));
      return () => io.disconnect();
    }

    let ctx: any;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const n = steps.length;
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          // Pin centred when it fits the screen, otherwise from its top edge.
          start: () => ((sectionRef.current?.offsetHeight ?? 0) < window.innerHeight ? "center center" : "top top"),
          end: `+=${n * SCROLL_PER_STEP}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (lineRef.current) lineRef.current.style.transform = `scaleX(${p})`;
            // Badge i sits i / (n - 1) of the way along the line; it lights when the line reaches it.
            setLit(p <= 0 ? 0 : Math.min(n, Math.floor(p * (n - 1) + 1e-4) + 1));
          },
        });
      }, sectionRef);
      // The pin adds scroll space; re-measure every trigger below it.
      ScrollTrigger.refresh();
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="process" aria-labelledby="process-heading" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-shell px-6">
        <Reveal>
          <p className="eyebrow">{copy.process.eyebrow}</p>
          <h2 id="process-heading" className="display mt-4 max-w-3xl" style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)" }}>
            {copy.process.heading}
          </h2>
          <p className="body-copy mt-4 max-w-xl">{t(copy.process.body)}</p>
        </Reveal>

        <ol className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {/* Track + the line that draws across it (desktop), badge centre to badge centre */}
          <div aria-hidden className="pointer-events-none absolute left-8 right-[calc(20%-3.2rem)] top-8 hidden h-px bg-sand lg:block" />
          <div
            ref={lineRef}
            aria-hidden
            className="pointer-events-none absolute left-8 right-[calc(20%-3.2rem)] top-8 hidden h-px origin-left bg-saffron lg:block"
            style={{ transform: "scaleX(0)" }}
          />
          {steps.map((s, i) => {
            const on = i < lit;
            return (
              <li
                key={s.n}
                ref={(el) => {
                  liRefs.current[i] = el;
                }}
                data-idx={i}
                className={cn("relative transition-all duration-500", on ? "opacity-100" : "opacity-40 lg:translate-y-2")}
              >
                <div className="flex flex-col items-start">
                  <span
                    className={cn(
                      "relative z-10 grid h-16 w-16 place-items-center rounded-full border font-display text-2xl transition-all duration-500",
                      on
                        ? "scale-100 border-espresso bg-espresso text-ivory shadow-[0_14px_30px_-12px_rgba(196,137,46,0.75)]"
                        : "scale-90 border-sand bg-white text-saffron-2"
                    )}
                  >
                    {s.n}
                  </span>
                  <h3 className="mt-5 font-display text-xl text-saffron-2">{s.title}</h3>
                  <p className="body-copy mt-2">{t(s.text)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
