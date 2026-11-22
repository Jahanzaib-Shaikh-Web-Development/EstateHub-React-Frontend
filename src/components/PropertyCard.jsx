import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa'
import { useApp } from '../context/AppContext'
import { fmt, FALLBACK } from '../data/properties'

export default function PropertyCard({ p }) {
  const { favs, toggleFav } = useApp()
  const on = favs.includes(p.id)
  return (
    <div className="card prop-card h-100">
      <div className="prop-img">
        <img src={p.images[0]} alt={p.title} loading="lazy" onError={(e) => { e.currentTarget.src = FALLBACK }} />
        <span className={`badge-purpose ${p.purpose}`}>{p.purpose === 'sale' ? 'For Sale' : 'For Rent'}</span>
        <button
          type="button"
          className={`fav ${on ? 'on' : ''}`}
          onClick={() => toggleFav(p.id)}
          aria-label={on ? `Remove ${p.title} from favorites` : `Add ${p.title} to favorites`}
          aria-pressed={on}
          title={on ? 'Remove from favorites' : 'Add to favorites'}
        >
          {on ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      <div className="card-body d-flex flex-column">
        <div className="prop-price">{fmt(p)}</div>
        <h5 className="prop-title">{p.title}</h5>
        <p className="text-muted small mb-3"><FaMapMarkerAlt className="text-gold" /> {p.location}, {p.city}</p>
        <div className="prop-meta mb-3">
          <span><FaBed /> {p.beds || '—'} Beds</span>
          <span><FaBath /> {p.baths || '—'} Baths</span>
          <span><FaRulerCombined /> {p.size}</span>
        </div>
        <Link to={`/property/${p.id}`} className="btn btn-navy mt-auto">View Details</Link>
      </div>
    </div>
  )
}
