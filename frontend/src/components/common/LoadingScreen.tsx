import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${theme.colors.background.black};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`

const LoadingContent = styled.div`
  text-align: center;
`

const LoadingSophia = styled(motion.div)`
  width: 100px;
  height: 100px;
  margin: 0 auto 2rem;
  background: radial-gradient(circle, ${theme.colors.primary.gold} 0%, transparent 70%);
  border-radius: 50%;
`

const LoadingText = styled(motion.p)`
  font-size: 1.5rem;
  color: ${theme.colors.primary.gold};
  font-style: italic;
`

export const LoadingScreen: React.FC = () => {
  return (
    <LoadingOverlay
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <LoadingContent>
        <LoadingSophia
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <LoadingText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Sophia está preparando tu despertar...
        </LoadingText>
      </LoadingContent>
    </LoadingOverlay>
  )
}