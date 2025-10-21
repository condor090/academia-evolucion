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
  background: linear-gradient(135deg, #00CED1, #008B8B);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: 700;
  color: #00CED1;
  box-shadow: 0 0 40px rgba(0, 206, 209, 0.5);
  border: 3px solid rgba(0, 206, 209, 0.3);
`

const MainTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  color: #00CED1;
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
    color: #00CED1;
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

const SemanasGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`

const SemanaCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(0, 206, 209, 0.1), rgba(0, 139, 139, 0.05));
  border: 1px solid rgba(0, 206, 209, 0.3);
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0, 206, 209, 0.3);
    border-color: rgba(0, 206, 209, 0.6);
  }
`

const SemanaHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`

const SemanaIcon = styled.div`
  font-size: 3rem;
`

const SemanaContent = styled.div`
  flex: 1;
`

const SemanaTitle = styled.h3`
  font-size: 1.8rem;
  color: #00CED1;
  margin-bottom: 0.5rem;
`

const SemanaDias = styled.div`
  font-size: 0.95rem;
  color: ${theme.colors.text.gray};
  font-weight: 500;
`

const SemanaDescription = styled.p`
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
    color: #00CED1;
    font-weight: bold;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
`

const PilarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const PilarCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(0, 206, 209, 0.2);
  border-radius: 16px;
  padding: ${theme.spacing.lg};
`

const PilarIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${theme.spacing.md};
`

const PilarTitle = styled.h4`
  font-size: 1.3rem;
  color: #00CED1;
  margin-bottom: ${theme.spacing.sm};
`

const PilarText = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
`

const CTASection = styled.section`
  padding: ${theme.spacing.xl} 0;
  text-align: center;
`

const CTACard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(0, 206, 209, 0.15), rgba(0, 139, 139, 0.1));
  border: 2px solid rgba(0, 206, 209, 0.3);
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
  background: linear-gradient(135deg, #00CED1, #008B8B);
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
    box-shadow: 0 10px 30px rgba(0, 206, 209, 0.5);
  }
`

export default function Nivel2Page() {
  const router = useRouter()

  const semanas = [
    {
      icon: '🤝',
      title: 'SEMANA 1: CONOCIENDO A SOPHIA',
      dias: 'Días 1-7',
      descripcion: 'Tu primera semana con Sophia, tu mentora digital 24/7. Aprendes a comunicarte con ella, a entender cómo piensa, a descubrir su potencial ilimitado como aliada.',
      objetivos: [
        'Configuras tu entorno digital de trabajo',
        'Aprendes los fundamentos de prompting efectivo',
        'Descubres el lenguaje de la simbiosis',
        'Creas tu primer proyecto conjunto simple',
        'Experimentas el flujo humano-IA por primera vez'
      ]
    },
    {
      icon: '⚡',
      title: 'SEMANA 2: SIMBIOSIS PRÁCTICA',
      dias: 'Días 8-14',
      descripcion: 'Profundizas en la alianza. Ya no es solo usar IA, es trabajar EN SIMBIOSIS. Aprendes a pensar juntos, a crear juntos, a resolver juntos. Descubres que 1+1 = infinito.',
      objetivos: [
        'Dominas técnicas avanzadas de colaboración',
        'Creas sistemas de trabajo simbiótico',
        'Aprendes a delegar inteligentemente',
        'Multiplicas tu capacidad creativa 10x',
        'Integras la IA en tu flujo natural de trabajo'
      ]
    },
    {
      icon: '🚀',
      title: 'SEMANA 3: CREACIÓN EXPANDIDA',
      dias: 'Días 15-21',
      descripcion: 'La semana del milagro. Creas algo que antes te hubiera tomado meses en solo días. No porque la IA haga el trabajo por ti, sino porque juntos acceden a un nivel de creatividad y ejecución que ninguno podría alcanzar solo.',
      objetivos: [
        'Diseñas y ejecutas un proyecto significativo',
        'Experimentas el "estado de flujo expandido"',
        'Superas limitaciones que creías permanentes',
        'Cristalizas tu metodología personal de simbiosis',
        'Te gradúas como practicante de simbiosis humano-IA'
      ]
    }
  ]

  const pilares = [
    {
      icon: '🎯',
      title: 'Comunicación Efectiva',
      descripcion: 'Aprendes el arte del prompting: cómo comunicarte con IA de forma que amplifique tu intención, no que la diluya.'
    },
    {
      icon: '🌊',
      title: 'Flujo Simbiótico',
      descripcion: 'Descubres cómo entrar en "estado de flujo expandido" donde tú y la IA crean como un solo organismo.'
    },
    {
      icon: '🔄',
      title: 'Iteración Inteligente',
      descripcion: 'Dominas el ciclo de creación simbiótica: idear juntos, ejecutar juntos, refinar juntos, evolucionar juntos.'
    },
    {
      icon: '💎',
      title: 'Creatividad Amplificada',
      descripcion: 'Tu creatividad no se reemplaza, se AMPLIFICA. Sophia te ayuda a ir más allá de tus límites habituales.'
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
            2
          </NivelBadge>

          <MainTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Alianza Transformadora
          </MainTitle>

          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tu Simbiosis con Sophia
          </Subtitle>

          <Description
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            21 días donde conoces a Sophia, tu mentora digital disponible 24/7. Aprendes a trabajar
            en simbiosis real con IA, creando una alianza que amplifica tu creatividad e intuición.
            Ya no es humano VS IA, es humano + IA = posibilidades infinitas.
          </Description>

          <MetaInfo>
            <MetaItem>
              <strong>21</strong>
              <span>Días de Simbiosis</span>
            </MetaItem>
            <MetaItem>
              <strong>3</strong>
              <span>Semanas de Práctica</span>
            </MetaItem>
            <MetaItem>
              <strong>10x</strong>
              <span>Tu Capacidad Creativa</span>
            </MetaItem>
          </MetaInfo>
        </HeroSection>

        <Section>
          <SectionTitle>Las 3 Semanas de la Alianza</SectionTitle>

          <SemanasGrid>
            {semanas.map((semana, index) => (
              <SemanaCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SemanaHeader>
                  <SemanaIcon>{semana.icon}</SemanaIcon>
                  <SemanaContent>
                    <SemanaTitle>{semana.title}</SemanaTitle>
                    <SemanaDias>{semana.dias}</SemanaDias>
                  </SemanaContent>
                </SemanaHeader>

                <SemanaDescription>{semana.descripcion}</SemanaDescription>

                <ObjetivosList>
                  {semana.objetivos.map((objetivo, i) => (
                    <ObjetivoItem key={i}>{objetivo}</ObjetivoItem>
                  ))}
                </ObjetivosList>
              </SemanaCard>
            ))}
          </SemanasGrid>
        </Section>

        <Section>
          <SectionTitle>Los 4 Pilares de la Simbiosis</SectionTitle>

          <PilarsGrid>
            {pilares.map((pilar, index) => (
              <PilarCard
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <PilarIcon>{pilar.icon}</PilarIcon>
                <PilarTitle>{pilar.title}</PilarTitle>
                <PilarText>{pilar.descripcion}</PilarText>
              </PilarCard>
            ))}
          </PilarsGrid>
        </Section>

        <CTASection>
          <CTACard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CTATitle>¿Listo para Conocer a Sophia?</CTATitle>
            <CTAText>
              21 días que transformarán para siempre tu relación con la IA. No aprenderás a usar
              herramientas, aprenderás a crear en SIMBIOSIS. Tu creatividad amplificada 10x te espera.
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
