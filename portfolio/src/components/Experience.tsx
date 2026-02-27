import { useEffect, useRef, useState } from 'react';
import { experiences, EMPLOYER_BORDER_CLASS } from '../data/experience';
import { useSectionProgress } from '../hooks/useScrollProgress';
import { useIsDesktop } from '../hooks/useIsDesktop';
import type { Experience as ExperienceItem } from '../data/experience';
import { cn } from '../lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { isScrollLockOverridden } from '../lib/scrollLock';

function getEmployerBorder(employer: string) {
  return EMPLOYER_BORDER_CLASS[employer] ?? 'border-l-border';
}

function employerId(employer: string) {
  return `experience-${employer.replace(/\s+/g, '-').toLowerCase()}`;
}

/** Group experiences by employer, preserving order of first occurrence. O(n). */
function groupByEmployer(items: ExperienceItem[]): { employer: string; items: ExperienceItem[] }[] {
  const order: string[] = [];
  const byEmployer = new Map<string, ExperienceItem[]>();
  for (const exp of items) {
    if (!byEmployer.has(exp.employer)) {
      order.push(exp.employer);
      byEmployer.set(exp.employer, []);
    }
    byEmployer.get(exp.employer)!.push(exp);
  }
  return order.map((employer) => ({ employer, items: byEmployer.get(employer)! }));
}

const employerGroups = groupByEmployer(experiences);

// ---- Mobile: accordion ----

