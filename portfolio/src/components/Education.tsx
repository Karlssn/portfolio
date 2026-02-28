import { useRef } from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { education, certifications, employers } from '../data/experience';
import { useElementVisibility } from '../hooks/useScrollProgress';
import { useIsDesktop } from '../hooks/useIsDesktop';
import { cn } from '../lib/utils';

/** Staggered visibility: 0..1 with optional delay so column appears later on fade-in. */
function staggeredVisibility(visibility: number, delay: number): number {
  if (visibility <= delay) return 0;
  return Math.min(1, (visibility - delay) / (1 - delay));
}

export function Education() {
  const employersRef = useRef<HTMLDivElement | null>(null);
  const certsRef = useRef<HTMLDivElement | null>(null);
  const educationRef = useRef<HTMLDivElement | null>(null);

  const employersVis = useElementVisibility(employersRef, 0.35);
  const certsVis = useElementVisibility(certsRef, 0.35);
  const educationVis = useElementVisibility(educationRef, 0.35);

  const o1 = staggeredVisibility(employersVis, 0);
  const o2 = staggeredVisibility(certsVis, 0.15);
  const o3 = staggeredVisibility(educationVis, 0.3);

  const isDesktop = useIsDesktop();

  const col1Style = isDesktop
    ? { opacity: o1, transform: `translateY(${(1 - o1) * 20}px)` }
    : undefined;
  const col2Style = isDesktop
    ? { opacity: o2, transform: `translateY(${(1 - o2) * 20}px)` }
    : undefined;
  const col3Style = isDesktop
    ? { opacity: o3, transform: `translateY(${(1 - o3) * 20}px)` }
    : undefined;

  return (
    <section className="relative z-30 min-h-screen flex flex-col justify-center py-20 bg-muted overflow-hidden">
      {/* 10 tilted wavy lines from bottom to top; viewBox matches path extent (y: -50..150, x: 5..95) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="rotate(-10 50 50)">
            {[5, 15, 25, 35, 45, 55, 65, 75, 85, 95].map((x, i) => (
              <path
                key={x}
                d={`M${x} 150 Q${x + 8} 100 ${x} 50 T${x} -50`}
                fill="none"
                stroke="hsl(var(--muted-waves))"
                strokeWidth="0.4"
                opacity={0.5 + (i % 3) * 0.1}
              />
            ))}
          </g>
        </svg>
      </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            ref={employersRef}
            className={isDesktop ? 'transform transition-all duration-500 ease-out' : ''}
            style={col1Style}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-secondary text-primary">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Arbetsgivare</h3>
            </div>

            <div className="space-y-4">
              {employers.map((employer) => (
                <div
                  key={employer.name}
                  className={cn(
                    "bg-card border border-border rounded-lg p-4",
                    "hover:border-primary/30 transition-colors"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{employer.name}</h4>
                      <p className="text-sm text-muted-foreground">{employer.role}</p>
                    </div>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded shrink-0">
                      {employer.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={certsRef}
            className={isDesktop ? 'transform transition-all duration-500 ease-out' : ''}
            style={col2Style}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-secondary text-primary">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Certifieringar</h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={`${cert.name}-${cert.year}`}
                  className={cn(
                    "bg-card border border-border rounded-lg p-4",
                    "hover:border-primary/30 transition-colors"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-primary/10 rounded">
                      <Award className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{cert.name}</h4>
                      <span className="text-xs text-muted-foreground">{cert.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={educationRef}
            className={isDesktop ? 'transform transition-all duration-500 ease-out' : ''}
            style={col3Style}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-secondary text-primary">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Utbildning</h3>
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={`${edu.degree}-${edu.school}-${edu.period}`}
                  className={cn(
                    "bg-card border border-border rounded-lg p-4",
                    "hover:border-primary/30 transition-colors"
                  )}
                >
                  <h4 className="font-semibold text-foreground text-sm">{edu.degree}</h4>
                  <p className="text-sm text-muted-foreground">{edu.school}</p>
                  <span className="text-xs text-muted-foreground">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
