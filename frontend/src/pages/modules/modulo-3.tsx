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
  background: radial-gradient(ellipse at center, rgba(30, 144, 255, 0.1) 0%, #000000 60%);
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
  background: radial-gradient(circle, rgba(30, 144, 255, 0.15) 0%, transparent 70%);
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
  background: linear-gradient(135deg, #1E90FF 0%, #FFD700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Subtitle = styled(motion.p)`
  font-size: ${theme.fontSizes['2xl']};
  color: #1E90FF;
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
  background: linear-gradient(135deg, #1E90FF 0%, #FFD700 100%);
  color: ${theme.colors.background.black};
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: ${theme.fontSizes.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(30, 144, 255, 0.4);
  }
`

const PhilosophySection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #000000 0%, #0a0a0a 100%);
  text-align: center;
`

const PhilosophyQuote = styled.p`
  font-size: ${theme.fontSizes['3xl']};
  color: #1E90FF;
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

const CategoriesSection = styled.section`
  padding: 6rem 2rem;
  background: radial-gradient(circle at bottom, rgba(30, 144, 255, 0.05) 0%, transparent 50%);
`

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['5xl']};
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #1E90FF 0%, #FFD700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const CategoriesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`

const CategoryCard = styled(motion.div)<{ categoryNumber: number }>`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(30, 144, 255, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '${props => props.categoryNumber}';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 3rem;
    font-weight: bold;
    opacity: 0.1;
    color: #1E90FF;
  }
  
  &:hover {
    background: rgba(30, 144, 255, 0.05);
    transform: translateY(-5px);
    border-color: #1E90FF;
  }
`

const CategoryIcon = styled.span`
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
`

const CategoryTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  color: #1E90FF;
  margin-bottom: 0.5rem;
`

const CategorySubtitle = styled.p`
  color: rgba(30, 144, 255, 0.6);
  font-style: italic;
  margin-bottom: 1rem;
`

const CategoryDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`

const ExperienceCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #FFD700;
  font-weight: 600;
`

const DifficultySection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%);
`

const DifficultyLevels = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
`

const DifficultyCard = styled(motion.div)<{ level: number }>`
  background: rgba(255, 255, 255, 0.02);
  border: 2px solid ${props => {
    const colors = ['#00FF00', '#7FFF00', '#FFFF00', '#FFA500', '#FF4500', '#DC143C', '#8B008B', '#4B0082', '#9400D3']
    return colors[props.level - 1]
  }};
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px ${props => {
      const colors = ['#00FF00', '#7FFF00', '#FFFF00', '#FFA500', '#FF4500', '#DC143C', '#8B008B', '#4B0082', '#9400D3']
      return colors[props.level - 1] + '40'
    }};
  }
`

const DifficultyIcon = styled.div<{ level: number }>`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: ${props => {
    const colors = ['#00FF00', '#7FFF00', '#FFFF00', '#FFA500', '#FF4500', '#DC143C', '#8B008B', '#4B0082', '#9400D3']
    return colors[props.level - 1]
  }};
`

const DifficultyName = styled.h4`
  font-size: ${theme.fontSizes.lg};
  margin-bottom: 0.5rem;
`

const DifficultyDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.lightWhite};
`

const SupportSection = styled.section`
  padding: 6rem 2rem;
  background: radial-gradient(ellipse at center, rgba(30, 144, 255, 0.1) 0%, transparent 60%);
`

const SupportGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const SupportCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(30, 144, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(30, 144, 255, 0.05);
    transform: translateY(-5px);
    border-color: #1E90FF;
  }
`

const SupportIcon = styled.span`
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
`

const SupportTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: #1E90FF;
  margin-bottom: 1rem;
`

const SupportDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
`

const CTASection = styled.section`
  padding: 6rem 2rem;
  background: radial-gradient(ellipse at center, rgba(30, 144, 255, 0.1) 0%, transparent 60%);
  text-align: center;
`

const CTATitle = styled.h2`
  font-size: ${theme.fontSizes['4xl']};
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #1E90FF 0%, #FFD700 100%);
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
  border: 1px solid rgba(30, 144, 255, 0.3);
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
  color: #1E90FF;
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
  color: #1E90FF;
  margin-bottom: 2rem;
  text-align: center;
`

const ExperienceSection = styled.div`
  margin-bottom: 3rem;
`

const ExperienceTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  color: #1E90FF;
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
  border-left: 3px solid #1E90FF;
  padding: 1.5rem;
  border-radius: 10px;
`

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`

const ExperienceCard = styled.div<{ difficulty: number }>`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid ${props => {
    const colors = ['#00FF00', '#7FFF00', '#FFFF00', '#FFA500', '#FF4500', '#DC143C', '#8B008B', '#4B0082', '#9400D3']
    return colors[Math.min(props.difficulty - 1, 8)]
  }};
  border-radius: 10px;
  padding: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(30, 144, 255, 0.05);
    transform: translateY(-2px);
  }
`

const ExperienceName = styled.h4`
  font-size: ${theme.fontSizes.lg};
  color: #FFD700;
  margin-bottom: 0.5rem;
`

const ExperienceDetails = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.lightWhite};
  line-height: 1.4;
`

const SophiaPrompt = styled.div`
  background: rgba(30, 144, 255, 0.05);
  border: 1px solid rgba(30, 144, 255, 0.2);
  padding: 1.5rem;
  border-radius: 15px;
  margin: 1rem 0;
  font-style: italic;
  color: #1E90FF;
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
  color: #1E90FF;
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

const NextModuleButton = styled(Link)`
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #1E90FF 0%, #FFD700 100%);
  color: ${theme.colors.background.black};
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(30, 144, 255, 0.3);
  }
