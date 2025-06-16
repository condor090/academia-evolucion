import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { theme } from '@/styles/theme'

const InvestmentSection = styled.section`
  padding: 8rem 2rem;
  background: radial-gradient(ellipse at top, rgba(255, 215, 0, 0.08) 0%, transparent 60%);
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 300;
  
  strong {
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const InvestmentPhilosophy = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  
  p {
    font-size: 1.3rem;
    color: ${theme.colors.text.lightWhite};
    line-height: 1.8;
  }
`

const InvestmentOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
  }
`

const InvestmentCard = styled(motion.div)<{ $featured?: boolean }>`
  background: ${props => props.$featured 
    ? 'rgba(255, 215, 0, 0.05)' 
    : 'rgba(255, 255, 255, 0.02)'};
  border: 2px solid ${props => props.$featured 
    ? theme.colors.primary.gold 
    : 'rgba(255, 215, 0, 0.2)'};
  border-radius: 25px;
  padding: 3rem;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  transform: ${props => props.$featured ? 'scale(1.05)' : 'scale(1)'};
  
  &:hover {
    transform: ${props => props.$featured ? 'scale(1.05) translateY(-10px)' : 'translateY(-10px)'};
    border-color: ${theme.colors.primary.gold};
    background: rgba(255, 215, 0, 0.03);
  }
  
  @media (max-width: ${theme.breakpoints.lg}) {
    transform: scale(1) !important;
  }
`

const FeaturedBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  padding: 0.5rem 2rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
`

const InvestmentTitle = styled.h3`
  font-size: 2rem;
  color: ${theme.colors.primary.gold};
  margin-bottom: 1rem;
  font-weight: 300;
`

const InvestmentPrice = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  background: ${theme.gradients.goldPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`

const InvestmentSubtitle = styled.p`
  color: rgba(255, 215, 0, 0.6);
  font-size: 0.9rem;
  margin-bottom: 2rem;
  font-style: italic;
`

const InvestmentFeatures = styled.ul`
  list-style: none;
  margin-bottom: 3rem;
  text-align: left;
`

const Feature = styled.li`
  padding: 0.8rem 0;
  padding-left: 2rem;
  position: relative;
  color: ${theme.colors.text.lightWhite};
  font-size: 0.95rem;
  line-height: 1.5;
  
  &::before {
    content: '✨';
    position: absolute;
    left: 0;
    color: ${theme.colors.primary.gold};
  }
`

const CTAButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.colors.shadows.goldGlow};
  }
`

export const Investment: React.FC = () => {
  const router = useRouter()

  const plans = [
    {
      name: 'Despertar',
      price: '$997',
      subtitle: 'El journey esencial',
      features: [
        '12 semanas de transformación guiada',
        'Sophia - Tu mentora digital 24/7',
        '45 experiencias reveladoras',
        'Tu libro en formato digital',
        'Comunidad de buscadores de por vida',
        'Círculos semanales de integración'
      ],
      cta: 'Comienza Tu Despertar'
    },
    {
      name: 'Metamorfosis',
      price: '$2,497',
      subtitle: 'La experiencia completa',
      featured: true,
      features: [
        'Todo lo de Despertar +',
        'Tu libro en tapa dura profesional',
        'ISBN y publicación en Amazon',
        '3 sesiones 1:1 con mentores humanos',
        'Ceremonia presencial de graduación',
        'Documental de tu transformación',
        'Mentoría post-journey 3 meses'
      ],
      cta: 'Transformación Total'
    },
    {
      name: 'Infinito',
      price: '$9,997',
      subtitle: 'Para creadores de futuro',
      features: [
        'Todo lo de Metamorfosis +',
        'Mentoría vitalicia con fundadores',
        'Co-crear tu propio programa',
        'Masterclass mensual privada',
        'Retiro anual con maestros',
        'Acceso al círculo de visionarios',
        'Tu propia versión de Sophia'
      ],
      cta: 'Aplicar (Solo 10 espacios)'
    }
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <InvestmentSection className="scroll-reveal">
      <Container>
        <SectionTitle>Tu <strong>Inversión en Transformación</strong></SectionTitle>
        
        <InvestmentPhilosophy>
          <p>
            No es el precio de un curso. Es la inversión en descubrir
            quién eres cuando dejas de ser quien crees que debes ser.
          </p>
        </InvestmentPhilosophy>
        
        <InvestmentOptions>
          {plans.map((plan, index) => (
            <InvestmentCard
              key={index}
              $featured={plan.featured || false}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              {plan.featured && <FeaturedBadge>TRANSFORMACIÓN COMPLETA</FeaturedBadge>}
              <InvestmentTitle>{plan.name}</InvestmentTitle>
              <InvestmentPrice>{plan.price}</InvestmentPrice>
              <InvestmentSubtitle>{plan.subtitle}</InvestmentSubtitle>
              <InvestmentFeatures>
                {plan.features.map((feature, idx) => (
                  <Feature key={idx}>{feature}</Feature>
                ))}
              </InvestmentFeatures>
              <CTAButton onClick={() => router.push('/comenzar')}>
                {plan.cta}
              </CTAButton>
            </InvestmentCard>
          ))}
        </InvestmentOptions>
      </Container>
    </InvestmentSection>
  )
}