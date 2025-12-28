// Firebase Authentication Service
// Provides all authentication functionalities

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  deleteUser,
  updateProfile
} from 'firebase/auth'
import { auth } from './config'

// Email & Password Sign Up
export const signUpWithEmail = async (email, password, displayName = '') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Update profile with display name if provided
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName })
    }
    
    return {
      success: true,
      user: userCredential.user,
      message: 'Account created successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: getErrorMessage(error.code)
    }
  }
}

// Email & Password Sign In
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return {
      success: true,
      user: userCredential.user,
      message: 'Signed in successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: getErrorMessage(error.code)
    }
  }
}

// Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    return {
      success: true,
      user: userCredential.user,
      isNewUser: userCredential._tokenResponse?.isNewUser || false,
      message: 'Signed in with Google successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: getErrorMessage(error.code)
    }
  }
}

// Sign Out
export const signOutUser = async () => {
  try {
    await signOut(auth)
    return {
      success: true,
      message: 'Signed out successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: getErrorMessage(error.code)
    }
  }
}

// Reset Password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return {
      success: true,
      message: 'Password reset email sent successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: getErrorMessage(error.code)
    }
  }
}

// Delete Account
export const deleteAccount = async () => {
  try {
    const user = auth.currentUser
    if (!user) {
      return {
        success: false,
        message: 'No user is currently signed in'
      }
    }
    
    await deleteUser(user)
    return {
      success: true,
      message: 'Account deleted successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: getErrorMessage(error.code)
    }
  }
}

// Get Current User
export const getCurrentUser = () => {
  return auth.currentUser
}

// Helper function to convert error codes to user-friendly messages
const getErrorMessage = (errorCode) => {
  const errorMessages = {
    'auth/email-already-in-use': 'This email is already registered',
    'auth/invalid-email': 'Invalid email address',
    'auth/operation-not-allowed': 'Email/Password authentication is not enabled. Please enable it in Firebase Console: Authentication > Sign-in method > Email/Password',
    'auth/weak-password': 'Password is too weak. Use at least 6 characters',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/too-many-requests': 'Too many attempts. Please try again later',
    'auth/popup-closed-by-user': 'Sign-in popup was closed',
    'auth/cancelled-popup-request': 'Only one popup request is allowed at a time',
    'auth/requires-recent-login': 'Please sign in again to delete your account',
    'auth/network-request-failed': 'Network error. Please check your connection',
    'auth/configuration-not-found': 'Firebase configuration issue. Please check your setup',
    'auth/invalid-api-key': 'Invalid Firebase API key. Please check your configuration'
  }
  
  return errorMessages[errorCode] || 'An error occurred. Please try again'
}

export default {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOutUser,
  resetPassword,
  deleteAccount,
  getCurrentUser
}
