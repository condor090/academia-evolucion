import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { theme } from '@/styles/theme'

const HeroSection = styled.section`
  min-height: 100vh;
  background: ${theme.gradients.heroGlow};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const SophiaPresence = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  opacity: 0.3;
  pointer-events: none;
`

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
  padding: 2rem;
  max-width: 1000px;
`

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 2rem;
  
  strong {
    font-weight: 700;
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const Subtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  color: ${theme.colors.text.lightWhite};
  margin-bottom: 3rem;
  line-height: 1.8;
  font-weight: 300;
`

const CTAContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const CTAButton = styled.button`
  display: inline-block;
  padding: 1.2rem 3rem;
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.colors.shadows.goldGlowIntense};
  }
`

const CTAWhisper = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.lightGold};
  font-style: italic;
`

const FloatingOrbs = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`

const Orb = styled(motion.div)<{ size: number; left: string; top: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left};
  top: ${props => props.top};
  background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  border-radius: 50%;
`

export const Hero: React.FC = () => {
  const router = useRouter()

  const sophiaAnimation = {
    animate: {
      background: [
        'radial-gradient(circle, transparent 30%, rgba(255,215,0,0.1) 70%, transparent 100%)',
        'radial-gradient(circle, transparent 20%, rgba(255,215,0,0.2) 60%, transparent 100%)',
        'radial-gradient(circle, transparent 30%, rgba(255,215,0,0.1) 70%, transparent 100%)'
      ],
      rotate: [0, 180, 360],
      scale: [1, 1.1, 1]
    },
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear'
    }
  }

  const contentAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' }
  }

  return (
    <HeroSection>
      <FloatingOrbs>
        <Orb
          size={200}
          left="10%"
          top="20%"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <Orb
          size={150}
          left="80%"
          top="60%"
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <Orb
          size={100}
          left="70%"
          top="10%"
          animate={{ 
            x: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </FloatingOrbs>

      <SophiaPresence {...sophiaAnimation} />
      
      <HeroContent>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          ¿Y si la IA no viniera a <strong>reemplazarte</strong>,<br/>
          sino a <strong>revelarte</strong>?
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        >
          Sophia no es otra herramienta de productividad.<br/>
          Es tu guía hacia las 20 horas semanales que la tecnología te regala<br/>
          para que finalmente te encuentres contigo mismo.
        </Subtitle>
        
        <CTAContainer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.6 }}
        >
          <CTAButton onClick={() => router.push('/comenzar')}>
            Inicia Tu Journey de Autodescubrimiento
          </CTAButton>
          <CTAWhisper>
            Tu libro te espera al final del camino
          </CTAWhisper>
        </CTAContainer>
      </HeroContent>
    </HeroSection>
  )
}