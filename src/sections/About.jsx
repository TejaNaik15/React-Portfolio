import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import ShinyText from '../components/ShinyText';
import VariableProximity from '../components/VariableProximity';

const About = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });
  const containerRef = sectionRef;

  const from = "'wght' 350, 'opsz' 14";
  const to = "'wght' 900, 'opsz' 72";

  return (
    <section id="about" ref={sectionRef} className="py-16 text-white text-center px-4 bg-[#1F2937]/60 backdrop-blur-sm">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-2 text-accent-pink">About Me</h2>
        <div className="mb-8">
          <ShinyText text="A glimpse into who I am" speed={6} className="text-2xl md:text-3xl" />
        </div>
        <div className="space-y-4 text-text-muted text-lg md:text-xl leading-relaxed">
          <VariableProximity
            label={"Hello there! I'm Teja Naik, a dedicated MERN Stack Developer fueled by curiosity and a relentless passion for crafting innovative web solutions."}
            fromFontVariationSettings={from}
            toFontVariationSettings={to}
            containerRef={containerRef}
            radius={120}
            falloff="gaussian"
          />
          <VariableProximity
            label={"My expertise spans across the entire MERN ecosystem – building robust APIs with Node.js and Express.js, managing data flow with MongoDB, and creating dynamic, responsive UIs with React. What truly drives me is the constant evolution of technology."}
            fromFontVariationSettings={from}
            toFontVariationSettings={to}
            containerRef={containerRef}
            radius={120}
            falloff="gaussian"
          />
          <VariableProximity
            label={"I thrive on learning new paradigms, embracing emerging tools, and continuously refining my skills to build more efficient and impactful applications. I believe that great software is a blend of clean code, thoughtful architecture, and a commitment to continuous improvement."}
            fromFontVariationSettings={from}
            toFontVariationSettings={to}
            containerRef={containerRef}
            radius={120}
            falloff="gaussian"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
