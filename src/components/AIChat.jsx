import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaComments, FaPaperPlane, FaRobot, FaTimes, FaTrash, FaUser } from 'react-icons/fa'
import { properties, fmt, cities } from '../data/properties'
import { agents } from '../data/agents'

const quickPrompts = [
  'Find homes in Karachi',
  'Show apartments for rent',
  'Find properties under 5 Crore',
  'How do I sell my property?',
]

const getReply = (message) => {
  const text = message.toLowerCase()

  if (text.includes('sell') || text.includes('valuation') || text.includes('list')) {
    return {
      text: 'You can submit your property details for listing. Our team will verify the information and contact you.',
      actions: [{ label: 'Sell a property', to: '/sell' }],
    }
  }

  if (text.includes('contact') || text.includes('phone') || text.includes('support')) {
    return {
      text: 'Visit our contact page to send a message or find EstateHub’s office details and phone number.',
      actions: [{ label: 'Contact EstateHub', to: '/contact' }],
    }
  }

  if (text.includes('agent') || text.includes('consultant') || text.includes('advisor')) {
    const city = cities.find((item) => text.includes(item.toLowerCase()))
    const matches = city ? agents.filter((agent) => agent.city === city) : agents.slice(0, 3)
    return {
      text: city
        ? `Here are the EstateHub agents available in ${city}.`
        : 'Here are our featured property consultants.',
      agentResults: matches,
    }
  }

  let matches = [...properties]
  const city = cities.find((item) => text.includes(item.toLowerCase()))
  if (city) matches = matches.filter((property) => property.city === city)

  const purposeRent = text.includes('rent') || text.includes('rental') || text.includes('lease')
  const purposeSale = text.includes('buy') || text.includes('sale') || text.includes('sell')
  if (purposeRent) matches = matches.filter((property) => property.purpose === 'rent')
  if (purposeSale && !purposeRent) matches = matches.filter((property) => property.purpose === 'sale')

  if (text.includes('apartment') || text.includes('flat')) {
    matches = matches.filter((property) => property.category === 'Apartments')
  }
  if (text.includes('villa')) {
    matches = matches.filter((property) => property.category === 'Villas')
  }
  if (text.includes('office')) {
    matches = matches.filter((property) => property.category === 'Offices')
  }
  if (text.includes('shop')) {
    matches = matches.filter((property) => property.category === 'Shops')
  }
  if (text.includes('plot')) {
    matches = matches.filter((property) => property.category === 'Residential Plots')
  }

  const priceMatch = text.match(/(?:under|below|less than|max(?:imum)?(?: of)?|budget)\s*(\d+(?:\.\d+)?)\s*(crore|lakh|lac|million)?/i)
  if (priceMatch) {
    let max = Number(priceMatch[1])
    const unit = (priceMatch[2] || '').toLowerCase()
    if (unit === 'crore') max *= 10000000
    else if (unit === 'lakh' || unit === 'lac') max *= 100000
    else if (unit === 'million') max *= 1000000
    matches = matches.filter((property) => property.purpose === 'rent' || property.price <= max)
  }

  const bedroomMatch = text.match(/(\d+)\s*(?:bed|bedroom|bedrooms|bhk)/i)
  if (bedroomMatch) {
    const beds = Number(bedroomMatch[1])
    matches = matches.filter((property) => property.beds >= beds)
  }

  if (
    text.includes('property') || text.includes('home') || text.includes('house') ||
    text.includes('apartment') || text.includes('villa') || text.includes('plot') ||
    text.includes('office') || text.includes('shop') || text.includes('find') ||
    text.includes('search') || text.includes('show') || text.includes('available')
  ) {
    matches = matches.slice(0, 3)
    if (!matches.length) {
      return {
        text: 'I couldn’t find an exact match in the current listings. Try a nearby city or view all available properties.',
        actions: [{ label: 'Browse all listings', to: '/properties' }],
      }
    }

    const query = new URLSearchParams()
    if (city) query.set('city', city)
    if (purposeRent) query.set('purpose', 'rent')
    if (purposeSale && !purposeRent) query.set('purpose', 'sale')
    const searchPath = `/properties${query.toString() ? `?${query}` : ''}`
    return {
      text: `I found ${matches.length} matching ${matches.length === 1 ? 'property' : 'properties'} for you.`,
      propertyResults: matches,
      actions: [{ label: 'View in listings', to: searchPath }],
    }
  }

  if (text.includes('rent') || text.includes('rental')) {
    return {
      text: 'Tell me your city, budget, property type, and number of bedrooms. For example: “2 bed apartment for rent in Lahore.”',
      actions: [{ label: 'Rent properties', to: '/rent' }],
    }
  }
  if (text.includes('hello') || text.includes('hi')) {
    return { text: 'Hello! I’m the EstateHub AI assistant. Tell me a city, property type, price range, or purpose to start.' }
  }
  return {
    text: 'I can search the EstateHub listings by city, purpose, property type, bedroom count, and price. Try “3 bed villa for sale in Lahore.”',
  }
}

export default function AIChat() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! I’m your EstateHub AI assistant. Ask me about buying, renting, or selling a property.',
    },
  ])
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, open])

  const sendMessage = (text) => {
    const value = text.trim()
    if (!value) return

    setMessages((current) => [...current, { role: 'user', text: value }])
    setMessage('')
    setTyping(true)

    window.setTimeout(() => {
      setTyping(false)
      setMessages((current) => [...current, { role: 'assistant', ...getReply(value) }])
    }, 550)
  }

  const submit = (event) => {
    event.preventDefault()
    sendMessage(message)
  }

  return (
    <div className={`ai-chat ${open ? 'open' : ''}`}>
      {open && (
        <section className="ai-chat-panel" aria-label="EstateHub AI chat">
          <header className="ai-chat-header">
            <div className="ai-chat-person">
              <span className="ai-chat-avatar"><FaRobot /></span>
              <div>
                <strong>EstateHub AI</strong>
                <span><i /> Online</span>
              </div>
            </div>
            <div className="ai-chat-header-actions">
              {messages.length > 1 && (
                <button
                  type="button"
                  className="ai-chat-close"
                  onClick={() => setMessages([{ role: 'assistant', text: 'Hi! I’m your EstateHub AI assistant. Ask me about buying, renting, or selling a property.' }])}
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  <FaTrash />
                </button>
              )}
              <button type="button" className="ai-chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
                <FaTimes />
              </button>
            </div>
          </header>

          <div className="ai-chat-messages" ref={messagesRef} aria-live="polite">
            {messages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`ai-chat-message ${item.role}`}>
                <span className="ai-chat-message-icon" aria-hidden="true">
                  {item.role === 'assistant' ? <FaRobot /> : <FaUser />}
                </span>
                <div className="ai-chat-content">
                  <p>{item.text}</p>
                  {item.propertyResults && (
                    <div className="ai-chat-results">
                      {item.propertyResults.map((property) => (
                        <button
                          type="button"
                          className="ai-chat-result"
                          key={property.id}
                          onClick={() => { navigate(`/property/${property.id}`); setOpen(false) }}
                        >
                          <span>{property.title}</span>
                          <small>{property.city} · {fmt(property)}</small>
                        </button>
                      ))}
                    </div>
                  )}
                  {item.agentResults && (
                    <div className="ai-chat-results">
                      {item.agentResults.map((agent) => (
                        <button
                          type="button"
                          className="ai-chat-result"
                          key={agent.id}
                          onClick={() => { navigate(`/agent/${agent.id}`); setOpen(false) }}
                        >
                          <span>{agent.name}</span>
                          <small>{agent.city} · {agent.specialty}</small>
                        </button>
                      ))}
                    </div>
                  )}
                  {item.actions && (
                    <div className="ai-chat-actions">
                      {item.actions.map((action) => (
                        <button
                          type="button"
                          key={action.to}
                          onClick={() => { navigate(action.to); setOpen(false) }}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="ai-chat-message assistant">
                <span className="ai-chat-message-icon" aria-hidden="true"><FaRobot /></span>
                <div className="ai-chat-content"><div className="ai-chat-typing"><i /><i /><i /></div></div>
              </div>
            )}
          </div>

          {messages.length === 1 && !typing && (
            <div className="ai-chat-prompts" aria-label="Suggested questions">
              {quickPrompts.map((prompt) => (
                <button type="button" key={prompt} onClick={() => sendMessage(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form className="ai-chat-form" onSubmit={submit}>
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about properties..."
              aria-label="Chat message"
              autoComplete="off"
            />
            <button type="submit" aria-label="Send message" disabled={!message.trim()}>
              <FaPaperPlane />
            </button>
          </form>
        </section>
      )}

      {!open && (
        <button type="button" className="ai-chat-launcher" onClick={() => setOpen(true)} aria-label="Open AI chat">
          <FaComments />
          <span>AI Chat</span>
        </button>
      )}
    </div>
  )
}
