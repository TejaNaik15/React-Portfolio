import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import Flip from 'gsap/Flip';
import ProfileCard from './ProfileCard';

gsap.registerPlugin(Flip);

const getSlot = (id) => document.getElementById(id);

const SharedProfileCard = () => {
  const [container] = useState(() => document.createElement('div'));
  const [mounted, setMounted] = useState(false);
  const currentSlot = useRef(null);

  useEffect(() => {
    // initial mount into home slot
    const home = getSlot('profile-home-slot');
    if (home) {
      currentSlot.current = home;
      home.appendChild(container);
      setMounted(true);
    }

    const about = document.getElementById('about');
    if (!about) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!currentSlot.current) return;
          const targetSlot = entry.isIntersecting ? getSlot('profile-about-slot') : getSlot('profile-home-slot');
          if (!targetSlot || targetSlot === currentSlot.current) return;
          const state = Flip.getState(container);
          targetSlot.appendChild(container);
          currentSlot.current = targetSlot;
          Flip.from(state, {
            duration: 1.1,
            ease: 'expo.inOut',
            absolute: true,
            stagger: 0.02,
            onEnter: (els) => gsap.fromTo(els, { rotateY: -35, rotate: -12, scale: 0.8, opacity: 0 }, { rotateY: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.1, ease: 'expo.out' }),
            onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.4 }),
          });
        });
      },
      { threshold: 0.4 }
    );

    io.observe(about);
    return () => io.disconnect();
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
