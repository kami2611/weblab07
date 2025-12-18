import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import './ViewAllItems.css'

function ViewAllItems() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all items from Firestore
  const fetchItems = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const querySnapshot = await getDocs(collection(db, 'items'))
      const itemsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setItems(itemsList)
    } catch (err) {
      console.error('Error fetching items:', err)
      setError('Failed to load items. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  // Delete an item from Firestore
  const handleDelete = async (id, itemName) => {
    if (!window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
      return
    }

    try {
      await deleteDoc(doc(db, 'items', id))
      // Update UI immediately after deletion
      setItems(prevItems => prevItems.filter(item => item.id !== id))
      alert('Item deleted successfully!')
    } catch (err) {
      console.error('Error deleting item:', err)
      alert('Failed to delete item. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="view-all-items-container">
        <div className="loading">Loading items...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="view-all-items-container">
        <div className="error-message">{error}</div>
        <button onClick={fetchItems} className="retry-btn">Retry</button>
      </div>
    )
  }

  return (
    <div className="view-all-items-container">
      <div className="items-header">
        <h1>All Items</h1>
        <Link to="/create-item" className="create-btn">Create New Item</Link>
      </div>
      
      {items.length === 0 ? (
        <div className="no-items">
          <p>No items found. Create your first item!</p>
          <Link to="/create-item" className="create-btn">Create Item</Link>
        </div>
      ) : (
        <div className="items-grid">
          {items.map(item => (
            <div key={item.id} className="item-card">
              <h3>{item.name}</h3>
              <p className="item-description">{item.description}</p>
              <p className="item-price">${item.price}</p>
              <div className="item-actions">
                <Link to={`/item/${item.id}`} className="view-btn">View Details</Link>
                <Link to={`/edit-item/${item.id}`} className="edit-btn">Edit</Link>
                <button 
                  onClick={() => handleDelete(item.id, item.name)} 
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewAllItems
