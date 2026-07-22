import { useRef } from 'react'
import { motion } from 'framer-motion'
import SectionShell, { ModeCrossfade } from './SectionShell'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { useCountUp } from '@/hooks/useCountUp'
import { cn } from '@/lib/utils'
import { Trophy, Target, Users, Zap, Eye, TrendingUp, Award, Film } from 'lucide-react'

function StatCounter({ end, suffix = '', prefix = '', label, icon: Icon }: {
  end: number
  suffix?: string
  prefix?: string
  label: string
  icon: any
}) {
  const { mode } = usePortfolioMode()
  const { ref, display } = useCountUp({ end, suffix, prefix, duration: 2.5 })

  return (
    <div ref={ref} className="glass-card p-6 text-center group hover:scale-[1.03] transition-transform duration-300">
      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors duration-300',
        mode === 'tech'
          ? 'bg-tech/10 text-tech group-hover:bg-tech/20'
          : 'bg-edit/10 text-edit group-hover:bg-edit/20'
      )}>
        <Icon size={22} />
      </div>
      <div className={cn(
        'font-display text-3xl md:text-4xl font-bold mb-2',
        mode === 'tech' ? 'gradient-text-tech' : 'gradient-text-edit'
      )}>
        {display}
      </div>
      <div className="text-xs text-text-muted uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}

const techAchievements = [
  {
    title: 'LeetCode Contest Rating 1712',
    description: 'Top 12.72% globally among competitive programmers on LeetCode.',
    icon: Trophy,
  },
  {
    title: '400+ Problems Solved',
    description: 'Across LeetCode, Codeforces, and GeeksforGeeks platforms.',
    icon: Target,
  },
  {
    title: 'Swafinix AI Agents Hackathon 2025',
    description: 'Top-10 finish with Team KLASHMAP in a national-level AI hackathon.',
    icon: Award,
  },
]

const editAchievements = [
  {
    title: '110K+ Combined Views',
    description: 'Content edited for Roobaroo Cultural Society across YouTube and Instagram.',
    icon: Eye,
  },
  {
    title: '10+ Productions',
    description: 'Event films, promotional reels, and social media content pieces.',
    icon: Film,
  },
  {
    title: 'Team Leadership',
    description: 'Built and managing a team of editors at Roobaroo Cultural Society.',
    icon: Users,
  },
]

export default function AchievementsSection() {
  const { mode } = usePortfolioMode()
  const achievements = mode === 'tech' ? techAchievements : editAchievements

  return (
    <SectionShell id="achievements">
      <ModeCrossfade>
        <h2 className="font-display text-section mb-4">
          {mode === 'tech' ? (
            <>Key <span className="gradient-text-tech">Achievements</span></>
          ) : (
            <>Impact & <span className="gradient-text-edit">Results</span></>
          )}
        </h2>
        <p className="text-section-sub text-text-secondary mb-10 max-w-2xl">
          {mode === 'tech'
            ? 'Numbers that reflect consistent effort and competitive growth.'
            : 'The reach and impact of my creative work.'
          }
        </p>

        {/* Stat counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {mode === 'tech' ? (
            <>
              <StatCounter end={1712} label="LeetCode Rating" icon={TrendingUp} />
              <StatCounter end={400} suffix="+" label="Problems Solved" icon={Target} />
              <StatCounter end={8.9} label="CGPA" icon={Award} suffix="" />
              <StatCounter end={12.72} suffix="%" label="Top Percentile" icon={Zap} />
            </>
          ) : (
            <>
              <StatCounter end={110} suffix="K+" label="Total Views" icon={Eye} />
              <StatCounter end={10} suffix="+" label="Videos Produced" icon={Film} />
              <StatCounter end={5} suffix="+" label="Team Members" icon={Users} />
              <StatCounter end={2} suffix="+" label="Years Experience" icon={Zap} />
            </>
          )}
        </div>

        {/* Achievement cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="glass-card p-6 group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300',
                mode === 'tech'
                  ? 'bg-tech/10 text-tech group-hover:bg-tech/20'
                  : 'bg-edit/10 text-edit group-hover:bg-edit/20'
              )}>
                <ach.icon size={20} />
              </div>
              <h3 className="font-display text-base font-bold text-text-primary mb-2">
                {ach.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {ach.description}
              </p>
            </motion.div>
          ))}
        </div>
      </ModeCrossfade>
    </SectionShell>
  )
}
