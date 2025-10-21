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
  background: linear-gradient(135deg, #FF8C00, #FF4500);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: 700;
  color: #FF8C00;
  box-shadow: 0 0 40px rgba(255, 140, 0, 0.5);
  border: 3px solid rgba(255, 140, 0, 0.3);
`

const MainTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  color: #FF8C00;
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
    color: #FF8C00;
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

const CategoriasGrid = styled.div`
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

const CategoriaCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.1), rgba(255, 69, 0, 0.05));
  border: 1px solid rgba(255, 140, 0, 0.3);
  border-radius: 16px;
  padding: ${theme.spacing.lg};
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(255, 140, 0, 0.3);
    border-color: rgba(255, 140, 0, 0.6);
  }
`

const CategoriaIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.md};
`

const CategoriaTitle = styled.h3`
  font-size: 1.3rem;
  color: #FF8C00;
  margin-bottom: ${theme.spacing.sm};
`

const CategoriaRetos = styled.div`
  font-size: 0.95rem;
  color: ${theme.colors.text.gray};
  margin-bottom: ${theme.spacing.sm};
`

const CategoriaDescription = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
`

const BeneficiosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const BeneficioCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 140, 0, 0.2);
  border-radius: 16px;
  padding: ${theme.spacing.lg};
`

const BeneficioTitle = styled.h4`
  font-size: 1.3rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &::before {
    content: '✓';
    color: #FF8C00;
    font-size: 1.5rem;
    font-weight: bold;
  }
`

const BeneficioText = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
`

const CTASection = styled.section`
  padding: ${theme.spacing.xl} 0;
  text-align: center;
`

const CTACard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.15), rgba(255, 69, 0, 0.1));
  border: 2px solid rgba(255, 140, 0, 0.3);
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
  background: linear-gradient(135deg, #FF8C00, #FF4500);
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
    box-shadow: 0 10px 30px rgba(255, 140, 0, 0.5);
  }
`

export default function Nivel3Page() {
  const router = useRouter()

  const categorias = [
    {
      icon: '🎯',
      title: 'Estrategia',
      retos: '5 retos',
      descripcion: 'Problemas de pensamiento estratégico, visión a largo plazo, toma de decisiones complejas.'
    },
    {
      icon: '💡',
      title: 'Creatividad',
      retos: '5 retos',
      descripcion: 'Desafíos creativos que expanden tu capacidad de innovar, idear y crear soluciones originales.'
    },
    {
      icon: '📊',
      title: 'Analítica',
      retos: '5 retos',
      descripcion: 'Retos de análisis de datos, interpretación, identificación de patrones y insights.'
    },
    {
      icon: '🔧',
      title: 'Ejecución',
      retos: '5 retos',
      descripcion: 'Problemas reales de implementación, productividad y hacer que las cosas sucedan.'
    },
    {
      icon: '🤝',
      title: 'Comunicación',
      retos: '5 retos',
      descripcion: 'Desafíos de comunicación efectiva, persuasión, storytelling y conexión humana.'
    },
    {
      icon: '🧠',
      title: 'Aprendizaje',
      retos: '5 retos',
      descripcion: 'Retos de adquisición rápida de conocimiento, síntesis y aplicación práctica.'
    },
    {
      icon: '🎨',
      title: 'Diseño',
      retos: '5 retos',
      descripcion: 'Problemas de diseño visual, UX, arquitectura de información y experiencia.'
    },
    {
      icon: '⚡',
      title: 'Innovación',
      retos: '5 retos',
      descripcion: 'Desafíos que requieren romper paradigmas, pensar diferente, crear lo nuevo.'
    },
    {
      icon: '🌟',
      title: 'Liderazgo',
      retos: '5 retos',
      descripcion: 'Retos de influencia, guía, inspiración y transformación de equipos y personas.'
    }
  ]

  const beneficios = [
    {
      title: 'Portafolio Real',
      descripcion: 'Cada reto resuelto se convierte en una pieza de tu portafolio. 45 proyectos reales que demuestran tu maestría.'
    },
    {
      title: 'Maestría Práctica',
      descripcion: 'No es teoría, es práctica intensa. Enfrentas problemas reales y los resuelves en simbiosis con Sophia.'
    },
    {
      title: 'Versatilidad Comprobada',
      descripcion: 'Demuestras competencia en 9 áreas distintas. Te vuelves un profesional multidimensional.'
    },
    {
      title: 'Confianza Inquebrantable',
      descripcion: 'Después de 45 retos, sabes que puedes enfrentar cualquier desafío. Tu autoconfianza se transforma.'
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
            3
          </NivelBadge>

          <MainTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sendero de Pruebas
          </MainTitle>

          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Maestría en 9 Dimensiones
          </Subtitle>

          <Description
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            45 experiencias transformadoras en 9 categorías: desde estrategia hasta creatividad, desde
            análisis hasta liderazgo. Cada prueba es un reto real que resuelves en simbiosis con Sophia.
            No es teoría, es maestría práctica que construye tu portafolio y tu confianza.
          </Description>

          <MetaInfo>
            <MetaItem>
              <strong>45</strong>
              <span>Retos Reales</span>
            </MetaItem>
            <MetaItem>
              <strong>9</strong>
              <span>Categorías Maestras</span>
            </MetaItem>
            <MetaItem>
              <strong>100%</strong>
              <span>Práctica Aplicada</span>
            </MetaItem>
          </MetaInfo>
        </HeroSection>

        <Section>
          <SectionTitle>Las 9 Categorías de Maestría</SectionTitle>

          <CategoriasGrid>
            {categorias.map((categoria, index) => (
              <CategoriaCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <CategoriaIcon>{categoria.icon}</CategoriaIcon>
                <CategoriaTitle>{categoria.title}</CategoriaTitle>
                <CategoriaRetos>{categoria.retos}</CategoriaRetos>
                <CategoriaDescription>{categoria.descripcion}</CategoriaDescription>
              </CategoriaCard>
            ))}
          </CategoriasGrid>
        </Section>

        <Section>
          <SectionTitle>Lo Que Logras</SectionTitle>

          <BeneficiosGrid>
            {beneficios.map((beneficio, index) => (
              <BeneficioCard
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <BeneficioTitle>{beneficio.title}</BeneficioTitle>
                <BeneficioText>{beneficio.descripcion}</BeneficioText>
              </BeneficioCard>
            ))}
          </BeneficiosGrid>
        </Section>

        <CTASection>
          <CTACard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CTATitle>¿Listo para las Pruebas?</CTATitle>
            <CTAText>
              45 retos que te transformarán en un maestro multidimensional. Cada desafío resuelto
              es una pieza más de tu portafolio, una prueba más de tu maestría en simbiosis.
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
