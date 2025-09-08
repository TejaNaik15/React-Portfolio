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
    <section id="footer" className="relative overflow-hidden text-text-muted py-12 px-4 sm:px-6 md:px-8 border-t border-white/10">
      <div className="pointer-events-none absolute inset-0 opacity-90 bg-gradient-to-t from-secondary-dark via-primary-dark to-primary-dark" />
      <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-center md:text-left">

        {/* About Section */}
        <div className="flex-1 min-w-[280px] max-w-[350px] mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-accent-blue mb-4">Teja's Portfolio</h3>
          <p className="text-base sm:text-lg leading-relaxed">
            Thank you for visiting my personal portfolio website. Connect with me over socials.
            <br /><br />
            Keep Rising 🚀. Connect with me over live chat!
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="flex-1 min-w-[200px] max-w-[250px] mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-accent-blue mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {['home', 'about', 'skills', 'projects', 'education', 'contact'].map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  className="text-base sm:text-lg hover:text-accent-blue transition-colors duration-300 flex items-center justify-center md:justify-start"
                >
                  <FaChevronCircleRight className="mr-2 text-accent-blue" /> {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="flex-1 min-w-[280px] max-w-[350px] mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-accent-blue mb-4">Contact Info</h3>
          <div className="space-y-3 text-base sm:text-lg">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <FaPhone className="text-accent-blue w-5 h-5" />
              <span>+91 7569474682</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <FaEnvelope className="text-accent-blue w-5 h-5" />
              <span>tinkuteja740@gmail.com</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <FaMapMarkedAlt className="text-accent-blue w-5 h-5" />
              <span>TS, India - 500100</span>
            </div>
          </div>

          <div className="mt-4">
            <SocialWrapper />
          </div>
        </div>
      </div>

      <h1 className="relative text-center text-white text-base sm:text-lg mt-12 border-t border-white/10 pt-6 mx-auto px-4 sm:px-6 md:px-8 max-w-6xl break-words">
        © {new Date().getFullYear()} KELOTH TEJA NAIK. All rights reserved.
      </h1>
    </section>
  );
};

export default Footer;
