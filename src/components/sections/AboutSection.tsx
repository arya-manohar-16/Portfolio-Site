import { motion } from 'framer-motion'
import SectionShell, { ModeCrossfade } from './SectionShell'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { useCountUp } from '@/hooks/useCountUp'
import { cn } from '@/lib/utils'
import { GraduationCap, MapPin, Briefcase } from 'lucide-react'

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const { mode } = usePortfolioMode()
  // Extract number from value for animation
  const numMatch = value.match(/([\d.]+)/)
  const num = numMatch ? parseFloat(numMatch[1]) : 0
  const prefix = value.match(/^([^\d]*)/)?.[1] || ''
  const suffix = value.match(/[\d.]+(.*)$/)?.[1] || ''

  const { ref, display } = useCountUp({ end: num, prefix, suffix, duration: 2, decimals: value.includes('.') ? 2 : 0 })

  return (
    <div
      ref={ref}
      className={cn(
        'glass-card p-5 text-center group',
        'hover:scale-[1.02] transition-transform duration-300'
      )}
    >
      <div
        className={cn(
          'font-display text-2xl md:text-3xl font-bold mb-1',
          mode === 'tech' ? 'gradient-text-tech' : 'gradient-text-edit'
        )}
      >
        {display}
      </div>
      <div className="text-xs text-text-muted uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}

export default function AboutSection() {
  const { mode } = usePortfolioMode()

  return (
    <SectionShell id="about">
      <ModeCrossfade>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-section mb-6">
              {mode === 'tech' ? (
                <>About <span className="gradient-text-tech">Me</span></>
              ) : (
                <>About <span className="gradient-text-edit">Me</span></>
              )}
            </h2>
            <p className="text-section-sub text-text-secondary leading-relaxed mb-6">
              {mode === 'tech'
                ? "3rd-year Electrical Engineering student at MANIT Bhopal (CGPA 8.90) with a passion for building intelligent systems. Specializing in Generative AI (RAG, LangChain) and full-stack development, with a strong foundation in competitive programming."
                : "Video Editing Head at Roobaroo Cultural Society, MANIT Bhopal. Passionate about crafting compelling visual narratives that resonate with audiences. Leading a team to produce content that has amassed over 110K+ views."
              }
            </p>

            {/* Info pills */}
            <div className="flex flex-wrap gap-3">
              {(mode === 'tech'
                ? [
                    { icon: GraduationCap, text: 'MANIT Bhopal • EE' },
                    { icon: MapPin, text: 'Bhopal, India' },
                    { icon: Briefcase, text: 'Open to SDE & AI roles' },
                  ]
                : [
                    { icon: GraduationCap, text: 'MANIT Bhopal' },
                    { icon: MapPin, text: 'Bhopal, India' },
                    { icon: Briefcase, text: 'Available for projects' },
                  ]
              ).map((item) => (
                <motion.span
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1.5 rounded-pill text-xs border',
                    mode === 'tech'
                      ? 'border-tech/15 bg-tech/5 text-tech-light'
                      : 'border-edit/15 bg-edit/5 text-edit-light'
                  )}
                >
                  <item.icon size={13} />
                  {item.text}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Animated stat counters */}
          <div className="grid grid-cols-2 gap-4">
            {(mode === 'tech'
              ? [
                  { value: '8.90', label: 'CGPA' },
                  { value: '1712', label: 'LC Rating' },
                  { value: '400+', label: 'Problems Solved' },
                  { value: '12.72%', label: 'Top Percentile' },
                ]
              : [
                  { value: '110K+', label: 'Total Views' },
                  { value: '10+', label: 'Projects' },
                  { value: '2+', label: 'Years Experience' },
                  { value: '1', label: 'Roobaroo Head' },
                ]
            ).map((stat) => (
              <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </ModeCrossfade>
    </SectionShell>
  )
}
