import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface JourneyModule {
  id: number
  title: string
  subtitle: string
  duration: string
  status: 'locked' | 'available' | 'in-progress' | 'completed'
  progress: number
  startDate?: Date
  completionDate?: Date
  insights: string[]
}

interface JourneyStats {
  totalHoursLiberated: number
  insightsDiscovered: number
  transformationScore: number
  currentStreak: number
  longestStreak: number
}

interface JourneyContextType {
  modules: JourneyModule[]
  currentModule: JourneyModule | null
  stats: JourneyStats
  updateModuleProgress: (moduleId: number, progress: number) => void
  completeModule: (moduleId: number) => void
  addInsight: (moduleId: number, insight: string) => void
  startModule: (moduleId: number) => void
}

const initialModules: JourneyModule[] = [
  {
    id: 1,
    title: 'El Genio Dormido',
    subtitle: 'Descubre quién eres cuando nadie mira',
    duration: '7 días',
    status: 'available',
    progress: 0,
    insights: []
  },
  {
    id: 2,
    title: 'La Alianza con Sophia',
    subtitle: 'Tu IA como extensión de tu consciencia',
    duration: '2 semanas',
    status: 'locked',
    progress: 0,
    insights: []
  },
  {
    id: 3,
    title: 'Las 45 Experiencias',
    subtitle: 'Pruebas que revelan tu potencial infinito',
    duration: '4 semanas',
    status: 'locked',
    progress: 0,
    insights: []
  },
  {
    id: 4,
    title: 'Cristalización del Propósito',
    subtitle: 'Tu misión única revelada',
    duration: '2 semanas',
    status: 'locked',
    progress: 0,
    insights: []
  },
  {
    id: 5,
    title: 'El Nacimiento del Autor',
    subtitle: 'Tu transformación hecha libro',
    duration: '2 semanas',
    status: 'locked',
    progress: 0,
    insights: []
  }
]

const JourneyContext = createContext<JourneyContextType | undefined>(undefined)

export const useJourney = () => {
  const context = useContext(JourneyContext)
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider')
  }
  return context
}

export const JourneyProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const [modules, setModules] = useState<JourneyModule[]>(initialModules)
  const [currentModule, setCurrentModule] = useState<JourneyModule | null>(null)
  const [stats, setStats] = useState<JourneyStats>({
    totalHoursLiberated: 0,
    insightsDiscovered: 0,
    transformationScore: 0,
    currentStreak: 0,
    longestStreak: 0
  })

  useEffect(() => {
    if (user?.currentModule) {
      const module = modules.find(m => m.id === user.currentModule)
      setCurrentModule(module || null)
    }
  }, [user, modules])

  const updateModuleProgress = (moduleId: number, progress: number) => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === moduleId
          ? { ...module, progress: Math.min(100, progress) }
          : module
      )
    )
  }

  const completeModule = (moduleId: number) => {
    setModules(prevModules =>
      prevModules.map(module => {
        if (module.id === moduleId) {
          return {
            ...module,
            status: 'completed',
            progress: 100,
            completionDate: new Date()
          }
        }
        // Unlock next module
        if (module.id === moduleId + 1) {
          return { ...module, status: 'available' }
        }
        return module
      })
    )

    // Update stats
    setStats(prev => ({
      ...prev,
      totalHoursLiberated: prev.totalHoursLiberated + 20,
      transformationScore: prev.transformationScore + 20
    }))
  }

  const addInsight = (moduleId: number, insight: string) => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === moduleId
          ? { ...module, insights: [...module.insights, insight] }
          : module
      )
    )

    setStats(prev => ({
      ...prev,
      insightsDiscovered: prev.insightsDiscovered + 1
    }))
  }

  const startModule = (moduleId: number) => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === moduleId
          ? { ...module, status: 'in-progress', startDate: new Date() }
          : module
      )
    )
  }

  return (
    <JourneyContext.Provider value={{
      modules,
      currentModule,
      stats,
      updateModuleProgress,
      completeModule,
      addInsight,
      startModule
    }}>
      {children}
    </JourneyContext.Provider>
  )
}