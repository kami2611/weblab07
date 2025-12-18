import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import './EditItem.css'

function EditItem() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  })

  // Fetch existing item data to pre-fill the form
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const docRef = doc(db, 'items', id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const data = docSnap.data()
          setFormData({
            name: data.name || '',
            description: data.description || '',
            price: data.price || ''
          })
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Update item in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const docRef = doc(db, 'items', id)
      await updateDoc(docRef, {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        updatedAt: new Date().toISOString()
      })
      
      alert('Item updated successfully!')
      navigate(`/item/${id}`)
    } catch (err) {
      console.error('Error updating document:', err)
      setError('Failed to update item. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="edit-item-container">
        <div className="loading">Loading item...</div>
      </div>
    )
  }

  if (error && !formData.name) {
    return (
      <div className="edit-item-container">
        <div className="item-not-found">
          <h2>Item Not Found</h2>
          <p>The item with ID {id} does not exist.</p>
          <button onClick={() => navigate('/items')} className="back-btn">Back to All Items</button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="edit-item-container">
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      
      <h1>Edit Item</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form className="edit-item-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Item Name</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input 
            type="number" 
            id="price" 
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={saving}>
            {saving ? 'Updating...' : 'Update Item'}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditItem
