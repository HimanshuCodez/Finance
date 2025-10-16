import { motion } from "framer-motion";
import { Zap, Star, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12 md:pt-12 md:pb-20 grid md:grid-cols-2 gap-8 md:gap-12 items-start">
      {/* ---------------- Left Content ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Small Heading */}
        <div className="flex items-center gap-2 text-[#0E4DA4]">
          <Zap size={20} className="text-[#00C389]" />
          <span className="font-medium italic tracking-wide text-lg">
            Fast Insurance for
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl italic font-bold text-blue-700 leading-tight font-serif">
          Unstoppable Businesses
        </h1>

        {/* Subheading */}
        <p className="text-gray-500 text-lg">
          Get Quotes in Seconds. Get Coverage in Minutes.
        </p>

        {/* Stats Container */}
        <div className="mt-10 border border-yellow-400 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-around gap-4 w-full sm:w-fit bg-white shadow-sm">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0E1633]">20,000+</h2>
            <p className="text-gray-500 text-sm">Policies Sold</p>
          </div>
          <div className="w-full h-px sm:w-px sm:h-10 bg-yellow-300"></div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
                <h2 className="text-2xl font-bold text-[#0E1633]">4.8</h2>
                <Star className="text-yellow-400 fill-yellow-400" size={20} />
            </div>
            <p className="text-gray-500 text-sm">on Google</p>
          </div>
          <div className="w-full h-px sm:w-px sm:h-10 bg-yellow-300"></div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0E1633]">₹43,000+ Cr.</h2>
            <p className="text-gray-500 text-sm">Total Sum Insured</p>
          </div>
        </div>

        {/* View Products Button */}
        <button className="mt-6 border-2 border-[#E1E6EF] text-blue-700 rounded-xl px-6 py-3 flex items-center gap-2 font-medium  hover:bg-[#F5F8FC] transition">
          View All Products
          <ArrowRight size={18} />
        </button>
      </motion.div>

      {/* ---------------- Right Content (Insurance Cards) ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {[
          { title: "Workmen’s Compensation", image: "https://images.bimakavach.com/products/WorkmensCompensationIcon.webp" },
          { title: "Directors and Officers", image: "https://images.bimakavach.com/products/DirectorsAndOfficersInsuranceIcon.webp" },
          { title: "Professional Indemnity", image: "https://images.bimakavach.com/products/ProfessionalIndemnityInsuranceIcon.webp" },
          { title: "Cyber Insurance", image: "https://images.bimakavach.com/products/CyberInsuranceIcon.webp" },
          { title: "General Liability", image: "https://images.bimakavach.com/products/GeneralLiabilityInsuranceIcon.webp" },
          { title: "Product Liability", image: "https://images.bimakavach.com/products/ProductLiabilityInsuranceIcon.webp" },
          { title: "Fire Insurance", image: "https://images.bimakavach.com/products/FireInsuranceIcon.webp" },
          { title: "Contarctor's All Risks", image: "https://images.bimakavach.com/products/ContractorsAllRiskIcon.webp" },
          { title: "Erection All Risks", image: "https://images.bimakavach.com/products/ErectionAllRiskIcon.webp" },
        ].map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-sm border p-4 flex flex-col items-center text-center gap-3 hover:shadow-md transition"
          >
            <img
              src={card.image}
              alt={card.title}
              className="h-16 w-16 object-contain"
            />
            <h3 className="font-semibold text-[#0E1633] text-sm md:text-base">
              {card.title}
            </h3>
            <div className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Zap size={14} /> Immediate Purchase
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
