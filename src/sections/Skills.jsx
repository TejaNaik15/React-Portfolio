import React, { useMemo } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import Masonry from '../components/Masonry';

const cdn = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

const Skills = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const items = useMemo(() => [
    { id: 'html5', img: cdn('html5/html5-original.svg'), height: 280, url: 'https://developer.mozilla.org/docs/Web/HTML' },
    { id: 'css3', img: cdn('css3/css3-original.svg'), height: 260, url: 'https://developer.mozilla.org/docs/Web/CSS' },
    { id: 'javascript', img: cdn('javascript/javascript-original.svg'), height: 300, url: 'https://developer.mozilla.org/docs/Web/JavaScript' },
    { id: 'typescript', img: cdn('typescript/typescript-original.svg'), height: 280, url: 'https://www.typescriptlang.org' },
    { id: 'react', img: cdn('react/react-original.svg'), height: 320, url: 'https://react.dev' },
    { id: 'nodejs', img: cdn('nodejs/nodejs-original.svg'), height: 260, url: 'https://nodejs.org' },
    { id: 'java', img: cdn('java/java-original.svg'), height: 300, url: 'https://www.oracle.com/java/' },
    { id: 'mongodb', img: cdn('mongodb/mongodb-original.svg'), height: 300, url: 'https://mongodb.com' },
    { id: 'express', img: cdn('express/express-original.svg'), height: 260, url: 'https://expressjs.com' },
    { id: 'tailwind', img: cdn('tailwindcss/tailwindcss-original.svg'), height: 280, url: 'https://tailwindcss.com' },
    { id: 'nextjs', img: cdn('nextjs/nextjs-original.svg'), height: 300, url: 'https://nextjs.org' },
    { id: 'git', img: cdn('git/git-original.svg'), height: 260, url: 'https://git-scm.com' },
    { id: 'github', img: cdn('github/github-original.svg'), height: 260, url: 'https://github.com' },
    { id: 'bootstrap', img: cdn('bootstrap/bootstrap-original.svg'), height: 260, url: 'https://getbootstrap.com' },
    { id: 'vite', img: cdn('vite/vite-original.svg'), height: 260, url: 'https://vitejs.dev' },
    { id: 'c', img: cdn('c/c-original.svg'), height: 240, url: 'https://en.wikipedia.org/wiki/C_(programming_language)' },
    { id: 'python', img: cdn('python/python-original.svg'), height: 300, url: 'https://python.org' },
  ], []);

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen bg-primary-dark text-white p-8 flex flex-col items-center justify-center transition-opacity-transform scroll-mt-28 md:scroll-mt-40">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-accent-purple">My Skills</h1>
        <Masonry items={items} animateFrom="random" colorShiftOnHover={true} />
      </div>
    </section>
  );
};

export default Skills;
