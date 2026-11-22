import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

export default function Logo({ light }) {
  return (
    <Link to="/" className={`logo ${light ? 'light' : ''}`}>
      <span className="logo-icon"><FaHome /></span>
      <span>Estate<b>Hub</b></span>
    </Link>
  )
}
