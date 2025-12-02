import React from 'react'
import './Modal.css'

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button onClick={onClose} className="modal-close">Close</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
