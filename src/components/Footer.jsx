import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          {/* Left Section: Logo and Description */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Alumni Association</h3>
            <p className="text-gray-400 mt-1 max-w-xs mx-auto md:mx-0 text-xs">
              Connecting alumni, students, and institutions for networking, mentorship, and giving back.
            </p>
            <p className="text-gray-500 mt-2 text-xs">
              Location: 1234 University Ave, City, Country
            </p>
          </div>

          {/* Center Section: Navigation Links */}
          <div className="flex flex-col md:flex-row md:justify-center space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" className="hover:text-white transition-colors duration-300 text-xs">About Us</a>
            <a href="#" className="hover:text-white transition-colors duration-300 text-xs">Contact Us</a>
            <a href="#" className="hover:text-white transition-colors duration-300 text-xs">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300 text-xs">Terms of Service</a>
          </div>

          {/* Right Section: Social Media Icons */}
          <div className="flex space-x-3 mt-4 md:mt-0 justify-center md:justify-end">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <i className="fab fa-facebook-f fa-sm"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <i className="fab fa-twitter fa-sm"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <i className="fab fa-linkedin-in fa-sm"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <i className="fab fa-instagram fa-sm"></i>
            </a>
          </div>
        </div>

        {/* Bottom Section: Copyright and Branding */}
        <div className="mt-4 text-center border-t border-gray-700 pt-2">
          <p className="text-gray-400 text-xs mb-1">&copy; {new Date().getFullYear()} Alumni Association. All rights reserved.</p>
          <p className="text-gray-500 text-xs">Made for TMSL</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
