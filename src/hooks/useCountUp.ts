import { useEffect, useRef, useState } from "react";

const DURATION_MS = 600;

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The one orchestrated moment on the site: hero values count up from zero on
 * first load, once, over 600ms. Respects prefers-reduced-motion. Because the
 * final value is what the DOM settles on, the animation can never misstate a
 * figure — it only delays it.
 */
export function useCountUp(target: number, enabled = true): number {
  const [value, setValue] = useState(() => (enabled && !prefersReducedMotion() ? 0 : target));
  const done = useRef(false);

  useEffect(() => {
    if (done.current || !enabled || prefersReducedMotion()) {
      setValue(target);
      return;
    }
    done.current = true;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
      else setValue(target);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // Runs once per mount by design.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If the target changes after mount (e.g. locale switch re-render), snap.
  useEffect(() => {
    if (done.current) setValue(target);
  }, [target]);

  return value;
}
