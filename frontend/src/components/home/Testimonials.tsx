import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'

const TestimonialsSection = styled.section`
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
  margin-bottom: 4rem;
  font-weight: 300;
  
  strong {
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const StoryTimeline = styled.div`
  position: relative;
  padding-left: 3rem;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding-left: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, transparent 0%, ${theme.colors.primary.gold} 50%, transparent 100%);
    
    @media (max-width: ${theme.breakpoints.md}) {
      display: none;
    }
  }
`

const TransformationStory = styled(motion.div)`
  position: relative;
  margin-bottom: 4rem;
`

const StoryMarker = styled.div`
  position: absolute;
  left: -3.5rem;
  top: 0;
  width: 20px;
  height: 20px;
  background: ${theme.colors.primary.gold};
  border-radius: 50%;
  box-shadow: ${theme.colors.shadows.goldGlow};
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

const StoryContent = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 215, 0, 0.03);
    transform: translateX(10px);
    border-color: ${theme.colors.primary.gold};
    
    @media (max-width: ${theme.breakpoints.md}) {
      transform: translateY(-5px);
    }
  }
`

const StoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`

const StoryAvatar = styled.div`
  width: 60px;
  height: 60px;
  background: ${theme.gradients.goldPrimary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${theme.colors.background.black};
  font-size: 1.2rem;
  flex-shrink: 0;
`

const StoryInfo = styled.div`
  flex: 1;
  
  h4 {
    color: ${theme.colors.primary.gold};
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
  }
  
  p {
    color: rgba(255, 215, 0, 0.6);
    font-size: 0.9rem;
  }
`

const StoryQuote = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${theme.colors.text.lightWhite};
  font-style: italic;
  margin-bottom: 1.5rem;
`

const StoryTransformation = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
  background: rgba(255, 215, 0, 0.05);
  padding: 1rem;
  border-radius: 10px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0.5rem;
  }
`

const BeforeState = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 100, 100, 0.8);
`

const AfterState = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: rgba(100, 255, 100, 0.8);
`

const TransformationArrow = styled.div`
  color: ${theme.colors.primary.gold};
  font-size: 1.5rem;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    transform: rotate(90deg);
  }
`

export const Testimonials: React.FC = () => {
  const stories = [
    {
      name: 'Carmen Ruiz',
      initials: 'CR',
      role: 'De Ejecutiva Exhausta a Sanadora de Líderes',
      quote: 'Entré buscando ser más eficiente. Sophia me mostró que mi obsesión con la productividad era una huida de mí misma. Ahora guío a otros ejecutivos a encontrar su propósito más allá del éxito.',
      before: '80 hrs/semana optimizando',
      after: 'Mentora de propósito corporativo'
    },
    {
      name: 'Jorge Méndez',
      initials: 'JM',
      role: 'De Ingeniero a Arquitecto de Futuros',
      quote: 'Sophia absorbió mis tareas técnicas repetitivas. En ese espacio liberado, descubrí mi don para visualizar futuros posibles. Mi libro "Ingeniería del Ser" transformó mi industria.',
      before: 'Resolviendo problemas técnicos',
      after: 'Diseñando futuros humanos'
    },
    {
      name: 'Laura Torres',
      initials: 'LT',
      role: 'De Invisible a Voz de una Generación',
      quote: 'Creía que no tenía nada especial que ofrecer. Las preguntas de Sophia me revelaron mi don: dar voz a los que se sienten invisibles. Mi libro ayudó a miles a encontrar su voz.',
      before: '"No tengo nada que decir"',
      after: 'Autora bestseller inspiracional'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const storyVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 }
    }
  }

  return (
    <TestimonialsSection className="scroll-reveal">
      <Container>
        <SectionTitle>Historias de <strong>Metamorfosis Completa</strong></SectionTitle>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <StoryTimeline>
            {stories.map((story, index) => (
              <TransformationStory key={index} variants={storyVariants}>
                <StoryMarker />
                <StoryContent>
                  <StoryHeader>
                    <StoryAvatar>{story.initials}</StoryAvatar>
                    <StoryInfo>
                      <h4>{story.name}</h4>
                      <p>{story.role}</p>
                    </StoryInfo>
                  </StoryHeader>
                  <StoryQuote>{story.quote}</StoryQuote>
                  <StoryTransformation>
                    <BeforeState>{story.before}</BeforeState>
                    <TransformationArrow>→</TransformationArrow>
                    <AfterState>{story.after}</AfterState>
                  </StoryTransformation>
                </StoryContent>
              </TransformationStory>
            ))}
          </StoryTimeline>
        </motion.div>
      </Container>
    </TestimonialsSection>
  )
}