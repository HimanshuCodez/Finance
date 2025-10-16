import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqData = {
    "BimaKavach": [
        {
            question: "What is BimaKavach and how does it work?",
            answer: "BimaKavach is a digital insurance platform that simplifies business insurance. We help you get quotes, buy policies, and manage everything online."
        },
        {
            question: "Are there any extra fees for using BimaKavach, or is the service free?",
            answer: "Our service is completely free for businesses. We earn a commission from the insurance companies, so you don't pay anything extra."
        }
    ],
    "Business Insurance": [
        {
            question: "How can BimaKavach help my business save on insurance?",
            answer: "By comparing quotes from multiple insurers and using our smart business model, we can help you find the best coverage at the most competitive prices, often saving you up to 40%."
        }
    ],
    "Insurance Policies": [
        {
            question: "What types of insurance do you offer for businesses?",
            answer: "At BimaKavach, we offer a wide variety of corporate insurance policy options to cater to your business needs, including commercial business insurance, Property Insurance, Marine Insurance, Engineering Insurance, and corporate insurance policy for employees."
        },
        {
            question: "Is the commercial insurance process fully digital?",
            answer: "Yes, from getting quotes to filing claims, our platform is designed to be fully digital, saving you time and paperwork."
        }
    ]
};

const Faq = () => {
    const [activeTab, setActiveTab] = useState('BimaKavach');
    const [activeIndex, setActiveIndex] = useState(0);

    const handleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-indigo-900">Insurance Questions Made Simple</h2>
                    <p className="mt-4 text-lg text-gray-600">Have questions or need to speak to an expert?</p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Tabs */}
                    <div className="col-span-1">
                        <ul className="space-y-2">
                            {Object.keys(faqData).map((tab) => (
                                <li key={tab}>
                                    <button
                                        onClick={() => { setActiveTab(tab); setActiveIndex(0); }}
                                        className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-lg transition ${activeTab === tab ? 'bg-indigo-100 text-indigo-800' : 'hover:bg-gray-100'}`}
                                    >
                                        {tab}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Accordion */}
                    <div className="col-span-2">
                        <div className="space-y-4">
                            {faqData[activeTab].map((item, index) => (
                                <div key={index} className="border-b border-gray-200 pb-4">
                                    <button
                                        className="w-full flex justify-between items-center text-left"
                                        onClick={() => handleAccordion(index)}
                                    >
                                        <span className="text-lg font-semibold text-indigo-900">{item.question}</span>
                                        {activeIndex === index ? <Minus className="text-indigo-600" /> : <Plus className="text-gray-500" />}
                                    </button>
                                    <AnimatePresence>
                                        {activeIndex === index && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-4 text-gray-600 overflow-hidden"
                                            >
                                                {item.answer}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
