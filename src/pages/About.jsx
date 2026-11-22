import { Link } from 'react-router-dom'
import { FaBullseye, FaEye, FaGem } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'
import AgentCard from '../components/AgentCard'
import { agents } from '../data/agents'

export default function About() {
  return (
    <>
      <PageHeader title="About EstateHub" sub="Your trusted partner in real estate" />
      <section className="section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6"><img className="rounded-4 shadow w-100" alt="EstateHub office" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" /></div>
            <div className="col-lg-6">
              <h2 className="mb-3">Redefining How Pakistan Buys, Sells & Rents</h2>
              <p>EstateHub is a modern real estate marketplace connecting buyers, sellers, tenants and landlords with verified residential and commercial properties across Pakistan.</p>
              <p>Our team of experienced agents and technologists combines local market knowledge with a beautifully simple search experience, so every property decision is confident and informed.</p>
              <Link to="/contact" className="btn btn-gold">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row g-4 mb-5">
            {[['2,500+', 'Properties Listed'], ['1,200+', 'Happy Clients'], ['50+', 'Expert Agents'], ['6', 'Major Cities']].map(([n, l]) => <div className="col-6 col-md-3" key={l}><div className="stat"><h2>{n}</h2><p className="text-muted">{l}</p></div></div>)}
          </div>
          <div className="row g-4">
            {[[FaBullseye, 'Our Mission', 'To make property transactions transparent, simple and stress-free for everyone.'], [FaEye, 'Our Vision', 'To become the most trusted real estate platform in Pakistan.'], [FaGem, 'Our Values', 'Integrity, professionalism, customer focus and innovation in every deal.']].map(([I, t, d]) => (
              <div className="col-md-4" key={t}><div className="why-card"><div className="wi"><I /></div><h5>{t}</h5><p className="text-muted small mb-0">{d}</p></div></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container"><div className="section-title"><h2>Meet Our Team</h2></div>
          <div className="row g-4">{agents.slice(0, 3).map((a) => <div key={a.id} className="col-md-4"><AgentCard a={a} /></div>)}</div></div>
      </section>
    </>
  )
}
