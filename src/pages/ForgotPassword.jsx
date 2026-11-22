import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import AuthLayout, { Field } from '../components/AuthLayout'
import { isEmail } from '../utils/validators'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [err, setErr] = useState('')
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (!isEmail(email)) return setErr('Enter a valid email address')
    setErr(''); setSent(true)
  }
  return (
    <AuthLayout title="Forgot Password?" subtitle="Enter your email and we’ll send you a reset link.">
      {sent ? (
        <div className="alert alert-success d-flex gap-2 align-items-start"><FaCheckCircle className="mt-1" /><span>A password reset link has been sent to <b>{email}</b>. Please check your inbox.</span></div>
      ) : (
        <form onSubmit={submit} noValidate>
          <Field icon={<FaEnvelope />} label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} error={err} placeholder="you@example.com" />
          <button type="submit" className="btn btn-gold w-100 py-2">Send Reset Link</button>
        </form>
      )}
      <p className="text-center mt-4 mb-0"><Link to="/login" className="text-gold fw-semibold"><FaArrowLeft /> Back to Login</Link></p>
    </AuthLayout>
  )
}
