import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InsuranceLanding from './Pages/Home';
import Personal from './Pages/Personal';
import Corporate from './Pages/Corporate';
import ContactUs from "./Pages/Contact";

import SocialHandles from "./Components/SocialHandles";

function App() {
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

  return (
    <Router>
      <SocialHandles />
      <Routes>
        <Route path="/" element={<InsuranceLanding />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/personal" element={<Personal personalInsurance={personalInsurance} />} />
        <Route path="/corporate" element={<Corporate corporateInsurance={corporateInsurance} />} />
      </Routes>
    </Router>
  );
}

export default App;
