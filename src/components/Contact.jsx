import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'
import SectionKicker from './SectionKicker.jsx'

const EMAIL = 'pramanickranit356@gmail.com'
const GITHUB_URL = 'https://github.com/Ranit-Ani'
const LINKEDIN_URL = 'https://www.linkedin.com/in/ranit-ani'

// EmailJS credentials — get these from your EmailJS dashboard
// (Email Services → Service ID, Email Templates → Template ID,
// Account → General → Public Key) and put them in a `.env` file
// as VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and
// VITE_EMAILJS_PUBLIC_KEY. Never commit the .env file.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.message.trim()) errors.message = 'Please add a short message.'
  else if (values.message.trim().length < 10)
    errors.message = 'Message should be at least 10 characters.'
  return errors
}

export default function Contact() {
  const formRef = useRef(null)
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error(
        'EmailJS is not configured — set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in your .env file.'
      )
      setStatus('error')
      return
    }

    setStatus('sending')
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY }).then(
      () => {
        setStatus('sent')
        setValues({ name: '', email: '', message: '' })
      },
      (err) => {
        console.error('EmailJS send failed:', err)
        setStatus('error')
      }
    )
  }

  return (
    <section id="contact" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <SectionKicker index={6} label="Contact" />
            <h2 className="font-display mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Have an idea? Let&rsquo;s build something together.
            </h2>
            <p className="mt-4 max-w-md text-mist">
              Whether it&rsquo;s a project, an internship, or just a technical conversation
              &mdash; I&rsquo;d like to hear from you.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-mist-light transition-colors hover:border-signal-violet/40 hover:text-white"
              >
                <Mail size={17} /> {EMAIL}
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-mist-light transition-colors hover:border-signal-violet/40 hover:text-white"
              >
                <Github size={17} /> github.com/Ranit-Ani
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-mist-light transition-colors hover:border-signal-violet/40 hover:text-white"
              >
                <Linkedin size={17} /> linkedin.com/in/ranit-ani
              </a>
            </div>
          </motion.div>

          <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={onSubmit}
            noValidate
            className="card-surface space-y-5 rounded-2xl p-6 sm:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-medium text-mist-light">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={onChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-mist-dim focus:border-signal-violet/50"
                placeholder="Your name"
              />
              {errors.name && (
                <p id="name-error" className="mt-1.5 text-xs text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-medium text-mist-light">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={onChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-mist-dim focus:border-signal-violet/50"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-xs font-medium text-mist-light">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={values.message}
                onChange={onChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-mist-dim focus:border-signal-violet/50"
                placeholder="Tell me a bit about what you're building..."
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-xs text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal-violet px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <Send size={15} />
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'sent' && (
              <p role="status" className="text-center text-xs text-emerald-400">
                Thanks for reaching out &mdash; your message has been sent. I&rsquo;ll get back to
                you soon.
              </p>
            )}

            {status === 'error' && (
              <p role="status" className="text-center text-xs text-red-400">
                Something went wrong sending your message. Please try again, or email me directly
                at {EMAIL}.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}