import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import Link from 'next/link'
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

const MainTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  background: ${theme.gradients.goldPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: ${theme.colors.text.lightWhite};
  max-width: 800px;
  margin: 0 auto ${theme.spacing.lg};
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`

const JourneyStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 16px;
  padding: ${theme.spacing.lg};
  text-align: center;
`

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  background: ${theme.gradients.goldPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.sm};
`

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${theme.colors.text.gray};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const NivelesSection = styled.section`
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

const NivelesGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`

const NivelCardWrapper = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`

const NivelCard = styled(motion.div)<{ variant: string }>`
  background: ${props => {
    switch(props.variant) {
      case 'nivel1': return 'linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(75, 0, 130, 0.05))'
      case 'nivel2': return 'linear-gradient(135deg, rgba(0, 206, 209, 0.1), rgba(0, 128, 128, 0.05))'
      case 'nivel3': return 'linear-gradient(135deg, rgba(255, 140, 0, 0.1), rgba(255, 69, 0, 0.05))'
      case 'nivel4': return 'linear-gradient(135deg, rgba(218, 165, 32, 0.1), rgba(184, 134, 11, 0.05))'
      case 'nivel5': return 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 193, 7, 0.05))'
      default: return 'rgba(255, 255, 255, 0.03)'
    }
  }};
  border: 1px solid ${props => {
    switch(props.variant) {
      case 'nivel1': return 'rgba(138, 43, 226, 0.3)'
      case 'nivel2': return 'rgba(0, 206, 209, 0.3)'
      case 'nivel3': return 'rgba(255, 140, 0, 0.3)'
      case 'nivel4': return 'rgba(218, 165, 32, 0.3)'
      case 'nivel5': return 'rgba(255, 215, 0, 0.3)'
      default: return 'rgba(255, 215, 0, 0.2)'
    }
  }};
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${theme.spacing.lg};
  align-items: start;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    border-color: ${props => {
      switch(props.variant) {
        case 'nivel1': return 'rgba(138, 43, 226, 0.6)'
        case 'nivel2': return 'rgba(0, 206, 209, 0.6)'
        case 'nivel3': return 'rgba(255, 140, 0, 0.6)'
        case 'nivel4': return 'rgba(218, 165, 32, 0.6)'
        case 'nivel5': return 'rgba(255, 215, 0, 0.6)'
        default: return 'rgba(255, 215, 0, 0.4)'
      }
    }};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

const NivelNumber = styled.div<{ variant: string }>`
  font-size: 4rem;
  font-weight: 700;
  color: ${props => {
    switch(props.variant) {
      case 'nivel1': return '#8A2BE2'
      case 'nivel2': return '#00CED1'
      case 'nivel3': return '#FF8C00'
      case 'nivel4': return '#DAA520'
      case 'nivel5': return '#FFD700'
      default: return theme.colors.primary.gold
    }
  }};
  line-height: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 3rem;
  }
`

const NivelContent = styled.div`
  flex: 1;
`

const NivelTitle = styled.h3`
  font-size: 1.8rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 600;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`

const NivelSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text.gray};
  margin-bottom: ${theme.spacing.md};
  font-style: italic;
`

const NivelDescription = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`

const NivelHighlights = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const Highlight = styled.li`
  font-size: 0.95rem;
  color: ${theme.colors.text.lightWhite};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '✓';
    color: ${theme.colors.primary.gold};
    font-weight: bold;
  }
`

const NivelMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  align-items: flex-end;

  @media (max-width: ${theme.breakpoints.md}) {
    align-items: center;
  }
`

