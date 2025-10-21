import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Nodo individual del grafo
function Node({ position, color = '#FFD700' }: { position: [number, number, number], color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Pulsación suave
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
      {/* Glow effect */}
      <pointLight color={color} intensity={0.5} distance={2} />
    </mesh>
  )
}

// Conexión entre nodos
function Connection({ start, end, color = '#FFD700' }: {
  start: [number, number, number],
  end: [number, number, number],
  color?: string
}) {
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)]
  }, [start, end])

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    return geometry
  }, [points])

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.3}
        linewidth={2}
      />
    </line>
  )
}

// Grafo completo
function KnowledgeGraphScene() {
  const groupRef = useRef<THREE.Group>(null)

  // Generar nodos en forma de red 3D
  const nodes = useMemo(() => {
    const nodePositions: Array<{ pos: [number, number, number], color: string }> = []
    const colors = [
      '#8A2BE2', // Plano I - Violeta
      '#00CED1', // Plano II - Cyan
      '#FF8C00', // Plano III - Naranja
      '#DAA520', // Plano IV - Dorado
      '#FFD700', // Plano V - Oro brillante
    ]

    // Nodo central
    nodePositions.push({ pos: [0, 0, 0], color: '#FFD700' })

    // 5 grupos de nodos (uno por cada Plano de Claridad)
    for (let plane = 0; plane < 5; plane++) {
      const angle = (plane / 5) * Math.PI * 2
      const radius = 2

      // Nodo principal del plano
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      nodePositions.push({ pos: [x, 0, z], color: colors[plane] })

      // Nodos secundarios del plano
      for (let i = 0; i < 3; i++) {
        const subAngle = angle + (Math.random() - 0.5) * 0.8
        const subRadius = radius + Math.random() * 1.5
        const subX = Math.cos(subAngle) * subRadius
        const subZ = Math.sin(subAngle) * subRadius
        const subY = (Math.random() - 0.5) * 1.5
        nodePositions.push({
          pos: [subX, subY, subZ],
          color: colors[plane]
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
        <Connection key={`conn-${i}`} start={conn.start} end={conn.end} color={conn.color} />
      ))}

      {/* Nodos */}
      {nodes.map((node, i) => (
        <Node key={`node-${i}`} position={node.pos} color={node.color} />
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
