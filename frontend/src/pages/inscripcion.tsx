import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from '@emotion/styled'
import { theme } from '@/styles/theme'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.gradients.heroGlow};
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};
  align-items: start;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const FormSection = styled(motion.div)`
  background: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing['2xl']};
  backdrop-filter: blur(10px);
`

const InfoSection = styled(motion.div)`
  position: sticky;
  top: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.lg}) {
    position: relative;
    top: 0;
  }
`

const Title = styled.h1`
  font-size: ${theme.fontSizes['5xl']};
  color: ${theme.colors.text.dimWhite};
  margin-bottom: ${theme.spacing.md};
  font-weight: 300;

  strong {
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['4xl']};
  }
`

const Subtitle = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.lightWhite};
  margin-bottom: ${theme.spacing['2xl']};
  line-height: 1.6;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`

const Label = styled.label`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.primary.gold};
  font-weight: 500;
`

const Input = styled.input`
  padding: ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.base};
  transition: all ${theme.animation.duration.fast} ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.gold};
    background: rgba(255, 255, 255, 0.08);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`

const Select = styled.select`
  padding: ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.base};
  transition: all ${theme.animation.duration.fast} ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.gold};
    background: rgba(255, 255, 255, 0.08);
  }

  option {
    background: ${theme.colors.background.black};
    color: ${theme.colors.text.lightWhite};
  }
`

const Textarea = styled.textarea`
  padding: ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.base};
  transition: all ${theme.animation.duration.fast} ease;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.gold};
    background: rgba(255, 255, 255, 0.08);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`

const SubmitButton = styled(motion.button)`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  font-size: ${theme.fontSizes.lg};
  border: none;
  cursor: pointer;
  transition: all ${theme.animation.duration.normal} ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.colors.shadows.goldGlowIntense};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const PlanCard = styled(motion.div)<{ selected?: boolean }>`
  background: ${props => props.selected
    ? 'rgba(255, 215, 0, 0.1)'
    : 'rgba(255, 255, 255, 0.02)'};
  border: 2px solid ${props => props.selected
    ? theme.colors.primary.gold
    : 'rgba(255, 215, 0, 0.2)'};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  cursor: pointer;
  transition: all ${theme.animation.duration.fast} ease;

  &:hover {
    border-color: ${theme.colors.primary.gold};
    background: rgba(255, 215, 0, 0.05);
  }
`

const PlanTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.primary.gold};
  margin-bottom: ${theme.spacing.xs};
`

const PlanPrice = styled.div`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: bold;
  background: ${theme.gradients.goldPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.sm};
`

const PlanSubtitle = styled.p`
  color: ${theme.colors.text.lightGold};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.md};
  font-style: italic;
`

const FeatureList = styled.ul`
  list-style: none;
  margin-top: ${theme.spacing.md};
`

const Feature = styled.li`
  padding: ${theme.spacing.xs} 0;
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.sm};
  display: flex;
  align-items: start;
  gap: ${theme.spacing.xs};

  &::before {
    content: '✨';
    flex-shrink: 0;
  }
`

const BenefitsBox = styled.div`
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`

const BenefitItem = styled.div`
  display: flex;
  align-items: start;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`

const BenefitIcon = styled.div`
  font-size: ${theme.fontSizes['3xl']};
  flex-shrink: 0;
`

const BenefitText = styled.div`
  h4 {
    color: ${theme.colors.primary.gold};
    font-size: ${theme.fontSizes.lg};
    margin-bottom: ${theme.spacing.xs};
  }

  p {
    color: ${theme.colors.text.lightWhite};
    font-size: ${theme.fontSizes.base};
    line-height: 1.6;
  }
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.primary.gold};
  text-decoration: none;
  font-size: ${theme.fontSizes.base};
  margin-bottom: ${theme.spacing.lg};
  transition: all ${theme.animation.duration.fast} ease;

  &:hover {
    transform: translateX(-5px);
  }
`

const SuccessMessage = styled(motion.div)`
  background: rgba(74, 222, 128, 0.1);
  border: 2px solid rgba(74, 222, 128, 0.3);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  text-align: center;

  h2 {
    color: ${theme.colors.status.success};
    font-size: ${theme.fontSizes['3xl']};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.text.lightWhite};
    font-size: ${theme.fontSizes.lg};
    line-height: 1.8;
    margin-bottom: ${theme.spacing.sm};
  }
