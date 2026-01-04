import React from "react";

const About = () => {
  return (
    <div>
      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Our Story
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
            {/* Why We Started Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-[#DC143C] rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-[#DC143C] mb-4">
                Why We Started
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Every year, millions of tons of edible food go to waste while countless individuals face food insecurity. PlateShare was born from a simple idea: what if neighbors could easily share their extra meals with those in need — right in their own community?
              </p>
            </div>

            {/* Our Values Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-[#DC143C] rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-[#DC143C] mb-4">
                Our Values
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We believe in sustainability, compassion, and community empowerment. Every shared meal reduces waste, supports neighbors, and strengthens local bonds. PlateShare is more than an app — it's a movement toward mindful consumption and collective care.
              </p>
            </div>
          </div>

          {/* Mission Stats */}
          <div className="bg-[#F7CAC9] rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-[#DC143C] mb-6">
              Community Impact
            </h3>
            <div className="text-4xl md:text-6xl font-bold text-[#DC143C] mb-4">
              10,000+
            </div>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
              Meals shared and counting! Join us in building a zero-waste, hunger-free neighborhood.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of neighbors who are already sharing food and building stronger communities.
          </p>
          <button className="bg-white text-[#DC143C] font-semibold px-8 py-3 rounded-lg hover:bg-[#F7CAC9] transition-colors duration-300 transform hover:scale-105 shadow-lg">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
