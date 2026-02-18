import { useState } from 'react'

const BUDGET_OPTIONS = [
  'Under $5,000',
  '$5,000 – $10,000',
  'Over $10,000',
  'Not sure / flexible',
]

export default function CarFinderForm() {
  const [form, setForm] = useState({ name: '', phone: '', budget: '', preferences: '' })
  const [status, setStatus] = useState('idle')

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'car-finder', ...form }),
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
      setForm({ name: '', phone: '', budget: '', preferences: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="car-finder" className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-green-50 border border-green-200 rounded-xl p-8">
            <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-green-800 mb-2">Thanks! Reid will be in touch soon.</h3>
            <p className="text-green-700">We'll start looking for the right car for you.</p>
            <button onClick={() => setStatus('idle')} className="mt-4 text-sm text-green-600 underline">
              Submit another request
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="car-finder" className="bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Help Me Find a Car</h2>
        <p className="text-gray-500 text-center mb-8">
          Tell us what you're looking for and your budget — Reid will find you a quality ride.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="car-name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              id="car-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={update}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
              placeholder="e.g. Jane Doe"
            />
          </div>

          <div>
            <label htmlFor="car-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              id="car-phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={update}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
              placeholder="(470) 555-0123"
            />
          </div>

          <div>
            <label htmlFor="car-budget" className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
            <select
              id="car-budget"
              name="budget"
              required
              value={form.budget}
              onChange={update}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-white"
            >
              <option value="">Select a range…</option>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="car-preferences" className="block text-sm font-medium text-gray-700 mb-1">
              What are you looking for? <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id="car-preferences"
              name="preferences"
              rows={3}
              value={form.preferences}
              onChange={update}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none resize-none"
              placeholder="Type of vehicle, features, color preferences, etc."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-brand-blue text-white font-semibold py-3 rounded-lg hover:bg-brand-blue-light transition disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Send Car Request'}
          </button>

          {status === 'error' && (
            <p className="text-red-600 text-sm text-center">Something went wrong. Please try again or call us directly.</p>
          )}
        </form>
      </div>
    </section>
  )
}
