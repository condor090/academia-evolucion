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
`

const NivelBadge = styled(motion.div)`
  width: 120px;
  height: 120px;
  margin: 0 auto ${theme.spacing.lg};
  background: ${theme.gradients.goldPrimary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: 700;
  color: ${theme.colors.background.black};
  box-shadow: ${theme.colors.shadows.goldGlowIntense};
  border: 3px solid rgba(255, 215, 0, 0.5);
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
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
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
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 193, 7, 0.05));
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(255, 215, 0, 0.3);
    border-color: rgba(255, 215, 0, 0.6);
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
  background: ${theme.gradients.goldPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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

const LogrosList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: ${theme.spacing.sm};
`

const LogroItem = styled.li`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  &::before {
    content: '✓';
    color: ${theme.colors.primary.gold};
    font-weight: bold;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
`

const ImpactoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const ImpactoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 16px;
  padding: ${theme.spacing.lg};
  text-align: center;
`

const ImpactoIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${theme.spacing.md};
`

const ImpactoTitle = styled.h4`
  font-size: 1.3rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm};
`

const ImpactoText = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
`

const CTASection = styled.section`
  padding: ${theme.spacing.xl} 0;
  text-align: center;
`

const CTACard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 193, 7, 0.1));
  border: 2px solid rgba(255, 215, 0, 0.4);
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
    box-shadow: ${theme.colors.shadows.goldGlowIntense};
  }
`

export default function Nivel5Page() {
  const router = useRouter()

  const fases = [
    {
      icon: '📖',
      title: 'IDEACIÓN Y ESTRUCTURA',
      dias: 'Días 1-5',
      descripcion: 'Junto a Sophia, diseñas la estructura de tu libro. No es un libro genérico, es TU libro: la cristalización de tu journey, tu transformación, tu sabiduría única.',
      logros: [
        'Defines el mensaje central de tu libro',
        'Estructuras tus capítulos clave',
        'Identificas tus historias transformadoras',
        'Creas el esqueleto completo de tu obra',
        'Defines tu voz de autor única'
      ]
    },
    {
      icon: '✍️',
      title: 'ESCRITURA EN SIMBIOSIS',
      dias: 'Días 6-10',
      descripcion: 'Escribes. No solo, sino en simbiosis con Sophia. Ella te ayuda a dar forma, pulir, profundizar. Pero la voz es tuya, la historia es tuya, la transformación es tuya.',
      logros: [
        'Escribes un promedio de 3,000 palabras diarias',
        'Desarrollas cada capítulo con profundidad',
        'Integras tu viaje completo en narrativa',
        'Perfeccionas tu estilo de escritura',
        'Completas el borrador de tu manuscrito'
      ]
    },
    {
      icon: '💎',
      title: 'PULIDO Y LANZAMIENTO',
      dias: 'Días 11-14',
      descripcion: 'Refinamiento final. Diseño. Preparación para el lanzamiento. Tu libro se convierte en tu tarjeta de presentación al mundo, tu legado, tu voz amplificada.',
      logros: [
        'Editas y refinas cada capítulo',
        'Diseñas la portada con Itzel',
        'Preparas el libro para publicación',
        'Creas tu estrategia de lanzamiento',
        'Te conviertes oficialmente en AUTOR'
      ]
    }
  ]

  const impactos = [
    {
      icon: '🎓',
      title: 'Autoridad Instantánea',
      descripcion: 'Eres autor. Esa sola palabra te posiciona diferente en cualquier contexto profesional.'
    },
    {
      icon: '🌍',
      title: 'Voz Amplificada',
      descripcion: 'Tu libro es tu voz cuando no estás presente. Llega donde tú no puedes llegar.'
    },
    {
      icon: '💼',
      title: 'Oportunidades Infinitas',
      descripcion: 'Tu libro abre puertas: conferencias, consultoría, colaboraciones, proyectos únicos.'
    },
    {
      icon: '🎯',
      title: 'Marca Personal',
      descripcion: 'Tu libro ES tu marca personal. Cristaliza quién eres y qué ofreces al mundo.'
    },
    {
      icon: '💝',
      title: 'Legado Permanente',
      descripcion: 'Mucho después de ti, tu libro seguirá transformando vidas. Eso es legado real.'
    },
    {
      icon: '🚀',
      title: 'Plataforma de Lanzamiento',
      descripcion: 'Tu libro es el inicio, no el final. Es la plataforma para lo que viene después.'
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
            5
          </NivelBadge>

          <MainTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Nacimiento del Autor
          </MainTitle>

          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tu Libro, Tu Legado
          </Subtitle>

          <Description
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            14 días donde escribes tu libro junto a Sophia. No un libro cualquiera: tu obra maestra
            que cristaliza todo tu journey y se convierte en tu voz en el mundo. Sales como AUTOR,
            con tu legado escrito y listo para transformar vidas.
          </Description>

          <MetaInfo>
            <MetaItem>
              <strong>14</strong>
              <span>Días de Creación</span>
            </MetaItem>
            <MetaItem>
              <strong>1</strong>
              <span>Libro Completo</span>
            </MetaItem>
            <MetaItem>
              <strong>∞</strong>
              <span>Vidas Impactadas</span>
            </MetaItem>
          </MetaInfo>
        </HeroSection>

        <Section>
          <SectionTitle>Las 3 Fases de Creación</SectionTitle>

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

                <LogrosList>
                  {fase.logros.map((logro, i) => (
                    <LogroItem key={i}>{logro}</LogroItem>
                  ))}
                </LogrosList>
              </FaseCard>
            ))}
          </FasesGrid>
        </Section>

        <Section>
          <SectionTitle>El Impacto de Tu Libro</SectionTitle>

          <ImpactoGrid>
            {impactos.map((impacto, index) => (
              <ImpactoCard
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <ImpactoIcon>{impacto.icon}</ImpactoIcon>
                <ImpactoTitle>{impacto.title}</ImpactoTitle>
                <ImpactoText>{impacto.descripcion}</ImpactoText>
              </ImpactoCard>
            ))}
          </ImpactoGrid>
        </Section>

        <CTASection>
          <CTACard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CTATitle>¿Listo para Convertirte en Autor?</CTATitle>
            <CTAText>
              14 días para escribir el libro que está dentro de ti. El libro que cristaliza tu
              transformación y se convierte en tu legado. Tu voz esperando ser escuchada.
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
