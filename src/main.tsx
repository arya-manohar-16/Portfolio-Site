import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PortfolioModeProvider } from '@/context/PortfolioModeContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioModeProvider>
      <App />
    </PortfolioModeProvider>
  </StrictMode>,
)
