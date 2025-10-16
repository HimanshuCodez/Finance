import React from 'react'
import HeroSection from '../Components/HeroSection'
import Navbar from '../Components/Navbar'
import CertificateSection from '../Components/Licenses'
import TestimonialCompanies from '../Components/Companies'

import TestimonialBoxes from '../Components/CustomerMarquee'
import NewWay from '../Components/NewWay'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CertificateSection/>
      <TestimonialCompanies/>
      <TestimonialBoxes/>
      <NewWay/></div>
  )
}

export default Home