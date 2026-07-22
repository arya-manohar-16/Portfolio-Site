import { Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Code2, Play } from 'lucide-react'
import { GithubIcon, LinkedinIcon, CodeforcesIcon } from '@/components/icons/BrandIcons'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'

const Scene3D = lazy(() => import('./Scene3D'))

/* ──────────────────────────────────────
   Loading placeholder while 3D loads
   ────────────────────────────────────── */
function SceneLoader() {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center">
      <div className="relative">
        {/* Pulsing ring */}
        <div className="w-32 h-32 rounded-full border border-tech/20 animate-pulse-glow" />
        <div className="absolute inset-2 rounded-full border border-tech/10 animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
        <div className="absolute inset-4 rounded-full border border-tech/5 animate-pulse-glow" style={{ animationDelay: '1s' }} />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-tech/50 animate-pulse-glow" />
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────
   Content variants for Tech vs Edit
   ────────────────────────────────────── */
const techContent = {
  title: 'Arya Manohar',
  subtitle: 'SDE & Generative AI Engineer',
  description: 'Building intelligent systems with RAG, LangChain, and full-stack engineering. 3rd year EE @ MANIT Bhopal.',
  cta1: { label: 'View Projects', icon: Code2, href: '#projects' },
  cta2: { label: 'Download Resume', href: '/resume.pdf', download: true },
}

const editContent = {
  title: 'Arya Manohar',
  subtitle: 'Video Editor & Motion Designer',
  description: 'Crafting compelling visual stories for Roobaroo Cultural Society. 110K+ views across edited content.',
  cta1: { label: 'View Reel', icon: Play, href: '#projects' },
  cta2: { label: 'Contact Me', href: '#contact', download: false },
}

/* ──────────────────────────────────────
   Hero Section
   ────────────────────────────────────── */
export default function HeroSection() {
  const { mode, isTransitioning } = usePortfolioMode()
  const content = mode === 'tech' ? techContent : editContent

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 -z-[5] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface" />
        <div
          className={cn(
            'absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[120px] opacity-[0.07] transition-colors duration-1000',
            mode === 'tech' ? 'bg-tech' : 'bg-edit'
          )}
        />
      </div>

      <div className={cn(
        "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center",
        mode === 'tech' ? "lg:flex-row" : "lg:flex-row-reverse"
      )}>
        
        {/* 3D Background */}
        <motion.div 
          layout 
          transition={{ layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative"
        >
          <Suspense fallback={<SceneLoader />}>
            <Scene3D />
          </Suspense>
        </motion.div>

        {/* Content */}
        <motion.div 
          layout 
          transition={{ layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left relative"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={mode}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.3 } }}
              className="space-y-6 flex flex-col items-center lg:items-start w-full"
            >


            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-hero"
            >
              {content.title}
            </motion.h1>

            {/* Subtitle with gradient */}
            <motion.p
              variants={itemVariants}
              className={cn(
                'font-display text-hero-sub font-medium',
                mode === 'tech' ? 'gradient-text-tech' : 'gradient-text-edit'
              )}
            >
              {content.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-section-sub text-text-secondary max-w-2xl mx-auto"
            >
              {content.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <a
                href={content.cta1.href}
                className={cn(
                  'group flex items-center gap-2 px-6 py-3 rounded-pill text-sm font-semibold text-white transition-all duration-300',
                  mode === 'tech'
                    ? 'bg-gradient-to-r from-tech to-tech-light hover:shadow-tech-glow'
                    : 'bg-gradient-to-r from-edit to-edit-light hover:shadow-edit-glow'
                )}
              >
                <content.cta1.icon size={18} className="transition-transform group-hover:scale-110" />
                {content.cta1.label}
              </a>
              <a
                href={content.cta2.href}
                {...(content.cta2.download ? { download: true } : {})}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-pill text-sm font-semibold border transition-all duration-300',
                  mode === 'tech'
                    ? 'border-tech/30 text-tech hover:bg-tech/10 hover:border-tech/50'
                    : 'border-edit/30 text-edit hover:bg-edit/10 hover:border-edit/50'
                )}
              >
                {content.cta2.label}
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-4 pt-6"
            >
              {[
                { icon: GithubIcon, href: 'https://github.com/arya-manohar-16', label: 'GitHub' },
                { icon: LinkedinIcon, href: 'https://linkedin.com/in/arya-manohar', label: 'LinkedIn' },
                { icon: CodeforcesIcon, href: 'https://codeforces.com/profile/arya_manohar_16', label: 'Codeforces' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    'p-2.5 rounded-xl border transition-all duration-300',
                    'border-glass-border text-text-muted hover:text-text-primary',
                    mode === 'tech'
                      ? 'hover:border-tech/30 hover:bg-tech/5 hover:text-tech'
                      : 'hover:border-edit/30 hover:bg-edit/5 hover:text-edit'
                  )}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  )
}
