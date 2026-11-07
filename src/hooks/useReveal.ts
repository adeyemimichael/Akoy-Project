import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to a container element.
 * Any child with class `reveal`, `reveal-left`, `reveal-right`, or `reveal-scale`
 * gains `is-visible` when it scrolls into view (once).
 *
 * Usage:
 *   const ref = useReveal();
 *   <section ref={ref}>…</section>
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.12,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale, .img-reveal",
    );

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
