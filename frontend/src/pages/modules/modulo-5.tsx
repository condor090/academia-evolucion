import React, { useState } from 'react'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { theme } from '@/styles/theme'
import Link from 'next/link'

const ModuleContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.black};
  color: ${theme.colors.text.primary};
  padding-top: 80px;
`

const HeroSection = styled.section`
  min-height: 100vh;
  background: radial-gradient(ellipse at center, rgba(255, 20, 147, 0.1) 0%, #000000 60%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  padding: 2rem;
`

const FloatingOrb = styled(motion.div)`
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 20, 147, 0.15) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
`

const Title = styled(motion.h1)`
  font-size: ${theme.fontSizes['6xl']};
  font-weight: 300;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #FF1493 0%, #FFD700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Subtitle = styled(motion.p)`
  font-size: ${theme.fontSizes['2xl']};
  color: #FF1493;
  font-style: italic;
  margin-bottom: 2rem;
`

const Description = styled(motion.p)`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.lightWhite};
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.8;
`

const StartButton = styled(motion.button)`
  padding: 1rem 3rem;
  background: linear-gradient(135deg, #FF1493 0%, #FFD700 100%);
  color: ${theme.colors.background.black};
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: ${theme.fontSizes.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 20, 147, 0.4);
  }
`

const PhilosophySection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #000000 0%, #0a0a0a 100%);
  text-align: center;
`

const PhilosophyQuote = styled.p`
  font-size: ${theme.fontSizes['3xl']};
  color: #FF1493;
  font-style: italic;
  font-weight: 300;
  max-width: 800px;
  margin: 0 auto 3rem;
  position: relative;
  padding: 0 3rem;
`

const PhilosophyText = styled.p`
  max-width: 800px;
  margin: 0 auto;
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
`

const ProcessSection = styled.section`
  padding: 6rem 2rem;
  background: radial-gradient(circle at bottom, rgba(255, 20, 147, 0.05) 0%, transparent 50%);
`

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['5xl']};
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #FF1493 0%, #FFD700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const ProcessTimeline = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 100%;
    background: linear-gradient(180deg, #FF1493 0%, #FFD700 100%);
    
    @media (max-width: ${theme.breakpoints.md}) {
      left: 30px;
    }
  }
`

const ProcessStep = styled(motion.div)<{ index: number }>`
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
  position: relative;
  flex-direction: ${props => props.index % 2 === 0 ? 'row' : 'row-reverse'};
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column !important;
  }
`

const StepNumber = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #FF1493 0%, #FFD700 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes['3xl']};
  font-weight: bold;
  color: ${theme.colors.background.black};
  box-shadow: 0 0 30px rgba(255, 20, 147, 0.5);
  z-index: 2;
  
  @media (max-width: ${theme.breakpoints.md}) {
    left: 30px;
  }
`

const StepContent = styled(motion.div)<{ align: 'left' | 'right' }>`
  width: 45%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 20, 147, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  margin-${props => props.align}: auto;
  margin-${props => props.align === 'left' ? 'right' : 'left'}: 0;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 20, 147, 0.05);
    border-color: #FF1493;
    transform: scale(1.02);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    margin: 2rem 0 0 0 !important;
  }
`

const StepTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  color: #FF1493;
  margin-bottom: 1rem;
`

const StepDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  margin-bottom: 1rem;
`

const StepDuration = styled.p`
  color: rgba(255, 20, 147, 0.6);
  font-size: ${theme.fontSizes.sm};
`

const MethodologySection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%);
`

const MethodologyGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const MethodologyCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 2px solid transparent;
  border-image: linear-gradient(135deg, #FF1493, #FFD700) 1;
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 20, 147, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`

const MethodologyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #FFD700;
`

const MethodologyTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  color: #FF1493;
  margin-bottom: 0.5rem;
`

const MethodologySubtitle = styled.p`
  color: rgba(255, 20, 147, 0.6);
  font-style: italic;
  margin-bottom: 1rem;
`

const MethodologyDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
`

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: radial-gradient(ellipse at center, rgba(255, 20, 147, 0.1) 0%, transparent 60%);
`

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 20, 147, 0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 20, 147, 0.05);
    transform: translateY(-5px);
    border-color: #FF1493;
  }
