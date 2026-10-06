"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

/**
 * Fades + lifts its children in the first time they come into view.
 *
 * Driven by an IntersectionObserver rather than pre-measured scroll positions,
 * so it can't go stale when content above changes height (lazy images, the
 * pinned How-we-work section, swapped menus) — which used to leave sections
 * near the bottom of the page stuck invisible.
 */
export default function Reveal({ children, y = 24, delay = 0, as = "div", className }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const show = () => {
      node.style.opacity = "1";
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      show();
      return;
    }

    let anim: Animation | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        // Already scrolled past (e.g. after an anchor jump): just show it.
        if (!e.isIntersecting && e.boundingClientRect.bottom < 0) {
          io.disconnect();
          show();
          return;
        }
        if (!e.isIntersecting) return;
        io.disconnect();
        anim = node.animate(
          [
            { opacity: 0, transform: `translateY(${y}px)` },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 900, delay: delay * 1000, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" }
        );
        show();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );
    io.observe(node);
    return () => {
      io.disconnect();
      anim?.cancel();
    };
  }, [y, delay]);

  const Tag = as as any;
  return (
    <Tag ref={ref as any} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
