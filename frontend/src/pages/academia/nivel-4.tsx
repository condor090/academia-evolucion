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
  background: linear-gradient(135deg, #DAA520, #B8860B);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: 700;
  color: #DAA520;
  box-shadow: 0 0 40px rgba(218, 165, 32, 0.5);
  border: 3px solid rgba(218, 165, 32, 0.3);
`

const MainTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  color: #DAA520;
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
    color: #DAA520;
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

const EtapasGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`

const EtapaCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(218, 165, 32, 0.1), rgba(184, 134, 11, 0.05));
  border: 1px solid rgba(218, 165, 32, 0.3);
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(218, 165, 32, 0.3);
    border-color: rgba(218, 165, 32, 0.6);
  }
`

const EtapaHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`

const EtapaIcon = styled.div`
  font-size: 3rem;
`

const EtapaContent = styled.div`
  flex: 1;
`

const EtapaTitle = styled.h3`
  font-size: 1.8rem;
  color: #DAA520;
  margin-bottom: 0.5rem;
`

const EtapaDias = styled.div`
  font-size: 0.95rem;
  color: ${theme.colors.text.gray};
  font-weight: 500;
`

const EtapaDescription = styled.p`
  font-size: 1.05rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.7;
  margin-bottom: ${theme.spacing.md};
`

