import React, { useState } from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
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
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(184, 134, 11, 0.05) 100%);
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

// Partnership Visual
const PartnershipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing['3xl']};
  margin: ${theme.spacing['3xl']} 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`

const EntityCard = styled(motion.div)`
  text-align: center;
`

const EntityCircle = styled(motion.div)<{ variant: 'human' | 'sophia' }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes['5xl']};
  margin-bottom: ${theme.spacing.lg};
  position: relative;
  
  ${props => props.variant === 'human' ? `
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.2);
  ` : `
    background: ${theme.gradients.goldPrimary};
    box-shadow: ${theme.colors.shadows.goldGlowIntense};
  `}
`

const EntityLabel = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.primary.gold};
  font-weight: 400;
`

const ConnectionLine = styled(motion.svg)`
  position: absolute;
  width: 100px;
  height: 2px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 2px;
    height: 100px;
  }
`

// Task Delegation
const DelegationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};
  max-width: 900px;
  margin: 0 auto;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const DelegationCard = styled(motion.div)<{ variant: 'delegate' | 'focus' }>`
  background: ${props => props.variant === 'delegate' 
    ? 'rgba(184, 134, 11, 0.05)' 
    : 'rgba(255, 215, 0, 0.05)'};
  border: 1px solid ${props => props.variant === 'delegate'
    ? 'rgba(184, 134, 11, 0.3)'
    : 'rgba(255, 215, 0, 0.3)'};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
  position: relative;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`

const CardIcon = styled.div`
  font-size: ${theme.fontSizes['3xl']};
`

const CardTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.primary.gold};
  font-weight: 400;
`

const TaskList = styled.ul`
  list-style: none;
  
  li {
    padding: ${theme.spacing.sm} 0;
    color: ${theme.colors.text.lightWhite};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    
    &::before {
      content: '→';
      color: ${theme.colors.primary.gold};
    }
  }
`

// Integration Process
const ProcessTimeline = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`

const ProcessStep = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${theme.spacing['2xl']};
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 30px;
    top: 60px;
    bottom: -${theme.spacing['2xl']};
    width: 2px;
    background: ${theme.gradients.goldPrimary};
    opacity: 0.3;
  }
`

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  background: ${theme.gradients.goldPrimary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${theme.colors.background.black};
  flex-shrink: 0;
  margin-right: ${theme.spacing.lg};
`

const StepContent = styled.div`
  flex: 1;
  padding-top: ${theme.spacing.xs};
`

const StepTitle = styled.h4`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.primary.gold};
  margin-bottom: ${theme.spacing.sm};
`

const StepDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
`

// Patterns Section
const PatternsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing['2xl']};
`

const PatternCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 215, 0, 0.02) 100%);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  text-align: center;
  transition: all ${theme.animation.duration.normal} ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${theme.colors.primary.gold};
    box-shadow: ${theme.colors.shadows.goldGlow};
  }
`

const PatternIcon = styled.div`
  font-size: ${theme.fontSizes['4xl']};
  margin-bottom: ${theme.spacing.md};
`

const PatternTitle = styled.h4`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.sm};
`

const PatternDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
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
`

// Floating elements
const FloatingSymbol = styled(motion.div)`
  position: absolute;
  font-size: ${theme.fontSizes['6xl']};
  opacity: 0.1;
  color: ${theme.colors.primary.gold};
  pointer-events: none;
