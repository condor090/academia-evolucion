import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { motion, useAnimation } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box, Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'
import { useAuth } from '@/contexts/AuthContext'
import { useJourney } from '@/contexts/JourneyContext'

// Types
interface Neuron {
  id: string
  position: [number, number, number]
  activated: boolean
  type: 'primary' | 'secondary' | 'tertiary'
  connections: string[]
  label?: string
}

interface NeuralConnection {
  from: string
  to: string
  strength: number
  active: boolean
}

interface TransformationMetric {
  label: string
  value: number
  max: number
  color: string
  icon: string
}

// Styled Components
const DashboardContainer = styled.div`
  width: 100%;
  height: 600px;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
`

const VisualizationArea = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  position: relative;
  overflow: hidden;
`

const MetricsPanel = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const MetricCard = styled(motion.div)`
  background: rgba(255, 215, 0, 0.05);
  border-radius: 10px;
  padding: 15px;
  border: 1px solid rgba(255, 215, 0, 0.2);
`

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const MetricLabel = styled.span`
  color: #FFD700;
  font-size: 0.9rem;
  font-weight: 500;
`

const MetricValue = styled(motion.span)`
  color: #FFF;
  font-size: 1.5rem;
  font-weight: bold;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
`

const ProgressFill = styled(motion.div)<{ color: string }>`
  height: 100%;
  background: ${props => props.color};
  border-radius: 4px;
  box-shadow: 0 0 10px ${props => props.color}40;
`

const StatusIndicator = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #FFD700;
  border-radius: 20px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
`

const PulseIndicator = styled(motion.div)`
  width: 12px;
  height: 12px;
  background: #4CAF50;
  border-radius: 50%;
  box-shadow: 0 0 20px #4CAF50;
`

const InsightNotification = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.2) 100%);
  border: 1px solid #FFD700;
  border-radius: 15px;
  padding: 15px;
  z-index: 10;
