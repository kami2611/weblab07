import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

const Profile = () => {
  const { currentUser, userData, logout, removeAccount } = useAuth()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      setLoading(true)
      setError('')
      const result = await logout()
      
      if (result.success) {
        navigate('/login')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Failed to log out')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      setLoading(true)
      setError('')
      setMessage('')
      
      const result = await removeAccount()
      
      if (result.success) {
        setMessage(result.message)
        setTimeout(() => navigate('/signup'), 2000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Failed to delete account')
    } finally {
      setLoading(false)
      setShowDeleteConfirm(false)
    }
  }

  if (!currentUser) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        
        <div className="profile-info">
          {currentUser.photoURL && (
            <img 
              src={currentUser.photoURL} 
              alt="Profile" 
              className="profile-image"
            />
          )}
          
          <div className="info-group">
            <label>Display Name:</label>
            <p>{currentUser.displayName || userData?.displayName || 'Not set'}</p>
          </div>
          
          <div className="info-group">
            <label>Email:</label>
            <p>{currentUser.email}</p>
          </div>
          
          <div className="info-group">
            <label>User ID:</label>
            <p className="user-id">{currentUser.uid}</p>
          </div>
          
          <div className="info-group">
            <label>Account Created:</label>
            <p>{userData?.createdAt ? new Date(userData.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
        
        <div className="profile-actions">
          <button 
            onClick={handleLogout}
            className="btn btn-secondary"
            disabled={loading}
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
          
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="btn btn-danger"
            disabled={loading}
          >
            Delete Account
          </button>
        </div>
        
        {showDeleteConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Delete Account</h3>
              <p>Are you sure you want to delete your account? This action cannot be undone.</p>
              <div className="modal-actions">
                <button 
                  onClick={handleDeleteAccount}
                  className="btn btn-danger"
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
