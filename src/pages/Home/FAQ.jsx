import React from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "Do I need to be logged in to view available food?",
      answer:
        "You can browse and view all available food listings without logging in. However, you must be logged in to send food requests or post your own surplus food.",
    },
    {
      question: "How do I post food to share on PlateShare?",
      answer:
        "After logging in to your account, click on 'Add Food' from your profile menu or dashboard. Fill out the form with food details including name, quantity, pickup location, expiry date, and upload a photo. Your post will be immediately visible to other users.",
    },
    {
      question: "Is there any cost to use PlateShare?",
      answer:
        "No, PlateShare is completely free for everyone. Donors can share food without any charges, and recipients can access available food listings at no cost. Our platform is built on community generosity and sustainability.",
    },
    {
      question: "How is food safety ensured on the platform?",
      answer:
        "Donors are required to provide accurate expiry dates and food descriptions. Recipients are encouraged to inspect food upon pickup and communicate directly with donors about any safety concerns. We also provide food handling guidelines for both parties.",
    },
    {
      question: "What types of food can be shared on PlateShare?",
      answer:
        "You can share any edible surplus food including cooked meals, packaged items, bakery goods, fruits, and vegetables. All food should be safe for consumption and properly stored. Please avoid sharing items that are past their expiry date or show signs of spoilage.",
    },
    {
      question: "How do I contact a food donor?",
      answer:
        "Once you find food you'd like to request, click 'View Details' and then send a food request through the platform. The donor will receive your request and can approve it, after which you'll be able to coordinate pickup details directly through our messaging system.",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <h3 className="font-bold text-lg mb-3 text-gray-800">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
