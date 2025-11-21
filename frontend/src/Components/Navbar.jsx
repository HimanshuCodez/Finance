import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApplyForm from "./ApplyForm";

export default function Navbar({ isInsuranceMenuOpen, setIsInsuranceMenuOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [showBuyForm, setShowBuyForm] = useState(false);

  const inquiryOptions = ["Personal", "Corporate"];

  useEffect(() => {
    if (showBuyForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showBuyForm]);

  const toggleSection = (section) => {
    setOpenSections(prev => ({...prev, [section]: !prev[section]}));
  }

  const handleBuyClick = () => {
    setShowBuyForm(true);
  };

  const handleCloseForm = () => {
    setShowBuyForm(false);
  };

  const personalInsurance = {
    "HEALTH INSURANCE": ["Health Insurance", "Cancer Insurance", "Critical Insurance", "Family Health Insurance", "OPD Health Insurance", "Personal Accident Insurance"],
    "Term Life Insurance": ["Term Plan normal", "Term Plan with Return of Premium (ROP)", "Term plan (women)", "Term Plan (Self employed)"],
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

  return (
    <>
      <header className="relative bg-white z-20 border-b-2 border-blue-500">
        {/* Navbar content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <Link to={"/"}>
              <div className="flex-shrink-0">
                <span className="text-2xl italic font-bold text-[#0B2B57]">
                  SmrFinserv
                </span>
              </div>
            </Link>

            {/* Center: Menu (hidden on small screens) */}
            <div className="hidden md:block">
              <nav className="ml-10 flex items-baseline space-x-4">
                <Link
                  to={"/"}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Home
                </Link>
                <div
                  className="relative"
                  onMouseEnter={() => setIsInsuranceMenuOpen(true)}
                  onMouseLeave={() => setIsInsuranceMenuOpen(false)}
                >
                  <div className="flex items-center gap-1 cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <span>My Products</span>
                    <svg
                      className="w-4 h-4 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {isInsuranceMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 top-16 bg-black bg-opacity-25"
                        onMouseEnter={() => setIsInsuranceMenuOpen(false)}
                      />
                      <div className="absolute top-full pt-2 z-10 w-max">
                        <div className="bg-white shadow-lg ring-1 ring-gray-900/5">
                          <div className="grid grid-cols-2 gap-x-8 p-8">
                            {/* Personal Insurance */}
                            <div>
                              <Link
                                to="/personal"
                                className="text-base font-semibold text-[#0B2B57] hover:underline"
                              >
                                Personal Insurance
                              </Link>
                            </div>
                            {/* Corporate Insurance */}
                            <div>
                              <Link
                                to="/corporate"
                                className="text-base font-semibold text-[#0B2B57] hover:underline"
                              >
                                Corporate Insurance
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <Link
                  to={"/contact"}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Contact Us
                </Link>
              </nav>
            </div>

            {/* Right: Buttons */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <a href="tel:9971418462" className="ml-3 flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white text-sm font-semibold hover:bg-blue-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.12.35.03.75-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Call Us
                </a>
                <a href="https://wa.me/9971418462" className="ml-3 flex items-center gap-2 px-4 py-2 rounded-md bg-[#09A858] text-white text-sm font-semibold hover:bg-green-700">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M16.98 14.58c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.84 1.05-.15.18-.31.2-.58.07-.27-.14-1.14-.42-2.18-1.34-.8-.71-1.34-1.58-1.5-1.85-.15-.27-.02-.42.11-.55.11-.11.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.6-1.45-.82-1.98-.21-.51-.43-.44-.6-.45-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.94 2.96 4.71 4.15.66.29 1.18.46 1.58.59.66.21 1.26.18 1.73.11.53-.08 1.58-.65 1.81-1.27.22-.62.22-1.15.15-1.27-.07-.11-.25-.18-.52-.32z" />
                  </svg>
                  For claim and support:
                </a>
                <div className="flex ml-10 justify-center">
                  <button
                    type="button" // Changed to type="button" to prevent form submission
                    onClick={handleBuyClick}
                    className="bg-blue-600 text-white font-medium rounded-md py-3 px-12 hover:bg-yellow-400 hover:text-black transition"
                  >
                    Buy Policy
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div>
                <Link
                  to="/personal"
                  className="w-full flex justify-between items-center text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                >
                  <span>Personal Insurance</span>
                </Link>
              </div>
              <div>
                <Link
                  to="/corporate"
                  className="w-full flex justify-between items-center text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                >
                  <span>Corporate Insurance</span>
                </Link>
              </div>

              <Link
                to={"/contact"}
                className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact Us
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="mt-3 px-5 space-y-2"> {/* Added space-y-2 for vertical spacing */}
                <a href="tel:9971418462" className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.12.35.03.75-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Call Us
                </a>
                <a href="https://wa.me/9971418462" className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-[#09A858] text-white font-semibold hover:bg-green-700">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M16.98 14.58c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.84 1.05-.15.18-.31.2-.58.07-.27-.14-1.14-.42-2.18-1.34-.8-.71-1.34-1.58-1.5-1.85-.15-.27-.02-.42.11-.55.11-.11.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.6-1.45-.82-1.98-.21-.51-.43-.44-.6-.45-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.94 2.96 4.71 4.15.66.29 1.18.46 1.58.59.66.21 1.26.18 1.73.11.53-.08 1.58-.65 1.81-1.27.22-.62.22-1.15.15-1.27-.07-.11-.25-.18-.52-.32z" />
                  </svg>
                  For claim and support:
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Blue band with gradient and wave bottom */}
      </header>
      {showBuyForm && (
        <ApplyForm
          onClose={handleCloseForm}
          formTitle="Buy Insurance"
          subject="New Insurance Inquiry"
          insuranceOptions={inquiryOptions}
        />
      )}
    </>
  );
}