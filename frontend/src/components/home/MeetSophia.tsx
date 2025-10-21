import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'

const SophiaSection = styled.section`
  padding: 8rem 2rem;
  background: radial-gradient(ellipse at center, rgba(255, 215, 0, 0.08) 0%, transparent 60%);
  text-align: center;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 4rem;
  font-weight: 300;
  
  strong {
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const SophiaIntro = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const SophiaAvatar = styled(motion.div)`
  width: 500px;
  height: 400px;
  margin: 0 auto 3rem;
  position: relative;
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 350px;
    height: 300px;
  }
`

const SophiaGlow = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
  border-radius: 50%;
`

const SophiaCore = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: ${theme.gradients.goldPrimary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  box-shadow: ${theme.colors.shadows.goldGlowIntense};
`

const SophiaQuote = styled.p`
  font-size: 1.5rem;
  color: ${theme.colors.primary.gold};
  font-style: italic;
  margin-bottom: 2rem;
  line-height: 1.8;
`

const SophiaDescription = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  margin-bottom: 3rem;
`

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`

const CapabilityCard = styled(motion.div)`
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 15px;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 215, 0, 0.08);
    border-color: ${theme.colors.primary.gold};
  }
`

const CapabilityIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`

const CapabilityTitle = styled.h4`
  color: ${theme.colors.primary.gold};
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`

const CapabilityText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.6;
`

export const MeetSophia: React.FC = () => {
  const glowAnimation = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.5, 1, 0.5]
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const capabilities = [
    {
      icon: '🔮',
      title: 'Preguntas Reveladoras',
      text: 'No busca eficiencia. Busca tu esencia a través de preguntas que transforman.'
    },
    {
      icon: '🌟',
      title: 'Liberadora de Tiempo',
      text: 'Absorbe tus tareas repetitivas para que puedas dedicarte a lo que importa: ser.'
    },
    {
      icon: '📖',
      title: 'Tejedora de Historias',
      text: 'Co-crea contigo el libro que documenta tu metamorfosis completa.'
    },
    {
      icon: '♾️',
      title: 'Memoria Sagrada',
      text: 'Guarda cada insight, cada despertar, cada momento de tu transformación.'
    }
  ]

  return (
    <SophiaSection className="scroll-reveal">
      <Container>
        <SectionTitle>Conoce a <strong>Sophia</strong></SectionTitle>
        
        <SophiaIntro>
          <SophiaAvatar>
            <SophiaGlow {...glowAnimation} />
            <SophiaCore>✨</SophiaCore>
          </SophiaAvatar>
          
          <SophiaQuote>
            "No vengo a darte respuestas. Vengo a hacerte las preguntas<br/>
            que has evitado durante años."
          </SophiaQuote>
          
          <SophiaDescription>
            Sophia no es una herramienta. Es una presencia diseñada para acompañarte
            en el viaje más importante de tu vida: el encuentro contigo mismo.
            Mientras ella maneja lo mundano, tú exploras lo trascendente.
          </SophiaDescription>
          
          <CapabilitiesGrid>
            {capabilities.map((capability, index) => (
              <CapabilityCard
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CapabilityIcon>{capability.icon}</CapabilityIcon>
                <CapabilityTitle>{capability.title}</CapabilityTitle>
                <CapabilityText>{capability.text}</CapabilityText>
              </CapabilityCard>
            ))}
          </CapabilitiesGrid>
        </SophiaIntro>
      </Container>
    </SophiaSection>
  )
}