import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import profileImg from '../assets/profileImg.jpg'
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
    autoplaySpeed: 2000,
    duration: 100,
    slidesToShow: 3,
    arrows: false,
  };
  const settings1 = {
    autoplay: true,
    autoplaySpeed: 2500,
    duration: 100,
    slidesToShow: 3,
    arrows: false,
    centerMode: true
  };

  if (!stories || stories.length === 0) {
    return (
      <div>
        <Navbar />
        <h2>Alumni Success Stories</h2>
        <p>No story available</p>
        <Footer />
      </div>
    ); // If the array is empty or undefined
  } else {
    return (
      <div>
        <Navbar />
        <h2 className=" text-2xl md:text-5xl font-bold my-3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">Alumni Success Stories</h2>
        <div>

          <Slider {...settings}>
            {stories.map((story, index) => (
              <div key={story._id || index} className='story-card w-4/12 aspect-[4/2] ' >
                <div className='flex flex-col rounded-2xl m-4 h-full p-3' style={{
                  background: "rgba(105, 142, 255, 0.2)",
                  borderRadius: "16px",
                  boxShadow: "0px 1px 13px 2px rgb(198 187 253 / 62%)",
                  backdropFilter: "blur(5px)",

                  border: "1px solid rgba(105, 142, 255, 0.3)"
                }}>

                  <div className='flex flex-row gap-2.5 ' style={{ height: "15%" }}>
                    <img src={profileImg} className='w-8 h-8 rounded-full'></img>
                    <p className='story-alumni'>{story.alumniName}</p>

                  </div>
                  <div className='bg-white rounded-xl px-3 pt-3 pb-0' style={{height:"85%"}}>
                    <h3 className='story-title' style={{ height: "20%" }}><strong>{story.title}</strong></h3>
                    <p className='story-desc ' style={{ height: "65%", textAlign: "start" }}>{story.description}</p>
                    <p className='story-date ' style={{ height: "15%", fontSize: "small", textAlign: "start" }}>{new Date(story.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className='my-10'>

          <Slider {...settings1}>
            {stories.map((story, index) => (
              <div key={story._id || index} className='story-card w-4/12 aspect-[4/2] ' >
                <div className='flex flex-col rounded-2xl m-4 h-full p-3' style={{
                  background: "rgba(105, 142, 255, 0.2)",
                  borderRadius: "16px",
                  boxShadow: "0px 1px 13px 2px rgb(198 187 253 / 62%)",
                  backdropFilter: "blur(5px)",

                  border: "1px solid rgba(105, 142, 255, 0.3)"
                }}>

                  <div className='flex flex-row gap-2.5 ' style={{ height: "15%" }}>
                    <img src={profileImg} className='w-8 h-8 rounded-full'></img>
                    <p className='story-alumni'>{story.alumniName}</p>

                  </div>
                  <div className='bg-white rounded-xl px-3 pt-3 pb-0 mt-1' style={{height:"85%"}}>
                    <h3 className='story-title' style={{ height: "20%" }}><strong>{story.title}</strong></h3>
                    <p className='story-desc ' style={{ height: "65%", textAlign: "start" }}>{story.description}</p>
                    <p className='story-date ' style={{ height: "15%", fontSize: "small", textAlign: "start" }}>{new Date(story.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <Footer />
      </div>
    );
  }

  // return (
  //   <div>
  //     <Navbar />
  //     <h2>Alumni Success Stories</h2>
  //     <ul>
  //       <Slider {...settings}>
  //       {stories.map((story, index) => (
  //         <li key={story._id || index} className='story-card w-4/12 aspect-[4/2] flex flex-col rounded-2xl'>
  //           <div className='flex flex-row gap-2.5 ' style={{height:"15%"}}>
  //             <img src={profileImg} className='w-8 h-8 rounded-full'></img>
  //             <p className='story-alumni'>{story.alumniName}</p>

  //           </div>
  //           <h3 className='story-title' style={{height:"15%"}}><strong>{story.title}</strong></h3>
  //           <p className='story-desc ' style={{height:"60%"}}>{story.description}</p>
  //           <p className='story-date ' style={{height:"10%",fontSize:"small",textAlign:"start"}}>{new Date(story.date).toLocaleDateString()}</p>
  //         </li>
  //       ))}
  //       </Slider>
  //     </ul>
  //     <Footer />
  //   </div>
  // );
};



export default SuccessStories;