`

// 3D Neuron Component
const NeuronNode: React.FC<{ neuron: Neuron; onClick: () => void }> = ({ neuron, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current && neuron.activated) {
      meshRef.current.rotation.y += 0.01
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.scale.setScalar(scale * (neuron.type === 'primary' ? 1.5 : neuron.type === 'secondary' ? 1.2 : 1))
    }
  })
  
  const getColor = () => {
    if (!neuron.activated) return '#333333'
    switch (neuron.type) {
      case 'primary': return '#FFD700'
      case 'secondary': return '#FFA500'
      case 'tertiary': return '#FF6347'
      default: return '#FFD700'
    }
  }
  
  return (
    <group position={neuron.position}>
      <Sphere
        ref={meshRef}
        args={[0.3, 32, 32]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={getColor()}
          emissive={neuron.activated ? getColor() : '#000000'}
          emissiveIntensity={neuron.activated ? 0.5 : 0}
          metalness={0.3}
          roughness={0.4}
        />
      </Sphere>
      
      {neuron.activated && (
        <pointLight
          color={getColor()}
          intensity={2}
          distance={3}
        />
      )}
      
      {hovered && neuron.label && (
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.15}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
        >
          {neuron.label}
        </Text>
      )}
    </group>
  )
}

// Connection Line Component
const ConnectionLine: React.FC<{ 
  start: [number, number, number], 
  end: [number, number, number], 
  strength: number,
  active: boolean 
}> = ({ start, end, strength, active }) => {
  const lineRef = useRef<THREE.Line>(null)
  
  useFrame((state) => {
    if (lineRef.current && active) {
      const material = lineRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2
    }
  })
  
  return (
    <Line
      ref={lineRef}
      points={[start, end]}
      color={active ? '#FFD700' : '#333333'}
      lineWidth={strength * 2}
      transparent
      opacity={active ? 0.5 : 0.1}
    />
  )
}

// Main Component
export const NeuralProgressDashboard: React.FC = () => {
  const { user } = useAuth()
  const { stats, modules } = useJourney()
  
  const [neurons, setNeurons] = useState<Neuron[]>([])
  const [connections, setConnections] = useState<NeuralConnection[]>([])
  const [latestInsight, setLatestInsight] = useState<string>('')
  const [showInsight, setShowInsight] = useState(false)
  
  // Initialize neural network
  useEffect(() => {
    const generateNeurons = () => {
      const newNeurons: Neuron[] = []
      
      // Primary neurons (core concepts)
      for (let i = 0; i < 3; i++) {
        newNeurons.push({
          id: `primary_${i}`,
          position: [
            Math.sin((i / 3) * Math.PI * 2) * 2,
            0,
            Math.cos((i / 3) * Math.PI * 2) * 2
          ],
          activated: i === 0, // First one starts activated
          type: 'primary',
          connections: [],
          label: ['Autodescubrimiento', 'Sophia IA', 'Propósito'][i]
        })
      }
      
      // Secondary neurons
      for (let i = 0; i < 5; i++) {
        newNeurons.push({
          id: `secondary_${i}`,
          position: [
            Math.sin((i / 5) * Math.PI * 2) * 3.5,
            (Math.random() - 0.5) * 2,
            Math.cos((i / 5) * Math.PI * 2) * 3.5
          ],
          activated: false,
          type: 'secondary',
          connections: [`primary_${i % 3}`]
        })
      }
      
      // Tertiary neurons
      for (let i = 0; i < 8; i++) {
        newNeurons.push({
          id: `tertiary_${i}`,
          position: [
            Math.sin((i / 8) * Math.PI * 2) * 5,
            (Math.random() - 0.5) * 3,
            Math.cos((i / 8) * Math.PI * 2) * 5
          ],
          activated: false,
          type: 'tertiary',
          connections: [`secondary_${i % 5}`]
        })
      }
      
      setNeurons(newNeurons)
      
      // Generate connections
      const newConnections: NeuralConnection[] = []
      newNeurons.forEach(neuron => {
        neuron.connections.forEach(targetId => {
          newConnections.push({
            from: neuron.id,
            to: targetId,
            strength: neuron.type === 'primary' ? 3 : neuron.type === 'secondary' ? 2 : 1,
            active: false
          })
        })
      })
      setConnections(newConnections)
    }
    
    generateNeurons()
  }, [])
  
  // Simulate neuron activation based on progress
  useEffect(() => {
    const totalProgress = modules.reduce((acc, m) => acc + m.progress, 0) / modules.length
    const neuronsToActivate = Math.floor((totalProgress / 100) * neurons.length)
    
    setNeurons(prev => prev.map((neuron, index) => ({
      ...neuron,
      activated: index < neuronsToActivate
    })))
    
    setConnections(prev => prev.map(conn => ({
      ...conn,
      active: neurons.find(n => n.id === conn.from)?.activated && 
              neurons.find(n => n.id === conn.to)?.activated || false
    })))
  }, [modules, neurons.length])
  
  // Metrics data
  const metrics: TransformationMetric[] = [
    {
      label: 'Horas Liberadas',
      value: stats.totalHoursLiberated,
      max: 240, // 20 hours/week * 12 weeks
      color: '#4CAF50',
      icon: '⏰'
    },
    {
      label: 'Insights Descubiertos',
      value: stats.insightsDiscovered,
      max: 100,
      color: '#FFD700',
      icon: '💡'
    },
    {
      label: 'Transformación',
      value: stats.transformationScore,
      max: 100,
      color: '#9B59B6',
      icon: '🦋'
    },
    {
      label: 'Racha Actual',
      value: stats.currentStreak,
      max: 30,
      color: '#FF6347',
      icon: '🔥'
    }
  ]
  
  // Simulate receiving insights
  useEffect(() => {
    const insights = [
      "Has descubierto un patrón en tu forma de procrastinar",
      "Tu genio se activa mejor en las mañanas",
      "La delegación a Sophia liberó 3 horas esta semana",
      "Tu propósito se está cristalizando en torno a la educación"
    ]
    
    const interval = setInterval(() => {
      const randomInsight = insights[Math.floor(Math.random() * insights.length)]
      setLatestInsight(randomInsight)
      setShowInsight(true)
      setTimeout(() => setShowInsight(false), 5000)
    }, 15000)
    
    return () => clearInterval(interval)
  }, [])
  
  const handleNeuronClick = (neuronId: string) => {
    console.log('Neuron clicked:', neuronId)
    // Add interaction logic here
  }
  
  return (
    <DashboardContainer>
      <VisualizationArea>
        <StatusIndicator
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <PulseIndicator
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <span style={{ color: '#FFF' }}>Red Neural Activa</span>
        </StatusIndicator>
        
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          
          {/* Neural Network */}
          {neurons.map(neuron => (
            <NeuronNode
              key={neuron.id}
              neuron={neuron}
              onClick={() => handleNeuronClick(neuron.id)}
            />
          ))}
          
          {/* Connections */}
          {connections.map((conn, index) => {
            const fromNeuron = neurons.find(n => n.id === conn.from)
            const toNeuron = neurons.find(n => n.id === conn.to)
            if (!fromNeuron || !toNeuron) return null
            
            return (
              <ConnectionLine
                key={index}
                start={fromNeuron.position}
                end={toNeuron.position}
                strength={conn.strength}
                active={conn.active}
              />
            )
          })}
          
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
        
        {showInsight && (
          <InsightNotification
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}>💡</span>
              <div>
                <div style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '5px' }}>
                  Nuevo Insight Descubierto
                </div>
                <div style={{ color: '#FFF', fontSize: '0.9rem' }}>
                  {latestInsight}
                </div>
              </div>
            </div>
          </InsightNotification>
        )}
      </VisualizationArea>
      
      <MetricsPanel>
        <h3 style={{ color: '#FFD700', margin: '0 0 10px 0' }}>
          Métricas de Transformación
        </h3>
        
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <MetricHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>{metric.icon}</span>
                <MetricLabel>{metric.label}</MetricLabel>
              </div>
              <MetricValue
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 + index * 0.1 }}
              >
                {metric.value}
              </MetricValue>
            </MetricHeader>
            
            <ProgressBar>
              <ProgressFill
                color={metric.color}
                initial={{ width: 0 }}
                animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            </ProgressBar>
          </MetricCard>
        ))}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: 'auto',
            padding: '15px',
            background: 'rgba(255, 215, 0, 0.1)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            textAlign: 'center'
          }}
        >
          <div style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '5px' }}>
            Nivel Actual
          </div>
          <div style={{ color: '#FFF', fontSize: '1.2rem' }}>
            🌟 Despertar Dorado
          </div>
          <div style={{ color: '#CCC', fontSize: '0.8rem', marginTop: '5px' }}>
            5,247 / 10,000 XP
          </div>
        </motion.div>
      </MetricsPanel>
    </DashboardContainer>
  )
}

export default NeuralProgressDashboard