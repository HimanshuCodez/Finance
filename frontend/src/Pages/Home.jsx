import React from 'react'
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

const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CertificateSection/>
      <TestimonialCompanies/>
      <TestimonialBoxes/>
      <NewWay/>
      <div className='mt-9'><DigitalInsurance/></div>
      <BimaSalaah/>
      <Faq/>
      <ReadyToBuy/>
      <Footer/>
      </div>
  )
}

export default Home