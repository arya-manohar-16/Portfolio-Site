import SectionShell, { ModeCrossfade } from './SectionShell'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Code2, Database, Brain, Network, Terminal, Settings, Video, Image, Palette, Sparkles } from 'lucide-react'

function getSkillIcon(skill: string) {
  const urlMap: Record<string, string> = {
    'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    'C': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg',
    'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    
    'LangChain': 'https://avatars.githubusercontent.com/u/126733545?s=64&v=4',
    'ChromaDB': 'https://avatars.githubusercontent.com/u/101859664?s=64&v=4',
    'HuggingFace Embeddings': 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
    'scikit-learn': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg',
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    'Keras': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg',
    
    'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
    'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
    'Matplotlib': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg',
    
    'ReactJS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    
    'nodemon': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodemon/nodemon-original.svg',
    
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    'Visual Studio Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
    'Jupyter Notebook': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg',
    
    'Premiere Pro': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg',
    'After Effects': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg',
    'Photoshop': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg',
    'Canva': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg',
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
  }

  if (urlMap[skill]) {
    return <img src={urlMap[skill]} alt={skill} className="w-5 h-5 object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-300" />
  }

  // Fallbacks
  if (skill === 'RAG') return <Brain size={20} className="text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
  if (skill === 'dotenv' || skill === 'daisyUI') return <Settings size={20} className="text-slate-400 group-hover:drop-shadow-[0_0_8px_rgba(148,163,184,0.8)]" />
  if (skill.includes('Design') || skill.includes('Color')) return <Palette size={20} className="text-orange-400 group-hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
  if (skill === 'DaVinci Resolve' || skill === 'CapCut') return <Video size={20} className="text-purple-400 group-hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
  if (skill === 'Transitions' || skill === 'Storytelling' || skill === 'Motion Graphics') return <Sparkles size={20} className="text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
  return <Code2 size={20} className="text-slate-400 group-hover:drop-shadow-[0_0_8px_rgba(148,163,184,0.8)]" />
}

const techSkills = [
  {
    category: 'Languages',
    items: ['C++', 'C', 'Python', 'JavaScript', 'SQL', 'HTML'],
  },
  {
    category: 'Generative AI & Machine Learning',
    items: ['LangChain', 'RAG', 'ChromaDB', 'HuggingFace Embeddings', 'scikit-learn', 'TensorFlow', 'Keras'],
  },
  {
    category: 'Data Science & Visualization',
    items: ['NumPy', 'Pandas', 'Matplotlib'],
  },
  {
    category: 'Web Development & Databases',
    items: ['ReactJS', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
  },
  {
    category: 'Developer Tools',
    items: ['Git', 'GitHub', 'Visual Studio Code', 'Postman', 'Jupyter Notebook', 'dotenv', 'daisyUI', 'nodemon'],
  },
]

const editSkills = [
  {
    category: 'Video Editing',
    items: ['Premiere Pro', 'DaVinci Resolve', 'CapCut', 'After Effects'],
  },
  {
    category: 'Motion & Design',
    items: ['After Effects', 'Canva'],
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

        <div className="space-y-12">
          {skills.map((group, gi) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-5">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3.5">
                {group.items.map((skill, si) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ 
                      scale: 1.12, 
                      y: -5,
                      rotateZ: si % 2 === 0 ? 3 : -3,
                      boxShadow: mode === 'tech' 
                        ? '0px 15px 30px -5px rgba(59, 130, 246, 0.4), 0px 0px 15px 0px rgba(59, 130, 246, 0.2)' 
                        : '0px 15px 30px -5px rgba(249, 115, 22, 0.4), 0px 0px 15px 0px rgba(249, 115, 22, 0.2)'
                    }}
                    transition={{
                      delay: gi * 0.1 + si * 0.04,
                      duration: 0.3,
                      ease: "backOut",
                    }}
                    viewport={{ once: true }}
                    className={cn(
                      'group flex items-center gap-2.5 px-4 py-2.5 rounded-pill text-sm font-medium border cursor-default',
                      'transition-colors duration-300 relative overflow-hidden',
                      mode === 'tech'
                        ? 'border-tech/15 bg-tech/5 text-tech-light hover:border-tech/50 hover:bg-tech/20'
                        : 'border-edit/15 bg-edit/5 text-edit-light hover:border-edit/50 hover:bg-edit/20'
                    )}
                  >
                    {/* Inner glowing element that shows on hover */}
                    <div className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      mode === 'tech' ? "bg-gradient-to-r from-tech/0 via-tech/10 to-tech/0" : "bg-gradient-to-r from-edit/0 via-edit/10 to-edit/0"
                    )} />
                    
                    <div className="relative z-10 flex items-center gap-2.5">
                      {getSkillIcon(skill)}
                      <span className="group-hover:text-white transition-colors duration-300">{skill}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ModeCrossfade>
    </SectionShell>
  )
}
