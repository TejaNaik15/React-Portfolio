import React from 'react';
import { motion } from 'framer-motion';

/**
 * Simple BoxReveal component
 * - Draws a colored box sweep that reveals its children
 * - Props: boxColor, duration, delay
 */
const BoxReveal = ({
  children,
  boxColor = '#00dfd8', // theme cyan
  duration = 0.6,
  delay = 0,
  className = '',
}) => {
  return (
    <div className={`relative inline-block overflow-hidden ${className}`}>
      {/* Content container (masked during reveal) */}
      <motion.div
        initial={{ opacity: 0.0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: delay + duration * 0.6 }}
      >
        {children}
      </motion.div>

      {/* Sweeping box overlay */}
      <motion.span
        aria-hidden
        className="absolute inset-0 block"
        initial={{ x: '0%' }}
        animate={{ x: '110%' }}
        transition={{ ease: 'easeInOut', duration, delay }}
        style={{ backgroundColor: boxColor }}
      />
    </div>
  );
};

export default BoxReveal;
