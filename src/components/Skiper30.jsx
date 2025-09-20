import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';


const Column = ({ images, y }) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[160px] sm:min-w-[200px] md:min-w-[220px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((it, i) => {
        const src = typeof it === 'string' ? it : it.src;
        const label = typeof it === 'string' ? '' : it.label || '';
        const href = typeof it === 'string' ? undefined : it.href;
        return (
          <div key={i} className="group relative h-full w-full overflow-hidden rounded-xl bg-black/20 ring-1 ring-white/5">
            {/* Clickable area */}
            <a href={href} target={href ? '_blank' : undefined} rel={href ? 'noopener noreferrer' : undefined} aria-label={label || 'skill'} className="absolute inset-0">
              {/* Themed gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-transparent" />
              <img src={src} alt={label || 'image'} className="pointer-events-none h-full w-full object-contain p-6" />
            </a>
            {label && (
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 shadow-lg">
                {label}
              </div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

// Skiper30 Parallax Gallery
// props: images: string[]
// items: array of strings or {src,label}
const Skiper30 = ({ images = [] }) => {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start'],
  });

  const { height, width } = dimension;
  const isSmall = width < 640; // Tailwind sm breakpoint
  const f1 = isSmall ? 1.2 : 2.0;
  const f2 = isSmall ? 2.0 : 3.3;
  const f3 = isSmall ? 0.8 : 1.25;
  const f4 = isSmall ? 1.6 : 3.0;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * f1]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * f2]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * f3]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * f4]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Ensure we have enough images; repeat if needed
  const pool = images.length ? images : [
    '/images/lummi/img15.png',
    '/images/lummi/img21.png',
    '/images/lummi/img3.png',
    '/images/lummi/img4.png',
    '/images/lummi/img5.png',
    '/images/lummi/img6.png',
    '/images/lummi/img7.png',
    '/images/lummi/img8.png',
    '/images/lummi/img24.png',
    '/images/lummi/img10.png',
  ];

  const col1 = pool.slice(0, 3);
  const col2 = pool.slice(3, 6);
  const col3 = pool.slice(6, 9);
  const col4 = pool.slice(6, 9); // reuse for 4th column like reference

  return (
    <section className="w-full bg-gradient-to-b from-transparent via-black/40 to-black text-white">
      <div className="relative flex h-screen items-center justify-center">
        <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-60 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white/30 after:to-white/0 after:content-['']">
            scroll down to see
          </span>
        </div>
      </div>

      <div ref={gallery} className="relative box-border flex h-[130vh] sm:h-[150vh] md:h-[175vh] gap-[2vw] overflow-hidden p-[3vw] sm:p-[2.5vw] md:p-[2vw]">
        <Column images={col1} y={y} />
        <Column images={col2} y={y2} />
        <Column images={col3} y={y3} />
        <Column images={col4} y={y4} />
      </div>

      <div className="relative flex h-screen items-center justify-center">
        <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-60 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white/30 after:to-white/0 after:content-['']">
            scroll up to see
          </span>
        </div>
      </div>
    </section>
  );
};

export default Skiper30;
