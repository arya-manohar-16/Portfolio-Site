import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import * as THREE from 'three'

/**
 * Procedural low-poly workspace desk setup.
 * Includes desk surface, monitor, keyboard, mouse, coffee mug,
 * and decorative elements. All built from Three.js primitives
 * for a stylized aesthetic without needing external .glb files.
 */

/* ── Utility: rounded box-like geometry ── */
function GlassPanel({ position, size, color, emissive, opacity = 1 }: {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  emissive?: string
  opacity?: number
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive || color}
        emissiveIntensity={emissive ? 0.3 : 0.05}
        transparent={opacity < 1}
        opacity={opacity}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  )
}

/* ── Monitor screen with animated content ── */
function MonitorScreen({ mode }: { mode: 'tech' | 'edit' }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const canvasTexture = useRef<THREE.CanvasTexture | null>(null)
  const canvas = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 320
    return c
  }, [])

  useFrame((state) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const time = state.clock.elapsedTime

    // Background
    ctx.fillStyle = mode === 'tech' ? '#0d1117' : '#1a1a2e'
    ctx.fillRect(0, 0, 512, 320)

    if (mode === 'tech') {
      // Code editor look
      // Line numbers gutter
      ctx.fillStyle = '#161b22'
      ctx.fillRect(0, 0, 40, 320)

      // Syntax-highlighted code lines
      const colors = ['#79c0ff', '#d2a8ff', '#ff7b72', '#a5d6ff', '#7ee787', '#ffa657']
      const lineHeight = 18
      const scrollOffset = (time * 8) % 400

      for (let i = 0; i < 22; i++) {
        const y = i * lineHeight + 8 - (scrollOffset % lineHeight)
        if (y < -lineHeight || y > 330) continue

        // Line number
        ctx.fillStyle = '#484f58'
        ctx.font = '10px monospace'
        ctx.textAlign = 'right'
        ctx.fillText(`${Math.floor(scrollOffset / lineHeight) + i + 1}`, 34, y + 12)

        // Code content — varying width bars
        const indent = (Math.sin(i * 1.7) > 0 ? 2 : Math.sin(i * 2.3) > 0.3 ? 4 : 0) * 12
        const lineWidth = 60 + Math.abs(Math.sin(i * 3.14 + 0.5)) * 200
        const segments = 1 + Math.floor(Math.abs(Math.sin(i * 2.1)) * 3)

        let x = 50 + indent
        for (let s = 0; s < segments; s++) {
          const segWidth = lineWidth / segments * (0.5 + Math.abs(Math.sin(i * 1.3 + s * 2.7)) * 0.8)
          ctx.fillStyle = colors[(i + s) % colors.length]
          ctx.globalAlpha = 0.7 + Math.sin(time * 0.25 + i * 0.3) * 0.15
          const barHeight = 9
          const barY = y + 4
          // Rounded rectangle
          const radius = 2
          ctx.beginPath()
          ctx.moveTo(x + radius, barY)
          ctx.lineTo(x + segWidth - radius, barY)
          ctx.quadraticCurveTo(x + segWidth, barY, x + segWidth, barY + radius)
          ctx.lineTo(x + segWidth, barY + barHeight - radius)
          ctx.quadraticCurveTo(x + segWidth, barY + barHeight, x + segWidth - radius, barY + barHeight)
          ctx.lineTo(x + radius, barY + barHeight)
          ctx.quadraticCurveTo(x, barY + barHeight, x, barY + barHeight - radius)
          ctx.lineTo(x, barY + radius)
          ctx.quadraticCurveTo(x, barY, x + radius, barY)
          ctx.fill()
          x += segWidth + 8
        }
        ctx.globalAlpha = 1
      }

      // Cursor blink
      if (Math.sin(time * 2) > 0) {
        ctx.fillStyle = '#58a6ff'
        ctx.fillRect(150, 100 - (scrollOffset % lineHeight), 2, 14)
      }
    } else {
      // Video timeline editor look
      // Top: preview area (dark)
      ctx.fillStyle = '#12121c'
      ctx.fillRect(0, 0, 512, 140)

      // Preview frame indicator
      ctx.strokeStyle = '#F97316'
      ctx.lineWidth = 2
      ctx.strokeRect(156, 10, 200, 120)

      // Playback controls
      const cx = 256
      ctx.fillStyle = '#F97316'
      ctx.beginPath()
      ctx.moveTo(cx - 8, 150)
      ctx.lineTo(cx + 8, 158)
      ctx.lineTo(cx - 8, 166)
      ctx.fill()

      // Timeline tracks
      const trackColors = ['#F97316', '#EC4899', '#3B82F6', '#22D3EE', '#A78BFA']
      const trackY = 180

      for (let t = 0; t < 4; t++) {
        const y = trackY + t * 30

        // Track background
        ctx.fillStyle = '#1a1a28'
        ctx.fillRect(0, y, 512, 24)

        // Track label
        ctx.fillStyle = '#5a5a6e'
        ctx.font = '9px sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText(t === 0 ? 'V1' : t === 1 ? 'V2' : t === 2 ? 'A1' : 'A2', 6, y + 16)

        // Clips
        const clipOffset = 30
        const numClips = 3 + Math.floor(Math.sin(t * 1.5) * 2)
        for (let c = 0; c < numClips; c++) {
          const clipX = clipOffset + c * (60 + Math.sin(t + c) * 30) + (t % 2) * 20
          const clipW = 40 + Math.abs(Math.sin(t * 2 + c * 3)) * 60
          ctx.fillStyle = trackColors[(t + c) % trackColors.length]
          ctx.globalAlpha = 0.6 + Math.sin(time * 0.15 + t + c) * 0.15
          ctx.fillRect(clipX, y + 3, clipW, 18)
          ctx.globalAlpha = 1
        }
      }

      // Playhead
      const playheadX = 60 + ((time * 15) % 400)
      ctx.fillStyle = '#F97316'
      ctx.fillRect(playheadX, trackY - 6, 2, 130)
      // Playhead top triangle
      ctx.beginPath()
      ctx.moveTo(playheadX - 5, trackY - 6)
      ctx.lineTo(playheadX + 7, trackY - 6)
      ctx.lineTo(playheadX + 1, trackY + 2)
      ctx.fillStyle = '#F97316'
      ctx.fill()

      // Timecode
      const seconds = Math.floor(time * 1) % 60
      const minutes = Math.floor(seconds / 60)
      ctx.fillStyle = '#f0f0f5'
      ctx.font = 'bold 11px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(`00:${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}:${String(Math.floor(time * 12) % 24).padStart(2, '0')}`, 256, 176)
    }

    // Update texture
    if (!canvasTexture.current) {
      canvasTexture.current = new THREE.CanvasTexture(canvas)
      canvasTexture.current.minFilter = THREE.LinearFilter
      if (meshRef.current) {
        (meshRef.current.material as THREE.MeshStandardMaterial).map = canvasTexture.current
        ;(meshRef.current.material as THREE.MeshStandardMaterial).needsUpdate = true
      }
    }
    canvasTexture.current.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} position={[0, 1.85, -0.45]}>
      <planeGeometry args={[1.75, 1.1]} />
      <meshStandardMaterial
        emissive={mode === 'tech' ? '#1a2744' : '#2a1a2e'}
        emissiveIntensity={0.5}
        roughness={0.1}
      />
    </mesh>
  )
}

