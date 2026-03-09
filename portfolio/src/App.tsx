import { ReactLenis, useLenis } from 'lenis/react';
import { Hero, Experience, Education, Contact, Skills, ScrollToTop } from './components';
import { useEffect, useRef } from 'react';
import { useIsDesktop } from './hooks/useIsDesktop';
import { isScrollLockOverridden } from './lib/scrollLock';
import { useLanguage } from './i18n';

const lenisOptions = {
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 0.6,
  touchMultiplier: 0.8,
  lerp: 0.08,
};

type SectionTransitionConfig = {
  /** Duration of the scroll animation in seconds */
  duration: number;
  /** Optional override for lerp (0..1); falls back to Lenis default when omitted */
  lerp?: number;
};

// Transition config between sections in order:
// 0: Hero → Experience
// 1: Experience → Skills
// 2: Skills → Education
// 3: Education → Contact
const sectionTransitions: SectionTransitionConfig[] = [
  { duration: 0.9, lerp: 0.18 }, // Hero → Experience: a bit snappier
  { duration: 1.2, lerp: 0.12 }, // Experience → Skills: slower, smoother
  { duration: 1.0, lerp: 0.14 }, // Skills → Education
  { duration: 1.3, lerp: 0.1 },  // Education → Contact: longest glide
];

function FullPageScrollController() {
  const lenis = useLenis();
  const isDesktop = useIsDesktop();
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (!lenis || !isDesktop) return;

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>('main > section'));

    const handleWheel = (event: WheelEvent) => {
      if (!isDesktop || isScrollLockOverridden()) return;

      // Let browser handle native scroll if we don't have sections yet
      const sections = getSections();
      if (sections.length === 0) return;

      // Intercept default scroll so we can drive Lenis
      event.preventDefault();

      if (isAnimatingRef.current) return;

      const delta = event.deltaY;
      const threshold = 20;
      if (Math.abs(delta) < threshold) return;

      const currentScroll = lenis.scroll ?? window.scrollY;

      // Find the section whose top is closest to current scroll position
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      sections.forEach((section, index) => {
        const top = section.offsetTop;
        const distance = Math.abs(top - currentScroll);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      let targetIndex = closestIndex;
      if (delta > 0 && closestIndex < sections.length - 1) {
        targetIndex = closestIndex + 1;
      } else if (delta < 0 && closestIndex > 0) {
        targetIndex = closestIndex - 1;
      }

      if (targetIndex === closestIndex) return;

      const targetSection = sections[targetIndex];
      const targetTop = targetSection.offsetTop;

      // Pick transition config based on the pair of sections.
      // Use the smaller index between from/to as the config index.
      const configIndex = Math.min(closestIndex, targetIndex);
      const transition = sectionTransitions[configIndex] ?? { duration: 1.0, lerp: 0.12 };

      isAnimatingRef.current = true;
      lenis.scrollTo(targetTop, {
        duration: transition.duration,
        lerp: transition.lerp,
        lock: true,
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel as EventListener);
      isAnimatingRef.current = false;
    };
  }, [lenis, isDesktop]);

  return null;
}

function App() {
  const { language } = useLanguage();
  return (
    <ReactLenis root options={lenisOptions}>
      <div className="min-h-screen bg-background text-foreground">
        <main
          aria-label={
            language === 'sv'
              ? 'Martin Wärlegård – portfölj'
              : 'Martin Wärlegård – portfolio'
          }
        >
          <FullPageScrollController />
          <Hero />
          <Experience />
          <Skills />
          <Education />
          <Contact />
        </main>
        <ScrollToTop />
      </div>
    </ReactLenis>
  );
}

export default App;