function ExperienceCardContent({ exp }: { exp: ExperienceItem }) {
  const borderClass = getEmployerBorder(exp.employer);
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl border-l-4 overflow-hidden',
        borderClass
      )}
    >
      <div className="px-4 sm:px-5 py-3 border-b border-border/80">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-sm font-bold text-foreground">{exp.company}</h3>
          <span className="text-xs text-muted-foreground">{exp.period}</span>
        </div>
        <p className="text-xs text-primary font-medium mt-0.5">{exp.role}</p>
        <p className="text-xs text-muted-foreground">{exp.employer}</p>
      </div>
      <div className="px-4 sm:px-5 py-3">
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          {exp.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {exp.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceMobile() {
  const [openEmployer, setOpenEmployer] = useState<string | null>(employerGroups[0]?.employer ?? null);

  return (
    <div className="relative bg-muted/40 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
          Erfarenhet
        </h2>
        <div className="space-y-2">
          {employerGroups.map(({ employer, items }) => {
            const isOpen = openEmployer === employer;
            return (
              <div
                key={employer}
                className={cn(
                  'bg-card/80 border border-border rounded-xl overflow-hidden',
                  isOpen && 'ring-1 ring-primary/20'
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenEmployer(isOpen ? null : employer)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  aria-expanded={isOpen}
                  aria-controls={employerId(employer)}
                >
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-sm font-semibold text-foreground">{employer}</span>
                    <span className="text-xs text-muted-foreground">
                      {items.length} uppdrag
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div
                    id={employerId(employer)}
                    className="px-2 py-3 space-y-3 border-t border-border/80"
                  >
                    {items.map((exp) => (
                      <ExperienceCardContent key={exp.id} exp={exp} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---- Desktop: slide-in cards ----

const NUM_CARDS = experiences.length;
const VH_PER_CARD = 10;
const VH_CARD_PHASE = NUM_CARDS * VH_PER_CARD;
const SECTION_HEIGHT_VH = 80 + VH_CARD_PHASE;

function easeOut(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

const SLIDE_IN_OFFSET_VW = 100;
const STACK_OFFSET_PX = 20;
const STACK_OFFSET_X_PX = 14;
const START_Y_VH_SPREAD = 50;
const CARD_WIDTH_CLASS = 'w-[38rem] max-w-[95vw]';

function startYVh(index: number): number {
  if (NUM_CARDS <= 1) return 0;
  return (index / (NUM_CARDS - 1)) * START_Y_VH_SPREAD - START_Y_VH_SPREAD / 2;
}

function cardSlideProgress(sectionProgress: number, index: number): number {
  const windowStartVh = index * VH_PER_CARD;
  const windowEndVh = windowStartVh + VH_PER_CARD;
  const start = windowStartVh / SECTION_HEIGHT_VH;
  const end = windowEndVh / SECTION_HEIGHT_VH;
  const t = (sectionProgress - start) / (end - start);
  const raw = Math.max(0, Math.min(1, t));
  // As soon as we enter the window (>0), snap to 1 so the CSS transition
  // drives the animation and avoids a long "nothing happens" region.
  return raw === 0 ? 0 : 1;
}

function ExperienceSlideCard({
  exp,
  index,
  slideProgress,
}: {
  exp: ExperienceItem;
  index: number;
  slideProgress: number;
}) {
  const eased = easeOut(Math.min(1, slideProgress));
  const stackOffsetX = index * STACK_OFFSET_X_PX;
  const startY = startYVh(index);
  const translateX = `calc(${(1 - eased) * SLIDE_IN_OFFSET_VW}vw + ${eased * stackOffsetX}px)`;
  const translateY = `calc(${(1 - eased) * startY}vh + ${eased * (-index * STACK_OFFSET_PX)}px)`;
  const borderClass = getEmployerBorder(exp.employer);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-6 pt-10 pointer-events-none"
      style={{ zIndex: index + 1 }}
    >
      <div
        className={cn(CARD_WIDTH_CLASS, 'pointer-events-auto will-change-transform flex-shrink-0')}
        style={{
          transform: `translate(${translateX}, ${translateY})`,
          transition: 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div
          className={cn(
            'bg-card border border-border rounded-xl shadow-md overflow-hidden border-l-4 flex flex-col h-[20rem]',
            borderClass
          )}
        >
          <div className="px-5 py-4 border-b border-border/80 flex-shrink-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-bold text-foreground">{exp.company}</h3>
              <span className="text-xs text-muted-foreground">{exp.period}</span>
            </div>
            <p className="text-sm text-primary font-medium mt-0.5">{exp.role}</p>
            <p className="text-xs text-muted-foreground">{exp.employer}</p>
          </div>
          <div className="px-5 py-4 flex-1 min-h-0 overflow-y-auto">
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {exp.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceDesktop() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionProgress = useSectionProgress(sectionRef, SECTION_HEIGHT_VH);
  const lenis = useLenis();
  const [cardProgress, setCardProgress] = useState<number[]>(() => experiences.map(() => 0));
  const animTimeoutRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const lastSectionProgressRef = useRef(0);

  // Step cards one-by-one based on scroll direction, with binary states (0 or 1).
  useEffect(() => {
    // When scroll-lock override is active (e.g. scroll-to-top), just sync directly.
    if (isScrollLockOverridden()) {
      setCardProgress(experiences.map((_, index) => cardSlideProgress(sectionProgress, index)));
      lastSectionProgressRef.current = sectionProgress;
      return;
    }

    const last = lastSectionProgressRef.current;
    const direction: 'down' | 'up' | 'none' =
      sectionProgress > last ? 'down' : sectionProgress < last ? 'up' : 'none';
    lastSectionProgressRef.current = sectionProgress;

    if (direction === 'none' || isAnimatingRef.current) {
      return;
    }

    setCardProgress((prev) => {
      const target = experiences.map((_, index) => cardSlideProgress(sectionProgress, index));

      const entering: number[] = [];
      const exiting: number[] = [];

      for (let i = 0; i < target.length; i++) {
        if (target[i] === prev[i]) continue;
        if (target[i] > prev[i]) {
          entering.push(i);
        } else {
          exiting.push(i);
        }
      }

      let chosenIndex = -1;

      if (direction === 'down') {
        if (entering.length === 0) return prev;
        chosenIndex = Math.min(...entering);
      } else {
        if (exiting.length === 0) return prev;
        chosenIndex = Math.max(...exiting);
      }

      const next = [...prev];
      next[chosenIndex] = target[chosenIndex];
      return next;
    });
  }, [sectionProgress]);

  // Lock Lenis scroll while a card animation is in progress,
  // unless a global override is active (e.g. scroll-to-top button).
  useEffect(() => {
    if (!lenis || isScrollLockOverridden()) return;

    // Any change in cardProgress means a new animation step.
    if (animTimeoutRef.current !== null) {
      window.clearTimeout(animTimeoutRef.current);
    } else {
      isAnimatingRef.current = true;
      lenis.stop();
    }

    animTimeoutRef.current = window.setTimeout(() => {
      animTimeoutRef.current = null;
      isAnimatingRef.current = false;
      if (!isScrollLockOverridden()) {
        lenis.start();
      }
    }, 1400); // match CSS transition duration
  }, [cardProgress, lenis]);

  // Cleanup on unmount: clear timer and re-enable scroll.
  useEffect(() => {
    return () => {
      if (animTimeoutRef.current !== null) {
        window.clearTimeout(animTimeoutRef.current);
        animTimeoutRef.current = null;
      }
      isAnimatingRef.current = false;
      if (lenis) {
        lenis.start();
      }
    };
  }, [lenis]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-muted/40"
      style={{ minHeight: `${SECTION_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 left-0 right-0 h-screen z-10 min-h-screen flex px-6">
        <h2 className="sr-only">Uppdrag</h2>
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center text-2xl md:text-4xl lg:text-5xl font-semibold tracking-[0.4em] text-foreground uppercase">
            <span>Upp</span>
            <span>drag</span>
          </div>
        </div>
        <div className="relative flex-[2] min-h-0 pl-8">
          {experiences.map((exp, index) => {
            const progress = cardProgress[index] ?? 0;
            return (
              <ExperienceSlideCard
                key={exp.id}
                exp={exp}
                index={index}
                slideProgress={progress}
              />
            );
          })}
        </div>
      </div>
      <div style={{ height: `${VH_CARD_PHASE}vh` }} aria-hidden />
    </section>
  );
}

export function Experience() {
  const isDesktop = useIsDesktop();
  return (
    <section id="experience">
      {isDesktop ? <ExperienceDesktop /> : <ExperienceMobile />}
    </section>
  );
}
