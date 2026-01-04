import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      title: "Real-time Food Listings",
      description: "Browse available food posts instantly with live updates from donors across your city.",
      icon: "📋"
    },
    {
      title: "Secure User Authentication",
      description: "Protected accounts ensure safe food sharing between verified donors and recipients.",
      icon: "🔒"
    },
    {
      title: "Location-Based Search",
      description: "Find food near you using our smart location filtering system for convenient pickup.",
      icon: "📍"
    },
    {
      title: "Expiry Date Tracking",
      description: "Clear expiry information helps ensure food safety and timely consumption.",
      icon: "⏰"
    },
    {
      title: "Food Request System",
      description: "Send requests directly to donors and coordinate pickup details seamlessly.",
      icon: "📤"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-2xl md:text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Platform Features
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
