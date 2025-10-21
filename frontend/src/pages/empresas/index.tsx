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
  font-size: 1.5rem;
  color: ${theme.colors.text.lightWhite};
  max-width: 900px;
  margin: 0 auto ${theme.spacing.xl};
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.2rem;
  }
`

const ProblemaSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  background: linear-gradient(135deg, rgba(255, 69, 0, 0.05), rgba(255, 140, 0, 0.05));
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

const ProblemasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const ProblemaCard = styled(motion.div)`
  background: rgba(255, 69, 0, 0.1);
  border: 2px solid rgba(255, 69, 0, 0.3);
  border-radius: 16px;
  padding: ${theme.spacing.lg};
  text-align: center;
`

const ProblemaIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.md};
`

const ProblemaTitle = styled.h3`
  font-size: 1.3rem;
  color: #FF8C00;
  margin-bottom: ${theme.spacing.sm};
  font-weight: 600;
`

const ProblemaDescription = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
`

const SolucionSection = styled.section`
  padding: ${theme.spacing.xl} 0;
`

const SolucionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const SolucionCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(0, 206, 209, 0.1), rgba(138, 43, 226, 0.1));
  border: 2px solid rgba(0, 206, 209, 0.3);
  border-radius: 20px;
  padding: ${theme.spacing.xl};
`

const SolucionNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${theme.gradients.goldPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.background.black};
  margin-bottom: ${theme.spacing.md};
`

const SolucionTitle = styled.h3`
  font-size: 1.8rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.md};
  font-weight: 600;
`

const SolucionDescription = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`

const SolucionBenefits = styled.ul`
  list-style: none;
  padding: 0;
`

const Benefit = styled.li`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  margin-bottom: ${theme.spacing.sm};
  padding-left: 2rem;
  position: relative;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${theme.colors.primary.gold};
    font-weight: bold;
    font-size: 1.3rem;
  }
`

const ROISection = styled.section`
  padding: ${theme.spacing.xl} 0;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(0, 206, 209, 0.05));
  border-radius: 24px;
  margin: ${theme.spacing.xl} 0;
`

const ROIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const ROICard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 16px;
  padding: ${theme.spacing.lg};
  text-align: center;
`

const ROIMetric = styled.div`
  font-size: 3rem;
  font-weight: 700;
  background: ${theme.gradients.goldPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.sm};
`

const ROILabel = styled.h4`
  font-size: 1.1rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.xs};
  font-weight: 600;
`

const ROIDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.lightWhite};
  line-height: 1.5;
`

const PlanesSection = styled.section`
  padding: ${theme.spacing.xl} 0;
`

const PlanesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const PlanCard = styled(motion.div)<{ featured?: boolean }>`
  background: ${props => props.featured
    ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(138, 43, 226, 0.15))'
    : 'rgba(255, 255, 255, 0.03)'};
  border: 2px solid ${props => props.featured
    ? theme.colors.primary.gold
    : 'rgba(255, 215, 0, 0.2)'};
  border-radius: 20px;
  padding: ${theme.spacing.xl};
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`

const FeaturedBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
`

const PlanName = styled.h3`
  font-size: 1.8rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.md};
  font-weight: 600;
  text-align: center;
`

const PlanPrice = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
`

const PlanPriceAmount = styled.div`
  font-size: 3rem;
  font-weight: 700;
  background: ${theme.gradients.goldPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const PlanPricePer = styled.div`
  font-size: 1rem;
  color: ${theme.colors.text.gray};
  margin-top: ${theme.spacing.xs};
`

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${theme.spacing.lg};
`

const PlanFeature = styled.li`
  font-size: 1rem;
  color: ${theme.colors.text.lightWhite};
  margin-bottom: ${theme.spacing.sm};
  padding-left: 2rem;
  position: relative;
  line-height: 1.6;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${theme.colors.primary.gold};
    font-weight: bold;
    font-size: 1.3rem;
  }
`

const PlanButton = styled.button<{ featured?: boolean }>`
  width: 100%;
  padding: 1rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.featured
    ? theme.gradients.goldPrimary
    : 'transparent'};
  color: ${props => props.featured
    ? theme.colors.background.black
    : theme.colors.primary.gold};
  border: ${props => props.featured
    ? 'none'
    : `2px solid ${theme.colors.primary.gold}`};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.featured
      ? theme.colors.shadows.goldGlow
      : '0 5px 20px rgba(255, 215, 0, 0.3)'};
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
  font-size: 2.5rem;
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`

