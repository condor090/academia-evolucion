import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { theme } from '@/styles/theme'
import Link from 'next/link'
import { diasModulo1, fases, estadisticasModulo1 } from '@/data/modulo1-dias'

// Container Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.gradients.darkToBlack};
  position: relative;
  overflow-x: hidden;
  padding-top: 80px; /* Agregar espacio para el navigation fijo */
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']} ${theme.spacing.md};
`

// Hero Section
const ModuleHero = styled.section`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: radial-gradient(ellipse at center, rgba(255, 215, 0, 0.15) 0%, transparent 60%);
  overflow: hidden;
`

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  position: relative;
`

const ModuleNumber = styled(motion.div)`
  width: 150px;
  height: 150px;
  margin: 0 auto ${theme.spacing.xl};
  background: ${theme.gradients.goldPrimary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes['6xl']};
  font-weight: bold;
  color: ${theme.colors.background.black};
  box-shadow: ${theme.colors.shadows.goldGlowIntense};
`

const ModuleTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 300;
  margin-bottom: ${theme.spacing.md};
  background: ${theme.gradients.goldPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const ModuleSubtitle = styled(motion.p)`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.text.lightWhite};
  font-weight: 300;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`

// Floating elements
const FloatingElement = styled(motion.div)`
  position: absolute;
  pointer-events: none;
`

const GlowOrb = styled(FloatingElement)`
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  filter: blur(40px);
`

// Content Sections
const Section = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  position: relative;
`

const SectionTitle = styled(motion.h2)`
  font-size: ${theme.fontSizes['4xl']};
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
  font-weight: 300;
  
  span {
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const ContentDescription = styled(motion.p)`
  text-align: center;
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.lightWhite};
  max-width: 800px;
  margin: 0 auto ${theme.spacing['3xl']};
  line-height: 1.8;
`

// Journey Timeline
const TimelineContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  padding: ${theme.spacing['2xl']} 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, transparent, ${theme.colors.primary.gold}, transparent);
    transform: translateX(-50%);
    
    @media (max-width: ${theme.breakpoints.md}) {
      left: 40px;
    }
  }
`

const WeekContainer = styled(motion.div)<{ align: 'left' | 'right' }>`
  position: relative;
  padding: ${theme.spacing.xl} 0;
  display: flex;
  align-items: center;
  justify-content: ${props => props.align === 'left' ? 'flex-end' : 'flex-start'};
  
  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: flex-start;
    padding-left: 80px;
  }
`

const WeekContent = styled.div<{ align: 'left' | 'right' }>`
  width: 45%;
  padding: ${theme.spacing.xl};
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 215, 0, 0.02) 100%);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  text-align: ${props => props.align};
  transition: all ${theme.animation.duration.normal} ease;
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 215, 0, 0.04) 100%);
    border-color: rgba(255, 215, 0, 0.4);
    transform: translateY(-5px);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    text-align: left;
  }
`

const WeekDot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background: ${theme.colors.primary.gold};
  border: 4px solid ${theme.colors.background.black};
  border-radius: 50%;
  z-index: 2;
  
  @media (max-width: ${theme.breakpoints.md}) {
    left: 40px;
  }
`

const WeekTitle = styled.h3`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes['2xl']};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 400;
`

const WeekSubtitle = styled.h4`
  color: ${theme.colors.primary.goldLight};
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.md};
  font-style: italic;
`

const WeekDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  font-size: ${theme.fontSizes.lg};
`

// Exercises Section
const ExerciseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['3xl']};
`

const ExerciseCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 215, 0, 0.02) 100%);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all ${theme.animation.duration.normal} ease;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    border-color: ${theme.colors.primary.gold};
    box-shadow: ${theme.colors.shadows.goldGlow};
    
    &::before {
      opacity: 1;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity ${theme.animation.duration.normal} ease;
  }
`

const ExerciseNumber = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  width: 50px;
  height: 50px;
  background: ${theme.gradients.goldPrimary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.background.black};
`

const ExerciseTitle = styled.h4`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.md};
  padding-right: 60px;
  position: relative;
  z-index: 1;
`

const ExerciseDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.md};
  position: relative;
  z-index: 1;
`

const ExerciseDuration = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: rgba(255, 215, 0, 0.6);
  font-size: ${theme.fontSizes.sm};
  position: relative;
  z-index: 1;
`

