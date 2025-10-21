import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { theme } from '@/styles/theme'

const Nav = styled.nav<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.sticky};
  background: ${props => props.scrolled 
    ? 'rgba(0, 0, 0, 0.95)' 
    : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
  border-bottom: ${props => props.scrolled 
    ? '1px solid rgba(255, 215, 0, 0.1)' 
    : 'none'};
`

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 300;
  color: ${theme.colors.primary.gold};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span:last-child {
    font-family: ${theme.fonts.display};
    font-weight: 400;
    letter-spacing: 0.05em;
    background: ${theme.gradients.goldPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

const NavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>`
  color: ${props => props.active 
    ? theme.colors.primary.gold 
    : theme.colors.text.lightWhite};
  font-weight: ${props => props.active ? '500' : '400'};
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: ${theme.colors.primary.gold};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: ${theme.gradients.goldPrimary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${props => props.variant === 'primary' ? `
    background: ${theme.gradients.goldPrimary};
    color: ${theme.colors.background.black};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.colors.shadows.goldGlow};
    }
  ` : `
    background: transparent;
    color: ${theme.colors.primary.gold};
    border: 1px solid ${theme.colors.primary.gold};
    
    &:hover {
      background: rgba(255, 215, 0, 0.1);
    }
  `}
`

const UserMenu = styled.div`
  position: relative;
`

const UserAvatar = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.gradients.goldPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: ${theme.colors.background.black};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${theme.colors.shadows.goldGlow};
  }
`

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: ${theme.colors.background.darkGray};
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 12px;
  overflow: hidden;
  min-width: 200px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`

const DropdownItem = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  text-align: left;
  color: ${theme.colors.text.lightWhite};
  background: transparent;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 215, 0, 0.1);
    color: ${theme.colors.primary.gold};
  }
`

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 4px;
  background: transparent;
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
  }

  span {
    width: 24px;
    height: 2px;
    background: ${theme.colors.primary.gold};
    transition: all 0.3s ease;
  }
`

const DropdownWrapper = styled.div`
  position: relative;
`

const DropdownTrigger = styled.button<{ active?: boolean }>`
  color: ${props => props.active
    ? theme.colors.primary.gold
    : theme.colors.text.lightWhite};
  font-weight: ${props => props.active ? '500' : '400'};
  transition: all 0.3s ease;
  position: relative;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    color: ${theme.colors.primary.gold};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: ${theme.gradients.goldPrimary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`

const DropdownContent = styled(motion.div)`
  position: absolute;
  top: calc(100% + 1rem);
  left: 0;
  background: ${theme.colors.background.darkGray};
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 12px;
  overflow: hidden;
  min-width: 200px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 1000;
`

const DropdownLink = styled(Link)`
  display: block;
  padding: 1rem 1.5rem;
  color: ${theme.colors.text.lightWhite};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 215, 0, 0.1);
    color: ${theme.colors.primary.gold};
  }
`

export const Navigation: React.FC = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showHerramientasDropdown, setShowHerramientasDropdown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => router.pathname === path

  return (
    <Nav scrolled={scrolled}>
      <NavContainer>
        <Logo href="/">
          <span>✨</span>
          <span>Academia Evolución</span>
        </Logo>

        <NavLinks>
          <NavLink href="/academia" active={isActive('/academia')}>
            Academia
          </NavLink>

          <DropdownWrapper
            onMouseEnter={() => setShowHerramientasDropdown(true)}
            onMouseLeave={() => setShowHerramientasDropdown(false)}
          >
            <DropdownTrigger active={router.pathname.startsWith('/herramientas')}>
              Herramientas
              <span style={{ fontSize: '0.7rem' }}>▼</span>
            </DropdownTrigger>

            <AnimatePresence>
              {showHerramientasDropdown && (
                <DropdownContent
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownLink href="/herramientas/cortex">
                    🧠 CORTEX
                  </DropdownLink>
                  <DropdownLink href="/herramientas/sophia">
                    👁️ Sophia
                  </DropdownLink>
                </DropdownContent>
              )}
            </AnimatePresence>
          </DropdownWrapper>

          <NavLink href="/empresas" active={isActive('/empresas')}>
            Para Empresas
          </NavLink>
          <NavLink href="/nosotros" active={isActive('/nosotros')}>
            Nosotros
          </NavLink>
          <NavLink href="/inscripcion" active={isActive('/inscripcion')}>
            Inscripción
          </NavLink>
        </NavLinks>

        <AuthButtons>
          {user ? (
            <UserMenu>
              <UserAvatar onClick={() => setShowUserMenu(!showUserMenu)}>
                {user.name.charAt(0).toUpperCase()}
              </UserAvatar>
              
              <AnimatePresence>
                {showUserMenu && (
                  <DropdownMenu
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownItem onClick={() => router.push('/portal')}>
                      Mi Portal
                    </DropdownItem>
                    <DropdownItem onClick={() => router.push('/portal/perfil')}>
                      Mi Perfil
                    </DropdownItem>
                    <DropdownItem onClick={() => router.push('/portal/libro')}>
                      Mi Libro
                    </DropdownItem>
                    <DropdownItem onClick={logout}>
                      Cerrar Sesión
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </AnimatePresence>
            </UserMenu>
          ) : (
            <>
              <Button variant="secondary" onClick={() => router.push('/login')}>
                Iniciar Sesión
              </Button>
              <Button variant="primary" onClick={() => router.push('/inscripcion')}>
                Iniciar Journey
              </Button>
            </>
          )}
          
          <MobileMenuButton onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <span />
            <span />
            <span />
          </MobileMenuButton>
        </AuthButtons>
      </NavContainer>
    </Nav>
  )
}