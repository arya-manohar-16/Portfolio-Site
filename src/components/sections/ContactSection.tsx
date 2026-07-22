import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionShell, { ModeCrossfade } from './SectionShell'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react'

export default function ContactSection() {
  const { mode } = usePortfolioMode()
  
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      // Connects to the Express backend (server/index.ts)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000) // Reset after 5s
      } else {
        throw new Error(data.message || 'Failed to send message')
      }
    } catch (error: any) {
      console.error(error)
      setStatus('error')
      setErrorMessage(error.message || 'Network error. Please try again.')
    }
  }

  return (
    <SectionShell id="contact">
      <ModeCrossfade>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Left: Copy */}
          <div>
            <h2 className="font-display text-section mb-6">
              {mode === 'tech' ? (
                <>Let's <span className="gradient-text-tech">Connect</span></>
              ) : (
                <>Start a <span className="gradient-text-edit">Project</span></>
              )}
            </h2>
            <p className="text-section-sub text-text-secondary leading-relaxed mb-8 max-w-md">
              {mode === 'tech'
                ? "Currently open for SDE roles, freelance opportunities, and open-source collaborations. Drop a message and let's build something."
                : "Looking for an editor for your next big event or channel? Let's discuss your vision and how we can bring it to life."
              }
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-text-secondary">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border',
                  mode === 'tech' ? 'bg-tech/10 border-tech/20 text-tech' : 'bg-edit/10 border-edit/20 text-edit'
                )}>
                  <span className="font-mono text-xs">@</span>
                </div>
                <span>m.aryamanohar@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-text-secondary">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border',
                  mode === 'tech' ? 'bg-tech/10 border-tech/20 text-tech' : 'bg-edit/10 border-edit/20 text-edit'
                )}>
                  <span className="font-mono text-xs">Ph</span>
                </div>
                <span>+91 8985370606</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="glass-card p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-text-muted uppercase tracking-wider">Name</label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface-300/50 border border-glass-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-text-muted transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-text-muted uppercase tracking-wider">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-surface-300/50 border border-glass-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-text-muted transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-medium text-text-muted uppercase tracking-wider">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-surface-300/50 border border-glass-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-text-muted transition-colors"
                  placeholder="How can I help?"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-medium text-text-muted uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-surface-300/50 border border-glass-border rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-text-muted transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={cn(
                  'w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-300',
                  mode === 'tech'
                    ? 'bg-tech text-white hover:bg-tech/90 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]'
                    : 'bg-edit text-white hover:bg-edit/90 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]',
                  status === 'submitting' && 'opacity-70 cursor-not-allowed'
                )}
              >
                {status === 'submitting' ? (
                  <><Loader2 size={18} className="animate-spin" /> Sending...</>
                ) : status === 'success' ? (
                  <><CheckCircle size={18} /> Sent Successfully</>
                ) : (
                  <><Send size={18} /> Send Message</>
                )}
              </button>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm mt-2 justify-center">
                  <XCircle size={16} /> {errorMessage}
                </div>
              )}
            </form>
          </div>

        </div>
      </ModeCrossfade>
    </SectionShell>
  )
}
