import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionShell, { ModeCrossfade } from './SectionShell'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { ExternalLink, ChevronRight, ChevronLeft, Play, BrainCircuit } from 'lucide-react'

// --- Tech Projects ---
const techProjects = [
  {
    id: 'devglance',
    title: 'DevGlance',
    image: '/dev-glance.png',
    type: 'Collaborative Code Editor',
    description: 'A full-stack collaborative coding platform engineered for seamless pair programming. It leverages the Stream SDK for real-time cursor tracking and ultra-low latency sync across secure coding rooms. Features an integrated AI Copilot that assists with debugging, auto-completion, and code generation on the fly across 9 different languages. Built with a heavy focus on performance, scoring 100/100 Best Practices on Lighthouse.',
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
    id: 'echomind',
    title: 'EchoMind',
    type: 'AI Meeting Assistant',
    description: 'A terminal-based multilingual meeting-intelligence pipeline designed to transform raw conversations into structured documentation. It ingests live or recorded audio, processes it through a dual Whisper AI and Sarvam AI transcription engine, and utilizes 7 modular LangChain LCEL pipelines powered by Mistral AI. It effortlessly generates speaker-diarized transcripts, actionable summaries, and semantic insights.',
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
    id: 'portfolio',
    title: 'Interactive Portfolio',
    type: 'Frontend Architecture',
    description: 'The site you are currently viewing. Features a custom state-driven mode toggle, procedural 3D elements, and smooth GSAP-powered scroll reveals.',
    tech: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/arya-manohar-16/Portfolio-Site',
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
    id: 'hyderabad-edit',
    title: 'Hyderabad Cinematic Edit',
    type: 'Travel & Cinematic Film',
    description: 'A dynamic, fast-paced cinematic highlight reel capturing the essence of Hyderabad. Features aggressive speed ramping, smooth transitions, and heavy sound design to create an immersive visual experience.',
    tech: ['Premiere Pro', 'After Effects'],
    links: {
      live: '#',
    },
    features: [
      'Aggressive speed ramping',
      'Advanced sound design',
      'Seamless transitions'
    ],
    video: '/final hyderabad video.mp4'
  },
  {
    id: 'recruiting-soon',
    title: 'Recruitment Teaser',
    type: 'Promotional / Sound Design',
    description: 'An intense, high-energy promotional teaser crafted to build hype for upcoming recruitments. The standout feature is the intricate sound design—I took a single rocket launch audio clip and extensively manipulated its frequency and pitch to generate an entire suite of mind-blowing, cinematic sound effects.',
    tech: ['Premiere Pro', 'After Effects'],
    links: {
      live: '#',
    },
    features: [
      'Custom Foley & SFX',
      'Frequency Manipulation',
      'High-impact pacing'
    ],
    video: '/recruiting soon vid.mov'
  },
  {
    id: 'mhd-documentary',
    title: 'Magneto-Hydro-Dynamics (MHD) Explainer',
    type: 'Documentary & Motion Graphics',
    description: 'An engaging, documentary-style educational video breaking down the complex physics of Magneto-Hydro-Dynamics. It combines kinetic typography, dynamic masking, and rich visual compositing to explain abstract concepts like solar flares and plasma fields.',
    tech: ['After Effects', 'Premiere Pro'],
    links: {
      live: '#',
    },
    features: [
      'Kinetic Typography',
      'Scientific Visualizations',
      'Cinematic Compositing'
    ],
    video: '/mhd final.mp4'
  },
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
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 sm:gap-5"
            >
              {/* Top side: Visual / Media */}
              <div className="flex justify-center w-full">
                <div className="glass-card overflow-hidden group relative flex items-center justify-center w-[90%] sm:w-[70%] lg:w-[60%] max-w-3xl aspect-[16/9] rounded-2xl bg-surface/30 border border-glass-border shadow-lg">
                  {(project as any).video ? (
                    <video 
                      src={(project as any).video}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (project as any).image ? (
                    <img 
                      src={(project as any).image} 
                      alt={project.title} 
                      className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-[1.02] opacity-95 group-hover:opacity-100 drop-shadow-2xl"
                    />
                ) : mode === 'tech' ? (
                  // Tech abstract visual
                  <div className="absolute inset-0 flex items-center justify-center bg-surface-100">
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                      backgroundSize: '24px 24px'
                    }} />
                    <div className="relative z-10 w-[90%] sm:w-3/4 h-[80%] sm:h-3/4 rounded-lg border border-tech/20 bg-surface-200/50 shadow-tech-glow flex flex-col overflow-hidden">
                      <div className="h-8 border-b border-tech/20 bg-surface-300/50 flex items-center px-3 gap-1.5 shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                      </div>
                      <div className="flex-1 p-4 font-mono text-[10px] sm:text-xs text-tech/70 flex flex-col justify-center items-center">
                        {project.id === 'echomind' ? (
                          <>
                            <BrainCircuit size={40} className="mb-3 sm:mb-4 text-tech opacity-80 group-hover:scale-110 transition-transform duration-500" />
                            <div className="font-bold tracking-widest text-tech mb-2">ECHO_MIND // AI_CORE</div>
                            <div className="text-[9px] sm:text-[10px] opacity-70 text-center">
                              {'>'} INITIALIZING AUDIO PIPELINE...<br />
                              {'>'} LOADING LLM MODULES...<br />
                              {'>'} SYSTEM READY.<span className="animate-pulse">_</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-left w-full">
                            {'>'} INITIALIZING {project.id.toUpperCase()}...<br />
                            {'>'} LOADING MODULES...<br />
                            {'>'} SYSTEM READY.<br />
                            <span className="animate-pulse">_</span>
                          </div>
                        )}
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
            </div>

            {/* Bottom side: Details */}
              <div className="flex flex-col w-full">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <h3 className={cn(
                    'font-display text-2xl sm:text-3xl font-bold',
                    mode === 'tech' ? 'text-text-primary' : 'text-text-primary'
                  )}>
                    {project.title}
                  </h3>
                  <div className="text-sm font-mono text-text-muted">
                    {project.type}
                  </div>
                </div>
                
                <p className="text-text-secondary leading-relaxed mb-6 max-w-4xl text-sm sm:text-base">
                  {project.description}
                </p>

                {/* Features List */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                  {project.features.map(feature => (
                    <div key={feature} className="flex items-start gap-2.5 text-sm text-text-muted">
                      <div className={cn(
                        'mt-1.5 w-1.5 h-1.5 rounded-full shrink-0',
                        mode === 'tech' ? 'bg-tech/60 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-edit/60 shadow-[0_0_8px_rgba(249,115,22,0.5)]'
                      )} />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Tech Stack & Action Links */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-6 border-t border-glass-border">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span
                        key={t}
                        className={cn(
                          'px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide',
                          mode === 'tech' 
                            ? 'bg-tech/10 text-tech border border-tech/20'
                            : 'bg-edit/10 text-edit border border-edit/20'
                        )}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 shrink-0">
                    {(project as any).links?.github && (
                      <a
                        href={(project as any).links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors bg-surface-200 hover:bg-surface-300 px-4 py-2 rounded-lg border border-glass-border"
                      >
                        <GithubIcon size={18} /> Source Code
                      </a>
                    )}
                    {project.links?.live && project.links.live !== '#' && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-lg',
                          mode === 'tech' 
                            ? 'bg-tech text-white hover:bg-tech-light shadow-lg shadow-tech/20' 
                            : 'bg-edit text-white hover:bg-edit-light shadow-lg shadow-edit/20'
                        )}
                      >
                        <ExternalLink size={18} /> View Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </ModeCrossfade>
    </SectionShell>
  )
}
