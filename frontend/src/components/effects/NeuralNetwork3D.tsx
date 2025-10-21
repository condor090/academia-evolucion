import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, Environment, Text, Line } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
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

function NeuralParticles({ isInView }: { isInView: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()
  
  const [particles, setParticles] = useState<Particle[]>([])
  const particleCount = 30 // Aumentado de 20 a 30 para mejor distribución
  
  // Inicializar partículas
  useEffect(() => {
    const newParticles: Particle[] = []
    
    // Nodos principales (centro) - Expandidos
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2
      const radius = 1.5 // Aumentado de 1 a 1.5
      newParticles.push({
        id: i,
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          (Math.random() - 0.5) * 1 // Aumentado de 0.5 a 1
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        connections: [],
        isMain: true,
        size: 0.2, // Aumentado de 0.15 a 0.2
        intensity: 1
      })
    }
    
    // Nodos secundarios - Área expandida
    for (let i = 3; i < particleCount; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 8, // Aumentado de 4 a 8
        (Math.random() - 0.5) * 8, // Aumentado de 4 a 8
        (Math.random() - 0.5) * 4  // Aumentado de 2 a 4
      )
      
      newParticles.push({
        id: i,
        position,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005
        ),
        connections: [],
        isMain: false,
        size: 0.1, // Aumentado de 0.08 a 0.1
        intensity: 0.7
      })
    }
    
    setParticles(newParticles)
  }, [])
  
  // Actualizar conexiones basadas en distancia
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prevParticles => {
        const updated = [...prevParticles]
        
        // Limpiar conexiones existentes
        updated.forEach(p => p.connections = [])
        
        // Crear nuevas conexiones
        for (let i = 0; i < updated.length; i++) {
          for (let j = i + 1; j < updated.length; j++) {
            const distance = updated[i].position.distanceTo(updated[j].position)
            const maxDistance = (updated[i].isMain || updated[j].isMain) ? 3.5 : 2.5 // Aumentado de 2.5/1.8 a 3.5/2.5
            
            if (distance < maxDistance) {
              updated[i].connections.push(j)
            }
          }
        }
        
        return updated
      })
    }, 100)
    
    return () => clearInterval(interval)
  }, [])
  
  // Animación de partículas
  useFrame((state) => {
    if (!meshRef.current || !isInView) return
    
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
        particle.position.add(direction.multiplyScalar(0.002))
      }
      
      // Límites expandidos
      ['x', 'y', 'z'].forEach(axis => {
        const limit = axis === 'z' ? 3 : 5 // Aumentado de 1.5/2.5 a 3/5
        if (Math.abs(particle.position[axis as 'x' | 'y' | 'z']) > limit) {
          particle.velocity[axis as 'x' | 'y' | 'z'] *= -1
        }
      })
      
      // Influencia del mouse expandida
      const mouseInfluence = new THREE.Vector3(mouse.x * 4, mouse.y * 4, 0) // Aumentado de 2 a 4
      const mouseDistance = particle.position.distanceTo(mouseInfluence)
      if (mouseDistance < 3) { // Aumentado de 2 a 3
        const repulsion = particle.position.clone().sub(mouseInfluence).normalize()
        particle.position.add(repulsion.multiplyScalar(0.02 * (1 - mouseDistance / 3)))
      }
      
      // Actualizar instancia
      const matrix = new THREE.Matrix4()
      const scale = particle.size * (1 + Math.sin(time * 2 + i) * 0.1)
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
  
  // Geometría para las partículas
  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 16, 16), [])
  const material = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#FFD700',
    transparent: true,
    opacity: 0.9
  }), [])
  
  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[sphereGeometry, material, particleCount]}
        frustumCulled={false}
      />
      
      {/* Conexiones */}
      <group ref={linesRef}>
        {isInView && particles.map((particle, i) => 
          particle.connections.map(targetId => {
            const target = particles[targetId]
            if (!target) return null
            
            const distance = particle.position.distanceTo(target.position)
            const opacity = Math.max(0.1, 1 - distance / 3.5) * 0.5 // Ajustado para nuevo tamaño
            
            return (
              <Line
                key={`${i}-${targetId}`}
                points={[particle.position, target.position]}
                color="#FFD700"
                transparent
                opacity={opacity}
                lineWidth={particle.isMain || target.isMain ? 2 : 1}
              />
            )
          })
        )}
      </group>
    </>
  )
}

