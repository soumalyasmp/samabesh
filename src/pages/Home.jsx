import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventList from '../components/EventList';
import JobList from '../components/JobList';
import SuccessStories from './SuccessStories';
import department from '../assets/department.jpg';
import lab from '../assets/lab.jpg';
import need from '../assets/need.jpg';
import program from '../assets/program.jpg';
import scholarship from '../assets/scholarship.jpg';
import gsap from 'gsap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';  // Import the CSS file for Home page if needed
// importing local images
import almaMater from '../assets/almaMater.png';
import communityIng from '../assets/community.jpg';
import networkImg from '../assets/network.jpg';
import successImg from '../assets/suces.jpg';
import DonationList from '../components/DonationList';
import DonationListHome from '../components/DonationListHome';
const AuthContext = React.createContext();
// TypewriterEffect Component
const TypewriterEffect = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
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

// DonationCard Component
// const DonationCard = ({ image, title, description, isLoggedIn }) => {
//   const handleDonateClick = () => {
//     if (!isLoggedIn) {
//       window.location.href = '/loginpage'; // Redirect to login if not logged in
//     } else {
//       window.location.href = '/donate'; // Redirect to donate page if logged in
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//       <img src={image} alt={title} className="w-full h-40 object-contain rounded-md mb-4" />
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p className="text-gray-700 mb-4">{description}</p>
//       <button 
//         onClick={handleDonateClick}
//         className="inline-block py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
//       >
//         Donate Now
//       </button>
//     </div>
//   );
// };

// Gallery Section Component
const Gallery = ({ images }) => (
  <section className="my-12 px-4 md:px-8">
    <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Gallery</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <img 
            src={image} 
            alt={`Gallery ${index + 1}`}  
            className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
      ))}
    </div>
  </section>
);

