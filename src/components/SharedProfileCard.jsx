import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import Flip from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProfileCard from './ProfileCard';

gsap.registerPlugin(Flip, ScrollTrigger);

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

    const flipTo = (target) => {
      if (!target || target === currentSlot.current) return;
      const state = Flip.getState(container);
      target.appendChild(container);
      currentSlot.current = target;
      return Flip.from(state, {
        duration: 1.0,
        ease: 'power3.inOut',
        absolute: true,
        prune: true,
        nested: true,
        onEnter: (els) => gsap.fromTo(els, { rotateY: -25, yPercent: -6, scale: 0.95, opacity: 0.2, filter: 'blur(6px)' }, { rotateY: 0, yPercent: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' })
      });
    };

    const toAbout = () => flipTo(aboutSlot);
    const toHome = () => flipTo(home);

    const st = ScrollTrigger.create({
      trigger: aboutSection,
      start: 'top 70%',
      end: 'top 30%',
      onEnter: () => toAbout(),
      onLeaveBack: () => toHome(),
    });

    // gentle parallax while scrolling through about
    const p = gsap.to(container, {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      }
    });

    return () => { st.kill(); p.kill(); };
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
