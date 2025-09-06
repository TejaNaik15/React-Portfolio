import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import ShinyText from '../components/ShinyText';

const About = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 }); 

  return (
    <section id="about" className="py-16 text-white text-center px-4 bg-[#1F2937]/60 backdrop-blur-sm">

  <div className="container mx-auto max-w-4xl">
    <h2 className="text-4xl md:text-5xl font-bold mb-2 text-accent-pink">
      About Me
    </h2>
    <div className="mb-6">
      <ShinyText text="A glimpse into who I am" speed={6} className="text-2xl md:text-3xl" />
    </div>
    <p className="text-lg md:text-xl leading-relaxed mb-4 text-text-muted">
      Hello there! I'm Teja Naik, a dedicated **MERN Stack Developer** fueled by curiosity and a relentless passion for crafting innovative web solutions.
    </p>
    <p className="text-lg md:text-xl leading-relaxed mb-4 text-text-muted">
      My expertise spans across the entire MERN ecosystem – building robust APIs with Node.js and Express.js, managing data flow with MongoDB, and creating dynamic, responsive UIs with React. What truly drives me is the constant evolution of technology. I thrive on learning new paradigms, embracing emerging tools, and continuously refining my skills to build more efficient and impactful applications.
    </p>
    <p className="text-lg md:text-xl leading-relaxed text-text-muted">
      I believe that great software is a blend of clean code, thoughtful architecture, and a commitment to continuous improvement. Let's build the future, one elegant solution at a time.
    </p>
  </div>
</section>
  );
};

export default About;
