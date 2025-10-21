import React, { useState } from 'react'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { theme } from '@/styles/theme'
import Link from 'next/link'

// Container Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.gradients.darkToBlack};
  position: relative;
  overflow-x: hidden;
  padding-top: 80px;
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
  max-width: 800px;
  margin: 0 auto;
  font-style: italic;
`

// Crystal Visualization Section
const CrystalSection = styled.div`
  padding: ${theme.spacing['4xl']} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const CrystalContainer = styled(motion.div)`
  width: 400px;
  height: 400px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotateCrystal 20s infinite linear;
  
  @keyframes rotateCrystal {
    from { transform: rotateY(0deg) rotateX(10deg); }
    to { transform: rotateY(360deg) rotateX(10deg); }
  }
`

const CrystalFace = styled(motion.div)<{ rotation: string; color: string }>`
  position: absolute;
  width: 200px;
  height: 300px;
  background: linear-gradient(135deg, ${props => props.color}40 0%, ${props => props.color}20 100%);
  border: 1px solid ${props => props.color};
  transform: ${props => props.rotation};
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.lightWhite};
  text-align: center;
  padding: ${theme.spacing.md};
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

// Weekly Structure
const WeekContainer = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
`

const WeekHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
`

const WeekTitle = styled.h3`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.primary.gold};
  margin-bottom: ${theme.spacing.sm};
`

const WeekSubtitle = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.lightWhite};
  font-style: italic;
`

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
`

const DayCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 215, 0, 0.02) 100%);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
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

const DayNumber = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  width: 40px;
  height: 40px;
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`

const DayTitle = styled.h4`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.md};
  padding-right: 50px;
`

const DayContent = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const DayItem = styled.li`
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.base};
  margin-bottom: ${theme.spacing.sm};
  padding-left: ${theme.spacing.md};
  position: relative;
  
  &::before {
    content: '→';
    position: absolute;
    left: 0;
    color: ${theme.colors.primary.gold};
  }
`

// Framework Section
const FrameworkContainer = styled.div`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.03) 0%, transparent 100%);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing['3xl']};
  margin: ${theme.spacing['3xl']} 0;
`

const FrameworkTitle = styled.h3`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.primary.gold};
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
`

const TestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
`

const TestCard = styled(motion.div)`
  text-align: center;
  padding: ${theme.spacing.xl};
  background: rgba(255, 215, 0, 0.05);
  border-radius: ${theme.borderRadius.lg};
  position: relative;
  overflow: hidden;
`

const TestIcon = styled.div`
  font-size: ${theme.fontSizes['3xl']};
  margin-bottom: ${theme.spacing.md};
`

const TestTitle = styled.h4`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.spacing.sm};
`

const TestDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.5;
`

// Dashboard Preview
const DashboardPreview = styled(motion.div)`
  background: ${theme.colors.background.black};
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  font-family: monospace;
  max-width: 600px;
  margin: 0 auto;
`

const DashboardTitle = styled.div`
  text-align: center;
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
`

const MetricRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`

const MetricLabel = styled.div`
  color: ${theme.colors.text.lightWhite};
`

const MetricBar = styled.div<{ value: number }>`
  flex: 1;
  height: 20px;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 10px;
  margin: 0 ${theme.spacing.md};
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${props => props.value}%;
    background: ${theme.gradients.goldPrimary};
    border-radius: 10px;
    transition: width 1s ease;
  }
`

const MetricValue = styled.div`
  color: ${theme.colors.primary.gold};
  min-width: 50px;
  text-align: right;
`

const ScoreDisplay = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid rgba(255, 215, 0, 0.2);
`

const ScoreValue = styled.div`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.primary.gold};
  font-weight: bold;
`

const ScoreLabel = styled.div`
  color: ${theme.colors.text.lightWhite};
  font-style: italic;
`

