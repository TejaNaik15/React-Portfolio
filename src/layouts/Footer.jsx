import React, { useEffect, useRef, useState } from 'react';

const Footer = ({
  leftLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
  ],
  rightLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ],
  copyrightText = `© ${new Date().getFullYear()} KELOTH TEJA NAIK. All rights reserved.`,
  barCount = 23,
}) => {
  const waveRefs = useRef([]);
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0]?.isIntersecting ?? false),
      { threshold: 0.2 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let t = 0;
    const animate = () => {
      let offset = 0;
      waveRefs.current.forEach((el, idx) => {
        if (!el) return;
        offset += Math.max(0, 20 * Math.sin((t + idx) * 0.3));
        el.style.transform = `translateY(${idx + offset}px)`;
      });
      t += 0.1;
      rafRef.current = requestAnimationFrame(animate);
    };

    if (isVisible) animate();
    else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative flex w-full flex-col select-none overflow-hidden border-t border-white/10 bg-primary-dark text-white">
      {/* top content */}
      <div className="container mx-auto flex w-full flex-col justify-between gap-6 px-4 pb-24 pt-8 md:flex-row">
        <div className="space-y-2">
          <ul className="flex flex-wrap gap-4">
            {leftLinks.map((link, i) => (
              <li key={`l-${i}`}>
                <a href={link.href} className="text-sm hover:text-cyan-400">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 text-sm text-white/80">
            <svg className="h-3 w-3" viewBox="0 0 80 80" fill="currentColor" aria-hidden="true">
              <path d="M67.4307 11.5693C52.005 -3.85643 26.995 -3.85643 11.5693 11.5693C-3.85643 26.995 -3.85643 52.005 11.5693 67.4307C26.995 82.8564 52.005 82.8564 67.4307 67.4307C82.8564 52.005 82.8564 26.995 67.4307 11.5693ZM17.9332 17.9332C29.8442 6.02225 49.1558 6.02225 61.0668 17.9332C72.9777 29.8442 72.9777 49.1558 61.0668 61.0668C59.7316 62.4019 58.3035 63.5874 56.8032 64.6232L56.8241 64.6023C46.8657 54.6439 46.8657 38.4982 56.8241 28.5398L58.2383 27.1256L51.8744 20.7617L50.4602 22.1759C40.5018 32.1343 24.3561 32.1343 14.3977 22.1759L14.3768 22.1968C15.4126 20.6965 16.5981 19.2684 17.9332 17.9332ZM34.0282 38.6078C25.6372 38.9948 17.1318 36.3344 10.3131 30.6265C7.56889 39.6809 9.12599 49.76 14.9844 57.6517L34.0282 38.6078ZM21.3483 64.0156C29.24 69.874 39.3191 71.4311 48.3735 68.6869C42.6656 61.8682 40.0052 53.3628 40.3922 44.9718L21.3483 64.0156Z" />
            </svg>
            {copyrightText}
          </p>
        </div>
        <div className="space-y-4 text-right">
          <ul className="flex flex-wrap gap-4 justify-end">
            {rightLinks.map((link, i) => (
              <li key={`r-${i}`}>
                <a href={link.href} className="text-sm hover:text-cyan-400">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <button onClick={backToTop} className="inline-flex items-center text-sm hover:underline">
              Back to top
            </button>
          </div>
        </div>
      </div>

      {/* animated wave bars */}
      <div aria-hidden="true" style={{ overflow: 'hidden', height: 200 }}>
        <div style={{ marginTop: 0 }}>
          {Array.from({ length: barCount }).map((_, index) => (
            <div
              key={index}
              ref={(el) => (waveRefs.current[index] = el)}
              className="wave-segment"
              style={{
                height: `${index + 1}px`,
                background: 'linear-gradient(90deg, rgba(0,223,216,1), rgba(148,93,214,1))',
                transition: 'transform 0.1s ease',
                willChange: 'transform',
                marginTop: '-2px',
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
