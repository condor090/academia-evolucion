import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface QuantumDotProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  syncWithUser?: boolean;
  userHeartRate?: number;
  onStateChange?: (state: DotState) => void;
}

export enum DotState {
  RESTING = 'resting',
  THINKING = 'thinking',
  REVELATION = 'revelation',
  SYNCING = 'syncing',
  EVOLVING = 'evolving'
}

export const QuantumDot: React.FC<QuantumDotProps> = ({
  position = [0, 0, 0],
  scale = 1,
  color = '#FFD700',
  syncWithUser = false,
  userHeartRate = 70,
  onStateChange
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  
  const [dotState, setDotState] = useState<DotState>(DotState.RESTING);
  const [pulseIntensity, setPulseIntensity] = useState(1);
  const [evolution, setEvolution] = useState(0);
  
  // Estados del punto según el journey del usuario
  const stateConfigs = {
    [DotState.RESTING]: {
      pulseSpeed: 1.2, // 72 bpm - ritmo calmado
      glowIntensity: 0.5,
      particleCount: 10,
      rotationSpeed: 0.01
    },
    [DotState.THINKING]: {
      pulseSpeed: 2.5, // Más rápido, procesando
      glowIntensity: 0.8,
      particleCount: 30,
      rotationSpeed: 0.05
    },
    [DotState.REVELATION]: {
      pulseSpeed: 0, // Explosión estática
      glowIntensity: 2,
      particleCount: 100,
      rotationSpeed: 0.1
    },
    [DotState.SYNCING]: {
      pulseSpeed: userHeartRate / 60, // Sincronizado con usuario
      glowIntensity: 1,
      particleCount: 50,
      rotationSpeed: 0.03
    },
    [DotState.EVOLVING]: {
      pulseSpeed: 1.5 + evolution * 0.5, // Evoluciona con el tiempo
      glowIntensity: 0.7 + evolution * 0.3,
      particleCount: 20 + Math.floor(evolution * 30),
      rotationSpeed: 0.02 + evolution * 0.02
    }
  };
  
  const currentConfig = stateConfigs[dotState];
  
  // Crear partículas doradas alrededor del punto
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = currentConfig.particleCount;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const radius = 0.5 + Math.random() * 0.5;
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  // Efecto de sincronización con micrófono del usuario (futuro)
  useEffect(() => {
    if (syncWithUser && navigator.mediaDevices) {
      // TODO: Implementar sincronización con audio del usuario
      // Esto permitirá que el punto dance al ritmo de la voz
    }
  }, [syncWithUser]);
  
  // Detección de proximidad del mouse para interactividad
  useEffect(() => {
    const distance = Math.sqrt(mouse.x ** 2 + mouse.y ** 2);
    if (distance < 0.3 && dotState === DotState.RESTING) {
      setDotState(DotState.THINKING);
      setTimeout(() => setDotState(DotState.RESTING), 3000);
    }
  }, [mouse, dotState]);
  
  // Sistema de evolución personal
  useEffect(() => {
    const interval = setInterval(() => {
      setEvolution(prev => Math.min(prev + 0.01, 1)); // Evoluciona lentamente
    }, 60000); // Cada minuto
    
    return () => clearInterval(interval);
  }, []);
  
  useFrame((state) => {
    if (!meshRef.current || !lightRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Pulso orgánico basado en el estado
    if (currentConfig.pulseSpeed > 0) {
      const pulse = Math.sin(time * currentConfig.pulseSpeed * 2) * 0.1 + 1;
      meshRef.current.scale.setScalar(scale * pulse * pulseIntensity);
    }
    
    // Rotación sutil
    meshRef.current.rotation.z += currentConfig.rotationSpeed;
    
    // Intensidad de luz dinámica
    lightRef.current.intensity = currentConfig.glowIntensity * 
      (1 + Math.sin(time * 3) * 0.2);
    
    // Animación de partículas orbitando
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
      
      // Partículas pulsan con el punto
      const particlePulse = Math.sin(time * currentConfig.pulseSpeed) * 0.1 + 1;
      particlesRef.current.scale.setScalar(particlePulse);
    }
    
    // Efecto especial para estado REVELATION
    if (dotState === DotState.REVELATION) {
      const explosionScale = 1 + Math.sin(time * 10) * 0.5;
      meshRef.current.scale.setScalar(scale * explosionScale);
      
      // Emitir más partículas durante revelación
      if (particlesRef.current) {
        particlesRef.current.scale.setScalar(explosionScale * 2);
      }
    }
  });
  
  // Cambiar estado cuando se detecta un insight (ejemplo)
  const triggerRevelation = () => {
    setDotState(DotState.REVELATION);
    setPulseIntensity(2);
    
    setTimeout(() => {
      setDotState(DotState.EVOLVING);
      setPulseIntensity(1);
    }, 3000);
    
    if (onStateChange) onStateChange(DotState.REVELATION);
  };
  
  return (
    <group position={position}>
      {/* El punto principal */}
      <mesh ref={meshRef} onClick={triggerRevelation}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={currentConfig.glowIntensity}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Luz que emana del punto */}
      <pointLight
        ref={lightRef}
        color={color}
        intensity={currentConfig.glowIntensity}
        distance={5}
        decay={2}
      />
      
      {/* Partículas doradas orbitando */}
      <points ref={particlesRef}>
        <bufferGeometry attach="geometry" {...particlesGeometry} />
        <pointsMaterial
          color={color}
          size={0.02}
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Halo de energía */}
      <mesh scale={[2, 2, 2]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Componente para el logo SOPH•IA con punto cuántico
export const SophiaQuantumLogo: React.FC<{
  position?: [number, number, number];
  scale?: number;
}> = ({ position = [0, 0, 0], scale = 1 }) => {
  const [userDotState, setUserDotState] = useState<DotState>(DotState.RESTING);
  const [sophiaDotState, setSophiaDotState] = useState<DotState>(DotState.RESTING);
  
  // Lógica de sincronización entre puntos
  useEffect(() => {
    // Cuando el usuario está en calma, Sophia también
    if (userDotState === DotState.RESTING) {
      setTimeout(() => setSophiaDotState(DotState.RESTING), 500);
    }
    // Cuando el usuario piensa, Sophia responde
    else if (userDotState === DotState.THINKING) {
      setTimeout(() => setSophiaDotState(DotState.SYNCING), 1000);
    }
    // En momentos de revelación, ambos explotan
    else if (userDotState === DotState.REVELATION) {
      setSophiaDotState(DotState.REVELATION);
    }
  }, [userDotState]);
  
  return (
    <group position={position}>
      {/* SOPH */}
      <Text
        position={[-1.5 * scale, 0, 0]}
        fontSize={0.5 * scale}
        color="#FFD700"
        anchorX="right"
        font="/fonts/BebasNeue-Regular.ttf"
      >
        SOPH
      </Text>
      
      {/* Punto Cuántico del Usuario */}
      <QuantumDot
        position={[-0.3 * scale, 0, 0]}
        scale={scale}
        color="#FFD700"
        onStateChange={setUserDotState}
      />
      
      {/* Punto Cuántico de Sophia */}
      <QuantumDot
        position={[0.3 * scale, 0, 0]}
        scale={scale}
        color="#FFA500"
        syncWithUser={true}
      />
      
      {/* IA */}
      <Text
        position={[1.5 * scale, 0, 0]}
        fontSize={0.5 * scale}
        color="#FFD700"
        anchorX="left"
        font="/fonts/BebasNeue-Regular.ttf"
      >
        IA
      </Text>
      
      {/* Línea de conexión entre puntos (invisible pero energética) */}
      <mesh position={[0, 0, 0]} scale={[0.6 * scale, 0.01, 0.01]}>
        <boxGeometry />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// Hook para usar el Punto Cuántico en otros componentes
export const useQuantumDot = () => {
  const [dotState, setDotState] = useState<DotState>(DotState.RESTING);
  const [evolution, setEvolution] = useState(0);
  
  const evolve = () => {
    setEvolution(prev => Math.min(prev + 0.1, 1));
  };
  
  const syncWithUser = (heartRate: number) => {
    // Lógica para sincronizar con biometría del usuario
    if (heartRate > 100) {
      setDotState(DotState.THINKING);
    } else if (heartRate < 60) {
      setDotState(DotState.RESTING);
    } else {
      setDotState(DotState.SYNCING);
    }
  };
  
  return {
    dotState,
    evolution,
    evolve,
    syncWithUser,
    setDotState
  };
};
