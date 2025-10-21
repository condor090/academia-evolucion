import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/styles/theme';
import { DotState, QuantumDot } from './QuantumDot2D';

const FloatingContainer = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: rgba(0, 0, 0, 0.8);
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  border: 1px solid rgba(255, 215, 0, 0.3);
  backdrop-filter: blur(10px);
  cursor: pointer;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    bottom: 20px;
    right: 20px;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

const Label = styled.span`
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.sm};
  font-weight: 300;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.8;
`;

const StateLabel = styled(motion.span)`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-left: ${theme.spacing.xs};
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: ${theme.spacing.sm};
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  min-width: 250px;
  backdrop-filter: blur(10px);
  pointer-events: none;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 30px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgba(255, 215, 0, 0.3);
  }
`;

const TooltipTitle = styled.h4`
  color: ${theme.colors.primary.gold};
  font-size: ${theme.fontSizes.base};
  margin-bottom: ${theme.spacing.xs};
`;

const TooltipText = styled.p`
  color: ${theme.colors.text.lightWhite};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.5;
  margin: 0;
`;

interface FloatingQuantumDotProps {
  userState: DotState;
  sophiaState: DotState;
  onUserStateChange?: (state: DotState) => void;
  onSophiaStateChange?: (state: DotState) => void;
}

export const FloatingQuantumDot: React.FC<FloatingQuantumDotProps> = ({
  userState,
  sophiaState,
  onUserStateChange,
  onSophiaStateChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Mostrar tooltip la primera vez
  useEffect(() => {
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 5000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);
  
  const getStateLabel = (state: DotState) => {
    switch (state) {
      case DotState.RESTING:
        return 'En reposo';
      case DotState.THINKING:
        return 'Pensando';
      case DotState.REVELATION:
        return '¡Revelación!';
      case DotState.SYNCING:
        return 'Sincronizando';
      case DotState.EVOLVING:
        return 'Evolucionando';
      default:
        return '';
    }
  };
  
  const getTooltipContent = () => {
    switch (userState) {
      case DotState.RESTING:
        return {
          title: 'Tu punto está en calma',
          text: 'Haz clic para iniciar una interacción con Sophia'
        };
      case DotState.THINKING:
        return {
          title: 'Estás procesando',
          text: 'Sophia está sincronizándose con tu estado'
        };
      case DotState.REVELATION:
        return {
          title: '¡Momento de insight!',
          text: 'Has alcanzado un breakthrough con Sophia'
        };
      case DotState.SYNCING:
        return {
          title: 'Sincronización activa',
          text: 'Tú y Sophia están en perfecta armonía'
        };
      case DotState.EVOLVING:
        return {
          title: 'Evolución en progreso',
          text: 'Tu conexión con Sophia se fortalece'
        };
      default:
        return {
          title: '',
          text: ''
        };
    }
  };
  
  const handleClick = () => {
    setHasInteracted(true);
    setIsExpanded(!isExpanded);
    
    // Ciclo de estados al hacer clic
    if (userState === DotState.RESTING) {
      onUserStateChange?.(DotState.THINKING);
    } else if (userState === DotState.THINKING) {
      onUserStateChange?.(DotState.REVELATION);
    } else {
      onUserStateChange?.(DotState.RESTING);
    }
  };
  
  const tooltipContent = getTooltipContent();
  
  return (
    <FloatingContainer
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ 
        type: "spring",
        damping: 20,
        stiffness: 300
      }}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Label>Tú</Label>
      <QuantumDot state={userState} />
      
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <StateLabel>{getStateLabel(userState)}</StateLabel>
            </motion.div>
            
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{ 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm
              }}
            >
              <Label style={{ marginLeft: theme.spacing.md }}>Sophia</Label>
              <QuantumDot state={sophiaState} syncWithUser />
              <StateLabel>{getStateLabel(sophiaState)}</StateLabel>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showTooltip && (
          <Tooltip
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <TooltipTitle>{tooltipContent.title}</TooltipTitle>
            <TooltipText>{tooltipContent.text}</TooltipText>
          </Tooltip>
        )}
      </AnimatePresence>
    </FloatingContainer>
  );
};

// Hook para sincronizar con el scroll
export const useQuantumScroll = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [section, setSection] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calcular progreso de scroll (0-1)
      const progress = scrollY / (documentHeight - windowHeight);
      setScrollProgress(progress);
      
      // Determinar sección actual
      const currentSection = Math.floor((scrollY / windowHeight) + 0.5);
      setSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar una vez al inicio
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return { scrollProgress, section };
};
