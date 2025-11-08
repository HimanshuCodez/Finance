import React, { useState } from 'react';
import ApplyForm from '../Components/ApplyForm';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Personal({ personalInsurance }) {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [isInsuranceMenuOpen, setIsInsuranceMenuOpen] = useState(false);

  const handlePlanClick = () => {
    setShowApplyForm(true);
  };

  const handleCloseForm = () => {
    setShowApplyForm(false);
  };

  const handleApplyNowClick = () => {
    setShowApplyForm(true);
  };

  const personalInsuranceOptions = [
    "HEALTH INSURANCE",
    "Term Life Insurance",
    "Motor Insurance",
    "Other Personal Insurance",
  ];

  return (
    <> <Navbar isInsuranceMenuOpen={isInsuranceMenuOpen} setIsInsuranceMenuOpen={setIsInsuranceMenuOpen} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Personal Insurance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(personalInsurance).map(([category, items]) => (
          <div key={category} className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-blue-500">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">{category}</h2>
            <ul className="space-y-2">
              {items.map(item => (
                <li
                  key={item}
                  className="text-gray-700 hover:text-yellow-600 transition-colors duration-200 cursor-pointer"
                  onClick={handlePlanClick}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleApplyNowClick}
          className="bg-blue-500 text-white font-medium rounded-md py-3 px-8 hover:bg-blue-600 transition"
        >
          Apply Now
        </button>
      </div>
      {showApplyForm && (
        <ApplyForm
          onClose={handleCloseForm}
          insuranceOptions={personalInsuranceOptions}
        />
      )}
    </div>
    <Footer/>
     </>
  );
}
