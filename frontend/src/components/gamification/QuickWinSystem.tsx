import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sparkles, Text3D, Float } from '@react-three/drei'
import { useAuth } from '@/contexts/AuthContext'
import { useJourney } from '@/contexts/JourneyContext'

// Types
interface QuickWin {
  id: string
  title: string
  description: string
  xp: number
  timeLimit: number
  type: 'instant' | 'reflection' | 'action'
  completed: boolean
  unlockedFeature?: string
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: Date
}

// Styled Components
const QuickWinContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 380px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border: 1px solid #FFD700;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
  z-index: 1000;
`

const QuickWinHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h3`
  color: #FFD700;
  font-size: 1.2rem;
  margin: 0;
  font-weight: 600;
`

const Timer = styled(motion.div)`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid #FFD700;
  border-radius: 20px;
  padding: 5px 15px;
  font-size: 0.9rem;
  color: #FFD700;
  font-weight: bold;
`

const WinCard = styled(motion.div)<{ completed: boolean }>`
  background: ${props => props.completed 
    ? 'linear-gradient(135deg, #2d4a2b 0%, #3d5a3b 100%)'
    : 'rgba(255, 215, 0, 0.05)'};
  border: 1px solid ${props => props.completed ? '#4CAF50' : 'rgba(255, 215, 0, 0.3)'};
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(-5px);
    box-shadow: 0 5px 20px rgba(255, 215, 0, 0.2);
  }
`

const WinTitle = styled.h4`
  color: #FFD700;
  margin: 0 0 5px 0;
  font-size: 1rem;
`

const WinDescription = styled.p`
  color: #ccc;
  margin: 0 0 10px 0;
  font-size: 0.85rem;
  line-height: 1.4;
`

const XPBadge = styled(motion.span)`
  display: inline-block;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #000;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
`

const CelebrationOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2000;
`

const AchievementCard = styled(motion.div)`
  background: linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%);
  border: 2px solid #FFD700;
  border-radius: 25px;
  padding: 40px;
  text-align: center;
  max-width: 500px;
  box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);
`

const AchievementIcon = styled(motion.div)`
  font-size: 4rem;
  margin-bottom: 20px;
`

const NeuralActivation = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 30px;
  height: 30px;
  background: radial-gradient(circle, #FFD700 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }
`

// 3D Neural Visualization Component
const NeuralVisualization: React.FC<{ activated: number }> = ({ activated }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <Float speed={2} rotationIntensity={0.5}>
        <Text3D
          font="/fonts/bebas-neue.json"
          size={0.5}
          height={0.1}
          curveSegments={12}
        >
          {`${activated} Neuronas Activadas`}
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
        </Text3D>
      </Float>
      
      <Sparkles
        count={activated * 10}
        scale={5}
        size={2}
        speed={0.5}
        color="#FFD700"
      />
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

// Main Component
export const QuickWinSystem: React.FC = () => {
  const { user } = useAuth()
  const { updateModuleProgress, addInsight } = useJourney()
  
  const [quickWins, setQuickWins] = useState<QuickWin[]>([
    {
      id: 'qw1',
      title: 'Primera Pregunta Reveladora',
      description: 'Responde a Sophia: "¿Qué harías si el fracaso no existiera?"',
      xp: 50,
      timeLimit: 30,
      type: 'reflection',
      completed: false,
      unlockedFeature: 'Perfil de Genio'
    },
    {
      id: 'qw2',
      title: 'Delega tu Primera Tarea',
      description: 'Permite que Sophia maneje una tarea repetitiva por ti',
      xp: 100,
      timeLimit: 60,
      type: 'action',
      completed: false,
      unlockedFeature: 'Dashboard de Liberación'
    },
    {
      id: 'qw3',
      title: 'Descubre tu Primera Hora',
      description: 'Identifica 60 minutos que puedes liberar esta semana',
      xp: 200,
      timeLimit: 90,
      type: 'instant',
      completed: false,
      unlockedFeature: 'Calculadora de Tiempo'
    }
  ])
  
  const [showCelebration, setShowCelebration] = useState(false)
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes total
  const [neuronsActivated, setNeuronsActivated] = useState(0)
  
  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  const completeQuickWin = async (winId: string) => {
    const win = quickWins.find(w => w.id === winId)
    if (!win || win.completed) return
    
    // Mark as completed
    setQuickWins(prev => prev.map(w => 
      w.id === winId ? { ...w, completed: true } : w
    ))
    
    // Update progress
    updateModuleProgress(1, 20) // 20% progress for first module
    
    // Add neurons
    setNeuronsActivated(prev => prev + Math.floor(win.xp / 10))
    
    // Show celebration
    setCurrentAchievement({
      id: `ach_${winId}`,
      name: win.unlockedFeature || 'Nueva Capacidad',
      description: `Has desbloqueado: ${win.unlockedFeature}`,
      icon: '🧠',
      rarity: win.xp > 150 ? 'epic' : 'rare',
      unlockedAt: new Date()
    })
    setShowCelebration(true)
    
    // Auto-hide celebration
    setTimeout(() => setShowCelebration(false), 3000)
    
    // Add insight
    addInsight(1, `Completé: ${win.title}`)
  }
  
  const incompletedWins = quickWins.filter(w => !w.completed)
  const allCompleted = quickWins.every(w => w.completed)
  
  return (
    <>
      <AnimatePresence>
        {!allCompleted && (
          <QuickWinContainer
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <NeuralActivation />
            
            <QuickWinHeader>
              <Title>🚀 Quick Wins</Title>
              <Timer
                animate={{ scale: timeLeft < 60 ? [1, 1.1, 1] : 1 }}
                transition={{ repeat: timeLeft < 60 ? Infinity : 0, duration: 1 }}
              >
                ⏱️ {formatTime(timeLeft)}
              </Timer>
            </QuickWinHeader>
            
            {quickWins.map((win, index) => (
              <WinCard
                key={win.id}
                completed={win.completed}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => completeQuickWin(win.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <WinTitle>
                  {win.completed ? '✅ ' : '⭐ '}{win.title}
                </WinTitle>
                <WinDescription>{win.description}</WinDescription>
                <XPBadge
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  +{win.xp} XP
                </XPBadge>
              </WinCard>
            ))}
            
            {neuronsActivated > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '20px', height: '100px' }}
              >
                <NeuralVisualization activated={neuronsActivated} />
              </motion.div>
            )}
          </QuickWinContainer>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showCelebration && currentAchievement && (
          <CelebrationOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCelebration(false)}
          >
            <AchievementCard
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <AchievementIcon
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                {currentAchievement.icon}
              </AchievementIcon>
              
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ color: '#FFD700', marginBottom: '10px' }}
              >
                ¡Logro Desbloqueado!
              </motion.h2>
              
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ color: '#FFF', marginBottom: '10px' }}
              >
                {currentAchievement.name}
              </motion.h3>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ color: '#CCC' }}
              >
                {currentAchievement.description}
              </motion.p>
              
              <Sparkles
                count={50}
                scale={[0, 1, 0]}
                size={3}
                speed={0.5}
                color="#FFD700"
              />
            </AchievementCard>
          </CelebrationOverlay>
        )}
      </AnimatePresence>
    </>
  )
}

export default QuickWinSystem