import React from "react";
import { motion } from "framer-motion";

const Service = () => {
  const services = [
    {
      title: "Food Donation Portal",
      description: "A seamless interface for individuals, restaurants, and events to list surplus food with images, quantity, location, pickup instructions, and expiry time—all in just a few clicks.",
      icon: "🍽️"
    },
    {
      title: "Community Food Access",
      description: "Open browsing for all users to discover available food nearby. View detailed listings with donor information, food photos, and pickup guidelines to find meals when you need them most.",
      icon: "🌍"
    },
    {
      title: "Request & Coordination System",
      description: "Send food requests directly to donors, coordinate pickup times, and receive notifications—all within our secure platform to ensure smooth handoffs and reduce food waste.",
      icon: "🤝"
    },
    {
      title: "Location-Based Discovery",
      description: "Find food donations in your neighborhood or specific areas like Mirpur, Dhanmondi, or Gulshan with our intelligent location filtering and mapping integration.",
      icon: "🗺️"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-2xl md:text-4xl font-bold text-center mb-12 text-[#DC143C]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <div className="text-4xl mb-5">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
