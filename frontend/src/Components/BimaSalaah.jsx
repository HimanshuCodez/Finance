import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FileText, Zap } from 'lucide-react';

const BimaSalaah = () => {
    return (
        <section className="bg-gray-50  py-16 sm:py-20">
            <div className="max-w-6xl  mx-auto bg-blue-800 rounded-xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1  md:grid-cols-2 gap-12 items-start">
                    {/* Left Image */}
                    <div className="md:sticky mt-4 top-20">
                        <img src="https://images.bimakavach.com/v4/homepage/BimaSalaah_Img.webp" alt="Bima Salaah" className="rounded-lg  w-full h-auto shadow-lg" />
                    </div>

                    {/* Right Content */}
                    <div>
                        <div className="mb-8 mt-4">
                            <h2 className="text-4xl font-bold text-white bold">Bima  <span className='italic text-yellow-400'>Salaah </span></h2>
                            <p className="mt-2 text-xl text-amber-400 font-semibold">Free AI-Powered Insurance Advice</p>
                        </div>
                        <div className="space-y-8">
                            <motion.div 
                                className="flex items-start"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                    <Briefcase size={24} />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold text-white">Understands Your Business</h3>
                                </div>
                            </motion.div>
                            <motion.div 
                                className="flex items-start"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                    <FileText size={24} />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold text-white">Suggests the Right Policies</h3>
                                </div>
                            </motion.div>
                            <motion.div 
                                className="flex items-start"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                    <Zap size={24} />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold text-white">Does It in Seconds & for Free</h3>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BimaSalaah;