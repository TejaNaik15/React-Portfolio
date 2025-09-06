import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import FlowingMenu from '../components/FlowingMenu';

const Education = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const items = [
    {
      text: 'B.Tech (AIDS) · CMRIT Hyderabad · 2021–2025',
      link: '#education',
      image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop'
    },
    {
      text: 'Intermediate (MPC) · Sri Chaitanya Junior College · 2019–2021',
      link: '#education',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop'
    },
    {
      text: 'SSC · Montessori High School, Khammam · Up to 2019',
      link: '#education',
      image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  return (
    <section id="education" ref={sectionRef} className="min-h-screen bg-gray-800/60 backdrop-blur-sm text-white p-8 flex flex-col items-center justify-center">
      <div className="container mx-auto text-center w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-accent-purple">Education</h1>
        <div className="w-full h-[70vh] max-h-[800px] rounded-2xl overflow-hidden border border-white/10">
          <FlowingMenu items={items} />
        </div>
      </div>
    </section>
  );
};

export default Education;
