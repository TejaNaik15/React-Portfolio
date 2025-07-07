import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; 
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './layouts/Footer'; 
//import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-primary-dark">
        <NavBar /> 

        <main className="flex-grow">
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