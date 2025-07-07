import React from 'react';
import SkillCard from '../components/SkillCard'; 
import useScrollReveal from '../hooks/useScrollReveal'; 
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaNpm, FaPython, FaCode } from 'react-icons/fa'; 
import { SiTailwindcss, SiStyledcomponents, SiMongodb, SiExpress, SiFirebase, SiVite, SiKnexdotjs, SiBootstrap } from 'react-icons/si';


const Skills = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const skillsData = [
    { name: 'HTML5', icon: FaHtml5 },
    { name: 'CSS3', icon: FaCss3Alt },
    { name: 'JavaScript', icon: FaJsSquare },
    { name: 'React.js', icon: FaReact },
    { name: 'Node.js', icon: FaNodeJs },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'Express.js', icon: SiExpress },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
    { name: 'Next.js', icon: SiKnexdotjs },
    { name: 'Git', icon: FaGitAlt },
    { name: 'GitHub', icon: FaGithub },
    { name: 'BootStrap', icon: SiBootstrap },
    { name: 'Vite', icon: SiVite },
    { name: 'C Language', icon: FaCode }, 
    { name: 'python', icon: FaPython},
  ];

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen bg-gray-800 text-white p-8 flex flex-col items-center justify-center transition-opacity-transform">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-accent-purple">My Skills</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {skillsData.map((skill, index) => (
            <SkillCard key={index} name={skill.name} icon={skill.icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;