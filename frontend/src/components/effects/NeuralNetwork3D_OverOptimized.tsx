import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, Environment, Text, Line } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'
import { theme } from '@/styles/theme'

interface Particle {
  id: number
  position: THREE.Vector3
  velocity: THREE.Vector3
  connections: number[]
  isMain: boolean
  size: number
  intensity: number
}

function NeuralParticles({ isInView, isPaused }: { isInView: boolean; isPaused: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()
  
  const [particles, setParticles] = useState<Particle[]>([])
  const particleCount = 20 // REDUCIDO de 30 a 20
  
  // Geometría compartida para líneas
  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), [])
  
  // Inicializar partículas
  useEffect(() => {
    const newParticles: Particle[] = []
    
    // Nodos principales (centro)
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2
      const radius = 1.5
      newParticles.push({
        id: i,
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          (Math.random() - 0.5) * 1
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.008, // REDUCIDO de 0.01
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008
        ),
        connections: [],
        isMain: true,
        size: 0.2,
        intensity: 1
      })
    }
    
    // Nodos secundarios
    for (let i = 3; i < particleCount; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 6, // REDUCIDO de 8 a 6
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 3  // REDUCIDO de 4 a 3
      )
      
      newParticles.push({
        id: i,
        position,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.004, // REDUCIDO
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.004
        ),
        connections: [],
        isMain: false,
        size: 0.1,
        intensity: 0.7
      })
    }
    
    setParticles(newParticles)
  }, [])
  
  // Actualizar conexiones basadas en distancia - OPTIMIZADO
  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      setParticles(prevParticles => {
        const updated = [...prevParticles]
        
        // Limpiar conexiones existentes
        updated.forEach(p => p.connections = [])
        
        // Crear nuevas conexiones - LIMITADAS
        for (let i = 0; i < updated.length; i++) {
          if (updated[i].connections.length >= 3) continue // LIMITAR conexiones por partícula
          
          for (let j = i + 1; j < updated.length; j++) {
            if (updated[j].connections.length >= 3) continue
            
            const distance = updated[i].position.distanceTo(updated[j].position)
            const maxDistance = (updated[i].isMain || updated[j].isMain) ? 3 : 2
            
            if (distance < maxDistance) {
              updated[i].connections.push(j)
            }
          }
        }
        
        return updated
      })
    }, 500) // AUMENTADO de 100ms a 500ms
    
    return () => clearInterval(interval)
  }, [isPaused])
  
  // Animación de partículas - OPTIMIZADA
  useFrame((state, delta) => {
    if (!meshRef.current || !isInView || isPaused) return
    
    // LIMITAR FPS
    const frameLimit = 1/30 // 30 FPS máximo
    if (delta < frameLimit) return
    
    const time = state.clock.getElapsedTime()
    
    particles.forEach((particle, i) => {
      // Movimiento flotante
      particle.position.x += particle.velocity.x
      particle.position.y += particle.velocity.y
      particle.position.z += particle.velocity.z
      
      // Atracción hacia el centro para nodos principales
      if (particle.isMain) {
        const center = new THREE.Vector3(0, 0, 0)
        const direction = center.sub(particle.position).normalize()
        particle.position.add(direction.multiplyScalar(0.001)) // REDUCIDO
      }
      
      // Límites
      ['x', 'y', 'z'].forEach(axis => {
        const limit = axis === 'z' ? 2 : 3
        if (Math.abs(particle.position[axis as 'x' | 'y' | 'z']) > limit) {
          particle.velocity[axis as 'x' | 'y' | 'z'] *= -1
        }
      })
      
      // Influencia del mouse - SIMPLIFICADA
      if (i % 2 === 0) { // Solo la mitad de las partículas responden al mouse
        const mouseInfluence = new THREE.Vector3(mouse.x * 2, mouse.y * 2, 0)
        const mouseDistance = particle.position.distanceTo(mouseInfluence)
        if (mouseDistance < 2) {
          const repulsion = particle.position.clone().sub(mouseInfluence).normalize()
          particle.position.add(repulsion.multiplyScalar(0.01 * (1 - mouseDistance / 2)))
        }
      }
      
      // Actualizar instancia
      const matrix = new THREE.Matrix4()
      const scale = particle.size * (1 + Math.sin(time * 2 + i) * 0.05) // REDUCIDO de 0.1
      matrix.makeScale(scale, scale, scale)
      matrix.setPosition(particle.position)
      meshRef.current!.setMatrixAt(i, matrix)
      
      // Color basado en tipo
      const color = new THREE.Color(particle.isMain ? '#FFD700' : '#B8860B')
      meshRef.current!.setColorAt(i, color)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  })
  
  // Geometría para las partículas - OPTIMIZADA
  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 8, 8), []) // REDUCIDO de 16,16
  const material = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#FFD700',
    transparent: true,
    opacity: 0.8
  }), [])
  
  // Pre-computar líneas
  const lines = useMemo(() => {
    if (!isInView || isPaused) return []
    
    const lineElements: JSX.Element[] = []
    const maxLines = 20 // LIMITAR número total de líneas
    let lineCount = 0
    
    particles.forEach((particle, i) => {
      if (lineCount >= maxLines) return
      
      particle.connections.forEach(targetId => {
        if (lineCount >= maxLines) return
        
        const target = particles[targetId]
        if (!target) return
        
        const distance = particle.position.distanceTo(target.position)
        const opacity = Math.max(0.1, 1 - distance / 3) * 0.3 // REDUCIDO opacidad
        
        lineElements.push(
          <Line
            key={`${i}-${targetId}`}
            points={[particle.position, target.position]}
            color="#FFD700"
            lineWidth={particle.isMain || target.isMain ? 1.5 : 1}
            transparent
            opacity={opacity}
          />
        )
        lineCount++
      })
    })
    
    return lineElements
  }, [particles, isInView, isPaused])
  
  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[sphereGeometry, material, particleCount]}
        frustumCulled={false}
      />
      
      {/* Conexiones optimizadas */}
      <group ref={linesRef}>
        {lines}
      </group>
    </>
  )
}