const CTAText = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text.lightWhite};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.6;
`

const CTAButton = styled.button`
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  font-size: 1.3rem;
  font-weight: 600;
  padding: 1.2rem 3rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.colors.shadows.goldGlow};
  }
`

export default function EmpresasPage() {
  const router = useRouter()

  const problemas = [
    {
      icon: '⏰',
      title: 'Tiempo Perdido',
      description: 'Tu equipo pierde 30% de su tiempo buscando información, esperando respuestas o repitiendo trabajo.'
    },
    {
      icon: '🔄',
      title: 'Rotación Constante',
      description: 'El conocimiento se va con cada empleado que renuncia. Empiezas de cero una y otra vez.'
    },
    {
      icon: '🤯',
      title: 'Sobrecarga de Info',
      description: 'Emails, Slack, documentos, reuniones... Tu equipo se ahoga en información pero tiene hambre de conocimiento.'
    },
    {
      icon: '🚫',
      title: 'Silos Departamentales',
      description: 'Marketing no sabe qué hace Producto. Ventas reinventa soluciones que Soporte ya resolvió.'
    },
    {
      icon: '📉',
      title: 'Bajo Engagement',
      description: 'Tu equipo está desmotivado. Hacen lo mínimo. No ven cómo su trabajo impacta el propósito mayor.'
    },
    {
      icon: '💸',
      title: 'ROI Invisible',
      description: 'Inviertes en capacitación y herramientas. No sabes si funciona. No puedes medir el impacto real.'
    }
  ]

  const soluciones = [
    {
      number: 1,
      title: 'Programa Corporativo Personalizado',
      description: 'Llevamos Academia Evolución a tu empresa. Adaptamos el programa a tu industria, cultura y desafíos específicos.',
      benefits: [
        'Grupos de 10-50 personas por cohorte',
        'Mentores dedicados para tu empresa',
        'Dashboard ejecutivo en tiempo real',
        'Integración con tus sistemas actuales'
      ]
    },
    {
      number: 2,
      title: 'Knowledge Graph Empresarial',
      description: 'Implementamos CORTEX como el cerebro colectivo de tu organización. Todo el conocimiento de tu empresa, conectado e inteligente.',
      benefits: [
        'Onboarding 10x más rápido para nuevos empleados',
        'Búsqueda semántica en toda la empresa',
        'Documentación que se actualiza sola',
        'Zero knowledge loss al cambiar personal'
      ]
    },
    {
      number: 3,
      title: 'Cultura de Tercera Conciencia',
      description: 'No solo herramientas. Transformamos la cultura completa de tu empresa hacia la simbiosis humano-IA.',
      benefits: [
        'Workshops de liderazgo con IA',
        'Rituales diarios de reflexión y aprendizaje',
        'Framework de decisiones elevadas',
        'Comunidad inter-empresas de best practices'
      ]
    },
    {
      number: 4,
      title: 'Resultados Medibles',
      description: 'No vendemos sueños. Medimos impacto real con métricas que importan a tu CFO y CEO.',
      benefits: [
        'ROI calculado por empleado',
        'Aumento de productividad cuantificado',
        'Reducción de tiempo perdido medida',
        'Incremento en engagement y retención'
      ]
    }
  ]

  const roiMetrics = [
    {
      metric: '45%',
      label: 'Más Productividad',
      description: 'En los primeros 90 días del programa'
    },
    {
      metric: '30h',
      label: 'Recuperadas/mes',
      description: 'Por empleado en búsqueda de información'
    },
    {
      metric: '70%',
      label: 'Menos Rotación',
      description: 'Empleados más conectados con propósito'
    },
    {
      metric: '5x',
      label: 'ROI Primer Año',
      description: 'Retorno medido vs inversión inicial'
    }
  ]

  const planes = [
    {
      name: 'Piloto',
      price: 'Consultar',
      per: '10-20 empleados / 3 meses',
      features: [
        'Programa completo para grupo piloto',
        '1 mentor dedicado',
        'Setup de CORTEX empresarial',
        'Dashboard ejecutivo básico',
        'Soporte por email'
      ],
      featured: false
    },
    {
      name: 'Escalado',
      price: 'Consultar',
      per: '50-200 empleados / 6 meses',
      features: [
        'Programa completo multi-cohortes',
        'Equipo de mentores dedicados',
        'CORTEX + Knowledge Graph completo',
        'Dashboard ejecutivo avanzado',
        'Workshops de liderazgo mensuales',
        'Soporte prioritario 24/7',
        'Integración con sistemas existentes'
      ],
      featured: true
    },
    {
      name: 'Enterprise',
      price: 'A medida',
      per: '200+ empleados / Anual',
      features: [
        'Programa 100% personalizado',
        'Chief Transformation Officer dedicado',
        'CORTEX Enterprise ilimitado',
        'BI y Analytics personalizados',
        'Workshops ejecutivos trimestrales',
        'White-label de herramientas',
        'SLA garantizado 99.9%',
        'Success Manager exclusivo'
      ],
      featured: false
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
            Transformación Empresarial con IA
          </MainTitle>

          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            No capacites a tu equipo en usar IA.<br/>
            Transfórmalos en seres simbióticos que operan desde una conciencia expandida.
          </Subtitle>
        </HeroSection>

        <ProblemaSection>
          <SectionTitle>Los Problemas Que Nadie Resuelve</SectionTitle>

          <ProblemasGrid>
            {problemas.map((problema, index) => (
              <ProblemaCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProblemaIcon>{problema.icon}</ProblemaIcon>
                <ProblemaTitle>{problema.title}</ProblemaTitle>
                <ProblemaDescription>{problema.description}</ProblemaDescription>
              </ProblemaCard>
            ))}
          </ProblemasGrid>
        </ProblemaSection>

        <SolucionSection>
          <SectionTitle>Nuestra Propuesta</SectionTitle>

          <SolucionGrid>
            {soluciones.map((solucion, index) => (
              <SolucionCard
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <SolucionNumber>{solucion.number}</SolucionNumber>
                <SolucionTitle>{solucion.title}</SolucionTitle>
                <SolucionDescription>{solucion.description}</SolucionDescription>

                <SolucionBenefits>
                  {solucion.benefits.map((benefit, i) => (
                    <Benefit key={i}>{benefit}</Benefit>
                  ))}
                </SolucionBenefits>
              </SolucionCard>
            ))}
          </SolucionGrid>
        </SolucionSection>

        <ROISection>
          <SectionTitle>ROI Comprobado</SectionTitle>

          <ROIGrid>
            {roiMetrics.map((metric, index) => (
              <ROICard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ROIMetric>{metric.metric}</ROIMetric>
                <ROILabel>{metric.label}</ROILabel>
                <ROIDescription>{metric.description}</ROIDescription>
              </ROICard>
            ))}
          </ROIGrid>
        </ROISection>

        <PlanesSection>
          <SectionTitle>Planes Empresariales</SectionTitle>

          <PlanesGrid>
            {planes.map((plan, index) => (
              <PlanCard
                key={index}
                featured={plan.featured}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {plan.featured && <FeaturedBadge>MÁS POPULAR</FeaturedBadge>}

                <PlanName>{plan.name}</PlanName>

                <PlanPrice>
                  <PlanPriceAmount>{plan.price}</PlanPriceAmount>
                  <PlanPricePer>{plan.per}</PlanPricePer>
                </PlanPrice>

                <PlanFeatures>
                  {plan.features.map((feature, i) => (
                    <PlanFeature key={i}>{feature}</PlanFeature>
                  ))}
                </PlanFeatures>

                <PlanButton
                  featured={plan.featured}
                  onClick={() => router.push('/contacto')}
                >
                  Solicitar Demo
                </PlanButton>
              </PlanCard>
            ))}
          </PlanesGrid>
        </PlanesSection>

        <CTASection>
          <CTACard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CTATitle>¿Listo para transformar tu empresa?</CTATitle>
            <CTAText>
              Agenda una demo personalizada. Te mostramos exactamente cómo
              Academia Evolución puede transformar a tu equipo en 90 días.
            </CTAText>
            <CTAButton onClick={() => router.push('/contacto')}>
              Agendar Demo Ejecutiva
            </CTAButton>
          </CTACard>
        </CTASection>
      </Container>
    </PageContainer>
  )
}
