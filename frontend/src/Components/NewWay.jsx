import React, { useState } from 'react';
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
        image: "https://images.bimakavach.com/v4/homepage/Savings-14-july.webp"
    }
];

const NewWay = () => {
    const [activeSection, setActiveSection] = useState(1);

    return (
        <div className="w-full bg-gray-50 p-6">
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:min-h-[150vh]">
                {/* Left Part (Col 1) */}
                <div className="md:sticky  border-r-2 border-yellow-500 top-20 h-auto md:h-screen flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-blue-900 mt-16 mb-4 text-left">The <span className="text-yellow-500">New Way</span> of Business Insurance</h2>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src="https://images.bimakavach.com/v4/homepage/BI_ProcessImg.webp" alt="Business Insurance Process" className="w-full h-auto object-contain rounded-lg" />
                    </motion.div>
                </div>

                {/* Middle Scrolling Part (Col 2) */}
                <div className="flex justify-center">
                    <div className="space-y-16 md:space-y-[50vh] max-w-md">
                        {sections.map((section) => (
                            <motion.div
                                key={section.id}
                                className="h-auto md:h-screen flex flex-col md:flex-row items-center"
                                onViewportEnter={() => setActiveSection(section.id)}
                            >
                                <div className="w-full">
                                    {/* Image for mobile view */}
                                    <motion.img 
                                        src={section.image} 
                                        alt={section.title}
                                        className="w-48 h-auto object-cover rounded-lg shadow-lg mb-4 mx-auto md:hidden"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    />

                                    {/* Text content */}
                                    <div className="p-4 rounded-lg transition-colors duration-300 w-full" style={{ backgroundColor: activeSection === section.id ? '#EBF8FF' : 'transparent' }}>
                                        <div className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer`}>
                                            <span className={`font-semibold text-lg ${activeSection === section.id ? 'text-blue-600' : 'text-gray-400'}`}>{section.id}</span>
                                            <span className={`font-bold text-xl ${activeSection === section.id ? 'text-yellow-500' : 'text-blue-900'}`}>{section.title}</span>
                                            <span className={`text-sm ${activeSection === section.id ? 'text-gray-700' : 'text-gray-500'}`}>{section.subtitle}</span>
                                        </div>
                                        {/* On mobile, show description always. On desktop, only for active section. */}
                                        <div className="pl-10 pt-2 md:hidden">
                                            <p className="text-gray-600">{section.description}</p>
                                        </div>
                                        {activeSection === section.id && (
                                            <motion.div 
                                                className="pl-10 pt-2 hidden md:block"
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
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Sticky Part (Col 3) */}
                <div className="md:sticky top-20 h-auto md:h-screen md:flex flex-col justify-center hidden">
                    <motion.img 
                        key={activeSection}
                        src={sections.find(s => s.id === activeSection)?.image}
                        alt={sections.find(s => s.id === activeSection)?.title}
                        className="w-full h-auto object-contain rounded-lg shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewWay;
