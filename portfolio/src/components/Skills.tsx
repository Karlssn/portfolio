import { Code2, Cloud, Database, Wrench, Server } from 'lucide-react';
import { skills } from '../data/experience';
import { cn } from '../lib/utils';

const skillCategories = [
  { key: 'backend', label: 'Backend', icon: Server, color: 'text-commit-main' },
  { key: 'frontend', label: 'Frontend', icon: Code2, color: 'text-commit-feature' },
  { key: 'cloud', label: 'Cloud & DevOps', icon: Cloud, color: 'text-commit-merge' },
  { key: 'databases', label: 'Databases', icon: Database, color: 'text-amber-500' },
  { key: 'other', label: 'Other', icon: Wrench, color: 'text-commit-hotfix' },
] as const;

export function Skills() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur border border-border rounded-lg px-4 py-2 mb-6">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground font-mono text-sm">cat skills.json</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold">
            <span className="text-primary">Technical</span> Skills
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skillCategories.map((category, catIndex) => {
            const Icon = category.icon;
            const categorySkills = skills[category.key as keyof typeof skills];
            
            return (
              <div 
                key={category.key}
                className={cn(
                  "group bg-card/50 backdrop-blur border border-border rounded-xl p-6",
                  "hover:border-primary/50 transition-all duration-300",
                  "hover:shadow-lg hover:shadow-primary/5",
                  "opacity-0 animate-slide-up",
                  category.key === 'other' && "md:col-span-2 lg:col-span-1"
                )}
                style={{ animationDelay: `${0.1 * catIndex}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(
                    "p-2 rounded-lg bg-secondary",
                    category.color
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground">{category.label}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span 
                      key={skill}
                      className="text-xs px-3 py-1.5 bg-secondary hover:bg-primary/20 hover:text-primary text-secondary-foreground rounded-full font-mono transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

