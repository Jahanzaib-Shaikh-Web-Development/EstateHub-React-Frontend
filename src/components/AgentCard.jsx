import { Link } from 'react-router-dom'
import { FaStar, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'

export default function AgentCard({ a }) {
  return (
    <div className="card agent-card h-100 text-center">
      <img src={a.photo} alt={a.name} className="agent-photo" />
      <div className="card-body d-flex flex-column">
        <h5 className="mb-0">{a.name}</h5>
        <p className="text-gold small mb-1">{a.title}</p>
        <p className="small text-muted mb-2">{a.city} · {a.experience} yrs · <FaStar className="text-gold" /> {a.rating}</p>
        <div className="small text-muted mb-3"><FaPhoneAlt /> {a.phone}<br /><FaEnvelope /> {a.email}</div>
        <Link to={`/agent/${a.id}`} className="btn btn-outline-navy mt-auto">View Profile</Link>
      </div>
    </div>
  )
}
