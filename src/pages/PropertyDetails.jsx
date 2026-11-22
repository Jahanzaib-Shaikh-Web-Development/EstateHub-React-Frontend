import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaBed, FaBath, FaRulerCombined, FaCalendarAlt, FaMapMarkerAlt, FaHeart, FaRegHeart, FaCheckCircle } from 'react-icons/fa'
import PropertyCard from '../components/PropertyCard'
import { properties, fmt, FALLBACK } from '../data/properties'
import { agents } from '../data/agents'
import { useApp } from '../context/AppContext'
import { isEmail, isPhone } from '../utils/validators'

export default function PropertyDetails() {
  const { id } = useParams()
  const p = properties.find((x) => x.id === Number(id))
  const { favs, toggleFav } = useApp()
  const [img, setImg] = useState(0)
  const [f, setF] = useState({ name: '', email: '', phone: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  if (!p) return <div className="container py-5 text-center"><h3>Property not found</h3><Link to="/properties" className="btn btn-navy mt-3">Back to Listings</Link></div>
  const agent = agents.find((a) => a.id === p.agentId)
  const on = favs.includes(p.id)
  const similar = properties.filter((x) => x.id !== p.id && (x.category === p.category || x.city === p.city)).slice(0, 3)
  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (!f.name.trim()) x.name = 'Name is required'
    if (!isEmail(f.email)) x.email = 'Valid email required'
    if (!isPhone(f.phone)) x.phone = 'Valid phone required'
    setErr(x); setSent(false)
    if (!Object.keys(x).length) { setSent(true); setF({ name: '', email: '', phone: '' }) }
  }
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  return (
    <section className="container py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <span className={`badge ${p.purpose === 'sale' ? 'bg-warning text-dark' : 'bg-dark'} mb-2`}>{p.purpose === 'sale' ? 'For Sale' : 'For Rent'}</span>
          <h2 className="mb-1">{p.title}</h2>
          <p className="text-muted mb-0"><FaMapMarkerAlt className="text-gold" /> {p.location}, {p.city}</p>
        </div>
        <div className="text-md-end">
          <h3 className="text-gold mb-2">{fmt(p)}</h3>
          <button type="button" className="btn btn-outline-navy btn-sm" onClick={() => toggleFav(p.id)}>{on ? <FaHeart className="text-danger" /> : <FaRegHeart />} {on ? 'Saved' : 'Save'}</button>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-lg-8">
          <img src={p.images[img]} alt={p.title} className="gallery-main" onError={(e) => { e.currentTarget.src = FALLBACK }} />
          <div className="thumbs">{p.images.map((src, i) => <img key={i} src={src} alt={`View ${i + 1}`} className={i === img ? 'active' : ''} onClick={() => setImg(i)} />)}</div>
          <div className="row g-3 my-4">
            {[[FaBed, 'Bedrooms', p.beds || '—'], [FaBath, 'Bathrooms', p.baths || '—'], [FaRulerCombined, 'Area', p.size], [FaCalendarAlt, 'Year', p.year]].map(([I, l, v]) => (
              <div className="col-6 col-md-3" key={l}><div className="spec"><I /><div className="fw-semibold mt-1">{v}</div><small className="text-muted">{l}</small></div></div>
            ))}
          </div>
          <div className="form-card mb-4"><h5>Description</h5><p className="mb-0">{p.description}</p></div>
          <div className="form-card"><h5>Features & Amenities</h5>
            <div className="row">{p.features.map((x) => <div key={x} className="col-sm-6 mb-2"><FaCheckCircle className="text-gold me-2" />{x}</div>)}</div></div>
        </div>
        <div className="col-lg-4">
          <div className="form-card mb-4 text-center">
            <img src={agent.photo} alt={agent.name} className="rounded-circle mb-2" width="84" height="84" />
            <h6 className="mb-0">{agent.name}</h6><small className="text-muted">{agent.title}</small><br />
            <Link to={`/agent/${agent.id}`} className="btn btn-outline-navy btn-sm mt-2">View Profile</Link>
          </div>
          <div className="form-card">
            <h5>Enquire About This Property</h5>
            {sent && <div className="alert alert-success py-2">Enquiry sent successfully!</div>}
            <form onSubmit={submit} noValidate>
              {[['name', 'Full Name'], ['email', 'Email'], ['phone', 'Phone']].map(([k, ph]) => (
                <div className="mb-3" key={k}><input className={`form-control ${err[k] ? 'is-invalid' : ''}`} placeholder={ph} value={f[k]} onChange={set(k)} /><div className="invalid-feedback">{err[k]}</div></div>
              ))}
              <button type="submit" className="btn btn-gold w-100">Contact Agent</button>
            </form>
          </div>
        </div>
      </div>
      <h4 className="mt-5 mb-3">Similar Properties</h4>
      <div className="row g-4">{similar.map((x) => <div key={x.id} className="col-md-6 col-lg-4"><PropertyCard p={x} /></div>)}</div>
    </section>
  )
}
