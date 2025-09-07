import React from 'react';
import SocialWrapper from '../components/SocialWrapper'; 
import useScrollReveal from '../hooks/useScrollReveal'; 
import { FaPhone, FaEnvelope, FaMapMarkedAlt } from 'react-icons/fa';

const Contact = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 }); 

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen bg-primary-dark text-white p-8 flex flex-col items-center justify-center transition-opacity-transform scroll-mt-28 md:scroll-mt-40">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-accent-blue">Contact Me</h1>

        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Feel free to reach out to me for collaborations, job opportunities, or just a chat!
          You can connect with me via email or LinkedIn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg shadow-lg text-left col-span-1 md:col-span-2 mx-auto w-full md:max-w-xl">
            <h2 className="text-2xl font-semibold mb-4 text-accent-purple">Send a Message</h2>
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
                className="w-full bg-accent-blue text-white px-6 py-3 rounded-full text-lg hover:bg-accent-purple transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
