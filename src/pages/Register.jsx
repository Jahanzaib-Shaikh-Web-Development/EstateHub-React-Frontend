import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock } from 'react-icons/fa'
import AuthLayout, { Field, PasswordField, GoogleButton } from '../components/AuthLayout'
import { read } from '../context/AppContext'
import { isEmail, isPhone } from '../utils/validators'

export default function Register() {
  const nav = useNavigate()
  const [v, setV] = useState({ name: '', email: '', phone: '', password: '', confirm: '', terms: false })
  const [err, setErr] = useState({})
  const on = (e) => { const { name, value, type, checked } = e.target; setV({ ...v, [name]: type === 'checkbox' ? checked : value }) }
  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (v.name.trim().length < 3) x.name = 'Enter your full name'
    if (!isEmail(v.email)) x.email = 'Enter a valid email address'
    if (!isPhone(v.phone)) x.phone = 'Enter a valid phone number'
    if (v.password.length < 8) x.password = 'Password must be at least 8 characters'
    if (v.confirm !== v.password) x.confirm = 'Passwords do not match'
    if (!v.terms) x.terms = 'You must accept the Terms & Conditions'
    const users = read('eh_users', [])
    if (!x.email && users.some((u) => u.email === v.email.toLowerCase())) x.email = 'This email is already registered'
    setErr(x)
    if (Object.keys(x).length) return
    users.push({ name: v.name.trim(), email: v.email.toLowerCase(), phone: v.phone, password: v.password })
    localStorage.setItem('eh_users', JSON.stringify(users))
    nav('/login', { state: { registered: true } })
  }
  return (
    <AuthLayout title="Create Account" subtitle="Join EstateHub and start exploring premium properties.">
      <form onSubmit={submit} noValidate>
        <Field icon={<FaUser />} label="Full Name" name="name" value={v.name} onChange={on} error={err.name} placeholder="John Doe" />
        <Field icon={<FaEnvelope />} label="Email Address" name="email" value={v.email} onChange={on} error={err.email} placeholder="you@example.com" />
        <Field icon={<FaPhoneAlt />} label="Phone Number" name="phone" value={v.phone} onChange={on} error={err.phone} placeholder="0300 1234567" />
        <PasswordField icon={<FaLock />} label="Password" name="password" value={v.password} onChange={on} error={err.password} placeholder="Min. 8 characters" />
        <PasswordField icon={<FaLock />} label="Confirm Password" name="confirm" value={v.confirm} onChange={on} error={err.confirm} placeholder="Repeat password" />
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="terms" name="terms" checked={v.terms} onChange={on} />
          <label className="form-check-label small" htmlFor="terms">I agree to the Terms & Conditions</label>
          {err.terms && <div className="field-error">{err.terms}</div>}
        </div>
        <button type="submit" className="btn btn-gold w-100 py-2">Create Account</button>
        <GoogleButton text="Sign up with Google" />
        <p className="text-center mt-4 mb-0 small">Already have an account? <Link to="/login" className="fw-semibold text-gold">Login</Link></p>
      </form>
    </AuthLayout>
  )
}
