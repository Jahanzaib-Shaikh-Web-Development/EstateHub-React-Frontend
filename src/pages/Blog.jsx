import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { blogs } from '../data/blogs'

const cats = ['All', ...new Set(blogs.map((b) => b.category))]

export default function Blog() {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const list = blogs.filter((b) => cat === 'All' || b.category === cat)
  return (
    <>
      <PageHeader title="Blog & News" sub="Real estate insights, guides and market updates" />
      <section className="container py-5">
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {cats.map((c) => <button type="button" key={c} onClick={() => setCat(c)} className={`btn btn-sm ${cat === c ? 'btn-navy' : 'btn-outline-navy'}`}>{c}</button>)}
        </div>
        <div className="row g-4">
          {list.map((b) => (
            <div key={b.id} className="col-md-6 col-lg-4"><div className="card blog-card h-100">
              <img src={b.image} alt={b.title} className="card-img-top" loading="lazy" />
              <div className="card-body d-flex flex-column">
                <span className="tag align-self-start">{b.category}</span>
                <h6 className="mt-3">{b.title}</h6>
                <p className="small text-muted mb-2">{b.excerpt}{open === b.id && ` ${b.body}`}</p>
                <small className="blog-meta mb-3">{b.date} · {b.author}</small>
                <button type="button" className="btn btn-outline-navy btn-sm mt-auto" onClick={() => setOpen(open === b.id ? null : b.id)}>{open === b.id ? 'Show Less' : 'Read More'}</button>
              </div>
            </div></div>
          ))}
        </div>
      </section>
    </>
  )
}
