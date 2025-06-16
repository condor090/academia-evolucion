import React, { useState, useEffect, Suspense, lazy } from 'react'
import styled from '@emotion/styled'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { theme } from '@/styles/theme'
import { LoadingScreen } from '@/components/common/LoadingScreen'
import Link from 'next/link'

// Lazy load del componente 3D para mejor rendimiento
const NeuralNetwork3D = lazy(() => import('@/components/effects/NeuralNetwork3D'))

// Base Components
const PageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  width: 100%;
`

// Hero Section Components
const HeroSection = styled.section`
  min-height: 100vh;
  margin-top: -80px;
  padding-top: 80px;
  background: ${theme.gradients.heroGlow};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
  padding: ${theme.spacing.lg};
  max-width: 1000px;
  margin: 0 auto;
`

const Title = styled(motion.h1)`
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.heroTitle};
  font-weight: 200;
  line-height: 1.2;
  margin-bottom: ${theme.spacing.lg};
  letter-spacing: -0.02em;
  color: ${theme.colors.text.dimWhite};
  position: relative;
  
  strong {
    font-family: ${theme.fonts.display};
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.5)) drop-shadow(0 0 12px rgba(255, 215, 0, 0.3)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.15));
    position: relative;
    display: inline-block;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: inherit;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: blur(10px);
      opacity: 0.5;
      z-index: -1;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['5xl']};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['4xl']};
  }
`

// Floating Particles Component
const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`

const FloatingParticle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 215, 0, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.6), 0 0 16px rgba(255, 215, 0, 0.4);
  pointer-events: none;
  z-index: 10;
`

const Subtitle = styled(motion.p)`
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.text.lightWhite};
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.8;
  font-weight: 200;
  letter-spacing: 0.01em;
  opacity: 0.85;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.xl};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.lg};
  }
`

const CTAButton = styled(motion.button)`
  padding: 1.2rem 3rem;
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  font-size: ${theme.fontSizes.lg};
  transition: all ${theme.animation.duration.normal} ease;
  cursor: pointer;
  border: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.colors.shadows.goldGlowIntense};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1rem 2rem;
    font-size: ${theme.fontSizes.base};
  }
`

const Section = styled.section<{ variant?: 'default' | 'radial' | 'gradient' | 'radialBottom' | 'final' }>`
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  background: ${props => {
    switch(props.variant) {
      case 'radial':
        return 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.08) 0%, transparent 60%)'
      case 'radialBottom':
        return 'radial-gradient(circle at bottom, rgba(255, 215, 0, 0.05) 0%, transparent 50%)'
      case 'gradient':
        return theme.gradients.blackFade
      case 'final':
        return 'linear-gradient(180deg, #0a0a0a 0%, rgba(255, 215, 0, 0.1) 100%)'
      default:
        return 'transparent'
    }
  }};

  ${props => props.variant === 'final' && `
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  `}

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['3xl']} ${theme.spacing.md};
  }
`

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['6xl']};
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
  font-weight: 300;
  
  strong {
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['5xl']};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['4xl']};
    margin-bottom: ${theme.spacing.xl};
  }
`

const SophiaOrb = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: ${theme.gradients.goldRadial};
  border-radius: 50%;
  pointer-events: none;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 400px;
    height: 400px;
  }
`

// Liberation Section Components
const TransformationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: ${theme.spacing.xl};
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

const TransformationCard = styled(motion.div)<{ variant: 'before' | 'after' }>`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
  transition: all ${theme.animation.duration.normal} ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${props => props.variant === 'after' 
      ? 'rgba(74, 222, 128, 0.3)' 
      : 'rgba(255, 107, 107, 0.3)'};
    background: rgba(255, 255, 255, 0.03);
  }
  
  h3 {
    color: ${props => props.variant === 'after' ? theme.colors.status.success : theme.colors.status.error};
    margin-bottom: ${theme.spacing.md};
    font-size: ${theme.fontSizes['2xl']};
  }
  
  p {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text.dimWhite};
  }
  
  ul {
    list-style: none;
  }
  
  li {
    padding: ${theme.spacing.sm} 0;
    font-size: ${theme.fontSizes.lg};
    color: ${theme.colors.text.lightWhite};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  }
