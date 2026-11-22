import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'

const faqs = [
  ['How do I search for a property on EstateHub?', 'Use the search bar on the homepage or the Advanced Search page to filter by location, category, price, bedrooms and more.'],
  ['Can I save properties I like?', 'Yes. Tap the heart icon on any property card. Favorites are saved in your browser and available from the heart icon in the navbar.'],
  ['How do I list my property for sale or rent?', 'Open the Sell Property page, complete the form and submit. Our team will review and contact you.'],
  ['Are the listings verified?', 'Our agents review listing details and ownership documents before properties are promoted.'],
  ['How can I contact an agent?', 'Open any property or agent profile and use the enquiry form, or call the number shown.'],
  ['Are there any fees to browse properties?', 'Browsing and searching is completely free for everyone.'],
  ['What documents do I need to buy a property?', 'Typically CNIC, proof of funds, and the seller’s title documents. Your agent will guide you through the process.'],
  ['Is this website a live marketplace?', 'This is a frontend demo project: all data is sample data and forms do not send information to a server.'],
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <>
      <PageHeader title="Frequently Asked Questions" sub="Quick answers to common questions" />
      <section className="container py-5" style={{ maxWidth: 820 }}>
        {faqs.map(([q, a], i) => (
          <div key={q} className={`faq-item ${open === i ? 'open' : ''}`}>
            <button type="button" className="faq-q" onClick={() => setOpen(open === i ? null : i)}>{q}<FaChevronDown /></button>
            <div className="faq-a">{a}</div>
          </div>
        ))}
      </section>
    </>
  )
}
