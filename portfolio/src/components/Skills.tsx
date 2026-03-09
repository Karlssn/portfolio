import { useEffect, useRef } from 'react';
import { skills } from '../data/experience';
import { cssHslToHex } from '../lib/color';
import { useLanguage } from '../i18n';

/**
 * Yellow Vanta trunk globe in the corner, using theme colors.
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

export function Skills() {
  const { language } = useLanguage();
  return (
    <section
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{ minHeight: '100vh' }}
      aria-label={language === 'sv' ? 'Kompetenser' : 'Skills'}
    >
      <div className="container mx-auto px-4 sm:px-6 h-full">
        <div className="relative flex flex-col md:flex-row items-stretch gap-10 md:gap-16 h-full">
          <div className="relative flex-1 hidden md:block">
            <TrunkCorner />
          </div>

          <div className="relative flex-1 md:flex md:flex-col md:justify-center z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {language === 'sv' ? 'Tekniker jag arbetar med' : 'Technologies I work with'}
            </h2>
            <p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground">
              {language === 'sv'
                ? 'Jag har flera års erfarenhet som fullstackutvecklare med fokus på .NET och moderna webbtekniker. Jag strävar efter att skriva lösningar som är lätta att underhålla, tydligt strukturerade och byggda för att hålla över tid. Jag lägger också mycket vikt vid kontinuerligt lärande, så att jag kan göra välgrundade och pragmatiska teknikval i varje nytt projekt.'
                : 'I have several years of experience as a fullstack developer with a focus on .NET and modern web technologies. I aim to build solutions that are easy to maintain, clearly structured and built to last. I also place a lot of emphasis on continuous learning so I can make well founded and pragmatic technology choices in every new project.'}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {skills.map((skillName) => (
                <span
                  key={skillName}
                  className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-sm sm:text-base font-medium text-foreground/90 bg-background/40 backdrop-blur hover:border-primary/30 transition-colors cursor-pointer"
                >
                  {skillName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
