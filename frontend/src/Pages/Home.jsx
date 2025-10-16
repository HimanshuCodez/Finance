import React from 'react'
import HeroSection from '../Components/HeroSection'
import Navbar from '../Components/Navbar'
import CertificateSection from '../Components/Licenses'
import TestimonialCompanies from '../Components/Companies'

import TestimonialBoxes from '../Components/CustomerMarquee'
import NewWay from '../Components/NewWay'
import DigitalInsurance from '../Components/Experince'
import Footer from '../Components/Footer'

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
      <Footer/>
      </div>
  )
}

export default Home