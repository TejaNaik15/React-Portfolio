import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-primary-dark p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Teja Naik
        </Link>

        
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="text-text-muted hover:text-white transition-colors duration-300">Home</a>
          <a href="#about" className="text-text-muted hover:text-white transition-colors duration-300">About</a>
          <a href="#skills" className="text-text-muted hover:text-white transition-colors duration-300">Skills</a>
          <a href="#projects" className="text-text-muted hover:text-white transition-colors duration-300">Projects</a>
          <a href="#education" className="text-text-muted hover:text-white transition-colors duration-300">Education</a>
          <a href="#contact" className="text-text-muted hover:text-white transition-colors duration-300">Contact</a>
        </div>

        
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

    
      {isOpen && (
        <div className="md:hidden bg-primary-dark mt-4 pb-4">
          <a href="#home" className="block text-white px-4 py-2 hover:bg-gray-700" onClick={toggleMenu}>Home</a>
          <a href="#about" className="block text-white px-4 py-2 hover:bg-gray-700" onClick={toggleMenu}>About</a>
          <a href="#skills" className="block text-white px-4 py-2 hover:bg-gray-700" onClick={toggleMenu}>Skills</a>
          <a href="#projects" className="block text-white px-4 py-2 hover:bg-gray-700" onClick={toggleMenu}>Projects</a>
          <a href="#education" className="block text-white px-4 py-2 hover:bg-gray-700" onClick={toggleMenu}>Education</a>
          <a href="#contact" className="block text-white px-4 py-2 hover:bg-gray-700" onClick={toggleMenu}>Contact</a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;