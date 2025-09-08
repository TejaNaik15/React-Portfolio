import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCoffee } from 'react-icons/fa';

const COFFEE_URL = import.meta.env.VITE_COFFEE_URL || 'https://www.buymeacoffee.com/';

const FloatingCoffeeButton = () => {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footerEl = document.getElementById('footer');
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setFooterVisible(entry.isIntersecting));
      },
      { root: null, threshold: 0.01 }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {!footerVisible && (
        <motion.a
          key="coffee"
          href={COFFEE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed z-50 right-4 bottom-4 md:right-6 md:bottom-6 group"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          aria-label="Buy me a coffee"
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue blur-lg opacity-60 group-hover:opacity-90"
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative flex items-center gap-3 px-4 py-3 rounded-full bg-secondary-dark/90 backdrop-blur border border-white/10 shadow-xl hover:shadow-2xl transition-shadow">
              <FaCoffee className="text-accent-yellow w-5 h-5" />
              <span className="text-white font-semibold">Buy me a coffee</span>
            </div>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingCoffeeButton;
