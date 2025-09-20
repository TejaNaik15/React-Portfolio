import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const particlesRef = useRef([]);
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 300);
      }
    });

    // Create particles
    const createParticles = () => {
      const particles = [];
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-cyan-400 rounded-full opacity-0';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        loaderRef.current.appendChild(particle);
        particles.push(particle);
        particlesRef.current.push(particle);
      }
      return particles;
    };

    const particles = createParticles();

    // Progress counter animation
    const progressCounter = { value: 0 };
    
    // Main animation timeline
    tl
      // Initial setup
      .set(loaderRef.current, { opacity: 1 })
      .set(imageRef.current, { 
        scale: 0.5, 
        opacity: 0, 
        rotation: -180,
        filter: 'blur(20px) brightness(0.3)'
      })
      .set(textRef.current, { 
        scale: 0.8, 
        opacity: 0, 
        y: 50,
        filter: 'blur(10px)'
      })
      .set(overlayRef.current, { 
        opacity: 0,
        background: 'radial-gradient(circle, rgba(0,223,216,0.3) 0%, rgba(148,93,214,0.3) 100%)'
      })
      
      // Progress animation
      .to(progressCounter, {
        value: 100,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: () => {
          setProgress(Math.round(progressCounter.value));
        }
      }, 0)
      
      // Particles entrance
      .to(particles, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.02,
        ease: "power2.out"
      }, 0.2)
      
      // Particles floating animation
      .to(particles, {
        y: "random(-50, 50)",
        x: "random(-50, 50)",
        rotation: "random(0, 360)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.1
      }, 0.5)
      
      // Overlay glow effect
      .to(overlayRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut"
      }, 0.3)
      
      // Image entrance with multiple effects
      .to(imageRef.current, {
        scale: 1.1,
        opacity: 1,
        rotation: 0,
        filter: 'blur(0px) brightness(1.2)',
        duration: 1.5,
        ease: "back.out(1.7)"
      }, 0.5)
      
      // Image breathing effect
      .to(imageRef.current, {
        scale: 1,
        filter: 'blur(0px) brightness(1)',
        duration: 0.8,
        ease: "power2.inOut"
      }, 2)
      
      // Text entrance with stagger effect
      .to(textRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: "back.out(1.7)"
      }, 1)
      
      // Text color animation
      .to(textRef.current, {
        background: 'linear-gradient(270deg, #00dfd8, #945DD6, #00dfd8)',
        backgroundSize: '300% 300%',
        duration: 0.5,
        ease: "power2.inOut"
      }, 1.5)
      
      // Final exit animations
      .to(particles, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.01,
        ease: "power2.in"
      }, 2.8)
      
      .to([imageRef.current, textRef.current], {
        scale: 1.2,
        opacity: 0,
        filter: 'blur(20px)',
        duration: 0.8,
        ease: "power2.in"
      }, 2.9)
      
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      }, 3.2)
      
      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      }, 3.5);

    return () => {
      tl.kill();
      // Cleanup particles
      particlesRef.current.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden"
      style={{ opacity: 0 }}
    >
      {/* Animated background overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 animate-pulse"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0,223,216,0.1) 0%, rgba(148,93,214,0.1) 50%, transparent 100%)',
          animation: 'pulse 2s ease-in-out infinite'
        }}
      />
      
      {/* Main content container */}
      <div className="relative flex flex-col items-center justify-center space-y-8">
        {/* Loader image */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-3xl opacity-20 blur-xl animate-pulse" />
          
          <img
            ref={imageRef}
            src="/loader-image.jpg" // You'll need to add your image here
            alt="Teja Naik"
            className="relative w-80 h-48 object-cover rounded-2xl shadow-2xl"
            style={{
              boxShadow: '0 0 50px rgba(0,223,216,0.4), 0 0 100px rgba(148,93,214,0.3), inset 0 0 20px rgba(255,255,255,0.1)'
            }}
          />
          
          {/* Animated border gradient */}
          <div 
            className="absolute inset-0 rounded-2xl border-2 opacity-60"
            style={{
              background: 'linear-gradient(45deg, #00dfd8, #945DD6, #00dfd8, #945DD6)',
              backgroundSize: '400% 400%',
              animation: 'gradientBorder 3s ease infinite',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'subtract',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'subtract',
              padding: '2px'
            }}
          />
        </div>
        
        {/* Animated text */}
        <div
          ref={textRef}
          className="text-6xl font-bold text-transparent bg-clip-text"
          style={{
            background: 'linear-gradient(270deg, #00dfd8, #ffffff, #00dfd8)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            animation: 'gradientMove 3s ease infinite'
          }}
        >
          TEJA NAIK
        </div>
        
        {/* Progress indicator */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-cyan-400 text-sm font-mono">
            Loading... {progress}%
          </div>
        </div>
      </div>
      
      {/* Additional CSS for gradient animations */}
      <style jsx>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
