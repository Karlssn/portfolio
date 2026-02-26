import { useEffect, useState, useCallback, type RefObject } from 'react';
import { useLenis } from 'lenis/react';

/** Interpolate reveal: returns 0..1 for visibility (ease out) */
export function reveal(progress: number, start: number, end: number): number {
  if (progress <= start) return 0;
  const t = Math.min(1, (progress - start) / (end - start));
  const eased = 1 - (1 - t) * (1 - t);
  return Math.min(1, eased);
}

/**
 * Visibility 0..1 based on scroll position. Fades in as the element enters from the bottom
 * and fades out as it exits through the top, so both transitions are visible while scrolling.
 * fadeZoneVh = viewport height fraction used for fade (e.g. 0.35 = fade over 35% of viewport).
 * exitDelayFraction = 0..1; e.g. 0.2 = delay when fade-out starts by 20% (stay visible longer).
 */
export function useElementVisibility(
  ref: RefObject<Element | null>,
  fadeZoneVh = 0.35,
  exitDelayFraction = 0.2
): number {
  const lenis = useLenis();
  const [visibility, setVisibility] = useState(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const centerY = rect.top + rect.height / 2;
    const zone = vh * fadeZoneVh;
    const exitZone = zone * (1 - exitDelayFraction);
    // Fade out as element exits through top; delayed so we stay visible 20% longer
    if (centerY < exitZone) {
      setVisibility(exitZone <= 0 ? 0 : Math.max(0, centerY / exitZone));
      return;
    }
    // Fade in as element enters from bottom: center from vh → vh - zone
    if (centerY > vh - zone) {
      setVisibility(Math.max(0, (vh - centerY) / zone));
      return;
    }
    setVisibility(1);
  }, [ref, fadeZoneVh, exitDelayFraction]);

  useEffect(() => {
    if (lenis) {
      update();
      lenis.on('scroll', update);
      return () => lenis.off('scroll', update);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [lenis, update]);

  useEffect(() => {
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  return visibility;
}

/** True when element has entered the viewport (with threshold). */
export function useInView(ref: RefObject<Element | null>, options?: { threshold?: number; rootMargin?: string }) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const threshold = options?.threshold ?? 0.12;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio ?? 0;
        setInView(ratio >= threshold);
      },
      { threshold, rootMargin: options?.rootMargin ?? '0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options?.threshold, options?.rootMargin]);

  return inView;
}

/**
 * Scroll progress 0..1 as the element scrolls into view.
 * Uses Lenis scroll events so updates stay in sync with smooth scroll.
 */
export function useElementScrollProgress(ref: RefObject<Element | null>, amount = 1): number {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = vh;
    const end = vh - vh * amount;
    let t = (start - rect.top) / (start - end);
    t = Math.max(0, Math.min(1, t));
    const eased = 1 - (1 - t) * (1 - t);
    setProgress(eased);
  }, [ref, amount]);

  useEffect(() => {
    if (lenis) {
      update();
      lenis.on('scroll', update);
      return () => lenis.off('scroll', update);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [lenis, update]);

  useEffect(() => {
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  return progress;
}

/**
 * Progress 0..1 as the element passes through the viewport center.
 * 0 = element center below viewport center (approaching), 0.5 = centered, 1 = element center above (passed).
 * rangeVh = how many vh of scroll for the full 0→1 (e.g. 120 = 60vh before + 60vh after center).
 */
export function useElementCenterProgress(
  ref: RefObject<Element | null>,
  rangeVh = 120
): number {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const blockCenter = rect.top + rect.height / 2;
    const rangePx = (rangeVh / 100) * window.innerHeight;
    // progress 0.5 when blockCenter === viewportCenter; 0 when block 0.5*range below; 1 when 0.5*range above
    let t = 0.5 - (blockCenter - viewportCenter) / rangePx;
    t = Math.max(0, Math.min(1, t));
    setProgress(t);
  }, [ref, rangeVh]);

  useEffect(() => {
    if (lenis) {
      update();
      lenis.on('scroll', update);
      return () => lenis.off('scroll', update);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [lenis, update]);

  useEffect(() => {
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  return progress;
}

/**
 * Progress 0..1 through a section by ref. 0 = section top at viewport top, 1 = section scrolled through.
 * sectionHeightVh = total scroll height of the section in vh.
 */
export function useSectionProgress(
  ref: RefObject<Element | null>,
  sectionHeightVh: number
): number {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const sectionHeightPx = (sectionHeightVh / 100) * window.innerHeight;
    // rect.top is 0 when section top hits viewport top; negative as we scroll up
    const t = -rect.top / sectionHeightPx;
    setProgress(Math.max(0, Math.min(1, t)));
  }, [ref, sectionHeightVh]);

  useEffect(() => {
    if (lenis) {
      update();
      lenis.on('scroll', update);
      return () => lenis.off('scroll', update);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [lenis, update]);

  useEffect(() => {
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  return progress;
}
