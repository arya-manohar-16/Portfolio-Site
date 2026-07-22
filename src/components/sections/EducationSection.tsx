import { motion } from 'framer-motion'
import SectionShell, { ModeCrossfade } from './SectionShell'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'
import { GraduationCap, Award, BookOpen } from 'lucide-react'

const educationData = [
  {
    institution: 'MANIT Bhopal',
    degree: 'B.Tech in Electrical Engineering',
    minor: 'Minor in Computer Science Engineering',
    duration: '2023 - 2027',
    score: 'CGPA: 8.90/10',
    description: 'Successfully balancing a rigorous electrical curriculum while diving deep into computer science concepts. Active in coding and cultural clubs, seamlessly blending analytical problem-solving with creative video editing endeavors.',
    icon: GraduationCap,
  },
  {
    institution: 'Sri Vidhya Junior College',
    degree: 'Intermediate - TSBIE (12th Class)',
    duration: '2023',
    score: 'Percentage: 97.7%',
    description: 'Graduated with exceptional academic standing, deeply focused on Science and Mathematics. Developed strong analytical foundations that naturally translated into complex algorithmic thinking.',
    icon: Award,
  },
  {
    institution: 'Oasis School of Excellence',
    degree: 'CBSE (10th Class)',
    duration: '2021',
    score: 'Percentage: 95.3%',
    description: 'Demonstrated early academic excellence with a strong affinity for STEM subjects. Cultivated a passion for technology and visual storytelling during formative years.',
    icon: BookOpen,
  },
]

export default function EducationSection() {
  const { mode } = usePortfolioMode()

  return (
    <SectionShell id="education">
      <ModeCrossfade>
        <h2 className="font-display text-section mb-4">
          {mode === 'tech' ? (
            <>Academic <span className="gradient-text-tech">Journey</span></>
          ) : (
            <>Educational <span className="gradient-text-edit">Background</span></>
          )}
        </h2>
        <p className="text-section-sub text-text-secondary mb-10 max-w-2xl">
          The academic milestones that laid the groundwork for my analytical thinking and creative vision.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {educationData.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="glass-card p-6 flex flex-col h-full group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300',
                  mode === 'tech'
                    ? 'bg-tech/10 text-tech group-hover:bg-tech/20'
                    : 'bg-edit/10 text-edit group-hover:bg-edit/20'
                )}>
                  <edu.icon size={24} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {edu.institution}
                  </h3>
                  <div className="text-xs text-text-muted mt-1 font-mono">
                    {edu.duration}
                  </div>
                </div>
              </div>

              <div className="flex-grow space-y-4">
                <div>
                  <div className="text-sm font-semibold text-text-secondary">
                    {edu.degree}
                  </div>
                  {edu.minor && (
                    <div className="text-sm text-text-secondary mt-0.5">
                      {edu.minor}
                    </div>
                  )}
                </div>
                
                <div className={cn(
                  "inline-block px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide shadow-sm",
                  mode === 'tech' 
                    ? "bg-tech/10 text-tech-light border border-tech/20" 
                    : "bg-edit/10 text-edit-light border border-edit/20"
                )}>
                  {edu.score}
                </div>

                <p className="text-sm text-text-muted leading-relaxed pt-4 border-t border-glass-border">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </ModeCrossfade>
    </SectionShell>
  )
}
