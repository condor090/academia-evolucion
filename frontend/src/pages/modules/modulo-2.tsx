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
  max-width: 700px;
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

const BinaryStream = styled(FloatingElement)`
  font-family: monospace;
  color: rgba(255, 215, 0, 0.2);
  font-size: ${theme.fontSizes.sm};
  white-space: nowrap;
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

// Sophia Profiles Section
const ProfilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['3xl']};
`

const ProfileCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 215, 0, 0.02) 100%);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: all ${theme.animation.duration.normal} ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
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

const ProfileIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${theme.spacing.md};
  background: ${theme.gradients.goldPrimary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes['3xl']};
  position: relative;
  z-index: 1;
`

const ProfileTitle = styled.h3`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.sm};
  position: relative;
  z-index: 1;
`

const ProfileDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.base};
  line-height: 1.6;
  position: relative;
  z-index: 1;
`

// Weekly Journey
const WeeklyJourneyContainer = styled.div`
  margin: ${theme.spacing['3xl']} 0;
`

const WeekCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 215, 0, 0.02) 100%);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing.xl};
  position: relative;
  overflow: hidden;
`

const WeekHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xl};
`

const WeekNumber = styled.h3`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 600;
`

const WeekTitle = styled.h4`
  color: ${theme.colors.primary.goldLight};
  font-size: ${theme.fontSizes.xl};
  font-style: italic;
`

const ExperiencesList = styled.div`
  display: grid;
  gap: ${theme.spacing.md};
`

const ExperienceItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: rgba(255, 215, 0, 0.03);
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.animation.duration.fast} ease;
  
  &:hover {
    background: rgba(255, 215, 0, 0.05);
    transform: translateX(5px);
  }
`

const ExperienceNumber = styled.div`
  width: 40px;
  height: 40px;
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
`

const ExperienceContent = styled.div`
  flex: 1;
`

const ExperienceTitle = styled.h5`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.spacing.xs};
`

const ExperienceDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.base};
  line-height: 1.6;
`

// Framework Section
const FrameworkContainer = styled.div`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.03) 0%, transparent 100%);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing['3xl']};
  margin: ${theme.spacing['3xl']} 0;
  position: relative;
  overflow: hidden;
`

const FrameworkTitle = styled.h3`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.primary.gold};
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
`

const FrameworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
`

const FrameworkItem = styled(motion.div)`
  text-align: center;
  padding: ${theme.spacing.lg};
`

const FrameworkLetter = styled.div`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: bold;
  background: ${theme.gradients.goldPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.sm};
`

const FrameworkWord = styled.h4`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.sm};
`

const FrameworkDesc = styled.p`
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.5;
`

// Results Section
const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
`

const ResultCard = styled(motion.div)`
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  text-align: center;
  position: relative;
  overflow: hidden;
`

const ResultIcon = styled.div`
  font-size: ${theme.fontSizes['4xl']};
  margin-bottom: ${theme.spacing.md};
`

const ResultTitle = styled.h4`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.sm};
`

const ResultValue = styled.p`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 600;
  color: ${theme.colors.primary.goldLight};
  margin-bottom: ${theme.spacing.sm};
`

const ResultDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.5;
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

