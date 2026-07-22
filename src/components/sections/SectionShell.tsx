import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'

interface SectionShellProps {
  id: string
  children: React.ReactNode
  className?: string
}

/**
 * Shared section wrapper with mode-aware accent glow,
 * noise overlay, and consistent spacing.
 * Content inside animates on mode change.
 */
export default function SectionShell({ id, children, className }: SectionShellProps) {
  const { mode } = usePortfolioMode()

  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden',
        className
      )}
    >
      {/* Subtle top accent line */}
      <div className="section-container">
        <div
          className={cn(
            'w-16 mb-12 transition-all duration-700',
            mode === 'tech' ? 'accent-line-tech' : 'accent-line-edit'
          )}
        />
        {children}
      </div>
    </section>
  )
}

/**
 * Animated content wrapper that crossfades
 * when the portfolio mode changes.
 */
export function ModeCrossfade({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { mode } = usePortfolioMode()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