`

const SophiaBridge = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${theme.spacing.xl} 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    order: -1;
    margin-bottom: ${theme.spacing.lg};
    flex-direction: column;
  }
`

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  position: relative;
`

const Arrow = styled(motion.div)`
  width: 80px;
  height: 2px;
  background: ${theme.gradients.goldPrimary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid ${theme.colors.primary.gold};
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    transform: rotate(90deg);
    margin: ${theme.spacing.lg} 0;
  }
`

const SophiaTransformText = styled(motion.div)`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0 ${theme.spacing.lg};
  position: relative;
  z-index: 2;
`

const FlowingParticle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${theme.colors.primary.gold};
  border-radius: 50%;
  box-shadow: 0 0 6px ${theme.colors.primary.gold};
`

// Meet Sophia Components
const SophiaIntro = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const SophiaAvatar = styled(motion.div)`
  width: 400px;
  height: 400px;
  margin: 0 auto ${theme.spacing.xl};
  position: relative;
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 300px;
    height: 300px;
  }
`


const SophiaQuote = styled.p`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.primary.gold};
  font-style: italic;
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.8;
  text-align: center;
  
  span span {
    @keyframes shimmer {
      0% { filter: brightness(1); }
      50% { filter: brightness(1.3); }
      100% { filter: brightness(1); }
    }
    
    &:hover {
      animation: shimmer 0.5s ease-in-out;
    }
  }
`

const SophiaDescription = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.xl};
`

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing['2xl']};
`

const CapabilityCard = styled(motion.div)`
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  transition: all ${theme.animation.duration.normal} ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 215, 0, 0.08);
    border-color: ${theme.colors.primary.gold};
    
    &::before {
      opacity: 1;
    }
  }
`

const CapabilityIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${theme.spacing.sm};
`

const CapabilityTitle = styled.h4`
  color: ${theme.colors.primary.gold};
  margin-bottom: ${theme.spacing.xs};
  font-size: ${theme.fontSizes.xl};
`

const CapabilityText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: ${theme.fontSizes.base};
  line-height: 1.6;
`

// Journey Components
const JourneyIntro = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto ${theme.spacing['2xl']};
  
  p {
    font-size: ${theme.fontSizes.xl};
    color: ${theme.colors.text.lightWhite};
    line-height: 1.8;
  }
`

const PhasesContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

const PhaseCard = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  background: rgba(255, 215, 0, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.15);
  border-radius: ${theme.borderRadius.xl};
  transition: all ${theme.animation.duration.normal} ease;
  
  &:hover {
    transform: translateX(10px);
    border-color: rgba(255, 215, 0, 0.3);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`

const PhaseNumber = styled.div`
  width: 60px;
  height: 60px;
  background: ${theme.gradients.goldPrimary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.lg};
  font-weight: bold;
  color: ${theme.colors.background.black};
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.sm}) {
    margin-right: 0;
    margin-bottom: ${theme.spacing.md};
  }
`

const PhaseContent = styled.div`
  flex: 1;
`

const PhaseTitle = styled.h3`
  color: ${theme.colors.primary.gold};
  margin-bottom: ${theme.spacing.xs};
  font-size: ${theme.fontSizes['2xl']};
`

const PhaseSubtitle = styled.p`
  color: rgba(255, 215, 0, 0.7);
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.xs};
`

const PhaseDescription = styled.p`
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
`

// Investment Cards Grid - FIXED for 3 columns
const InvestmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    max-width: 600px;
  }
