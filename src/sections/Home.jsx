import React from 'react';
import HeroBgAnimation from '../components/HeroBgAnimation'; 

const Home = () => {
  return (
   
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-white bg-primary-dark overflow-hidden">
      {/* Background Animation */}
      <HeroBgAnimation />

    
      <div className="relative z-10 text-center p-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
          Hi, I'm Teja Naik
        </h1>
        <p className="text-xl md:text-2xl text-text-muted mb-8">
          A passionate [MERN Developer] building cool stuff.
        </p>
        
        <button className="bg-accent-pink text-white px-6 py-3 rounded-full text-lg hover:bg-accent-purple transition-colors duration-300">
          Learn More
        </button>
      </div>

    </section>
  );
};

export default Home;