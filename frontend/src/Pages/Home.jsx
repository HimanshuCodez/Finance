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

const Home = () => {
  const [isInsuranceMenuOpen, setIsInsuranceMenuOpen] = useState(false);

  return (
    <div>
      <Navbar isInsuranceMenuOpen={isInsuranceMenuOpen} setIsInsuranceMenuOpen={setIsInsuranceMenuOpen} />
      <HeroSection onOpenInsuranceMenu={() => setIsInsuranceMenuOpen(true)} />
      <CertificateSection/>
      <TestimonialCompanies/>
      <TestimonialBoxes/>
      <NewWay/>
      <div className='mt-9'><DigitalInsurance/></div>
      <BimaSalaah/>
      <ApplyForm/>
      <Faq/>
      <WhyChooseUs/>
      <Coverage/>
      <ReadyToBuy/>
      <Footer/>
      </div>
  )
}

export default Home