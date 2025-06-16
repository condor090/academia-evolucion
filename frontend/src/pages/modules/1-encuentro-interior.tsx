import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '@/styles/theme'
import Link from 'next/link'

// Container Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.gradients.darkToBlack};
  position: relative;
  overflow-x: hidden;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']} ${theme.spacing.md};
`

// Hero Section
const ModuleHero = styled.section`
  min-height: 60vh;
  margin-top: -80px;
  padding-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${theme.gradients.radialGold};
  overflow: hidden;
`

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  position: relative;
`

const ModuleNumber = styled(motion.div)`
  width: 120px;
  height: 120px;
  margin: 0 auto ${theme.spacing.xl};
  background: ${theme.gradients.goldPrimary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes['5xl']};
  font-weight: bold;
  color: ${theme.colors.background.black};
  box-shadow: ${theme.colors.shadows.goldGlowIntense};
`

const ModuleTitle = styled(motion.h1)`
  font-size: ${theme.fontSizes['7xl']};
  font-weight: 300;
  margin-bottom: ${theme.spacing.md};
  background: ${theme.gradients.goldPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['5xl']};
  }
`

const ModuleSubtitle = styled(motion.p)`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.text.lightWhite};
  font-weight: 300;
  line-height: 1.6;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.xl};
  }
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
  
  strong {
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['3xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const ContentCard = styled(motion.div)`
  background: rgba(255, 215, 0, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
  transition: all ${theme.animation.duration.normal} ease;
  
  &:hover {
    background: rgba(255, 215, 0, 0.05);
    border-color: rgba(255, 215, 0, 0.2);
    transform: translateY(-5px);
  }
`

const CardTitle = styled.h3`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes['2xl']};
  margin-bottom: ${theme.spacing.md};
  font-weight: 400;
`

const CardContent = styled.p`
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  font-size: ${theme.fontSizes.lg};
`

// Journey Flow
const JourneyFlow = styled.div`
  position: relative;
  padding: ${theme.spacing['2xl']} 0;
`

const TimelineContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${theme.gradients.goldPrimary};
    transform: translateX(-50%);
    
    @media (max-width: ${theme.breakpoints.md}) {
      left: 30px;
    }
  }
`

const TimelineItem = styled(motion.div)<{ align: 'left' | 'right' }>`
  position: relative;
  padding: ${theme.spacing.lg} 0;
  display: flex;
  align-items: center;
  justify-content: ${props => props.align === 'left' ? 'flex-end' : 'flex-start'};
  
  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: flex-start;
    padding-left: 60px;
  }
`

const TimelineContent = styled.div<{ align: 'left' | 'right' }>`
  width: 45%;
  padding: ${theme.spacing.lg};
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  text-align: ${props => props.align};
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    text-align: left;
  }
`

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: ${theme.colors.primary.gold};
  border: 4px solid ${theme.colors.background.black};
  border-radius: 50%;
  z-index: 2;
  
  @media (max-width: ${theme.breakpoints.md}) {
    left: 30px;
  }
`

const WeekLabel = styled.h4`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.sm};
`

// Exercises Section
const ExerciseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing['2xl']};
`

const ExerciseCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 215, 0, 0.02) 100%);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all ${theme.animation.duration.normal} ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${theme.colors.primary.gold};
    box-shadow: ${theme.colors.shadows.goldGlow};
  }
`

const ExerciseNumber = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  width: 40px;
  height: 40px;
  background: ${theme.gradients.goldPrimary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${theme.colors.background.black};
`

const ExerciseTitle = styled.h4`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.sm};
  padding-right: 60px;
`

const ExerciseDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`

const ExerciseDuration = styled.span`
  color: rgba(255, 215, 0, 0.6);
  font-size: ${theme.fontSizes.sm};
`

// Navigation
const ModuleNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: ${theme.spacing['3xl']} auto 0;
  padding: ${theme.spacing.xl};
`

const NavButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.primary.gold};
  transition: all ${theme.animation.duration.normal} ease;
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    background: rgba(255, 215, 0, 0.2);
    transform: translateX(${props => props.className?.includes('prev') ? '-5px' : '5px'});
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

