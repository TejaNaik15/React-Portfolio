import React, { useMemo } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import ShaderBackground from '@/components/ShaderBackground.jsx';
import { ThreeDScrollTriggerContainer, ThreeDScrollTriggerRow } from '../components/ThreeDScrollTrigger';
import { useTheme } from '@/context/ThemeContext.jsx';

const cdn = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

const Skills = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const items = useMemo(() => [
    { id: 'html5', name: 'HTML5', img: cdn('html5/html5-original.svg'), height: 280, url: 'https://developer.mozilla.org/docs/Web/HTML' },
    { id: 'css3', name: 'CSS3', img: cdn('css3/css3-original.svg'), height: 260, url: 'https://developer.mozilla.org/docs/Web/CSS' },
    { id: 'javascript', name: 'JavaScript', img: cdn('javascript/javascript-original.svg'), height: 300, url: 'https://developer.mozilla.org/docs/Web/JavaScript' },
    { id: 'typescript', name: 'TypeScript', img: cdn('typescript/typescript-original.svg'), height: 280, url: 'https://www.typescriptlang.org' },
    { id: 'react', name: 'React', img: cdn('react/react-original.svg'), height: 320, url: 'https://react.dev' },
    { id: 'nodejs', name: 'Node.js', img: cdn('nodejs/nodejs-original.svg'), height: 260, url: 'https://nodejs.org' },
    { id: 'java', name: 'Java', img: cdn('java/java-original.svg'), height: 300, url: 'https://www.oracle.com/java/' },
    { id: 'mongodb', name: 'MongoDB', img: cdn('mongodb/mongodb-original.svg'), height: 300, url: 'https://mongodb.com' },
    { id: 'express', name: 'Express.js', img: cdn('express/express-original.svg'), height: 260, url: 'https://expressjs.com' },
    { id: 'tailwind', name: 'Tailwind CSS', img: cdn('tailwindcss/tailwindcss-original.svg'), height: 280, url: 'https://tailwindcss.com' },
    { id: 'nextjs', name: 'Next.js', img: cdn('nextjs/nextjs-original.svg'), height: 300, url: 'https://nextjs.org' },
    { id: 'git', name: 'Git', img: cdn('git/git-original.svg'), height: 260, url: 'https://git-scm.com' },
    { id: 'github', name: 'GitHub', img: cdn('github/github-original.svg'), height: 260, url: 'https://github.com' },
    { id: 'bootstrap', name: 'Bootstrap', img: cdn('bootstrap/bootstrap-original.svg'), height: 260, url: 'https://getbootstrap.com' },
    { id: 'vite', name: 'Vite', img: cdn('vite/vite-original.svg'), height: 260, url: 'https://vitejs.dev' },
    { id: 'c', name: 'C Programming', img: cdn('c/c-original.svg'), height: 240, url: 'https://en.wikipedia.org/wiki/C_(programming_language)' },
    { id: 'python', name: 'Python', img: cdn('python/python-original.svg'), height: 300, url: 'https://python.org' },
    { id: 'firebase', name: 'Firebase', img: cdn('firebase/firebase-plain.svg'), height: 260, url: 'https://firebase.google.com' },
    { id: 'reactrouter', name: 'React Router', img: cdn('reactrouter/reactrouter-plain.svg'), height: 240, url: 'https://reactrouter.com' },
    { id: 'figma', name: 'Figma', img: cdn('figma/figma-original.svg'), height: 260, url: 'https://www.figma.com' },
  ], []);

  const { theme } = useTheme();
  const textColorClass = theme === 'light' ? 'text-black' : 'text-white';

  return (
    <section id="skills" ref={sectionRef} className={`relative min-h-screen min-h-[100svh] bg-primary-dark ${textColorClass} px-4 sm:px-6 md:px-8 py-12 flex flex-col items-center justify-center transition-opacity-transform overflow-hidden scroll-mt-28 md:scroll-mt-40`}>
      <ShaderBackground />

      <div className="relative z-10 container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink">My Skills</h1>

        {/* Horizontally scrolling, responsive skills rows */}
        <SkillsRows items={items} />
      </div>
    </section>
  );
};

export default Skills;

// ————————————————————————————————————————————————
// Local components for skills marquee rows

function SkillsRows({ items }) {
  const rowA = items.filter((_, idx) => idx % 2 === 0);
  const rowB = items.filter((_, idx) => idx % 2 === 1);

  return (
    <ThreeDScrollTriggerContainer className="space-y-6 select-none w-full">
      <ThreeDScrollTriggerRow baseVelocity={6} direction={1} className="py-2">
        {rowA.map((item) => (
          <SkillPill key={item.id} item={item} />
        ))}
      </ThreeDScrollTriggerRow>

      <ThreeDScrollTriggerRow baseVelocity={5} direction={-1} className="py-2">
        {rowB.map((item) => (
          <SkillPill key={item.id} item={item} />
        ))}
      </ThreeDScrollTriggerRow>
    </ThreeDScrollTriggerContainer>
  );
}

function SkillPill({ item }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const shell = isLight ? 'border-black/10 bg-black/5 hover:bg-black/10' : 'border-white/10 bg-white/5 hover:bg-white/10';
  const ring = isLight ? 'ring-black/10' : 'ring-white/10';
  const textColor = isLight ? 'text-black/80 group-hover:text-black' : 'text-white/90 group-hover:text-white';
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative mx-2 my-2 inline-flex items-center gap-3 px-4 py-2 rounded-full border ${shell} transition-colors backdrop-blur-sm shadow-[0_4px_24px_rgba(23,92,230,0.08)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.22)]`}
      aria-label={item.name}
    >
      <span className={`relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#13ADC7]/20 to-[#945DD6]/20 ring-1 ${ring} shadow-[0_0_16px_rgba(148,93,214,0.25)] group-hover:shadow-[0_0_24px_rgba(19,173,199,0.35)] transition-shadow`}>
        <img src={item.img} alt="" className="w-6 h-6 md:w-8 md:h-8 object-contain" loading="lazy" />
      </span>
      <span className={`text-sm md:text-base font-medium ${textColor} whitespace-nowrap`}>
        {item.name}
      </span>
    </a>
  );
}