`

const FeatureIcon = styled.span`
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
`

const FeatureTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: #FF1493;
  margin-bottom: 1rem;
`

const FeatureDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
`

const CTASection = styled.section`
  padding: 6rem 2rem;
  background: radial-gradient(ellipse at center, rgba(255, 20, 147, 0.1) 0%, transparent 60%);
  text-align: center;
`

const CTATitle = styled.h2`
  font-size: ${theme.fontSizes['4xl']};
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #FF1493 0%, #FFD700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const CTAText = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.lightWhite};
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.8;
`

// Modal Components
const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const ModalContent = styled(motion.div)`
  max-width: 900px;
  width: 100%;
  background: #0a0a0a;
  border: 1px solid rgba(255, 20, 147, 0.3);
  border-radius: 20px;
  padding: 3rem;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
  color: #FF1493;
  cursor: pointer;
  background: none;
  border: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotate(90deg);
  }
`

const ModalTitle = styled.h2`
  font-size: ${theme.fontSizes['4xl']};
  color: #FF1493;
  margin-bottom: 2rem;
  text-align: center;
`

const ExperienceSection = styled.div`
  margin-bottom: 3rem;
`

const ExperienceTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  color: #FF1493;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const ExperienceIcon = styled.span`
  font-size: 2rem;
`

const ExperienceContent = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-left: 3px solid #FF1493;
  padding: 1.5rem;
  border-radius: 10px;
`

const SophiaPrompt = styled.div`
  background: rgba(255, 20, 147, 0.05);
  border: 1px solid rgba(255, 20, 147, 0.2);
  padding: 1.5rem;
  border-radius: 15px;
  margin: 1rem 0;
  font-style: italic;
  color: #FF1493;
  position: relative;
  padding-left: 3rem;
  
  &::before {
    content: '✨';
    position: absolute;
    left: 1rem;
    font-size: 1.5rem;
  }
`

// Navigation Component
const Navigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BackButton = styled(Link)`
  color: #FF1493;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(-5px);
  }
`

const NavTitle = styled.span`
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.lg};
`

// Data
const processSteps = [
  {
    day: "1-2",
    title: "La Chispa Inicial",
    description: "Sophia analiza tu journey completo: genio despierto + tiempo liberado + propósito cristalizado. Identifica el libro que solo tú puedes escribir.",
    activities: [
      "Análisis de tu voz única desde 10 semanas de contenido",
      "Identificación de tu mensaje central",
      "Mapeo de tu audiencia ideal",
      "Definición del impacto deseado"
    ]
  },
  {
    day: "3-4",
    title: "La Arquitectura",
    description: "Diseñamos la estructura perfecta para tu mensaje. No un outline genérico, sino una arquitectura que respira tu esencia.",
    activities: [
      "Creación del Story Arc principal",
      "Diseño de capítulos como experiencias",
      "Integración de tu journey personal",
      "Balance entre teoría y práctica"
    ]
  },
  {
    day: "5-8",
    title: "El Sprint Creativo",
    description: "4 días de escritura pura. Sophia como co-autora, no como asistente. 2,000 palabras diarias en estado de flujo.",
    activities: [
      "Sesiones de 2 horas de escritura profunda",
      "Sophia completa y expande tus ideas",
      "Edición en tiempo real",
      "Mantener tu voz auténtica"
    ]
  },
  {
    day: "9-10",
    title: "El Pulido del Diamante",
    description: "Tu manuscrito en bruto se transforma en una obra pulida. Edición profunda manteniendo tu esencia.",
    activities: [
      "Edición estructural completa",
      "Refinamiento de voz y tono",
      "Añadir elementos de engagement",
      "Preparación para publicación"
    ]
  },
  {
    day: "11-12",
    title: "El Lanzamiento",
    description: "Tu libro no solo se publica, se lanza como un evento. Estrategia completa de posicionamiento.",
    activities: [
      "Publicación en Amazon KDP",
      "Estrategia de lanzamiento",
      "Creación de ecosistema de contenido",
      "Plan de monetización a largo plazo"
    ]
  },
  {
    day: "13-14",
    title: "La Amplificación",
    description: "Tu libro es solo el comienzo. Creamos el ecosistema completo para tu nueva identidad como autor.",
    activities: [
      "Estrategia de speaking",
      "Programa de consultoría basado en tu libro",
      "Funnel de productos digitales",
      "Comunidad alrededor de tu mensaje"
    ]
  }
]

