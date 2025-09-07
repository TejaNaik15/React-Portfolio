import React from 'react';
import {
  FaChevronCircleRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkedAlt,
} from 'react-icons/fa';
import SocialWrapper from '../components/SocialWrapper'; 

const Footer = () => {
  return (
    <section className="bg-primary-dark text-text-muted py-10 md:py-16 border-t border-white/10">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">

        
        <div className="flex-1 min-w-[280px] max-w-[350px] text-center md:text-left">
          <h3 className="text-3xl font-bold text-accent-blue mb-4">Teja's Portfolio</h3>
          <p className="text-lg leading-relaxed">
            Thank you for visiting my personal portfolio website. Connect with me over socials.
            <br /><br />
            Keep Rising 🚀. Connect with me over live chat!
          </p>
        </div>

        
        <div className="flex-1 min-w-[200px] max-w-[250px] text-center md:text-left">
          <h3 className="text-3xl font-bold text-accent-blue mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="#home" className="text-lg hover:text-accent-blue transition-colors duration-300 flex items-center justify-center md:justify-start">
                <FaChevronCircleRight className="mr-2 text-accent-blue" /> home
              </a>
            </li>
            <li>
              <a href="#about" className="text-lg hover:text-accent-blue transition-colors duration-300 flex items-center justify-center md:justify-start">
                <FaChevronCircleRight className="mr-2 text-accent-blue" /> about
              </a>
            </li>
            <li>
              <a href="#skills" className="text-lg hover:text-accent-blue transition-colors duration-300 flex items-center justify-center md:justify-start">
                <FaChevronCircleRight className="mr-2 text-accent-blue" /> skills
              </a>
            </li>
            <li>
              <a href="#projects" className="text-lg hover:text-accent-blue transition-colors duration-300 flex items-center justify-center md:justify-start">
                <FaChevronCircleRight className="mr-2 text-accent-blue" /> projects
              </a>
            </li>
            <li>
              <a href="#education" className="text-lg hover:text-accent-blue transition-colors duration-300 flex items-center justify-center md:justify-start">
                <FaChevronCircleRight className="mr-2 text-accent-blue" /> education
              </a>
            </li>
            <li>
              <a href="#contact" className="text-lg hover:text-accent-blue transition-colors duration-300 flex items-center justify-center md:justify-start">
                <FaChevronCircleRight className="mr-2 text-accent-blue" /> contact
              </a>
            </li>
          </ul>
        </div>

        
        <div className="flex-1 min-w-[280px] max-w-[350px] text-center md:text-left">
          <h3 className="text-3xl font-bold text-accent-blue mb-4">Contact Info</h3>
          <div className="space-y-3">
            <div className="text-lg flex items-center justify-center md:justify-start gap-3">
              <FaPhone className="text-accent-blue w-5 h-5" />
              <span className="leading-none">+91 7569474682</span>
            </div>
            <div className="text-lg flex items-center justify-center md:justify-start gap-3">
              <FaEnvelope className="text-accent-blue w-5 h-5" />
              <span className="leading-none">tinkuteja740@gmail.com</span>
            </div>
            <div className="text-lg flex items-center justify-center md:justify-start gap-3">
              <FaMapMarkedAlt className="text-accent-blue w-5 h-5" />
              <span className="leading-none">TS, India-500100</span>
            </div>
          </div>

          <SocialWrapper /> 
        </div>

      </div>

      <h1 className="text-center text-white text-lg mt-12 border-t border-white/10 pt-8 mx-auto px-8 max-w-6xl">
        &copy; {new Date().getFullYear()} KELOTH TEJA NAIK. All rights reserved.
      </h1>

    </section>
  );
};

export default Footer;
