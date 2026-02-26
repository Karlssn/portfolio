import { useRef } from 'react';
import { experiences } from '../data/experience';
import { useSectionProgress } from '../hooks/useScrollProgress';
import type { Experience as ExperienceItem } from '../data/experience';
import { cn } from '../lib/utils';

const NUM_CARDS = experiences.length;
const VH_PER_CARD = 55;
const VH_CARD_PHASE = NUM_CARDS * VH_PER_CARD; // scroll while cards animate (385vh)
const SECTION_HEIGHT_VH = 100 + VH_CARD_PHASE; // sticky title + cards scroll

/** Employer → border color (warm tones, distinct but cohesive) */
const EMPLOYER_BORDER: Record<string, string> = {
  'Dormy Golf': 'border-l-primary',
  'B3 Consulting Group': 'border-l-orange-500',
  'Nexer Group': 'border-l-rose-500',
};

function getEmployerBorder(employer: string) {
  return EMPLOYER_BORDER[employer] ?? 'border-l-border';
}

/** Ease out: 0→1 with smooth end */
function easeOut(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

function cardSlideProgress(sectionProgress: number, index: number): number {
  const start = (index * VH_PER_CARD) / SECTION_HEIGHT_VH;
  const end = ((index + 1) * VH_PER_CARD) / SECTION_HEIGHT_VH;
  const t = (sectionProgress - start) / (end - start);
  return Math.max(0, Math.min(1, t));
}


const SLIDE_IN_OFFSET_VW = 100;
const STACK_OFFSET_PX = 20;   // vertical offset per card in the stack
const STACK_OFFSET_X_PX = 14; // horizontal offset per card when landed (one direction)
const START_Y_VH_SPREAD = 50; // total vertical spread (vh) for fly-in start positions

/** Fixed card width (38rem) for consistent stacked layout; max-w-[95vw] caps on small viewports. */
const CARD_WIDTH_CLASS = 'w-[38rem] max-w-[95vw]';

/** Start Y (vh) per card so they fly in from different heights from the left */
function startYVh(index: number): number {
  if (NUM_CARDS <= 1) return 0;
  return (index / (NUM_CARDS - 1)) * START_Y_VH_SPREAD - START_Y_VH_SPREAD / 2;
}

function ExperienceCard({
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
  const zIndex = index + 1;
  const borderClass = getEmployerBorder(exp.employer);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
      style={{ zIndex }}
    >
      <div
        className={cn(CARD_WIDTH_CLASS, 'pointer-events-auto will-change-transform flex-shrink-0')}
        style={{
          transform: `translate(${translateX}, ${translateY})`,
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

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionProgress = useSectionProgress(sectionRef, SECTION_HEIGHT_VH);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-muted/40"
      style={{ minHeight: `${SECTION_HEIGHT_VH}vh` }}
    >
      {/* Sticky: title + cards so both stay visible while cards appear */}
      <div className="sticky top-0 left-0 right-0 h-screen z-10 min-h-screen flex flex-col">
        <div className="flex-shrink-0 pt-20 pb-4 px-6">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Erfarenhet
            </h2>
          </div>
        </div>
        <div className="relative flex-1 min-h-0">
          {experiences.map((exp, index) => {
            const progress = cardSlideProgress(sectionProgress, index);
            return (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={index}
                slideProgress={progress}
              />
            );
          })}
        </div>
      </div>

      {/* Spacer so sticky stays for full card phase (385vh scroll) */}
      <div style={{ height: `${VH_CARD_PHASE}vh` }} aria-hidden />
    </section>
  );
}
