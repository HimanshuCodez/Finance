import React from 'react';
import { motion } from 'framer-motion';

const DigitalInsurance = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center w-full bg-gradient-to-r from-indigo-100 to-indigo-200 p-8">
      {/* Left side */}
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-indigo-900">Experience <span className="text-indigo-700">Digital Insurance</span></h2>
        <p className="text-gray-600 text-lg">One dashboard for all your insurance needs</p>
        <div className="flex space-x-4">
          <motion.button
            className="bg-white text-indigo-900 px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Personal Insurance
          </motion.button>
          <motion.button
            className="bg-white text-gray-500 px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Corporate Insurance
          </motion.button>
        </div>
        <ul className="space-y-3 text-indigo-900 pt-4">
          <li className="flex items-center text-lg"><span className="text-2xl mr-3">⏳</span> Track claims</li>
          <li className="flex items-center text-lg"><span className="text-2xl mr-3">✍️</span> Make policy changes</li>
          <li className="flex items-center text-lg"><span className="text-2xl mr-3">📄</span> Complete paperwork digitally</li>
        </ul>
        <motion.button
          className="bg-indigo-900 text-white px-8 py-3 rounded-full hover:bg-indigo-800 transition font-semibold text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book a Dashboard Demo -
        </motion.button>
      </div>
      {/* Right side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="https://images.bimakavach.com/v4/homepage/businesss.v3.webp" alt="Dashboard View" className="rounded-lg bg-blue-800 shadow-2xl w-full h-auto" />
      </motion.div>
    </div>
  );
};

export default DigitalInsurance;