// Sophia Section
const SophiaSection = styled.div`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.03) 0%, transparent 100%);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing['3xl']};
  margin: ${theme.spacing['3xl']} auto;
  max-width: 900px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 50%);
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    to { transform: rotate(360deg); }
  }
`

const SophiaQuote = styled.h3`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.primary.gold};
  font-weight: 300;
  font-style: italic;
  margin-bottom: ${theme.spacing.xl};
  position: relative;
  z-index: 1;
`

const SophiaDescription = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  position: relative;
  z-index: 1;
`

// Navigation
const ModuleNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing['4xl']};
  padding-top: ${theme.spacing['2xl']};
  border-top: 1px solid rgba(255, 215, 0, 0.1);
`

const NavButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.primary.gold};
  font-weight: 500;
  transition: all ${theme.animation.duration.normal} ease;
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    background: rgba(255, 215, 0, 0.2);
    transform: translateX(${props => props.className?.includes('prev') ? '-5px' : '5px'});
    box-shadow: ${theme.colors.shadows.goldGlow};
  }
  
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`

// Modal Component
const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.xl};
`

const ModalContent = styled(motion.div)`
  background: ${theme.gradients.darkToBlack};
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing['3xl']};
  max-width: 600px;
  width: 100%;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  background: none;
  border: none;
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes['2xl']};
  cursor: pointer;
  transition: all ${theme.animation.duration.fast} ease;
  
  &:hover {
    transform: rotate(90deg);
  }
`

