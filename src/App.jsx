import { Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Sidebar from './components/layouts/Sidebar'
import Home from './components/pages/Home'
import Hbout from './components/pages/Hbout'
import Contact from './components/pages/Contact'
import PageNotFound from './components/pages/PageNotFound'
function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="app-layout">
        <aside className="app-sidebar">
          <Sidebar />
        </aside>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Hbout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default App
