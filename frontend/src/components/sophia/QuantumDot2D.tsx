import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/styles/theme';

// Estados del punto
export enum DotState {
  RESTING = 'resting',
  THINKING = 'thinking',
  REVELATION = 'revelation',
  SYNCING = 'syncing',
  EVOLVING = 'evolving'
}

// Componente del Punto Cuántico
const QuantumDotContainer = styled(motion.div)`
  position: relative;
  display: inline-block;
  margin: 0 0.5em;
`;

const DotCore = styled(motion.div)<{ state: DotState }>`
  width: 12px;
  height: 12px;
  background: ${theme.gradients.goldPrimary};
  border-radius: 50%;
  position: relative;
  box-shadow: ${props => {
    switch (props.state) {
      case DotState.REVELATION:
        return '0 0 30px rgba(255, 215, 0, 0.9), 0 0 60px rgba(255, 215, 0, 0.6)';
      case DotState.THINKING:
        return '0 0 20px rgba(255, 215, 0, 0.7), 0 0 40px rgba(255, 215, 0, 0.4)';
      default:
        return '0 0 15px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.3)';
    }
  }};
`;

const DotHalo = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
`;

const DotParticle = styled(motion.div)`
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(255, 215, 0, 0.8);
  border-radius: 50%;
  pointer-events: none;
`;

interface QuantumDotProps {
  state?: DotState;
  syncWithUser?: boolean;
  onStateChange?: (state: DotState) => void;
}

export const QuantumDot: React.FC<QuantumDotProps> = ({
  state = DotState.RESTING,
  syncWithUser = false,
  onStateChange
}) => {
  const [particleCount, setParticleCount] = useState(0);
  
  // Configuración según estado
  const stateConfigs = {
    [DotState.RESTING]: {
      pulseScale: [1, 1.2, 1],
      pulseDuration: 2,
      particleEmission: 0.1
    },
    [DotState.THINKING]: {
      pulseScale: [1, 1.3, 1],
      pulseDuration: 1.5,
      particleEmission: 0.3
    },
    [DotState.REVELATION]: {
      pulseScale: [1, 2, 1],
      pulseDuration: 0.5,
      particleEmission: 1
    },
    [DotState.SYNCING]: {
      pulseScale: [1, 1.15, 1],
      pulseDuration: 1.8,
      particleEmission: 0.5
    },
    [DotState.EVOLVING]: {
      pulseScale: [1, 1.25, 1.1, 1],
      pulseDuration: 3,
      particleEmission: 0.2
    }
  };
  
  const config = stateConfigs[state];
  
  // Emitir partículas según el estado
  useEffect(() => {
    if (config.particleEmission > Math.random()) {
      setParticleCount(prev => prev + 1);
      const timer = setTimeout(() => {
        setParticleCount(prev => Math.max(0, prev - 1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state, config.particleEmission]);
  
  const handleClick = () => {
    if (state === DotState.RESTING) {
      onStateChange?.(DotState.THINKING);
      setTimeout(() => onStateChange?.(DotState.REVELATION), 2000);
      setTimeout(() => onStateChange?.(DotState.EVOLVING), 4000);
      setTimeout(() => onStateChange?.(DotState.RESTING), 6000);
    }
  };
  
  return (
    <QuantumDotContainer onClick={handleClick}>
      {/* Halo de energía */}
      <DotHalo
        animate={{
          scale: config.pulseScale,
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: config.pulseDuration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Núcleo del punto */}
      <DotCore
        state={state}
        animate={{
          scale: config.pulseScale,
        }}
        transition={{
          duration: config.pulseDuration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.3 }}
        style={{ cursor: 'pointer' }}
      />
      
      {/* Partículas emitidas */}
      <AnimatePresence>
        {Array.from({ length: Math.min(particleCount, 10) }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.5;
          const distance = 30 + Math.random() * 20;
          
          return (
            <DotParticle
              key={`particle-${i}-${Date.now()}`}
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 1,
                scale: 0
              }}
              animate={{ 
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                scale: [0, 1, 0.5]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2 + Math.random(),
                ease: "easeOut"
              }}
              style={{
                left: '6px',
                top: '6px'
              }}
            />
          );
        })}
      </AnimatePresence>
    </QuantumDotContainer>
  );
};

// Logo con punto cuántico integrado
const LogoContainer = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.2em;
  position: relative;
`;

