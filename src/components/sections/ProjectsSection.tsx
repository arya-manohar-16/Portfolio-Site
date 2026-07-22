import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionShell, { ModeCrossfade } from './SectionShell'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { ExternalLink, ChevronRight, ChevronLeft, Play } from 'lucide-react'

// --- Tech Projects ---
const techProjects = [
  {
    id: 'echomind',
    title: 'EchoMind',
    type: 'AI Meeting Assistant',
    description: 'A terminal-based multilingual meeting-intelligence pipeline using Whisper AI and Sarvam AI. Features 7 modular LangChain LCEL pipelines powered by Mistral AI.',
    tech: ['Python', 'LangChain', 'Whisper AI', 'Sarvam AI', 'Mistral AI', 'ChromaDB'],
    links: {
      github: 'https://github.com/arya-manohar-16/EchoMind',
    },
    features: [
      'Dual-engine Whisper/Sarvam transcription',
      '7 modular LCEL pipelines (Mistral AI)',
      'RAG with ChromaDB & HuggingFace'
    ]
  },
  {
    id: 'devglance',
    title: 'DevGlance',
    type: 'Collaborative Code Editor',
    description: 'A full-stack collaborative coding platform with real-time pair programming via Stream SDK, an integrated AI Assistant, and secure rooms. Scored 100/100 Best Practices on Lighthouse.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Monaco', 'Tailwind'],
    links: {
      github: 'https://github.com/arya-manohar-16/DevGlance',
      live: 'https://dev-glance.vercel.app/',
    },
    features: [
      'Real-time pair programming (<120ms sync)',
      'AI Assistant supporting 9 languages',
      '8 RESTful API endpoints with Clerk Auth'
    ]
  },
  {
    id: 'portfolio',
    title: 'Interactive Portfolio',
    type: 'Frontend Architecture',
    description: 'The site you are currently viewing. Features a custom state-driven mode toggle, procedural 3D elements, and smooth GSAP-powered scroll reveals.',
    tech: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/arya-manohar-16/portfolio',
      live: '#',
    },
    features: [
      'Zero-model procedural 3D scene',
      'State-synced URL routing',
      'Accessible reduced-motion support'
    ]
  }
]

// --- Edit Projects ---
const editProjects = [
  {
    id: 'roobaroo-aftermovie',
    title: 'Roobaroo Cultural Fest Aftermovie',
    type: 'Event Highlight Reel',
    description: 'The official aftermovie for MANIT\'s premier cultural fest. Paced to high-energy electronic tracks with dynamic speed ramping and custom color grading.',
    tech: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    links: {
      live: '#', // Placeholder for YT link
    },
    features: [
      'Sync-to-beat cutting',
      'Teal & Orange cinematic grade',
      'Motion tracked typography'
    ],
    videoPlaceholder: '110K+ Views • 2:45 Duration'
  },
  {
    id: 'astro-promo',
    title: 'Astro Alliance Promo',
    type: 'Motion Graphics / 3D',
    description: 'A promotional video for the astronomy society featuring deep space visual composites and sleek HUD animations.',
    tech: ['After Effects', 'Blender', 'Illustrator'],
    links: {
      live: '#',
    },
    features: [
      '3D camera tracking',
      'HUD element design',
      'Sound design & foley'
    ],
    videoPlaceholder: 'Event Teaser • 0:45 Duration'
  }
]

