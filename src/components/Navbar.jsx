import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaBars, FaTimes, FaHeart, FaUserCircle } from 'react-icons/fa'
import Logo from './Logo'
import { useApp } from '../context/AppContext'

const links = [
  ['/', 'Home'], ['/buy', 'Buy'], ['/rent', 'Rent'], ['/sell', 'Sell'],
  ['/properties', 'Listings'], ['/agents', 'Agents'], ['/blog', 'Blog'],
  ['/about', 'About'], ['/contact', 'Contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { favs, user, logout } = useApp()
  const close = () => setOpen(false)
  return (
    <header className="eh-nav sticky-top">
      <nav className="container d-flex align-items-center justify-content-between py-2">
        <Logo />
        <ul className={`nav-links list-unstyled mb-0 ${open ? 'open' : ''}`}>
          {links.map(([to, label]) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} onClick={close} className={({ isActive }) => (isActive ? 'active' : '')}>{label}</NavLink>
            </li>
          ))}
          <li className="d-xl-none"><NavLink to="/search" onClick={close}>Advanced Search</NavLink></li>
          <li className="d-xl-none"><NavLink to="/faq" onClick={close}>FAQ</NavLink></li>
          {user ? (
            <li className="d-xl-none">
              <button
                type="button"
                className="btn btn-gold btn-sm w-100 mt-2"
                onClick={() => { logout(); close() }}
              >
                <FaUserCircle /> {user.name.split(' ')[0]} · Logout
              </button>
            </li>
          ) : (
            <li className="d-xl-none mt-2">
              <Link to="/login" className="btn btn-gold btn-sm w-100" onClick={close}>Sign In</Link>
            </li>
          )}
        </ul>
        <div className="d-flex align-items-center gap-2">
          <Link to="/properties?fav=1" className="icon-btn position-relative" title="Favorites" onClick={close}>
            <FaHeart />{favs.length > 0 && <span className="count">{favs.length}</span>}
          </Link>
          {user ? (
            <button type="button" className="btn btn-gold btn-sm d-none d-sm-inline-flex align-items-center gap-1" onClick={logout}>
              <FaUserCircle /> {user.name.split(' ')[0]} · Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-gold btn-sm d-none d-sm-inline-block">Sign In</Link>
          )}
          <button type="button" className="icon-btn d-xl-none" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <FaTimes /> : <FaBars />}</button>
        </div>
      </nav>
    </header>
  )
}