const LogoText = styled.span<{ variant: 'soph' | 'ia' }>`
  font-family: ${theme.fonts.display};
  font-size: inherit;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${theme.gradients.goldPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.5));
`;

const ConnectionLine = styled(motion.div)`
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 215, 0, 0.3) 20%,
    rgba(255, 215, 0, 0.5) 50%,
    rgba(255, 215, 0, 0.3) 80%,
    transparent 100%
  );
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

interface SophiaQuantumLogoProps {
  userDotState?: DotState;
  sophiaDotState?: DotState;
  onUserStateChange?: (state: DotState) => void;
  onSophiaStateChange?: (state: DotState) => void;
  showConnection?: boolean;
}

export const SophiaQuantumLogo: React.FC<SophiaQuantumLogoProps> = ({
  userDotState = DotState.RESTING,
  sophiaDotState = DotState.RESTING,
  onUserStateChange,
  onSophiaStateChange,
  showConnection = true
}) => {
  const [isConnected, setIsConnected] = useState(false);
  
  // Sincronización entre puntos
  useEffect(() => {
    if (userDotState === DotState.THINKING) {
      setTimeout(() => {
        onSophiaStateChange?.(DotState.SYNCING);
        setIsConnected(true);
      }, 500);
    } else if (userDotState === DotState.REVELATION) {
      onSophiaStateChange?.(DotState.REVELATION);
      setIsConnected(true);
    } else if (userDotState === DotState.RESTING) {
      setTimeout(() => {
        onSophiaStateChange?.(DotState.RESTING);
        setIsConnected(false);
      }, 1000);
    }
  }, [userDotState, onSophiaStateChange]);
  
  return (
    <LogoContainer>
      <LogoText variant="soph">SOPH</LogoText>
      
      <QuantumDot 
        state={userDotState}
        onStateChange={onUserStateChange}
      />
      
      <LogoText variant="ia">IA</LogoText>
    </LogoContainer>
  );
};

// Versión simple con un solo punto estático (bullet)
const SimpleDot = styled.span`
  color: ${theme.colors.primary.gold};
  margin: 0 0.1em;
  font-size: 0.8em;
  filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.5));
`;

export const SophiaSimpleLogo: React.FC = () => {
  return (
    <LogoContainer>
      <LogoText variant="soph">SOPH</LogoText>
      <SimpleDot>•</SimpleDot>
      <LogoText variant="ia">IA</LogoText>
    </LogoContainer>
  );
};

// Hook para controlar el estado del punto
export const useQuantumDot = (initialState: DotState = DotState.RESTING) => {
  const [dotState, setDotState] = useState<DotState>(initialState);
  const [evolution, setEvolution] = useState(0);
  
  const evolve = () => {
    setEvolution(prev => Math.min(prev + 0.1, 1));
    if (evolution > 0.5) {
      setDotState(DotState.EVOLVING);
    }
  };
  
  const triggerThinking = () => {
    setDotState(DotState.THINKING);
  };
  
  const triggerRevelation = () => {
    setDotState(DotState.REVELATION);
    setTimeout(() => setDotState(DotState.EVOLVING), 3000);
  };
  
  const reset = () => {
    setDotState(DotState.RESTING);
    setEvolution(0);
  };
  
  return {
    dotState,
    setDotState,
    evolution,
    evolve,
    triggerThinking,
    triggerRevelation,
    reset
  };
};
