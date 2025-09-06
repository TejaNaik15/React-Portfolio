import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import ProfileCard from '../components/ProfileCard';
import SocialIcons from '../components/SocialIcons';
import ShinyText from '../components/ShinyText';

const Home = () => {
  const typeRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
    const tl = gsap.timeline({ repeat: -1 });
    const phrases = [
      'Web Development',
      'Frontend Development',
      'Backend Development',
    ];
    phrases.forEach((p) => {
      tl.to(typeRef.current, { duration: 1.2, text: p, ease: 'none' })
        .to(typeRef.current, { duration: 0.8, text: p + ' ', ease: 'none', repeat: 2, yoyo: true })
        .to(typeRef.current, { duration: 0.8, text: '', ease: 'none', delay: 0.4 });
    });
    gsap.fromTo(
      headingRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo(
      subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center text-white overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 ref={headingRef} className="text-4xl md:text-6xl font-extrabold leading-tight">
            Hi, I am<br /> <span className="text-accent-blue">Keloth Teja Naik</span>
          </h1>
           <p ref={subRef} className="text-lg md:text-2xl text-text-muted">
            I'm into <span className="text-white"><span ref={typeRef} className="border-r-2 border-white pr-1" /></span>
          </p>
          <ShinyText text="I’m a passionate MERN Stack Developer specializing in building modern, responsive, and scalable web applications." speed={6} className="text-2xl md:text-3xl mb-2" />
         
          <div className="flex items-center gap-6 pt-2">
            <SocialIcons type="linkedin" link="https://www.linkedin.com/in/teja-naik-0b3021282" />
            <SocialIcons type="email" link="tinkuteja740@gmail.com" />
            <SocialIcons type="github" link="https://github.com/TejaNaik15" />
          </div>
          <div>
            <a href="#projects" className="inline-block bg-accent-blue text-white px-6 py-3 rounded-full text-lg hover:bg-white/20 border border-accent-blue/40 transition-colors duration-300">
              See My Work
            </a>
          </div>
        </div>
        <div className="md:justify-self-end">
          <ProfileCard name="Teja Naik" title="MERN Developer" handle="tejanaik" />
        </div>
      </div>
    </section>
  );
};

export default Home;
