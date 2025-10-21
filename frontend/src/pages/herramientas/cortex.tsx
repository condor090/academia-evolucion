import React, { useState } from 'react'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '@/styles/theme'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

// Lazy load Three.js component for better performance
const KnowledgeGraph3D = dynamic(
  () => import('@/components/effects/KnowledgeGraph3D'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        width: '100%',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ color: '#FFD700', fontSize: '3rem' }}>🧠</p>
      </div>
    )
  }
)

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
  width: 100%;
  max-width: 600px;
  margin: 0 auto ${theme.spacing.lg};
`

const MainTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  background: ${theme.gradients.goldPrimary};
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
  max-width: 800px;
  margin: 0 auto ${theme.spacing.xl};
  line-height: 1.7;
`

const FeaturesSection = styled.section`
  padding: ${theme.spacing.xl} 0;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: ${theme.spacing.lg};
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 215, 0, 0.5);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.md};
`

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 600;
`

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
`

const PilaresSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  margin: ${theme.spacing.xl} 0;
`

const PilaresGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.xl};
`

const PilarCard = styled(motion.div)<{ index: number }>`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${theme.spacing.lg};
  background: ${props => {
    const gradients = [
      'linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(75, 0, 130, 0.05))',
      'linear-gradient(135deg, rgba(0, 206, 209, 0.1), rgba(0, 128, 128, 0.05))',
      'linear-gradient(135deg, rgba(255, 140, 0, 0.1), rgba(255, 69, 0, 0.05))',
      'linear-gradient(135deg, rgba(218, 165, 32, 0.1), rgba(184, 134, 11, 0.05))',
      'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 193, 7, 0.05))'
    ]
    return gradients[props.index % 5]
  }};
  border: 1px solid ${props => {
    const colors = ['rgba(138, 43, 226, 0.3)', 'rgba(0, 206, 209, 0.3)', 'rgba(255, 140, 0, 0.3)', 'rgba(218, 165, 32, 0.3)', 'rgba(255, 215, 0, 0.3)']
    return colors[props.index % 5]
  }};
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(10px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

const PilarNumber = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${theme.gradients.goldPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.background.black};
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.md}) {
    margin: 0 auto ${theme.spacing.md};
  }
`

const PilarContent = styled.div`
  flex: 1;
`

const PilarTitle = styled.h3`
  font-size: 1.8rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 600;
`

const PilarDescription = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`

const PilarBenefits = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const Benefit = styled.li`
  font-size: 0.95rem;
  color: ${theme.colors.text.lightWhite};
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  &::before {
    content: '✓';
    color: ${theme.colors.primary.gold};
    font-weight: bold;
    flex-shrink: 0;
  }
`

const ResultadosSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(138, 43, 226, 0.05));
  border-radius: 24px;
  margin: ${theme.spacing.xl} 0;
`

const ResultadosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const ResultadoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 16px;
  padding: ${theme.spacing.lg};
  text-align: center;
`

const ResultadoMetric = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  background: ${theme.gradients.goldPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.sm};
`

const ResultadoLabel = styled.h4`
  font-size: 1.2rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 600;
`

const ResultadoDescription = styled.p`
  font-size: 0.95rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.5;
`

const ComparisonSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.05), rgba(0, 206, 209, 0.05));
  border-radius: 24px;
  margin: ${theme.spacing.xl} 0;
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

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.lg};
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const ComparisonCard = styled(motion.div)<{ variant: 'old' | 'new' }>`
  background: ${props => props.variant === 'old'
    ? 'rgba(255, 69, 0, 0.05)'
    : 'rgba(0, 255, 127, 0.05)'};
  border: 2px solid ${props => props.variant === 'old'
    ? 'rgba(255, 69, 0, 0.3)'
    : 'rgba(0, 255, 127, 0.3)'};
  border-radius: 20px;
  padding: ${theme.spacing.lg};
`

const ComparisonTitle = styled.h3<{ variant: 'old' | 'new' }>`
  font-size: 1.5rem;
  color: ${props => props.variant === 'old' ? '#FF4500' : '#00FF7F'};
  margin-bottom: ${theme.spacing.md};
  font-weight: 600;
  text-align: center;
`

