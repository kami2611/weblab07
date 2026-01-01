import { useState, useEffect } from 'react'
import { getAllUsers } from '../../firebase/userService'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import Modal from '../commons/reusables/Modal'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userItems, setUserItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResult = await getAllUsers()
        if (usersResult.success) {
          setUsers(usersResult.users)
        } else {
          setError(usersResult.error)
        }

        const itemsSnapshot = await getDocs(collection(db, 'items'))
        const itemsList = []
        itemsSnapshot.forEach(doc => itemsList.push({ id: doc.id, ...doc.data() }))
        setItems(itemsList)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getUserItemCount = (uid) => {
    return items.filter(item => item.userId === uid).length
  }

  const handleViewItems = (user) => {
    const userSpecificItems = items.filter(item => item.userId === user.uid)
    setUserItems(userSpecificItems)
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, 'items', itemId))
        setItems(prev => prev.filter(item => item.id !== itemId))
        setUserItems(prev => prev.filter(item => item.id !== itemId))
      } catch (err) {
        alert('Failed to delete item: ' + err.message)
      }
    }
  }

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Display Name</th>
              <th>Items Added</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.uid}>
                <td>{user.email}</td>
                <td>{user.displayName || 'N/A'}</td>
                <td>{getUserItemCount(user.uid)}</td>
                <td>{user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <button 
                    className="view-items-btn"
                    onClick={() => handleViewItems(user)}
                  >
                    View Items
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={`Items by ${selectedUser?.displayName || selectedUser?.email}`}
      >
        <div className="user-items-list">
          {userItems.length === 0 ? (
            <p>No items found for this user.</p>
          ) : (
            <table className="items-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default AdminDashboard
