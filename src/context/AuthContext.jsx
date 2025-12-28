// Authentication Context Provider
// Manages authentication state across the application

import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import { 
  signUpWithEmail, 
  signInWithEmail, 
  signInWithGoogle, 
  signOutUser, 
  resetPassword, 
  deleteAccount 
} from '../firebase/authService'
import { storeUserData, getUserData } from '../firebase/userService'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      
      if (user) {
        // Fetch user data from Firestore
        const result = await getUserData(user.uid)
        if (result.success) {
          setUserData(result.userData)
        }
      } else {
        setUserData(null)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Sign up with email and password
  const signup = async (email, password, displayName = '') => {
    try {
      setError(null)
      const result = await signUpWithEmail(email, password, displayName)
      
      if (result.success && result.user) {
        // Store user data in Firestore
        await storeUserData(result.user, { displayName })
      }
      
      return result
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    }
  }

  // Sign in with email and password
  const login = async (email, password) => {
    try {
      setError(null)
      const result = await signInWithEmail(email, password)
      
      if (result.success && result.user) {
        // Update last login in Firestore
        await storeUserData(result.user)
      }
      
      return result
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    }
  }

  // Sign in with Google
  const loginWithGoogle = async () => {
    try {
      setError(null)
      const result = await signInWithGoogle()
      
      if (result.success && result.user) {
        // Store user data in Firestore (won't duplicate)
        await storeUserData(result.user)
      }
      
      return result
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    }
  }

  // Sign out
  const logout = async () => {
    try {
      setError(null)
      const result = await signOutUser()
      return result
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    }
  }

  // Reset password
  const forgotPassword = async (email) => {
    try {
      setError(null)
      const result = await resetPassword(email)
      return result
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    }
  }

  // Delete account
  const removeAccount = async () => {
    try {
      setError(null)
      const result = await deleteAccount()
      return result
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    }
  }

  const value = {
    currentUser,
    userData,
    loading,
    error,
    signup,
    login,
    loginWithGoogle,
    logout,
    forgotPassword,
    removeAccount
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext
