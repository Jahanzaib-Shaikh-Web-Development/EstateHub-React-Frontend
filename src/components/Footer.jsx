import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="eh-footer">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <Logo light />
            <p className="mt-3 text-white-50">EstateHub is Pakistan’s premium real estate marketplace to buy, sell and rent residential and commercial properties with confidence.</p>
            <div className="d-flex gap-2">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((I, i) => <a key={i} href="#!" className="social"><I /></a>)}
            </div>
          </div>
          <div className="col-6 col-lg-2">
            <h6>Explore</h6>
            <ul className="list-unstyled">
              <li><Link to="/buy">Buy Properties</Link></li><li><Link to="/rent">Rent Properties</Link></li>
              <li><Link to="/sell">Sell Property</Link></li><li><Link to="/search">Advanced Search</Link></li>
              <li><Link to="/properties">All Listings</Link></li>
            </ul>
          </div>
          <div className="col-6 col-lg-2">
            <h6>Company</h6>
            <ul className="list-unstyled">
              <li><Link to="/about">About Us</Link></li><li><Link to="/agents">Agents</Link></li>
              <li><Link to="/blog">Blog & News</Link></li><li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h6>Get in Touch</h6>
            <ul className="list-unstyled contact-list">
              <li><FaMapMarkerAlt /> Plot 12, Main Boulevard, DHA, Karachi</li>
              <li><FaPhoneAlt /> +92 21 111 378 428</li>
              <li><FaEnvelope /> info@estatehub.pk</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center py-3">© {new Date().getFullYear()} EstateHub. All rights reserved. Frontend demo project.</div>
    </footer>
  )
}