export default function ProjectsSection() {
  const { mode } = usePortfolioMode()
  const projects = mode === 'tech' ? techProjects : editProjects
  const [currentIndex, setCurrentIndex] = useState(0)

  // Ensure index is valid when switching modes
  if (currentIndex >= projects.length) setCurrentIndex(0)

  const project = projects[currentIndex]

  const nextProject = () => setCurrentIndex((prev) => (prev + 1) % projects.length)
  const prevProject = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)

  return (
    <SectionShell id="projects">
      <ModeCrossfade>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display text-section mb-4">
              {mode === 'tech' ? (
                <>Selected <span className="gradient-text-tech">Projects</span></>
              ) : (
                <>Featured <span className="gradient-text-edit">Edits</span></>
              )}
            </h2>
            <p className="text-section-sub text-text-secondary max-w-xl">
              {mode === 'tech'
                ? 'A collection of full-stack applications and AI pipelines.'
                : 'Selected cuts, motion graphics, and event films.'
              }
            </p>
          </div>
          
          {/* Carousel Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevProject}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center border transition-all',
                'border-glass-border hover:bg-white/5 text-text-secondary hover:text-text-primary'
              )}
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-sm font-mono text-text-muted">
              {currentIndex + 1} / {projects.length}
            </div>
            <button
              onClick={nextProject}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center border transition-all',
                'border-glass-border hover:bg-white/5 text-text-secondary hover:text-text-primary'
              )}
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Project Showcase Area */}
        <div className="relative min-h-[500px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 grid lg:grid-cols-[1.2fr_1fr] gap-6"
            >
              {/* Left side: Visual / Media */}
              <div className="glass-card overflow-hidden group relative flex flex-col h-full min-h-[300px]">
                {mode === 'tech' ? (
                  // Tech abstract visual
                  <div className="absolute inset-0 flex items-center justify-center bg-surface-100">
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                      backgroundSize: '24px 24px'
                    }} />
                    <div className="relative z-10 w-3/4 h-3/4 rounded-lg border border-tech/20 bg-surface-200/50 shadow-tech-glow flex flex-col overflow-hidden">
                      <div className="h-8 border-b border-tech/20 bg-surface-300/50 flex items-center px-3 gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                      </div>
                      <div className="flex-1 p-4 font-mono text-[10px] sm:text-xs text-tech/70">
                        {'>'} INITIALIZING {project.id.toUpperCase()}...<br />
                        {'>'} LOADING MODULES...<br />
                        {'>'} SYSTEM READY.<br />
                        <span className="animate-pulse">_</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Video placeholder visual
                  <div className="absolute inset-0 flex items-center justify-center bg-surface-100">
                    <div className="absolute inset-0 bg-gradient-to-tr from-edit/10 to-transparent" />
                    <button className="relative z-10 w-16 h-16 rounded-full bg-edit/20 border border-edit/30 flex items-center justify-center text-edit backdrop-blur-md group-hover:scale-110 group-hover:bg-edit/30 transition-all duration-300">
                      <Play size={24} className="ml-1" fill="currentColor" />
                    </button>
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <span className="px-3 py-1.5 rounded-full bg-surface-300/80 backdrop-blur-sm text-xs font-medium text-text-primary border border-white/10">
                        {(project as any).videoPlaceholder}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right side: Details */}
              <div className="flex flex-col justify-center py-4 lg:px-6">
                <div className="text-sm font-mono text-text-muted mb-2">
                  {project.type}
                </div>
                <h3 className={cn(
                  'font-display text-2xl sm:text-3xl font-bold mb-4',
                  mode === 'tech' ? 'text-text-primary' : 'text-text-primary'
                )}>
                  {project.title}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {project.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-text-muted">
                      <div className={cn(
                        'mt-1 w-1.5 h-1.5 rounded-full shrink-0',
                        mode === 'tech' ? 'bg-tech/60' : 'bg-edit/60'
                      )} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className={cn(
                        'px-2.5 py-1 rounded-md text-xs font-medium',
                        mode === 'tech' 
                          ? 'bg-tech/10 text-tech border border-tech/20'
                          : 'bg-edit/10 text-edit border border-edit/20'
                      )}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex gap-4 mt-auto">
                  {(project.links as any).github && (
                    <a
                      href={(project.links as any).github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <GithubIcon size={18} /> Source Code
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'flex items-center gap-2 text-sm font-medium transition-colors',
                        mode === 'tech' ? 'text-tech hover:text-tech-light' : 'text-edit hover:text-edit-light'
                      )}
                    >
                      <ExternalLink size={18} /> View Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </ModeCrossfade>
    </SectionShell>
  )
}
