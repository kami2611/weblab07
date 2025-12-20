import React from 'react'
import HeroSection from '../views/HeroSection'
import Featured from '../views/Featured'
import Faqs from '../views/Faqs'
import Counter from '../commons/reusables/Counter'
import './Home.css'

export default function Home() {
  return (
    <div className="home-container">
      <HeroSection />
      <Counter />
      <Featured />
      <Faqs />
    </div>
  )
}
