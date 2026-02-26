import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { skills } from '../data/experience';
import { useSectionProgress } from '../hooks/useScrollProgress';
import { useIsDesktop } from '../hooks/useIsDesktop';
import { cssHslToHex } from '../lib/color';

const SKILLS_SECTION_VH = 360;

/**
 * Small Vanta trunk background in the bottom-left corner.
 * Only used on desktop (md+). Colors are read from CSS variables so they follow theme.
 */
function TrunkCorner() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mountedRef = useRef(true);
  const destroyRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    const el = ref.current;
    if (!el) return;

    let cancelled = false;

    const run = async () => {
      const TRUNK = (await import('vanta/dist/vanta.trunk.min')).default;
      const p5 = (await import('p5')).default;
      if (cancelled || !mountedRef.current || !ref.current) return;
      const root = document.documentElement;
      const bg = getComputedStyle(root).getPropertyValue('--background').trim();
      const primary = getComputedStyle(root).getPropertyValue('--primary').trim();
      const instance = TRUNK({
        el: ref.current,
        p5,
        color: cssHslToHex(primary),
        backgroundColor: cssHslToHex(bg),
        backgroundAlpha: 1.0,
        spacing: 0,
        chaos: 1,
      });
      return () => {
        if (instance?.destroy) instance.destroy();
      };
    };

    const promise = run();
    promise.then((d) => {
      if (d) destroyRef.current = d;
      if (!mountedRef.current && typeof d === 'function') d();
    });

    return () => {
      cancelled = true;
      mountedRef.current = false;
      destroyRef.current?.();
      destroyRef.current = null;
      promise.then((d) => {
        if (d && !mountedRef.current) d();
      });
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute -left-[95vh] -bottom-[95vh] w-[190vh] h-[190vh] rounded-full overflow-hidden bg-transparent origin-center scale-[1.8]"
    />
  );
}

/** Opacity 0..1 when section is in view, for fixed overlay visibility. */
function sectionVisibility(progress: number): number {
  const FADE_IN_END = 0.08;
  if (progress <= 0) return 0;
  if (progress >= 1) return 0;
  if (progress < FADE_IN_END) return progress / FADE_IN_END;
  return 1;
}

const GAP_PX = 8;

/** Mobile: simple static list, no scroll-driven layout. */
function SkillsMobile() {
  return (
    <section
      className="relative py-16 sm:py-20 min-h-0"
      style={{ minHeight: '50vh' }}
      aria-label="Kompetenser"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Tekniker jag arbetar med
        </h2>
        <div className="flex flex-col gap-3">
          {skills.map((skillName) => (
            <div
              key={skillName}
              className="text-xl font-semibold text-foreground"
            >
              {skillName}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Desktop: scroll-driven fixed overlay with Vanta and sliding list. */
function SkillsDesktop() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [listTranslateY, setListTranslateY] = useState(0);

  const progress = useSectionProgress(sectionRef, SKILLS_SECTION_VH);

  const { currentSkill, surrounding } = useMemo(() => {
    if (skills.length === 0) {
      return { currentSkill: '', surrounding: [] as string[] };
    }
    const index = Math.min(
      skills.length - 1,
      Math.max(0, Math.floor(progress * (skills.length + 2)))
    );
    const current = skills[index] ?? skills[skills.length - 1];
    const start = Math.max(0, index - 4);
    const end = Math.min(skills.length, index + 6);
    return {
      currentSkill: current,
      surrounding: skills.slice(start, end),
    };
  }, [progress]);

  useLayoutEffect(() => {
    const container = curtainRef.current;
    const list = listRef.current;
    if (!container || !list || surrounding.length === 0) return;

    const activeIndex = surrounding.findIndex((s) => s === currentSkill);
    if (activeIndex < 0) return;

    const firstRow = list.querySelector('[data-skill-row]');
    const containerHeight = container.offsetHeight;
    const rowHeight = firstRow
      ? (firstRow as HTMLElement).offsetHeight + GAP_PX
      : 40;

    const centerY = containerHeight / 2;
    const activeCenter = activeIndex * rowHeight + rowHeight / 2;
    const translateY = centerY - activeCenter;

    const raf = requestAnimationFrame(() => {
      setListTranslateY(translateY);
    });
    return () => cancelAnimationFrame(raf);
  }, [surrounding, currentSkill]);

  const visible = sectionVisibility(progress);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ minHeight: `${SKILLS_SECTION_VH}vh` }}
      aria-label="Kompetenser"
    >
      <div
        className="fixed inset-0 z-10 pointer-events-none flex flex-col md:flex-row justify-center px-4 md:px-8 lg:px-12"
        style={{ opacity: visible }}
        aria-hidden={visible < 0.5}
      >
        <div className="pointer-events-auto w-full md:w-5/12 lg:max-w-xl md:pr-10 md:self-center md:-mt-[37vh]">
          <TrunkCorner />
          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Tekniker jag arbetar med
            </h2>
          </div>
        </div>

        <div className="pointer-events-auto w-full md:w-7/12 lg:max-w-2xl md:pl-10 mt-10 md:mt-0 md:self-center md:ml-4">
          <div
            ref={curtainRef}
            className="relative h-56 md:h-72 overflow-hidden"
          >
            <div
              ref={listRef}
              className="relative flex flex-col gap-2 transition-[transform] duration-700 ease-out"
              style={{ transform: `translateY(${listTranslateY}px)` }}
            >
              {surrounding.map((skillName, index) => {
                const isCurrent = skillName === currentSkill;
                const isEdge =
                  index === 0 || index === surrounding.length - 1;
                const opacity = isCurrent ? 1 : isEdge ? 0.35 : 0.9;

                return (
                  <div
                    key={skillName}
                    data-skill-row
                    className={
                      'text-xl md:text-3xl font-semibold transition-all duration-300 ' +
                      (isCurrent
                        ? 'text-primary'
                        : 'text-foreground/80 scale-95')
                    }
                    style={{ opacity }}
                  >
                    {skillName}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <SkillsDesktop /> : <SkillsMobile />;
}
