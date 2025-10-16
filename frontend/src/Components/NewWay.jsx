import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const sections = [
    {
        id: 1,
        title: "Speed",
        subtitle: "Quotes in seconds, coverage in minutes!",
        description: "Share details, get quotes & buy the policy.",
        image: "https://images.bimakavach.com/v4/homepage/Speed_Img.webp"
    },
    {
        id: 2,
        title: "Service",
        subtitle: "Dedicated support, quick replies!",
        description: "Forget customer care. Your Relationship Manager is there for you.",
        image: "https://images.bimakavach.com/v4/homepage/Service_Img.webp"
    },
    {
        id: 3,
        title: "Savings",
        subtitle: "Upto 40% discount on premium.",
        description: "Our smart business model helps you save on your business insurance.",
        image: "https://images.bimakavach.com/v4/homepage/Savings_Img.webp"
    }
];

const NewWay = () => {
    const [activeSection, setActiveSection] = useState(1);

    return (
        <div className="w-full mt-16 bg-gray-50 p-6">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8" style={{ minHeight: '150vh' }}>
                {/* Left Sticky Part */}
                <div className="sticky top-20 h-screen flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4 text-left">The <span className="text-yellow-500">New Way</span> of Business Insurance</h2>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src="https://images.bimakavach.com/v4/homepage/BI_ProcessImg.webp" alt="Business Insurance Process" className="w-[500px] h-auto object-contain rounded-lg" />
                    </motion.div>
                </div>

                {/* Right Scrolling Part */}
                <div className="relative">
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10">
                        <motion.img 
                            key={activeSection}
                            src={sections.find(s => s.id === activeSection)?.image}
                            alt={sections.find(s => s.id === activeSection)?.title}
                            className="w-48 h-auto object-cover rounded-lg shadow-lg"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <div className="space-y-[50vh]">
                        {sections.map((section) => (
                            <motion.div
                                key={section.id}
                                className="h-screen flex items-center"
                                onViewportEnter={() => setActiveSection(section.id)}
                            >
                                <div className="max-w-md p-4 rounded-lg transition-colors duration-300" style={{ backgroundColor: activeSection === section.id ? '#EBF8FF' : 'transparent' }}>
                                    <div className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer`}>
                                        <span className={`font-semibold text-lg ${activeSection === section.id ? 'text-blue-600' : 'text-gray-400'}`}>{section.id}</span>
                                        <span className={`font-bold text-xl ${activeSection === section.id ? 'text-yellow-500' : 'text-blue-900'}`}>{section.title}</span>
                                        <span className={`text-sm ${activeSection === section.id ? 'text-gray-700' : 'text-gray-500'}`}>{section.subtitle}</span>
                                    </div>
                                    {activeSection === section.id && (
                                        <motion.div 
                                            className="pl-10 pt-2"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.5 }}
                                        >
                                            <p className="text-gray-600">{section.description}</p>
                                            <motion.button
                                                className="mt-3 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Learn More
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewWay;