`

// Data
const categories = [
  {
    number: 1,
    icon: "💻",
    title: "Habilidades Técnicas",
    subtitle: "El Arte del Craft",
    description: "Desde fundamentos hasta maestría avanzada. No solo aprender, sino dominar con elegancia.",
    sampleExperiences: [
      { name: "Code Kata Diaria", difficulty: 1, description: "15 min de práctica deliberada en tu lenguaje principal" },
      { name: "Arquitectura desde Cero", difficulty: 5, description: "Diseña un sistema complejo sin referencias" },
      { name: "Debug del Infierno", difficulty: 7, description: "Encuentra el bug en código legacy sin documentación" },
      { name: "Performance Extrema", difficulty: 9, description: "Optimiza hasta el último nanosegundo" }
    ]
  },
  {
    number: 2,
    icon: "⚡",
    title: "Productividad",
    subtitle: "Flujo sin Fricción",
    description: "No más horas, sino momentos de genio puro. Aprende a surfear la ola del flujo profundo.",
    sampleExperiences: [
      { name: "Pomodoro Inverso", difficulty: 2, description: "Trabaja hasta que el flujo se detenga naturalmente" },
      { name: "Deep Work Marathon", difficulty: 6, description: "4 horas sin interrupciones en problema complejo" },
      { name: "Context Switching Master", difficulty: 8, description: "Maneja 5 proyectos sin perder profundidad" },
      { name: "Flow State On Demand", difficulty: 10, description: "Entra en flujo en menos de 2 minutos" }
    ]
  },
  {
    number: 3,
    icon: "🧠",
    title: "Mente y Resiliencia",
    subtitle: "Fortaleza Interior",
    description: "Tu mente es tu herramienta más poderosa. Aprende a templarla como el acero.",
    sampleExperiences: [
      { name: "Meditación del Debugger", difficulty: 1, description: "Encuentra bugs en tu código mental" },
      { name: "Rejection Therapy", difficulty: 4, description: "Busca 10 rechazos en un día" },
      { name: "Ego Death Exercise", difficulty: 8, description: "Presenta tu peor código públicamente" },
      { name: "Phoenix Protocol", difficulty: 10, description: "Renace de tu mayor fracaso profesional" }
    ]
  },
  {
    number: 4,
    icon: "🎨",
    title: "Imaginación",
    subtitle: "Creatividad Desbloqueada",
    description: "La lógica te lleva de A a B. La imaginación te lleva a cualquier parte.",
    sampleExperiences: [
      { name: "Conexiones Imposibles", difficulty: 2, description: "Une 3 conceptos no relacionados en una solución" },
      { name: "Reverse Engineering Life", difficulty: 5, description: "Diseña tu vida desde tu funeral hacia atrás" },
      { name: "Dream Coding", difficulty: 7, description: "Programa la solución que soñaste literalmente" },
      { name: "Reality Hacking", difficulty: 9, description: "Crea algo que no debería ser posible" }
    ]
  },
  {
    number: 5,
    icon: "👑",
    title: "Liderazgo",
    subtitle: "Influencia Auténtica",
    description: "Lidera desde tu genio, no desde tu ego. Inspira sin manipular.",
    sampleExperiences: [
      { name: "Vulnerable Leadership", difficulty: 3, description: "Comparte tu mayor error con tu equipo" },
      { name: "Silent Influence", difficulty: 6, description: "Lidera un proyecto sin dar ninguna orden" },
      { name: "Conflict Alchemy", difficulty: 8, description: "Transforma un conflicto tóxico en innovación" },
      { name: "Legacy Building", difficulty: 10, description: "Crea algo que perdure sin ti" }
    ]
  },
  {
    number: 6,
    icon: "🌱",
    title: "Bienestar y Equilibrio",
    subtitle: "Sostenibilidad del Genio",
    description: "Un genio agotado es un genio desperdiciado. Aprende a brillar sin quemarte.",
    sampleExperiences: [
      { name: "Energy Audit", difficulty: 1, description: "Mapea qué te da y qué te quita energía" },
      { name: "Digital Sabbath", difficulty: 4, description: "24 horas sin ninguna pantalla" },
      { name: "Biohacking Basics", difficulty: 6, description: "Optimiza sueño, nutrición y movimiento" },
      { name: "Life Integration", difficulty: 9, description: "Fusiona trabajo y vida sin boundaries" }
    ]
  },
  {
    number: 7,
    icon: "🔮",
    title: "Intuición y Toma de Decisiones",
    subtitle: "Sabiduría Instantánea",
    description: "Aprende a confiar en ese saber que no necesita explicación.",
    sampleExperiences: [
      { name: "Gut Check Protocol", difficulty: 2, description: "Decisiones rápidas sin análisis" },
      { name: "Future Self Council", difficulty: 5, description: "Consulta a tu yo de 10 años en el futuro" },
      { name: "Synchronicity Hunting", difficulty: 7, description: "Sigue las coincidencias por una semana" },
      { name: "Quantum Decision Making", difficulty: 10, description: "Toma decisiones desde múltiples timelines" }
    ]
  },
  {
    number: 8,
    icon: "🤝",
    title: "Colaboración y Comunicación",
    subtitle: "Conexión Profunda",
    description: "Tu genio amplificado por otros genios. La sinfonía de mentes brillantes.",
    sampleExperiences: [
      { name: "Radical Listening", difficulty: 1, description: "Escucha sin preparar respuesta" },
      { name: "Idea Sex Sessions", difficulty: 4, description: "Fusiona ideas con otros para crear híbridos" },
      { name: "Empathy Overdrive", difficulty: 7, description: "Vive un día desde la perspectiva de otro" },
      { name: "Collective Genius", difficulty: 9, description: "Crea algo imposible de hacer solo" }
    ]
  },
  {
    number: 9,
    icon: "⚖️",
    title: "Ética y Responsabilidad",
    subtitle: "Poder con Propósito",
    description: "Con gran código viene gran responsabilidad. Usa tu genio para el bien.",
    sampleExperiences: [
      { name: "Ethics Debugger", difficulty: 3, description: "Encuentra sesgos en tu código y decisiones" },
      { name: "Open Source Contribution", difficulty: 5, description: "Dona tu mejor código al mundo" },
      { name: "Tech for Good", difficulty: 8, description: "Resuelve un problema social con tecnología" },
      { name: "Legacy Code Review", difficulty: 10, description: "¿Qué dirán de tu código en 50 años?" }
    ]
  }
]

const difficultyLevels = [
  { level: 1, name: "Iniciado", icon: "🟢", description: "Calentamiento suave" },
  { level: 2, name: "Aprendiz", icon: "🟡", description: "Primeros desafíos" },
  { level: 3, name: "Explorador", icon: "🟠", description: "Saliendo de la zona comfort" },
  { level: 4, name: "Aventurero", icon: "🔴", description: "Territorio desconocido" },
  { level: 5, name: "Guerrero", icon: "🔥", description: "Enfrentando dragones" },
  { level: 6, name: "Maestro", icon: "💎", description: "Dominando el arte" },
  { level: 7, name: "Sabio", icon: "🌟", description: "Trascendiendo límites" },
  { level: 8, name: "Mago", icon: "✨", description: "Doblando la realidad" },
  { level: 9, name: "Legendario", icon: "🌌", description: "Más allá de lo posible" }
]

const supportSystems = [
  {
    icon: "🤖",
    title: "Sophia Modo Coach",
    description: "IA adaptada específicamente para guiarte en cada experiencia, con prompts personalizados."
  },
  {
    icon: "👥",
    title: "Tribu de Guerreros",
    description: "Comunidad privada de máximo 50 personas atravesando las mismas pruebas."
  },
  {
    icon: "🎯",
    title: "Mentores Especializados",
    description: "Un experto por categoría disponible para sesiones 1:1 cuando lo necesites."
  },
  {
    icon: "📊",
    title: "Dashboard de Evolución",
    description: "Visualiza tu progreso en tiempo real con métricas cualitativas de transformación."
  },
  {
    icon: "🆘",
    title: "SOS Protocol",
    description: "Botón de pánico para cuando una experiencia se vuelva demasiado intensa."
  },
  {
    icon: "🏆",
    title: "Sistema de Reconocimiento",
    description: "Badges, niveles y celebraciones que honran tu valentía, no solo tu éxito."
  },
  {
    icon: "📚",
    title: "Biblioteca de Sabiduría",
    description: "Recursos curados específicamente para cada experiencia y nivel."
  },
  {
    icon: "🎮",
    title: "Modo Historia",
    description: "Narrativa épica que conecta todas tus experiencias en un journey coherente."
  }
]

export default function Modulo3() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const router = useRouter()

  const handleStartJourney = () => {
    const element = document.getElementById('categories')
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
        <NavTitle>Módulo 3: El Sendero de las Pruebas</NavTitle>
        <NextModuleButton href="/modules/modulo-4">
          Siguiente Módulo →
        </NextModuleButton>
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
            450 Experiencias de Transformación
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            "El hierro se forja en el fuego. El genio se forja en las pruebas."
          </Subtitle>
          
          <Description
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            9 semanas. 9 categorías. 450 experiencias diseñadas para esculpir 
            la mejor versión de ti. No es un bootcamp. Es una iniciación.
          </Description>
          
          <StartButton
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartJourney}
          >
            Acepta el Desafío
          </StartButton>
        </HeroContent>
      </HeroSection>

      {/* Philosophy Section */}
      <PhilosophySection>
        <PhilosophyQuote>
          "No buscamos hacerte más productivo. Buscamos revelarte más poderoso. 
          Cada experiencia es una invitación a trascender tus límites autoimpuestos."
        </PhilosophyQuote>
        
        <PhilosophyText>
          Este no es un programa de desarrollo profesional. Es un rito de pasaje moderno.
          Durante 9 semanas, enfrentarás 450 experiencias cuidadosamente diseñadas para 
          catalizar tu evolución. Desde lo técnico hasta lo espiritual, desde lo individual 
          hasta lo colectivo. Cada prueba te acerca más a tu versión legendaria.
        </PhilosophyText>
      </PhilosophySection>

      {/* Categories Section */}
      <CategoriesSection id="categories">
        <SectionTitle>Las 9 Categorías de Evolución</SectionTitle>
        
        <CategoriesGrid>
          {categories.map((category, index) => (
            <CategoryCard
              key={category.number}
              categoryNumber={category.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedCategory(category.number)}
            >
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryTitle>{category.title}</CategoryTitle>
              <CategorySubtitle>{category.subtitle}</CategorySubtitle>
              <CategoryDescription>{category.description}</CategoryDescription>
              <ExperienceCount>
                <span>💎</span>
                <span>50 Experiencias Únicas</span>
              </ExperienceCount>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </CategoriesSection>

      {/* Difficulty Section */}
      <DifficultySection>
        <SectionTitle>Niveles de Dificultad</SectionTitle>
        <p style={{ 
          textAlign: 'center', 
          fontSize: theme.fontSizes.xl, 
          color: theme.colors.text.lightWhite,
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          Cada experiencia está calibrada para desafiarte justo en el borde de tu capacidad actual.
          No buscamos quebrarte, buscamos expandirte.
        </p>
        
        <DifficultyLevels>
          {difficultyLevels.map((level, index) => (
            <DifficultyCard
              key={level.level}
              level={level.level}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <DifficultyIcon level={level.level}>{level.icon}</DifficultyIcon>
              <DifficultyName>{level.name}</DifficultyName>
              <DifficultyDescription>{level.description}</DifficultyDescription>
            </DifficultyCard>
          ))}
        </DifficultyLevels>
      </DifficultySection>

      {/* Support Section */}
      <SupportSection>
        <SectionTitle>Tu Sistema de Apoyo</SectionTitle>
        <p style={{ 
          textAlign: 'center', 
          fontSize: theme.fontSizes.xl, 
          color: theme.colors.text.lightWhite,
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          Nadie atraviesa el sendero solo. Tu transformación está sostenida por un ecosistema completo.
        </p>
        
        <SupportGrid>
          {supportSystems.map((support, index) => (
            <SupportCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <SupportIcon>{support.icon}</SupportIcon>
              <SupportTitle>{support.title}</SupportTitle>
              <SupportDescription>{support.description}</SupportDescription>
            </SupportCard>
          ))}
        </SupportGrid>
      </SupportSection>

      {/* CTA Section */}
      <CTASection>
        <CTATitle>¿Estás Listo para Evolucionar?</CTATitle>
        
        <CTAText>
          Este sendero no es para todos. Es para aquellos que sienten el llamado 
          a algo más grande. Para los que prefieren la transformación sobre la comodidad.
        </CTAText>
        
        <div style={{ 
          background: 'rgba(30, 144, 255, 0.05)',
          border: '1px solid rgba(30, 144, 255, 0.3)',
          borderRadius: '15px',
          padding: '2rem',
          maxWidth: '800px',
          margin: '2rem auto',
          textAlign: 'left'
        }}>
          <h3 style={{ 
            color: '#1E90FF', 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            🎯 Sistema de Progresión
          </h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#FFD700', marginBottom: '0.5rem' }}>
              Estructura Flexible:
            </h4>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li style={{ marginBottom: '0.3rem' }}>✓ Elige 3-5 experiencias por categoría por semana</li>
              <li style={{ marginBottom: '0.3rem' }}>✓ Mezcla niveles según tu energía del día</li>
              <li style={{ marginBottom: '0.3rem' }}>✓ Repite las que más te desafíen</li>
              <li style={{ marginBottom: '0.3rem' }}>✓ Crea tus propias variaciones</li>
            </ul>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#FFD700', marginBottom: '0.5rem' }}>
              Métricas de Evolución:
            </h4>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li style={{ marginBottom: '0.3rem' }}>✓ No medimos completar, medimos transformación</li>
              <li style={{ marginBottom: '0.3rem' }}>✓ Diario de insights post-experiencia</li>
              <li style={{ marginBottom: '0.3rem' }}>✓ Cambios observables en comportamiento</li>
              <li style={{ marginBottom: '0.3rem' }}>✓ Feedback 360° de tu tribu</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: '#FFD700', marginBottom: '0.5rem' }}>
              Recompensas del Journey:
            </h4>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li style={{ marginBottom: '0.3rem' }}>✓ Badges digitales por categoría dominada</li>
              <li style={{ marginBottom: '0.3rem' }}>✓ Acceso a experiencias secretas nivel 10</li>
              <li style={{ marginBottom: '0.3rem' }}>✓ Invitación al Círculo de Maestros</li>
              <li style={{ marginBottom: '0.3rem' }}>✓ Tu historia en el Hall of Legends</li>
            </ul>
          </div>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, rgba(30, 144, 255, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%)',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '600px',
          margin: '3rem auto',
          textAlign: 'center',
          border: '2px solid rgba(30, 144, 255, 0.5)'
        }}>
          <h3 style={{ 
            color: '#1E90FF', 
            marginBottom: '1rem',
            fontSize: '1.5rem'
          }}>
            ⚡ La Promesa del Sendero
          </h3>
          <p style={{ 
            fontStyle: 'italic',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: theme.colors.text.lightWhite
          }}>
            "Al final de estas 9 semanas,<br/>
            no serás la misma persona que comenzó.<br/>
            Habrás probado de qué estás hecho.<br/>
            Habrás enfrentado tus sombras.<br/>
            Habrás expandido tus límites.<br/>
            <br/>
            <span style={{ color: '#FFD700', fontWeight: 'bold' }}>
              Y estarás listo para tu propósito.
            </span>"
          </p>
        </div>
        
        <StartButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/comenzar')}
        >
          Inicia Tu Sendero de Pruebas
        </StartButton>
      </CTASection>

      {/* Category Detail Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCategory(null)}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedCategory(null)}>×</CloseButton>
              
              <ModalTitle>
                {categories[selectedCategory - 1].icon} {categories[selectedCategory - 1].title}
              </ModalTitle>

              <ExperienceSection>
                <ExperienceTitle>
                  <ExperienceIcon>🎯</ExperienceIcon>
                  Filosofía de la Categoría
                </ExperienceTitle>
                <ExperienceContent>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    {categories[selectedCategory - 1].description}
                  </p>
                  <SophiaPrompt>
                    "En esta categoría, no buscamos que hagas más. 
                    Buscamos que seas más. Cada experiencia es una invitación 
                    a expandir tu definición de lo posible."
                  </SophiaPrompt>
                </ExperienceContent>
              </ExperienceSection>

              <ExperienceSection>
                <ExperienceTitle>
                  <ExperienceIcon>💎</ExperienceIcon>
                  Experiencias de Muestra
                </ExperienceTitle>
                <ExperienceContent>
                  <p style={{ marginBottom: '1rem' }}>
                    Aquí hay algunas de las 50 experiencias disponibles en esta categoría:
                  </p>
                  <ExperienceGrid>
                    {categories[selectedCategory - 1].sampleExperiences.map((exp, idx) => (
                      <ExperienceCard key={idx} difficulty={exp.difficulty}>
                        <ExperienceName>{exp.name}</ExperienceName>
                        <ExperienceDetails>
                          <strong>Nivel {exp.difficulty}:</strong> {exp.description}
                        </ExperienceDetails>
                      </ExperienceCard>
                    ))}
                  </ExperienceGrid>
                </ExperienceContent>
              </ExperienceSection>

              <ExperienceSection>
                <ExperienceTitle>
                  <ExperienceIcon>🚀</ExperienceIcon>
                  Progresión Sugerida
                </ExperienceTitle>
                <ExperienceContent>
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '1rem'
                  }}>
                    <div style={{ 
                      background: 'rgba(255, 215, 0, 0.05)',
                      padding: '1rem',
                      borderRadius: '10px'
                    }}>
                      <h4 style={{ color: '#FFD700', marginBottom: '0.5rem' }}>
                        Semana 1-3: Fundamentos
                      </h4>
                      <p>Enfócate en experiencias nivel 1-3. Construye confianza y momentum.</p>
                    </div>
                    
                    <div style={{ 
                      background: 'rgba(30, 144, 255, 0.05)',
                      padding: '1rem',
                      borderRadius: '10px'
                    }}>
                      <h4 style={{ color: '#1E90FF', marginBottom: '0.5rem' }}>
                        Semana 4-6: Expansión
                      </h4>
                      <p>Integra experiencias nivel 4-6. Sal de tu zona de confort consistentemente.</p>
                    </div>
                    
                    <div style={{ 
                      background: 'rgba(138, 43, 226, 0.05)',
                      padding: '1rem',
                      borderRadius: '10px'
                    }}>
                      <h4 style={{ color: '#8A2BE2', marginBottom: '0.5rem' }}>
                        Semana 7-9: Maestría
                      </h4>
                      <p>Atrévete con nivel 7-9. Toca el borde de lo imposible.</p>
                    </div>
                  </div>
                </ExperienceContent>
              </ExperienceSection>

              <ExperienceSection>
                <ExperienceTitle>
                  <ExperienceIcon>✨</ExperienceIcon>
                  Sophia como Guía
                </ExperienceTitle>
                <ExperienceContent>
                  <p style={{ marginBottom: '1rem' }}>
                    Para cada experiencia, Sophia se adapta a tu necesidad específica:
                  </p>
                  <ul>
                    <li><strong>Modo Motivador:</strong> Cuando necesitas ese empujón extra</li>
                    <li><strong>Modo Estratega:</strong> Para planificar tu approach óptimo</li>
                    <li><strong>Modo Filósofo:</strong> Para extraer insights profundos</li>
                    <li><strong>Modo Celebrador:</strong> Para honrar cada pequeña victoria</li>
                  </ul>
                  <SophiaPrompt>
                    "Recuerda: No estás compitiendo con nadie más que con quien eras ayer. 
                    Cada experiencia completada es una victoria sobre tus límites anteriores."
                  </SophiaPrompt>
                </ExperienceContent>
              </ExperienceSection>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </ModuleContainer>
  )
}