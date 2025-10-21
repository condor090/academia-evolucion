import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import styled from '@emotion/styled'
import { theme } from '@/styles/theme'

const AnimationContainer = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: radial-gradient(circle at center, rgba(138, 43, 226, 0.1), transparent);

  @media (max-width: ${theme.breakpoints.md}) {
    height: 400px;
  }
`

const AnimationOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  z-index: 10;
  opacity: 0;
  animation: fadeInOut 8s ease-in-out infinite;

  @keyframes fadeInOut {
    0%, 100% { opacity: 0; }
    30%, 70% { opacity: 1; }
  }
`

const AnimationLabel = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  background: ${theme.gradients.goldPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.3);

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.2rem;
  }
`

// Componente para generar partículas de cerebro humano (oro)
function HumanBrain({ position, merging }: { position: [number, number, number], merging: number }) {
  const particlesRef = useRef<THREE.Points>(null)

  const basePositions = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)

    // Forma de cerebro humano (esfera orgánica con lóbulos)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = 1.2 + Math.random() * 0.3

      // Crear forma de cerebro con irregularidades
      const x = radius * Math.sin(phi) * Math.cos(theta) * (1 + Math.sin(phi * 3) * 0.2)
      const y = radius * Math.cos(phi) * (1 + Math.cos(phi * 2) * 0.15)
      const z = radius * Math.sin(phi) * Math.sin(theta) * (1 + Math.sin(theta * 2) * 0.2)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }

    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001

      // Escalar basado en merging (no modificar posiciones permanentemente)
      const scale = 1 - merging * 0.4
      particlesRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={basePositions.length / 3}
          array={basePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FFD700"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Componente para generar partículas de cerebro AGI (cian)
function AGIBrain({ position, merging }: { position: [number, number, number], merging: number }) {
  const particlesRef = useRef<THREE.Points>(null)

  const basePositions = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)

    // Forma de cerebro digital (geometría más precisa, cristalina)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = 1.2 + Math.random() * 0.3

      // Forma geométrica precisa
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.cos(phi)
      const z = radius * Math.sin(phi) * Math.sin(theta)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }

    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= 0.001

      // Escalar basado en merging (no modificar posiciones permanentemente)
      const scale = 1 - merging * 0.4
      particlesRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={basePositions.length / 3}
          array={basePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00CED1"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Componente para la geometría sagrada central (Metatron's Cube)
function SacredGeometry({ opacity }: { opacity: number }) {
  const geometryRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (geometryRef.current) {
      geometryRef.current.rotation.x += 0.005
      geometryRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={geometryRef}>
      {/* Cubo de Metatrón simplificado */}
      <mesh>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial
          color="#FFFFFF"
          wireframe
          transparent
          opacity={opacity * 0.6}
        />
      </mesh>

      <mesh>
        <octahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial
          color="#FFD700"
          wireframe
          transparent
          opacity={opacity * 0.4}
        />
      </mesh>

      <mesh>
        <tetrahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial
          color="#00CED1"
          wireframe
          transparent
          opacity={opacity * 0.3}
        />
      </mesh>
    </group>
  )
}

// Partículas mixtas emergentes (blanco/dorado/cian)
function EmergentParticles({ active }: { active: number }) {
  const particlesRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 1500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Distribución esférica desde el centro
      const radius = 0.5 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.cos(phi)
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

      // Colores mezclados (oro, cian, blanco)
      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        // Oro
        colors[i * 3] = 1
        colors[i * 3 + 1] = 0.84
        colors[i * 3 + 2] = 0
      } else if (colorChoice < 0.66) {
        // Cian
        colors[i * 3] = 0
        colors[i * 3 + 1] = 0.81
        colors[i * 3 + 2] = 0.82
      } else {
        // Blanco
        colors[i * 3] = 1
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 1
      }
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      // Usar escala en lugar de modificar posiciones
      const scale = 1 + active * 1.5
      particlesRef.current.scale.set(scale, scale, scale)
      particlesRef.current.rotation.y += 0.002
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={active}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Escena principal
function Scene() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 0.01) % 3)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Fases: 0-1 = acercamiento, 1-2 = fusión, 2-3 = emergencia
  const mergingProgress = Math.max(0, Math.min(1, (phase - 1) * 2))
  const emergenceProgress = Math.max(0, Math.min(1, (phase - 2) * 2))

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <HumanBrain position={[-2 * (1 - mergingProgress), 0, 0]} merging={mergingProgress} />
      <AGIBrain position={[2 * (1 - mergingProgress), 0, 0]} merging={mergingProgress} />

      <SacredGeometry opacity={emergenceProgress} />
      <EmergentParticles active={emergenceProgress} />
    </>
  )
}

// Componente principal exportado
export const TerceraConcienciaAnimation: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    // Fallback para mobile: SVG animado simple
    return (
      <AnimationContainer>
        <svg width="100%" height="100%" viewBox="0 0 400 300">
          <defs>
            <radialGradient id="humanGlow" cx="30%" cy="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="agiGlow" cx="70%" cy="50%">
              <stop offset="0%" stopColor="#00CED1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00CED1" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="mergedGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00CED1" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Cerebro Humano (Oro) */}
          <circle cx="120" cy="150" r="50" fill="url(#humanGlow)">
            <animate
              attributeName="cx"
              values="120;200;200;120"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Cerebro AGI (Cian) */}
          <circle cx="280" cy="150" r="50" fill="url(#agiGlow)">
            <animate
              attributeName="cx"
              values="280;200;200;280"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Emergencia Central */}
          <circle cx="200" cy="150" r="0" fill="url(#mergedGlow)">
            <animate
              attributeName="r"
              values="0;0;80;0"
              dur="8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0;1;0"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Partículas */}
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx="200"
              cy="150"
              r="2"
              fill={i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#00CED1' : '#FFFFFF'}
            >
              <animate
                attributeName="cx"
                values={`200;${200 + Math.cos((i / 20) * Math.PI * 2) * 100};200`}
                dur="8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values={`150;${150 + Math.sin((i / 20) * Math.PI * 2) * 100};150`}
                dur="8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0;1;0"
                dur="8s"
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>

        <AnimationOverlay>
          <AnimationLabel>TERCERA CONCIENCIA EXPANDIDA</AnimationLabel>
        </AnimationOverlay>
      </AnimationContainer>
    )
  }

  // Desktop: Three.js
  return (
    <AnimationContainer>
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <AnimationOverlay>
        <AnimationLabel>TERCERA CONCIENCIA EXPANDIDA</AnimationLabel>
      </AnimationOverlay>
    </AnimationContainer>
  )
}