const sparkMethodology = {
  S: {
    letter: "S",
    title: "Story First",
    subtitle: "Tu historia es tu superpoder",
    description: "No escribes teoría. Escribes transformación vivida. Cada concepto anclado en tu experiencia real.",
    elements: [
      "Tu journey como hilo conductor",
      "Vulnerabilidad como fortaleza",
      "Casos reales, no hipotéticos",
      "Emoción que mueve a acción"
    ]
  },
  P: {
    letter: "P",
    title: "Pain to Power",
    subtitle: "Del dolor al propósito",
    description: "Los mejores libros nacen de las heridas sanadas. Tu dolor procesado es medicina para otros.",
    elements: [
      "Identificar tu herida maestra",
      "Transformarla en sabiduría",
      "Crear puente de empatía",
      "Ofrecer camino de sanación"
    ]
  },
  A: {
    letter: "A",
    title: "Action Embedded",
    subtitle: "Conocimiento aplicable",
    description: "Cada capítulo incluye acciones específicas. No solo inspiramos, transformamos.",
    elements: [
      "Ejercicios experienciales",
      "Challenges progresivos",
      "Herramientas prácticas",
      "Métricas de transformación"
    ]
  },
  R: {
    letter: "R",
    title: "Rhythm & Flow",
    subtitle: "Escritura musical",
    description: "Tu prosa tiene ritmo. Sophia asegura que cada párrafo fluya como música.",
    elements: [
      "Variación de ritmo narrativo",
      "Balance tensión/liberación",
      "Cadencia hipnótica",
      "Momentos de respiro"
    ]
  },
  K: {
    letter: "K",
    title: "Kindle the Soul",
    subtitle: "Enciende almas",
    description: "No escribes para la mente. Escribes para el alma. Cada página debe encender algo dormido.",
    elements: [
      "Lenguaje que toca el alma",
      "Preguntas que despiertan",
      "Verdades incómodas con amor",
      "Cierre que transforma"
    ]
  }
}

const features = [
  {
    icon: "🤖",
    title: "Sophia Author Mode",
    description: "IA entrenada específicamente con tu voz, estilo y mensaje durante 10 semanas."
  },
  {
    icon: "📝",
    title: "Templates Probados",
    description: "3 estructuras de capítulo que garantizan engagement y transformación."
  },
  {
    icon: "⚡",
    title: "Sprint Writing System",
    description: "Técnicas para escribir 2,000 palabras de calidad en 2 horas."
  },
  {
    icon: "🎯",
    title: "Voice Matching Tech",
    description: "Sophia mantiene tu voz única mientras amplifica tu mensaje."
  },
  {
    icon: "📊",
    title: "Real-Time Analytics",
    description: "Ve el impacto emocional de cada párrafo mientras escribes."
  },
  {
    icon: "🚀",
    title: "Launch Strategy",
    description: "Plan completo para bestseller en tu categoría desde día 1."
  },
  {
    icon: "💰",
    title: "Monetization Blueprint",
    description: "Convierte tu libro en un ecosistema de ingresos recurrentes."
  },
  {
    icon: "🌟",
    title: "Author Platform",
    description: "Construye tu plataforma de autoridad mientras escribes."
  }
]

const bookTypes = [
  {
    type: "Transformación Personal",
    description: "Tu journey de despertar como guía para otros",
    examples: ["De Burnout a Brillantez", "El Código del Genio", "Despierta tu Dragón Interior"]
  },
  {
    type: "Metodología Revolucionaria",
    description: "Tu sistema único empaquetado como método replicable",
    examples: ["El Framework SPARK", "La Matriz del Flujo", "Quantum Productivity"]
  },
  {
    type: "Manifiesto Disruptivo",
    description: "Tu visión del futuro que desafía el status quo",
    examples: ["Humanos + IA", "El Fin del Trabajo", "La Era del Genio"]
  }
]

