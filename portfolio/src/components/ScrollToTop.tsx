import { useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';
import { setScrollLockOverride } from '../lib/scrollLock';

const SHOW_AFTER_PX = 400;

export function ScrollToTop() {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = lenis ? lenis.scroll : window.scrollY;
      setVisible(y > SHOW_AFTER_PX);
    };

    if (lenis) {
      update();
      lenis.on('scroll', update);
      return () => lenis.off('scroll', update);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [lenis]);

  const scrollToTop = () => {
    if (lenis) {
      setScrollLockOverride(true);
      lenis.start();
      lenis.scrollTo(0, { duration: 1 });
      window.setTimeout(() => setScrollLockOverride(false), 1000);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 sm:h-5 sm:w-5"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
