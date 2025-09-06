import React from 'react';
import ProjectCard from '../components/ProjectCard'; 
import useScrollReveal from '../hooks/useScrollReveal'; 

const projectsData = [
  {
    id: 1,
    title: 'Career Change Suggestion Tool',
    description: 'The Career Change Suggestion tool is a whimsical web application designed to inspire users with creative and radically different career paths based on their current job title.',
    image: '/assets/career.png', 
    technologies: ['React', 'Node.js', 'Express.js','Tailwind CSS'],
    githubLink: 'https://github.com/TejaNaik15/Career-Change-Suggestion-Tool',
    liveDemoLink: 'https://career-change-suggestion-tool-f.onrender.com/',
  },
  {
    id: 2,
    title: 'Cognify AI ChatBot',
    description: 'A Professional & elegant AI Chatbot built with framer motion , react.js and ecpress.js.',
    image: '/assets/cogniify.png', 
    technologies: ['React', 'Node.js', 'Tailwind CSS','Express.js'],
    githubLink: 'https://github.com/TejaNaik15/AI-Chatbot-MERN-APP',
    liveDemoLink: 'https://ai-chatbot-mern-app-frontend.onrender.com/',
  },
  {
    id: 3,
    title: 'ExpenseTracker',
    description: 'This very website! Built to showcase my skills and projects, featuring responsive design and smooth animations.',
    image: '/assets/expense.png', 
    technologies: ['React', 'Tailwind CSS', 'Styled Components', 'Vite'],
    githubLink: 'https://github.com/TejaNaik15/ExpenseTracking',
    liveDemoLink: 'https://expense-tracking-two.vercel.app/',
  },
];

const Projects = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 }); 

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen bg-gray-900/60 backdrop-blur-sm text-white p-8 flex flex-col items-center justify-center transition-opacity-transform">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-accent-pink">My Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
