import React, { useState } from 'react'
import HeroSection from '../Components/HeroSection'
import Navbar from '../Components/Navbar'
import CertificateSection from '../Components/Licenses'
import TestimonialCompanies from '../Components/Companies'

import TestimonialBoxes from '../Components/CustomerMarquee'
import NewWay from '../Components/NewWay'
import DigitalInsurance from '../Components/Experince'
import Footer from '../Components/Footer'
import ReadyToBuy from '../Components/ReadyToBuy'
import Faq from '../Components/Faq'
import BimaSalaah from '../Components/BimaSalaah'
import ApplyForm from '../Components/ApplyForm'
import WhyChooseUs from '../Components/WhyChoose'
import Coverage from '../Components/Coverage'
import JoinningUs from '../Components/JoinningUs'

const Home = () => {
  const [isInsuranceMenuOpen, setIsInsuranceMenuOpen] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false); // New state for ApplyForm

  const handleCloseApplyForm = () => { // New function to close ApplyForm
    setShowApplyForm(false);
  };

  return (
    <div>
      <Navbar isInsuranceMenuOpen={isInsuranceMenuOpen} setIsInsuranceMenuOpen={setIsInsuranceMenuOpen} />
      <HeroSection onOpenInsuranceMenu={() => setIsInsuranceMenuOpen(true)} />
      {showApplyForm && <ApplyForm onClose={handleCloseApplyForm} />} {/* Conditionally render ApplyForm */}
      <JoinningUs/>
      <CertificateSection/>
      <TestimonialBoxes/>
      <TestimonialCompanies/>
      <Coverage/>
      {/* <NewWay/> */}
      {/* <div className='mt-9'><DigitalInsurance/></div> */}
      {/* <BimaSalaah/> */}
      {/* <Faq/> */}
      <WhyChooseUs/>
      
      <ReadyToBuy/>
      {/* <Footer/> */}
      </div>
  )
}

export default Home