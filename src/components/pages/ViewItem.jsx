import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import './ViewItem.css'

function ViewItem() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch single item from Firestore using dynamic route parameter
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const docRef = doc(db, 'items', id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() })
        } else {
          setError('Item not found')
        }
      } catch (err) {
        console.error('Error fetching item:', err)
        setError('Failed to load item. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [id])

  // Delete item from Firestore
  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      return
    }

    try {
      await deleteDoc(doc(db, 'items', id))
      alert('Item deleted successfully!')
      navigate('/items')
    } catch (err) {
      console.error('Error deleting item:', err)
      alert('Failed to delete item. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="view-item-container">
        <div className="loading">Loading item...</div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="view-item-container">
        <div className="item-not-found">
          <h2>Item Not Found</h2>
          <p>The item with ID {id} does not exist.</p>
          <Link to="/items" className="back-btn">Back to All Items</Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="view-item-container">
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      
      <div className="item-details">
        <div className="item-header">
          <h1>{item.name}</h1>
          {item.category && <span className="item-category">{item.category}</span>}
        </div>
        
        <div className="item-info">
          <div className="info-row">
            <span className="info-label">Item ID:</span>
            <span className="info-value">#{item.id}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Description:</span>
            <span className="info-value">{item.description}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Price:</span>
            <span className="info-value price">${item.price}</span>
          </div>

          {item.createdAt && (
            <div className="info-row">
              <span className="info-label">Created:</span>
              <span className="info-value">{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        
        <div className="item-actions">
          <Link to={`/edit-item/${item.id}`} className="edit-btn">Edit Item</Link>
          <button onClick={handleDelete} className="delete-btn">Delete Item</button>
        </div>
      </div>
    </div>
  )
}

export default ViewItem