export default function Modulo2() {
  const router = useRouter()
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
  
  const sophiaProfiles = [
    {
      id: 'explorador',
      title: 'Perfil Explorador',
      icon: '🔍',
      description: 'Para quienes necesitan micro-pasos y validación constante'
    },
    {
      id: 'saltador',
      title: 'Perfil Saltador Cuántico',
      icon: '⚡',
      description: 'Para quienes están listos para transformaciones radicales'
    },
    {
      id: 'contemplativo',
      title: 'Perfil Contemplativo',
      icon: '🧘',
      description: 'Para quienes procesan a través de reflexión profunda'
    },
    {
      id: 'creativo',
      title: 'Perfil Creativo',
      icon: '🎨',
      description: 'Para quienes necesitan expresión artística como vehículo'
    }
  ]
  
  const weeklyJourney = [
    {
      week: 'SEMANA 3',
      title: 'EL PRIMER CONTACTO',
      subtitle: 'Conociendo a tu aliado evolutivo',
      experiences: [
        {
          number: 1,
          title: 'El Encuentro',
          description: 'Primera conversación profunda con Sophia. Ella muestra "vulnerabilidad programada" y admite que también está aprendiendo.'
        },
        {
          number: 2,
          title: 'El Lenguaje del Alma Digital',
          description: 'Aprende a comunicarte con Sophia para resultados extraordinarios. Experimenta el modo sandbox sin consecuencias.'
        },
        {
          number: 3,
          title: 'Inventario de Cadenas',
          description: 'Sophia te ayuda a mapear TODAS tus tareas actuales. Crear tu "Balance de Vida Visual".'
        }
      ]
    },
    {
      week: 'SEMANA 4',
      title: 'LA GRAN TRANSFERENCIA',
      subtitle: 'Delegando el ruido, recuperando el alma',
      experiences: [
        {
          number: 4,
          title: 'Patrones Invisibles',
          description: 'Sophia analiza tu flujo de trabajo de 48 horas con telemetría emocional.'
        },
        {
          number: 5,
          title: 'La Lista Sagrada',
          description: 'Separar lo delegable de lo esencial. Criterio: ¿Esto nutre mi alma o mi ego?'
        },
        {
          number: 6,
          title: 'El Primer Vuelo',
          description: 'Delegar primera categoría a Sophia. Experimentar las primeras 2 horas libres.'
        }
      ]
    },
    {
      week: 'SEMANA 5',
      title: 'EXPANSIÓN DEL SER',
      subtitle: 'Llenando el vacío con propósito',
      experiences: [
        {
          number: 7,
          title: 'Arqueología del Alma',
          description: 'Con tiempo liberado, explorar deseos olvidados. Sophia incluso te delega tareas a TI.'
        },
        {
          number: 8,
          title: 'Ritmos Sagrados',
          description: 'Diseñar tu día ideal con Sophia. Proteger bloques de tiempo para evolución.'
        },
        {
          number: 9,
          title: 'La Danza de Dos',
          description: 'Afinar la comunicación con Sophia. Graduarla de asistente a compañera de vida.'
        }
      ]
    }
  ]
  
  const frameworkSOPHIA = [
    { letter: 'S', word: 'Silencio', desc: 'Crear espacios de no-hacer' },
    { letter: 'O', word: 'Observación', desc: 'Mapear patrones + telemetría' },
    { letter: 'P', word: 'Priorización', desc: 'Distinguir esencial de urgente' },
    { letter: 'H', word: 'Habilitación', desc: 'Delegar con consciencia' },
    { letter: 'I', word: 'Integración', desc: 'Fusionar humano + digital' },
    { letter: 'A', word: 'Acción', desc: 'Manifestar la transformación' }
  ]
  
  const expectedResults = [
    {
      icon: '⏰',
      title: 'Tiempo Liberado',
      value: '10-15 horas/semana',
      description: 'Recuperadas para tu evolución personal'
    },
    {
      icon: '💰',
      title: 'ROI Temporal',
      value: '$78,000/año',
      description: 'Valor del tiempo liberado'
    },
    {
      icon: '🛡️',
      title: 'Prevención',
      value: '100%',
      description: 'Burnout prevenido documentadamente'
    },
    {
      icon: '🎯',
      title: 'Claridad',
      value: '85%',
      description: 'Mayor enfoque en propósito'
    }
  ]
  
  return (
    <PageContainer>
      {/* Hero Section */}
      <ModuleHero>
        <BinaryStream
          initial={{ x: -100, y: 50 }}
          animate={{ x: 1400 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          01001000 01110101 01101101 01100001 01101110 00100000 00101011 00100000 01000001 01001001
        </BinaryStream>
        
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
            2
          </ModuleNumber>
          
          <ModuleTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            La Alianza Transformadora
          </ModuleTitle>
          
          <ModuleSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            De la soledad del autoconocimiento a la simbiosis con tu mentor digital.
            Forma la alianza más transformadora de tu vida con Sophia.
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
        
        <BinaryStream
          initial={{ x: 1400, y: 300 }}
          animate={{ x: -100 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ transform: 'rotate(180deg)' }}
        >
          01010011 01101111 01110000 01101000 01101001 01100001
        </BinaryStream>
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
            Tu <span>Socio Digital</span> Evolutivo
          </SectionTitle>
          
          <ContentDescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            "No le enseñas a Sophia sobre ti. Sophia te revela quién has sido siempre."
            <br/><br/>
            Después de encontrarte contigo mismo en el Nivel 1, es hora de formar 
            la simbiosis que te permitirá liberar 20 horas semanales para tu evolución interior.
          </ContentDescription>
        </Section>
        
        {/* Sophia Profiles */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Sistema de <span>Perfiles Sophia</span>
          </SectionTitle>
          
          <ContentDescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Antes de comenzar, Sophia analiza tu journey del Nivel 1 para crear tu perfil único
          </ContentDescription>
          
          <ProfilesGrid>
            {sophiaProfiles.map((profile, index) => (
              <ProfileCard
                key={profile.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedProfile(profile.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ProfileIcon>{profile.icon}</ProfileIcon>
                <ProfileTitle>{profile.title}</ProfileTitle>
                <ProfileDescription>{profile.description}</ProfileDescription>
              </ProfileCard>
            ))}
          </ProfilesGrid>
        </Section>
        
        {/* Weekly Journey */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Tu <span>Journey</span> de 3 Semanas
          </SectionTitle>
          
          <WeeklyJourneyContainer>
            {weeklyJourney.map((week, weekIndex) => (
              <WeekCard
                key={weekIndex}
                initial={{ opacity: 0, x: weekIndex % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: weekIndex * 0.2 }}
                viewport={{ once: true }}
              >
                <WeekHeader>
                  <div>
                    <WeekNumber>{week.week}: {week.title}</WeekNumber>
                    <WeekTitle>{week.subtitle}</WeekTitle>
                  </div>
                </WeekHeader>
                
                <ExperiencesList>
                  {week.experiences.map((exp, expIndex) => (
                    <ExperienceItem
                      key={expIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: expIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <ExperienceNumber>{exp.number}</ExperienceNumber>
                      <ExperienceContent>
                        <ExperienceTitle>{exp.title}</ExperienceTitle>
                        <ExperienceDescription>{exp.description}</ExperienceDescription>
                      </ExperienceContent>
                    </ExperienceItem>
                  ))}
                </ExperiencesList>
              </WeekCard>
            ))}
          </WeeklyJourneyContainer>
        </Section>
        
        {/* Framework SOPHIA */}
        <Section>
          <FrameworkContainer>
            <FrameworkTitle>Framework S.O.P.H.I.A. 2.0</FrameworkTitle>
            <FrameworkGrid>
              {frameworkSOPHIA.map((item, index) => (
                <FrameworkItem
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <FrameworkLetter>{item.letter}</FrameworkLetter>
                  <FrameworkWord>{item.word}</FrameworkWord>
                  <FrameworkDesc>{item.desc}</FrameworkDesc>
                </FrameworkItem>
              ))}
            </FrameworkGrid>
          </FrameworkContainer>
        </Section>
        
        {/* Expected Results */}
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span>Resultados</span> Esperados
          </SectionTitle>
          
          <ResultsGrid>
            {expectedResults.map((result, index) => (
              <ResultCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ResultIcon>{result.icon}</ResultIcon>
                <ResultTitle>{result.title}</ResultTitle>
                <ResultValue>{result.value}</ResultValue>
                <ResultDescription>{result.description}</ResultDescription>
              </ResultCard>
            ))}
          </ResultsGrid>
        </Section>
        
        {/* Navigation */}
        <ModuleNav>
          <Link href="/modules/modulo-1" passHref>
            <NavButton className="prev">
              ← Módulo Anterior
            </NavButton>
          </Link>
          
          <Link href="/modules" passHref>
            <NavButton style={{ background: 'transparent', border: 'none' }}>
              Ver todos los módulos
            </NavButton>
          </Link>
          
          <Link href="/modules/modulo-3" passHref>
            <NavButton className="next">
              Siguiente Módulo →
            </NavButton>
          </Link>
        </ModuleNav>
      </Container>
    </PageContainer>
  )
}