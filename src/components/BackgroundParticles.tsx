import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import * as THREE from 'three'

function ModeParticles({ count = 250 }: { count?: number }) {
  const { mode } = usePortfolioMode()
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const vec = useMemo(() => new THREE.Vector3(), [])
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const closest = useMemo(() => new THREE.Vector3(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
        ] as [number, number, number],
        speed: 0.05 + Math.random() * 0.15,
        offset: Math.random() * Math.PI * 2,
        scale: 0.02 + Math.random() * 0.06,
        targetOffset: new THREE.Vector3(),
        currentOffset: new THREE.Vector3(),
      })
    }
    return temp
  }, [count])

  const techColor = useMemo(() => new THREE.Color('#3B82F6'), [])
  const editColor = useMemo(() => new THREE.Color('#F97316'), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime

    raycaster.setFromCamera(state.pointer, state.camera)

    particles.forEach((p, i) => {
      const baseX = p.position[0] + Math.sin(time * p.speed + p.offset) * 0.5
      const baseY = p.position[1] + Math.cos(time * p.speed + p.offset) * 0.5
      const baseZ = p.position[2] + Math.sin(time * p.speed * 0.5) * 0.3
      
      vec.set(baseX, baseY, baseZ)
      
      raycaster.ray.closestPointToPoint(vec, closest)
      const dist = vec.distanceTo(closest)
      
      if (dist < 3) {
        const dir = vec.clone().sub(closest).normalize()
        const force = (3 - dist) * 0.6
        p.targetOffset.copy(dir.multiplyScalar(force))
      } else {
        p.targetOffset.set(0, 0, 0)
      }
      
      p.currentOffset.lerp(p.targetOffset, 0.05)
      vec.add(p.currentOffset)

      dummy.position.copy(vec)
      dummy.scale.setScalar(p.scale * (1 + Math.sin(time * 2 + p.offset) * 0.3))
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true

    const targetColor = mode === 'tech' ? techColor : editColor
    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.color.lerp(targetColor, 0.05)
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial transparent opacity={0.4} />
    </instancedMesh>
  )
}

export default function BackgroundParticles() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none">
      <Canvas
        eventSource={document.getElementById('root') || document.body}
        eventPrefix="client"
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={0.3} />
        <Stars radius={50} depth={80} count={2000} factor={3} saturation={0} fade speed={0.5} />
        <ModeParticles count={600} />
      </Canvas>
    </div>
  )
}
