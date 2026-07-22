import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, PresentationControls } from '@react-three/drei'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import * as THREE from 'three'
import DeskSetup from './DeskSetup'
import Character from './Character'

/* ──────────────────────────────────────
   Floating particles moved to global BackgroundParticles
   ────────────────────────────────────── */

/* ──────────────────────────────────────
   (PlaceholderOrb removed in Phase 2)
   ────────────────────────────────────── */

/* ──────────────────────────────────────
   Main 3D Scene
   ────────────────────────────────────── */
export default function Scene3D() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#3B82F6" />
        <pointLight position={[-10, -5, 5]} intensity={0.4} color="#22D3EE" />
        <PresentationControls
          global
          rotation={[0.1, -0.2, 0]}
          polar={[-0.1, 0.2]}
          azimuth={[-0.5, 0.5]}
        >
          <group position={[0, -0.5, 0]}>
            <DeskSetup />
            <Character />
          </group>
        </PresentationControls>
      </Canvas>
    </div>
  )
}
