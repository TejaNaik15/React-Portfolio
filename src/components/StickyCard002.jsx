import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Simple className join helper similar to cn()
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// CardData: { id: number|string, image: string, alt?: string }
// cards: [{ id, image, alt, label, color }]
const StickyCard002 = ({
  cards,
  className,
  containerClassName,
  imageClassName,
}) => {
  const container = useRef(null);
  const imageRefs = useRef([]);
  const captionRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const imageElements = imageRefs.current;
    const captionElements = captionRefs.current;
    const totalCards = imageElements.length;

    if (!imageElements[0]) return;

    gsap.set(imageElements[0], { y: '0%', scale: 1, rotation: 0 });
    gsap.set(captionElements[0], { opacity: 1, y: 0 });
    for (let i = 1; i < totalCards; i++) {
      if (!imageElements[i]) continue;
      gsap.set(imageElements[i], { y: '100%', scale: 1, rotation: 0 });
      if (captionElements[i]) gsap.set(captionElements[i], { opacity: 0, y: 20 });
    }

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container.current?.querySelector('.sticky-cards'),
        start: 'top top',
        end: `+=${window.innerHeight * Math.max(1, totalCards - 1)}`,
        pin: true,
        scrub: 0.5,
        pinSpacing: true,
      },
    });

    for (let i = 0; i < totalCards - 1; i++) {
      const currentImage = imageElements[i];
      const nextImage = imageElements[i + 1];
      const currentCaption = captionElements[i];
      const nextCaption = captionElements[i + 1];
      const position = i;
      if (!currentImage || !nextImage) continue;

      scrollTimeline.to(
        currentImage,
        {
          scale: 0.7,
          rotation: 5,
          duration: 1,
          ease: 'none',
        },
        position,
      );

      scrollTimeline.to(
        nextImage,
        {
          y: '0%',
          duration: 1,
          ease: 'none',
        },
        position,
      );

      // Caption crossfade
      if (currentCaption) {
        scrollTimeline.to(
          currentCaption,
          { opacity: 0, y: -10, duration: 1, ease: 'none' },
          position,
        );
      }
      if (nextCaption) {
        scrollTimeline.to(
          nextCaption,
          { opacity: 1, y: 0, duration: 1, ease: 'none' },
          position,
        );
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    if (container.current) {
      resizeObserver.observe(container.current);
    }

    return () => {
      resizeObserver.disconnect();
      scrollTimeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={cn('relative h-full w-full', className)} ref={container}>
      <div className="sticky-cards relative flex h-[100vh] w-full items-center justify-center overflow-hidden p-2 sm:p-3 md:p-6 lg:p-8">
        <div
          className={cn(
            'relative h-[85vh] sm:h-[80vh] w-full max-w-sm overflow-hidden rounded-xl sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl shadow-2xl',
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="absolute inset-0 rounded-xl"
              style={{
                background:
                  `radial-gradient(80% 60% at 30% 30%, ${card.color || '#00dfd8'}33 0%, transparent 70%),` +
                  `radial-gradient(80% 60% at 70% 70%, #945DD666 0%, transparent 70%),` +
                  'linear-gradient(135deg, #0b0f17 0%, #000000 100%)',
              }}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
            >
              <img
                src={card.image}
                alt={card.alt || ''}
                className={cn(
                  'absolute inset-0 h-full w-full object-contain p-6 sm:p-8 md:p-10 lg:p-12',
                  imageClassName,
                )}
              />

              {/* Caption */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-white/90 backdrop-blur-md"
                style={{
                  background:
                    `linear-gradient(90deg, ${card.color || '#00dfd8'}99, rgba(0,0,0,0.5))`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                }}
                ref={(el) => {
                  captionRefs.current[i] = el;
                }}
              >
                {card.label || card.alt || 'Skill'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyCard002;
