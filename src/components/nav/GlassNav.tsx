import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Mail, Menu, X } from 'lucide-react'
import { usePortfolioMode, type PortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'

export default function GlassNav() {
  const { mode, setMode, isTransitioning } = usePortfolioMode()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleModeSwitch = (newMode: PortfolioMode) => {
    if (isTransitioning) return
    setMode(newMode)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out',
          scrolled ? 'top-2' : 'top-4'
        )}
      >
        <nav
          className={cn(
            'flex items-center gap-2 rounded-pill border transition-all duration-500',
            'backdrop-blur-[20px]',
            scrolled
              ? 'px-3 py-1.5 border-glass-border-hover bg-surface/80'
              : 'px-4 py-2 border-glass-border bg-glass-white',
          )}
        >
          {/* Logo */}
          <a
            href="#"
            className="mr-2 flex items-center justify-center transition-transform hover:scale-105 duration-300"
          >
            <img 
              src="/AM logo.png" 
              alt="Arya Manohar Logo" 
              className="h-8 w-8 rounded-full object-cover shadow-sm ring-2 ring-white/10"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 rounded-lg hover:bg-glass-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mode Toggle — the centerpiece segmented control */}
          <div className="relative flex items-center bg-surface-100 rounded-pill p-0.5 mx-2">
            {/* Sliding indicator */}
            <motion.div
              layoutId="mode-indicator"
              className={cn(
                'absolute top-0.5 bottom-0.5 rounded-pill transition-colors duration-500',
                mode === 'tech'
                  ? 'bg-gradient-to-r from-tech to-tech-light'
                  : 'bg-gradient-to-r from-edit to-edit-light'
              )}
              style={{
                width: 'calc(50% - 2px)',
                left: mode === 'tech' ? '2px' : 'calc(50%)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
            <button
              onClick={() => handleModeSwitch('tech')}
              className={cn(
                'relative z-10 px-4 py-1 text-xs font-semibold tracking-wide uppercase transition-colors duration-300 rounded-pill',
                mode === 'tech' ? 'text-white' : 'text-text-muted hover:text-text-secondary'
              )}
              disabled={isTransitioning}
              aria-label="Switch to Tech mode"
            >
              Tech
            </button>
            <button
              onClick={() => handleModeSwitch('edit')}
              className={cn(
                'relative z-10 px-4 py-1 text-xs font-semibold tracking-wide uppercase transition-colors duration-300 rounded-pill',
                mode === 'edit' ? 'text-white' : 'text-text-muted hover:text-text-secondary'
              )}
              disabled={isTransitioning}
              aria-label="Switch to Edit mode"
            >
              Edit
            </button>

            {/* Toggle Hint */}
            <div className="absolute top-full left-1/2 translate-y-1 translate-x-6 hidden lg:flex items-start gap-1 pointer-events-none opacity-70 animate-pulse">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted mt-1">
                <path d="M24 28C24 20 16 16 8 8" />
                <path d="M16 8H8v8" />
              </svg>
              <span 
                className="text-sm text-text-muted whitespace-nowrap mt-4 italic font-medium" 
                style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}
              >
                {mode === 'tech' ? 'Toggle to see Edit mode' : 'Toggle to see Tech mode'}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-1 ml-2">
            <a
              href="/resume.pdf"
              download
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-pill border transition-all duration-300',
                mode === 'tech'
                  ? 'border-tech/30 text-tech hover:bg-tech/10 hover:border-tech/50'
                  : 'border-edit/30 text-edit hover:bg-edit/10 hover:border-edit/50'
              )}
              aria-label="Download Resume"
            >
              <Download size={14} />
              <span>Resume</span>
            </a>
            <a
              href="#contact"
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-pill transition-all duration-300 text-white',
                mode === 'tech'
                  ? 'bg-gradient-to-r from-tech to-tech-light hover:shadow-tech-glow'
                  : 'bg-gradient-to-r from-edit to-edit-light hover:shadow-edit-glow'
              )}
              aria-label="Contact me"
            >
              <Mail size={14} />
              <span>Contact</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-text-secondary hover:text-text-primary transition-colors ml-1"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-20 left-4 right-4 p-6 rounded-card bg-surface-100 border border-glass-border"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-base text-text-secondary hover:text-text-primary hover:bg-glass-white rounded-glass transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="h-px bg-glass-border my-2" />
                <div className="flex gap-3">
                  <a
                    href="/resume.pdf"
                    download
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-glass border transition-all',
                      mode === 'tech'
                        ? 'border-tech/30 text-tech hover:bg-tech/10'
                        : 'border-edit/30 text-edit hover:bg-edit/10'
                    )}
                  >
                    <Download size={16} />
                    Resume
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-glass text-white transition-all',
                      mode === 'tech'
                        ? 'bg-gradient-to-r from-tech to-tech-light'
                        : 'bg-gradient-to-r from-edit to-edit-light'
                    )}
                  >
                    <Mail size={16} />
                    Contact
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