// Home Component
const Home = () => {
  const [showSecondText, setShowSecondText] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Slideshow index
  const aboutRef = useRef(null);

  const images = [
    "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/7942487/pexels-photo-7942487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/7944035/pexels-photo-7944035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/159740/library-la-trobe-study-students-159740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  // Gallery images
  const galleryImages = [
    "https://th.bing.com/th/id/R.0271d018ad56b4720c47b0a77f448794?rik=WDqIb6d6rJGWlw&riu=http%3a%2f%2fwww.tipolytechnic.org%2fassets%2fimg%2fslide%2fslide-6.jpg&ehk=4%2bOzF2gJ1aUHvLNUxNfPElbGZihYPm4OqGuYIJk5bns%3d&risl=&pid=ImgRaw&r=0",
    "https://assets.telegraphindia.com/telegraph/2022/May/1653898341_main6.jpg",
    "https://th.bing.com/th/id/R.cda975f8968a732bdc7a4b97f564f9be?rik=hXncYll9i5RMTA&riu=http%3a%2f%2fwww.tipolytechnic.org%2fassets%2fimg%2fgallery%2fgallery-big-image4.jpg&ehk=Y7Y%2bvbs6GDUNXo%2bMhe0nbQJYAzDDnbmd9B24lQc79oI%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/OIP.7iAHf4x8xcLqO4tpzVd4vQHaEK?rs=1&pid=ImgDetMain",
    "https://img.jagranjosh.com/images/2022/March/1432022/272764526_3048392545428241_1297133573018160058_n.jpg",
    "https://assets.telegraphindia.com/telegraph/2023/May/1683117411_untitled-design-77.jpg",
    "https://theindianchronicles.com/wp-content/uploads/2023/12/IMG-20231220-WA0105.jpg",
    "https://content.jdmagicbox.com/comp/kolkata/f8/033pxx33.xx33.140520141448.r4f8/catalogue/techno-india-university-salt-lake-city-sector-5-kolkata-colleges-0xqp7p5uvr.jpg",
    department,
    "https://ticollege.ac.in/img/tig/tech-fest1.jpeg",
  ];

  useEffect(() => {
    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current.querySelectorAll('.bullet-point'),
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 1 }
      );
    }
  }, []);

  // Slideshow effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer); // Clear interval on unmount
  }, [images.length]);

  // Donation data
  // const donations = [
  //   {
  //     image: lab,
  //     title: "Undergraduate Labs",
  //     description: "Support the development of state-of-the-art labs and equipment for undergraduate students to enhance their learning experience."
  //   },
  //   {
  //     image: need,
  //     title: "Unrestricted and Greatest Need",
  //     description: "Contribute to the areas of greatest need across the institution where funds can be allocated most effectively."
  //   },
  //   {
  //     image: scholarship,
  //     title: "Scholarships/Student Programs",
  //     description: "Help provide scholarships and support programs that aid students in their academic and extracurricular pursuits."
  //   },
  //   {
  //     image: program,
  //     title: "Faculty/Memorial Programs",
  //     description: "Honor distinguished faculty and support memorial programs that preserve their legacy and contribute to educational excellence."
  //   }
  // ];

  return (
    <div className="bg-white min-h-screen flex flex-col relative">
    {/* Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 opacity-60 rounded-md -z-10"></div>
    
    {/* Navbar */}
    <Navbar />

    {/* Add margin-top or padding-top here */}
    <div className="pt-12 md:pt-16">
      {/* Hero Section */}
      <div className="relative flex flex-col md:flex-row items-center justify-between bg-gray-100 bg-opacity-70 text-black pt-12 md:pt-16">
        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-[600px] p-8 md:w-1/2 md:pl-16">
        <h1 className="text-4xl md:text-5xl font-bold text-left mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-500 to-blue-600">
  <TypewriterEffect text="Welcome to the Alumni Association" onComplete={() => setShowSecondText(true)} />
</h1>
          <p className="mt-4 text-xl md:text-2xl font-semibold text-left text-black">
            {showSecondText && <TypewriterEffect text="Together, we can achieve more!" />}
          </p>

          {/* Login Buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-6">
            <a 
              href="/loginpage" 
              className="relative overflow-hidden bg-blue-500 text-white font-semibold py-4 px-8 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <span className="absolute inset-0 bg-blue-500 opacity-0 transition-opacity duration-300 ease-in-out transform scale-110 hover:opacity-30 z-0"></span>
              <span className="relative z-10">Login</span>
            </a>
          </div>
        </div>

        {/* Slideshow */}
        <div className="relative z-10 w-full md:w-1/2 h-[500px]">
          <img 
            src={images[currentImageIndex]} 
            alt="Slideshow Image"
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </div>

      {/* Donation Section */}
      {/* <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Make a Difference</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {donations.map((donation, index) => (
              <DonationCard key={index} image={donation.image} title={donation.title} description={donation.description} />
            ))}
          </div>
        </div>
      </section> */}
      <DonationListHome/>

      {/* Gallery */}
      <Gallery images={galleryImages} />
            {/* About Us Section */}
            <section className="my-12 px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start w-full">
          {/* Vertical Line */}
          <div className="relative w-1 bg-gray-800 h-full hidden md:block" style={{ width: '2px', marginRight: '1rem' }}></div>

          {/* About Us Content */}
          <div ref={aboutRef} className="md:w-full flex flex-col">
            <h2 className=" text-2xl md:text-5xl font-bold my-3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              About Us
            </h2>

            <div className='flex flex-col gap-32'>
              <AboutCard
                image={almaMater}
                heading={"Connecting alumni with their alma mater"}
                desc={"We focus on fostering a strong relationship between alumni and their alma mater by keeping them engaged through events, newsletters, and updates. Our aim is to cultivate a sense of pride and belonging, ensuring alumni remain connected to the institution’s ongoing growth and development."} />
              <AboutCard2
                image={networkImg}
                heading={"Providing networking and job opportunities"}
                desc={"We work to create a platform where alumni can connect professionally. By sharing job opportunities, industry insights, and mentorship, we empower graduates to advance in their careers while opening doors for students and recent alumni."} />
              <AboutCard
                image={successImg}
                heading={"Tracking success stories and facilitating donations"}
                desc={"We are committed to highlighting the achievements of our alumni, showcasing their successes to inspire current students and fellow graduates. At the same time, we provide a streamlined way for alumni to give back through donations, helping the institution grow and thrive."} />
              <AboutCard2
                image={communityIng}
                heading={"Building a supportive community and resource network"}
                desc={"We are dedicated to building a strong, supportive alumni community where members can share resources, knowledge, and experiences. By facilitating discussions, workshops, and collaboration, we create a network that helps alumni succeed both personally and professionally."} />
            </div>
            <a
              href="/about"
              className="text-blue-500 hover:underline font-medium transition-colors duration-300 mt-4"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Events List */}
      <EventList />

      {/* Jobs List */}
      <JobList />

      {/* Success Stories */}
      <SuccessStories />

      {/* Footer */}
      <Footer />
      </div>

  );
};
const AboutCard = ({ image, heading, desc }) => {
  useEffect(()=>{

    AOS.init({duration:2000});
    
  },[]);
  return (
    <div className='flex justify-start h-[45vh] gap-20 overflow-x-hidden'>
      <div className='w-[40%]' data-aos = "fade-right">
        <img src={image} className='h-full' />
      </div>
      <div className='w-[40%] flex flex-col justify-center gap-5' data-aos = "fade-left">
        <div className='text-2xl font-bold '>{heading}</div>
        <div className='text-lg'>{desc}</div>
      </div>
    </div>
  );
}
const AboutCard2 = ({ image, heading, desc }) => {
  useEffect(()=>{

    AOS.init({duration:2000});
    
  },[]);
  return (
    <div className='flex justify-end h-[45vh] gap-20 overflow-x-hidden'>

      <div className='w-[40%] flex flex-col justify-center gap-5' data-aos = "fade-right">
        <div className='text-2xl font-bold '>{heading}</div>
        <div className='text-lg'>{desc}</div>
      </div>
      <div className='w-[40%]' data-aos = "fade-left">
        <img src={image} className='h-full' />
      </div>
    </div>
  );
}

export default Home;
