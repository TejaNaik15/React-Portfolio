import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import ChromaGrid from '../components/ChromaGrid';

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
    description: 'An expense tracking app with responsive design and smooth animations.',
    image: '/assets/expense.png',
    technologies: ['React', 'Tailwind CSS', 'Styled Components', 'Vite'],
    githubLink: 'https://github.com/TejaNaik15/ExpenseTracking',
    liveDemoLink: 'https://expense-tracking-two.vercel.app/',
  },
  // Added projects
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Personal portfolio showcasing projects, animations, and interactive UI components.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    technologies: ['React', 'Tailwind CSS', 'GSAP'],
    githubLink: 'https://github.com/TejaNaik15',
    liveDemoLink: '#home',
  },
  {
    id: 5,
    title: 'AI-Resume Analyzer',
    description: 'Upload your resume, analyze it, and view AI-driven insights such as scores, summaries, and improvement suggestions.',
    image: 'https://images.unsplash.com/photo-1551817958-20204d6ab3d9?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Three.js', 'React Three Fiber', 'Vite'],
    githubLink: 'https://github.com/TejaNaik15',
    liveDemoLink: '#',
  },
  {
    id: 6,
    title: 'Weather Visualizer',
    description: 'Weather app with animated visuals, search, and responsive layout.',
    image: 'https://images.unsplash.com/photo-1542228262-3d663b306a56?q=80&w=1200&auto=format&fit=crop',
    technologies: ['React', 'Tailwind CSS', 'OpenWeather API'],
    githubLink: 'https://github.com/TejaNaik15',
    liveDemoLink: '#',
  },
];

const colorPalette = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

const Projects = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const items = projectsData.map((p, idx) => {
    const color = colorPalette[idx % colorPalette.length];
    const liveUrl = p.liveDemoLink && p.liveDemoLink !== '#' ? p.liveDemoLink : undefined;
    const codeUrl = p.githubLink && p.githubLink !== '#' ? p.githubLink : undefined;
    return {
      image: p.image,
      title: p.title,
      subtitle: p.description,
      handle: p.technologies.join(' · '),
      borderColor: color,
      gradient: `linear-gradient(145deg, ${color}, #000)`,
      liveUrl,
      codeUrl,
      url: liveUrl || codeUrl,
    };
  });

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen bg-gray-900/60 backdrop-blur-sm text-white p-8 flex flex-col items-center justify-center">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-accent-pink">My Projects</h1>
        <div className="flex justify-center">
          <ChromaGrid items={items} columns={3} rows={2} radius={280} />
        </div>
      </div>
    </section>
  );
};

export default Projects;
