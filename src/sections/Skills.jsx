import React, { useMemo } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import Particles from '../components/Particles';
import StickyCard002 from '../components/StickyCard002';

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

  // Brand colors for captions/background accents
  const brandColors = useMemo(() => ({
    html5: '#E44D26',
    css3: '#1572B6',
    javascript: '#F7DF1E',
    typescript: '#3178C6',
    react: '#61DAFB',
    nodejs: '#68A063',
    java: '#ED1D25',
    mongodb: '#4DB33D',
    express: '#AAAAAA',
    tailwind: '#38BDF8',
    nextjs: '#000000',
    git: '#F05032',
    github: '#181717',
    bootstrap: '#7952B3',
    vite: '#646CFF',
    c: '#A8B9CC',
    python: '#3776AB',
    firebase: '#FFCA28',
    reactrouter: '#CA4245',
    figma: '#F24E1E',
  }), []);

  return (
    <section id="skills" ref={sectionRef} className="relative min-h-screen bg-primary-dark text-white p-8 flex flex-col items-center justify-center transition-opacity-transform overflow-hidden scroll-mt-28 md:scroll-mt-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles className="w-full h-full" alphaParticles={true} particleCount={160} speed={0.1} particleBaseSize={70} sizeRandomness={1} />
      </div>

      <div className="relative z-10 container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-accent-blue">My Skills</h1>
        {/* Sticky stacked skill cards with GSAP scrolling transitions */}
        <div className="mx-auto max-w-5xl">
          <StickyCard002
            cards={items.map((it) => ({ id: it.id, image: it.img, alt: it.name, label: it.name, color: brandColors[it.id] || '#00dfd8' }))}
            imageClassName="object-contain bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 sm:p-8 md:p-10 lg:p-12"
            containerClassName="backdrop-blur-sm"
          />
          <p className="mt-6 text-sm text-gray-300">Scroll to reveal the stack.</p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
