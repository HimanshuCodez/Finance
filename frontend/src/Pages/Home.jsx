import React, { useState } from 'react'
import HeroSection from '../Components/HeroSection'
import Navbar from '../Components/Navbar'
import CertificateSection from '../Components/Licenses'
import TestimonialCompanies from '../Components/Companies'

import TestimonialBoxes from '../Components/CustomerMarquee'

import ReadyToBuy from '../Components/ReadyToBuy'

import ApplyForm from '../Components/ApplyForm'
import WhyChooseUs from '../Components/WhyChoose'
import Coverage from '../Components/Coverage'
import JoinningUs from '../Components/JoinningUs'

const Home = () => {
  const [isInsuranceMenuOpen, setIsInsuranceMenuOpen] = useState(false);
  // Removed showApplyForm state and handleCloseApplyForm function as ApplyForm will be always visible

  return (
    <div>
      <Navbar isInsuranceMenuOpen={isInsuranceMenuOpen} setIsInsuranceMenuOpen={setIsInsuranceMenuOpen} />
      <HeroSection onOpenInsuranceMenu={() => setIsInsuranceMenuOpen(true)} />
      
      <ApplyForm isModal={false} /> {/* Render ApplyForm unconditionally as non-modal */}
      
      
      <JoinningUs/>
            <TestimonialCompanies/>
      <CertificateSection/>
      <TestimonialBoxes/>

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