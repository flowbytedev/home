import type React from 'react';
import { useEffect } from 'react';

/** Inline styles that set CSS custom properties, which React's style type does not know about. */
export const vars = (v: Record<string, string | number>) => v as React.CSSProperties;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export const reducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Runs `fn` on scroll and resize, at most once a frame, and once on mount. */
export function useScroll(fn: () => void, deps: React.DependencyList = []) {
  useEffect(() => {
    let raf = 0;
    const run = () => { raf = 0; fn(); };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    addEventListener('scroll', on, { passive: true });
    addEventListener('resize', on);
    fn();
    return () => {
      removeEventListener('scroll', on);
      removeEventListener('resize', on);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Adds .in to each .rv element (and the trust band) the first time it scrolls into view.
 * The class is set on the DOM node, so only put .rv on elements whose className never changes.
 */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.rv:not(.in), .trust:not(.in)').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}
