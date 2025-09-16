import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

// Tiny className joiner fallback
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Wrap a value between min and max (useful for infinite marquee)
export function wrap(min, max, value) {
  const rangeSize = max - min;
  return ((((value - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const VelocityContext = createContext(null);

export function ThreeDScrollTriggerContainer({ children, className = '', ...props }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
    return sign * magnitude;
  });

  return (
    <VelocityContext.Provider value={velocityFactor}>
      <div className={cn('relative w-full', className)} {...props}>
        {children}
      </div>
    </VelocityContext.Provider>
  );
}

export function ThreeDScrollTriggerRow(props) {
  const sharedVelocityFactor = useContext(VelocityContext);
  if (sharedVelocityFactor) {
    return <ThreeDScrollTriggerRowImpl {...props} velocityFactor={sharedVelocityFactor} />;
  }
  return <ThreeDScrollTriggerRowLocal {...props} />;
}

function ThreeDScrollTriggerRowImpl({ children, baseVelocity = 5, direction = 1, className = '', velocityFactor, ...props }) {
  const containerRef = useRef(null);
  const [numCopies, setNumCopies] = useState(1);
  const x = useMotionValue(0);

  const prevTimeRef = useRef(0);
  const unitWidthRef = useRef(0);
  const baseXRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(([entry]) => {
      const containerWidth = entry.contentRect.width;
      const block = container.querySelector('.threed-scroll-trigger-block');
      if (!block) return;

      const blockWidth = block.scrollWidth;
      unitWidthRef.current = blockWidth;

      if (blockWidth > 0) {
        const nextCopies = Math.max(3, Math.ceil(containerWidth / blockWidth) + 2);
        setNumCopies(nextCopies);
      }
    });

    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((time) => {
    const dt = (time - prevTimeRef.current) / 1000;
    prevTimeRef.current = time;

    const unitWidth = unitWidthRef.current;
    if (unitWidth <= 0) return;

    const velocity = velocityFactor.get();
    const speedMultiplier = Math.min(5, Math.abs(velocity));
    const scrollDirection = velocity >= 0 ? 1 : -1;
    const currentDirection = direction * scrollDirection;

    const pixelsPerSecond = (unitWidth * baseVelocity) / 100;
    const moveBy = currentDirection * pixelsPerSecond * (1 + speedMultiplier) * dt;

    const newX = baseXRef.current + moveBy;
    baseXRef.current = wrap(0, unitWidth, newX);
    x.set(baseXRef.current);
  });

  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  return (
    <div ref={containerRef} className={cn('w-full overflow-hidden whitespace-nowrap', className)} {...props}>
      <motion.div className="inline-flex will-change-transform transform-gpu" style={{ x: useTransform(x, (v) => `${-v}px`) }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <div key={i} className={cn('inline-flex shrink-0', i === 0 && 'threed-scroll-trigger-block')} aria-hidden={i !== 0}>
            {childrenArray}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ThreeDScrollTriggerRowLocal(props) {
  const { scrollY } = useScroll();
  const localVelocity = useVelocity(scrollY);
  const localSmoothVelocity = useSpring(localVelocity, { damping: 50, stiffness: 400 });
  const localVelocityFactor = useTransform(localSmoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
    return sign * magnitude;
  });
  return <ThreeDScrollTriggerRowImpl {...props} velocityFactor={localVelocityFactor} />;
}

export default ThreeDScrollTriggerContainer;