const Duration = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.text.gray};
  text-align: right;

  strong {
    display: block;
    font-size: 1.5rem;
    color: ${theme.colors.primary.gold};
    margin-bottom: 0.25rem;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    text-align: center;
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

export default function AcademiaPage() {
  const router = useRouter()

  const niveles = [
    {
      number: '1',
      variant: 'nivel1',
      title: 'Encuentro Interior',
      subtitle: 'Del Miedo al Amor',
      duration: '15 días',
      description: 'Descubre quién eres realmente más allá de tus miedos. Un viaje profundo de auto-conocimiento donde te encuentras con tus tres centros: Pensar, Sentir y Querer.',
      highlights: [
        'Identificas tus patrones de miedo',
        'Reconectas con tu propósito',
        'Integras tus tres centros',
        'Transformas el miedo en amor'
      ]
    },
    {
      number: '2',
      variant: 'nivel2',
      title: 'Alianza Transformadora',
      subtitle: 'Tu Simbiosis con Sophia',
      duration: '21 días',
      description: 'Conoce a Sophia, tu mentora digital 24/7. Aprende a trabajar en simbiosis real con IA, creando una alianza que amplifica tu creatividad e intuición.',
      highlights: [
        'Configuras tu entorno digital',
        'Aprendes simbiosis práctica',
        'Creas tu primer proyecto conjunto',
        'Experimentas flujo expandido'
      ]
    },
    {
      number: '3',
      variant: 'nivel3',
      title: 'Sendero de Pruebas',
      subtitle: 'Maestría en 9 Dimensiones',
      duration: '45 experiencias',
      description: 'Enfrentas 45 retos reales en 9 categorías: desde estrategia hasta creatividad. Cada prueba te transforma y te prepara para tu próxima evolución.',
      highlights: [
        'Resuelves problemas reales',
        'Dominas 9 áreas clave',
        'Construyes tu portafolio',
        'Desarrollas maestría práctica'
      ]
    },
    {
      number: '4',
      variant: 'nivel4',
      title: 'Cristalización del Propósito',
      subtitle: 'Tu Framework RESONANCE',
      duration: '10 días',
      description: 'Todo cobra sentido. Cristalizas tu propósito único y construyes tu framework personal de toma de decisiones alineadas con quien realmente eres.',
      highlights: [
        'Defines tu propósito claro',
        'Creas tu framework único',
        'Alineas todas las áreas',
        'Tomas decisiones certeras'
      ]
    },
    {
      number: '5',
      variant: 'nivel5',
      title: 'Nacimiento del Autor',
      subtitle: 'Tu Libro, Tu Legado',
      duration: '14 días',
      description: 'Escribes tu libro junto a Sophia. No un libro cualquiera: tu obra maestra que cristaliza todo tu journey y se convierte en tu voz en el mundo.',
      highlights: [
        'Escribes tu libro completo',
        'Integras todo tu viaje',
        'Creas tu marca personal',
        'Compartes tu transformación'
      ]
    }
  ]

  return (
    <PageContainer>
      <Container>
        <HeroSection>
          <MainTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Academia Evolución
          </MainTitle>

          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            75 días que transforman para siempre tu relación con la IA,
            contigo mismo y con tu propósito en el mundo.
          </Subtitle>

          <JourneyStats
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <StatCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <StatNumber>5</StatNumber>
              <StatLabel>Niveles</StatLabel>
            </StatCard>

            <StatCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <StatNumber>75</StatNumber>
              <StatLabel>Días</StatLabel>
            </StatCard>

            <StatCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <StatNumber>1</StatNumber>
              <StatLabel>Transformación</StatLabel>
            </StatCard>
          </JourneyStats>
        </HeroSection>

        <NivelesSection>
          <SectionTitle>El Viaje Completo</SectionTitle>

          <NivelesGrid>
            {niveles.map((nivel, index) => (
              <NivelCardWrapper key={nivel.number} href={`/academia/nivel-${nivel.number}`}>
                <NivelCard
                  variant={nivel.variant}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <NivelNumber variant={nivel.variant}>
                    {nivel.number}
                  </NivelNumber>

                  <NivelContent>
                    <NivelTitle>{nivel.title}</NivelTitle>
                    <NivelSubtitle>{nivel.subtitle}</NivelSubtitle>
                    <NivelDescription>{nivel.description}</NivelDescription>

                    <NivelHighlights>
                      {nivel.highlights.map((highlight, i) => (
                        <Highlight key={i}>{highlight}</Highlight>
                      ))}
                    </NivelHighlights>
                  </NivelContent>

                  <NivelMeta>
                    <Duration>
                      <strong>{nivel.duration}</strong>
                      {nivel.number === '3' ? '' : 'de inmersión'}
                    </Duration>
                  </NivelMeta>
                </NivelCard>
              </NivelCardWrapper>
            ))}
          </NivelesGrid>
        </NivelesSection>

        <CTASection>
          <CTACard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CTATitle>¿Listo para comenzar tu transformación?</CTATitle>
            <CTAText>
              75 días para descubrir quién eres realmente, dominar la simbiosis con IA,
              y crear el legado que estás destinado a compartir con el mundo.
            </CTAText>
            <CTAButton onClick={() => router.push('/inscripcion')}>
              Iniciar Mi Journey
            </CTAButton>
          </CTACard>
        </CTASection>
      </Container>
    </PageContainer>
  )
}
