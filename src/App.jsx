import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LightRays from './components/LightRays';
import GooeyNav from './components/GooeyNav';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './layouts/Footer';

function App() {
  return (
    <Router>
      <div className="relative flex flex-col min-h-screen bg-primary-dark">
        <LightRays />
        <div className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-4">
          <GooeyNav
            items={[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Skills', href: '#skills' },
              { label: 'Projects', href: '#projects' },
              { label: 'Education', href: '#education' },
              { label: 'Contact', href: '#contact' },
            ]}
          />
        </div>
        <main className="relative z-10 flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <About />
                  <Skills />
                  <Projects />
                  <Education />
                  <Contact />
                </>
              }
            />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
