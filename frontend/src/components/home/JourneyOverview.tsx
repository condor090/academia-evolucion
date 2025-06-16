import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'

const JourneySection = styled.section`
  padding: 8rem 2rem;
  background: ${theme.gradients.blackFade};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 300;
  
  strong {
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const JourneyIntro = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  
  p {
    font-size: 1.3rem;
    color: ${theme.colors.text.lightWhite};
    line-height: 1.8;
  }
`

const PhasesContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

const Phase = styled(motion.div)`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`

const PhaseNumber = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(184, 134, 11, 0.2) 0%, rgba(255, 215, 0, 0.2) 100%);
  border: 2px solid ${theme.colors.primary.gold};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: ${theme.colors.primary.gold};
  
  @media (max-width: ${theme.breakpoints.md}) {
    margin: 0 auto;
  }
`

const PhaseContent = styled.div`
  background: rgba(255, 215, 0, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.15);
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 215, 0, 0.05);
    transform: translateX(10px);
    border-color: rgba(255, 215, 0, 0.3);
    
    @media (max-width: ${theme.breakpoints.md}) {
      transform: translateY(-5px);
    }
  }
`

const PhaseTitle = styled.h3`
  font-size: 1.8rem;
  color: ${theme.colors.primary.gold};
  margin-bottom: 0.5rem;
`

const PhaseSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 215, 0, 0.7);
  margin-bottom: 1.5rem;
  font-style: italic;
`

const PhaseDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  margin-bottom: 1.5rem;
`

const PhaseOutcomes = styled.ul`
  list-style: none;
  
  li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    
    &::before {
      content: '→';
      position: absolute;
      left: 0;
      color: ${theme.colors.primary.gold};
    }
  }
`

export const JourneyOverview: React.FC = () => {
  const phases = [
    {
      number: 1,
      title: 'El Encuentro Interior',
      subtitle: 'Semanas 1-2: Antes de expandirte, conócete',
      description: 'Sophia comienza con la pregunta más simple y más profunda: ¿Quién eres cuando nadie te está mirando? Aquí no hay tecnología, solo tú frente al espejo de tu alma.',
      outcomes: [
        'Descubres tu genio dormido',
        'Identificas las máscaras que ya no necesitas',
        'Reconoces el llamado que has estado ignorando'
      ]
    },
    {
      number: 2,
      title: 'La Alianza Transformadora',
      subtitle: 'Semanas 3-4: Sophia como extensión de tu consciencia',
      description: 'Aprendes a delegar no solo tareas, sino patrones. Sophia absorbe lo repetitivo mientras tú exploras territorios internos inexplorados.',
      outcomes: [
        '20 horas semanales liberadas',
        'Primera experiencia de tiempo expandido',
        'Rituales de conexión interior establecidos'
      ]
    },
    {
      number: 3,
      title: 'Las Pruebas del Ser',
      subtitle: 'Semanas 5-8: 45 experiencias que te revelan',
      description: 'No teoría. Transformación a través de la experiencia. Cada prueba es un espejo que te muestra una faceta de tu potencial infinito.',
      outcomes: [
        'Descubres talentos ocultos',
        'Rompes límites autoimpuestos',
        'Integras mente, cuerpo y espíritu'
      ]
    },
    {
      number: 4,
      title: 'La Cristalización del Propósito',
      subtitle: 'Semanas 9-10: Tu misión única revelada',
      description: 'Ya no buscas tu propósito. Lo reconoces. Sophia te ayuda a articular el dolor que solo tú puedes sanar, el regalo que solo tú puedes dar.',
      outcomes: [
        'Tu propósito cristalizado en palabras',
        'Tu rol único en el mundo definido',
        'Tu compromiso sagrado establecido'
      ]
    },
    {
      number: 5,
      title: 'El Nacimiento del Autor',
      subtitle: 'Semanas 11-12: Tu transformación hecha libro',
      description: 'Con Sophia como co-creadora, tejes tu journey en narrativa. No escribes sobre transformación. Escribes DESDE la transformación.',
      outcomes: [
        'Tu libro profesionalmente editado',
        'Tu historia como inspiración para otros',
        'Tu legado tangible en el mundo'
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const phaseVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <JourneySection className="scroll-reveal">
      <Container>
        <SectionTitle>Tu <strong>Journey de 12 Semanas</strong></SectionTitle>
        
        <JourneyIntro>
          <p>
            No es un curso. Es una metamorfosis guiada donde cada semana
            te acerca más a quien realmente eres. Sophia te acompaña,
            pero el journey es únicamente tuyo.
          </p>
        </JourneyIntro>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <PhasesContainer>
            {phases.map((phase) => (
              <Phase key={phase.number} variants={phaseVariants}>
                <PhaseNumber>{phase.number}</PhaseNumber>
                <PhaseContent>
                  <PhaseTitle>{phase.title}</PhaseTitle>
                  <PhaseSubtitle>{phase.subtitle}</PhaseSubtitle>
                  <PhaseDescription>{phase.description}</PhaseDescription>
                  <PhaseOutcomes>
                    {phase.outcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </PhaseOutcomes>
                </PhaseContent>
              </Phase>
            ))}
          </PhasesContainer>
        </motion.div>
      </Container>
    </JourneySection>
  )
}