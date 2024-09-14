import React from 'react';
import asgor from '../assets/asgor.jpeg';
import piklu from '../assets/piklu.jpeg';
import pritam from '../assets/pritam.jpeg';
import priyanka from '../assets/priyanka.jpeg';
import puspendu from '../assets/puspendu.jpeg';
import soumalya from '../assets/soumalya.jpeg';
import Footer from '../components/Footer';
const AboutUs = () => {
  const founders = [
    { name: 'Soumalya Sinhamahapatra', image: soumalya },
    { name: 'Pritam Saha', image: pritam },
     { name: 'Priyanka Saha ', image: priyanka },
    { name: 'Piklu Kundu', image: piklu },
     { name: 'Ashgar Hussan', image: asgor },
    { name: 'Pushpendu Nayak', image: puspendu },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* About Us Section */}
      <div className="flex-grow container mx-auto py-16">
        <h1 className="text-3xl font-semibold text-center mb-8">About Us</h1>
        <p className="text-center mb-8 text-gray-600">
          We are a passionate team of innovators dedicated to making a difference. Meet our founders below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <div key={index} className="text-center">
              <img
                src={founder.image}
                alt={founder.name}
                className="w-48 h-48 object-cover mx-auto rounded-full shadow-lg"
              />
              <h2 className="text-xl font-bold mt-4">{founder.name}</h2>
            </div>
          ))}
        </div>
        <br />
        <br />
        <div>
        Welcome to SomaBesh, a passionate team of innovators and creators dedicated to making a difference in the world of Education . Our journey began with a simple vision: to empower individuals and organizations with the tools they need to thrive in an ever-changing landscape.

With a combined experience of over 1 months , our developers come from diverse backgrounds, bringing unique perspectives and expertise to the table. We believe in the power of collaboration, innovation, and continuous growth.

At SomaBesh , our mission is to deliver cutting-edge solutions that simplify complex processes and provide access to opportunities and resources for every individual . We're not just a company – we're a community of like-minded individuals working towards a shared goal of excellence and progress.
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default AboutUs;
