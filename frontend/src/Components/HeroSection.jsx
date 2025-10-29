import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Star, ArrowRight, ArrowLeft } from "lucide-react";

const personalInsurance = {
  "HEALTH INSURANCE": ["Health Insurance", "Cancer Insurance", "Critical Insurance", "Family Health Insurance", "OPD Health Insurance", "Personal Accident Insurance"],
  "Term Life Insurance": ["Term Paln normal", "Term Plan with Return of Premium (ROP)", "Term plan (women)", "Term Plan (Self employed)"],
  "Motor Insurance": ["Two-Wheeler insurance", "Private Car Insurance", "New Private Car Insurance", "Commercial Vehicle Insurance", "Taxi Insurance", "Bus Insurance"],
  "Other Personal Insurance": ["Travel Insurance", "Home Insurance", "Pet Insurance", "Personal Cyber Insurance"]
};

const corporateInsurance = {
    "INVESTMENT PLANS": ["LIC Plans", "Retirement Plans", "Child Saving's Plan", "Guranteed Return Plan", "Pension Plan", "ULIPS", "Tax Saving's Plan"],
    "Marine Insurance": ["Marine Open Policy", "Marine Specific Policy"],
    "Property Insurance": ["Fire and Bulgary Insurance", "Office Insurance", "Shop Insurance", "Home Insurance", "Factory Insurance"],
    "SME INSURANCE": ["Employee Group Health (GHI)", "Employee Group Personal Accident (GPA)", "Employee Group Term Plan"],
    "ENGINEERING": ["Contrator All Risk", "Contractor Plant & Machinery", "Worksmen Compensation"],
    "LIABILITY": ["PI policy For Doctors", "PI policy For Companies", "General Liability", "Cyber Risk Insurance", "Office Liability"]
};

const Card = ({ title, image, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    className="bg-white rounded-xl shadow-sm border p-4 flex flex-col items-center text-center gap-3 hover:shadow-md transition cursor-pointer"
  >
    <img
      src={image}
      alt={title}
      className="h-16 w-16 object-contain"
    />
    <h3 className="font-semibold text-[#0E1633] text-sm md:text-base">
      {title}
    </h3>
    <div className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
      <Zap size={14} /> Immediate Purchase
    </div>
  </motion.div>
);

export default function HeroSection({ onOpenInsuranceMenu }) {
  const [currentView, setCurrentView] = useState('initial');

  const initialCards = [
    { title: "Personal Insurance", image: "https://images.bimakavach.com/products/GeneralLiabilityInsuranceIcon.webp", view: 'personal' },
    { title: "Corporate Insurance", image: "https://images.bimakavach.com/products/DirectorsAndOfficersInsuranceIcon.webp", view: 'corporate' },
  ];

  const personalCards = Object.keys(personalInsurance).map(title => ({
    title,
    image: "https://images.bimakavach.com/products/GeneralLiabilityInsuranceIcon.webp"
  }));

  const corporateCards = Object.keys(corporateInsurance).map(title => ({
    title,
    image: "https://images.bimakavach.com/products/DirectorsAndOfficersInsuranceIcon.webp"
  }));

  let cardsToShow = [];
  if (currentView === 'initial') {
    cardsToShow = initialCards;
  } else if (currentView === 'personal') {
    cardsToShow = personalCards;
  } else if (currentView === 'corporate') {
    cardsToShow = corporateCards;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12 md:pt-12 md:pb-20">
      {/* ---------------- Content ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 flex flex-col items-center text-center"
      >
       

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl italic font-bold text-blue-500 leading-tight font-serif">
         Welcome to Our World
        </h1>

        {/* Subheading */}
        <p className="text-gray-500 text-lg">
         We offer Tailored Solutions to Meet Your Tailored Needs.
        </p>


        {/* View Products Button */}
        <button 
          onClick={onOpenInsuranceMenu}
          className="mt-6 border-2 border-[#E1E6EF] text-blue-700 rounded-xl px-6 py-3 flex items-center gap-2 font-medium  hover:bg-[#F5F8FC] transition"
        >
          View All Products
          <ArrowRight size={18} />
        </button>
         <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {currentView !== 'initial' && (
          <button 
            onClick={() => setCurrentView('initial')} 
            className="mb-4 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        )}
        <div className="grid grid-cols-1 gap-4">
          {cardsToShow.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              image={card.image}
              onClick={() => card.view && setCurrentView(card.view)}
            />
          ))}
        </div>
      </motion.div>
      </motion.div>
    </div>
  );
}

