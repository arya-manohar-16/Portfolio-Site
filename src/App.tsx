import GlassNav from '@/components/nav/GlassNav'
import BackgroundParticles from '@/components/BackgroundParticles'
import HeroSection from '@/components/hero/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import EducationSection from '@/components/sections/EducationSection'
import CourseworkSection from '@/components/sections/CourseworkSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import AchievementsSection from '@/components/sections/AchievementsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'

export default function App() {
  const { mode } = usePortfolioMode()

  return (
    <div className={cn('relative min-h-screen', mode === 'tech' ? 'glow-tech' : 'glow-edit')}>
      {/* Fixed navigation */}
      <GlassNav />
      <BackgroundParticles />

      {/* Main content — single scroll, no routing */}
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <CourseworkSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
