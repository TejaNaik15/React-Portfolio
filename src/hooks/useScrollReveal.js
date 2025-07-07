import { useEffect, useRef } from 'react';

const useScrollReveal = (options = {}, dependencies = []) => {
  const ref = useRef(null);

  useEffect(() => {
   
    if (ref.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              
              entry.target.classList.add('animate-reveal');
              
            } else {
             
              entry.target.classList.remove('animate-reveal');
            }
          });
        },
        options
      );

      observer.observe(ref.current);

      
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }
  }, [options, ...dependencies]);

  return ref;
};

export default useScrollReveal;

