import { useEffect, useState } from 'react';

/** Tailwind default md breakpoint – keep in sync with tailwind.config.js if you change theme.screens. */
export const MD_BREAKPOINT_PX = 768;

/**
 * Renders mobile layout first, then switches to desktop on mount if viewport >= md.
 * Causes a brief layout shift on desktop; avoids hydration mismatch by not relying on SSR viewport.
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MD_BREAKPOINT_PX}px)`);
    const set = () => setIsDesktop(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);
  return isDesktop;
}
