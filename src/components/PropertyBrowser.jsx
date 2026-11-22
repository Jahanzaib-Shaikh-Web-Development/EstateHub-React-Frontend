import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaRedo, FaHeartBroken } from 'react-icons/fa'
import PropertyCard from './PropertyCard'
import { properties, categories, cities } from '../data/properties'
import { useApp } from '../context/AppContext'

export default function PropertyBrowser({ purpose, advanced }) {
  const [sp] = useSearchParams()
  const { favs } = useApp()
  const favOnly = sp.get('fav') === '1'
  const init = {
    q: sp.get('q') || '', city: sp.get('city') || '', category: sp.get('category') || '',
    purpose: purpose || sp.get('purpose') || '', min: sp.get('min') || '', max: sp.get('max') || '',
    beds: '', baths: '', sort: 'new',
  }
  const [f, setF] = useState(init)
  useEffect(() => {
    setF({
      q: sp.get('q') || '',
      city: sp.get('city') || '',
      category: sp.get('category') || '',
      purpose: purpose || sp.get('purpose') || '',
      min: sp.get('min') || '',
      max: sp.get('max') || '',
      beds: sp.get('beds') || '',
      baths: sp.get('baths') || '',
      sort: sp.get('sort') || 'new',
    })
  }, [sp, purpose])
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const list = useMemo(() => {
    const q = f.q.trim().toLowerCase()
    const out = properties.filter((p) =>
      (!favOnly || favs.includes(p.id)) &&
      (!q || `${p.title} ${p.location} ${p.city}`.toLowerCase().includes(q)) &&
      (!f.city || p.city === f.city) &&
      (!f.category || p.category === f.category) &&
      (!f.purpose || p.purpose === f.purpose) &&
      (f.min === '' || p.price >= Number(f.min)) &&
      (f.max === '' || p.price <= Number(f.max)) &&
      (!f.beds || p.beds >= Number(f.beds)) &&
      (!f.baths || p.baths >= Number(f.baths))
    )
    if (f.sort === 'low') out.sort((a, b) => a.price - b.price)
    else if (f.sort === 'high') out.sort((a, b) => b.price - a.price)
    else out.sort((a, b) => b.id - a.id)
    return out
  }, [f, favOnly, favs])

  const reset = () => setF({ ...init, q: '', city: '', category: '', min: '', max: '', purpose: purpose || '' })

  return (
    <>
      {favOnly && <h4 className="mb-3">Your Favorite Properties</h4>}
      <div className="filter-box mb-4">
        <div className="row g-3">
          <div className="col-md-6 col-lg-3"><label>Keyword</label><input className="form-control" placeholder="Title or area" value={f.q} onChange={set('q')} /></div>
          <div className="col-md-6 col-lg-3"><label>Location</label>
            <select className="form-select" value={f.city} onChange={set('city')}><option value="">All Cities</option>{cities.map((c) => <option key={c}>{c}</option>)}</select></div>
          <div className="col-md-6 col-lg-3"><label>Category</label>
            <select className="form-select" value={f.category} onChange={set('category')}><option value="">All Categories</option>{categories.map((c) => <option key={c}>{c}</option>)}</select></div>
          <div className="col-md-6 col-lg-3"><label>Sort By</label>
            <select className="form-select" value={f.sort} onChange={set('sort')}>
              <option value="new">Newest</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select></div>
          <div className="col-md-6 col-lg-3"><label>Min Price (PKR)</label><input type="number" min="0" className="form-control" value={f.min} onChange={set('min')} placeholder="0" /></div>
          <div className="col-md-6 col-lg-3"><label>Max Price (PKR)</label><input type="number" min="0" className="form-control" value={f.max} onChange={set('max')} placeholder="No limit" /></div>
          {advanced && (
            <>
              {!purpose && <div className="col-md-4 col-lg-2"><label>Purpose</label>
                <select className="form-select" value={f.purpose} onChange={set('purpose')}><option value="">Buy & Rent</option><option value="sale">For Sale</option><option value="rent">For Rent</option></select></div>}
              <div className="col-md-4 col-lg-2"><label>Min Bedrooms</label>
                <select className="form-select" value={f.beds} onChange={set('beds')}><option value="">Any</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}</select></div>
              <div className="col-md-4 col-lg-2"><label>Min Bathrooms</label>
                <select className="form-select" value={f.baths} onChange={set('baths')}><option value="">Any</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}</select></div>
            </>
          )}
          <div className="col-12 d-flex justify-content-between align-items-center">
            <span className="text-muted small"><b>{list.length}</b> properties found</span>
            <button type="button" className="btn btn-outline-navy btn-sm" onClick={reset}><FaRedo /> Reset</button>
          </div>
        </div>
      </div>
      {list.length ? (
        <div className="row g-4">{list.map((p) => <div key={p.id} className="col-md-6 col-xl-4"><PropertyCard p={p} /></div>)}</div>
      ) : (
        <div className="text-center py-5 text-muted"><FaHeartBroken size={42} className="mb-3" /><h5>No properties match your filters</h5><p>Try adjusting or resetting the filters.</p></div>
      )}
    </>
  )
}
