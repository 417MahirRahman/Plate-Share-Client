import React from "react";

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#DC143C] mb-6">
            About PlateShare
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Building a world where no food goes to waste and everyone has access to nutritious meals.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#DC143C] mb-6">
                Our Mission
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                PlateShare connects communities through food sharing, reducing waste while ensuring no one goes hungry. We empower individuals to make a real difference in their neighborhoods with every meal shared.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#DC143C] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Reduce Food Waste</h3>
                  <p className="text-gray-600">Prevent edible food from ending up in landfills</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <img 
                src="https://placehold.co/600x400/F7CAC9/DC143C?text=Community+Impact" 
                alt="Community Impact" 
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#DC143C] mb-12">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-[#DC143C] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#DC143C] mb-4">Compassion</h3>
              <p className="text-gray-700">
                We believe in caring for our neighbors and creating a supportive community where everyone has access to food.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-[#DC143C] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#DC143C] mb-4">Sustainability</h3>
              <p className="text-gray-700">
                We're committed to reducing food waste and promoting environmentally responsible practices in our communities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-[#DC143C] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#DC143C] mb-4">Community</h3>
              <p className="text-gray-700">
                We foster strong local connections by bringing people together through the simple act of sharing food.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#DC143C] mb-4">
              Making a Real Difference
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Our community's impact speaks volumes about the power of collective action.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#DC143C] mb-2">10K+</div>
              <div className="text-gray-700 font-medium">Meals Shared</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#DC143C] mb-2">5K+</div>
              <div className="text-gray-700 font-medium">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#DC143C] mb-2">250+</div>
              <div className="text-gray-700 font-medium">Communities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#DC143C] mb-2">85%</div>
              <div className="text-gray-700 font-medium">Waste Reduced</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#DC143C] mb-6">
            Join Our Movement
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Every meal shared is a step toward a more sustainable and compassionate community.
          </p>
          <button className="bg-[#DC143C] text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-[#DC143C] hover:cursor-pointer transition-colors duration-300 shadow-lg hover:shadow-xl text-lg">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
