import { Header, Hero, GitTree, Skills, Education, Contact, Footer } from './components';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <GitTree />
        <section id="skills">
          <Skills />
        </section>
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

