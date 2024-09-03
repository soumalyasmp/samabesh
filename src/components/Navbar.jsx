import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white backdrop-blur-md shadow-none fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto gap-12 flex items-center p-4 ">
        <div className="flex space-x-10 b">
          <div className="text-2xl font-bold">
            <Link to="/" className="text-black hover:text-gray-700 transition-colors">Alumni Platform</Link>
          </div>
        </div>
        <div className="flex space-x-10 pl-[310px]" >
          <Link
            to="/"
            className="text-black hover:bg-gradient-to-r hover:from-pink-400 hover:to-yellow-400 hover:text-white transition-all duration-300 px-4 py-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-black hover:bg-gradient-to-r hover:from-pink-400 hover:to-yellow-400 hover:text-white transition-all duration-300 px-4 py-2 rounded-md"
          >
            About
          </Link>
          <Link
            to="/events"
            className="text-black hover:bg-gradient-to-r hover:from-pink-400 hover:to-yellow-400 hover:text-white transition-all duration-300 px-4 py-2 rounded-md"
          >
            Events
          </Link>
          <Link
            to="/jobs"
            className="text-black hover:bg-gradient-to-r hover:from-pink-400 hover:to-yellow-400 hover:text-white transition-all duration-300 px-4 py-2 rounded-md"
          >
            Jobs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