// Pricing Section
const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['3xl']};
`

const PricingCard = styled(motion.div)<{ featured?: boolean }>`
  background: ${props => props.featured 
    ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)'
    : 'rgba(255, 215, 0, 0.03)'};
  border: 2px solid ${props => props.featured 
    ? theme.colors.primary.gold 
    : 'rgba(255, 215, 0, 0.2)'};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  text-align: center;
  position: relative;
  transform: ${props => props.featured ? 'scale(1.05)' : 'scale(1)'};
`

const PricingTitle = styled.h4`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes['2xl']};
  margin-bottom: ${theme.spacing.md};
`

const PricingPrice = styled.div`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: bold;
  color: ${theme.colors.primary.goldLight};
  margin-bottom: ${theme.spacing.xl};
`

const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${theme.spacing.xl};
  text-align: left;
`

const PricingFeature = styled.li`
  color: ${theme.colors.text.lightWhite};
  margin-bottom: ${theme.spacing.sm};
  padding-left: ${theme.spacing.lg};
  position: relative;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${theme.colors.primary.gold};
  }
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
`

export default function Modulo4() {
  const router = useRouter()
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  
  const crystalFacets = [
    { label: 'Claridad de Misión', rotation: 'translateZ(100px) rotateY(0deg)', color: '#FFD700' },
    { label: 'Viabilidad AGI', rotation: 'translateZ(100px) rotateY(60deg)', color: '#FFA500' },
    { label: 'Resonancia Personal', rotation: 'translateZ(100px) rotateY(120deg)', color: '#FF8C00' },
    { label: 'Fuerza del Equipo', rotation: 'translateZ(100px) rotateY(180deg)', color: '#FFD700' },
    { label: 'Timing Óptimo', rotation: 'translateZ(100px) rotateY(240deg)', color: '#FFA500' },
    { label: 'Impacto Potencial', rotation: 'translateZ(100px) rotateY(300deg)', color: '#FF8C00' }
  ]
  
  const week9Days = [
    {
      day: 1,
      title: 'Síntesis + Framework',
      morning: 'Journey Interior',
      afternoon: 'Realidad Exterior',
      activities: [
        'Conectar puntos de 8 semanas',
        'Introducción a RESONANCE',
        'Vista previa Diagnóstico Dual'
      ]
    },
    {
      day: 2,
      title: 'Talentos + Test Anti-AGI',
      morning: 'Lo que Solo Tú Puedes Dar',
      afternoon: 'Test de Supervivencia',
      activities: [
        'Inventario de dones únicos',
        'Los 4 Tests Críticos Anti-AGI',
        'Identificar fortalezas defensivas'
      ]
    },
    {
      day: 3,
      title: 'Patrones + Resonancia',
      morning: 'Las Señales Siempre Estuvieron',
      afternoon: 'Resonancia de tu Marca',
      activities: [
        'Momentos de mayor vitalidad',
        'Análisis del nombre/marca',
        'Ajustes para mayor impacto'
      ]
    },
    {
      day: 4,
      title: 'Dolor Sanado + Equipo',
      morning: 'Tu Experiencia como Medicina',
      afternoon: 'Tu Equipo Ideal',
      activities: [
        'El dolor que transformaste',
        'Perfiles complementarios',
        'Cómo atraerlos a tu visión'
      ]
    },
    {
      day: 5,
      title: 'Intersección Sagrada',
      morning: 'Integración Total',
      afternoon: 'Cristalización',
      activities: [
        'Genio encuentra dolor del mundo',
        'Pasión encuentra rentabilidad',
        'Primera cristalización del propósito'
      ]
    }
  ]
  
  const week10Days = [
    {
      day: 1,
      title: 'Articulación + Score',
      morning: 'Una Frase que lo Cambia Todo',
      afternoon: 'Tu Score de Preparación',
      activities: [
        'Refinamiento de la declaración',
        'Resultados completos Anti-AGI',
        'Score integral y significado'
      ]
    },
    {
      day: 2,
      title: 'Manifiesto + Timing',
      morning: 'Tu Declaración al Universo',
      afternoon: 'Ventanas de Oportunidad',
      activities: [
        'Escribir manifiesto completo',
        'Mejores momentos para lanzar',
        'Calendario estratégico 2025-2026'
      ]
    },
    {
      day: 3,
      title: 'Legado + Plan de Acción',
      morning: 'El Mundo Después de tu Paso',
      afternoon: 'Los Próximos 1000 Días',
      activities: [
        'Carta desde tu yo de 80 años',
        'Roadmap detallado',
        'Métricas de progreso'
      ]
    },
    {
      day: 4,
      title: 'Recursos + Sostenibilidad',
      morning: 'Qué y Quién Necesitas',
      afternoon: 'Construyendo Moats',
      activities: [
        'Alianzas estratégicas',
        'Cómo hacerte irreemplazable',
        'Evolución continua'
      ]
    },
    {
      day: 5,
      title: 'Ceremonia de Compromiso',
      morning: 'Ritual de Cierre',
      afternoon: 'Activación Total',
      activities: [
        'Declaración pública',
        'Activación del cristal',
        'Transición al Nivel 5'
      ]
    }
  ]
  
  const antiAGITests = [
    {
      icon: '🧠',
      title: 'Test de Humanidad',
      description: '¿Requiere empatía y conexión humana profunda?'
    },
    {
      icon: '🎨',
      title: 'Test de Creatividad',
      description: '¿Necesita pensamiento lateral y originalidad única?'
    },
    {
      icon: '🤝',
      title: 'Test de Relaciones',
      description: '¿Depende de confianza y vínculos personales?'
    },
    {
      icon: '⚡',
      title: 'Test de Adaptación',
      description: '¿Requiere intuición y respuesta contextual?'
    }
  ]
  
  const dashboardMetrics = [
    { label: 'Propósito', value: 95 },
    { label: 'Anti-AGI', value: 78 },
    { label: 'Alineación', value: 92 },
    { label: 'Equipo', value: 65 },
    { label: 'Timing', value: 90 }
  ]
  
  const pricingTiers = [
    {
      title: 'BÁSICO',
      price: 'Incluido',
      features: [
        'Cristalización del propósito',
        'Test Anti-AGI básico',
        'Reporte simple 5 páginas',
        'Herramientas self-service'
      ]
    },
    {
      title: 'PRO',
      price: '$97',
      featured: true,
      features: [
        'Todo lo básico +',
        'Análisis completo RESONANCE',
        'Evaluación de equipo ideal',
        'Calendario de timing óptimo',
        'Reporte detallado 15 páginas'
      ]
    },
    {
      title: 'EXECUTIVE',
      price: '$497',
      features: [
        'Todo lo Pro +',
        'Sesión 1:1 (90 min)',
        'Plan de acción personalizado',
        '3 meses de seguimiento',
        'Comunidad privada'
      ]
    }
  ]
  
  return (
    <PageContainer>
      {/* Hero Section */}
      <ModuleHero>
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
            4
          </ModuleNumber>
          
          <ModuleTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            La Cristalización del Propósito
          </ModuleTitle>
          
          <ModuleSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            "Tu propósito ya existe. Solo necesitas reconocerlo... 
            y asegurarte de que sobreviva al futuro."
          </ModuleSubtitle>
        </HeroContent>
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
            <span>Diagnóstico Dual</span> para tu Misión
          </SectionTitle>
          
          <ContentDescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Después de 8 semanas de transformación profunda, llega el momento decisivo: 
            cristalizar tu propósito único en el mundo. Pero en la era de la AGI, 
            un propósito sin estrategia es solo un sueño hermoso.
          </ContentDescription>
        </Section>
        
        {/* Crystal Visualization */}
        <CrystalSection>
          <CrystalContainer
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {crystalFacets.map((facet, index) => (
              <CrystalFace
                key={index}
                rotation={facet.rotation}
                color={facet.color}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                {facet.label}
              </CrystalFace>
            ))}
          </CrystalContainer>
        </CrystalSection>
        
        {/* Week 9 */}
        <Section>
          <WeekContainer>
            <WeekHeader
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <WeekTitle>SEMANA 9: El Reconocimiento Estratégico</WeekTitle>
              <WeekSubtitle>Donde tu propósito encuentra su forma sostenible</WeekSubtitle>
            </WeekHeader>
            
            <DaysGrid>
              {week9Days.map((day, index) => (
                <DayCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedDay(day.day)}
                  whileHover={{ scale: 1.02 }}
                >
                  <DayNumber>{day.day}</DayNumber>
                  <DayTitle>{day.title}</DayTitle>
                  <DayContent>
                    {day.activities.map((activity, i) => (
                      <DayItem key={i}>{activity}</DayItem>
                    ))}
                  </DayContent>
                </DayCard>
              ))}
            </DaysGrid>
          </WeekContainer>
        </Section>
        
        {/* Week 10 */}
        <Section>
          <WeekContainer>
            <WeekHeader
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <WeekTitle>SEMANA 10: La Declaración Materializada</WeekTitle>
              <WeekSubtitle>Donde tu misión se convierte en plan maestro</WeekSubtitle>
            </WeekHeader>
            
            <DaysGrid>
              {week10Days.map((day, index) => (
                <DayCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedDay(day.day + 5)}
                  whileHover={{ scale: 1.02 }}
                >
                  <DayNumber>{day.day}</DayNumber>
                  <DayTitle>{day.title}</DayTitle>
                  <DayContent>
                    {day.activities.map((activity, i) => (
                      <DayItem key={i}>{activity}</DayItem>
                    ))}
                  </DayContent>
                </DayCard>
              ))}
            </DaysGrid>
          </WeekContainer>
        </Section>
        
        {/* Anti-AGI Framework */}
        <Section>
          <FrameworkContainer>
            <FrameworkTitle>Los 4 Tests Críticos Anti-AGI</FrameworkTitle>
            <TestsGrid>
              {antiAGITests.map((test, index) => (
                <TestCard
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TestIcon>{test.icon}</TestIcon>
                  <TestTitle>{test.title}</TestTitle>
                  <TestDescription>{test.description}</TestDescription>
                </TestCard>
              ))}
            </TestsGrid>
          </FrameworkContainer>
        </Section>
        
        {/* Dashboard Preview */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Tu <span>Dashboard</span> de Cristalización
          </SectionTitle>
          
          <DashboardPreview
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <DashboardTitle>TU PROPÓSITO CRISTALIZADO</DashboardTitle>
            
            {dashboardMetrics.map((metric, index) => (
              <MetricRow key={index}>
                <MetricLabel>{metric.label}:</MetricLabel>
                <MetricBar value={metric.value} />
                <MetricValue>{metric.value}%</MetricValue>
              </MetricRow>
            ))}
            
            <ScoreDisplay>
              <ScoreValue>84/100</ScoreValue>
              <ScoreLabel>"Altamente Viable y Alineado"</ScoreLabel>
            </ScoreDisplay>
          </DashboardPreview>
        </Section>
        
        {/* Pricing */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Niveles de <span>Profundización</span>
          </SectionTitle>
          
          <PricingGrid>
            {pricingTiers.map((tier, index) => (
              <PricingCard
                key={index}
                featured={tier.featured}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <PricingTitle>{tier.title}</PricingTitle>
                <PricingPrice>{tier.price}</PricingPrice>
                <PricingFeatures>
                  {tier.features.map((feature, i) => (
                    <PricingFeature key={i}>{feature}</PricingFeature>
                  ))}
                </PricingFeatures>
              </PricingCard>
            ))}
          </PricingGrid>
        </Section>
        
        {/* Navigation */}
        <ModuleNav>
          <Link href="/modules/modulo-3" passHref>
            <NavButton className="prev">
              ← Módulo Anterior
            </NavButton>
          </Link>
          
          <Link href="/modules" passHref>
            <NavButton style={{ background: 'transparent', border: 'none' }}>
              Ver todos los módulos
            </NavButton>
          </Link>
          
          <Link href="/modules/modulo-5" passHref>
            <NavButton className="next">
              Siguiente Módulo →
            </NavButton>
          </Link>
        </ModuleNav>
      </Container>
    </PageContainer>
  )
}