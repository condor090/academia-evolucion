import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { theme } from '@/styles/theme'

const FinalSection = styled.section`
  padding: 10rem 2rem;
  background: linear-gradient(180deg, #0a0a0a 0%, rgba(255, 215, 0, 0.1) 100%);
  text-align: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 2rem;
  font-weight: 300;
  
  strong {
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const FinalQuestion = styled(motion.p)`
  font-size: 1.5rem;
  color: ${theme.colors.primary.gold};
  margin-bottom: 2rem;
  font-style: italic;
`

const FinalChoice = styled(motion.div)`
  font-size: 1.2rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 3rem;
`

const TransformationGuarantee = styled(motion.div)`
  background: rgba(255, 215, 0, 0.08);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 25px;
  padding: 3rem;
  max-width: 600px;
  margin: 4rem auto;
`

const GuaranteeTitle = styled.h3`
  color: ${theme.colors.primary.gold};
  font-size: 1.8rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

const GuaranteeText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
`

const FinalCTA = styled(motion.div)`
  margin-top: 4rem;
`

const CTAButton = styled.button`
  font-size: 1.3rem;
  padding: 1.5rem 4rem;
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.colors.shadows.goldGlowIntense};
  }
`

const CohortNotice = styled(motion.p)`
  margin-top: 3rem;
  color: rgba(255, 215, 0, 0.6);
  font-size: 1rem;
  line-height: 1.8;
`

const FloatingOrbs = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`

const Orb = styled(motion.div)<{ size: number; left: string; top: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left};
  top: ${props => props.top};
  background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
  border-radius: 50%;
`

export const FinalAwakening: React.FC = () => {
  const router = useRouter()

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  return (
    <FinalSection>
      <FloatingOrbs>
        <Orb
          size={300}
          left="-150px"
          top="50%"
          animate={{
            y: [0, -50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <Orb
          size={400}
          left="80%"
          top="-200px"
          animate={{
            x: [0, -50, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </FloatingOrbs>

      <Container>
        <Title
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          La Pregunta <strong>Final</strong>
        </Title>
        
        <FinalQuestion
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          ¿Qué elegirás hacer con las 20 horas semanales
          que Sophia te regala?
        </FinalQuestion>
        
        <FinalChoice
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p>
            Hay dos tipos de personas en la era de la IA:<br/><br/>
            
            Las que usan la tecnología para hacer más de lo mismo, más rápido.<br/>
            Para optimizar, eficientizar, producir.<br/><br/>
            
            Y las que usan la tecnología para liberarse de lo mundano<br/>
            y finalmente dedicarse a lo trascendente:<br/>
            conocerse, transformarse, florecer.<br/><br/>
            
            <strong style={{ color: theme.colors.primary.gold }}>
              Academia Evolución es para las segundas.
            </strong>
          </p>
        </FinalChoice>
        
        <TransformationGuarantee
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <GuaranteeTitle>
            <span>🌟</span>
            Garantía de Transformación Sagrada
          </GuaranteeTitle>
          <GuaranteeText>
            Si completas las 12 semanas y no encuentras tu propósito,
            te devolvemos el 100% de tu inversión. Pero en 500+ alumnos,
            nunca ha sucedido. Porque cuando te encuentras contigo mismo,
            no hay vuelta atrás.
          </GuaranteeText>
        </TransformationGuarantee>
        
        <FinalCTA
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <CTAButton onClick={() => router.push('/comenzar')}>
            Inicia Tu Journey de Transformación Ahora
          </CTAButton>
          
          <CohortNotice>
            Solo 50 espacios para el cohort de enero.<br/>
            Tu tribu de buscadores te espera.<br/>
            Tu libro está esperando ser escrito.<br/>
            Tu verdadero yo está esperando emerger.
          </CohortNotice>
        </FinalCTA>
      </Container>
    </FinalSection>
  )
}