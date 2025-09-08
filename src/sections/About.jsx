import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import ShinyText from '../components/ShinyText';
import Particles from '../components/Particles';
import VariableProximity from '../components/VariableProximity';
import SocialIcons from '../components/SocialIcons';
import { BorderBeam } from '@/components/magicui/border-beam.jsx';

const About = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });
  const containerRef = sectionRef;

  const from = "'wght' 350, 'opsz' 14";
  const to = "'wght' 900, 'opsz' 72";

  return (
    <section id="about" ref={sectionRef} className="relative py-16 text-white px-4 bg-primary-dark overflow-hidden scroll-mt-28 md:scroll-mt-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles className="w-full h-full" alphaParticles={true} particleCount={180} speed={0.1} particleBaseSize={70} sizeRandomness={1} />
      </div>
      <div className="relative z-10 container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div id="profile-about-slot" className="min-h-[360px] order-1 md:order-none" />
        <div className="order-2 md:order-none">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 text-accent-blue">About Me</h2>
          <div className="mb-6">
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
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="/assets/resume.pdf"
              download
              className="relative inline-flex items-center gap-2 bg-accent-blue text-white px-6 py-3 rounded-full text-lg hover:bg-white/20 border border-accent-blue/40 transition-colors duration-300 overflow-hidden"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 13.586V4a1 1 0 0 1 1-1z"/><path d="M5 20a2 2 0 0 1-2-2v-2a1 1 0 1 1 2 0v2h14v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H5z"/></svg>
                Download Resume
              </span>
              <span className="absolute inset-0 rounded-full pointer-events-none" aria-hidden>
                <BorderBeam duration={8} size={120} colors={["#13ADC7","#945DD6","#FF3C78"]} />
              </span>
            </a>
            <div className="flex items-center gap-3">
              <SocialIcons type="instagram" link="https://instagram.com/" />
              <SocialIcons type="twitter" link="https://twitter.com/" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
