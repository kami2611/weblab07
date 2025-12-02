import React from 'react'
import Button from '../commons/reusables/Button'
import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Rent Books — Fast & Easy</h1>
        <p className="hero-description">
          Discover and rent books from a curated collection. Try the demo and explore featured titles.
        </p>
        <div className="hero-actions">
          <Button onClick={() => alert('Explore clicked — demo only')}>Explore Books</Button>
        </div>
      </div>
    </section>
  )
}