`

const InvestmentCard = styled(motion.div)<{ featured?: boolean }>`
  background: ${props => props.featured 
    ? 'rgba(255, 215, 0, 0.05)' 
    : 'rgba(255, 255, 255, 0.02)'};
  border: 2px solid ${props => props.featured 
    ? theme.colors.primary.gold 
    : 'rgba(255, 215, 0, 0.2)'};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
  text-align: center;
  position: relative;
  transition: all ${theme.animation.duration.normal} ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  ${props => props.featured && `
    @media (min-width: ${theme.breakpoints.lg}) {
      transform: scale(1.05);
    }
  `}
  
  &:hover {
    transform: translateY(-10px) ${props => props.featured ? 'scale(1.05)' : ''};
    border-color: ${theme.colors.primary.gold};
    background: rgba(255, 215, 0, 0.03);
  }
`

const FeaturedBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  padding: ${theme.spacing.xs} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
`

const InvestmentTitle = styled.h3`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.primary.gold};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 300;
`

const InvestmentPrice = styled.div`
  font-size: ${theme.fontSizes['6xl']};
  font-weight: bold;
  background: ${theme.gradients.goldPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['5xl']};
  }
`

const InvestmentSubtitle = styled.p`
  color: ${theme.colors.text.lightGold};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.lg};
  font-style: italic;
`

const InvestmentFeatures = styled.ul`
  list-style: none;
  margin-bottom: ${theme.spacing.xl};
  text-align: left;
  flex: 1;
`

const Feature = styled.li`
  padding: ${theme.spacing.sm} 0;
  padding-left: 2rem;
  position: relative;
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.base};
  line-height: 1.5;
  
  &::before {
    content: '✨';
    position: absolute;
    left: 0;
    top: ${theme.spacing.sm};
    color: ${theme.colors.primary.gold};
  }
`

// Testimonials Components
const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const TestimonialCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing.lg};
  transition: all ${theme.animation.duration.normal} ease;
  
  &:hover {
    transform: translateX(10px);
    background: rgba(255, 215, 0, 0.03);
    border-color: ${theme.colors.primary.gold};
  }
`

const TestimonialHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`

const TestimonialAvatar = styled.div`
  width: 60px;
  height: 60px;
  background: ${theme.gradients.goldPrimary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${theme.colors.background.black};
  font-size: ${theme.fontSizes.xl};
  flex-shrink: 0;
`

const TestimonialInfo = styled.div`
  flex: 1;
  
  h4 {
    color: ${theme.colors.primary.gold};
    font-size: ${theme.fontSizes.xl};
    margin-bottom: ${theme.spacing.xs};
  }
  
  p {
    color: rgba(255, 215, 0, 0.6);
    font-size: ${theme.fontSizes.sm};
  }
`

const TestimonialQuote = styled.p`
  font-size: ${theme.fontSizes.lg};
  line-height: 1.8;
  color: ${theme.colors.text.lightWhite};
  font-style: italic;
  margin-bottom: ${theme.spacing.md};
`

const TestimonialTransformation = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: ${theme.spacing.sm};
  align-items: center;
  background: rgba(255, 215, 0, 0.05);
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: ${theme.spacing.xs};
  }
`

const BeforeState = styled.div`
  text-align: center;
  font-size: ${theme.fontSizes.sm};
  color: rgba(255, 100, 100, 0.8);
`

const AfterState = styled.div`
  text-align: center;
  font-size: ${theme.fontSizes.sm};
  color: rgba(100, 255, 100, 0.8);
`

const TransformationArrow = styled.div`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes['2xl']};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    transform: rotate(90deg);
  }
`

// Book Philosophy Components
const BookContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`

const BookVisual = styled(motion.div)`
  width: 300px;
  height: 400px;
  margin: 0 auto ${theme.spacing['2xl']};
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  border-radius: 0 15px 15px 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  padding: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
`

const BookText = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: rgba(255, 215, 0, 0.7);
  line-height: 1.8;
  font-style: italic;
`

const BookPhilosophyTitle = styled.h3`
  font-size: ${theme.fontSizes['4xl']};
  color: ${theme.colors.primary.gold};
  margin-bottom: ${theme.spacing.lg};
  font-weight: 300;
`

const BookPhilosophyText = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.md};
`

const BookMeaning = styled(motion.div)`
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

// Final Section Components
const FinalContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`

