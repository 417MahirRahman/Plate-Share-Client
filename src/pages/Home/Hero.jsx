import React from "react";

const Hero = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-[#DC143C] mb-6 leading-tight">
              Share Food, Reduce Waste, Build Community.
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              PlateShare connects neighbors through food sharing, turning surplus meals into opportunities for kindness and sustainability. Donate your extra food or find meals in need—all in one trusted platform.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button className="bg-[#DC143C] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#b81232] transition-colors duration-300 shadow-lg hover:shadow-xl text-lg">
                View Available Foods
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="https://i.ibb.co.com/0yjdqdrF/hero.webp" 
                alt="Community Food Sharing" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
