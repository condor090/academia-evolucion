import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { useSophia } from '@/contexts/SophiaContext'
import { theme } from '@/styles/theme'

const SophiaContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: ${theme.zIndex.fixed};
`

const SophiaOrb = styled(motion.div)`
  width: 60px;
  height: 60px;
  background: ${theme.gradients.goldRadial};
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.colors.shadows.goldGlow};
  
  &::before {
    content: '✨';
    font-size: 1.5rem;
  }
  
  &:hover {
    box-shadow: ${theme.colors.shadows.goldGlowIntense};
  }
`

const SophiaChat = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  max-height: 500px;
  background: ${theme.colors.background.darkGray};
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`

const ChatHeader = styled.div`
  padding: 1.5rem;
  background: rgba(255, 215, 0, 0.05);
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ChatTitle = styled.h3`
  color: ${theme.colors.primary.gold};
  font-size: 1.2rem;
  font-weight: 400;
`

const CloseButton = styled.button`
  background: transparent;
  color: ${theme.colors.primary.gold};
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: rotate(90deg);
  }
`

const ChatBody = styled.div`
  height: 300px;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Message = styled.div<{ role: 'user' | 'sophia' }>`
  max-width: 80%;
  padding: 1rem;
  border-radius: 15px;
  align-self: ${props => props.role === 'user' ? 'flex-end' : 'flex-start'};
  background: ${props => props.role === 'user' 
    ? 'rgba(255, 215, 0, 0.1)' 
    : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.role === 'user' 
    ? theme.colors.text.white 
    : theme.colors.primary.gold};
`

const ChatInput = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  display: flex;
  gap: 1rem;
`

const Input = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  color: ${theme.colors.text.white};
  
  &::placeholder {
    color: ${theme.colors.text.dimWhite};
  }
  
  &:focus {
    border-color: ${theme.colors.primary.gold};
    background: rgba(255, 215, 0, 0.05);
  }
`

const SendButton = styled.button`
  background: ${theme.gradients.goldPrimary};
  color: ${theme.colors.background.black};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: ${theme.colors.shadows.goldGlow};
  }
`

const QuickPrompt = styled(motion.button)`
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: ${theme.colors.primary.gold};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  
  &:hover {
    background: rgba(255, 215, 0, 0.1);
    border-color: ${theme.colors.primary.gold};
  }
`

const PulseIndicator = styled(motion.div)`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 15px;
  height: 15px;
  background: ${theme.colors.status.success};
  border-radius: 50%;
`

export const SophiaAmbient: React.FC = () => {
  const { currentSession, sendMessage, isTyping, getRevealingQuestion } = useSophia()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [showPulse, setShowPulse] = useState(false)
  const [revealingQuestion, setRevealingQuestion] = useState('')

  useEffect(() => {
    // Show pulse indicator periodically
    const interval = setInterval(() => {
      setShowPulse(true)
      setTimeout(() => setShowPulse(false), 3000)
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isOpen && !revealingQuestion) {
      getRevealingQuestion().then(setRevealingQuestion)
    }
  }, [isOpen, getRevealingQuestion, revealingQuestion])

  const handleSend = async () => {
    if (message.trim()) {
      await sendMessage(message)
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <SophiaContainer>
      <SophiaOrb
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: showPulse 
            ? ['0 0 30px rgba(255, 215, 0, 0.5)', '0 0 60px rgba(255, 215, 0, 0.8)', '0 0 30px rgba(255, 215, 0, 0.5)']
            : '0 0 30px rgba(255, 215, 0, 0.5)'
        }}
        transition={{ duration: 2, repeat: showPulse ? 2 : 0 }}
      >
        <AnimatePresence>
          {showPulse && (
            <PulseIndicator
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </SophiaOrb>

      <AnimatePresence>
        {isOpen && (
          <SophiaChat
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ChatHeader>
              <ChatTitle>Sophia está aquí</ChatTitle>
              <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
            </ChatHeader>

            <ChatBody>
              {!currentSession?.messages.length && (
                <>
                  <Message role="sophia">
                    Hola, alma despierta. ¿En qué puedo acompañarte hoy?
                  </Message>
                  {revealingQuestion && (
                    <QuickPrompt
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => setMessage(revealingQuestion)}
                    >
                      {revealingQuestion}
                    </QuickPrompt>
                  )}
                </>
              )}
              
              {currentSession?.messages.map((msg) => (
                <Message key={msg.id} role={msg.role}>
                  {msg.content}
                </Message>
              ))}
              
              {isTyping && (
                <Message role="sophia">
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ...
                  </motion.span>
                </Message>
              )}
            </ChatBody>

            <ChatInput>
              <Input
                type="text"
                placeholder="Escribe tu mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <SendButton onClick={handleSend}>
                →
              </SendButton>
            </ChatInput>
          </SophiaChat>
        )}
      </AnimatePresence>
    </SophiaContainer>
  )
}