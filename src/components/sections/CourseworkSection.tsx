import { motion } from 'framer-motion'
import SectionShell, { ModeCrossfade } from './SectionShell'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'
import { BookOpen, Cpu, Database, Brain, Code2, Film, Palette, Music, Sparkles, Layers, Network } from 'lucide-react'

const techCourses = [
  { name: 'Data Structures & Algorithms', icon: Code2, description: 'Advanced problem solving, trees, graphs' },
  { name: 'Object-Oriented Programming', icon: Layers, description: 'Design patterns, SOLID principles, polymorphism' },
  { name: 'Operating Systems', icon: Cpu, description: 'Process scheduling, memory management, concurrency' },
  { name: 'Machine Learning', icon: Brain, description: 'Supervised/unsupervised learning, neural networks' },
  { name: 'Database Management System', icon: Database, description: 'SQL, normalization, query optimization, indexing' },
  { name: 'System Design (HLD)', icon: Network, description: 'Microservices, scalability, load balancing, caching' },
]

const editPhilosophy = [
  { name: 'Storytelling First', icon: Film, description: 'Every cut, transition, and effect serves the narrative' },
  { name: 'Visual Rhythm', icon: Music, description: 'Editing to the beat — syncing visuals with audio for emotional impact' },
  { name: 'Color as Emotion', icon: Palette, description: 'Deliberate color grading to set mood and tone' },
  { name: 'Less is More', icon: Sparkles, description: 'Clean edits over flashy effects — letting the content breathe' },
]

export default function CourseworkSection() {
  const { mode } = usePortfolioMode()
  const items = mode === 'tech' ? techCourses : editPhilosophy

  return (
    <SectionShell id="coursework">
      <ModeCrossfade>
        <h2 className="font-display text-section mb-4">
          {mode === 'tech' ? (
            <>Core <span className="gradient-text-tech">Coursework</span></>
          ) : (
            <>Editing <span className="gradient-text-edit">Philosophy</span></>
          )}
        </h2>
        <p className="text-section-sub text-text-secondary mb-10 max-w-2xl">
          {mode === 'tech'
            ? 'Key courses that built my engineering foundation.'
            : 'The principles that guide every frame I touch.'
          }
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={cn(
                'glass-card p-5 group cursor-default',
                'hover:scale-[1.02] transition-transform duration-300'
              )}
            >
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300',
                mode === 'tech'
                  ? 'bg-tech/10 text-tech group-hover:bg-tech/20'
                  : 'bg-edit/10 text-edit group-hover:bg-edit/20'
              )}>
                <item.icon size={20} />
              </div>
              <h3 className="font-display text-sm font-semibold text-text-primary mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </ModeCrossfade>
    </SectionShell>
  )
}
