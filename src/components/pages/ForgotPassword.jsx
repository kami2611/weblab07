import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import './ForgotPassword.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  
  const { forgotPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email address')
      return
    }

    try {
      setError('')
      setMessage('')
      setLoading(true)
      
      const result = await forgotPassword(email)
      
      if (result.success) {
        setMessage(result.message)
        setEmail('')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Reset Password</h2>
        <p className="subtitle">Enter your email address and we'll send you a link to reset your password.</p>
        
        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
