import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaStar, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'
import PropertyCard from '../components/PropertyCard'
import { agents } from '../data/agents'
import { properties } from '../data/properties'
import { isEmail } from '../utils/validators'

export default function AgentProfile() {
  const { id } = useParams()
  const a = agents.find((x) => x.id === Number(id))
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  if (!a) return <div className="container py-5 text-center"><h3>Agent not found</h3><Link to="/agents" className="btn btn-navy mt-3">Back to Agents</Link></div>
  const list = properties.filter((p) => p.agentId === a.id)
  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (!f.name.trim()) x.name = 'Name is required'
    if (!isEmail(f.email)) x.email = 'Enter a valid email'
    if (f.message.trim().length < 10) x.message = 'Message must be at least 10 characters'
    setErr(x); setSent(false)
    if (!Object.keys(x).length) { setSent(true); setF({ name: '', email: '', message: '' }) }
  }
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value })
  return (
    <>
      <PageHeader title="Agent Profile" sub={a.name} />
      <section className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="form-card text-center">
              <img src={a.photo} alt={a.name} className="agent-photo" style={{ marginTop: 0 }} />
              <h4 className="mt-3 mb-0">{a.name}</h4>
              <p className="text-gold">{a.title}</p>
              <p className="small text-muted"><FaStar className="text-gold" /> {a.rating} rating · <FaBriefcase /> {a.experience} yrs · <FaMapMarkerAlt /> {a.city}</p>
              <p className="small">{a.bio}</p>
              <p className="small mb-1"><FaPhoneAlt className="text-gold" /> {a.phone}</p>
              <p className="small"><FaEnvelope className="text-gold" /> {a.email}</p>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="form-card mb-4">
              <h5>Contact {a.name.split(' ')[0]}</h5>
              {sent && <div className="alert alert-success">Message sent! {a.name.split(' ')[0]} will get back to you soon.</div>}
              <form onSubmit={submit} noValidate className="row g-3">
                <div className="col-md-6"><input className={`form-control ${err.name ? 'is-invalid' : ''}`} placeholder="Your name" value={f.name} onChange={on('name')} /><div className="invalid-feedback">{err.name}</div></div>
                <div className="col-md-6"><input className={`form-control ${err.email ? 'is-invalid' : ''}`} placeholder="Your email" value={f.email} onChange={on('email')} /><div className="invalid-feedback">{err.email}</div></div>
                <div className="col-12"><textarea rows="3" className={`form-control ${err.message ? 'is-invalid' : ''}`} placeholder="Your message" value={f.message} onChange={on('message')} /><div className="invalid-feedback">{err.message}</div></div>
                <div className="col-12"><button type="submit" className="btn btn-gold">Send Message</button></div>
              </form>
            </div>
            <h5 className="mb-3">Listings by {a.name.split(' ')[0]} ({list.length})</h5>
            <div className="row g-4">{list.map((p) => <div key={p.id} className="col-md-6"><PropertyCard p={p} /></div>)}</div>
          </div>
        </div>
      </section>
    </>
  )
}
