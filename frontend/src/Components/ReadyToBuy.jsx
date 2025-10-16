import React from 'react';
import { motion } from 'framer-motion';

const ReadyToBuy = () => {
  return (
    <div className="relative flex items-center justify-between w-full bg-white p-4 rounded-xl shadow-lg">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-indigo-900">Ready To Buy <span className="text-indigo-700">Business Insurance?</span></h2>
        <p className="text-gray-600">Join 4,000+ Indian businesses & protect your business today.</p>
      </div>
      <motion.button
        className="bg-indigo-900 text-white px-6 py-2 rounded-full hover:bg-indigo-800 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Buy Policy In Minutes
      </motion.button>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100 to-transparent opacity-50 rounded-xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_#e0e7ff_0%,_transparent_70%)] opacity-50 rounded-xl" />
    </div>
  );
};

export default ReadyToBuy;