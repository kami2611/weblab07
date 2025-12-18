import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-logo">BookRent</div>
          <span className="navbar-tagline">Rent books easily</span>
        </div>

        <nav className="navbar-nav">
          <NavLink to="/" end className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            Contact
          </NavLink>
          <NavLink to="/items" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            View Items
          </NavLink>
          <NavLink to="/create-item" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            Create Item
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
