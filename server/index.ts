import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-production-domain.com'] // Update this on deployment

    
    : ['http://localhost:3000', 'http://127.0.0.1:3000']
}))
app.use(express.json())

// --- Phase 5 API Endpoint ---
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // 1. Validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    
      // ==========================================
      // TODO (Phase 5 actual deployment integration):
      // 1. Install Supabase: npm i @supabase/supabase-js
      // 2. Install Resend: npm i resend
      // ==========================================

      

      const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
      const resend = new Resend(process.env.RESEND_API_KEY!)

      // 2. Store in Supabase
      const { error: dbError } = await supabase
        .from('contacts')
        .insert([{ name, email, subject, message }])
      
      if (dbError) throw dbError

      // 3. Send Email via Resend
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL!,
        subject: `New Contact: ${subject || 'Portfolio Inquiry'}`,
        html: `
          <h3>New Message from ${name} (${email})</h3>
          <p>${message}</p>
        `
      })
    

    // For local dev without keys, we mock a successful network delay
    console.log('\n=== New Contact Form Submission ===')
    console.log(`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`)
    console.log('===================================\n')
    
    await new Promise(resolve => setTimeout(resolve, 1500))

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! (Mocked response)' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    })
  }
})

// Health check route
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
})