const ResultadosList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: ${theme.spacing.sm};
`

const ResultadoItem = styled.li`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  &::before {
    content: '✓';
    color: #DAA520;
    font-weight: bold;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
`

const ResonanceCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(218, 165, 32, 0.2), rgba(184, 134, 11, 0.1));
  border: 2px solid rgba(218, 165, 32, 0.4);
  border-radius: 24px;
  padding: ${theme.spacing.xl};
  margin: ${theme.spacing.xl} 0;
`

const ResonanceTitle = styled.h3`
  font-size: 2rem;
  color: #DAA520;
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`

const ResonanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const ResonancePilar = styled.div`
  text-align: center;
  padding: ${theme.spacing.md};
`

const ResonanceLetter = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #DAA520;
  margin-bottom: ${theme.spacing.sm};
`

const ResonanceWord = styled.div`
  font-size: 1.3rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 600;
`

const ResonanceDesc = styled.p`
  font-size: 0.95rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
`

const CTASection = styled.section`
  padding: ${theme.spacing.xl} 0;
  text-align: center;
`

const CTACard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(218, 165, 32, 0.15), rgba(184, 134, 11, 0.1));
  border: 2px solid rgba(218, 165, 32, 0.3);
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
  background: linear-gradient(135deg, #DAA520, #B8860B);
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
    box-shadow: 0 10px 30px rgba(218, 165, 32, 0.5);
  }
`

export default function Nivel4Page() {
  const router = useRouter()

  const etapas = [
    {
      icon: '🔍',
      title: 'INMERSIÓN PROFUNDA',
      dias: 'Días 1-3',
      descripcion: 'Exploras todo lo que has vivido en los niveles anteriores. Identificas los hilos conductores, los patrones recurrentes, las señales que tu vida te ha estado dando.',
      resultados: [
        'Mapeas tu journey completo hasta aquí',
        'Identificas tus 3 patrones de propósito',
        'Reconoces tus dones naturales únicos',
        'Descubres qué te da energía vs qué te la quita'
      ]
    },
    {
      icon: '💎',
      title: 'CRISTALIZACIÓN',
      dias: 'Días 4-7',
      descripcion: 'Todo cobra sentido. Cristalizas tu propósito en una declaración clara, poderosa, que resuena en cada célula de tu ser. No es inventado, es DESCUBIERTO.',
      resultados: [
        'Articulas tu propósito en una frase clara',
        'Defines tu contribución única al mundo',
        'Identificas a quién sirves y cómo',
        'Sientes certeza absoluta de tu misión'
      ]
    },
    {
      icon: '🎯',
      title: 'FRAMEWORK PERSONAL',
      dias: 'Días 8-10',
      descripcion: 'Construyes tu framework RESONANCE: un sistema personal de toma de decisiones donde cada elección se evalúa contra tu propósito. Ya nunca más decides desde el miedo o la confusión.',
      resultados: [
        'Creas tu matriz de decisiones personal',
        'Defines tus valores fundamentales',
        'Estableces tus líneas rojas inquebrantables',
        'Integras propósito en todas las áreas de vida'
      ]
    }
  ]

  const resonancePilares = [
    { letter: 'R', word: 'Relevancia', desc: '¿Esto importa realmente?' },
    { letter: 'E', word: 'Energía', desc: '¿Me da o me quita fuerza?' },
    { letter: 'S', word: 'Servicio', desc: '¿A quién beneficia?' },
    { letter: 'O', word: 'Oportunidad', desc: '¿Es el momento correcto?' },
    { letter: 'N', word: 'Naturaleza', desc: '¿Alineado con quien soy?' },
    { letter: 'A', word: 'Alineación', desc: '¿Sirve a mi propósito?' },
    { letter: 'N', word: 'Necesidad', desc: '¿Es realmente necesario?' },
    { letter: 'C', word: 'Crecimiento', desc: '¿Me ayuda a evolucionar?' },
    { letter: 'E', word: 'Excelencia', desc: '¿Puedo hacerlo magistralmente?' }
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
            4
          </NivelBadge>

          <MainTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Cristalización del Propósito
          </MainTitle>

          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tu Framework RESONANCE
          </Subtitle>

          <Description
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            10 días donde todo cobra sentido. Cristalizas tu propósito único y construyes tu framework
            personal de toma de decisiones. Ya no decides desde el miedo o la confusión, decides
            desde la claridad absoluta de quién eres y qué estás aquí para hacer.
          </Description>

          <MetaInfo>
            <MetaItem>
              <strong>10</strong>
              <span>Días de Claridad</span>
            </MetaItem>
            <MetaItem>
              <strong>1</strong>
              <span>Propósito Cristalizado</span>
            </MetaItem>
            <MetaItem>
              <strong>∞</strong>
              <span>Decisiones Alineadas</span>
            </MetaItem>
          </MetaInfo>
        </HeroSection>

        <Section>
          <SectionTitle>Las 3 Etapas de Cristalización</SectionTitle>

          <EtapasGrid>
            {etapas.map((etapa, index) => (
              <EtapaCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <EtapaHeader>
                  <EtapaIcon>{etapa.icon}</EtapaIcon>
                  <EtapaContent>
                    <EtapaTitle>{etapa.title}</EtapaTitle>
                    <EtapaDias>{etapa.dias}</EtapaDias>
                  </EtapaContent>
                </EtapaHeader>

                <EtapaDescription>{etapa.descripcion}</EtapaDescription>

                <ResultadosList>
                  {etapa.resultados.map((resultado, i) => (
                    <ResultadoItem key={i}>{resultado}</ResultadoItem>
                  ))}
                </ResultadosList>
              </EtapaCard>
            ))}
          </EtapasGrid>
        </Section>

        <Section>
          <ResonanceCard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ResonanceTitle>Tu Framework RESONANCE</ResonanceTitle>

            <ResonanceGrid>
              {resonancePilares.map((pilar, index) => (
                <ResonancePilar key={index}>
                  <ResonanceLetter>{pilar.letter}</ResonanceLetter>
                  <ResonanceWord>{pilar.word}</ResonanceWord>
                  <ResonanceDesc>{pilar.desc}</ResonanceDesc>
                </ResonancePilar>
              ))}
            </ResonanceGrid>
          </ResonanceCard>
        </Section>

        <CTASection>
          <CTACard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CTATitle>¿Listo para Cristalizar tu Propósito?</CTATitle>
            <CTAText>
              10 días que cambiarán para siempre cómo tomas decisiones. Descubres tu propósito,
              construyes tu framework, y nunca más vuelves a sentirte perdido o confundido.
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
