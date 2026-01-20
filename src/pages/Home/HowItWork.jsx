import React from "react";
import { motion } from "framer-motion";

const HowItWork = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up as a donor or recipient and complete your profile to start sharing or receiving food in your community."
    },
    {
      number: "02",
      title: "Post or Browse Food",
      description: "Donors post surplus food with details like quantity, location, and expiration. Recipients browse available items nearby."
    },
    {
      number: "03",
      title: "Send & Review Requests",
      description: "Recipients send food requests to donors, who review and approve requests before coordinating pickup details."
    },
    {
      number: "04",
      title: "Share & Connect",
      description: "Coordinate pickup times, share meals with those in need, and build stronger community connections through kindness."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#DC143C]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
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
              <div className="w-12 h-12 bg-[#DC143C] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                {step.number}
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-800">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
