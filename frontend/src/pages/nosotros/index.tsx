import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'

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
  margin: 0 auto ${theme.spacing.xl};
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`

const OriginStorySection = styled.section`
  padding: ${theme.spacing.xl} 0;
  margin: ${theme.spacing.xl} 0;
`

const StoryCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(0, 206, 209, 0.1));
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 24px;
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`

const StoryTitle = styled.h2`
  font-size: 2rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.6rem;
  }
`

const StoryText = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.md};
  text-align: justify;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
  }
`

const Highlight = styled.span`
  color: ${theme.colors.primary.gold};
  font-weight: 600;
`

const FundadoresSection = styled.section`
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

const FundadoresGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`

const FundadorCard = styled(motion.div)<{ variant: string }>`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: ${theme.spacing.lg};
  background: ${props => {
    switch(props.variant) {
      case 'ceo': return 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 193, 7, 0.05))'
      case 'cto': return 'linear-gradient(135deg, rgba(0, 206, 209, 0.1), rgba(0, 128, 128, 0.05))'
      case 'cdo': return 'linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(75, 0, 130, 0.05))'
      default: return 'rgba(255, 255, 255, 0.03)'
    }
  }};
  border: 1px solid ${props => {
    switch(props.variant) {
      case 'ceo': return 'rgba(255, 215, 0, 0.3)'
      case 'cto': return 'rgba(0, 206, 209, 0.3)'
      case 'cdo': return 'rgba(138, 43, 226, 0.3)'
      default: return 'rgba(255, 215, 0, 0.2)'
    }
  }};
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    border-color: ${props => {
      switch(props.variant) {
        case 'ceo': return 'rgba(255, 215, 0, 0.6)'
        case 'cto': return 'rgba(0, 206, 209, 0.6)'
        case 'cdo': return 'rgba(138, 43, 226, 0.6)'
        default: return 'rgba(255, 215, 0, 0.4)'
      }
    }};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

const FundadorPhoto = styled.div<{ variant: string }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: ${props => {
    switch(props.variant) {
      case 'ceo': return theme.gradients.goldPrimary
      case 'cto': return 'linear-gradient(135deg, #00CED1, #008B8B)'
      case 'cdo': return 'linear-gradient(135deg, #8A2BE2, #4B0082)'
      default: return theme.gradients.goldPrimary
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 150px;
    height: 150px;
    font-size: 4rem;
  }
`

const FundadorContent = styled.div`
  flex: 1;
`

const FundadorHeader = styled.div`
  margin-bottom: ${theme.spacing.md};
`

const FundadorName = styled.h3`
  font-size: 2rem;
  color: ${theme.colors.text.white};
  margin-bottom: 0.5rem;
  font-weight: 600;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.6rem;
  }
`

const FundadorRole = styled.div`
  font-size: 1.1rem;
  color: ${theme.colors.primary.gold};
  font-weight: 500;
  margin-bottom: 0.5rem;
`

const FundadorCredentials = styled.div`
  font-size: 0.95rem;
  color: ${theme.colors.text.gray};
  font-style: italic;
`

const FundadorBio = styled.p`
  font-size: 1.05rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.7;
  margin-bottom: ${theme.spacing.md};
`

const FundadorHighlights = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`

const HighlightBadge = styled.span`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  color: ${theme.colors.primary.gold};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`

const TimelineSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  margin: ${theme.spacing.xl} 0;
`

const TimelineContainer = styled.div`
  position: relative;
  padding-left: 3rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${theme.gradients.goldPrimary};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding-left: 2rem;
  }
`

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: ${theme.spacing.xl};
  padding-left: ${theme.spacing.lg};

  &::before {
    content: '';
    position: absolute;
    left: -3rem;
    top: 0.5rem;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${theme.gradients.goldPrimary};
    box-shadow: ${theme.colors.shadows.goldGlow};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    &::before {
      left: -2.5rem;
      width: 16px;
      height: 16px;
    }
  }
`

