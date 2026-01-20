import React from "react";
import { motion } from "framer-motion";

const WhyShareFood = () => {
  const reasons = [
    {
      title: "Reduce Food Waste",
      description: "Every meal shared prevents edible food from ending up in landfills, helping create a more sustainable future for our planet.",
      icon: "🌱"
    },
    {
      title: "Help People in Need",
      description: "Your surplus food can provide nourishment to neighbors facing food insecurity, making a real difference in someone's life.",
      icon: "❤️"
    },
    {
      title: "Simple & Secure Requests",
      description: "Our platform ensures safe, transparent food sharing with verified users and secure communication between donors and recipients.",
      icon: "🔐"
    },
    {
      title: "Community-Driven Platform",
      description: "Join a growing network of compassionate individuals who believe in the power of community support and collective action.",
      icon: "🤝"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#DC143C]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Share Food With PlateShare
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3 className="text-lg font-bold mb-3 text-gray-800">{reason.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyShareFood;
