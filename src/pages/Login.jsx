import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import AuthLayout, { Field, PasswordField, GoogleButton } from '../components/AuthLayout'
import { useApp, read } from '../context/AppContext'
import { isEmail } from '../utils/validators'

const DEMO = { name: 'Demo User', email: 'demo@estatehub.pk', password: 'Demo@123' }

export default function Login() {
  const nav = useNavigate()
  const { state } = useLocation()
  const { login } = useApp()
  const [v, setV] = useState({ email: '', password: '', remember: false })
  const [err, setErr] = useState({})
  const on = (e) => { const { name, value, type, checked } = e.target; setV({ ...v, [name]: type === 'checkbox' ? checked : value }) }
  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (!isEmail(v.email)) x.email = 'Enter a valid email address'
    if (!v.password) x.password = 'Password is required'
    if (!Object.keys(x).length) {
      const users = [DEMO, ...read('eh_users', [])]
      const u = users.find((q) => q.email === v.email.toLowerCase() && q.password === v.password)
      if (u) { login({ name: u.name, email: u.email }); return nav('/') }
      x.form = 'Invalid email or password.'
    }
    setErr(x)
  }
  return (
    <AuthLayout title="Welcome Back" subtitle="Login to your EstateHub account.">
      {state?.registered && <div className="alert alert-success py-2 small">Account created! Please login.</div>}
      {err.form && <div className="alert alert-danger py-2 small">{err.form}</div>}
      <form onSubmit={submit} noValidate>
        <Field icon={<FaEnvelope />} label="Email Address" name="email" value={v.email} onChange={on} error={err.email} placeholder="you@example.com" />
        <PasswordField icon={<FaLock />} label="Password" name="password" value={v.password} onChange={on} error={err.password} placeholder="Your password" />
        <div className="d-flex justify-content-between mb-3 small">
          <div className="form-check"><input className="form-check-input" type="checkbox" id="rem" name="remember" checked={v.remember} onChange={on} /><label htmlFor="rem" className="form-check-label">Remember me</label></div>
          <Link to="/forgot-password" className="text-gold fw-medium">Forgot Password?</Link>
        </div>
        <button type="submit" className="btn btn-gold w-100 py-2">Login</button>
        <GoogleButton text="Continue with Google" />
        <p className="text-center mt-4 mb-1 small">Don’t have an account? <Link to="/register" className="fw-semibold text-gold">Create Account</Link></p>
        <p className="text-center text-muted small mb-0">Demo: demo@estatehub.pk / Demo@123</p>
      </form>
    </AuthLayout>
  )
}
