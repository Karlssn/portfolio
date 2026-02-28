import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { reveal } from '../hooks/useScrollProgress';
import profilbild from '../assets/profilbild-b3.png';
import { CV_PATH, CV_DOWNLOAD_FILENAME } from '../constants';

const HERO_ZONE_VH = 100;

const HERO_REVEAL_DELAY_MS = 1000;
const HERO_REVEAL_DURATION_MS = 1800;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [heroInView, setHeroInView] = useState(true);

  // Hide scroll hint as soon as user scrolls past the hero (leaves first page)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 1 }  // disappear when hero is no longer 100% visible
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Show hero content after 1s, then animate reveal over 1.8s with staggered timing
  const [contentRevealProgress, setContentRevealProgress] = useState(0);
  useEffect(() => {
    const startReveal = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / HERO_REVEAL_DURATION_MS);
        const eased = 1 - (1 - t) * (1 - t);
        setContentRevealProgress(eased);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, HERO_REVEAL_DELAY_MS);
    return () => clearTimeout(startReveal);
  }, []);

  // Wider gaps between ranges = more time between each animation
  const martin = reveal(contentRevealProgress, 0, 0.14);
  const imageReveal = reveal(contentRevealProgress, 0.22, 0.36);
  const warlegard = reveal(contentRevealProgress, 0.44, 0.58);
  const tagline = reveal(contentRevealProgress, 0.66, 0.80);
  const scrollHintVisible = reveal(contentRevealProgress, 0.88, 1);
  const cvButtonVisible = reveal(contentRevealProgress, 0.94, 1);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-background flex flex-col justify-center min-h-[100vh] px-6 pt-20 pb-16"
        style={{ minHeight: `${HERO_ZONE_VH}vh` }}
      >
        {/* Dot grid background (CSS-only, does not affect animations) */}
        <div className="hero-dots" aria-hidden />

        {/* CV download – muted, top-right, fades in last */}
        <a
          href={CV_PATH}
          download={CV_DOWNLOAD_FILENAME}
          className="absolute top-6 right-6 z-10 flex items-center gap-2 rounded-lg border border-border bg-muted/70 px-3 py-2 text-sm text-muted-foreground transition-all duration-300 ease-out hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          style={{ opacity: cvButtonVisible, transform: `translateY(${8 * (1 - cvButtonVisible)}px)` }}
          aria-label="Ladda ner CV"
        >
          <Download className="h-4 w-4" />
          <span>CV</span>
        </a>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          {/* Name + tagline (revealed after 1s) */}
          <div className="transition-opacity duration-500 flex flex-col items-center">
            <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
              <h1 className="shrink-0">
                <span
                  className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight transition-transform duration-300 ease-out"
                  style={{
                    opacity: martin,
                    transform: `translateY(${24 * (1 - martin)}px)`,
                  }}
                >
                  Martin
                </span>
                <span
                  className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight mt-0.5 transition-transform duration-300 ease-out leading-[1.35]"
                  style={{
                    opacity: warlegard,
                    transform: `translateY(${24 * (1 - warlegard)}px)`,
                  }}
                >
                  Wärlegård
                </span>
              </h1>
              <div
                className="flex shrink-0 transition-transform duration-300 ease-out rounded-full bg-background"
                style={{
                  opacity: imageReveal,
                  transform: `translateY(${24 * (1 - imageReveal)}px)`,
                }}
              >
                <img
                  src={profilbild}
                  alt="Martin Wärlegård"
                  className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 rounded-full object-cover border-2 border-primary/20"
                />
              </div>
            </div>
            <p
              className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto transition-all duration-300 ease-out"
              style={{
                opacity: tagline,
                transform: `translateY(${16 * (1 - tagline)}px)`,
              }}
            >
              Engagerad och lösningsorienterad senior systemutvecklare med erfarenhet av både nyutveckling och komplex förvaltning, som med hjälp av moderna AI-verktyg bygger hållbara system med fokus på arkitektur, kodkvalitet och förvaltningsbarhet.
            </p>
          </div>
        </div>

        {/* Scroll hint – fixed to viewport bottom so it's visible on mobile without scrolling */}
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity duration-500 z-10 pointer-events-none"
          style={{ opacity: heroInView ? scrollHintVisible : 0 }}
          aria-hidden
        >
          <span className="text-sm text-muted-foreground">Scrolla för mer</span>
          <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
        </div>
      </section>
    </>
  );
}
