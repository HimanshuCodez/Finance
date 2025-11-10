import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApplyForm from './ApplyForm';

const ReadyToBuy = () => {
  const [showBuyForm, setShowBuyForm] = useState(false);

  const handleBuyClick = () => {
    setShowBuyForm(true);
  };

  const handleCloseForm = () => {
    setShowBuyForm(false);
  };

  const inquiryOptions = ["Personal", "Corporate"];

  return (
    <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative text-center bg-white p-8 rounded-xl shadow-lg overflow-hidden">
                <div className="relative z-10 space-y-4">
                    <h2 className="text-3xl font-bold text-blue-600">Ready To Buy <span className="text-blue-700">Insurance?</span></h2>
                    <p className="text-gray-600 text-lg">Join SMR Finserv and protect Personal , Business needs today</p>
                    <motion.button
                        onClick={handleBuyClick}
                        className="bg-blue-400 text-white px-8 py-3 rounded-full  transition text-lg font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Buy Insurance
                    </motion.button>
                </div>
                {/* Decorative gradients */}
                <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-r from-transparent via-indigo-100 to-transparent opacity-50 rounded-full filter blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-50 rounded-full filter blur-3xl" />
            </div>
        </div>
        {showBuyForm && (
            <ApplyForm
                onClose={handleCloseForm}
                formTitle="Buy Insurance"
                subject="New Insurance Inquiry"
                insuranceOptions={inquiryOptions}
            />
        )}
    </section>
  );
};

export default ReadyToBuy;
