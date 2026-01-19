import { Mail, Phone, MapPin, Send, Linkedin, Github, Terminal } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.05)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur border border-border rounded-lg px-4 py-2 mb-6">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground font-mono text-sm">./contact --send-message</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Interested in working together? Feel free to reach out.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <a 
                    href="mailto:johnmartink@hotmail.com"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground font-medium">johnmartink@hotmail.com</p>
                    </div>
                  </a>

                  <a 
                    href="tel:+46722262100"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors group"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-foreground font-medium">+46 72 226 21 00</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-3 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-foreground font-medium">Örebro, Sverige</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
                  <div className="flex gap-3">
                    <a 
                      href="#" 
                      className="p-3 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href="#" 
                      className="p-3 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card/50 backdrop-blur border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-6">Send a Message</h3>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 group"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
              
              <p className="text-xs text-muted-foreground mt-4 text-center">
                * This is a static site. Form submissions require a backend service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

