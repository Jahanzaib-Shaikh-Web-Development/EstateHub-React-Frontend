import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaBuilding, FaHotel, FaCity, FaStore, FaBriefcase, FaMapMarkedAlt, FaTractor, FaShieldAlt, FaHandshake, FaSearchDollar, FaHeadset } from 'react-icons/fa'
import SearchBar from '../components/SearchBar'
import PropertyCard from '../components/PropertyCard'
import AgentCard from '../components/AgentCard'
import TestimonialCard from '../components/TestimonialCard'
import { properties, categories, locations, HERO_IMG } from '../data/properties'
import { agents, testimonials } from '../data/agents'
import { blogs } from '../data/blogs'
import { isEmail } from '../utils/validators'

const icons = [FaHome, FaBuilding, FaHotel, FaCity, FaStore, FaBriefcase, FaMapMarkedAlt, FaTractor]
const why = [
  [FaShieldAlt, 'Verified Listings', 'Every property is reviewed for accuracy and ownership.'],
  [FaHandshake, 'Trusted Agents', 'Work with experienced, licensed real estate professionals.'],
  [FaSearchDollar, 'Best Market Prices', 'Transparent pricing with no hidden charges.'],
  [FaHeadset, '24/7 Support', 'Our team is always ready to help you at any step.'],
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState({ type: '', text: '' })
  const subscribe = (e) => {
    e.preventDefault()
    if (!isEmail(email)) return setMsg({ type: 'danger', text: 'Please enter a valid email address.' })
    setMsg({ type: 'success', text: 'Thank you for subscribing to EstateHub updates!' }); setEmail('')
  }
  return (
    <div className="fade-in">
      <section className="hero text-center" style={{ backgroundImage: `linear-gradient(rgba(16,42,67,.72),rgba(16,42,67,.82)),url(${HERO_IMG})` }}>
        <div className="container">
          <h1>Find Your Dream Property With <span>EstateHub</span></h1>
          <p>Explore premium homes, villas, apartments and commercial spaces across Pakistan.</p>
          <SearchBar />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title"><h2>Featured Properties</h2><p>Handpicked premium listings for you</p></div>
          <div className="row g-4">{properties.filter((p) => p.featured).map((p) => <div key={p.id} className="col-md-6 col-lg-4"><PropertyCard p={p} /></div>)}</div>
          <div className="text-center mt-5"><Link to="/properties" className="btn btn-navy px-4">View All Properties</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title"><h2>Browse by Category</h2><p>Whatever you’re looking for, we have it</p></div>
          <div className="row g-3">
            {categories.map((c, i) => { const I = icons[i]; return (
              <div key={c} className="col-6 col-md-3"><Link to={`/search?category=${encodeURIComponent(c)}`} className="cat-card"><div className="ci"><I /></div><h6 className="mb-0">{c}</h6></Link></div>
            ) })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title"><h2>Popular Locations</h2><p>Explore top cities for real estate</p></div>
          <div className="row g-4">
            {locations.map((l) => (
              <div key={l.city} className="col-sm-6 col-lg-4"><Link to={`/search?city=${l.city}`} className="loc-card">
                <img src={l.img} alt={l.city} loading="lazy" />
                <div className="ov"><h5>{l.city}</h5><small>{properties.filter((p) => p.city === l.city).length} Properties</small></div>
              </Link></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title"><h2>Why Choose EstateHub?</h2><p>We make real estate simple, safe and rewarding</p></div>
          <div className="row g-4">{why.map(([I, t, d]) => <div key={t} className="col-sm-6 col-lg-3"><div className="why-card"><div className="wi"><I /></div><h5>{t}</h5><p className="text-muted small mb-0">{d}</p></div></div>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title"><h2>Featured Agents</h2><p>Meet our top-rated professionals</p></div>
          <div className="row g-4">{agents.slice(0, 4).map((a) => <div key={a.id} className="col-sm-6 col-lg-3"><AgentCard a={a} /></div>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title"><h2>Customer Testimonials</h2><p>What our clients say about us</p></div>
          <div className="row g-4">{testimonials.map((t) => <div key={t.id} className="col-md-4"><TestimonialCard t={t} /></div>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title"><h2>Latest Real Estate News</h2><p>Insights, guides and market updates</p></div>
          <div className="row g-4">
            {blogs.slice(0, 3).map((b) => (
              <div key={b.id} className="col-md-4"><div className="card blog-card h-100">
                <img src={b.image} alt={b.title} className="card-img-top" loading="lazy" />
                <div className="card-body"><span className="tag">{b.category}</span><h6 className="mt-3">{b.title}</h6><p className="small text-muted">{b.excerpt}</p><small className="blog-meta">{b.date} · {b.author}</small></div>
              </div></div>
            ))}
          </div>
          <div className="text-center mt-4"><Link to="/blog" className="btn btn-outline-navy">Read More News</Link></div>
        </div>
      </section>

      <section className="newsletter text-center">
        <div className="container">
          <h2>Subscribe to Our Newsletter</h2>
          <p className="text-white-50 mb-4">Get the latest listings and market news straight to your inbox.</p>
          <form className="d-flex flex-column flex-sm-row gap-2 mx-auto" style={{ maxWidth: 520 }} onSubmit={subscribe} noValidate>
            <input className="form-control form-control-lg" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" className="btn btn-gold px-4">Subscribe</button>
          </form>
          {msg.text && <div className={`alert alert-${msg.type} d-inline-block mt-3 py-2`}>{msg.text}</div>}
        </div>
      </section>
    </div>
  )
}