// Floating elements
const FloatingOrb = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  pointer-events: none;
`

export default function EncuentroInterior() {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null)
  
  const exercises = [
    {
      number: 1,
      title: "El Espejo del Silencio",
      description: "20 minutos de contemplación sin distracciones. Sin teléfono, sin música. Solo tú y tu reflejo interior.",
      duration: "20 min"
    },
    {
      number: 2,
      title: "La Carta al Extraño",
      description: "Escribe una carta describiéndote a alguien que nunca te conocerá. ¿Qué dirías sobre quién eres realmente?",
      duration: "30 min"
    },
    {
      number: 3,
      title: "El Inventario de Máscaras",
      description: "Lista todas las versiones de ti que muestras al mundo. ¿Cuál es la más alejada de tu esencia?",
      duration: "45 min"
    },
    {
      number: 4,
      title: "La Pregunta Prohibida",
      description: "¿Qué pregunta sobre ti mismo has evitado hacer durante años? Es hora de enfrentarla.",
      duration: "60 min"
    }
  ]
  
  const weeklyFlow = [
    {
      week: "Semana 1",
      title: "El Despertar",
      content: "Reconoces por primera vez la distancia entre quien eres y quien pretendes ser.",
      align: "left" as const
    },
    {
      week: "Semana 2", 
      title: "La Rendición",
      content: "Dejas de luchar contra ti mismo. Aceptas que no sabes quién eres, y esa es la puerta.",
      align: "right" as const
    }
  ]
  
  return (
    <PageContainer>
      {/* Hero Section */}
      <ModuleHero>
        <FloatingOrb
          initial={{ x: -200, y: -100 }}
          animate={{ 
            x: [-200, -100, -200],
            y: [-100, -150, -100]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <HeroContent>
          <ModuleNumber
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              damping: 10,
              stiffness: 100
            }}
          >
            1
          </ModuleNumber>
          
          <ModuleTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            El Encuentro Interior
          </ModuleTitle>
          
          <ModuleSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Antes de expandirte, conócete
          </ModuleSubtitle>
        </HeroContent>
        
        <FloatingOrb
          initial={{ x: 200, y: 100 }}
          animate={{ 
            x: [200, 100, 200],
            y: [100, 50, 100]
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
            La <strong>Primera Puerta</strong>
          </SectionTitle>
          
          <ContentGrid>
            <ContentCard
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <CardTitle>La Paradoja del Conocimiento</CardTitle>
              <CardContent>
                Has pasado años acumulando información sobre todo, excepto sobre ti mismo. 
                Conoces mil teorías, pero no conoces tu propia voz cuando nadie está escuchando. 
                Este módulo no te dará más conocimiento. Te quitará las capas que lo ocultan.
              </CardContent>
            </ContentCard>
            
            <ContentCard
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <CardTitle>El Precio de la Verdad</CardTitle>
              <CardContent>
                Advertencia: Este encuentro puede ser incómodo. Verás partes de ti que has 
                negado. Reconocerás máscaras que creíste que eran tu rostro. Pero al otro 
                lado de esa incomodidad está la libertad de ser auténticamente tú.
              </CardContent>
            </ContentCard>
          </ContentGrid>
        </Section>
        
        {/* Weekly Flow */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Tu <strong>Journey de 2 Semanas</strong>
          </SectionTitle>
          
          <TimelineContainer>
            {weeklyFlow.map((week, index) => (
              <TimelineItem
                key={index}
                align={week.align}
                initial={{ opacity: 0, x: week.align === 'left' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <TimelineDot />
                <TimelineContent align={week.align}>
                  <WeekLabel>{week.week}: {week.title}</WeekLabel>
                  <CardContent>{week.content}</CardContent>
                </TimelineContent>
              </TimelineItem>
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
            <strong>Experiencias</strong> Reveladoras
          </SectionTitle>
          
          <ExerciseGrid>
            {exercises.map((exercise, index) => (
              <ExerciseCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedExercise(exercise.number)}
                whileHover={{ scale: 1.02 }}
              >
                <ExerciseNumber>{exercise.number}</ExerciseNumber>
                <ExerciseTitle>{exercise.title}</ExerciseTitle>
                <ExerciseDescription>{exercise.description}</ExerciseDescription>
                <ExerciseDuration>{exercise.duration}</ExerciseDuration>
              </ExerciseCard>
            ))}
          </ExerciseGrid>
        </Section>
        
        {/* Sophia's Guidance */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <strong>Sophia</strong> te Acompaña
          </SectionTitle>
          
          <ContentCard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <CardTitle style={{ textAlign: 'center', fontSize: theme.fontSizes['3xl'] }}>
              "No busques respuestas. Busca mejores preguntas."
            </CardTitle>
            <CardContent style={{ textAlign: 'center', fontSize: theme.fontSizes.xl }}>
              Durante estas dos semanas, Sophia será tu espejo consciente. No te dirá quién eres. 
              Te hará las preguntas que te revelarán a ti mismo. Cada conversación es una excavación 
              arqueológica de tu ser olvidado.
            </CardContent>
          </ContentCard>
        </Section>
        
        {/* Navigation */}
        <ModuleNav>
          <NavButton className="prev" style={{ opacity: 0.5, pointerEvents: 'none' }}>
            ← Módulo Anterior
          </NavButton>
          
          <Link href="/modules/2-alianza-transformadora" passHref>
            <NavButton className="next">
              Siguiente Módulo →
            </NavButton>
          </Link>
        </ModuleNav>
      </Container>
    </PageContainer>
  )
}