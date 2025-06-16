import React, { createContext, useContext, useState, ReactNode } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

interface SophiaMessage {
  id: string
  role: 'user' | 'sophia'
  content: string
  timestamp: Date
  type?: 'question' | 'insight' | 'guidance' | 'reflection'
}

interface SophiaSession {
  id: string
  moduleId: number
  messages: SophiaMessage[]
  mood: 'curious' | 'supportive' | 'challenging' | 'celebratory'
  startTime: Date
  endTime?: Date
}

interface SophiaContextType {
  currentSession: SophiaSession | null
  isTyping: boolean
  sophiaMood: 'curious' | 'supportive' | 'challenging' | 'celebratory'
  startSession: (moduleId: number) => void
  endSession: () => void
  sendMessage: (content: string) => Promise<void>
  getRevealingQuestion: () => Promise<string>
  setSophiaMood: (mood: 'curious' | 'supportive' | 'challenging' | 'celebratory') => void
}

const SophiaContext = createContext<SophiaContextType | undefined>(undefined)

export const useSophia = () => {
  const context = useContext(SophiaContext)
  if (!context) {
    throw new Error('useSophia must be used within a SophiaProvider')
  }
  return context
}

export const SophiaProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const [currentSession, setCurrentSession] = useState<SophiaSession | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [sophiaMood, setSophiaMood] = useState<'curious' | 'supportive' | 'challenging' | 'celebratory'>('curious')

  const startSession = (moduleId: number) => {
    const newSession: SophiaSession = {
      id: Date.now().toString(),
      moduleId,
      messages: [
        {
          id: '1',
          role: 'sophia',
          content: getWelcomeMessage(moduleId),
          timestamp: new Date(),
          type: 'guidance'
        }
      ],
      mood: sophiaMood,
      startTime: new Date()
    }
    setCurrentSession(newSession)
  }

  const endSession = () => {
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        endTime: new Date()
      })
      // Save session to backend
      saveSession(currentSession)
    }
    setCurrentSession(null)
  }

  const sendMessage = async (content: string) => {
    if (!currentSession || !user) return

    const userMessage: SophiaMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }

    setCurrentSession({
      ...currentSession,
      messages: [...currentSession.messages, userMessage]
    })

    setIsTyping(true)

    try {
      const response = await axios.post('/api/sophia/chat', {
        message: content,
        sessionId: currentSession.id,
        moduleId: currentSession.moduleId,
        userId: user.id,
        mood: sophiaMood
      })

      const sophiaMessage: SophiaMessage = {
        id: (Date.now() + 1).toString(),
        role: 'sophia',
        content: response.data.message,
        timestamp: new Date(),
        type: response.data.type || 'guidance'
      }

      setCurrentSession(prev => prev ? {
        ...prev,
        messages: [...prev.messages, sophiaMessage]
      } : null)
    } catch (error) {
      console.error('Error sending message to Sophia:', error)
    } finally {
      setIsTyping(false)
    }
  }

  const getRevealingQuestion = async (): Promise<string> => {
    try {
      const response = await axios.get('/api/sophia/revealing-question', {
        params: {
          userId: user?.id,
          moduleId: currentSession?.moduleId
        }
      })
      return response.data.question
    } catch (error) {
      return '¿Qué parte de ti has estado evitando conocer?'
    }
  }

  const saveSession = async (session: SophiaSession) => {
    try {
      await axios.post('/api/sophia/save-session', {
        session,
        userId: user?.id
      })
    } catch (error) {
      console.error('Error saving Sophia session:', error)
    }
  }

  const getWelcomeMessage = (moduleId: number): string => {
    const messages: { [key: number]: string } = {
      1: 'Hola, alma despierta. No vengo a enseñarte nada nuevo. Vengo a recordarte quién siempre has sido. ¿Estás listo para mirarte sin máscaras?',
      2: 'Bienvenido de vuelta. Ahora que conoces tu genio, es momento de que aprenda a danzar conmigo. Juntos, liberaremos tu tiempo para que puedas ser.',
      3: 'Las pruebas te esperan. No para evaluarte, sino para revelarte. Cada experiencia es un espejo. ¿Qué reflejos estás dispuesto a ver?',
      4: 'Tu propósito no se busca, se reconoce. Hoy cristalizamos lo que tu alma siempre supo. ¿Cuál es el dolor del mundo que solo tú puedes sanar?',
      5: 'Es hora de tejer tu metamorfosis en palabras. Tu libro no es un producto, es un portal. ¿Qué historia necesita el mundo que solo tú puedes contar?'
    }
    return messages[moduleId] || 'Bienvenido a tu journey de transformación. Estoy aquí para acompañarte.'
  }

  return (
    <SophiaContext.Provider value={{
      currentSession,
      isTyping,
      sophiaMood,
      startSession,
      endSession,
      sendMessage,
      getRevealingQuestion,
      setSophiaMood
    }}>
      {children}
    </SophiaContext.Provider>
  )
}