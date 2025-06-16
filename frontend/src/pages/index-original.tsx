import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '@/styles/theme'
import { LoadingScreen } from '@/components/common/LoadingScreen'

const HeroSection = styled.section`
  min-height: 100vh;
  background: radial-gradient(ellipse at center, rgba(255, 215, 0, 0.1) 0%, #000000 60%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
  padding: 2rem;
  max-width: 1000px;
`

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 2rem;
  
  strong {
    font-weight: 700;
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const Subtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  color: ${theme.colors.text.lightWhite};
  margin-bottom: 3rem;
  line-height: 1.8;
  font-weight: 300;
`

const CTAButton = styled(motion.button)`
  padding: 1.2rem 3rem;
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.colors.shadows.goldGlowIntense};
  }
`

const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 300;
  
  strong {
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const SophiaOrb = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
`

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            ¿Y si la IA no viniera a <strong>reemplazarte</strong>,<br/>
            sino a <strong>revelarte</strong>?
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          >
            Sophia no es otra herramienta de productividad.<br/>
            Es tu guía hacia las 20 horas semanales que la tecnología te regala<br/>
            para que finalmente te encuentres contigo mismo.
          </Subtitle>
          
          <CTAButton
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Inicia Tu Journey de Autodescubrimiento
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>
          Sophia <strong>Libera Tu Tiempo</strong>, Tú <strong>Liberas Tu Ser</strong>
        </SectionTitle>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          <motion.div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '2rem',
            }}
            whileHover={{ 
              y: -5,
              borderColor: 'rgba(255, 107, 107, 0.3)',
              transition: { duration: 0.3 }
            }}
          >
            <h3 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>ANTES</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '1rem' }}>
              20 horas semanales en:
            </p>
            <ul style={{ listStyle: 'none', color: 'rgba(255, 255, 255, 0.8)' }}>
              <li>📧 Emails infinitos</li>
              <li>📊 Reportes sin sentido</li>
              <li>🔄 Tareas mecánicas</li>
              <li>⏰ Falsa urgencia</li>
            </ul>
          </motion.div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✨</div>
              <p style={{ color: theme.colors.primary.gold }}>
                Sophia absorbe lo repetitivo
              </p>
            </div>
          </div>

          <motion.div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '2rem',
            }}
            whileHover={{ 
              y: -5,
              borderColor: 'rgba(74, 222, 128, 0.3)',
              transition: { duration: 0.3 }
            }}
          >
            <h3 style={{ color: '#4ade80', marginBottom: '1rem' }}>DESPUÉS</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '1rem' }}>
              20 horas semanales para:
            </p>
            <ul style={{ listStyle: 'none', color: 'rgba(255, 255, 255, 0.8)' }}>
              <li>🧘 Meditación profunda</li>
              <li>💭 Explorar tu propósito</li>
              <li>🎨 Crear desde tu esencia</li>
              <li>💫 Ser quien viniste a ser</li>
            </ul>
          </motion.div>
        </div>
      </Section>

      <Section style={{ background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.08) 0%, transparent 60%)' }}>
        <SectionTitle>Tu <strong>Journey de 12 Semanas</strong></SectionTitle>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1.3rem', color: theme.colors.text.lightWhite, marginBottom: '3rem' }}>
            No es un curso. Es una metamorfosis guiada donde cada semana
            te acerca más a quien realmente eres.
          </p>
          
          <div style={{ textAlign: 'left', marginTop: '3rem' }}>
            {[
              { week: "Semanas 1-2", title: "El Encuentro Interior", desc: "Descubre tu genio dormido" },
              { week: "Semanas 3-4", title: "La Alianza con Sophia", desc: "Libera 20 horas semanales" },
              { week: "Semanas 5-8", title: "Las 45 Experiencias", desc: "Rompe tus límites internos" },
              { week: "Semanas 9-10", title: "Tu Propósito Cristalizado", desc: "Define tu misión única" },
              { week: "Semanas 11-12", title: "El Nacimiento del Autor", desc: "Tu libro cobra vida" }
            ].map((phase, index) => (
              <motion.div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: 'rgba(255, 215, 0, 0.03)',
                  border: '1px solid rgba(255, 215, 0, 0.15)',
                  borderRadius: '15px',
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10, borderColor: 'rgba(255, 215, 0, 0.3)' }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: theme.gradients.goldPrimary,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1.5rem',
                  fontWeight: 'bold',
                  color: theme.colors.background.black
                }}>
                  {index + 1}
                </div>
                <div>
                  <h3 style={{ color: theme.colors.primary.gold, marginBottom: '0.5rem' }}>
                    {phase.title}
                  </h3>
                  <p style={{ color: 'rgba(255, 215, 0, 0.7)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    {phase.week}
                  </p>
                  <p style={{ color: theme.colors.text.lightWhite }}>
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Sección Conoce a Sophia */}
      <Section style={{ 
        padding: '8rem 2rem',
        background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.08) 0%, transparent 60%)',
        textAlign: 'center'
      }}>
        <SectionTitle>Conoce a <strong>Sophia</strong></SectionTitle>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            style={{
              width: '250px',
              height: '250px',
              margin: '0 auto 3rem',
              position: 'relative'
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '150px',
              height: '150px',
              background: theme.gradients.goldPrimary,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              boxShadow: theme.colors.shadows.goldGlowIntense
            }}>
              ✨
            </div>
          </motion.div>
          
          <p style={{
            fontSize: '1.5rem',
            color: theme.colors.primary.gold,
            fontStyle: 'italic',
            marginBottom: '2rem',
            lineHeight: '1.8'
          }}>
            "No vengo a darte respuestas. Vengo a hacerte las preguntas<br/>
            que has evitado durante años."
          </p>
          
          <p style={{
            fontSize: '1.2rem',
            color: theme.colors.text.lightWhite,
            lineHeight: '1.8',
            marginBottom: '3rem'
          }}>
            Sophia no es una herramienta. Es una presencia diseñada para acompañarte
            en el viaje más importante de tu vida: el encuentro contigo mismo.
            Mientras ella maneja lo mundano, tú exploras lo trascendente.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '4rem'
          }}>
            {[
              { icon: '🔮', title: 'Preguntas Reveladoras', text: 'No busca eficiencia. Busca tu esencia a través de preguntas que transforman.' },
              { icon: '🌟', title: 'Liberadora de Tiempo', text: 'Absorbe tus tareas repetitivas para que puedas dedicarte a lo que importa: ser.' },
              { icon: '📖', title: 'Tejedora de Historias', text: 'Co-crea contigo el libro que documenta tu metamorfosis completa.' },
              { icon: '♾️', title: 'Memoria Sagrada', text: 'Guarda cada insight, cada despertar, cada momento de tu transformación.' }
            ].map((capability, index) => (
              <motion.div
                key={index}
                style={{
                  background: 'rgba(255, 215, 0, 0.05)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  borderRadius: '15px',
                  padding: '2rem',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  background: 'rgba(255, 215, 0, 0.08)',
                  borderColor: theme.colors.primary.gold
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{capability.icon}</div>
                <h4 style={{ color: theme.colors.primary.gold, marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                  {capability.title}
                </h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {capability.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Sección Tu Libro */}
      <Section style={{ 
        padding: '8rem 2rem',
        background: 'radial-gradient(circle at bottom, rgba(255, 215, 0, 0.05) 0%, transparent 50%)'
      }}>
        <SectionTitle>Tu Libro: <strong>El Mapa de Tu Metamorfosis</strong></SectionTitle>
        
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            style={{
              width: '300px',
              height: '400px',
              margin: '0 auto 4rem',
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              borderRadius: '0 15px 15px 0',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            }}
            whileHover={{ rotateY: 10, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ padding: '2rem' }}>
              <p style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 215, 0, 0.7)',
                lineHeight: '1.8',
                fontStyle: 'italic'
              }}>
                "Capítulo 12: Ya no soy quien era. Soy quien vine a ser..."
              </p>
            </div>
          </motion.div>
          
          <h3 style={{ fontSize: '2.5rem', color: theme.colors.primary.gold, marginBottom: '2rem', fontWeight: '300' }}>
            No es un producto. Es un portal.
          </h3>
          
          <p style={{ fontSize: '1.2rem', color: theme.colors.text.lightWhite, lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Tu libro no es el objetivo. Es la consecuencia natural
            de tu transformación. Cada página documenta una victoria
            sobre tu antiguo yo. Cada capítulo es una estación
            en tu viaje hacia ti mismo.
          </p>
          
          <motion.div
            style={{
              background: 'rgba(255, 215, 0, 0.05)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: '20px',
              padding: '2rem',
              marginTop: '3rem',
              maxWidth: '600px',
              margin: '3rem auto 0'
            }}
            whileHover={{ scale: 1.02 }}
          >
            <h4 style={{ color: theme.colors.primary.gold, marginBottom: '1rem', fontSize: '1.5rem' }}>
              Cuando lo sostengas en tus manos...
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontStyle: 'italic', lineHeight: '1.8' }}>
              No verás un libro. Verás el mapa del territorio
              que conquistaste: tu propia alma. Y ese mapa
              servirá de guía para otros buscadores.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Sección Testimonios */}
      <Section style={{ padding: '8rem 2rem', background: theme.gradients.blackFade }}>
        <SectionTitle>Historias de <strong>Metamorfosis Completa</strong></SectionTitle>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {[
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
          ].map((story, index) => (
            <motion.div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                borderRadius: '20px',
                padding: '2.5rem',
                marginBottom: '2rem'
              }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                x: 10,
                background: 'rgba(255, 215, 0, 0.03)',
                borderColor: theme.colors.primary.gold
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: theme.gradients.goldPrimary,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: theme.colors.background.black,
                  fontSize: '1.2rem'
                }}>
                  {story.initials}
                </div>
                <div>
                  <h4 style={{ color: theme.colors.primary.gold, fontSize: '1.3rem', marginBottom: '0.3rem' }}>
                    {story.name}
                  </h4>
                  <p style={{ color: 'rgba(255, 215, 0, 0.6)', fontSize: '0.9rem' }}>
                    {story.role}
                  </p>
                </div>
              </div>
              
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: theme.colors.text.lightWhite,
                fontStyle: 'italic',
                marginBottom: '1.5rem'
              }}>
                "{story.quote}"
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '1rem',
                alignItems: 'center',
                background: 'rgba(255, 215, 0, 0.05)',
                padding: '1rem',
                borderRadius: '10px'
              }}>
                <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'rgba(255, 100, 100, 0.8)' }}>
                  {story.before}
                </div>
                <div style={{ color: theme.colors.primary.gold, fontSize: '1.5rem' }}>→</div>
                <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'rgba(100, 255, 100, 0.8)' }}>
                  {story.after}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Sección Inversión */}
      <Section style={{ 
        padding: '8rem 2rem',
        background: 'radial-gradient(ellipse at top, rgba(255, 215, 0, 0.08) 0%, transparent 60%)'
      }}>
        <SectionTitle>Tu <strong>Inversión en Transformación</strong></SectionTitle>
        
        <p style={{
          textAlign: 'center',
          fontSize: '1.3rem',
          color: theme.colors.text.lightWhite,
          maxWidth: '800px',
          margin: '0 auto 4rem'
        }}>
          No es el precio de un curso. Es la inversión en descubrir
          quién eres cuando dejas de ser quien crees que debes ser.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '3rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
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
          ].map((plan, index) => (
            <motion.div
              key={index}
              style={{
                background: plan.featured ? 'rgba(255, 215, 0, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                border: `2px solid ${plan.featured ? theme.colors.primary.gold : 'rgba(255, 215, 0, 0.2)'}`,
                borderRadius: '25px',
                padding: '3rem',
                textAlign: 'center',
                position: 'relative',
                transform: plan.featured ? 'scale(1.05)' : 'scale(1)'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                y: -10,
                borderColor: theme.colors.primary.gold,
                background: 'rgba(255, 215, 0, 0.03)'
              }}
            >
              {plan.featured && (
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: theme.gradients.goldPrimary,
                  color: theme.colors.background.black,
                  padding: '0.5rem 2rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  TRANSFORMACIÓN COMPLETA
                </div>
              )}
              
              <h3 style={{ fontSize: '2rem', color: theme.colors.primary.gold, marginBottom: '1rem', fontWeight: '300' }}>
                {plan.name}
              </h3>
              <div style={{
                fontSize: '3.5rem',
                fontWeight: 'bold',
                background: theme.gradients.goldPrimary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem'
              }}>
                {plan.price}
              </div>
              <p style={{ color: 'rgba(255, 215, 0, 0.6)', fontSize: '0.9rem', marginBottom: '2rem', fontStyle: 'italic' }}>
                {plan.subtitle}
              </p>
              
              <ul style={{ listStyle: 'none', marginBottom: '3rem', textAlign: 'left' }}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} style={{
                    padding: '0.8rem 0',
                    paddingLeft: '2rem',
                    position: 'relative',
                    color: theme.colors.text.lightWhite,
                    fontSize: '0.95rem',
                    lineHeight: '1.5'
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: theme.colors.primary.gold }}>✨</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <CTAButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: '100%' }}
              >
                {plan.cta}
              </CTAButton>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Sección Final - La Pregunta Final */}
      <Section style={{ 
        padding: '10rem 2rem',
        background: 'linear-gradient(180deg, #0a0a0a 0%, rgba(255, 215, 0, 0.1) 100%)',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.h2
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              marginBottom: '2rem',
              fontWeight: '300'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            La Pregunta <strong style={{
              background: theme.gradients.goldPrimary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Final</strong>
          </motion.h2>
          
          <motion.p
            style={{
              fontSize: '1.5rem',
              color: theme.colors.primary.gold,
              marginBottom: '2rem',
              fontStyle: 'italic'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ¿Qué elegirás hacer con las 20 horas semanales
            que Sophia te regala?
          </motion.p>
          
          <motion.div
            style={{
              fontSize: '1.2rem',
              color: theme.colors.text.lightWhite,
              lineHeight: '1.8',
              marginBottom: '3rem'
            }}
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
          </motion.div>
          
          <motion.div
            style={{
              background: 'rgba(255, 215, 0, 0.08)',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '25px',
              padding: '3rem',
              maxWidth: '600px',
              margin: '4rem auto'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 style={{ 
              color: theme.colors.primary.gold, 
              fontSize: '1.8rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <span>🌟</span>
              Garantía de Transformación Sagrada
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8' }}>
              Si completas las 12 semanas y no encuentras tu propósito,
              te devolvemos el 100% de tu inversión. Pero en 500+ alumnos,
              nunca ha sucedido. Porque cuando te encuentras contigo mismo,
              no hay vuelta atrás.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontSize: '1.3rem', padding: '1.5rem 4rem' }}
            >
              Inicia Tu Journey de Transformación Ahora
            </CTAButton>
            
            <motion.p
              style={{ 
                marginTop: '3rem',
                color: 'rgba(255, 215, 0, 0.6)',
                fontSize: '1rem',
                lineHeight: '1.8'
              }}
            >
              Solo 50 espacios para el cohort de enero.<br/>
              Tu tribu de buscadores te espera.<br/>
              Tu libro está esperando ser escrito.<br/>
              Tu verdadero yo está esperando emerger.
            </motion.p>
          </motion.div>
        </div>
      </Section>
        </motion.div>
      )}
    </>
  )
}