/* ── Main Desk Setup Group ── */
export default function DeskSetup() {
  const { mode } = usePortfolioMode()
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* ─── Desk surface ─── */}
      <GlassPanel
        position={[0, 0.8, 0]}
        size={[3.2, 0.08, 1.6]}
        color="#1a1a28"
        emissive="#0a0a0f"
      />

      {/* Desk legs */}
      {[[-1.4, 0.4, -0.65], [1.4, 0.4, -0.65], [-1.4, 0.4, 0.65], [1.4, 0.4, 0.65]].map((pos, i) => (
        <GlassPanel
          key={`leg-${i}`}
          position={pos as [number, number, number]}
          size={[0.06, 0.8, 0.06]}
          color="#12121c"
        />
      ))}

      {/* ─── Monitor ─── */}
      {/* Monitor bezel */}
      <GlassPanel
        position={[0, 1.85, -0.5]}
        size={[1.9, 1.25, 0.06]}
        color="#0e0e15"
        emissive="#0a0a0f"
      />
      {/* Monitor screen edge glow */}
      <mesh position={[0, 1.85, -0.46]}>
        <planeGeometry args={[1.82, 1.16]} />
        <meshBasicMaterial
          color={mode === 'tech' ? '#3B82F6' : '#F97316'}
          transparent
          opacity={0.04}
        />
      </mesh>
      {/* Animated screen */}
      <MonitorScreen mode={mode} />
      {/* Monitor stand */}
      <GlassPanel
        position={[0, 1.18, -0.5]}
        size={[0.08, 0.12, 0.06]}
        color="#12121c"
      />
      <GlassPanel
        position={[0, 1.08, -0.5]}
        size={[0.5, 0.04, 0.25]}
        color="#12121c"
      />

      {/* ─── Keyboard ─── */}
      <mesh position={[0, 0.87, 0.15]}>
        <boxGeometry args={[1.2, 0.04, 0.45]} />
        <meshStandardMaterial
          color="#12121c"
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>
      {/* Key rows */}
      {[0, 1, 2, 3].map((row) => (
        <group key={`row-${row}`}>
          {Array.from({ length: 12 - row }, (_, col) => (
            <mesh
              key={`key-${row}-${col}`}
              position={[
                -0.5 + col * 0.085 + row * 0.02,
                0.9,
                -0.02 + row * 0.1
              ]}
            >
              <boxGeometry args={[0.065, 0.025, 0.065]} />
              <meshStandardMaterial
                color="#1a1a28"
                emissive={mode === 'tech' ? '#3B82F6' : '#F97316'}
                emissiveIntensity={
                  // Simulate typing — random keys light up
                  0.02
                }
                roughness={0.5}
                metalness={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* ─── Mouse ─── */}
      <mesh position={[0.85, 0.87, 0.2]}>
        <capsuleGeometry args={[0.05, 0.08, 8, 16]} />
        <meshStandardMaterial
          color="#1a1a28"
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* ─── Coffee mug ─── */}
      <group position={[-1.2, 0.95, 0.3]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.055, 0.14, 16]} />
          <meshStandardMaterial
            color={mode === 'tech' ? '#1e3a5f' : '#3a1e2e'}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
        {/* Handle */}
        <mesh position={[0.075, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.035, 0.01, 8, 16, Math.PI]} />
          <meshStandardMaterial
            color={mode === 'tech' ? '#1e3a5f' : '#3a1e2e'}
            roughness={0.3}
          />
        </mesh>
        {/* Coffee surface */}
        <mesh position={[0, 0.06, 0]}>
          <circleGeometry args={[0.052, 16]} />
          <meshStandardMaterial
            color="#2a1810"
            roughness={0.8}
          />
        </mesh>
      </group>

      {/* ─── Small decorative plant ─── */}
      <group position={[1.3, 0.95, -0.4]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.05, 0.1, 6]} />
          <meshStandardMaterial color="#2d2d42" roughness={0.6} />
        </mesh>
        {/* Leaves */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={`leaf-${i}`}
            position={[
              Math.sin(i * 1.25) * 0.04,
              0.08 + i * 0.03,
              Math.cos(i * 1.25) * 0.04,
            ]}
            rotation={[
              Math.sin(i * 0.8) * 0.4,
              i * 1.25,
              0.3 + Math.sin(i) * 0.2,
            ]}
          >
            <sphereGeometry args={[0.025, 6, 4]} />
            <meshStandardMaterial
              color="#22c55e"
              emissive="#22c55e"
              emissiveIntensity={0.1}
              roughness={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* ─── Accent light strip under desk edge ─── */}
      <mesh position={[0, 0.77, 0.79]}>
        <boxGeometry args={[3.0, 0.01, 0.01]} />
        <meshBasicMaterial
          color={mode === 'tech' ? '#3B82F6' : '#F97316'}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}
