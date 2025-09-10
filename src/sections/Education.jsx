import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Particles from "../components/Particles"; // Ensure this exists

const eduData = [
  {
    year: "2021 – 2025",
    title: "CMR Institute of Technology, Hyderabad",
    subtitle: "B.Tech (Artificial Intelligence & Data Science)",
    description:
      "Coursework in Web Development, Data Structures, Algorithms, DBMS, Operating Systems, and ML. Built multiple MERN projects and led tech fests.",
  },
  {
    year: "2019 – 2021",
    title: "Sri Chaitanya Junior College",
    subtitle: "Intermediate (MPC)",
    description:
      "Focused on Mathematics and Physics fundamentals. Participated in science exhibitions and olympiads.",
  },
  {
    year: "Up to 2019",
    title: "Montessori High School, Khammam",
    subtitle: "SSC",
    description:
      "Excelled in academics and extracurriculars; developed strong problem-solving foundations.",
  },
];

const Education = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const newIndex = Math.floor(v * eduData.length);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < eduData.length) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex]);

  return (
    <section ref={scrollRef} className="relative min-h-screen p-8 bg-gray-900 text-white overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          className="w-full h-full"
          alphaParticles={true}
          particleCount={160}
          speed={0.1}
          particleBaseSize={70}
          sizeRandomness={1}
        />
      </div>

      {/* Title */}
      <h2 className="relative z-10 text-4xl font-bold text-center text-indigo-400 mb-8">
        My Education
      </h2>
      <p className="relative z-10 text-center text-gray-300 mb-12">
        Scroll to explore my educational background
      </p>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 w-1 bg-gray-700 h-full transform -translate-x-1/2"></div>

        <motion.div
          className="absolute left-1/2 w-1 bg-indigo-500 rounded"
          style={{
            height: progressHeight,
            transform: "translateX(-50%)",
          }}
        />

        {eduData.map((item, index) => (
          <div key={index} className="relative flex flex-col items-center mb-16">
            <div
              className={`w-6 h-6 rounded-full border-4 ${
                index <= activeIndex
                  ? "bg-indigo-500 border-indigo-500"
                  : "bg-gray-900 border-gray-500"
              } absolute left-1/2 transform -translate-x-1/2`}
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-lg text-indigo-100"
            >
              <span className="text-indigo-300 font-semibold">{item.year}</span>
              <h3 className="text-xl font-bold mt-2 text-indigo-400">{item.title}</h3>
              <h4 className="text-md text-gray-400 mt-1">{item.subtitle}</h4>
              <p className="text-gray-300 mt-2">{item.description}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
