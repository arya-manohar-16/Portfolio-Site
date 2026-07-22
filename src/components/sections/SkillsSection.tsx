import SectionShell, { ModeCrossfade } from './SectionShell'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const techSkills = [
  {
    category: 'Languages',
    items: ['C++', 'C', 'Python', 'JavaScript', 'SQL', 'HTML'],
  },
  {
    category: 'Developer Tools',
    items: ['Git', 'GitHub', 'dotenv', 'Postman', 'Visual Studio Code'],
  },
  {
    category: 'Technologies / Frameworks',
    items: [
      'LangChain', 'RAG', 'ChromaDB', 'HuggingFace Embeddings',
      'NumPy', 'Pandas', 'Matplotlib', 'ReactJS',
      'Tailwind CSS', 'Node.js', 'Express.js',
    ],
  },
]

const editSkills = [
  {
    category: 'Video Editing',
    items: ['Premiere Pro', 'DaVinci Resolve', 'CapCut', 'After Effects'],
  },
  {
    category: 'Motion & Design',
    items: ['After Effects', 'Photoshop', 'Canva', 'Figma'],
  },
  {
    category: 'Specialties',
    items: ['Color Grading', 'Sound Design', 'Motion Graphics', 'Storytelling', 'Transitions'],
  },
]

export default function SkillsSection() {
  const { mode } = usePortfolioMode()
  const skills = mode === 'tech' ? techSkills : editSkills

  return (
    <SectionShell id="skills">
      <ModeCrossfade>
        <h2 className="font-display text-section mb-10">
          {mode === 'tech' ? (
            <>Tech <span className="gradient-text-tech">Stack</span></>
          ) : (
            <>Creative <span className="gradient-text-edit">Toolkit</span></>
          )}
        </h2>

        <div className="space-y-10">
          {skills.map((group, gi) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: gi * 0.1 + si * 0.04,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    viewport={{ once: true }}
                    className={cn(
                      'px-4 py-2 rounded-pill text-sm font-medium border transition-all duration-300 cursor-default',
                      'hover:scale-105',
                      mode === 'tech'
                        ? 'border-tech/15 bg-tech/5 text-tech-light hover:border-tech/40 hover:bg-tech/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                        : 'border-edit/15 bg-edit/5 text-edit-light hover:border-edit/40 hover:bg-edit/10 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]'
                    )}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ModeCrossfade>
    </SectionShell>
  )
}