export default function Modulo1() {
  const router = useRouter()
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null)
  
  useEffect(() => {
    console.log('[MODULO-1] Component mounted at:', new Date().toISOString())
    console.log('[MODULO-1] Router:', router)
    console.log('[MODULO-1] Selected exercise:', selectedExercise)
    
    return () => {
      console.log('[MODULO-1] Component unmounting')
    }
  }, [router, selectedExercise])
  
  const weeklyJourney = [
    {
      week: "Semana 1",
      title: "El Despertar",
      description: "Reconoces por primera vez la distancia entre quien eres y quien pretendes ser. Los primeros días serán de observación sin juicio. Notarás patrones que han dirigido tu vida desde las sombras.",
      align: "left" as const
    },
    {
      week: "Semana 2",
      title: "La Rendición",
      description: "Dejas de luchar contra ti mismo. Aceptas que no sabes quién eres, y esa es la puerta. La rendición no es derrota, es el comienzo de tu verdadera victoria.",
      align: "right" as const
    }
  ]
  
  // Usar los datos de configuración de 15 días
  const exercises = diasModulo1
  
  console.log('[MODULO-1] Rendering component')
  
  return (
    <PageContainer>
      {/* Hero Section */}
      <ModuleHero>
        <GlowOrb
          initial={{ x: -300, y: -200, scale: 0.8 }}
          animate={{ 
            x: [-300, -200, -300],
            y: [-200, -100, -200],
            scale: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <HeroContent>
          <ModuleNumber
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              damping: 15,
              stiffness: 100,
              duration: 1
            }}
          >
            1
          </ModuleNumber>
          
          <ModuleTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            El Encuentro Interior
          </ModuleTitle>
          
          <ModuleSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            15 días de navegación mental divididos en 3 fases: EXPLORAR, SENTIR, ACTUAR.
            Transforma de navegante novato a capitán experto de tu embarcación mental.
          </ModuleSubtitle>
        </HeroContent>
        
        <GlowOrb
          initial={{ x: 300, y: 200, scale: 0.6 }}
          animate={{ 
            x: [300, 200, 300],
            y: [200, 100, 200],
            scale: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </ModuleHero>
      
      <Container>
        {/* Introduction */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            La <span>Primera Puerta</span> de tu Transformación
          </SectionTitle>
          
          <ContentDescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Has pasado años acumulando conocimiento sobre el mundo exterior, 
            pero ¿cuánto sabes realmente sobre tu mundo interior? Este módulo no te dará más información;
            te dará claridad. No te enseñará quién deberías ser; te revelará quién ya eres.
          </ContentDescription>
        </Section>
        
        {/* Weekly Journey */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Tu <span>Journey</span> de 2 Semanas
          </SectionTitle>
          
          <TimelineContainer>
            {weeklyJourney.map((week, index) => (
              <WeekContainer
                key={index}
                align={week.align}
                initial={{ opacity: 0, x: week.align === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                viewport={{ once: true }}
              >
                <WeekDot />
                <WeekContent align={week.align}>
                  <WeekTitle>{week.week}</WeekTitle>
                  <WeekSubtitle>{week.title}</WeekSubtitle>
                  <WeekDescription>{week.description}</WeekDescription>
                </WeekContent>
              </WeekContainer>
            ))}
          </TimelineContainer>
        </Section>
        
        {/* Exercises */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span>4 Experiencias</span> Reveladoras
          </SectionTitle>
          
          <ContentDescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Cada ejercicio es una puerta. No las atravieses con prisa. 
            La transformación real requiere presencia, no velocidad.
          </ContentDescription>
          
          <ExerciseGrid>
            {exercises.map((exercise, index) => (
              <ExerciseCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedExercise(exercise.numero)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExerciseNumber>{exercise.icon} {exercise.numero}</ExerciseNumber>
                <ExerciseTitle>{exercise.titulo}</ExerciseTitle>
                <ExerciseDescription>{exercise.subtitulo}</ExerciseDescription>
                <ExerciseDuration>
                  <span>⏱</span> {exercise.duracion}
                </ExerciseDuration>
              </ExerciseCard>
            ))}
          </ExerciseGrid>
        </Section>
        
        {/* Sophia's Guidance */}
        <Section>
          <SophiaSection>
            <SophiaQuote>
              "No busques respuestas. Busca mejores preguntas."
            </SophiaQuote>
            <SophiaDescription>
              Durante estas dos semanas, Sophia será tu espejo consciente. 
              No te dirá quién eres; te hará las preguntas que te revelarán a ti mismo. 
              Cada conversación es una excavación arqueológica de tu ser olvidado.
              Prepárate para descubrir tesoros que siempre estuvieron ahí.
            </SophiaDescription>
          </SophiaSection>
        </Section>
        
        {/* Navigation */}
        <ModuleNav>
          <NavButton className="prev disabled">
            ← Módulo Anterior
          </NavButton>
          
          <Link href="/modules" passHref>
            <NavButton style={{ background: 'transparent', border: 'none' }}>
              Ver todos los módulos
            </NavButton>
          </Link>
          
          <Link href="/modules/modulo-2" passHref>
            <NavButton className="next">
              Siguiente Módulo →
            </NavButton>
          </Link>
        </ModuleNav>
      </Container>
      
      {/* Exercise Modal */}
      <AnimatePresence>
        {selectedExercise && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExercise(null)}
          >
            <ModalContent
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedExercise(null)}>×</CloseButton>
              <ExerciseTitle style={{ fontSize: theme.fontSizes['3xl'], marginBottom: theme.spacing.lg }}>
                {exercises.find(e => e.numero === selectedExercise)?.icon} {exercises.find(e => e.numero === selectedExercise)?.titulo}
              </ExerciseTitle>
              <ExerciseDescription style={{ fontSize: theme.fontSizes.xl, marginBottom: theme.spacing.md }}>
                <strong>{exercises.find(e => e.numero === selectedExercise)?.subtitulo}</strong>
              </ExerciseDescription>
              <ExerciseDescription style={{ fontSize: theme.fontSizes.lg, marginBottom: theme.spacing.xl }}>
                {exercises.find(e => e.numero === selectedExercise)?.descripcion}
              </ExerciseDescription>
              <ExerciseDuration style={{ fontSize: theme.fontSizes.lg, marginBottom: theme.spacing.md }}>
                <span>⏱</span> Duración: {exercises.find(e => e.numero === selectedExercise)?.duracion}
              </ExerciseDuration>
              <ExerciseDuration style={{ fontSize: theme.fontSizes.base, color: theme.colors.primary.gold }}>
                <span>🎯</span> Fase: {exercises.find(e => e.numero === selectedExercise)?.fase.toUpperCase()}
              </ExerciseDuration>
              <ExerciseDuration style={{ fontSize: theme.fontSizes.base }}>
                <span>🏆</span> Insignia: {exercises.find(e => e.numero === selectedExercise)?.insignia}
              </ExerciseDuration>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </PageContainer>
  )
}