import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { categories, cities } from '../data/properties'
import { isEmail, isPhone } from '../utils/validators'

const empty = { name: '', email: '', phone: '', title: '', purpose: 'sale', category: '', city: '', location: '', price: '', beds: '', baths: '', size: '', description: '' }

export default function SellProperty() {
  const [f, setF] = useState(empty)
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (f.name.trim().length < 3) x.name = 'Enter your full name'
    if (!isEmail(f.email)) x.email = 'Enter a valid email'
    if (!isPhone(f.phone)) x.phone = 'Enter a valid phone number'
    if (f.title.trim().length < 5) x.title = 'Title must be at least 5 characters'
    if (!f.category) x.category = 'Select a category'
    if (!f.city) x.city = 'Select a city'
    if (!f.location.trim()) x.location = 'Area / society is required'
    if (!f.price || Number(f.price) <= 0) x.price = 'Enter a valid price'
    if (!f.size.trim()) x.size = 'Area size is required'
    if (f.description.trim().length < 20) x.description = 'Describe your property (min 20 characters)'
    setErr(x); setSent(false)
    if (!Object.keys(x).length) { setSent(true); setF(empty); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }
  const inp = (k, ph, type = 'text') => (<><input type={type} className={`form-control ${err[k] ? 'is-invalid' : ''}`} placeholder={ph} value={f[k]} onChange={set(k)} /><div className="invalid-feedback">{err[k]}</div></>)
  return (
    <>
      <PageHeader title="Sell Your Property" sub="List your property and reach thousands of buyers" />
      <section className="container py-5">
        <div className="form-card mx-auto" style={{ maxWidth: 900 }}>
          {sent && <div className="alert alert-success">Your property has been submitted successfully! Our team will contact you shortly.</div>}
          <form onSubmit={submit} noValidate className="row g-3">
            <h5 className="col-12">Owner Details</h5>
            <div className="col-md-4">{inp('name', 'Full name')}</div>
            <div className="col-md-4">{inp('email', 'Email address')}</div>
            <div className="col-md-4">{inp('phone', 'Phone number')}</div>
            <h5 className="col-12 mt-4">Property Details</h5>
            <div className="col-md-8">{inp('title', 'Property title')}</div>
            <div className="col-md-4"><select className="form-select" value={f.purpose} onChange={set('purpose')}><option value="sale">For Sale</option><option value="rent">For Rent</option></select></div>
            <div className="col-md-4"><select className={`form-select ${err.category ? 'is-invalid' : ''}`} value={f.category} onChange={set('category')}><option value="">Category</option>{categories.map((c) => <option key={c}>{c}</option>)}</select><div className="invalid-feedback">{err.category}</div></div>
            <div className="col-md-4"><select className={`form-select ${err.city ? 'is-invalid' : ''}`} value={f.city} onChange={set('city')}><option value="">City</option>{cities.map((c) => <option key={c}>{c}</option>)}</select><div className="invalid-feedback">{err.city}</div></div>
            <div className="col-md-4">{inp('location', 'Area / society')}</div>
            <div className="col-md-3">{inp('price', 'Price (PKR)', 'number')}</div>
            <div className="col-md-3">{inp('size', 'Area (e.g. 10 Marla)')}</div>
            <div className="col-md-3">{inp('beds', 'Bedrooms', 'number')}</div>
            <div className="col-md-3">{inp('baths', 'Bathrooms', 'number')}</div>
            <div className="col-12"><textarea rows="4" className={`form-control ${err.description ? 'is-invalid' : ''}`} placeholder="Describe your property" value={f.description} onChange={set('description')} /><div className="invalid-feedback">{err.description}</div></div>
            <div className="col-12"><button type="submit" className="btn btn-gold px-5">Submit Property</button></div>
          </form>
        </div>
      </section>
    </>
  )
}
