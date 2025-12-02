import React, { useState } from 'react'
import InputField from '../commons/reusables/InputField'
import Button from '../commons/reusables/Button'
import './Contact.css'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // For demo purposes we just clear the form
    alert('Message sent — demo only')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="contact-container">
      <h2>Contact</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <InputField label="Name" value={name} onChange={setName} placeholder="Your name" />
        <InputField label="Email" value={email} onChange={setEmail} placeholder="you@example.com" />
        <div>
          <label className="input-label">Message</label>
          <textarea
            className="contact-textarea"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
          />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  )
}
