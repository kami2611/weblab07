import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import HeroSection from '../views/HeroSection'
import Featured from '../views/Featured'
import Faqs from '../views/Faqs'
import Counter from '../commons/reusables/Counter'
import './Home.css'

export default function Home() {
  const { currentUser } = useAuth()

  return (
    <div className="home-container">
      <HeroSection />
      
      {!currentUser && (
        <div className="auth-banner">
          <h3>Join BookRent Today!</h3>
          <p>Create an account to start renting books and manage your collection.</p>
          <div className="auth-banner-buttons">
            <Link to="/signup" className="auth-banner-btn primary">
              Sign Up Now
            </Link>
            <Link to="/login" className="auth-banner-btn secondary">
              Already have an account? Login
            </Link>
          </div>
        </div>
      )}
      
      {currentUser && (
        <div className="welcome-banner">
          <h3>Welcome back, {currentUser.displayName || 'User'}! 👋</h3>
          <p>Ready to explore our book collection?</p>
          <Link to="/items" className="auth-banner-btn primary">
            Browse Books
          </Link>
        </div>
      )}
      
      <Counter />
      <Featured />
      <Faqs />
    </div>
  )
}
