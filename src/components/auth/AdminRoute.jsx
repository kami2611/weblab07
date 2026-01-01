import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  // Check if user is logged in and has admin email
  if (!currentUser || currentUser.email !== 'admin@lab07app.com') {
    return <Navigate to="/" />
  }

  return children
}

export default AdminRoute
