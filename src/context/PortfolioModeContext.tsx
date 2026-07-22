import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type PortfolioMode = 'tech' | 'edit'

interface PortfolioModeContextType {
  mode: PortfolioMode
  setMode: (mode: PortfolioMode) => void
  toggleMode: () => void
  isTransitioning: boolean
  setIsTransitioning: (v: boolean) => void
}

const PortfolioModeContext = createContext<PortfolioModeContextType | undefined>(undefined)

export function PortfolioModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PortfolioMode>(() => {
    // Read initial mode from URL if present
    const params = new URLSearchParams(window.location.search)
    const urlMode = params.get('mode')
    return urlMode === 'edit' ? 'edit' : 'tech'
  })
  const [isTransitioning, setIsTransitioning] = useState(false)

  const setMode = useCallback((newMode: PortfolioMode) => {
    if (newMode === mode) return
    setIsTransitioning(true)

    // Allow animations to read the transitioning state before we swap
    requestAnimationFrame(() => {
      setModeState(newMode)

      // Sync to URL without triggering navigation or scroll reset
      const url = new URL(window.location.href)
      url.searchParams.set('mode', newMode)
      window.history.replaceState({}, '', url.toString())

      // End transition after animation completes (~900ms)
      setTimeout(() => setIsTransitioning(false), 900)
    })
  }, [mode])

  const toggleMode = useCallback(() => {
    setMode(mode === 'tech' ? 'edit' : 'tech')
  }, [mode, setMode])

  return (
    <PortfolioModeContext.Provider value={{ mode, setMode, toggleMode, isTransitioning, setIsTransitioning }}>
      {children}
    </PortfolioModeContext.Provider>
  )
}

export function usePortfolioMode() {
  const context = useContext(PortfolioModeContext)
  if (!context) {
    throw new Error('usePortfolioMode must be used within a PortfolioModeProvider')
  }
  return context
}
