import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const personalInsurance = {
  "HEALTH INSURANCE": ["Health Insurance", "Cancer Insurance", "Critical Insurance", "Family Health Insurance", "OPD Health Insurance", "Personal Accident Insurance"],
  "Term Life Insurance": ["Term Plan Normal", "Term Plan with Return of Premium (ROP)", "Term Plan (Women)", "Term Plan (Self Employed)"],
  "Motor Insurance": ["Two-Wheeler Insurance", "Private Car Insurance", "New Private Car Insurance", "Commercial Vehicle Insurance", "Taxi Insurance", "Bus Insurance"],
  "Other Personal Insurance": ["Travel Insurance", "Home Insurance", "Pet Insurance", "Personal Cyber Insurance"]
};

const corporateInsurance = {
  "INVESTMENT PLANS": ["LIC Plans", "Retirement Plans", "Child Savings Plan", "Guaranteed Return Plan", "Pension Plan", "ULIPS", "Tax Savings Plan"],
  "Marine Insurance": ["Marine Open Policy", "Marine Specific Policy"],
  "Property Insurance": ["Fire and Burglary Insurance", "Office Insurance", "Shop Insurance", "Home Insurance", "Factory Insurance"],
  "SME INSURANCE": ["Employee Group Health (GHI)", "Employee Group Personal Accident (GPA)", "Employee Group Term Plan"],
  "ENGINEERING": ["Contractor All Risk", "Contractor Plant & Machinery", "Workmen Compensation"],
  "LIABILITY": ["PI Policy For Doctors", "PI Policy For Companies", "General Liability", "Cyber Risk Insurance", "Office Liability"]
};


// ---------- CARD COMPONENT ----------
const Card = ({ title, image, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    className="bg-white rounded-2xl shadow-md border p-6 flex flex-col items-center justify-between gap-4 hover:shadow-lg transition cursor-pointer h-64 w-full md:w-72"
  >
    <img
      src={image}
      alt={title}
      className="h-40 w-40 object-contain"
    />
    <h3 className="font-semibold text-[#0E1633] text-lg md:text-xl text-center">
      {title}
    </h3>
  </motion.div>
);


// ---------- MAIN HERO ----------
export default function HeroSection() {
  const [currentView, setCurrentView] = useState("initial");
  const navigate = useNavigate();
  const cardsRef = useRef(null);

  const initialCards = [
    { title: "Personal Insurance", image: "https://bhartiaxa.com/sites/default/files/2021-12/085-2021-11.jpg", view: "personal", path: "/personal" },
    { title: "Corporate Insurance", image: "https://d28wu8o6itv89t.cloudfront.net/images/corpinsurancejpg-1541404301893.jpeg", view: "corporate", path: "/corporate" }
  ];

  const personalCards = Object.keys(personalInsurance).map(title => ({
    title,
    image: "https://bhartiaxa.com/sites/default/files/2021-12/085-2021-11.jpg"
  }));

  const corporateCards = Object.keys(corporateInsurance).map(title => ({
    title,
    image: "https://d28wu8o6itv89t.cloudfront.net/images/corpinsurancejpg-1541404301893.jpeg"
  }));

  let cardsToShow = [];
  if (currentView === "initial") cardsToShow = initialCards;
  else if (currentView === "personal") cardsToShow = personalCards;
  else if (currentView === "corporate") cardsToShow = corporateCards;

  const handleViewAllProductsClick = () => {
    cardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F9FAFB] px-6 py-12">
  
   {/* Heading Section with Background Video */}
<div className="relative w-full flex items-center justify-center overflow-hidden py-20">
  {/* Background Video */}
  <video
    autoPlay
   
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-70"
  >
    <source src="./hand.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Content Section */}
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative z-10 text-center max-w-3xl space-y-6 px-4"
  >
    <h1 className="text-4xl sm:text-5xl font-bold italic text-blue-600 font-serif">
      Welcome to World of SMR FINSERV IMF
    </h1>
    <p className="text-white text-xl font-medium">
      We offer Tailored Solutions to Meet Your Tailored Needs.
    </p>

    <button
      onClick={handleViewAllProductsClick}
      className="mt-4 border-2 border-blue-400 text-white rounded-full px-8 py-3 flex items-center justify-center gap-2 font-medium hover:bg-blue-600/40 transition mx-auto backdrop-blur-sm"
    >
      View All Products
      <ArrowRight size={18} />
    </button>
  </motion.div>
</div>


      {/* Cards Section */}
      <motion.div
        ref={cardsRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 w-full max-w-6xl"
      >
        {currentView !== "initial" && (
          <button
            onClick={() => setCurrentView("initial")}
            className="mb-6 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        )}

        <div
          className={`grid ${
            currentView === "initial"
              ? "grid-cols-1 md:grid-cols-2 gap-8"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          }`}
        >
          {cardsToShow.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              image={card.image}
              onClick={() => {
                if (currentView === "initial" && card.path) {
                  navigate(card.path);
                } else if (card.view) {
                  setCurrentView(card.view);
                }
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
