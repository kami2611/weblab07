import { Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Sidebar from './components/layouts/Sidebar'
import Home from './components/pages/Home'
import Hbout from './components/pages/Hbout'
import Contact from './components/pages/Contact'
import CreateItem from './components/pages/CreateItem'
import ViewAllItems from './components/pages/ViewAllItems'
import ViewItem from './components/pages/ViewItem'
import EditItem from './components/pages/EditItem'
import PageNotFound from './components/pages/PageNotFound'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'
import ForgotPassword from './components/pages/ForgotPassword'
import Profile from './components/pages/Profile'
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
            <Route path="/create-item" element={<CreateItem />} />
            <Route path="/items" element={<ViewAllItems />} />
            <Route path="/item/:id" element={<ViewItem />} />
            <Route path="/edit-item/:id" element={<EditItem />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default App
