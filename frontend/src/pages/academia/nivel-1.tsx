import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import { useRouter } from 'next/router'

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${theme.colors.background.black};
  padding-top: 100px;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`

const HeroSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  text-align: center;
  position: relative;
`

const NivelBadge = styled(motion.div)`
  width: 120px;
  height: 120px;
  margin: 0 auto ${theme.spacing.lg};
  background: linear-gradient(135deg, #8A2BE2, #4B0082);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: 700;
  color: #8A2BE2;
  box-shadow: 0 0 40px rgba(138, 43, 226, 0.5);
  border: 3px solid rgba(138, 43, 226, 0.3);
`

const MainTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  color: #8A2BE2;
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: ${theme.colors.text.lightWhite};
  font-style: italic;
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.2rem;
  }
`

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: ${theme.colors.text.lightWhite};
  max-width: 800px;
  margin: 0 auto ${theme.spacing.xl};
  line-height: 1.8;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.05rem;
  }
`

const MetaInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.xl};
  margin: ${theme.spacing.xl} 0;
  flex-wrap: wrap;
`

const MetaItem = styled.div`
  text-align: center;

  strong {
    display: block;
    font-size: 2rem;
    color: #8A2BE2;
    margin-bottom: 0.5rem;
  }

  span {
    color: ${theme.colors.text.gray};
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`

const Section = styled.section`
  padding: ${theme.spacing.xl} 0;
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

const FasesGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`

const FaseCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(75, 0, 130, 0.05));
  border: 1px solid rgba(138, 43, 226, 0.3);
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(138, 43, 226, 0.3);
    border-color: rgba(138, 43, 226, 0.6);
  }
`

const FaseHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`

const FaseIcon = styled.div`
  font-size: 3rem;
`

const FaseContent = styled.div`
  flex: 1;
`

const FaseTitle = styled.h3`
  font-size: 1.8rem;
  color: #8A2BE2;
  margin-bottom: 0.5rem;
`

const FaseDias = styled.div`
  font-size: 0.95rem;
  color: ${theme.colors.text.gray};
  font-weight: 500;
`

const FaseDescription = styled.p`
  font-size: 1.05rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.7;
  margin-bottom: ${theme.spacing.md};
`

const ObjetivosList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: ${theme.spacing.sm};
`

const ObjetivoItem = styled.li`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  &::before {
    content: '✓';
    color: #8A2BE2;
    font-weight: bold;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
`

const TransformacionesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const TransformacionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(138, 43, 226, 0.2);
  border-radius: 16px;
  padding: ${theme.spacing.lg};
  text-align: center;
`

const TransformacionIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${theme.spacing.md};
`

const TransformacionTitle = styled.h4`
  font-size: 1.3rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm};
`

const TransformacionText = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
`

const CTASection = styled.section`
  padding: ${theme.spacing.xl} 0;
  text-align: center;
`

const CTACard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.15), rgba(75, 0, 130, 0.1));
  border: 2px solid rgba(138, 43, 226, 0.3);
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
  background: linear-gradient(135deg, #8A2BE2, #4B0082);
  color: ${theme.colors.text.white};
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem 3rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(138, 43, 226, 0.5);
  }
`

export default function Nivel1Page() {
  const router = useRouter()

  const fases = [
    {
      icon: '🧭',
      title: 'FASE 1: EXPLORAR',
      dias: 'Días 1-5',
      descripcion: 'Cartografía de tus corrientes mentales. Identificas los patrones de pensamiento que te arrastran sin darte cuenta, aprendes a leer las señales internas que determinan tu navegación diaria.',
      objetivos: [
        'Mapeas tus 3 corrientes mentales principales',
        'Identificas tus patrones de arrastre automático',
        'Descubres tus anclas emocionales ocultas',
        'Reconoces las mareas de tus pensamientos',
        'Creas tu primer mapa mental consciente'
      ]
    },
    {
      icon: '💫',
      title: 'FASE 2: SENTIR',
      dias: 'Días 6-10',
      descripcion: 'Inmersión en las profundidades emocionales. Te sumerges en el océano de tus emociones, aprendes a respirar bajo el agua, a no temer a las profundidades, a reconocer que tus emociones son aliadas, no enemigas.',
      objetivos: [
        'Practicas la respiración consciente bajo presión',
        'Exploras tus miedos fundamentales sin juicio',
        'Transformas la resistencia en aceptación',
        'Integras tus emociones "oscuras" como maestras',
        'Descubres la paz en el centro de la tormenta'
      ]
    },
    {
      icon: '⚡',
      title: 'FASE 3: ACTUAR',
      dias: 'Días 11-15',
      descripcion: 'Tomas el timón de tu vida. Ya no eres arrastrado por las corrientes, ahora eliges tu rumbo. Practicas pequeñas navegaciones conscientes que transforman tu relación contigo mismo y con el mundo.',
      objetivos: [
        'Tomas 1 decisión 100% consciente cada día',
        'Practicas responder en vez de reaccionar',
        'Creas tu ritual diario de reconexión',
        'Integras tus tres centros: Pensar-Sentir-Querer',
        'Cristalizas tu compromiso con tu propósito'
      ]
    }
  ]

  const transformaciones = [
    {
      icon: '🌊',
      title: 'De Reactivo a Consciente',
      descripcion: 'Dejas de ser arrastrado por tus pensamientos y emociones. Aprendes a observarlos, entenderlos, y elegir cómo responder.'
    },
    {
      icon: '💎',
      title: 'Del Miedo al Amor',
      descripcion: 'Transformas la relación con tus miedos. Dejas de huir de ellos y los integras como maestros que te revelan tu verdad.'
    },
    {
      icon: '🎯',
      title: 'De la Dispersión al Propósito',
      descripcion: 'Conectas con tu propósito más allá del ruido mental. Encuentras el hilo dorado que da sentido a tu existencia.'
    },
    {
      icon: '🔥',
      title: 'De Fragmentado a Integrado',
      descripcion: 'Unif icas tus tres centros (Pensar, Sentir, Querer) en una sola fuerza coherente. Te vuelves completo.'
    }
  ]

  return (
    <PageContainer>
      <Container>
        <HeroSection>
          <NivelBadge
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            1
          </NivelBadge>

          <MainTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Encuentro Interior
          </MainTitle>

          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Del Miedo al Amor
          </Subtitle>

          <Description
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Un viaje profundo de 15 días donde descubres quién eres realmente más allá de tus miedos.
            Te encuentras con tus tres centros: Pensar, Sentir y Querer. Dejas de ser arrastrado
            por las corrientes de tu mente y tomas el timón de tu vida.
          </Description>

          <MetaInfo>
            <MetaItem>
              <strong>15</strong>
              <span>Días de Inmersión</span>
            </MetaItem>
            <MetaItem>
              <strong>3</strong>
              <span>Fases de Transformación</span>
            </MetaItem>
            <MetaItem>
              <strong>∞</strong>
              <span>Impacto en tu Vida</span>
            </MetaItem>
          </MetaInfo>
        </HeroSection>

        <Section>
          <SectionTitle>Las 3 Fases del Encuentro</SectionTitle>

          <FasesGrid>
            {fases.map((fase, index) => (
              <FaseCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FaseHeader>
                  <FaseIcon>{fase.icon}</FaseIcon>
                  <FaseContent>
                    <FaseTitle>{fase.title}</FaseTitle>
                    <FaseDias>{fase.dias}</FaseDias>
                  </FaseContent>
                </FaseHeader>

                <FaseDescription>{fase.descripcion}</FaseDescription>

                <ObjetivosList>
                  {fase.objetivos.map((objetivo, i) => (
                    <ObjetivoItem key={i}>{objetivo}</ObjetivoItem>
                  ))}
                </ObjetivosList>
              </FaseCard>
            ))}
          </FasesGrid>
        </Section>

        <Section>
          <SectionTitle>Transformaciones que Experimentarás</SectionTitle>

          <TransformacionesGrid>
            {transformaciones.map((trans, index) => (
              <TransformacionCard
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <TransformacionIcon>{trans.icon}</TransformacionIcon>
                <TransformacionTitle>{trans.title}</TransformacionTitle>
                <TransformacionText>{trans.descripcion}</TransformacionText>
              </TransformacionCard>
            ))}
          </TransformacionesGrid>
        </Section>

        <CTASection>
          <CTACard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CTATitle>¿Listo para el Encuentro Interior?</CTATitle>
            <CTAText>
              Este es el primer paso de tu transformación. 15 días que cambiarán para siempre
              tu relación contigo mismo. El viaje comienza aquí.
            </CTAText>
            <CTAButton onClick={() => router.push('/inscripcion')}>
              Comenzar Mi Journey
            </CTAButton>
          </CTACard>
        </CTASection>
      </Container>
    </PageContainer>
  )
}
