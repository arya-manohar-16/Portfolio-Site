import { motion } from 'framer-motion'
import SectionShell, { ModeCrossfade } from './SectionShell'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'
import { GraduationCap, MapPin, Briefcase } from 'lucide-react'

export default function AboutSection() {
  const { mode } = usePortfolioMode()

  return (
    <SectionShell id="about">
      <ModeCrossfade>
        <div className="grid md:grid-cols-[1.3fr_1fr] lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="font-display text-section mb-6">
              {mode === 'tech' ? (
                <>About <span className="gradient-text-tech">Me</span></>
              ) : (
                <>About <span className="gradient-text-edit">Me</span></>
              )}
            </h2>
            <div className="text-section-sub text-text-secondary leading-relaxed mb-6 space-y-4 max-w-2xl">
              {mode === 'tech' ? (
                <>
                  <p>
                    I’m a Software Developer with a background in Electrical Engineering, but my journey into tech hasn’t been just about circuits and code—it's always been driven by a desire to create.
                  </p>
                  <div>
                    <h3 className="text-text-primary font-medium mb-1 text-sm uppercase tracking-wider">Why Software Development & Gen AI?</h3>
                    <p>
                      For me, software development is the ultimate form of problem-solving. I love the feeling of building something from nothing and crafting solutions that make a tangible impact. Whether I'm optimizing C++ algorithms or structuring complex logic, coding feels like a puzzle I can’t put down. I’m particularly fascinated by Generative AI. It’s essentially a brilliant creative partner—it helps me brainstorm, accelerates my workflow, and allows me to tackle complex problems in ways I never thought possible.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    Long before writing code, I was cutting frames. Inspired by a senior in 10th grade, I fell in love with video editing—a passion I later rekindled in college through our cultural society, Roobaroo. Balancing a demanding EE degree with late-night editing sessions taught me serious discipline.
                  </p>
                  <p>
                    My editing philosophy is simple: complete world-building. I focus on establishing a cinematic atmosphere in those crucial first seconds, setting an undeniable hook, and crafting dynamic edits that keep viewers completely immersed.
                  </p>
                  <div>
                    <h3 className="text-text-primary font-medium mb-1 text-sm uppercase tracking-wider">Beyond the Screen</h3>
                    <p>
                      When I’m not debugging code or color-grading a timeline, you can find me solving Rubik’s cubes, swimming, playing badminton, or getting lost in a good fiction book. I’m also a massive movie buff, which heavily fuels the cinematic aesthetics I bring to my work.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Info pills */}
            <div className="flex flex-wrap gap-3">
              {(mode === 'tech'
                ? [
                    { icon: GraduationCap, text: 'MANIT Bhopal • EE' },
                    { icon: MapPin, text: 'Bhopal, India' },
                  ]
                : [
                    { icon: GraduationCap, text: 'MANIT Bhopal' },
                    { icon: MapPin, text: 'Bhopal, India' },
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

          {/* Photo Container */}
          <div className="flex justify-center md:justify-start items-center mt-6 md:mt-0">
            <div 
              className={cn(
                "relative w-[300px] sm:w-[360px] lg:w-[400px] aspect-[4/5] overflow-hidden glass-card transition-all duration-700",
                mode === 'tech' 
                  ? "shadow-[0_0_30px_rgba(59,130,246,0.15)] rounded-[3rem] rounded-tr-[1rem] rounded-bl-[1rem]" 
                  : "shadow-[0_0_40px_rgba(249,115,22,0.15)] rounded-[2.5rem] border-x-[12px] border-black/40"
              )}
            >
              <div className="absolute inset-0 bg-surface-100/50 flex flex-col items-center justify-center text-text-muted">
                <span className="text-sm font-medium tracking-wide">Your Photo Here</span>
                <span className="text-[10px] mt-1 opacity-60">Add /profile.jpeg to public folder</span>
              </div>
              <img 
                src="/profile2.jpeg" 
                alt="Profile" 
                className="absolute inset-0 w-full h-full object-cover object-right sm:object-[80%_center] z-10 transition-transform duration-700 hover:scale-[1.03]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = '0';
                }}
              />
              <div className={cn(
                "absolute inset-0 z-20 opacity-60 pointer-events-none transition-all duration-700",
                mode === 'tech' 
                  ? "border-2 border-tech/30 rounded-[3rem] rounded-tr-[1rem] rounded-bl-[1rem]" 
                  : "border-y-2 border-edit/20 rounded-[2.5rem]"
              )} />
            </div>
          </div>
        </div>
      </ModeCrossfade>
    </SectionShell>
  )
}
