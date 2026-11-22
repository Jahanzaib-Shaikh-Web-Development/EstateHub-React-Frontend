import { useState } from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'
import { isEmail, isPhone } from '../utils/validators'

export default function Contact() {
  const [f, setF] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (f.name.trim().length < 3) x.name = 'Enter your name'
    if (!isEmail(f.email)) x.email = 'Enter a valid email'
    if (!isPhone(f.phone)) x.phone = 'Enter a valid phone'
    if (!f.subject.trim()) x.subject = 'Subject is required'
    if (f.message.trim().length < 10) x.message = 'Message must be at least 10 characters'
    setErr(x); setSent(false)
    if (!Object.keys(x).length) { setSent(true); setF({ name: '', email: '', phone: '', subject: '', message: '' }) }
  }
  const inp = (k, ph) => (<><input className={`form-control ${err[k] ? 'is-invalid' : ''}`} placeholder={ph} value={f[k]} onChange={set(k)} /><div className="invalid-feedback">{err[k]}</div></>)
  return (
    <>
      <PageHeader title="Contact Us" sub="We’d love to hear from you" />
      <section className="container py-5">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="form-card h-100">
              <h5 className="mb-4">Get in Touch</h5>
              {[[FaMapMarkerAlt, 'Office', 'Plot 12, Main Boulevard, DHA, Karachi'], [FaPhoneAlt, 'Phone', '+92 21 111 378 428'], [FaEnvelope, 'Email', 'info@estatehub.pk'], [FaClock, 'Hours', 'Mon – Sat, 9:00 AM – 6:00 PM']].map(([I, t, d]) => (
                <div key={t} className="d-flex gap-3 mb-4"><div className="logo-icon flex-shrink-0"><I /></div><div><h6 className="mb-0">{t}</h6><small className="text-muted">{d}</small></div></div>
              ))}
              <iframe title="Map" className="w-100 rounded-3 border-0" height="200" loading="lazy" src="https://maps.google.com/maps?q=DHA%20Karachi&output=embed" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="form-card">
              <h5 className="mb-3">Send Us a Message</h5>
              {sent && <div className="alert alert-success">Thank you! Your message has been sent.</div>}
              <form onSubmit={submit} noValidate className="row g-3">
                <div className="col-md-6">{inp('name', 'Full name')}</div>
                <div className="col-md-6">{inp('email', 'Email address')}</div>
                <div className="col-md-6">{inp('phone', 'Phone number')}</div>
                <div className="col-md-6">{inp('subject', 'Subject')}</div>
                <div className="col-12"><textarea rows="5" className={`form-control ${err.message ? 'is-invalid' : ''}`} placeholder="Your message" value={f.message} onChange={set('message')} /><div className="invalid-feedback">{err.message}</div></div>
                <div className="col-12"><button type="submit" className="btn btn-gold px-5">Send Message</button></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
