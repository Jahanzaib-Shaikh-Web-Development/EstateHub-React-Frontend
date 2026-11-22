import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { cities, categories } from '../data/properties'

const ranges = [
  ['', 'Any Price', '', ''],
  ['a', 'Under PKR 50 Lakh', '', 5000000],
  ['b', 'PKR 50 Lakh – 2 Crore', 5000000, 20000000],
  ['c', 'PKR 2 – 5 Crore', 20000000, 50000000],
  ['d', 'Above PKR 5 Crore', 50000000, ''],
]

export default function SearchBar() {
  const nav = useNavigate()
  const [city, setCity] = useState('')
  const [category, setCategory] = useState('')
  const [range, setRange] = useState('')
  const submit = (e) => {
    e.preventDefault()
    const r = ranges.find((x) => x[0] === range) || ranges[0]
    const q = new URLSearchParams()
    if (city) q.set('city', city)
    if (category) q.set('category', category)
    if (r[2] !== '') q.set('min', r[2])
    if (r[3] !== '') q.set('max', r[3])
    nav(`/search?${q.toString()}`)
  }
  return (
    <form className="search-bar" onSubmit={submit}>
      <div className="row g-2 align-items-end">
        <div className="col-md-3"><label>Location</label>
          <select className="form-select" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All Cities</option>{cities.map((c) => <option key={c}>{c}</option>)}
          </select></div>
        <div className="col-md-3"><label>Property Type</label>
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Types</option>{categories.map((c) => <option key={c}>{c}</option>)}
          </select></div>
        <div className="col-md-4"><label>Price Range</label>
          <select className="form-select" value={range} onChange={(e) => setRange(e.target.value)}>
            {ranges.map((r) => <option key={r[0]} value={r[0]}>{r[1]}</option>)}
          </select></div>
        <div className="col-md-2"><button type="submit" className="btn btn-gold w-100"><FaSearch /> Search</button></div>
      </div>
    </form>
  )
}
