import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from '../../context/AuthContext'
import './CreateItem.css'

function CreateItem() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser, navigate])

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Add document to Firestore
      const docRef = await addDoc(collection(db, 'items'), {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        createdAt: new Date().toISOString(),
        userId: currentUser ? currentUser.uid : 'anonymous',
        userEmail: currentUser ? currentUser.email : 'anonymous'
      })
      
      alert('Item created successfully!')
      navigate(`/item/${docRef.id}`)
    } catch (err) {
      console.error('Error adding document:', err)
      setError(`Failed to create item: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-item-container">
      <h1>Create Item</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form className="create-item-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Item Name</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter item name"
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
            placeholder="Enter item description"
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
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Creating...' : 'Create Item'}
        </button>
      </form>
    </div>
  )
}

export default CreateItem
