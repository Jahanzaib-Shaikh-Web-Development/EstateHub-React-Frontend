import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import BuyProperties from './pages/BuyProperties'
import RentProperties from './pages/RentProperties'
import SellProperty from './pages/SellProperty'
import PropertyListings from './pages/PropertyListings'
import PropertyDetails from './pages/PropertyDetails'
import SearchProperties from './pages/SearchProperties'
import Agents from './pages/Agents'
import AgentProfile from './pages/AgentProfile'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import FAQ from './pages/FAQ'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'

const AUTH = ['/register', '/login', '/forgot-password']

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  const isAuth = AUTH.includes(pathname)
  return (
    <>
      {!isAuth && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/buy" element={<BuyProperties />} />
          <Route path="/rent" element={<RentProperties />} />
          <Route path="/sell" element={<SellProperty />} />
          <Route path="/properties" element={<PropertyListings />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/search" element={<SearchProperties />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agent/:id" element={<AgentProfile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAuth && <Footer />}
    </>
  )
}
