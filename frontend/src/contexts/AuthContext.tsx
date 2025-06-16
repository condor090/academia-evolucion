import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  membershipType: 'despertar' | 'metamorfosis' | 'infinito'
  journeyStartDate?: Date
  currentModule?: number
  completedModules: number[]
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

interface RegisterData {
  email: string
  password: string
  name: string
  membershipType: 'despertar' | 'metamorfosis' | 'infinito'
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Simulated auth check
    const checkAuth = async () => {
      setLoading(true)
      try {
        // In a real app, this would validate the token
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simulated login - in production this would call an API
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        membershipType: 'despertar',
        completedModules: []
      }
      
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
      
      console.log('¡Bienvenido de vuelta a tu journey!')
      router.push('/portal')
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      throw error
    }
  }

  const register = async (data: RegisterData) => {
    try {
      // Simulated registration
      const mockUser: User = {
        id: '1',
        email: data.email,
        name: data.name,
        membershipType: data.membershipType,
        journeyStartDate: new Date(),
        currentModule: 1,
        completedModules: []
      }
      
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
      
      console.log('¡Tu journey de transformación comienza ahora!')
      router.push('/portal/onboarding')
    } catch (error) {
      console.error('Error al registrarse:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    console.log('Hasta pronto, que tu genio siga despierto')
    router.push('/')
  }

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}