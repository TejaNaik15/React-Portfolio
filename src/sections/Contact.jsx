import React from 'react';
import SocialWrapper from '../components/SocialWrapper';
import useScrollReveal from '../hooks/useScrollReveal';
import { FaPhone, FaEnvelope, FaMapMarkedAlt } from 'react-icons/fa';
import { Globe } from '@/components/magicui/globe.jsx';
import ShaderBackground from '@/components/ShaderBackground.jsx';
import { BorderBeam } from '@/components/magicui/border-beam.jsx';

const Contact = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 }); 

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen bg-primary-dark text-white px-4 sm:px-6 md:px-8 py-12 flex flex-col items-center justify-center transition-opacity-transform overflow-hidden scroll-mt-28 md:scroll-mt-40">
      <ShaderBackground />
      <div className="relative container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink">Contact Me</h1>

        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Feel free to reach out to me for collaborations, job opportunities, or just a chat:)
          You can connect with me via email or LinkedIn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          <div className="relative flex w-full h-[360px] md:h-[460px] items-center justify-center overflow-hidden rounded-lg order-2 md:order-1">
            <Globe className="top-16 md:top-20" />
          </div>
          <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg shadow-lg text-left order-1 md:order-2 w-full">
            <h2 className="text-2xl font-semibold mb-4 text-accent-blue">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-text-muted mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 rounded-md bg-gray-700/70 border border-gray-600 focus:border-accent-pink focus:ring focus:ring-accent-pink focus:ring-opacity-50 outline-none"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-text-muted mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 rounded-md bg-gray-700/70 border border-gray-600 focus:border-accent-pink focus:ring focus:ring-accent-pink focus:ring-opacity-50 outline-none"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-text-muted mb-1">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full p-3 rounded-md bg-gray-700/70 border border-gray-600 focus:border-accent-pink focus:ring focus:ring-accent-pink focus:ring-opacity-50 outline-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="relative w-full bg-accent-blue text-white px-6 py-3 rounded-full text-lg hover:bg-accent-purple transition-colors duration-300 overflow-hidden"
              >
                <span className="relative z-10">Send Message</span>
                <span className="absolute inset-0 rounded-full pointer-events-none" aria-hidden>
                  <BorderBeam duration={8} size={120} colors={["#13ADC7","#945DD6","#FF3C78"]} />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
