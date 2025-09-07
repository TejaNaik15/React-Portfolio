import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import Particles from '../components/Particles';

const eduData = [
  {
    school: 'CMR Institute of Technology, Hyderabad',
    degree: 'B.Tech (Artificial Intelligence & Data Science)',
    date: '2021 – 2025',
    desc: 'Coursework in Web Development, Data Structures, Algorithms, DBMS, Operating Systems, and ML. Built multiple MERN projects and led tech fests.'
  },
  {
    school: 'Sri Chaitanya Junior College',
    degree: 'Intermediate (MPC)',
    date: '2019 – 2021',
    desc: 'Focused on Mathematics and Physics fundamentals. Participated in science exhibitions and olympiads.'
  },
  {
    school: 'Montessori High School, Khammam',
    degree: 'SSC',
    date: 'Up to 2019',
    grade: 'GPA: 10/10',
    desc: 'Excelled in academics and extracurriculars; developed strong problem-solving foundations.'
  }
];

const TimelineItem = ({ item, isLast }) => (
  <li className="relative pl-10 pb-10">
    <span className="absolute left-3 top-1.5 h-3 w-3 rounded-full bg-accent-blue ring-4 ring-accent-blue/20" />
    {!isLast && <span className="absolute left-4 top-4 bottom-0 w-px bg-gradient-to-b from-accent-blue/30 to-transparent" />}
    <div className="w-full max-w-2xl border border-white/10 rounded-lg p-4 md:p-5 bg-black/20 hover:bg-black/30 transition-all duration-300 shadow-[0_4px_24px_rgba(23,92,230,0.15)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.2)]">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-md bg-black/40 flex items-center justify-center text-accent-blue font-semibold select-none">{item.date.split(' ')[0]}</div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white">{item.school}</h3>
          <p className="text-text-muted">{item.degree} · <span className="text-white/80">{item.date}</span></p>
          {item.grade && <p className="mt-1 text-text-muted">{item.grade}</p>}
          <p className="mt-2 text-text-muted">{item.desc}</p>
        </div>
      </div>
    </div>
  </li>
);

const Education = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="education" ref={sectionRef} className="relative min-h-screen bg-primary-dark text-white p-8 flex flex-col items-center justify-center overflow-hidden scroll-mt-28 md:scroll-mt-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles className="w-full h-full" alphaParticles={true} particleCount={160} speed={0.1} particleBaseSize={70} sizeRandomness={1} />
      </div>
      <div className="relative container mx-auto w-full max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-accent-blue text-center">Education</h1>
        <p className="text-center text-text-muted mb-8 max-w-2xl mx-auto">My education has been a journey of self‑discovery and growth. Highlights below.</p>
        <ul className="relative w-full max-w-3xl mx-auto">
          {eduData.map((e, i) => (
            <TimelineItem key={i} item={e} isLast={i === eduData.length - 1} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Education;
