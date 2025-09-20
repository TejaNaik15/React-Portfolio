import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Orbiting skills visualization
// props: items: [{ src, label, href }]
// themed to portfolio: cyan/purple glows, dark background
const OrbitSkills = ({ items = [] }) => {
  const containerRef = useRef(null);
  const ringRefs = useRef([]);
  const [size, setSize] = useState(600);

  const rings = useMemo(() => {
    // split items into 3 rings as evenly as possible
    const R = 3;
    const per = Math.ceil(items.length / R) || 1;
    return [
      items.slice(0, per),
      items.slice(per, per * 2),
      items.slice(per * 2, per * 3),
    ];
  }, [items]);

  useEffect(() => {
    // track container size
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSize(Math.min(rect.width, rect.height));
      }
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);

    // rotate rings continuously, alternate direction
    ringRefs.current.forEach((el, idx) => {
      if (!el) return;
      const duration = 30 - idx * 6; // outer slower
      const clockwise = idx % 2 === 0; // alternate
      gsap.to(el, {
        rotate: clockwise ? 360 : -360,
        duration,
        ease: 'none',
        repeat: -1,
      });
    });

    return () => {
      ro.disconnect();
      ringRefs.current.forEach((el) => el && gsap.killTweensOf(el));
    };
  }, [rings.length]);

  // Helpers to place icons around a circle
  const renderRing = (items, radius, index) => {
    const angleStep = (2 * Math.PI) / items.length;
    return (
      <div
        key={index}
        ref={(el) => (ringRefs.current[index] = el)}
        className="absolute inset-0"
        style={{
          transformOrigin: '50% 50%',
        }}
      >
        {items.map((it, i) => {
          const angle = i * angleStep;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <a
              key={`${it.label}-${i}`}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute block h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black/30 ring-1 ring-white/10 backdrop-blur hover:bg-white/10 transition"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
              title={it.label}
            >
              <img
                src={it.src}
                alt={it.label}
                className="h-full w-full p-2 object-contain"
              />
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative mx-auto flex w-full items-center justify-center">
      {/* Responsive square stage */}
      <div className="relative aspect-square w-[92vw] max-w-[900px] sm:w-[85vw] md:w-[70vw] lg:w-[60vw]">
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,223,216,0.12),rgba(148,93,214,0.06)_45%,transparent_70%)]" />
        {/* Center core */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-400/40 to-purple-500/40 ring-1 ring-white/10" />
        {/* Rings outlines */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-white/10" />
          <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-white/10" />
          <div className="absolute left-1/2 top-1/2 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-white/10" />
        </div>
        {/* Animated rings with icons */}
        {renderRing(rings[0], size * 0.25, 0)}
        {renderRing(rings[1], size * 0.34, 1)}
        {renderRing(rings[2], size * 0.42, 2)}
      </div>
    </div>
  );
};

export default OrbitSkills;
