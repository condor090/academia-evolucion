import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Partículas orbitando alrededor de un nodo
function NodeParticles({ position, color }: { position: [number, number, number], color: string }) {
  const particlesRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 30
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 0.3 + Math.random() * 0.2
      positions[i * 3] = Math.cos(angle) * radius + position[0]
      positions[i * 3 + 1] = Math.sin(angle) * radius + position[1]
      positions[i * 3 + 2] = Math.sin(angle * 2) * radius + position[2]
    }

    return positions
  }, [position])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.5
      particlesRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Nodo individual del grafo con efectos mejorados
function Node({ position, color = '#FFD700', planeIndex }: {
  position: [number, number, number],
  color?: string,
  planeIndex?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Pulsación más dramática
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3 + position[0]) * 0.2
      meshRef.current.scale.setScalar(scale)

      // Rotación suave
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }

    if (glowRef.current) {
      const glowScale = 1.5 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3
      glowRef.current.scale.setScalar(glowScale)
    }
  })

  // Diferentes geometrías según el plano
  const geometry = planeIndex === 0 ? (
    <icosahedronGeometry args={[0.2, 1]} />
  ) : planeIndex === 1 ? (
    <octahedronGeometry args={[0.18, 0]} />
  ) : planeIndex === 2 ? (
    <dodecahedronGeometry args={[0.16, 0]} />
  ) : planeIndex === 3 ? (
    <tetrahedronGeometry args={[0.2, 0]} />
  ) : (
    <sphereGeometry args={[0.15, 32, 32]} />
  )

  return (
    <group position={position}>
      {/* Glow exterior */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Nodo principal */}
      <mesh ref={meshRef}>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          metalness={0.9}
          roughness={0.1}
          wireframe={Math.random() > 0.7}
        />
      </mesh>

      {/* Luz puntual más intensa */}
      <pointLight color={color} intensity={2} distance={3} decay={2} />

      {/* Partículas orbitando */}
      <NodeParticles position={[0, 0, 0]} color={color} />
    </group>
  )
}

// Partícula de energía que fluye por la conexión
function EnergyFlow({ start, end, color, delay = 0 }: {
  start: [number, number, number],
  end: [number, number, number],
  color: string,
  delay?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const progress = ((state.clock.elapsedTime + delay) % 2) / 2
      const x = start[0] + (end[0] - start[0]) * progress
      const y = start[1] + (end[1] - start[1]) * progress
      const z = start[2] + (end[2] - start[2]) * progress
      meshRef.current.position.set(x, y, z)
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} />
      <pointLight color={color} intensity={1} distance={1} />
    </mesh>
  )
}

// Conexión entre nodos con flujo de energía
function Connection({ start, end, color = '#FFD700', index = 0 }: {
  start: [number, number, number],
  end: [number, number, number],
  color?: string,
  index?: number
}) {
  const lineRef = useRef<THREE.Line>(null)

  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)]
  }, [start, end])

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points)
  }, [points])

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 20, 0.01, 8, false)
  }, [curve])

  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.2
    }
  })

  return (
    <group>
      {/* Tubo de conexión */}
      <mesh ref={lineRef} geometry={tubeGeometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Partículas de energía fluyendo */}
      <EnergyFlow start={start} end={end} color={color} delay={index * 0.3} />
      <EnergyFlow start={start} end={end} color={color} delay={index * 0.3 + 1} />
    </group>
  )
}

// Grafo completo
function KnowledgeGraphScene() {
  const groupRef = useRef<THREE.Group>(null)

  // Generar nodos en forma de red 3D
  const nodes = useMemo(() => {
    const nodePositions: Array<{ pos: [number, number, number], color: string, planeIndex?: number }> = []
    const colors = [
      '#8A2BE2', // Plano I - Violeta
      '#00CED1', // Plano II - Cyan
      '#FF8C00', // Plano III - Naranja
      '#DAA520', // Plano IV - Dorado
      '#FFD700', // Plano V - Oro brillante
    ]

    // Nodo central (sin planeIndex específico)
    nodePositions.push({ pos: [0, 0, 0], color: '#FFD700', planeIndex: undefined })

    // 5 grupos de nodos (uno por cada Plano de Claridad)
    for (let plane = 0; plane < 5; plane++) {
      const angle = (plane / 5) * Math.PI * 2
      const radius = 2

      // Nodo principal del plano
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      nodePositions.push({ pos: [x, 0, z], color: colors[plane], planeIndex: plane })

      // Nodos secundarios del plano
      for (let i = 0; i < 3; i++) {
        const subAngle = angle + (Math.random() - 0.5) * 0.8
        const subRadius = radius + Math.random() * 1.5
        const subX = Math.cos(subAngle) * subRadius
        const subZ = Math.sin(subAngle) * subRadius
        const subY = (Math.random() - 0.5) * 1.5
        nodePositions.push({
          pos: [subX, subY, subZ],
          color: colors[plane],
          planeIndex: plane
        })
      }
    }

    return nodePositions
  }, [])

  // Generar conexiones
  const connections = useMemo(() => {
    const conns: Array<{ start: [number, number, number], end: [number, number, number], color: string }> = []

    // Conectar todos los nodos al centro
    for (let i = 1; i < nodes.length; i++) {
      conns.push({
        start: nodes[0].pos,
        end: nodes[i].pos,
        color: nodes[i].color
      })
    }

    // Conexiones entre nodos cercanos
    for (let i = 1; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodes[i].pos[0] - nodes[j].pos[0], 2) +
          Math.pow(nodes[i].pos[1] - nodes[j].pos[1], 2) +
          Math.pow(nodes[i].pos[2] - nodes[j].pos[2], 2)
        )

        if (dist < 2.5 && Math.random() > 0.6) {
          conns.push({
            start: nodes[i].pos,
            end: nodes[j].pos,
            color: '#FFD700'
          })
        }
      }
    }

    return conns
  }, [nodes])

  // Rotación suave del grafo
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Conexiones */}
      {connections.map((conn, i) => (
        <Connection
          key={`conn-${i}`}
          start={conn.start}
          end={conn.end}
          color={conn.color}
          index={i}
        />
      ))}

      {/* Nodos */}
      {nodes.map((node, i) => (
        <Node
          key={`node-${i}`}
          position={node.pos}
          color={node.color}
          planeIndex={node.planeIndex}
        />
      ))}
    </group>
  )
}

// Componente principal exportable
export default function KnowledgeGraph3D() {
  return (
    <div style={{ width: '100%', height: '300px', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <KnowledgeGraphScene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
