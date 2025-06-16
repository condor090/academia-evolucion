import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import Link from 'next/link'

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.gradients.darkToBlack};
  padding: ${theme.spacing['3xl']} 0;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`

const PageTitle = styled(motion.h1)`
  font-size: ${theme.fontSizes['6xl']};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  font-weight: 300;
  
  strong {
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['4xl']};
  }
`

const PageSubtitle = styled(motion.p)`
  font-size: ${theme.fontSizes['2xl']};
  text-align: center;
  color: ${theme.colors.text.lightWhite};
  max-width: 800px;
  margin: 0 auto ${theme.spacing['3xl']};
  line-height: 1.8;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.xl};
  }
`

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['3xl']};
`

const ModuleCard = styled(motion.div)<{ locked?: boolean }>`
  background: ${props => props.locked 
    ? 'rgba(255, 255, 255, 0.02)' 
    : 'rgba(255, 215, 0, 0.03)'};
  border: 2px solid ${props => props.locked 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(255, 215, 0, 0.2)'};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
  position: relative;
  overflow: hidden;
  transition: all ${theme.animation.duration.normal} ease;
  cursor: ${props => props.locked ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.locked ? 0.6 : 1};
  
  ${props => !props.locked && `
    &:hover {
      transform: translateY(-5px);
      background: rgba(255, 215, 0, 0.05);
      border-color: ${theme.colors.primary.gold};
      box-shadow: ${theme.colors.shadows.goldGlow};
    }
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.locked 
      ? 'rgba(255, 255, 255, 0.1)' 
      : theme.gradients.goldPrimary};
  }
`

const ModuleNumber = styled.div<{ locked?: boolean }>`
  width: 60px;
  height: 60px;
  background: ${props => props.locked 
    ? 'rgba(255, 255, 255, 0.1)' 
    : theme.gradients.goldPrimary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes['2xl']};
  font-weight: bold;
  color: ${props => props.locked 
    ? 'rgba(255, 255, 255, 0.3)' 
    : theme.colors.background.black};
  margin-bottom: ${theme.spacing.md};
`

const ModuleTitle = styled.h3<{ locked?: boolean }>`
  font-size: ${theme.fontSizes['2xl']};
  color: ${props => props.locked 
    ? 'rgba(255, 255, 255, 0.5)' 
    : theme.colors.primary.gold};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 400;
`

const ModuleSubtitle = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: rgba(255, 215, 0, 0.7);
  margin-bottom: ${theme.spacing.md};
`

const ModuleDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.lg};
`

const ModuleDuration = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: rgba(255, 215, 0, 0.6);
  font-size: ${theme.fontSizes.sm};
`

const LockIcon = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  font-size: ${theme.fontSizes.xl};
`

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
`

const ProgressFill = styled(motion.div)<{ progress: number }>`
  height: 100%;
  background: ${theme.gradients.goldPrimary};
  width: ${props => props.progress}%;
`

const JourneyOverview = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 215, 0, 0.02) 100%);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['3xl']};
  text-align: center;
`

const OverviewTitle = styled.h2`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.primary.gold};
  margin-bottom: ${theme.spacing.md};
`

const OverviewText = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
`

export default function ModulesIndex() {
  const modules = [
    {
      number: 1,
      title: 'El Encuentro Interior',
      subtitle: 'Semanas 1-2',
      description: 'Antes de expandirte, conócete. Sophia comienza con la pregunta más simple y más profunda: ¿Quién eres cuando nadie te está mirando?',
      duration: '2 semanas',
      locked: false,
      progress: 0,
      link: '/modules/1-encuentro-interior'
    },
    {
      number: 2,
      title: 'La Alianza Transformadora',
      subtitle: 'Semanas 3-4',
      description: 'Sophia como extensión de tu consciencia. Aprendes a delegar no solo tareas, sino patrones. Sophia absorbe lo repetitivo mientras tú exploras territorios internos inexplorados.',
      duration: '2 semanas',
      locked: true,
      progress: 0,
      link: '/modules/2-alianza-transformadora'
    },
    {
      number: 3,
      title: 'Las Pruebas del Ser',
      subtitle: 'Semanas 5-8',
      description: '45 experiencias que te revelan. No teoría. Transformación a través de la experiencia. Cada prueba es un espejo que te muestra una faceta de tu potencial infinito.',
      duration: '4 semanas',
      locked: true,
      progress: 0,
      link: '/modules/3-pruebas-del-ser'
    },
    {
      number: 4,
      title: 'La Cristalización del Propósito',
      subtitle: 'Semanas 9-10',
      description: 'Tu misión única revelada. Ya no buscas tu propósito. Lo reconoces. Sophia te ayuda a articular el dolor que solo tú puedes sanar.',
      duration: '2 semanas',
      locked: true,
      progress: 0,
      link: '/modules/4-cristalizacion-proposito'
    },
    {
      number: 5,
      title: 'El Nacimiento del Autor',
      subtitle: 'Semanas 11-12',
      description: 'Tu transformación hecha libro. Con Sophia como co-creadora, tejes tu journey en narrativa. No escribes sobre transformación. Escribes DESDE la transformación.',
      duration: '2 semanas',
      locked: true,
      progress: 0,
      link: '/modules/5-nacimiento-autor'
    }
  ]
  
  return (
    <PageContainer>
      <Container>
        <PageTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Tu <strong>Journey de Transformación</strong>
        </PageTitle>
        
        <PageSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          12 semanas que no cambiarán lo que haces. 
          Cambiarán quién eres.
        </PageSubtitle>
        
        <JourneyOverview
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <OverviewTitle>El Mapa del Despertar</OverviewTitle>
          <OverviewText>
            Cada módulo es una puerta. Cada puerta revela una verdad sobre ti 
            que siempre estuvo ahí, esperando ser descubierta. No es un camino 
            lineal. Es una espiral ascendente hacia tu centro.
          </OverviewText>
        </JourneyOverview>
        
        <ModulesGrid>
          {modules.map((module, index) => (
            <Link 
              key={index} 
              href={module.locked ? '#' : module.link}
              style={{ textDecoration: 'none' }}
            >
              <ModuleCard
                locked={module.locked}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={!module.locked ? { scale: 1.02 } : {}}
              >
                {module.locked && <LockIcon>🔒</LockIcon>}
                
                <ModuleNumber locked={module.locked}>
                  {module.number}
                </ModuleNumber>
                
                <ModuleTitle locked={module.locked}>
                  {module.title}
                </ModuleTitle>
                
                <ModuleSubtitle>{module.subtitle}</ModuleSubtitle>
                
                <ModuleDescription>
                  {module.description}
                </ModuleDescription>
                
                <ModuleDuration>
                  <span>⏱</span>
                  <span>{module.duration}</span>
                </ModuleDuration>
                
                {module.progress > 0 && (
                  <ProgressBar>
                    <ProgressFill 
                      progress={module.progress}
                      initial={{ width: 0 }}
                      animate={{ width: `${module.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </ProgressBar>
                )}
              </ModuleCard>
            </Link>
          ))}
        </ModulesGrid>
      </Container>
    </PageContainer>
  )
}