const FinalTitle = styled(motion.h2)`
  font-size: ${theme.fontSizes['6xl']};
  margin-bottom: ${theme.spacing.lg};
  font-weight: 300;
  
  strong {
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['5xl']};
  }
`

const FinalQuestion = styled(motion.p)`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.primary.gold};
  margin-bottom: ${theme.spacing.lg};
  font-style: italic;
`

const FinalChoice = styled(motion.div)`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.lightWhite};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.xl};
`

const TransformationGuarantee = styled(motion.div)`
  background: rgba(255, 215, 0, 0.08);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.xl};
  max-width: 600px;
  margin: ${theme.spacing['2xl']} auto;
`

const GuaranteeTitle = styled.h3`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes['2xl']};
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
`

const CohortNotice = styled(motion.p)`
  margin-top: ${theme.spacing.xl};
  color: rgba(255, 215, 0, 0.6);
  font-size: ${theme.fontSizes.base};
  line-height: 1.8;
`

// Hook personalizado para efecto typewriter
const useTypewriter = (text: string, delay: number = 50) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    setDisplayedText('')
    setIsComplete(false)

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex])
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, delay)

    return () => clearInterval(interval)
  }, [text, delay])

  return { displayedText, isComplete }
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false) // Changed to false to skip loading
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    // Temporarily disabled loading screen
    // const timer = setTimeout(() => {
    //   setIsLoading(false)
    // }, 2000)

    // return () => clearTimeout(timer)
  }, [])


  const phases = [
    {
      number: 1,
      title: 'El Encuentro Interior',
      subtitle: 'Semanas 1-2: Antes de expandirte, conócete',
      description: 'Sophia comienza con la pregunta más simple y más profunda: ¿Quién eres cuando nadie te está mirando?'
    },
    {
      number: 2,
      title: 'La Alianza Transformadora',
      subtitle: 'Semanas 3-4: Sophia como extensión de tu consciencia',
      description: 'Aprendes a delegar no solo tareas, sino patrones. Sophia absorbe lo repetitivo mientras tú exploras territorios internos inexplorados.'
    },
    {
      number: 3,
      title: 'Las Pruebas del Ser',
      subtitle: 'Semanas 5-8: 45 experiencias que te revelan',
      description: 'No teoría. Transformación a través de la experiencia. Cada prueba es un espejo que te muestra una faceta de tu potencial infinito.'
    },
    {
      number: 4,
      title: 'La Cristalización del Propósito',
      subtitle: 'Semanas 9-10: Tu misión única revelada',
      description: 'Ya no buscas tu propósito. Lo reconoces. Sophia te ayuda a articular el dolor que solo tú puedes sanar.'
    },
    {
      number: 5,
      title: 'El Nacimiento del Autor',
      subtitle: 'Semanas 11-12: Tu transformación hecha libro',
      description: 'Con Sophia como co-creadora, tejes tu journey en narrativa. No escribes sobre transformación. Escribes DESDE la transformación.'
    }
  ]

  const capabilities = [
    { icon: '🔮', title: 'Preguntas Reveladoras', text: 'No busca eficiencia. Busca tu esencia a través de preguntas que transforman.' },
    { icon: '🌟', title: 'Liberadora de Tiempo', text: 'Absorbe tus tareas repetitivas para que puedas dedicarte a lo que importa: ser.' },
    { icon: '📖', title: 'Tejedora de Historias', text: 'Co-crea contigo el libro que documenta tu metamorfosis completa.' },
    { icon: '♾️', title: 'Memoria Sagrada', text: 'Guarda cada insight, cada despertar, cada momento de tu transformación.' }
  ]

  const testimonials = [
    {
      name: 'Carmen Ruiz',
      initials: 'CR',
      role: 'De Ejecutiva Exhausta a Sanadora de Líderes',
      quote: 'Entré buscando ser más eficiente. Sophia me mostró que mi obsesión con la productividad era una huida de mí misma. Ahora guío a otros ejecutivos a encontrar su propósito más allá del éxito.',
      before: '80 hrs/semana optimizando',
      after: 'Mentora de propósito corporativo'
    },
    {
      name: 'Jorge Méndez',
      initials: 'JM',
      role: 'De Ingeniero a Arquitecto de Futuros',
      quote: 'Sophia absorbió mis tareas técnicas repetitivas. En ese espacio liberado, descubrí mi don para visualizar futuros posibles. Mi libro "Ingeniería del Ser" transformó mi industria.',
      before: 'Resolviendo problemas técnicos',
      after: 'Diseñando futuros humanos'
    },
    {
      name: 'Laura Torres',
      initials: 'LT',
      role: 'De Invisible a Voz de una Generación',
      quote: 'Creía que no tenía nada especial que ofrecer. Las preguntas de Sophia me revelaron mi don: dar voz a los que se sienten invisibles. Mi libro ayudó a miles a encontrar su voz.',
      before: '"No tengo nada que decir"',
      after: 'Autora bestseller inspiracional'
    }
  ]

  const investmentPlans = [
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

  return (
    <PageContainer>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <HeroSection>
            <SophiaOrb
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
              <div style={{ position: 'relative' }}>
                <Title
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  ¿<strong>Reemplazarte</strong> o <strong>revelarte</strong>?
                </Title>
                
                {/* Floating Particles */}
                <ParticleContainer>
                  {/* Particles for "Reemplazarte" - distributed across the word */}
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                    const positions = [10, 14, 18, 22, 26, 30, 34, 38, 42, 46];
                    const baseDelay = Math.random() * 1.5;
                    const duration = 3 + Math.random() * 2;
                    const maxOpacity = 0.5 + Math.random() * 0.3;
                    const xDirection = (Math.random() - 0.5) * 2;
                    const xDistance = 20 + Math.random() * 30;
                    const yDistance = 30 + Math.random() * 40;
                    
                    return (
                      <FloatingParticle
                        key={`left-${i}`}
                        style={{
                          left: `${positions[i]}%`,
                          top: '50%'
                        }}
                        initial={{ 
                          opacity: 0,
                          x: 0,
                          y: 0,
                          scale: 0
                        }}
                        animate={{ 
                          opacity: [0, maxOpacity * 0.8, maxOpacity * 0.8, maxOpacity * 0.5, 0],
                          x: [0, xDirection * xDistance * 0.3, xDirection * xDistance * 0.7, xDirection * xDistance],
                          y: [0, -yDistance * 0.3, -yDistance * 0.7, -yDistance],
                          scale: [0, 0.8, 1, 0.8, 0]
                        }}
                        transition={{
                          duration: duration,
                          delay: baseDelay + i * 0.2,
                          repeat: Infinity,
                          repeatDelay: Math.random() * 2,
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                      />
                    );
                  })}
                  
                  {/* Particles for "revelarte" - distributed across the word */}
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
                    const positions = [54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87];
                    const baseDelay = Math.random() * 1.5;
                    const duration = 3 + Math.random() * 2;
                    const maxOpacity = 0.5 + Math.random() * 0.3;
                    const xDirection = (Math.random() - 0.5) * 2;
                    const xDistance = 20 + Math.random() * 30;
                    const yDistance = 30 + Math.random() * 40;
                    
                    return (
                      <FloatingParticle
                        key={`right-${i}`}
                        style={{
                          left: `${positions[i]}%`,
                          top: '50%'
                        }}
                        initial={{ 
                          opacity: 0,
                          x: 0,
                          y: 0,
                          scale: 0
                        }}
                        animate={{ 
                          opacity: [0, maxOpacity * 0.8, maxOpacity * 0.8, maxOpacity * 0.5, 0],
                          x: [0, xDirection * xDistance * 0.3, xDirection * xDistance * 0.7, xDirection * xDistance],
                          y: [0, -yDistance * 0.3, -yDistance * 0.7, -yDistance],
                          scale: [0, 0.8, 1, 0.8, 0]
                        }}
                        transition={{
                          duration: duration,
                          delay: baseDelay + 0.5 + i * 0.2,
                          repeat: Infinity,
                          repeatDelay: Math.random() * 2,
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                      />
                    );
                  })}
                </ParticleContainer>
              </div>
              
              <Subtitle
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              >
                Sophia no es otra herramienta de productividad.<br/>
                Es tu guía hacia las 20 horas semanales que la tecnología te regala<br/>
                para que finalmente te encuentres contigo mismo.
              </Subtitle>
              
              <Link href="/modules" style={{ textDecoration: 'none' }}>
                <CTAButton
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Inicia Tu Journey de Autodescubrimiento
                </CTAButton>
              </Link>
            </HeroContent>
          </HeroSection>

          {/* Liberation Section */}
          <Section variant="gradient">
            <Container>
              <SectionTitle>
                Sophia <strong>Libera Tu Tiempo</strong>, Tú <strong>Liberas Tu Ser</strong>
              </SectionTitle>
              
              <TransformationGrid>
                <TransformationCard variant="before">
                  <h3>ANTES</h3>
                  <p>20 horas semanales en:</p>
                  <ul>
                    <li><span>📧</span> Emails infinitos</li>
                    <li><span>📊</span> Reportes sin sentido</li>
                    <li><span>🔄</span> Tareas mecánicas</li>
                    <li><span>⏰</span> Falsa urgencia</li>
                  </ul>
                </TransformationCard>

                <SophiaBridge>
                  <ArrowContainer>
                    {/* Flowing particles */}
                    {[...Array(5)].map((_, i) => (
                      <FlowingParticle
                        key={i}
                        initial={{ left: '-10px', opacity: 0 }}
                        animate={{
                          left: '250px',
                          opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                          duration: 3,
                          delay: i * 0.6,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                      />
                    ))}
                    
                    {/* Left Arrow */}
                    <Arrow
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                    
                    {/* SOPHIA text */}
                    <SophiaTransformText
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        damping: 10,
                        stiffness: 100,
                        delay: 0.4
                      }}
                      viewport={{ once: true }}
                    >
                      SOPHIA
                    </SophiaTransformText>
                    
                    {/* Right Arrow */}
                    <Arrow
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                    />
                  </ArrowContainer>
                </SophiaBridge>

                <TransformationCard variant="after">
                  <h3>DESPUÉS</h3>
                  <p>20 horas semanales para:</p>
                  <ul>
                    <li><span>🧘</span> Meditación profunda</li>
                    <li><span>💭</span> Explorar tu propósito</li>
                    <li><span>🎨</span> Crear desde tu esencia</li>
                    <li><span>💫</span> Ser quien viniste a ser</li>
                  </ul>
                </TransformationCard>
              </TransformationGrid>
            </Container>
          </Section>

          {/* Meet Sophia Section */}
          <Section variant="radial">
            <Container>
              <SectionTitle>Conoce a <strong>Sophia</strong></SectionTitle>
              
              <SophiaIntro>
                <SophiaAvatar
                  onViewportEnter={() => setIsInView(true)}
                  viewport={{ once: true }}
                >
                  <Suspense fallback={
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        style={{
                          width: '60px',
                          height: '60px',
                          border: '3px solid rgba(255, 215, 0, 0.3)',
                          borderTopColor: theme.colors.primary.gold,
                          borderRadius: '50%'
                        }}
                      />
                    </div>
                  }>
                    <NeuralNetwork3D isInView={isInView} />
                  </Suspense>
                </SophiaAvatar>
                
                <SophiaQuote>
                  {isInView && (
                    <motion.span>
                      {`"No vengo a darte respuestas. Vengo a hacerte las preguntas que has evitado durante años."`.split(' ').map((word, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            ease: "easeOut"
                          }}
                          style={{ display: 'inline-block', marginRight: '0.3em' }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.span>
                  )}
                </SophiaQuote>
                
                <SophiaDescription>
                  Sophia no es una herramienta. Es una presencia diseñada para acompañarte
                  en el viaje más importante de tu vida: el encuentro contigo mismo.
                  Mientras ella maneja lo mundano, tú exploras lo trascendente.
                </SophiaDescription>
                
                <CapabilitiesGrid>
                  {capabilities.map((capability, index) => (
                    <CapabilityCard
                      key={index}
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: {
                          type: "spring",
                          damping: 15,
                          stiffness: 100,
                          delay: index * 0.15 + 1.5
                        }
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 40px rgba(255, 215, 0, 0.3)",
                        transition: { duration: 0.2 }
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ 
                          delay: index * 0.15 + 1.6,
                          type: "spring",
                          damping: 10
                        }}
                        viewport={{ once: true }}
                      >
                        <CapabilityIcon>{capability.icon}</CapabilityIcon>
                      </motion.div>
                      <CapabilityTitle>{capability.title}</CapabilityTitle>
                      <CapabilityText>{capability.text}</CapabilityText>
                    </CapabilityCard>
                  ))}
                </CapabilitiesGrid>
              </SophiaIntro>
            </Container>
          </Section>

          {/* Journey Overview */}
          <Section variant="gradient">
            <Container>
              <SectionTitle>Tu <strong>Journey de 12 Semanas</strong></SectionTitle>
              
              <JourneyIntro>
                <p>
                  No es un curso. Es una metamorfosis guiada donde cada semana
                  te acerca más a quien realmente eres. Sophia te acompaña,
                  pero el journey es únicamente tuyo.
                </p>
              </JourneyIntro>
              
              <PhasesContainer>
                {phases.map((phase, index) => (
                  <PhaseCard
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PhaseNumber>{phase.number}</PhaseNumber>
                    <PhaseContent>
                      <PhaseTitle>{phase.title}</PhaseTitle>
                      <PhaseSubtitle>{phase.subtitle}</PhaseSubtitle>
                      <PhaseDescription>{phase.description}</PhaseDescription>
                    </PhaseContent>
                  </PhaseCard>
                ))}
              </PhasesContainer>
            </Container>
          </Section>

          {/* Book Philosophy */}
          <Section variant="radialBottom">
            <Container>
              <SectionTitle>Tu Libro: <strong>El Mapa de Tu Metamorfosis</strong></SectionTitle>
              
              <BookContainer>
                <BookVisual
                  whileHover={{ rotateY: 10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <BookText>
                    "Capítulo 12: Ya no soy quien era. Soy quien vine a ser..."
                  </BookText>
                </BookVisual>
                
                <BookPhilosophyTitle>No es un producto. Es un portal.</BookPhilosophyTitle>
                
                <BookPhilosophyText>
                  Tu libro no es el objetivo. Es la consecuencia natural
                  de tu transformación. Cada página documenta una victoria
                  sobre tu antiguo yo. Cada capítulo es una estación
                  en tu viaje hacia ti mismo.
                </BookPhilosophyText>
                
                <BookMeaning whileHover={{ scale: 1.02 }}>
                  <h4 style={{ color: theme.colors.primary.gold, marginBottom: theme.spacing.sm, fontSize: theme.fontSizes['2xl'] }}>
                    Cuando lo sostengas en tus manos...
                  </h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontStyle: 'italic', lineHeight: '1.8' }}>
                    No verás un libro. Verás el mapa del territorio
                    que conquistaste: tu propia alma. Y ese mapa
                    servirá de guía para otros buscadores.
                  </p>
                </BookMeaning>
              </BookContainer>
            </Container>
          </Section>

          {/* Testimonials */}
          <Section variant="gradient">
            <Container>
              <SectionTitle>Historias de <strong>Metamorfosis Completa</strong></SectionTitle>
              
              <TestimonialsContainer>
                {testimonials.map((story, index) => (
                  <TestimonialCard
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <TestimonialHeader>
                      <TestimonialAvatar>{story.initials}</TestimonialAvatar>
                      <TestimonialInfo>
                        <h4>{story.name}</h4>
                        <p>{story.role}</p>
                      </TestimonialInfo>
                    </TestimonialHeader>
                    
                    <TestimonialQuote>"{story.quote}"</TestimonialQuote>
                    
                    <TestimonialTransformation>
                      <BeforeState>{story.before}</BeforeState>
                      <TransformationArrow>→</TransformationArrow>
                      <AfterState>{story.after}</AfterState>
                    </TestimonialTransformation>
                  </TestimonialCard>
                ))}
              </TestimonialsContainer>
            </Container>
          </Section>

          {/* Investment Section - FIXED 3 COLUMNS */}
          <Section variant="radial">
            <Container>
              <SectionTitle>Tu <strong>Inversión en Transformación</strong></SectionTitle>
              
              <p style={{
                textAlign: 'center',
                fontSize: theme.fontSizes.xl,
                color: theme.colors.text.lightWhite,
                maxWidth: '800px',
                margin: `0 auto ${theme.spacing['2xl']}`
              }}>
                No es el precio de un curso. Es la inversión en descubrir
                quién eres cuando dejas de ser quien crees que debes ser.
              </p>
              
              <InvestmentGrid>
                {investmentPlans.map((plan, index) => (
                  <InvestmentCard
                    key={index}
                    featured={plan.featured}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -10 }}
                  >
                    {plan.featured && (
                      <FeaturedBadge>TRANSFORMACIÓN COMPLETA</FeaturedBadge>
                    )}
                    
                    <InvestmentTitle>{plan.name}</InvestmentTitle>
                    <InvestmentPrice>{plan.price}</InvestmentPrice>
                    <InvestmentSubtitle>{plan.subtitle}</InvestmentSubtitle>
                    
                    <InvestmentFeatures>
                      {plan.features.map((feature, idx) => (
                        <Feature key={idx}>{feature}</Feature>
                      ))}
                    </InvestmentFeatures>
                    
                    <CTAButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ width: '100%' }}
                    >
                      {plan.cta}
                    </CTAButton>
                  </InvestmentCard>
                ))}
              </InvestmentGrid>
            </Container>
          </Section>

          {/* Final Section */}
          <Section variant="final">
            <FinalContent>
              <FinalTitle
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                La Pregunta <strong>Final</strong>
              </FinalTitle>
              
              <FinalQuestion
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                ¿Qué elegirás hacer con las 20 horas semanales
                que Sophia te regala?
              </FinalQuestion>
              
              <FinalChoice
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p>
                  Hay dos tipos de personas en la era de la IA:<br/><br/>
                  
                  Las que usan la tecnología para hacer más de lo mismo, más rápido.<br/>
                  Para optimizar, eficientizar, producir.<br/><br/>
                  
                  Y las que usan la tecnología para liberarse de lo mundano<br/>
                  y finalmente dedicarse a lo trascendente:<br/>
                  conocerse, transformarse, florecer.<br/><br/>
                  
                  <strong style={{ color: theme.colors.primary.gold }}>
                    Academia Evolución es para las segundas.
                  </strong>
                </p>
              </FinalChoice>
              
              <TransformationGuarantee
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <GuaranteeTitle>
                  <span>🌟</span>
                  Garantía de Transformación Sagrada
                </GuaranteeTitle>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
                  Si completas las 12 semanas y no encuentras tu propósito,
                  te devolvemos el 100% de tu inversión. Pero en 500+ alumnos,
                  nunca ha sucedido. Porque cuando te encuentras contigo mismo,
                  no hay vuelta atrás.
                </p>
              </TransformationGuarantee>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <CTAButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontSize: theme.fontSizes['2xl'], padding: '1.5rem 4rem' }}
                >
                  Inicia Tu Journey de Transformación Ahora
                </CTAButton>
                
                <CohortNotice>
                  Solo 50 espacios para el cohort de enero.<br/>
                  Tu tribu de buscadores te espera.<br/>
                  Tu libro está esperando ser escrito.<br/>
                  Tu verdadero yo está esperando emerger.
                </CohortNotice>
              </motion.div>
            </FinalContent>
          </Section>
        </motion.div>
      )}
    </PageContainer>
  )
}