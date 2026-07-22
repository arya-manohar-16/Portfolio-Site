import { motion } from 'framer-motion'
import SectionShell, { ModeCrossfade } from './SectionShell'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'
import { Calendar, Users, Film, Palette } from 'lucide-react'

const techExperience = [
  {
    role: 'Video Editing Head',
    org: 'Roobaroo Cultural Society',
    period: 'Feb 2024 – Present',
    icon: Film,
    description: 'Leading a team of editors to produce high-quality event coverage and promotional content for MANIT\'s premier cultural society. Managing end-to-end video production pipeline.',
    highlights: ['Team Leadership', 'Content Strategy', 'Production Pipeline'],
  },
  {
    role: 'Designing Head',
    org: 'Astro Alliance',
    period: 'April 2024 – Present',
    icon: Palette,
    description: 'Heading design operations for the astronomy and space society. Creating visual identities, social media content, and event materials.',
    highlights: ['Visual Identity', 'Social Media Design', 'Event Branding'],
  },
]

const editExperience = [
  {
    role: 'Video Editing Head',
    org: 'Roobaroo Cultural Society',
    period: 'Feb 2024 – Present',
    icon: Film,
    description: 'Spearheading all video production — from concept to color-graded final cuts. Built a team workflow that reduced turnaround time by 40%. Content has garnered 110K+ combined views.',
    highlights: ['110K+ Views', 'Team of 5 Editors', 'Event Films', 'Reels & Shorts'],
  },
  {
    role: 'Designing Head',
    org: 'Astro Alliance',
    period: 'April 2024 – Present',
    icon: Palette,
    description: 'Creating all visual assets — posters, thumbnails, social media graphics, and motion graphics for events and online presence.',
    highlights: ['Motion Graphics', 'Poster Design', 'Thumbnails', 'Brand Identity'],
  },
]

export default function ExperienceSection() {
  const { mode } = usePortfolioMode()
  const experiences = mode === 'tech' ? techExperience : editExperience

  if (mode === 'tech') return null

  return (
    <SectionShell id="experience">
      <ModeCrossfade>
        <h2 className="font-display text-section mb-4">
          {mode === 'tech' ? (
            <>Experience & <span className="gradient-text-tech">Leadership</span></>
          ) : (
            <>Creative <span className="gradient-text-edit">Experience</span></>
          )}
        </h2>
        <p className="text-section-sub text-text-secondary mb-12 max-w-2xl">
          {mode === 'tech'
            ? 'Leadership roles that complement my technical skills.'
            : 'Where my creative work comes to life.'
          }
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className={cn(
            'absolute left-[19px] top-0 bottom-0 w-px hidden sm:block',
            mode === 'tech'
              ? 'bg-gradient-to-b from-tech/40 via-tech/20 to-transparent'
              : 'bg-gradient-to-b from-edit/40 via-edit/20 to-transparent'
          )} />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.org}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="relative sm:pl-12"
              >
                {/* Timeline dot */}
                <div className={cn(
                  'absolute left-[11px] top-6 w-4 h-4 rounded-full border-2 hidden sm:block',
                  mode === 'tech'
                    ? 'border-tech bg-surface shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                    : 'border-edit bg-surface shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                )} />

                <div className="glass-card p-6 hover:scale-[1.01] transition-transform duration-300">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                      mode === 'tech' ? 'bg-tech/10 text-tech' : 'bg-edit/10 text-edit'
                    )}>
                      <exp.icon size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                        <h3 className="font-display text-lg font-bold text-text-primary">
                          {exp.role}
                        </h3>
                        <span className="text-sm text-text-secondary">@ {exp.org}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-text-muted mb-3">
                        <Calendar size={12} />
                        {exp.period}
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed mb-4">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.highlights.map((h) => (
                          <span
                            key={h}
                            className={cn(
                              'px-2.5 py-1 rounded-pill text-[11px] font-medium border',
                              mode === 'tech'
                                ? 'border-tech/10 bg-tech/5 text-tech/70'
                                : 'border-edit/10 bg-edit/5 text-edit/70'
                            )}
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ModeCrossfade>
    </SectionShell>
  )
}
