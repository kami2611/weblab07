import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-logo">BookRent</div>
          <span className="navbar-tagline">Rent books easily and effortless</span>
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
          
          {currentUser ? (
            <>
              <NavLink to="/profile" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
                {currentUser.displayName || 'Profile'}
              </NavLink>
              <button onClick={handleLogout} className="navbar-link navbar-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
                Login
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => `navbar-link navbar-signup ${isActive ? 'active' : ''}`}>
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