function QuestionParticles({ isInView }: { isInView: boolean }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [opacity, setOpacity] = useState(0)
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()
  
  // Cambiar pregunta cada 6 segundos
  useEffect(() => {
    if (!isInView) return
    
    const interval = setInterval(() => {
      if (!hovered) {
        setOpacity(0)
        setTimeout(() => {
          setCurrentQuestionIndex((prev) => (prev + 1) % preguntasReveladoras.length)
          setOpacity(1)
        }, 500)
      }
    }, 6000)
    
    // Fade in inicial
    setTimeout(() => setOpacity(1), 1000)
    
    return () => clearInterval(interval)
  }, [isInView, hovered])
  
  useFrame((state) => {
    if (!groupRef.current || !isInView) return
    
    const time = state.clock.getElapsedTime()
    
    // Órbita alrededor del centro - Radio expandido
    const radius = 4.5 + Math.sin(time * 0.5) * 0.3 // Aumentado de 2.5 a 4.5
    const speed = 0.3
    groupRef.current.position.x = Math.cos(time * speed) * radius
    groupRef.current.position.z = Math.sin(time * speed) * radius
    groupRef.current.position.y = Math.sin(time * 0.5) * 1 // Aumentado de 0.5 a 1
    
    // Siempre mirar al centro
    groupRef.current.lookAt(0, 0, 0)
    
    // Efecto de hover
    const mouseDistance = Math.sqrt(
      Math.pow(mouse.x * 2 - groupRef.current.position.x / 2, 2) +
      Math.pow(mouse.y * 2 - groupRef.current.position.y / 2, 2)
    )
    
    const isHovered = mouseDistance < 0.5
    setHovered(isHovered)
    
    if (isHovered) {
      groupRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
    } else {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
    
    // Animar partículas decorativas
    if (particlesRef.current) {
      particlesRef.current.rotation.z = time * 0.5
    }
  })
  
  return (
    <group ref={groupRef}>
      <Text
        fontSize={0.35} // Aumentado de 0.25 a 0.35 para mejor visibilidad
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        maxWidth={6} // Aumentado de 4 a 6
        textAlign="center"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff"
        letterSpacing={0.02}
        lineHeight={1.4}
      >
        {preguntasReveladoras[currentQuestionIndex]}
        <meshStandardMaterial
          color="#FFD700"
          transparent
          opacity={opacity}
          emissive="#FFD700"
          emissiveIntensity={0.5}
        />
      </Text>
      
      {/* Partículas decorativas alrededor del texto */}
      <group ref={particlesRef}>
        {[...Array(12)].map((_, i) => { // Aumentado de 8 a 12 partículas
          const angle = (i / 12) * Math.PI * 2
          const particleRadius = 1.2 // Aumentado de 0.8 a 1.2
          return (
            <Float
              key={i}
              speed={4}
              rotationIntensity={0.2}
              floatIntensity={0.3}
              floatingRange={[-0.1, 0.1]}
            >
              <mesh
                position={[
                  Math.cos(angle) * particleRadius,
                  Math.sin(angle) * particleRadius * 0.5,
                  0
                ]}
              >
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshStandardMaterial
                  color="#FFD700"
                  emissive="#FFD700"
                  emissiveIntensity={hovered ? 2 : 0.5}
                  transparent
                  opacity={opacity * 0.8}
                />
              </mesh>
            </Float>
          )
        })}
      </group>
      
      {/* Línea conectora al núcleo - Ajustada al nuevo tamaño */}
      {opacity > 0 && (
        <mesh>
          <cylinderGeometry args={[0.008, 0.008, 4.5, 8]} /> {/* Aumentado de 0.005/2.5 a 0.008/4.5 */}
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={opacity * 0.2}
          />
        </mesh>
      )}
    </group>
  )
}

function SophiaCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Rotación suave
    meshRef.current.rotation.y = time * 0.2
    
    // Pulso más sutil para el tamaño original
    const scale = 1 + Math.sin(time * 2) * 0.1 // Regresado de 1.2 a 1 base
    meshRef.current.scale.setScalar(scale)
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} /> {/* Regresado de 1.5 a 1 - tamaño original */}
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Halo exterior - También ajustado proporcionalmente */}
      <mesh scale={[1.5, 1.5, 1.5]}> {/* Regresado de 2.2 a 1.5 */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </Float>
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
  "¿Qué te da miedo descubrir sobre ti mismo?",
  "¿Cuál es la mentira que te sigues contando?",
  "¿Qué pasaría si ya fueras suficiente?",
  "¿A qué te aferras que ya no te sirve?",
  "¿Qué cambiaría si supieras que tienes un propósito único?",
  "¿Quién serías sin tus miedos?"
]

export default function NeuralNetwork3D({ isInView }: NeuralNetwork3DProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }} // Cámara más alejada (de 5 a 10) y FOV más amplio (de 60 a 75)
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <SophiaCore />
        <NeuralParticles isInView={isInView} />
        <QuestionParticles isInView={isInView} />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={1.5}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}