import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const RATE_LIMIT = new Map()
const RATE_WINDOW = 60_000
const RATE_MAX = 3

function isRateLimited(ip) {
  const now = Date.now()
  const entries = RATE_LIMIT.get(ip) || []
  const recent = entries.filter((t) => now - t < RATE_WINDOW)
  if (recent.length >= RATE_MAX) return true
  recent.push(now)
  RATE_LIMIT.set(ip, recent)
  return false
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  const { type, name, phone, year, make, model, trim, issue, details, budget, preferences } = req.body

  if (!name || !phone || !type) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const isRepair = type === 'repair'
  const subject = isRepair
    ? `New Repair Request from ${name}`
    : `New Car Finder Request from ${name}`

  const vehicle = isRepair
    ? [year, make, model, trim].filter(Boolean).join(' ') || 'Not specified'
    : null

  const body = isRepair
    ? `<h2>New Repair Request</h2>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Phone:</strong> ${phone}</p>
       <p><strong>Vehicle:</strong> ${vehicle}</p>
       <p><strong>Issue:</strong> ${issue || 'Not specified'}</p>
       <p><strong>Details:</strong> ${details || 'None provided'}</p>`
    : `<h2>New Car Finder Request</h2>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Phone:</strong> ${phone}</p>
       <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
       <p><strong>Preferences:</strong> ${preferences || 'None provided'}</p>`

  try {
    await resend.emails.send({
      from: 'Bring A Traylor <onboarding@resend.dev>',
      to: 'traylormotorsports@gmail.com',
      replyTo: 'traylormotorsports@gmail.com',
      subject,
      html: body,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
