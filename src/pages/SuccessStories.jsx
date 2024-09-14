import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import profileImg from '../assets/profileImg.jpg';
import Slider from 'infinite-react-carousel';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Fetch success stories from the backend API
    const fetchStories = async () => {
      const res = await fetch('http://localhost:5000/api/alumni/success');
      const data = await res.json();

      // Assuming the response is an array of alumni with their successStories
      const allStories = data.reduce((acc, alumni) => {
        // Map each success story to include the alumni's name
        const storiesWithAlumniName = alumni.successStories.map(story => ({
          ...story,
          alumniName: alumni.name // Add the alumni's name to each story
        }));
        return [...acc, ...storiesWithAlumniName];
      }, []);

      setStories(allStories);
    };

    fetchStories();
  }, []);

  const settings = {
    autoplay: true,
    autoplaySpeed: 800, // Adjusted autoplay speed (3000 ms = 3 seconds)
    duration: 100, // Adjusted transition duration
    slidesToShow: 3,
    arrows: false,
    infinite: true,
    centerMode: false,
    slidesToScroll: 1,
    pauseOnHover: true, // Pause on hover
  };

  if (!stories || stories.length === 0) {
    return (
      <div>
        <Navbar />
        <h2 className="text-2xl md:text-5xl font-bold my-3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
          Alumni Success Stories
        </h2>
        <p>No story available</p>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <h2 className="text-2xl md:text-5xl font-bold my-3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
          Alumni Success Stories
        </h2>
        <div className="overflow-hidden">
          <Slider {...settings}>
            {stories.map((story, index) => (
              <div key={story._id || index} className="flex-none w-80 h-96 p-2">
                <div className="flex flex-col rounded-2xl h-full p-3 bg-blue-200 shadow-lg backdrop-blur-md border border-blue-300 transition-transform transform hover:scale-105 hover:shadow-xl">
                  <div className="flex flex-row gap-2.5 items-center" style={{ height: "20%" }}>
                    <img src={profileImg} className="w-12 h-12 rounded-full" alt="Profile" />
                    <p className="font-bold">{story.alumniName}</p>
                  </div>
                  <div className="bg-white rounded-xl px-3 pt-3 pb-0" style={{ height: "80%" }}>
                    <h3 className="font-semibold mb-2" style={{ height: "20%" }}><strong>{story.title}</strong></h3>
                    <p className="text-start mb-2" style={{ height: "60%" }}>{story.description}</p>
                    <p className="text-sm text-start" style={{ height: "20%" }}>{new Date(story.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
};

export default SuccessStories;








