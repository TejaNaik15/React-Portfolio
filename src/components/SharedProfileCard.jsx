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
          gsap.set(container, { transformStyle: 'preserve-3d' });
          const tl = gsap.timeline();
          tl.add(Flip.from(state, {
            duration: 1.4,
            ease: 'power4.inOut',
            absolute: true,
            prune: true,
            onEnter: (els) => gsap.fromTo(
              els,
              { rotateY: -40, rotateX: 8, yPercent: -8, scale: 0.9, filter: 'blur(6px)', opacity: 0.2 },
              { rotateY: 0, rotateX: 0, yPercent: 0, scale: 1.02, filter: 'blur(0px)', opacity: 1, duration: 1.1, ease: 'power4.out' }
            ),
          }))
          .to(container, { y: -8, duration: 0.25, ease: 'sine.out' }, '>-0.2')
          .to(container, { y: 0, scale: 1, boxShadow: '0 18px 60px rgba(19,173,199,0.28)', duration: 0.5, ease: 'back.out(1.6)' });
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
