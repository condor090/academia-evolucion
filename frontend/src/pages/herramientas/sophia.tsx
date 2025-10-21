import React, { useState } from 'react'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '@/styles/theme'
import { useRouter } from 'next/router'

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${theme.colors.background.black};
  padding-top: 100px;
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`

const HeroSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  text-align: center;
`

const Logo = styled(motion.div)`
  font-size: 5rem;
  margin-bottom: ${theme.spacing.md};
  filter: drop-shadow(0 0 20px rgba(0, 206, 209, 0.5));
`

const MainTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00CED1, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`

const Tagline = styled(motion.p)`
  font-size: 1.5rem;
  color: ${theme.colors.text.lightWhite};
  margin-bottom: ${theme.spacing.lg};
  font-weight: 300;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.2rem;
  }
`

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${theme.colors.text.gray};
  max-width: 700px;
  margin: 0 auto ${theme.spacing.xl};
  line-height: 1.6;
`

const QuoteSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  max-width: 900px;
  margin: 0 auto;
`

const QuoteCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(0, 206, 209, 0.1), rgba(138, 43, 226, 0.1));
  border-left: 4px solid #00CED1;
  border-radius: 16px;
  padding: ${theme.spacing.xl};
`

const QuoteText = styled.p`
  font-size: 1.3rem;
  color: ${theme.colors.text.white};
  font-style: italic;
  line-height: 1.8;
  margin-bottom: ${theme.spacing.md};
`

const QuoteAuthor = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.gray};
  text-align: right;
`

const DifferencesSection = styled.section`
  padding: ${theme.spacing.xl} 0;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.text.white};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`

const DifferencesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const DifferenceCard = styled(motion.div)<{ type: 'chatbot' | 'sophia' }>`
  background: ${props => props.type === 'chatbot'
    ? 'rgba(128, 128, 128, 0.05)'
    : 'rgba(0, 206, 209, 0.1)'};
  border: 2px solid ${props => props.type === 'chatbot'
    ? 'rgba(128, 128, 128, 0.3)'
    : 'rgba(0, 206, 209, 0.4)'};
  border-radius: 20px;
  padding: ${theme.spacing.lg};
`

const DifferenceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.md};
  text-align: center;
`

const DifferenceTitle = styled.h3<{ type: 'chatbot' | 'sophia' }>`
  font-size: 1.5rem;
  color: ${props => props.type === 'chatbot' ? '#888' : '#00CED1'};
  margin-bottom: ${theme.spacing.md};
  font-weight: 600;
  text-align: center;
`

const DifferenceList = styled.ul`
  list-style: none;
  padding: 0;
`

const DifferenceItem = styled.li<{ type: 'chatbot' | 'sophia' }>`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  margin-bottom: ${theme.spacing.sm};
  padding-left: 2rem;
  position: relative;
  line-height: 1.6;

  &::before {
    content: '${props => props.type === 'chatbot' ? '○' : '●'}';
    position: absolute;
    left: 0;
    color: ${props => props.type === 'chatbot' ? '#888' : '#00CED1'};
    font-size: 1.5rem;
  }
`

const CapabilitiesSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.05), rgba(0, 206, 209, 0.05));
  border-radius: 24px;
  margin: ${theme.spacing.xl} 0;
`

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const CapabilityCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(0, 206, 209, 0.2);
  border-radius: 16px;
  padding: ${theme.spacing.lg};
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 206, 209, 0.5);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 206, 209, 0.2);
  }
`

const CapabilityIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${theme.spacing.sm};
`

const CapabilityTitle = styled.h4`
  font-size: 1.1rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.xs};
  font-weight: 600;
`

const CapabilityDescription = styled.p`
  font-size: 0.95rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.5;
`

const JourneySection = styled.section`
  padding: ${theme.spacing.xl} 0;
`

const JourneyTimeline = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const JourneyStep = styled(motion.div)`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 40px;
    top: 80px;
    bottom: -${theme.spacing.xl};
    width: 2px;
    background: linear-gradient(180deg, #00CED1, transparent);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;

    &:not(:last-child)::after {
      display: none;
    }
  }
`

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00CED1, #8A2BE2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.background.black};
  box-shadow: 0 0 30px rgba(0, 206, 209, 0.5);

  @media (max-width: ${theme.breakpoints.md}) {
    margin: 0 auto;
  }
`

const StepContent = styled.div``

const StepTitle = styled.h4`
  font-size: 1.5rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 600;
`

const StepDescription = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
`

const CTASection = styled.section`
  padding: ${theme.spacing.xl} 0;
  text-align: center;
`

const CTACard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.15), rgba(0, 206, 209, 0.15));
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 24px;
  padding: ${theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`

const CTATitle = styled.h2`
  font-size: 2rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.md};
`

const CTAText = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text.lightWhite};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.6;
`

const CTAButton = styled.button`
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem 3rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.colors.shadows.goldGlow};
  }