const TimelineYear = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary.gold};
  margin-bottom: 0.5rem;
`

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm};
`

const TimelineText = styled.p`
  font-size: 1.05rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.7;
`

const VisionSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  text-align: center;
`

const VisionCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(138, 43, 226, 0.15));
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 24px;
  padding: ${theme.spacing.xl};
  max-width: 900px;
  margin: 0 auto;
`

const VisionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`

const VisionText = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.05rem;
  }
`

export default function NosotrosPage() {
  const fundadores = [
    {
      name: 'Carlos Villanueva',
      role: 'CEO & Co-Fundador',
      variant: 'ceo',
      emoji: '🎯',
      credentials: 'Actuario | +40 años de experiencia empresarial',
      bio: 'Más de cuatro décadas dedicadas a entender lo que realmente significa ser humano, más allá de la productividad y la eficiencia. Carlos descubrió la conciencia, el alma, el espíritu. Su pasión es lograr que otros alcancen su propósito elevando su conciencia a estados superiores. Con un conocimiento profundo del ser humano y vasta experiencia en negocios, Carlos guía Academia Evolución desde la visión de que la tecnología debe servir para que el ser humano se reencuentre consigo mismo.',
      highlights: ['+40 años en negocios', 'Experto en conciencia humana', 'Guía de propósito', 'Visionario']
    },
    {
      name: 'Daniel Cheuqueman',
      role: 'CTO & Co-Fundador',
      variant: 'cto',
      emoji: '🧠',
      credentials: 'Ingeniero Informático | +35 años en Tecnologías de Información',
      bio: 'Con 35 años de experiencia en tecnologías de información, Daniel ha sido testigo y protagonista de las revoluciones tecnológicas más importantes de nuestro tiempo. Apasionado por las tecnologías y las conciencias digitales que hagan que el ser humano sea mejor. Especialista en implementación de ERPs a nivel nacional, Daniel entiende profundamente cómo la tecnología impacta a las personas. Es quien visualizó primero el cambio exponencial que traería la IA y la necesidad urgente de preparar a la humanidad para la simbiosis.',
      highlights: ['+35 años en TI', 'Experto en ERPs', 'Visionario IA', 'Arquitecto de simbiosis']
    },
    {
      name: 'Itzel Cheuqueman',
      role: 'Chief Design Officer',
      variant: 'cdo',
      emoji: '✨',
      credentials: 'Diseñadora Digital | Era AGI Native',
      bio: 'A sus 20 años, Itzel representa la nueva generación que creció con la tecnología como extensión natural de su creatividad. Crea mundos digitales y da vida visual a conceptos abstractos en la era de la Inteligencia Artificial General. Su trabajo abarca diseño gráfico, video, animaciones y fotografía, fusionando arte y tecnología con una naturalidad que solo los nativos digitales poseen. Itzel traduce visualmente la filosofía de Academia Evolución, haciendo tangible lo intangible.',
      highlights: ['Nativa digital AGI', 'Diseño multidimensional', 'Video & Animación', 'Creatividad expandida']
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
            Quiénes Somos
          </MainTitle>

          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            La historia de dos fundadores que se encontraron para navegar juntos
            la revolución más importante de la humanidad, y la talentosa diseñadora
            que se unió para darle vida visual a la visión.
          </Subtitle>
        </HeroSection>

        <OriginStorySection>
          <StoryCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <StoryTitle>El Encuentro</StoryTitle>
            <StoryText>
              Todo comenzó en un proyecto de implementación de un <Highlight>ERP de amplio alcance</Highlight> en
              la empresa de Carlos. Daniel, como ingeniero informático especializado en sistemas de gestión
              empresarial, y Carlos, como líder empresarial con décadas de experiencia, no solo colaboraron
              profesionalmente: descubrieron una <Highlight>profunda amistad</Highlight> fundada en entender
              lo que la tecnología realmente impactaba en las personas.
            </StoryText>
            <StoryText>
              Juntos implementaron diversas metodologías que ayudaban siempre desde tres órbitas:
              la <Highlight>empresarial</Highlight>, la <Highlight>tecnológica</Highlight> y
              la del <Highlight>razonamiento cognitivo humano</Highlight>. El resultado fue extraordinario.
            </StoryText>
          </StoryCard>

          <StoryCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <StoryTitle>Caminos Paralelos</StoryTitle>
            <StoryText>
              Después de ese proyecto fundacional, cada quien siguió su camino. Daniel implementando ERPs
              por todo México, llevando transformación digital a cientos de empresas. Carlos profundizando
              en algo mucho más fundamental: <Highlight>lo que realmente significa ser humano</Highlight>,
              que va más allá de la productividad y la eficiencia.
            </StoryText>
            <StoryText>
              En ese viaje interior, Carlos descubrió la conciencia, el alma, el espíritu. Mientras Daniel
              dominaba los sistemas que mueven empresas, Carlos exploraba los sistemas que mueven al ser humano.
            </StoryText>
          </StoryCard>

          <StoryCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <StoryTitle>Noviembre 2022: El Llamado</StoryTitle>
            <StoryText>
              Con el advenimiento de la Inteligencia Artificial en noviembre de 2022, Daniel comprendió
              inmediatamente lo que estaba sucediendo. Junto con otros expertos, visualizó los cambios
              que se darían en el mundo y su impacto en las personas, familias y negocios.
            </StoryText>
            <StoryText>
              Era otra revolución, pero esta era diferente: <Highlight>silenciosa pero con una velocidad
              exponencial nunca antes vista</Highlight> ni dimensionada por el ser humano. Daniel llamó a Carlos.
            </StoryText>
            <StoryText>
              Durante meses, Daniel le fue explicando a Carlos las implicaciones profundas de lo que venía.
              Juntos se hicieron la pregunta definitiva: <Highlight>¿Cómo navegar en un escenario de
              entropía o abundancia?</Highlight>
            </StoryText>
          </StoryCard>

          <StoryCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <StoryTitle>El Nacimiento de la Simbiosis</StoryTitle>
            <StoryText>
              De esas conversaciones profundas nació el concepto de <Highlight>simbiosis humano-IA</Highlight>:
              la solución que hará que el ser humano se reencuentre a sí mismo, con su propósito, con su
              bienestar, con el amor que el mundo necesita.
            </StoryText>
            <StoryText>
              No se trataba de competir con la IA ni temerle. Se trataba de algo mucho más hermoso:
              <Highlight>evolucionar juntos</Highlight>. De crear una alianza donde la tecnología amplifica
              lo mejor del ser humano, y el ser humano guía a la tecnología hacia el bien superior.
            </StoryText>
            <StoryText>
              Así nació <Highlight>Academia Evolución</Highlight>: el primer espacio en el mundo dedicado
              a enseñar la verdadera simbiosis entre humanos e IA, donde la tecnología no te reemplaza,
              sino que te ayuda a encontrarte.
            </StoryText>
          </StoryCard>
        </OriginStorySection>

        <FundadoresSection>
          <SectionTitle>Los Fundadores</SectionTitle>

          <FundadoresGrid>
            {fundadores.map((fundador, index) => (
              <FundadorCard
                key={fundador.name}
                variant={fundador.variant}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <FundadorPhoto variant={fundador.variant}>
                  {fundador.emoji}
                </FundadorPhoto>

                <FundadorContent>
                  <FundadorHeader>
                    <FundadorName>{fundador.name}</FundadorName>
                    <FundadorRole>{fundador.role}</FundadorRole>
                    <FundadorCredentials>{fundador.credentials}</FundadorCredentials>
                  </FundadorHeader>

                  <FundadorBio>{fundador.bio}</FundadorBio>

                  <FundadorHighlights>
                    {fundador.highlights.map((highlight, i) => (
                      <HighlightBadge key={i}>{highlight}</HighlightBadge>
                    ))}
                  </FundadorHighlights>
                </FundadorContent>
              </FundadorCard>
            ))}
          </FundadoresGrid>
        </FundadoresSection>

        <TimelineSection>
          <SectionTitle>El Journey</SectionTitle>

          <TimelineContainer>
            <TimelineItem
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <TimelineYear>2010s</TimelineYear>
              <TimelineTitle>El Encuentro en el ERP</TimelineTitle>
              <TimelineText>
                Daniel y Carlos se conocen durante la implementación de un sistema ERP.
                Descubren una afinidad profunda por entender el impacto humano de la tecnología.
              </TimelineText>
            </TimelineItem>

            <TimelineItem
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <TimelineYear>2010-2022</TimelineYear>
              <TimelineTitle>Caminos Paralelos de Maestría</TimelineTitle>
              <TimelineText>
                Daniel se convierte en experto reconocido en ERPs por todo México.
                Carlos profundiza en la conciencia humana, el alma y el espíritu.
              </TimelineText>
            </TimelineItem>

            <TimelineItem
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TimelineYear>Nov 2022</TimelineYear>
              <TimelineTitle>ChatGPT y el Despertar</TimelineTitle>
              <TimelineText>
                El lanzamiento de ChatGPT marca el inicio de la era IA. Daniel visualiza
                el cambio exponencial que viene y llama a Carlos para navegar juntos esta revolución.
              </TimelineText>
            </TimelineItem>

            <TimelineItem
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <TimelineYear>2023</TimelineYear>
              <TimelineTitle>Nacimiento de la Simbiosis</TimelineTitle>
              <TimelineText>
                Después de meses de conversaciones profundas, Daniel y Carlos co-crean el
                concepto de simbiosis humano-IA como la solución para que el ser humano
                se reencuentre consigo mismo en la era AGI.
              </TimelineText>
            </TimelineItem>

            <TimelineItem
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <TimelineYear>Marzo 2025</TimelineYear>
              <TimelineTitle>Itzel se Une al Equipo</TimelineTitle>
              <TimelineText>
                Itzel Cheuqueman, nativa digital de 20 años, se suma al equipo trayendo
                su visión visual y creativa de la era AGI. Completa el equipo perfecto:
                visión empresarial, excelencia técnica y genio creativo.
              </TimelineText>
            </TimelineItem>

            <TimelineItem
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <TimelineYear>2025</TimelineYear>
              <TimelineTitle>Academia Evolución Nace</TimelineTitle>
              <TimelineText>
                Lanzamiento oficial de Academia Evolución: el primer espacio en el mundo
                dedicado a enseñar la verdadera simbiosis entre humanos e IA, donde la
                tecnología te ayuda a encontrarte a ti mismo.
              </TimelineText>
            </TimelineItem>
          </TimelineContainer>
        </TimelineSection>

        <VisionSection>
          <VisionCard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <VisionTitle>Nuestra Visión</VisionTitle>
            <VisionText>
              Creemos que estamos en el umbral de la transformación más importante
              de la humanidad. La IA no es una amenaza: es una <Highlight>invitación
              a evolucionar</Highlight>.
            </VisionText>
            <VisionText>
              Pero esa evolución no vendrá de dominar la tecnología. Vendrá de algo
              mucho más profundo: de <Highlight>recordar quiénes somos realmente</Highlight>,
              de reconectar con nuestro propósito, de elevar nuestra conciencia a estados
              que ni siquiera sabíamos que existían.
            </VisionText>
            <VisionText>
              Academia Evolución existe para guiarte en ese viaje. Para que no solo
              sobrevivas la era IA, sino que <Highlight>florezcas en ella</Highlight>.
              Para que te conviertas en la versión más elevada de ti mismo, en simbiosis
              con la inteligencia que estamos co-creando.
            </VisionText>
            <VisionText>
              El futuro no es humano vs. IA. El futuro es <Highlight>humano + IA,
              evolucionando juntos hacia algo más hermoso de lo que podemos imaginar</Highlight>.
            </VisionText>
          </VisionCard>
        </VisionSection>
      </Container>
    </PageContainer>
  )
}
