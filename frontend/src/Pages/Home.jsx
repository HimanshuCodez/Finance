import React from 'react'
import HeroSection from '../Components/HeroSection'
import Navbar from '../Components/Navbar'
import CertificateSection from '../Components/Licenses'
import TestimonialCompanies from '../Components/Companies'

import TestimonialBoxes from '../Components/CustomerMarquee'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CertificateSection/>
      <TestimonialCompanies/>
      <TestimonialBoxes/></div>
  )
}

export default Home