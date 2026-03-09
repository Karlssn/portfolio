import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { experiences, EMPLOYER_BORDER_CLASS } from '../data/experience';
import { useIsDesktop } from '../hooks/useIsDesktop';
import type { Experience as ExperienceItem } from '../data/experience';
import { cn } from '../lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLenis } from 'lenis/react';

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
  const accordionRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const lenis = useLenis();
  const prevOpenRef = useRef<string | null>(employerGroups[0]?.employer ?? null);

  // When opening a different accordion, scroll to its top so user sees the new content
  useLayoutEffect(() => {
    if (openEmployer === null || openEmployer === prevOpenRef.current) return;
    prevOpenRef.current = openEmployer;
    const el = accordionRefs.current.get(openEmployer);
    if (!el) return;

    const scrollY = lenis ? lenis.scroll : window.scrollY;
    const top = el.getBoundingClientRect().top + scrollY;
    if (lenis) {
      lenis.scrollTo(top, { duration: 0.8 });
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [openEmployer, lenis]);

  return (
    <div className="relative bg-muted/40 py-16 sm:py-20 min-h-screen">
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
                ref={(el) => {
                  if (el) accordionRefs.current.set(employer, el);
                }}
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
                    {[...items].reverse().map((exp) => (
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

// ---- Desktop: employer groups, stacked cards with hover-to-maximize ----

const NUM_GROUPS = employerGroups.length;

function easeOut(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

const SLIDE_IN_OFFSET_VW = 100;
const STACK_OFFSET_PX = 40;
const STACK_OFFSET_X_PX = 32;
const EXIT_TRANSLATE_Y_VH = 140;
const EXIT_ANIMATION_DURATION_MS = 900;
const START_Y_VH_SPREAD = 40;
const CARD_WIDTH_CLASS = 'w-[38rem] max-w-[95vw]';
const HOVER_Z_OFFSET = 100;

function startYVhForGroup(groupIndex: number): number {
  if (NUM_GROUPS <= 1) return 0;
  return (groupIndex / (NUM_GROUPS - 1)) * START_Y_VH_SPREAD - START_Y_VH_SPREAD / 2;
}

function ExperienceSlideCard({
  exp,
  groupIndex,
  cardIndexInGroup,
  totalInGroup,
  slideProgress,
  isHovered,
  onHoverChange,
  isExiting,
  exitProgress,
}: {
  exp: ExperienceItem;
  groupIndex: number;
  cardIndexInGroup: number;
  totalInGroup: number;
  slideProgress: number;
  isHovered: boolean;
  onHoverChange: (id: string | null) => void;
  isExiting?: boolean;
  exitProgress?: number;
}) {
  const eased = easeOut(Math.min(1, slideProgress));
  const startY = startYVhForGroup(groupIndex);
  const borderClass = getEmployerBorder(exp.employer);

  // Stack offset within group: each card offset from the previous
  const stackOffsetX = cardIndexInGroup * STACK_OFFSET_X_PX;
  const stackOffsetY = cardIndexInGroup * STACK_OFFSET_PX;

  const baseTranslateX = `calc(${(1 - eased) * SLIDE_IN_OFFSET_VW}vw + ${eased * stackOffsetX}px)`;
  const baseTranslateYVh = (1 - eased) * startY;
  const baseTranslateYPx = eased * -stackOffsetY;

  let totalTranslateYVh = baseTranslateYVh;
  if (isExiting && exitProgress !== undefined) {
    const exitY = easeOut(exitProgress) * EXIT_TRANSLATE_Y_VH;
    totalTranslateYVh += exitY;
  }

  const groupTranslateX = baseTranslateX;
  const groupTranslateY = `calc(${totalTranslateYVh}vh + ${baseTranslateYPx}px)`;
  const zIndex = isHovered
    ? groupIndex * HOVER_Z_OFFSET + totalInGroup + HOVER_Z_OFFSET
    : groupIndex * HOVER_Z_OFFSET + cardIndexInGroup;

  const slideTransition = 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)';
  const exitTransition = `transform ${EXIT_ANIMATION_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-6 pt-10 pointer-events-none"
      style={{ zIndex }}
    >
      <div
        className={cn(
          CARD_WIDTH_CLASS,
          'will-change-transform flex-shrink-0',
          isExiting ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
        )}
        style={{
          transform: `translate(${groupTranslateX}, ${groupTranslateY})`,
          transition: isExiting ? exitTransition : slideTransition,
        }}
        onMouseEnter={() => onHoverChange(exp.id)}
        onMouseLeave={() => onHoverChange(null)}
      >
        <div
          className={cn(
            'bg-card border border-border rounded-xl shadow-md overflow-hidden border-l-4 flex flex-col h-[20rem]',
            isHovered && 'shadow-xl ring-2 ring-primary/20',
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

function EmployerGroupStack({
  items,
  groupIndex,
  slideProgress,
  hoveredCardId,
  onHoverChange,
  isExiting,
}: {
  items: ExperienceItem[];
  groupIndex: number;
  slideProgress: number;
  hoveredCardId: string | null;
  onHoverChange: (id: string | null) => void;
  isExiting?: boolean;
}) {
  // Animate fly-in from 0→1 when group mounts (slideProgress is 1). Defer the
  // update so the initial "out" position is painted before we transition to "in".
  const [displayProgress, setDisplayProgress] = useState(0);
  const [exitProgress, setExitProgress] = useState(0);

  useEffect(() => {
    if (slideProgress === 1 && !isExiting) {
      const id = window.setTimeout(() => setDisplayProgress(1), 0);
      return () => window.clearTimeout(id);
    }
    if (slideProgress === 0) {
      setDisplayProgress(0);
    }
  }, [slideProgress, isExiting]);

  useEffect(() => {
    if (isExiting) {
      const id = window.setTimeout(() => setExitProgress(1), 0);
      return () => window.clearTimeout(id);
    }
    setExitProgress(0);
  }, [isExiting]);

  const progressToUse = slideProgress === 1 && !isExiting ? displayProgress : slideProgress;

  return (
    <>
      {items.map((exp, cardIndex) => (
        <ExperienceSlideCard
          key={exp.id}
          exp={exp}
          groupIndex={groupIndex}
          cardIndexInGroup={cardIndex}
          totalInGroup={items.length}
          slideProgress={progressToUse}
          isHovered={hoveredCardId === exp.id}
          onHoverChange={onHoverChange}
          isExiting={isExiting}
          exitProgress={isExiting ? exitProgress : undefined}
        />
      ))}
    </>
  );
}

function ExperienceDesktop() {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [exitingGroupIndex, setExitingGroupIndex] = useState<number | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  useEffect(() => {
    if (exitingGroupIndex === null) return;
    const id = window.setTimeout(() => {
      setExitingGroupIndex(null);
    }, EXIT_ANIMATION_DURATION_MS);
    return () => window.clearTimeout(id);
  }, [exitingGroupIndex]);

  const handleChangeGroup = (index: number) => {
    if (index === currentGroupIndex) return;
    if (index < 0 || index >= employerGroups.length) return;
    setExitingGroupIndex(currentGroupIndex);
    setCurrentGroupIndex(index);
    setHoveredCardId(null);
  };

  return (
    <section className="relative bg-muted/40 min-h-screen flex items-center">
      <div className="container mx-auto px-6 lg:px-10 flex flex-col lg:flex-row gap-10 py-16">
        <div className="flex-1 flex flex-col items-start justify-center gap-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Uppdrag</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            {employerGroups[currentGroupIndex].employer}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {employerGroups.map((group, index) => {
              const isActive = index === currentGroupIndex;
              return (
                <button
                  key={group.employer}
                  type="button"
                  onClick={() => handleChangeGroup(index)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs md:text-sm border transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-muted-foreground border-border hover:bg-secondary/60'
                  )}
                  aria-pressed={isActive}
                >
                  {group.employer}
                </button>
              );
            })}
          </div>
        </div>
        <div className="relative flex-[2] min-h-[26rem] lg:min-h-[30rem]">
          {exitingGroupIndex !== null && (
            <EmployerGroupStack
              key={`exiting-${employerGroups[exitingGroupIndex].employer}`}
              items={employerGroups[exitingGroupIndex].items}
              groupIndex={exitingGroupIndex}
              slideProgress={1}
              hoveredCardId={null}
              onHoverChange={() => {}}
              isExiting
            />
          )}
          <EmployerGroupStack
            key={employerGroups[currentGroupIndex].employer}
            items={employerGroups[currentGroupIndex].items}
            groupIndex={currentGroupIndex}
            slideProgress={1}
            hoveredCardId={hoveredCardId}
            onHoverChange={setHoveredCardId}
          />
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const isDesktop = useIsDesktop();
  return (
    <section id="experience" className={isDesktop ? 'min-h-screen' : undefined}>
      {isDesktop ? <ExperienceDesktop /> : <ExperienceMobile />}
    </section>
  );
}
