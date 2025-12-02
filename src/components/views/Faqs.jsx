import React from 'react'
import './Faqs.css'

const faqs = [
  { q: 'How long can I rent a book?', a: 'Demo apps allow 7-day rentals by default.' },
  { q: 'Can I extend my rental?', a: 'Yes — contact support in a real app to extend.' },
  { q: 'Do you ship internationally?', a: 'This demo doesn\'t support shipping.' },
]

export default function Faqs() {
  return (
    <section className="faqs-section">
      <h3 className="faqs-title">FAQs</h3>
      <div className="faqs-list">
        {faqs.map((f, i) => (
          <div key={i} className="faq-item">
            <div className="faq-question">{f.q}</div>
            <div className="faq-answer">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