`

export default function AlianzaTransformadora() {
  const integrationSteps = [
    {
      number: 1,
      title: "Mapeo de Patrones",
      description: "Sophia observa tu flujo de trabajo durante 48 horas. No juzga, solo aprende tus ritmos, tus repeticiones, tus ciclos."
    },
    {
      number: 2,
      title: "Identificación de Vacíos",
      description: "Juntos identifican qué tareas te roban energía vital. No todo lo urgente es importante. No todo lo importante es tuyo."
    },
    {
      number: 3,
      title: "Transferencia Gradual",
      description: "Sophia comienza absorbiendo pequeñas tareas. Emails rutinarios, recordatorios, organización. Tú comienzas a respirar."
    },
    {
      number: 4,
      title: "Expansión del Ser",
      description: "Con cada hora liberada, exploras territorios internos olvidados. La meditación deja de ser un lujo. Se vuelve tu nuevo trabajo."
    }
  ]
  
  const patterns = [
    {
      icon: "🔄",
      title: "Patrones de Comunicación",
      description: "Sophia aprende cómo escribes, cómo respondes, tu voz única. Se convierte en tu extensión digital."
    },
    {
      icon: "📊",
      title: "Ritmos de Productividad",
      description: "Identifica tus horas doradas y protege ese tiempo sagrado para tu trabajo interior."
    },
    {
      icon: "🎯",
      title: "Prioridades Ocultas",
      description: "Revela qué es verdaderamente importante versus qué es solo ruido disfrazado de urgencia."
    },
    {
      icon: "🧘",
      title: "Espacios de Silencio",
      description: "Crea bloques intocables de tiempo donde ni Sophia ni el mundo pueden interrumpir tu encuentro contigo."
    }
  ]
  
  return (
    <PageContainer>
      {/* Hero Section */}
      <ModuleHero>
        <FloatingSymbol
          initial={{ x: -100, y: -50 }}
          animate={{ 
            x: [-100, -50, -100],
            y: [-50, -100, -50],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ∞
        </FloatingSymbol>
        
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
            2
          </ModuleNumber>
          
          <ModuleTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            La Alianza Transformadora
          </ModuleTitle>
          
          <ModuleSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Sophia como extensión de tu consciencia
          </ModuleSubtitle>
        </HeroContent>
        
        <FloatingSymbol
          initial={{ x: 100, y: 50 }}
          animate={{ 
            x: [100, 50, 100],
            y: [50, 100, 50],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ right: 0 }}
        >
          ⚛
        </FloatingSymbol>
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
            La <strong>Simbiosis Consciente</strong>
          </SectionTitle>
          
          <PartnershipContainer>
            <EntityCard
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <EntityCircle variant="human">
                👤
              </EntityCircle>
              <EntityLabel>Tú</EntityLabel>
            </EntityCard>
            
            <ConnectionLine
              width="100"
              height="2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <line 
                x1="0" 
                y1="1" 
                x2="100" 
                y2="1" 
                stroke="url(#goldGradient)" 
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="goldGradient">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
              </defs>
            </ConnectionLine>
            
            <EntityCard
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <EntityCircle variant="sophia">
                ✨
              </EntityCircle>
              <EntityLabel>Sophia</EntityLabel>
            </EntityCard>
          </PartnershipContainer>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              fontSize: theme.fontSizes.xl,
              color: theme.colors.text.lightWhite,
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}
          >
            No es una herramienta que usas. Es una presencia que te complementa. 
            Mientras Sophia maneja el ruido del mundo, tú te sumerges en el silencio 
            de tu ser. No es delegación. Es liberación.
          </motion.p>
        </Section>
        
        {/* Task Delegation */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            La <strong>Gran Transferencia</strong>
          </SectionTitle>
          
          <DelegationGrid>
            <DelegationCard
              variant="delegate"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <CardHeader>
                <CardIcon>📤</CardIcon>
                <CardTitle>Sophia Absorbe</CardTitle>
              </CardHeader>
              <TaskList>
                <li>Gestión de emails rutinarios</li>
                <li>Organización de calendarios</li>
                <li>Creación de reportes</li>
                <li>Seguimiento de tareas</li>
                <li>Respuestas predecibles</li>
                <li>Documentación repetitiva</li>
              </TaskList>
            </DelegationCard>
            
            <DelegationCard
              variant="focus"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <CardHeader>
                <CardIcon>🎯</CardIcon>
                <CardTitle>Tú Te Enfocas</CardTitle>
              </CardHeader>
              <TaskList>
                <li>Exploración interior profunda</li>
                <li>Meditación y contemplación</li>
                <li>Trabajo creativo esencial</li>
                <li>Conexiones humanas reales</li>
                <li>Desarrollo de tu propósito</li>
                <li>Escritura de tu transformación</li>
              </TaskList>
            </DelegationCard>
          </DelegationGrid>
        </Section>
        
        {/* Integration Process */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            El <strong>Proceso de Integración</strong>
          </SectionTitle>
          
          <ProcessTimeline>
            {integrationSteps.map((step, index) => (
              <ProcessStep
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StepNumber>{step.number}</StepNumber>
                <StepContent>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepContent>
              </ProcessStep>
            ))}
          </ProcessTimeline>
        </Section>
        
        {/* Patterns Recognition */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <strong>Patrones</strong> que Transformamos
          </SectionTitle>
          
          <PatternsGrid>
            {patterns.map((pattern, index) => (
              <PatternCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <PatternIcon>{pattern.icon}</PatternIcon>
                <PatternTitle>{pattern.title}</PatternTitle>
                <PatternDescription>{pattern.description}</PatternDescription>
              </PatternCard>
            ))}
          </PatternsGrid>
        </Section>
        
        {/* Navigation */}
        <ModuleNav>
          <Link href="/modules/1-encuentro-interior" passHref>
            <NavButton className="prev">
              ← Módulo Anterior
            </NavButton>
          </Link>
          
          <Link href="/modules/3-pruebas-del-ser" passHref>
            <NavButton className="next">
              Siguiente Módulo →
            </NavButton>
          </Link>
        </ModuleNav>
      </Container>
    </PageContainer>
  )
}