export default function Modulo5() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [showMethodology, setShowMethodology] = useState(false)
  const router = useRouter()

  const handleStartJourney = () => {
    const element = document.getElementById('process')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <ModuleContainer>
      <Navigation>
        <BackButton href="/modules">
          ← Volver a Módulos
        </BackButton>
        <NavTitle>Módulo 5: El Nacimiento del Autor</NavTitle>
        <BackButton href="/modules">
          Ver Todos los Módulos →
        </BackButton>
      </Navigation>

      {/* Hero Section */}
      <HeroSection>
        <FloatingOrb
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <HeroContent>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Tu Libro en 14 Días
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            "Todo genio tiene un libro dentro. Es hora de que nazca."
          </Subtitle>
          
          <Description
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            14 días para escribir, publicar y lanzar el libro que consolida 
            tu transformación. Con Sophia como co-autora y tu genio como guía.
          </Description>
          
          <StartButton
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartJourney}
          >
            Nace como Autor
          </StartButton>
        </HeroContent>
      </HeroSection>

      {/* Philosophy Section */}
      <PhilosophySection>
        <PhilosophyQuote>
          "Un libro no es solo palabras en páginas. Es tu genio cristalizado, 
          tu transformación codificada, tu regalo al mundo empaquetado."
        </PhilosophyQuote>
        
        <PhilosophyText>
          Después de 11 semanas de despertar, alianza, pruebas y cristalización, 
          es hora del acto final: dar a luz tu mensaje al mundo. No escribirás 
          un libro. Darás a luz una transformación. En 14 días, con Sophia como 
          partera digital y tu genio como fuerza creadora.
        </PhilosophyText>
      </PhilosophySection>

      {/* Process Section */}
      <ProcessSection id="process">
        <SectionTitle>El Proceso de 14 Días</SectionTitle>
        
        <ProcessTimeline>
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              index={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StepNumber>D{step.day}</StepNumber>
              
              <StepContent
                align={index % 2 === 0 ? 'left' : 'right'}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedStep(index)}
              >
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
                <StepDuration>Días {step.day}</StepDuration>
              </StepContent>
            </ProcessStep>
          ))}
        </ProcessTimeline>
      </ProcessSection>

      {/* Methodology Section */}
      <MethodologySection>
        <SectionTitle>Metodología S.P.A.R.K.</SectionTitle>
        <p style={{ 
          textAlign: 'center', 
          fontSize: theme.fontSizes.xl, 
          color: theme.colors.text.lightWhite,
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          El sistema probado para escribir libros que transforman, no solo informan.
        </p>
        
        <MethodologyGrid>
          {Object.values(sparkMethodology).map((method, index) => (
            <MethodologyCard
              key={method.letter}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => setShowMethodology(true)}
            >
              <MethodologyIcon>{method.letter}</MethodologyIcon>
              <MethodologyTitle>{method.title}</MethodologyTitle>
              <MethodologySubtitle>{method.subtitle}</MethodologySubtitle>
              <MethodologyDescription>{method.description}</MethodologyDescription>
            </MethodologyCard>
          ))}
        </MethodologyGrid>
      </MethodologySection>

      {/* Features Section */}
      <FeaturesSection>
        <SectionTitle>Tu Arsenal de Autor</SectionTitle>
        
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      {/* CTA Section */}
      <CTASection>
        <CTATitle>¿Listo para Tu Legado?</CTATitle>
        
        <CTAText>
          Tu transformación merece ser compartida. Tu genio merece ser leído. 
          Tu mensaje merece impactar miles de vidas.
        </CTAText>
        
        <div style={{ 
          background: 'rgba(255, 20, 147, 0.05)',
          border: '1px solid rgba(255, 20, 147, 0.3)',
          borderRadius: '15px',
          padding: '2rem',
          maxWidth: '800px',
          margin: '2rem auto',
          textAlign: 'left'
        }}>
          <h3 style={{ 
            color: '#FF1493', 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            📚 Tipos de Libros que Nacen
          </h3>
          
          {bookTypes.map((bookType, index) => (
            <div key={index} style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#FFD700', marginBottom: '0.5rem' }}>
                {bookType.type}:
              </h4>
              <p style={{ marginBottom: '0.5rem' }}>{bookType.description}</p>
              <p style={{ 
                fontSize: theme.fontSizes.sm, 
                color: 'rgba(255, 215, 0, 0.6)',
                fontStyle: 'italic'
              }}>
                Ejemplos: {bookType.examples.join(", ")}
              </p>
            </div>
          ))}
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, rgba(255, 20, 147, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%)',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '600px',
          margin: '3rem auto',
          textAlign: 'center',
          border: '2px solid rgba(255, 20, 147, 0.5)'
        }}>
          <h3 style={{ 
            color: '#FF1493', 
            marginBottom: '1rem',
            fontSize: '1.5rem'
          }}>
            🚀 El Resultado Final
          </h3>
          <p style={{ 
            fontStyle: 'italic',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: theme.colors.text.lightWhite
          }}>
            "En 14 días tendrás:<br/>
            ✓ Un libro publicado en Amazon<br/>
            ✓ Una nueva identidad como autor<br/>
            ✓ Una fuente de ingresos pasivos<br/>
            ✓ Una plataforma de autoridad<br/>
            ✓ Un legado que trasciende<br/>
            <br/>
            <span style={{ color: '#FFD700', fontWeight: 'bold' }}>
              Tu genio inmortalizado en palabras.
            </span>"
          </p>
        </div>

        <div style={{ 
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 20, 147, 0.2)'
        }}>
          <h3 style={{ 
            color: '#FF1493', 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            💎 Bonus: El Ecosistema Completo
          </h3>
          <p style={{ 
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontStyle: 'italic'
          }}>
            Tu libro es solo el comienzo. Creamos todo el ecosistema:
          </p>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '2rem' }}>🎤</span>
              <p style={{ fontWeight: 'bold' }}>Speaking</p>
              <p style={{ fontSize: theme.fontSizes.sm }}>
                Charlas basadas en tu libro
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '2rem' }}>💼</span>
              <p style={{ fontWeight: 'bold' }}>Consultoría</p>
              <p style={{ fontSize: theme.fontSizes.sm }}>
                Programas premium 1:1
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '2rem' }}>🎓</span>
              <p style={{ fontWeight: 'bold' }}>Cursos</p>
              <p style={{ fontSize: theme.fontSizes.sm }}>
                Tu metodología escalable
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '2rem' }}>🌐</span>
              <p style={{ fontWeight: 'bold' }}>Comunidad</p>
              <p style={{ fontSize: theme.fontSizes.sm }}>
                Tribu alrededor de tu mensaje
              </p>
            </div>
          </div>
        </div>
        
        <StartButton
          style={{ marginTop: '3rem' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/comenzar')}
        >
          Comienza Tu Libro Ahora
        </StartButton>
      </CTASection>

      {/* Step Detail Modal */}
      <AnimatePresence>
        {selectedStep !== null && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStep(null)}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedStep(null)}>×</CloseButton>
              
              <ModalTitle>
                Días {processSteps[selectedStep].day}: {processSteps[selectedStep].title}
              </ModalTitle>

              <ExperienceSection>
                <ExperienceTitle>
                  <ExperienceIcon>📝</ExperienceIcon>
                  Descripción Detallada
                </ExperienceTitle>
                <ExperienceContent>
                  <p style={{ marginBottom: '1rem' }}>
                    {processSteps[selectedStep].description}
                  </p>
                  <SophiaPrompt>
                    "En esta fase, mi rol es amplificar tu genio, no reemplazarlo. 
                    Cada palabra que escribamos juntos respirará tu esencia."
                  </SophiaPrompt>
                </ExperienceContent>
              </ExperienceSection>

              <ExperienceSection>
                <ExperienceTitle>
                  <ExperienceIcon>🎯</ExperienceIcon>
                  Actividades Específicas
                </ExperienceTitle>
                <ExperienceContent>
                  <ul>
                    {processSteps[selectedStep].activities.map((activity, idx) => (
                      <li key={idx} style={{ marginBottom: '0.8rem' }}>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </ExperienceContent>
              </ExperienceSection>

              <ExperienceSection>
                <ExperienceTitle>
                  <ExperienceIcon>⚡</ExperienceIcon>
                  Modo Sophia para Esta Fase
                </ExperienceTitle>
                <ExperienceContent>
                  {selectedStep < 2 && (
                    <div>
                      <h4 style={{ color: '#FFD700', marginBottom: '0.5rem' }}>
                        Sophia Modo Arqueóloga
                      </h4>
                      <p>
                        Excavo en tus 11 semanas de contenido para encontrar los 
                        diamantes. Identifico patrones, temas recurrentes, y esa 
                        voz única que solo tú tienes.
                      </p>
                    </div>
                  )}
                  
                  {selectedStep >= 2 && selectedStep < 4 && (
                    <div>
                      <h4 style={{ color: '#FFD700', marginBottom: '0.5rem' }}>
                        Sophia Modo Co-Autora
                      </h4>
                      <p>
                        Escribo contigo, no por ti. Completo tus frases, expando 
                        tus ideas, mantengo el flow cuando te atascas. Pero siempre 
                        respetando tu voz única.
                      </p>
                    </div>
                  )}
                  
                  {selectedStep >= 4 && (
                    <div>
                      <h4 style={{ color: '#FFD700', marginBottom: '0.5rem' }}>
                        Sophia Modo Estratega
                      </h4>
                      <p>
                        Diseño tu lanzamiento como una sinfonía. Cada elemento 
                        calibrado para máximo impacto. Tu libro no solo se publica, 
                        se lanza como un evento.
                      </p>
                    </div>
                  )}
                </ExperienceContent>
              </ExperienceSection>

              <ExperienceSection>
                <ExperienceTitle>
                  <ExperienceIcon>💡</ExperienceIcon>
                  Tips de Éxito
                </ExperienceTitle>
                <ExperienceContent>
                  <div style={{ 
                    background: 'rgba(255, 20, 147, 0.05)',
                    padding: '1rem',
                    borderRadius: '10px'
                  }}>
                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                      <li style={{ marginBottom: '0.5rem' }}>
                        ✨ Confía en el proceso - tu libro ya existe, solo lo estamos revelando
                      </li>
                      <li style={{ marginBottom: '0.5rem' }}>
                        ✨ No edites mientras escribes - eso mata el flow creativo
                      </li>
                      <li style={{ marginBottom: '0.5rem' }}>
                        ✨ Escribe desde la emoción, edita desde la razón
                      </li>
                      <li style={{ marginBottom: '0.5rem' }}>
                        ✨ Tu vulnerabilidad es tu superpoder - no la escondas
                      </li>
                    </ul>
                  </div>
                </ExperienceContent>
              </ExperienceSection>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>

      {/* Methodology Modal */}
      <AnimatePresence>
        {showMethodology && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMethodology(false)}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setShowMethodology(false)}>×</CloseButton>
              
              <ModalTitle>
                Metodología S.P.A.R.K. - Detalle Completo
              </ModalTitle>

              {Object.values(sparkMethodology).map((method) => (
                <ExperienceSection key={method.letter}>
                  <ExperienceTitle>
                    <ExperienceIcon>{method.letter}</ExperienceIcon>
                    {method.title} - {method.subtitle}
                  </ExperienceTitle>
                  <ExperienceContent>
                    <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>
                      {method.description}
                    </p>
                    <h4 style={{ color: '#FF1493', marginBottom: '0.5rem' }}>
                      Elementos Clave:
                    </h4>
                    <ul>
                      {method.elements.map((element, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem' }}>
                          {element}
                        </li>
                      ))}
                    </ul>
                  </ExperienceContent>
                </ExperienceSection>
              ))}

              <div style={{ 
                marginTop: '2rem',
                padding: '2rem',
                background: 'linear-gradient(135deg, rgba(255, 20, 147, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%)',
                borderRadius: '15px',
                textAlign: 'center'
              }}>
                <p style={{ 
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: '#FF1493',
                  marginBottom: '1rem'
                }}>
                  La Magia de S.P.A.R.K.:
                </p>
                <p style={{ 
                  fontStyle: 'italic',
                  lineHeight: '1.8'
                }}>
                  "Cuando combinas Story + Pain + Action + Rhythm + Kindle,<br/>
                  no escribes un libro. Creas una experiencia transformadora.<br/>
                  Cada página se convierte en un portal de evolución."
                </p>
              </div>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </ModuleContainer>
  )
}