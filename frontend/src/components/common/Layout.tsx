import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { Navigation } from './Navigation'
import { SophiaAmbient } from '../sophia/SophiaAmbient'
import { useAuth } from '@/contexts/AuthContext'
import { theme } from '@/styles/theme'

interface LayoutProps {
  children: ReactNode
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.black};
  position: relative;
`

const MainContent = styled.main`
  position: relative;
  z-index: 1;
`

const BackgroundGradient = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.gradients.heroGlow};
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;
`

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth()

  return (
    <LayoutContainer>
      <BackgroundGradient />
      <Navigation />
      <MainContent>
        {children}
      </MainContent>
      {user && <SophiaAmbient />}
    </LayoutContainer>
  )
}