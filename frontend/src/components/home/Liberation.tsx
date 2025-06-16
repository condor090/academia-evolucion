import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'

const LiberationSection = styled.section`
  padding: 8rem 2rem;
  background: ${theme.gradients.blackFade};
  position: relative;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  text-align: center;
  margin-bottom: 4rem;
  font-weight: 300;
  
  strong {
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const TimeTransformation = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

const TimeBlock = styled(motion.div)<{ variant: 'before' | 'after' }>`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${props => props.variant === 'after' 
      ? 'rgba(74, 222, 128, 0.3)' 
      : 'rgba(255, 107, 107, 0.3)'};
    background: rgba(255, 255, 255, 0.03);
  }
  
  h3 {
    color: ${props => props.variant === 'after' ? '#4ade80' : '#ff6b6b'};
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
  
  p {
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.6);
  }
  
  ul {
    list-style: none;
  }
  
  li {
    padding: 0.8rem 0;
    font-size: 1.1rem;
    color: ${theme.colors.text.lightWhite};
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`

const SophiaBridge = styled(motion.div)`
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    order: -1;
    margin-bottom: 2rem;
  }
`

const SophiaIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: float 6s ease-in-out infinite;
`

const BridgeText = styled.p`
  color: ${theme.colors.primary.gold};
  font-size: 1.1rem;
  font-weight: 500;
`

export const Liberation: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <LiberationSection className="scroll-reveal">
      <Container>
        <SectionTitle>
          Sophia <strong>Libera Tu Tiempo</strong>, Tú <strong>Liberas Tu Ser</strong>
        </SectionTitle>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <TimeTransformation>
            <TimeBlock variant="before" variants={itemVariants}>
              <h3>ANTES</h3>
              <p>20 horas semanales en:</p>
              <ul>
                <li>
                  <span>📧</span>
                  Emails que se repiten infinitamente
                </li>
                <li>
                  <span>📊</span>
                  Reportes que nadie lee completos
                </li>
                <li>
                  <span>🔄</span>
                  Tareas mecánicas sin propósito
                </li>
                <li>
                  <span>⏰</span>
                  Urgencias que no son importantes
                </li>
              </ul>
            </TimeBlock>
            
            <SophiaBridge variants={itemVariants}>
              <SophiaIcon>✨</SophiaIcon>
              <BridgeText>Sophia absorbe lo repetitivo</BridgeText>
            </SophiaBridge>
            
            <TimeBlock variant="after" variants={itemVariants}>
              <h3>DESPUÉS</h3>
              <p>20 horas semanales para:</p>
              <ul>
                <li>
                  <span>🧘</span>
                  Meditación y conexión interior
                </li>
                <li>
                  <span>💭</span>
                  Explorar tu propósito único
                </li>
                <li>
                  <span>🎨</span>
                  Crear desde tu esencia
                </li>
                <li>
                  <span>💫</span>
                  Ser quien viniste a ser
                </li>
              </ul>
            </TimeBlock>
          </TimeTransformation>
        </motion.div>
      </Container>
    </LiberationSection>
  )
}