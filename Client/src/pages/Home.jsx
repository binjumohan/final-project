import React from "react";
import bannerVideo from "../assets/banner.mp4";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full h-[80vh] overflow-hidden bg-black pt-20">

        {/* Background Video */}
        <video
          src={bannerVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold
            bg-linear-to-r from-yellow-400 to-yellow-600
            text-transparent bg-clip-text mb-4">
            Circle Up
          </h1>

          <p className="text-yellow-100 text-lg md:text-xl max-w-2xl">
            Discover events • Connect with people • Grow together
          </p>
          <Link to='events'>
          <button className="mt-8 px-8 py-3 rounded-xl
            bg-yellow-500 text-black font-semibold
            hover:bg-yellow-400 transition">
            Explore Events
          </button>
          </Link>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-yellow-50 py-20 px-6">
        <div className="max-w-5xl mx-auto text-justify">
          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-600 mb-6">
            About Us
          </h2>

         
        <p className="text-gray-700 text-lg leading-relaxed p-2 m-4"> <span className="font-bold">Circle Up </span>is built to strengthen local communities by making events easier to 
          discover and attend. We believe that meaningful connections  happen when people 
          come together in real life — through shared interests, celebrations, and experiences.</p> 

        <p className="text-gray-700 text-lg leading-relaxed p-2 m-4">Our platform highlights events happening in your neighborhood, from cultural 
          programs and workshops to meetups, sports activities, and social gatherings. 
          Whether you’re new to a city or a long-time resident, Circle Up helps you stay 
          connected to what’s happening around you.</p>

        <p className="text-gray-700 text-lg leading-relaxed p-2 m-4">We also empower local organizers by giving them a simple way to promote events, 
          reach the right audience, and build stronger communities. By bringing people and 
          events together in one place, we aim to make every local event more visible, 
          accessible, and impactful.</p>
        </div>
      </section>
    </>
  );
};

export default Home;