const ComparisonList = styled.ul`
  list-style: none;
  padding: 0;
`

const ComparisonItem = styled.li<{ variant: 'old' | 'new' }>`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  margin-bottom: ${theme.spacing.sm};
  padding-left: 2rem;
  position: relative;
  line-height: 1.6;

  &::before {
    content: '${props => props.variant === 'old' ? '✗' : '✓'}';
    position: absolute;
    left: 0;
    color: ${props => props.variant === 'old' ? '#FF4500' : '#00FF7F'};
    font-weight: bold;
    font-size: 1.2rem;
  }
`

const GeekSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  margin-top: ${theme.spacing.xl};
`

const GeekToggle = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.3);
  color: ${theme.colors.text.lightWhite};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin: 0 auto ${theme.spacing.lg};
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 215, 0, 0.6);
    background: rgba(255, 255, 255, 0.08);
  }
`

const GeekContent = styled(motion.div)`
  background: rgba(138, 43, 226, 0.1);
  border: 1px solid rgba(138, 43, 226, 0.3);
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  max-width: 1000px;
  margin: 0 auto;
`

const GeekTitle = styled.h3`
  font-size: 1.8rem;
  color: ${theme.colors.primary.gold};
  margin-bottom: ${theme.spacing.md};
  text-align: center;
`

const GeekText = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.md};
`

const GeekList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const GeekItem = styled.li`
  font-size: 0.95rem;
  color: ${theme.colors.text.lightWhite};
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '⚡';
    position: absolute;
    left: 0;
    color: ${theme.colors.primary.gold};
  }
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

