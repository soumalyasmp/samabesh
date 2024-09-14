import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'; // Importing the logo image from the src/assets folder

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50); // Change navbar style after scrolling 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-white backdrop-blur-md fixed w-full top-0 left-0 z-50 transition-shadow duration-300 ease-in-out ${
        scrolled ? 'bg-opacity-90 shadow-lg' : 'shadow-none'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo Section with New Image */}
        <div className="flex items-center space-x-4">
          <img
            src={logo} // Using the imported logo image
            alt="Logo"
            className="w-8 h-8"
          />
          <div className="text-3xl font-extrabold">
            <Link to="/" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:text-gray-700 transition-colors">
              Somabesh
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-10">
          <Link
            to="/"
            className="text-gray-800 hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 px-4 py-2 rounded-lg shadow-md"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-800 hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 px-4 py-2 rounded-lg shadow-md"
          >
            About
          </Link>
          <Link
            to="/events"
            className="text-gray-800 hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 px-4 py-2 rounded-lg shadow-md"
          >
            Events
          </Link>
          <Link
            to="/jobs"
            className="text-gray-800 hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 px-4 py-2 rounded-lg shadow-md"
          >
            Jobs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
