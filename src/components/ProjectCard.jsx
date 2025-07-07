import React from 'react';
import { FaGithub } from 'react-icons/fa'; 

const ProjectCard = ({ title, description, image, technologies, githubLink, liveDemoLink }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2 text-accent-purple">{title}</h2>
        <p className="text-text-muted mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span key={index} className="bg-gray-700 text-sm px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-around mt-4">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-pink text-white px-4 py-2 rounded-full hover:bg-accent-purple transition-colors duration-300 flex items-center"
          >
            <FaGithub className="mr-2" /> GitHub
          </a>
          {liveDemoLink && (
            <a
              href={liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-yellow text-gray-900 px-4 py-2 rounded-full hover:bg-yellow-500 transition-colors duration-300"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;