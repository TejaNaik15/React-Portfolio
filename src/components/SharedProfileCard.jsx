import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProfileCard from './ProfileCard';

gsap.registerPlugin(ScrollTrigger);

const getSlot = (id) => document.getElementById(id);

const SharedProfileCard = () => {
  const [container] = useState(() => document.createElement('div'));
  const [mounted, setMounted] = useState(false);
  const currentSlot = useRef(null);

  useEffect(() => {
    // initial mount into home slot
    const home = getSlot('profile-home-slot');
    const aboutSlot = getSlot('profile-about-slot');
    const aboutSection = document.getElementById('about');
    if (!home || !aboutSection || !aboutSlot) return;

    currentSlot.current = home;
    home.appendChild(container);
    setMounted(true);

    const flyTo = (target) => {
      if (!target || target === currentSlot.current) return;
      const start = container.getBoundingClientRect();
      const end = target.getBoundingClientRect();

      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const endOffscreen = end.bottom < 0 || end.top > viewportH || end.right < 0 || end.left > viewportW;
      const startOffscreen = start.bottom < 0 || start.top > viewportH || start.right < 0 || start.left > viewportW;
      if (endOffscreen || startOffscreen) {
        target.appendChild(container);
        container.style.visibility = '';
        currentSlot.current = target;
        return;
      }

      // Ghost element animates while real card teleports at the end
      const ghost = container.cloneNode(true);
      Object.assign(ghost.style, {
        position: 'fixed',
        left: `${start.left}px`,
        top: `${start.top}px`,
        width: `${start.width}px`,
        height: `${start.height}px`,
        zIndex: 1000,
        pointerEvents: 'none',
      });
      (document.querySelector('#root') || document.body).appendChild(ghost);
      container.style.visibility = 'hidden';


      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          target.appendChild(container);
          container.style.visibility = '';
          ghost.remove();
          currentSlot.current = target;
        }
      });

      const dx = end.left - start.left;
      const dy = end.top - start.top;

      tl.fromTo(
        ghost,
        { opacity: 1, transformOrigin: 'top left' },
        {
          x: dx,
          y: dy,
          opacity: 0.9,
          duration: 0.7,
          ease: 'power2.inOut'
        }
      );
    };

    const toAbout = () => flyTo(aboutSlot);
    const toHome = () => flyTo(home);

    const st = ScrollTrigger.create({
      trigger: aboutSection,
      start: 'top 75%',
      end: 'top 25%',
      onEnter: () => toAbout(),
      onLeaveBack: () => toHome(),
    });

    // gentle parallax while scrolling through about
    return () => { st.kill(); };
  }, [container]);

  if (!mounted) return null;
  return createPortal(
    <div className="w-full max-w-sm">
      <ProfileCard name="Teja Naik" title="MERN Developer" handle="tejanaik" />
    </div>,
    container
  );
};

export default SharedProfileCard;
