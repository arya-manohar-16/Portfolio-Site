import { Mail, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon, CodeforcesIcon } from '@/components/icons/BrandIcons'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { cn } from '@/lib/utils'

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/arya-manohar-16', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://linkedin.com/in/arya-manohar', label: 'LinkedIn' },
  { icon: CodeforcesIcon, href: 'https://codeforces.com/profile/arya_manohar_16', label: 'Codeforces' },
]

export default function Footer() {
  const { mode } = usePortfolioMode()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-glass-border bg-[#0a0a0f]">
      <div className="section-container py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <a
              href="#"
              className={cn(
                'font-display text-2xl font-bold',
                mode === 'tech' ? 'gradient-text-tech' : 'gradient-text-edit'
              )}
            >
              AM
            </a>
            <p className="text-sm text-text-secondary mt-3 max-w-xs leading-relaxed">
              {mode === 'tech'
                ? 'SDE & Generative AI Engineer. Building the future with code and intelligence.'
                : 'Video Editor & Motion Designer. Crafting visual stories that resonate.'
              }
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:m.aryamanohar@gmail.com"
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Mail size={14} className="text-text-muted" />
                  m.aryamanohar@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Profiles</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    'p-2.5 rounded-xl border transition-all duration-300',
                    'border-glass-border text-text-muted hover:text-text-primary',
                    mode === 'tech'
                      ? 'hover:border-tech/30 hover:bg-tech/5'
                      : 'hover:border-edit/30 hover:bg-edit/5'
                  )}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {currentYear} Arya Manohar. Built with React, Three.js & GSAP.
          </p>
          <p className="text-xs text-text-muted">
            MANIT Bhopal • Electrical Engineering
          </p>
        </div>
      </div>
    </footer>
  )
}
