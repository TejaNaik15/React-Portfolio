import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const Education = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 }); 

  const educationData = [
    {
      degree: 'Bachelor of Technology in [AIDS]',
      institution: 'CMR Institute Of Technology Hyderabad (CMRIT)',
      year: '2021 - 2025 ',
      details: 'Focused on core computer science concepts, software development methodologies, and data structures.',
    },
    {
      degree: 'Intermediate (MPC)',
      institution: 'Sri Chaitanya  Junior College khammam',
      year: '2019 - 2021',
      details: 'Studied Mathematics, Physics, and Chemistry, building a strong foundation in science.',
    },
    {
      degree: 'SSC',
      institution: 'Montessori high school  [khammam]',
      year: 'Up to 2019',
      details: 'Completed secondary education with a focus on holistic development.',
    },
  ];

  return (
    <section id="education" ref={sectionRef} className="min-h-screen bg-gray-800 text-white p-8 flex flex-col items-center justify-center transition-opacity-transform">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-accent-purple">Education</h1>

        <div className="space-y-8 max-w-3xl mx-auto">
          {educationData.map((edu, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg text-left">
              <h2 className="text-2xl font-semibold text-accent-pink mb-1">{edu.degree}</h2>
              <h3 className="text-xl text-text-muted mb-2">{edu.institution}</h3>
              <p className="text-accent-yellow mb-3">{edu.year}</p>
              <p className="text-lg">{edu.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;