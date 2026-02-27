import { ReactLenis } from 'lenis/react';
import { Hero, Experience, Education, Contact, Skills, ScrollToTop } from './components';

const lenisOptions = {
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 0.6,
  touchMultiplier: 0.8,
  lerp: 0.08,
};

function App() {
  return (
    <ReactLenis root options={lenisOptions}>
      <div className="min-h-screen bg-background text-foreground">
        <main aria-label="Martin Wärlegård – portfolio">
          <Hero />
          <Experience />
          <Skills />
          <Education />
          <Contact />
        </main>
        <ScrollToTop />
      </div>
    </ReactLenis>
  );
}

export default App;

