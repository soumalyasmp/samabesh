import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventList from '../components/EventList';
import JobList from '../components/JobList';
import SuccessStories from './SuccessStories';
import gsap from 'gsap';
import './Home.css';  // Import the CSS file for Home page if needed

// TypewriterEffect Component
const TypewriterEffect = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  }, [index, text, speed, onComplete]);

  return <span>{displayedText}</span>;
};

// Home Component
const Home = () => {
  const [showSecondText, setShowSecondText] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current.querySelectorAll('.bullet-point'),
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 1 }
      );
    }
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 opacity-60 rounded-md -z-10"></div>
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative flex flex-col md:flex-row items-center justify-between bg-gray-100 bg-opacity-70 text-black pt-12 md:pt-16">
        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-[600px] p-8 md:w-1/2 md:pl-16">
          <h1 className="text-4xl md:text-5xl font-bold text-left mb-8 text-black">
            {/* First Part of Typewriter */}
            <TypewriterEffect
              text="Welcome to the " 
              speed={50}
              onComplete={() => setShowSecondText(true)} // Trigger second text after completion
            />
            {/* Second Part of Typewriter with Gradient */}
            {showSecondText && (
              <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                <br/>
                <TypewriterEffect
                  text="Alumni Association"
                  speed={50}
                />
                <br/>
                 <TypewriterEffect
                  text="Platform"
                  speed={210}
                />
              </span>
              
            )}
          </h1>

          {/* Login Buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-6">
            {/* Alumni Login Button */}
            <a 
              href="/login" 
              className="relative overflow-hidden bg-blue-500 text-white font-semibold py-4 px-8 rounded-lg 
                         transition-transform duration-300 ease-in-out transform hover:scale-105 
                         shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <span className="absolute inset-0 bg-blue-500 opacity-0 transition-opacity duration-300 
                               ease-in-out transform scale-110 hover:opacity-30 z-0"></span>
              <span className="relative z-10">Login as an Alumni</span>
            </a>

            {/* Student Login Button */}
            <a 
              href="/student-login" 
              className="relative overflow-hidden bg-green-500 text-white font-semibold py-4 px-8 rounded-lg 
                         transition-transform duration-300 ease-in-out transform hover:scale-105 
                         shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <span className="absolute inset-0 bg-green-500 opacity-0 transition-opacity duration-300 
                               ease-in-out transform scale-110 hover:opacity-30 z-0"></span>
              <span className="relative z-10">Login as a Student</span>
            </a>
            <a 
              href="/loginpage" 
              className="relative overflow-hidden bg-green-500 text-white font-semibold py-4 px-8 rounded-lg 
                         transition-transform duration-300 ease-in-out transform hover:scale-105 
                         shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <span className="absolute inset-0 bg-green-500 opacity-0 transition-opacity duration-300 
                               ease-in-out transform scale-110 hover:opacity-30 z-0"></span>
              <span className="relative z-10">Login</span>
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative hidden md:block w-full md:w-1/2 pt-6 bg-gray-100 bg-opacity-70 rounded-md">
          <img 
            src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Hero" 
            className="w-full h-full object-cover rounded-t-3xl rounded-b-3xl"
          />
        </div>
      </div>

      {/* About Us Section */}
      <section className="my-12 px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start">
          {/* Vertical Line */}
          <div className="relative w-1 bg-gray-800 h-full hidden md:block" style={{ width: '2px', marginRight: '1rem' }}></div>
          
          {/* About Us Content */}
          <div ref={aboutRef} className="md:w-4/5 flex flex-col">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              About Us
            </h2>
            <ul className="list-none space-y-4 pl-6">
              <li className="bullet-point text-lg text-gray-600">Connecting alumni with their alma mater</li>
              <li className="bullet-point text-lg text-gray-600">Providing networking and job opportunities</li>
              <li className="bullet-point text-lg text-gray-600">Tracking success stories and facilitating donations</li>
              <li className="bullet-point text-lg text-gray-600">Building a supportive community and resource network</li>
            </ul>
            <a 
              href="/about" 
              className="text-blue-500 hover:underline font-medium transition-colors duration-300 mt-4"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="my-12 px-4 md:px-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Our Highlights</h2>
        <div className="space-y-12">
          <EventList />
          <JobList />
          <SuccessStories />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
