import { useRef } from 'react'
import { motion } from 'framer-motion'
import SectionShell, { ModeCrossfade } from './SectionShell'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { useCountUp } from '@/hooks/useCountUp'
import { cn } from '@/lib/utils'
import { Trophy, Target, Users, Zap, Eye, TrendingUp, Award, Film } from 'lucide-react'

function StatCounter({ end, suffix = '', prefix = '', label, icon: Icon, decimals = 0 }: {
  end: number
  suffix?: string
  prefix?: string
  label: string
  icon: any
  decimals?: number
}) {
  const { mode } = usePortfolioMode()
  const { ref, display } = useCountUp({ end, suffix, prefix, duration: 2.5, decimals })

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

const techAchievements: any[] = []

const editAchievements: any[] = []

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
        {mode === 'tech' ? (
          <div className="flex flex-col gap-4 mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCounter end={450} suffix="+" label="Problems (All Platforms)" icon={Target} />
              <StatCounter end={1712} label="Leetcode Rating (peak)" icon={TrendingUp} />
              <StatCounter end={1142} label="Codeforces Rating (peak)" icon={TrendingUp} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
              <StatCounter end={8.90} label="CGPA" icon={Award} suffix="" decimals={2} />
              <StatCounter end={10} prefix="Top " label="Swafinix Hackathon" icon={Zap} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <StatCounter end={150} suffix="K+" label="Total Views" icon={Eye} />
            <StatCounter end={10} suffix="+" label="Videos Produced" icon={Film} />
            <StatCounter end={5} suffix="+" label="Team Members Managed" icon={Users} />
            <StatCounter end={2} suffix="+" label="Years Experience" icon={Zap} />
          </div>
        )}

        {/* Achievement cards */}
        {achievements.length > 0 && (
          <div className={cn(
            "grid gap-4",
            achievements.length === 1 ? "max-w-xl mx-auto" : 
            achievements.length === 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-3"
          )}>
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
        )}
      </ModeCrossfade>
    </SectionShell>
  )
}
