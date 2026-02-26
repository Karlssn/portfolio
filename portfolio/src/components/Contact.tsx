import { Mail, Phone, Linkedin, Github, Download } from 'lucide-react';
import { CV_PATH, CV_DOWNLOAD_FILENAME } from '../constants';

export function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center py-20 bg-background bg-demo-dots"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Kontakt
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md mx-auto">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
              Kontaktuppgifter
            </h3>

            <div className="space-y-3">
              <a
                href="mailto:johnmartink@hotmail.com"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">E-post</p>
                  <p className="text-sm text-foreground font-medium">
                    johnmartink@hotmail.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+46722262100"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Telefon</p>
                  <p className="text-sm text-foreground font-medium">
                    +46 72 226 21 00
                  </p>
                </div>
              </a>

              <a
                href={CV_PATH}
                download={CV_DOWNLOAD_FILENAME}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">CV</p>
                  <p className="text-sm text-foreground font-medium">
                    Ladda ner CV
                  </p>
                </div>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="p-3 rounded-lg">
                <div className="flex gap-2">
                  <a
                    href="https://www.linkedin.com/in/karlssn/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/Karlssn/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

