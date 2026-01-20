import React from "react";
import { motion } from "framer-motion";

const NewsLetter = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-2xl md:text-4xl font-bold mb-6 text-[#DC143C]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Stay Updated with PlateShare
        </motion.h2>

        <motion.p
          className="text-gray-700 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Subscribe to our newsletter for the latest updates on new features,
          community success stories, food waste reduction tips, and upcoming
          events.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto bg-[#DC143C] p-15 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 border-2 border-white rounded-lg bg-white text-gray-700 placeholder-gray-500 backdrop-blur-sm outline-0"
          />
          <motion.button
            className="bg-white text-[#DC143C] font-bold py-3 px-6 rounded-lg hover:cursor-pointer transition-colors shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Subscribe
          </motion.button>
        </motion.div>

        <motion.p
          className="text-white/70 text-sm mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          We respect your privacy. Unsubscribe at any time.
        </motion.p>
      </div>
    </section>
  );
};

export default NewsLetter;
