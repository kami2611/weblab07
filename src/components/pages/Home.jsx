import React from 'react'
import HeroSection from '../views/HeroSection'
import Featured from '../views/Featured'
import Faqs from '../views/Faqs'
import './Home.css'

export default function Home() {
  return (
    <div className="home-container">
      <HeroSection />
      <Featured />
      <Faqs />
    </div>
  )
}
