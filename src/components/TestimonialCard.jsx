import { FaStar, FaQuoteLeft } from 'react-icons/fa'

export default function TestimonialCard({ t }) {
  return (
    <div className="card testi-card h-100">
      <FaQuoteLeft className="quote" />
      <div className="mb-2">{[...Array(5)].map((_, i) => <FaStar key={i} className={i < t.rating ? 'text-gold' : 'text-secondary opacity-25'} />)}</div>
      <p className="text-muted">{t.text}</p>
      <div className="d-flex align-items-center gap-3 mt-auto">
        <img src={t.photo} alt={t.name} className="rounded-circle" width="52" height="52" />
        <div><h6 className="mb-0">{t.name}</h6><small className="text-muted">{t.role}</small></div>
      </div>
    </div>
  )
}
