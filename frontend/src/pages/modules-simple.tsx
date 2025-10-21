import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import Link from 'next/link'

const PageContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  padding: 2rem 0;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const PageTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #FFD700;
  font-weight: 300;
`

const PageSubtitle = styled.p`
  font-size: 1.5rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.8;
`

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const ModuleCard = styled.a`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #FFD700;
  border-radius: 20px;
  padding: 2rem;
  display: block;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 215, 0, 0.1);
    box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
  }
`

const ModuleNumber = styled.div`
  width: 60px;
  height: 60px;
  background: #FFD700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
  margin-bottom: 1rem;
`

const ModuleTitle = styled.h3`
  font-size: 1.5rem;
  color: #FFD700;
  margin-bottom: 0.5rem;
  font-weight: 400;
`

const ModuleSubtitle = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 215, 0, 0.7);
  margin-bottom: 1rem;
`

const ModuleDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  margin-bottom: 1rem;
`

const ModuleDuration = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 215, 0, 0.6);
  font-size: 0.9rem;
`

export default function ModulesSimple() {
  const modules = [
    {
      number: 1,
      title: 'El Encuentro Interior',
      subtitle: 'Semanas 1-2',
      description: 'Descubre tu genio dormido a través de 7 días de introspección profunda.',
      duration: '2 semanas',
      link: '/modules/modulo-1'
    },
    {
      number: 2,
      title: 'La Alianza Transformadora',
      subtitle: 'Semanas 3-5',
      description: 'Aprende a danzar con Sophia y libera 20 horas semanales para tu genio.',
      duration: '3 semanas',
      link: '/modules/modulo-2'
    },
    {
      number: 3,
      title: 'El Sendero de las Pruebas',
      subtitle: 'Semanas 6-14',
      description: '450 experiencias transformadoras en 9 categorías de evolución.',
      duration: '9 semanas',
      link: '/modules/modulo-3'
    },
    {
      number: 4,
      title: 'La Cristalización del Propósito',
      subtitle: 'Semanas 9-10',
      description: 'Cristaliza tu propósito único con el framework RESONANCE.',
      duration: '2 semanas',
      link: '/modules/modulo-4'
    },
    {
      number: 5,
      title: 'El Nacimiento del Autor',
      subtitle: 'Semanas 11-12',
      description: 'Escribe y publica tu libro transformador en 14 días con Sophia.',
      duration: '2 semanas',
      link: '/modules/modulo-5'
    }
  ]
  
  return (
    <PageContainer>
      <Container>
        <PageTitle>
          Tu Journey de Transformación
        </PageTitle>
        
        <PageSubtitle>
          12 semanas que no cambiarán lo que haces. 
          Cambiarán quién eres.
        </PageSubtitle>
        
        <ModulesGrid>
          {modules.map((module) => (
            <ModuleCard 
              key={module.number} 
              href={module.link}
            >
              <ModuleNumber>
                {module.number}
              </ModuleNumber>
              
              <ModuleTitle>
                {module.title}
              </ModuleTitle>
              
              <ModuleSubtitle>{module.subtitle}</ModuleSubtitle>
              
              <ModuleDescription>
                {module.description}
              </ModuleDescription>
              
              <ModuleDuration>
                <span>⏱</span>
                <span>{module.duration}</span>
              </ModuleDuration>
            </ModuleCard>
          ))}
        </ModulesGrid>
      </Container>
    </PageContainer>
  )
}