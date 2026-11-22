import { useState } from 'react'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import Logo from './Logo'
import { AUTH_IMG } from '../data/properties'

export function Field({ icon, label, error, right, ...p }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-medium small">{label}</label>
      <div className={`input-icon ${error ? 'invalid' : ''}`}>
        <span className="ii">{icon}</span>
        <input className="form-control" {...p} />
        {right}
      </div>
      {error && <div className="field-error">{error}</div>}
    </div>
  )
}

export function PasswordField(props) {
  const [show, setShow] = useState(false)
  return (
    <Field {...props} type={show ? 'text' : 'password'}
      right={<button type="button" className="eye" onClick={() => setShow(!show)} aria-label="Show or hide password">{show ? <FaEyeSlash /> : <FaEye />}</button>} />
  )
}

export function GoogleButton({ text }) {
  const [msg, setMsg] = useState('')
  return (
    <>
      <div className="divider"><span>or</span></div>
      <button type="button" className="btn btn-google w-100" onClick={() => setMsg('Google sign-in is a UI demo in this frontend-only project.')}>
        <FaGoogle className="me-2" style={{ color: '#DB4437' }} /> {text}
      </button>
      {msg && <div className="small text-muted text-center mt-2">{msg}</div>}
    </>
  )
}

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-wrap">
      <div className="auth-side d-none d-lg-flex" style={{ backgroundImage: `linear-gradient(rgba(16,42,67,.75),rgba(16,42,67,.9)),url(${AUTH_IMG})` }}>
        <Logo light />
        <div>
          <h2>Discover Luxury Living with EstateHub</h2>
          <p>Thousands of verified homes, villas and commercial spaces across Pakistan — all in one place.</p>
        </div>
        <small className="text-white-50">© EstateHub</small>
      </div>
      <div className="auth-form">
        <div className="auth-box">
          <div className="d-lg-none mb-4"><Logo /></div>
          <h2>{title}</h2>
          <p className="text-muted mb-4">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  )
}