`

const plans = [
  {
    id: 'despertar',
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
    ]
  },
  {
    id: 'metamorfosis',
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
    ]
  },
  {
    id: 'infinito',
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
    ]
  }
]

export default function Inscripcion() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState('metamorfosis')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    pais: '',
    motivacion: '',
    experienciaPrevia: '',
    disponibilidad: 'inmediata'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/inscripciones/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          plan: selectedPlan
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar inscripción')
      }

      console.log('Inscripción exitosa:', data)
      setIsSuccess(true)
    } catch (error) {
      console.error('Error al enviar inscripción:', error)
      alert('Hubo un error al procesar tu inscripción. Por favor intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <PageContainer>
        <Container>
          <SuccessMessage
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ fontSize: '4rem', marginBottom: theme.spacing.md }}>✨</div>
            <h2>¡Bienvenido a Tu Transformación!</h2>
            <p>
              Hemos recibido tu inscripción. En las próximas 24 horas recibirás un email
              con los detalles para iniciar tu journey.
            </p>
            <p>
              Revisa tu bandeja de entrada y spam. El viaje hacia tu verdadero ser
              está a punto de comenzar.
            </p>
            <div style={{ marginTop: theme.spacing.xl }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <SubmitButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Volver al Inicio
                </SubmitButton>
              </Link>
            </div>
          </SuccessMessage>
        </Container>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <Container>
        <BackLink href="/">
          ← Volver al inicio
        </BackLink>

        <Grid>
          {/* Info Section */}
          <InfoSection
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title>
              Inicia Tu <strong>Journey</strong> de Transformación
            </Title>
            <Subtitle>
              Completa el formulario y comienza tu metamorfosis guiada por Sophia.
              Este es el primer paso hacia descubrir quién realmente eres.
            </Subtitle>

            <BenefitsBox>
              <BenefitItem>
                <BenefitIcon>🌟</BenefitIcon>
                <BenefitText>
                  <h4>Inicio Inmediato</h4>
                  <p>Acceso a la plataforma en 24 horas después de tu inscripción</p>
                </BenefitText>
              </BenefitItem>

              <BenefitItem>
                <BenefitIcon>💫</BenefitIcon>
                <BenefitText>
                  <h4>Garantía Sagrada</h4>
                  <p>100% reembolso si no encuentras tu propósito en 12 semanas</p>
                </BenefitText>
              </BenefitItem>

              <BenefitItem>
                <BenefitIcon>🔮</BenefitIcon>
                <BenefitText>
                  <h4>Comunidad de Por Vida</h4>
                  <p>Acceso permanente a círculos de buscadores y eventos exclusivos</p>
                </BenefitText>
              </BenefitItem>
            </BenefitsBox>

            {/* Plans Selection */}
            <div>
              <h3 style={{
                color: theme.colors.primary.gold,
                fontSize: theme.fontSizes['2xl'],
                marginBottom: theme.spacing.lg
              }}>
                Selecciona Tu Plan
              </h3>

              {plans.map((plan, index) => (
                <PlanCard
                  key={plan.id}
                  selected={selectedPlan === plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  style={{ marginBottom: theme.spacing.md }}
                >
                  <PlanTitle>{plan.name}</PlanTitle>
                  <PlanPrice>{plan.price}</PlanPrice>
                  <PlanSubtitle>{plan.subtitle}</PlanSubtitle>

                  <FeatureList>
                    {plan.features.slice(0, 3).map((feature, idx) => (
                      <Feature key={idx}>{feature}</Feature>
                    ))}
                    {plan.features.length > 3 && (
                      <Feature>+ {plan.features.length - 3} beneficios más</Feature>
                    )}
                  </FeatureList>
                </PlanCard>
              ))}
            </div>
          </InfoSection>

          {/* Form Section */}
          <FormSection
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="apellido">Apellido *</Label>
                <Input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="telefono">Teléfono / WhatsApp *</Label>
                <Input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="pais">País *</Label>
                <Input
                  type="text"
                  id="pais"
                  name="pais"
                  value={formData.pais}
                  onChange={handleChange}
                  placeholder="Tu país de residencia"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="disponibilidad">¿Cuándo quieres iniciar? *</Label>
                <Select
                  id="disponibilidad"
                  name="disponibilidad"
                  value={formData.disponibilidad}
                  onChange={handleChange}
                  required
                >
                  <option value="inmediata">Inmediatamente</option>
                  <option value="1-semana">En 1 semana</option>
                  <option value="2-semanas">En 2 semanas</option>
                  <option value="1-mes">En 1 mes</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="motivacion">¿Qué te trae a Academia Evolución? *</Label>
                <Textarea
                  id="motivacion"
                  name="motivacion"
                  value={formData.motivacion}
                  onChange={handleChange}
                  placeholder="Comparte brevemente qué te motiva a iniciar este journey..."
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="experienciaPrevia">¿Has trabajado antes con IA o herramientas de desarrollo personal?</Label>
                <Textarea
                  id="experienciaPrevia"
                  name="experienciaPrevia"
                  value={formData.experienciaPrevia}
                  onChange={handleChange}
                  placeholder="Opcional: Cuéntanos sobre tu experiencia previa..."
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Procesando...' : 'Iniciar Mi Transformación →'}
              </SubmitButton>

              <p style={{
                fontSize: theme.fontSizes.sm,
                color: theme.colors.text.dimWhite,
                textAlign: 'center',
                marginTop: theme.spacing.md
              }}>
                Al inscribirte, aceptas nuestros términos y condiciones.
                Procesamiento seguro de pago.
              </p>
            </Form>
          </FormSection>
        </Grid>
      </Container>
    </PageContainer>
  )
}

// Custom layout (sin Navigation)
Inscripcion.getLayout = function getLayout(page: ReactElement) {
  return page
}