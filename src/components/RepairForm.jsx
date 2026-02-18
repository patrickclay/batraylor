import { useState } from 'react'

const ISSUE_CATEGORIES = [
  'Brakes (pads, rotors, calipers)',
  'Electrical (alternator, starter, battery, charging)',
  'Check engine light / diagnostics',
  'Suspension & steering noise',
  'Cooling system (overheating, leaks, hoses)',
  'No-start / not running',
  'Other',
]

export default function RepairForm() {
  const [form, setForm] = useState({ name: '', phone: '', year: '', make: '', model: '', trim: '', issue: '', details: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'repair', ...form }),
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
      setForm({ name: '', phone: '', year: '', make: '', model: '', trim: '', issue: '', details: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="repair" className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8">
          <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-green-800 mb-2">Thanks! Reid will be in touch soon.</h3>
          <p className="text-green-700">We got your repair request and will reach out shortly.</p>
          <button onClick={() => setStatus('idle')} className="mt-4 text-sm text-green-600 underline">
            Submit another request
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="repair" className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Request a Repair</h2>
      <p className="text-gray-500 text-center mb-8">Tell us what's going on — we'll get back to you fast.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="repair-name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            id="repair-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={update}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
            placeholder="e.g. John Smith"
          />
        </div>

        <div>
          <label htmlFor="repair-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            id="repair-phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={update}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
            placeholder="(470) 555-0123"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="repair-year" className="block text-sm font-medium text-gray-700 mb-1">
              Year <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="repair-year"
              name="year"
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={form.year}
              onChange={update}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
              placeholder="e.g. 2018"
            />
          </div>
          <div>
            <label htmlFor="repair-make" className="block text-sm font-medium text-gray-700 mb-1">Make</label>
            <input
              id="repair-make"
              name="make"
              type="text"
              required
              value={form.make}
              onChange={update}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
              placeholder="e.g. Toyota"
            />
          </div>
          <div>
            <label htmlFor="repair-model" className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <input
              id="repair-model"
              name="model"
              type="text"
              required
              value={form.model}
              onChange={update}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
              placeholder="e.g. Camry"
            />
          </div>
          <div>
            <label htmlFor="repair-trim" className="block text-sm font-medium text-gray-700 mb-1">
              Trim <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="repair-trim"
              name="trim"
              type="text"
              value={form.trim}
              onChange={update}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
              placeholder="e.g. SE, XLE"
            />
          </div>
        </div>

        <div>
          <label htmlFor="repair-issue" className="block text-sm font-medium text-gray-700 mb-1">What's the issue?</label>
          <select
            id="repair-issue"
            name="issue"
            required
            value={form.issue}
            onChange={update}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none bg-white"
          >
            <option value="">Select a category…</option>
            {ISSUE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="repair-details" className="block text-sm font-medium text-gray-700 mb-1">
            Details <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="repair-details"
            name="details"
            rows={3}
            value={form.details}
            onChange={update}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none resize-none"
            placeholder="Describe what's happening, any sounds, warning lights, etc."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-brand-blue text-white font-semibold py-3 rounded-lg hover:bg-brand-blue-light transition disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send Repair Request'}
        </button>

        {status === 'error' && (
          <p className="text-red-600 text-sm text-center">Something went wrong. Please try again or call us directly.</p>
        )}
      </form>
    </section>
  )
}