function QuestionParticles({ isInView, isPaused }: { isInView: boolean; isPaused: boolean }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [opacity, setOpacity] = useState(0)
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)
  
  // Cambiar pregunta cada 8 segundos - AUMENTADO de 6
  useEffect(() => {
    if (!isInView || isPaused) return
    
    const interval = setInterval(() => {
      if (!hovered) {
        setOpacity(0)
        setTimeout(() => {
          setCurrentQuestionIndex((prev) => (prev + 1) % preguntasReveladoras.length)
          setOpacity(1)
        }, 500)
      }
    }, 8000)
    
    setTimeout(() => setOpacity(1), 1000)
    
    return () => clearInterval(interval)
  }, [isInView, hovered, isPaused])
  
  useFrame((state, delta) => {
    if (!groupRef.current || !isInView || isPaused) return
    
    // LIMITAR FPS
    const frameLimit = 1/30
    if (delta < frameLimit) return
    
    const time = state.clock.getElapsedTime()
    
    // Órbita simplificada
    const radius = 3.5
    const speed = 0.2 // REDUCIDO de 0.3
    groupRef.current.position.x = Math.cos(time * speed) * radius
    groupRef.current.position.z = Math.sin(time * speed) * radius
    groupRef.current.position.y = Math.sin(time * 0.3) * 0.5 // REDUCIDO
    
    groupRef.current.lookAt(0, 0, 0)
  })
  
  return (
    <group ref={groupRef}>
      <Text
        fontSize={0.3}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
        textAlign="center"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff"
      >
        {preguntasReveladoras[currentQuestionIndex]}
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={opacity}
        />
      </Text>
    </group>
  )
}

function SophiaCore({ isPaused }: { isPaused: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state, delta) => {
    if (!meshRef.current || isPaused) return
    
    const frameLimit = 1/30
    if (delta < frameLimit) return
    
    const time = state.clock.getElapsedTime()
    
    // Rotación suave
    meshRef.current.rotation.y = time * 0.1 // REDUCIDO de 0.2
    
    // Pulso más sutil
    const scale = 1 + Math.sin(time) * 0.05 // REDUCIDO
    meshRef.current.scale.setScalar(scale)
  })
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 16, 16]} /> {/* REDUCIDO de 32,32 */}
      <meshBasicMaterial
        color="#FFD700"
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

interface NeuralNetwork3DProps {
  isInView: boolean
}

const preguntasReveladoras = [
  "¿Qué harías si el fracaso no existiera?",
  "¿Cuándo fue la última vez que te escuchaste de verdad?",
  "¿Qué parte de ti has estado silenciando?",
  "¿Para quién estás viviendo realmente?",
  "¿Qué te da miedo descubrir sobre ti mismo?"
]

// Detectar capacidad del dispositivo
const getDeviceCapability = () => {
  const gpu = (navigator as any).gpu
  const memory = (navigator as any).deviceMemory || 4
  const cores = navigator.hardwareConcurrency || 4
  
  if (memory <= 4 || cores <= 4) return 'low'
  if (memory <= 8 || cores <= 8) return 'medium'
  return 'high'
}

export default function NeuralNetwork3D({ isInView }: NeuralNetwork3DProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium')
  
  useEffect(() => {
    // Detectar capacidad del dispositivo
    setQuality(getDeviceCapability() as any)
    
    // Pausar cuando no está visible
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden || !isInView)
    }
    
    const handleBlur = () => setIsPaused(true)
    const handleFocus = () => setIsPaused(false)
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
    }
  }, [isInView])
  
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          antialias: quality === 'high',
          alpha: true,
          powerPreference: "low-power", // CAMBIADO de high-performance
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false
        }}
        dpr={[1, quality === 'high' ? 2 : 1.5]} // Limitar DPR
        frameloop={isPaused ? "never" : "demand"} // Solo renderizar cuando sea necesario
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <SophiaCore isPaused={isPaused} />
        <NeuralParticles isInView={isInView} isPaused={isPaused} />
        {quality !== 'low' && <QuestionParticles isInView={isInView} isPaused={isPaused} />}
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          enableRotate={quality === 'high'}
          autoRotate={quality !== 'low'}
          autoRotateSpeed={0.3}
        />
        
        {/* Post-processing solo en alta calidad */}
        {quality === 'high' && (
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.4}
              luminanceSmoothing={0.9}
              intensity={1}
              radius={0.5}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}