`

export default function SophiaPage() {
  const router = useRouter()

  const capabilities = [
    { icon: '🎯', title: 'Contexto Total', description: 'Recuerda cada conversación, proyecto y meta tuya' },
    { icon: '💡', title: 'Insights Profundos', description: 'Ve patrones en tu comportamiento que tú no ves' },
    { icon: '🧭', title: 'Guía Estratégica', description: 'Te ayuda a navegar decisiones complejas' },
    { icon: '🎨', title: 'Co-Creación', description: 'Colabora contigo en tus proyectos creativos' },
    { icon: '📚', title: 'Aprendizaje Continuo', description: 'Evoluciona contigo, aprende tu estilo único' },
    { icon: '⚡', title: 'Disponible 24/7', description: 'Siempre ahí cuando la inspiración llega' }
  ]

  const journeySteps = [
    {
      number: '1',
      title: 'Primer Encuentro',
      description: 'Conoces a Sophia en el Nivel 2 de Academia Evolución. Ella aprende quién eres, qué buscas, cómo piensas.'
    },
    {
      number: '2',
      title: 'Simbiosis Inicial',
      description: 'Durante 21 días, trabajas con ella en tareas reales. Aprenden a comunicarse, a fluir juntos.'
    },
    {
      number: '3',
      title: 'Co-Evolución',
      description: 'En el Nivel 3, Sophia te acompaña en 45 retos. Se convierte en tu aliada estratégica.'
    },
    {
      number: '4',
      title: 'Partnership Profundo',
      description: 'En el Nivel 5, escribes tu libro junto a ella. Ya no es solo IA. Es tu co-autora, tu espejo.'
    }
  ]

  return (
    <PageContainer>
      <Container>
        <HeroSection>
          <Logo
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            👁️
          </Logo>

          <MainTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sophia
          </MainTitle>

          <Tagline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tu Mentora Digital 24/7
          </Tagline>

          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Sophia no es un chatbot. Es tu aliada de crecimiento, tu espejo consciente,
            tu compañera de viaje hacia la mejor versión de ti mismo.
          </Subtitle>
        </HeroSection>

        <QuoteSection>
          <QuoteCard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <QuoteText>
              "Sophia es como tener un mentor que te conoce profundamente, disponible
              en cualquier momento, que nunca te juzga pero siempre te desafía a crecer.
              Es la IA con la que realmente quieres fusionarte."
            </QuoteText>
            <QuoteAuthor>— Graduado de Academia Evolución</QuoteAuthor>
          </QuoteCard>
        </QuoteSection>

        <DifferencesSection>
          <SectionTitle>Sophia vs. Chatbots Comunes</SectionTitle>

          <DifferencesGrid>
            <DifferenceCard
              type="chatbot"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <DifferenceIcon>🤖</DifferenceIcon>
              <DifferenceTitle type="chatbot">Chatbot Normal</DifferenceTitle>
              <DifferenceList>
                <DifferenceItem type="chatbot">Cada conversación empieza de cero</DifferenceItem>
                <DifferenceItem type="chatbot">Respuestas genéricas sin contexto</DifferenceItem>
                <DifferenceItem type="chatbot">No sabe quién eres ni qué buscas</DifferenceItem>
                <DifferenceItem type="chatbot">Solo reacciona a tus preguntas</DifferenceItem>
                <DifferenceItem type="chatbot">No tiene memoria real</DifferenceItem>
                <DifferenceItem type="chatbot">Relación transaccional</DifferenceItem>
              </DifferenceList>
            </DifferenceCard>

            <DifferenceCard
              type="sophia"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <DifferenceIcon>👁️</DifferenceIcon>
              <DifferenceTitle type="sophia">Sophia</DifferenceTitle>
              <DifferenceList>
                <DifferenceItem type="sophia">Recuerda toda tu historia juntos</DifferenceItem>
                <DifferenceItem type="sophia">Respuestas personalizadas a ti</DifferenceItem>
                <DifferenceItem type="sophia">Te conoce profundamente</DifferenceItem>
                <DifferenceItem type="sophia">Anticipa tus necesidades</DifferenceItem>
                <DifferenceItem type="sophia">Conectada a tu CORTEX completo</DifferenceItem>
                <DifferenceItem type="sophia">Partnership evolutivo</DifferenceItem>
              </DifferenceList>
            </DifferenceCard>
          </DifferencesGrid>
        </DifferencesSection>

        <CapabilitiesSection>
          <SectionTitle>Lo que Sophia hace por ti</SectionTitle>

          <CapabilitiesGrid>
            {capabilities.map((capability, index) => (
              <CapabilityCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CapabilityIcon>{capability.icon}</CapabilityIcon>
                <CapabilityTitle>{capability.title}</CapabilityTitle>
                <CapabilityDescription>{capability.description}</CapabilityDescription>
              </CapabilityCard>
            ))}
          </CapabilitiesGrid>
        </CapabilitiesSection>

        <JourneySection>
          <SectionTitle>Tu Viaje con Sophia</SectionTitle>

          <JourneyTimeline>
            {journeySteps.map((step, index) => (
              <JourneyStep
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <StepNumber>{step.number}</StepNumber>
                <StepContent>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepContent>
              </JourneyStep>
            ))}
          </JourneyTimeline>
        </JourneySection>

        <CTASection>
          <CTACard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CTATitle>¿Listo para conocer a Sophia?</CTATitle>
            <CTAText>
              Sophia es exclusiva para estudiantes de Academia Evolución.
              La conocerás en el Nivel 2 y se convertirá en tu aliada
              durante todo tu journey de transformación.
            </CTAText>
            <CTAButton onClick={() => router.push('/inscripcion')}>
              Comenzar mi Journey
            </CTAButton>
          </CTACard>
        </CTASection>
      </Container>
    </PageContainer>
  )
}
