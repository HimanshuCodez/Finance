import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import Navbar from "../Components/Navbar";

const ContactUs = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-4 sm:mb-6 text-center leading-tight"
      >
        Contact <span className="text-blue-600">SmrFinserv</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-600 text-center max-w-2xl mb-8 sm:mb-10 px-2 text-sm sm:text-base"
      >
        We’re here to help you with all your insurance needs — whether it’s
        health, motor, or life insurance. Reach out anytime and we’ll get back
        to you as soon as possible.
      </motion.p>

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-6xl bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-6 sm:p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 border border-blue-100"
      >
        {/* Left Side - Info */}
        <div className="space-y-6 text-sm sm:text-base">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4">
            Get in Touch
          </h2>

          <div className="flex flex-col gap-3 text-gray-700">
            <div className="flex items-center gap-3">
              <Phone className="text-blue-600 w-5 h-5 flex-shrink-0" />
              <div>
                <p>+91 96434 34885</p>
                <p>+91 97119 71269</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-blue-600 w-5 h-5 flex-shrink-0" />
              <p className="break-all">support@smrfinserv.com</p>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-blue-600 w-5 h-5 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-blue-700">Address 1:</span>{" "}
                  A-304, Raj Hans Kutumb, Ahinsa Khand -1, Indirapuram,
                  Ghaziabad, Uttar Pradesh 201014
                </p>
                <p>
                  <span className="font-medium text-blue-700">Address 2:</span>{" "}
                  195-A, Nyay Khand -1, Ghaziabad, Uttar Pradesh 201014
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-blue-100 pt-5">
            <h3 className="text-lg font-medium text-blue-800">Office Hours</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Monday - Saturday: 9:00 AM – 7:00 PM <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 text-sm sm:text-base resize-none"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition text-sm sm:text-base"
          >
            <Send className="w-5 h-5" />
            Send Message
          </motion.button>
        </form>
      </motion.div>

      {/* Footer Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 text-gray-500 text-xs sm:text-sm text-center px-3"
      >
        © {new Date().getFullYear()} SmrFinserv — All Rights Reserved
      </motion.p>
    </div>
    </>
  );
};

export default ContactUs;
