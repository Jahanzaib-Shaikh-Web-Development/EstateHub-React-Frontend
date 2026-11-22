import { HERO_IMG } from '../data/properties'

export default function PageHeader({ title, sub, bg = HERO_IMG }) {
  return (
    <section className="page-header" style={{ backgroundImage: `linear-gradient(rgba(16,42,67,.88),rgba(16,42,67,.88)),url(${bg})` }}>
      <div className="container text-center">
        <h1>{title}</h1>
        {sub && <p className="mb-0">{sub}</p>}
      </div>
    </section>
  )
}
