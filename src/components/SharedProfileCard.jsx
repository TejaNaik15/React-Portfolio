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
      document.body.appendChild(ghost);
      container.style.visibility = 'hidden';

      const scaleX = end.width / start.width;
      const scaleY = end.height / start.height;

      const tl = gsap.timeline({
        defaults: { ease: 'power4.inOut' },
        onComplete: () => {
          target.appendChild(container);
          container.style.visibility = '';
          ghost.remove();
          currentSlot.current = target;
        }
      });

      tl.fromTo(
        ghost,
        { filter: 'blur(4px)', opacity: 0.85, rotateY: -12, rotateX: 6, transformOrigin: 'top left' },
        {
          x: end.left - start.left,
          y: end.top - start.top,
          scaleX,
          scaleY,
          rotateY: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 1.1,
        }
      );
    };

    const toAbout = () => flyTo(aboutSlot);
    const toHome = () => flyTo(home);

    const st = ScrollTrigger.create({
      trigger: aboutSection,
      start: 'top 70%',
      end: 'top 30%',
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
