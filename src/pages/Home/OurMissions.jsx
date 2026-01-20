import React from "react";

const OurMissions = () => {
  return (
    <div className="mt-15">
      <div
        className="hero min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url(https://i.ibb.co.com/1YLTwKBL/bg.jpg)",
        }}
      >
        <div className="hero-overlay bg-black/60"></div>
        <div className="hero-content text-neutral-content text-center relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Our Mission
            </h1>
            <p className="mb-5 text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Collect Food and Serve To The Needy and Helpless People
            </p>
            <p className="mb-5 text-lg md:text-xl font-semibold text-white/90">
              Don't Waste Your Food, Share it with the People in Need
            </p>
            <p className="mb-5 text-lg md:text-xl font-semibold text-white/90">
              Spread Humanity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMissions;