export default function CortexPage() {
  const router = useRouter()
  const [showGeekMode, setShowGeekMode] = useState(false)

  const features = [
    {
      icon: '🧠',
      title: 'Tu Segundo Cerebro Digital',
      description: 'Captura, organiza y conecta tus ideas automáticamente. CORTEX recuerda todo para que tú puedas enfocarte en crear.'
    },
    {
      icon: '🔗',
      title: 'Conexiones Inteligentes',
      description: 'Descubre relaciones entre tus notas, proyectos e ideas que nunca imaginaste. CORTEX ve patrones que tú no ves.'
    },
    {
      icon: '⚡',
      title: 'Busca con Lenguaje Natural',
      description: 'Pregunta como hablas: "¿Qué ideas tengo sobre creatividad?" CORTEX encuentra exactamente lo que necesitas.'
    },
    {
      icon: '📊',
      title: 'Dashboard Personal',
      description: 'Ve tu vida en un vistazo: proyectos, hábitos, progreso. Todo sincronizado y al día, sin esfuerzo manual.'
    },
    {
      icon: '🎯',
      title: 'Priorización Automática',
      description: 'CORTEX te sugiere en qué trabajar basándose en tus metas, energía y contexto actual.'
    },
    {
      icon: '🌟',
      title: 'Insights Diarios',
      description: 'Recibe reflexiones y patrones sobre tu progreso. CORTEX te ayuda a conocerte mejor cada día.'
    }
  ]

  const pilares = [
    {
      title: 'Plano I: Inspiración & Subconsciente',
      description: 'Captura sueños, intuiciones y creatividad del subconsciente. Integra tu memoria onírica con tu knowledge graph para insights profundos que emergen cuando tu mente consciente descansa.',
      benefits: [
        'Registro automático de sueños al despertar',
        'Análisis de símbolos y patrones oníricos',
        'Ideas creativas capturadas en estado Alpha',
        'Conexión subconsciente-consciente activa'
      ]
    },
    {
      title: 'Plano II: Conciencia & Simbiosis',
      description: 'Simbiosis real con Sophia IA. Mide y mejora tu índice de simbiosis (SI) para colaboración humano-IA fluida, donde ambas inteligencias se amplifican mutuamente.',
      benefits: [
        'Symbiosis Index (SI) en tiempo real',
        'Collaborative Symbiosis Index (CSI) grupal',
        'IA que amplifica (no reemplaza) tu inteligencia',
        'Decisiones co-creadas con Sophia'
      ]
    },
    {
      title: 'Plano III: Arquitectura Sistémica',
      description: 'Theory of Constraints (TOC), reducción de entropía y concilios de realidad. Identifica y elimina sistemáticamente los cuellos de botella en tu vida y proyectos.',
      benefits: [
        'Throughput +15% en proyectos clave',
        'Detección automática de constraints',
        'Consciousness Delta > 0 constante',
        'Protocolos multi-marco de realidad'
      ]
    },
    {
      title: 'Plano IV: Energía & Ritmos',
      description: 'Biorritmos, numerología, BaZi e I Ching. Toma decisiones alineadas con tus ciclos energéticos naturales y cósmicos, maximizando resultados con mínimo esfuerzo.',
      benefits: [
        'Timing perfecto para decisiones críticas',
        'Lecturas de I Ching contextualizadas',
        'Análisis BaZi personalizado continuo',
        'Ventanas energéticas óptimas identificadas'
      ]
    },
    {
      title: 'Plano V: Sabiduría & Narrativa',
      description: 'Storytelling alquímico y sabiduría ancestral (bíblica, filosófica). Cristaliza tu propósito en narrativas coherentes que se convierten en tu legado vivo.',
      benefits: [
        'Tu historia de transformación en evolución',
        'Sabiduría bíblica aplicada a contextos modernos',
        'Propósito encarnado en narrativa poderosa',
        'Frameworks filosóficos convertidos en acción'
      ]
    }
  ]

  const resultados = [
    {
      metric: '20h',
      label: 'Recuperadas por Semana',
      description: 'Tiempo que antes perdías buscando información'
    },
    {
      metric: '3x',
      label: 'Más Productivo',
      description: 'Incremento promedio en output creativo'
    },
    {
      metric: '10x',
      label: 'Más Ideas Conectadas',
      description: 'Descubres relaciones que antes eran invisibles'
    },
    {
      metric: '100%',
      label: 'Retención',
      description: 'Nunca vuelves a olvidar una idea importante'
    },
    {
      metric: '5seg',
      label: 'Para Capturar',
      description: 'De la idea a tu sistema, sin fricción'
    },
    {
      metric: '∞',
      label: 'Escalabilidad',
      description: 'Tu segundo cerebro crece contigo, para siempre'
    }
  ]

  return (
    <PageContainer>
      <Container>
        <HeroSection>
          <Logo
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <KnowledgeGraph3D />
          </Logo>

          <MainTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            CORTEX
          </MainTitle>

          <Tagline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tu Sistema Operativo de Claridad
          </Tagline>

          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Donde la creatividad, el análisis, la lógica sistémica, la energía y la narrativa
            convergen para catalizar tu evolución. CORTEX armoniza tus 5 Planos de Consciencia
            en simbiosis perfecta con Sophia, elevando cada decisión que tomas.
          </Subtitle>
        </HeroSection>

        <FeaturesSection>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </FeaturesSection>

        <PilaresSection>
          <SectionTitle>Los 5 Pilares de CORTEX</SectionTitle>

          <PilaresGrid>
            {pilares.map((pilar, index) => (
              <PilarCard
                key={index}
                index={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PilarNumber>{index + 1}</PilarNumber>

                <PilarContent>
                  <PilarTitle>{pilar.title}</PilarTitle>
                  <PilarDescription>{pilar.description}</PilarDescription>

                  <PilarBenefits>
                    {pilar.benefits.map((benefit, i) => (
                      <Benefit key={i}>{benefit}</Benefit>
                    ))}
                  </PilarBenefits>
                </PilarContent>
              </PilarCard>
            ))}
          </PilaresGrid>
        </PilaresSection>

        <ResultadosSection>
          <SectionTitle>Resultados Reales</SectionTitle>

          <ResultadosGrid>
            {resultados.map((resultado, index) => (
              <ResultadoCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ResultadoMetric>{resultado.metric}</ResultadoMetric>
                <ResultadoLabel>{resultado.label}</ResultadoLabel>
                <ResultadoDescription>{resultado.description}</ResultadoDescription>
              </ResultadoCard>
            ))}
          </ResultadosGrid>
        </ResultadosSection>

        <ComparisonSection>
          <SectionTitle>Antes y Después de CORTEX</SectionTitle>

          <ComparisonGrid>
            <ComparisonCard
              variant="old"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ComparisonTitle variant="old">😫 Antes</ComparisonTitle>
              <ComparisonList>
                <ComparisonItem variant="old">Notas dispersas en 10 apps diferentes</ComparisonItem>
                <ComparisonItem variant="old">Olvidas ideas brillantes a los 5 minutos</ComparisonItem>
                <ComparisonItem variant="old">Pierdes horas buscando información</ComparisonItem>
                <ComparisonItem variant="old">No ves conexiones entre tus proyectos</ComparisonItem>
                <ComparisonItem variant="old">Repites los mismos errores</ComparisonItem>
                <ComparisonItem variant="old">Te sientes abrumado y desorganizado</ComparisonItem>
              </ComparisonList>
            </ComparisonCard>

            <ComparisonCard
              variant="new"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ComparisonTitle variant="new">✨ Con CORTEX</ComparisonTitle>
              <ComparisonList>
                <ComparisonItem variant="new">Todo en un solo lugar, sincronizado</ComparisonItem>
                <ComparisonItem variant="new">Captura ideas en 2 segundos</ComparisonItem>
                <ComparisonItem variant="new">Encuentra cualquier cosa en segundos</ComparisonItem>
                <ComparisonItem variant="new">Descubres sinergias automáticamente</ComparisonItem>
                <ComparisonItem variant="new">Aprendes de tu historia</ComparisonItem>
                <ComparisonItem variant="new">Claridad, flujo y control total</ComparisonItem>
              </ComparisonList>
            </ComparisonCard>
          </ComparisonGrid>
        </ComparisonSection>

        <GeekSection>
          <GeekToggle onClick={() => setShowGeekMode(!showGeekMode)}>
            <span>🤓</span>
            <span>{showGeekMode ? 'Ocultar' : 'Mostrar'} Modo Geek</span>
            <span>{showGeekMode ? '▲' : '▼'}</span>
          </GeekToggle>

          <AnimatePresence>
            {showGeekMode && (
              <GeekContent
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GeekTitle>Para los que quieren saber cómo funciona</GeekTitle>

                <GeekText>
                  CORTEX es un sistema de gestión de conocimiento personal que integra
                  Obsidian como interfaz local y Neo4j como base de datos de grafos.
                  Todo se conecta mediante una arquitectura de agentes IA especializados.
                </GeekText>

                <GeekList>
                  <GeekItem>Obsidian para notas en Markdown</GeekItem>
                  <GeekItem>Neo4j como knowledge graph</GeekItem>
                  <GeekItem>103 herramientas MCP integradas</GeekItem>
                  <GeekItem>20 skills especializados</GeekItem>
                  <GeekItem>GraphRAG para búsquedas semánticas</GeekItem>
                  <GeekItem>Sincronización bidireccional en tiempo real</GeekItem>
                  <GeekItem>APIs privadas y encriptadas</GeekItem>
                  <GeekItem>100% local-first, tú controlas tus datos</GeekItem>
                </GeekList>

                <GeekText style={{ marginTop: theme.spacing.md }}>
                  En Academia Evolución, configuramos todo esto para ti en el Nivel 2.
                  Cero fricción técnica. Solo aprendes a usar tu superpoder.
                </GeekText>
              </GeekContent>
            )}
          </AnimatePresence>
        </GeekSection>

        <CTASection>
          <CTACard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CTATitle>¿Listo para amplificar tu mente?</CTATitle>
            <CTAText>
              CORTEX es exclusivo para estudiantes de Academia Evolución.
              Te lo configuramos completamente en el Nivel 2 de tu journey.
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
