import { GitBranch, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and copyright */}
          <div className="flex items-center gap-3">
            <GitBranch className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              © {currentYear} Martin Wärlegård. All rights reserved.
            </span>
          </div>

          {/* Git-style footer */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-commit-hotfix fill-commit-hotfix" />
            <span>using React + Tailwind</span>
          </div>

          {/* Branch info */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-commit-main">●</span>
            <span className="text-muted-foreground">main</span>
            <span className="text-muted-foreground/50">|</span>
            <span className="text-muted-foreground">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

