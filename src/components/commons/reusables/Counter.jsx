import { useState } from 'react'
import './Counter.css'

function Counter() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1)
  }

  return (
    <div className="counter-container">
      <div className="counter-display">
        <span className="counter-value">{count}</span>
      </div>
      <button onClick={handleIncrement} className="counter-button">
        Click to Add +1
      </button>
    </div>
  )
}

export default Counter
