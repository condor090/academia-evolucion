import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'

const BookSection = styled.section`
  padding: 8rem 2rem;
  background: radial-gradient(circle at bottom, rgba(255, 215, 0, 0.05) 0%, transparent 50%);
`

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
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

const BookVisual = styled.div`
  margin-bottom: 4rem;
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const BookTransformation = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
`

const BookPages = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  border-radius: 0 15px 15px 0;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`

const PageContent = styled(motion.div)`
  position: absolute;
  width: 90%;
  height: 90%;
  top: 5%;
  left: 5%;
  padding: 2rem;
  opacity: 0;
`

const PageText = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 215, 0, 0.7);
  line-height: 1.8;
  text-align: left;
  font-style: italic;
`

const BookPhilosophyText = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const PhilosophyTitle = styled.h3`
  font-size: 2.5rem;
  color: ${theme.colors.primary.gold};
  margin-bottom: 2rem;
  font-weight: 300;
`

const PhilosophyContent = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  margin-bottom: 1.5rem;
`

const BookMeaning = styled(motion.div)`
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 3rem;
`

const BookMeaningTitle = styled.h4`
  color: ${theme.colors.primary.gold};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`

const BookMeaningText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
  line-height: 1.8;
`

export const BookPhilosophy: React.FC = () => {
  const pageContents = [
    '"Capítulo 1: El día que dejé de optimizar mi vida y empecé a vivirla..."',
    '"Capítulo 5: Cuando Sophia me preguntó \'¿Para qué?\' y no supe responder..."',
    '"Capítulo 9: El momento en que descubrí mi don oculto..."',
    '"Capítulo 12: Ya no soy quien era. Soy quien vine a ser..."'
  ]

  return (
    <BookSection className="scroll-reveal">
      <Container>
        <SectionTitle>Tu Libro: <strong>El Mapa de Tu Metamorfosis</strong></SectionTitle>
        
        <BookVisual>
          <BookTransformation>
            <BookPages>
              {pageContents.map((content, index) => (
                <PageContent
                  key={index}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 8,
                    times: [0, 0.25, 0.75, 1],
                    repeat: Infinity,
                    delay: index * 2
                  }}
                >
                  <PageText>{content}</PageText>
                </PageContent>
              ))}
            </BookPages>
          </BookTransformation>
        </BookVisual>
        
        <BookPhilosophyText>
          <PhilosophyTitle>No es un producto. Es un portal.</PhilosophyTitle>
          <PhilosophyContent>
            Tu libro no es el objetivo. Es la consecuencia natural
            de tu transformación. Cada página documenta una victoria
            sobre tu antiguo yo. Cada capítulo es una estación
            en tu viaje hacia ti mismo.
          </PhilosophyContent>
          <PhilosophyContent>
            Sophia co-crea contigo, tejiendo tus experiencias en
            narrativa coherente. Tu voz, amplificada. Tu historia,
            inmortalizada. Tu transformación, compartida.
          </PhilosophyContent>
          
          <BookMeaning
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <BookMeaningTitle>Cuando lo sostengas en tus manos...</BookMeaningTitle>
            <BookMeaningText>
              No verás un libro. Verás el mapa del territorio
              que conquistaste: tu propia alma. Y ese mapa
              servirá de guía para otros buscadores.
            </BookMeaningText>
          </BookMeaning>
        </BookPhilosophyText>
      </Container>
    </BookSection>
  )
}