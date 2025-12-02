import React from 'react'
import Button from '../commons/reusables/Button'
import './Featured.css'

const sampleBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
]

export default function Featured() {
  return (
    <section className="featured-section">
      <h3 className="featured-title">Featured Books</h3>
      <div className="featured-grid">
        {sampleBooks.map((b) => (
          <div key={b.id} className="book-card">
            <h4 className="book-title">{b.title}</h4>
            <div className="book-author">by {b.author}</div>
            <div className="book-footer">
              <div className="book-status">Available</div>
              <Button onClick={() => alert('Rent flow — demo only')}>Rent</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
