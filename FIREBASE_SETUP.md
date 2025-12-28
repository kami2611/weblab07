# Firebase Authentication Setup Guide

## ⚠️ IMPORTANT: Enable Authentication Methods

To fix the "operation not allowed" error, you need to enable authentication methods in Firebase Console.

### Steps to Enable Email/Password Authentication:

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: `myfirebaselab-d7dcd`

2. **Navigate to Authentication**
   - Click "Authentication" in the left sidebar
   - Click on the "Sign-in method" tab

3. **Enable Email/Password**
   - Find "Email/Password" in the list of providers
   - Click on it
   - Toggle "Enable" to ON
   - Click "Save"

4. **Enable Google Sign-In (Optional)**
   - Find "Google" in the list of providers
   - Click on it
   - Toggle "Enable" to ON
   - Select a support email from the dropdown
   - Click "Save"

### Steps to Enable Firestore Database:

1. **Go to Firestore Database**
   - Click "Firestore Database" in the left sidebar
   - Click "Create database"

2. **Choose Mode**
   - Select "Start in test mode" for development
   - Click "Next"

3. **Choose Location**
   - Select your preferred location (closest to your users)
   - Click "Enable"

### Security Rules (After Testing):

For production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Other collections - adjust as needed
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Current Firebase Configuration

Your project is configured with:
- **Project ID**: myfirebaselab-d7dcd
- **API Key**: AIzaSyCIcwoCLd3mvw8qNL1BB4RKCbsrg2ZhkWw
- **Auth Domain**: myfirebaselab-d7dcd.firebaseapp.com

## Testing Authentication

After enabling authentication methods:

1. **Test Email/Password Sign Up**
   - Navigate to `/signup` in your app
   - Fill in the form and click "Sign Up"
   - Should successfully create an account

2. **Test Google Sign-In**
   - Click "Sign in with Google" button
   - Select your Google account
   - Should successfully sign in

3. **Verify in Firebase Console**
   - Go to Authentication > Users
   - You should see your newly created users

## Common Issues

### "operation-not-allowed" Error
- **Cause**: Authentication method not enabled
- **Fix**: Follow steps above to enable Email/Password and/or Google Sign-In

### "unauthorized-domain" Error
- **Cause**: Your domain is not authorized
- **Fix**: Go to Authentication > Settings > Authorized domains
- Add your domain (e.g., `localhost` for development)

### Network Errors
- **Cause**: Firewall or network issues
- **Fix**: Check your internet connection and firewall settings

## Need Help?

If you continue to experience issues:
1. Check the browser console for detailed error messages
2. Verify all Firebase configuration values in `.env` file
3. Ensure you're using the correct Firebase project
4. Check Firebase Console for any quota or billing issues
