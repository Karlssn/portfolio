import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { education, certifications, employers } from '../data/experience';
import { cn } from '../lib/utils';

export function Education() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Employers */}
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-secondary text-primary">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Employers</h3>
            </div>
            
            <div className="space-y-4">
              {employers.map((employer, index) => (
                <div 
                  key={employer.name}
                  className={cn(
                    "group bg-card/50 backdrop-blur border border-border rounded-lg p-4",
                    "hover:border-primary/50 transition-all duration-300"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {employer.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{employer.role}</p>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono bg-secondary px-2 py-1 rounded">
                      {employer.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-secondary text-commit-feature">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Education</h3>
            </div>
            
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div 
                  key={edu.degree}
                  className={cn(
                    "group bg-card/50 backdrop-blur border border-border rounded-lg p-4",
                    "hover:border-commit-feature/50 transition-all duration-300"
                  )}
                >
                  <h4 className="font-semibold text-foreground group-hover:text-commit-feature transition-colors text-sm">
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-muted-foreground">{edu.school}</p>
                  <span className="text-xs text-muted-foreground font-mono">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-secondary text-commit-merge">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Certifications</h3>
            </div>
            
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div 
                  key={cert.name}
                  className={cn(
                    "group bg-card/50 backdrop-blur border border-border rounded-lg p-4",
                    "hover:border-commit-merge/50 transition-all duration-300"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-commit-merge/10 rounded">
                      <Award className="w-4 h-4 text-commit-merge" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-commit-merge transition-colors text-sm">
                        {cert.name}
                      </h4>
                      <span className="text-xs text-muted-foreground font-mono">{cert.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Azure badge visual */}
            <div className="mt-6 p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  Az
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Microsoft Azure</p>
                  <p className="text-xs text-muted-foreground">Certified Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

