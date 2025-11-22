import React from "react";
import { motion } from "motion/react";

const HowItWork = () => {
  return (
    <div className="p-5">
      <h1 className="text-center font-extrabold text-white mt-10 mb-8 text-4xl">
        How It Works
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:w-3/4 lg:mx-auto xl:grid-cols-3 p-3 lg:p-5 xl:p-7 gap-10 lg:gap-5 py-5">
        <motion.div
          whileHover={{ y: -10, x: 5, scale: 1.05, zIndex: 10 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full"
        >
          <div className="flex justify-center items-center w-full h-full overflow-hidden">
            <img
              className="w-full rounded-xl object-cover p-2"
              src="https://i.ibb.co.com/9mWf8W06/addFood.png"
            />
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -10, x: 5, scale: 1.05, zIndex: 10 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full"
        >
          <figure className="flex justify-center items-center w-full h-full overflow-hidden">
            <img
              className="w-full rounded-xl object-cover p-2"
              src="https://i.ibb.co.com/rGJVycng/lf.png"
            />
          </figure>
        </motion.div>
        <motion.div
          whileHover={{ y: -10, x: 5, scale: 1.05, zIndex: 10 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full"
        >
          <figure className="flex justify-center items-center">
            <img
              className="w-full h-full rounded-xl object-cover p-2"
              src="https://i.ibb.co.com/7ddBQNqK/cf-Picsart-Background-Remover-1.png"
            />
          </figure>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWork;
