// Firestore User Management Service
// Handles storing and retrieving user data from Firestore

import { doc, setDoc, getDoc, serverTimestamp, collection, getDocs } from 'firebase/firestore'
import { db } from './config'

// Store user data in Firestore
// Prevents duplicate records by using user UID as document ID
export const storeUserData = async (user, additionalData = {}) => {
  try {
    if (!user || !user.uid) {
      return {
        success: false,
        message: 'Invalid user data'
      }
    }

    const userRef = doc(db, 'users', user.uid)
    
    // Check if user already exists
    const userSnap = await getDoc(userRef)
    
    if (userSnap.exists()) {
      // User already exists, optionally update last login
      await setDoc(userRef, {
        lastLogin: serverTimestamp()
      }, { merge: true })
      
      return {
        success: true,
        isNewUser: false,
        message: 'User data updated',
        userData: userSnap.data()
      }
    }
    
    // Create new user document
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      ...additionalData
    }
    
    await setDoc(userRef, userData)
    
    return {
      success: true,
      isNewUser: true,
      message: 'User data stored successfully',
      userData
    }
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: 'Failed to store user data: ' + error.message
    }
  }
}

// Get user data from Firestore
export const getUserData = async (uid) => {
  try {
    if (!uid) {
      return {
        success: false,
        message: 'User ID is required'
      }
    }

    const userRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userRef)
    
    if (userSnap.exists()) {
      return {
        success: true,
        userData: userSnap.data()
      }
    } else {
      return {
        success: false,
        message: 'User not found'
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: 'Failed to retrieve user data: ' + error.message
    }
  }
}

// Update user data in Firestore
export const updateUserData = async (uid, updates) => {
  try {
    if (!uid) {
      return {
        success: false,
        message: 'User ID is required'
      }
    }

    const userRef = doc(db, 'users', uid)
    
    await setDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp()
    }, { merge: true })
    
    return {
      success: true,
      message: 'User data updated successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: 'Failed to update user data: ' + error.message
    }
  }
}

// Get all users
export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'))
    const users = []
    querySnapshot.forEach((doc) => {
      users.push(doc.data())
    })
    return {
      success: true,
      users
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

export default {
  storeUserData,
  getUserData,
  updateUserData,
  getAllUsers
}
