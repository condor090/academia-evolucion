// Configuración de los 15 días del Módulo 1: El Encuentro Interior
// Metáfora: Navegación Mental - Barco en Travesía

export interface DiaConfig {
  numero: number
  titulo: string
  subtitulo: string
  descripcion: string
  duracion: string
  icon: string
  fase: 'explorar' | 'sentir' | 'actuar'
  insignia: string
  temas: string[]
  objetivos: string[]
}

export const diasModulo1: DiaConfig[] = [
  // FASE 1: EXPLORAR (Días 1-5) - Cartografía Mental
  {
    numero: 1,
    titulo: 'Tu Embarcación Personal',
    subtitulo: 'Cartografía de Corrientes Mentales',
    descripcion: 'Identifica las 3 corrientes mentales principales que te arrastran sin que te des cuenta. Aprende a leer los patrones que determinan tu navegación diaria.',
    duracion: '25 min',
    icon: '⛵',
    fase: 'explorar',
    insignia: 'Explorador de Mares',
    temas: [
      'Corrientes mentales recurrentes',
      'Patrones de arrastre automático',
      'Mapa personal de navegación'
    ],
    objetivos: [
      'Identificar 3 corrientes mentales principales',
      'Comprender la metáfora mente = embarcación',
      'Crear primera carta náutica personal'
    ]
  },
  {
    numero: 2,
    titulo: 'Las Voces de la Tripulación',
    subtitulo: 'Diálogos Internos y Conflictos Mentales',
    descripcion: 'Descubre las diferentes voces internas que reman en direcciones opuestas. Identifica quién habla en cada decisión y por qué.',
    duracion: '30 min',
    icon: '🗣️',
    fase: 'explorar',
    insignia: 'Intérprete de Tripulación',
    temas: [
      'Voces del Capitán vs Vigía',
      'Conflictos internos de navegación',
      'Diálogos mentales automáticos'
    ],
    objetivos: [
      'Identificar las voces dominantes en tu mente',
      'Comprender los conflictos internos',
      'Armonizar la tripulación mental'
    ]
  },
  {
    numero: 3,
    titulo: 'Tormentas como Vientos Favorables',
    subtitulo: 'Transformación de Defectos en Fortalezas',
    descripcion: 'Aprende a reorientar tus "defectos" como el perfeccionismo o la impaciencia en vientos que impulsan tu embarcación hacia el destino correcto.',
    duracion: '35 min',
    icon: '🌊',
    fase: 'explorar',
    insignia: 'Domador de Corrientes',
    temas: [
      'Perfeccionismo como atención al detalle',
      'Impaciencia como urgencia saludable',
      'Reorientación de tormentas'
    ],
    objetivos: [
      'Identificar 3 tormentas personales',
      'Transformar cada una en viento favorable',
      'Calibrar intensidad óptima'
    ]
  },
  {
    numero: 4,
    titulo: 'Tu Estilo de Navegación Dominante',
    subtitulo: 'Personalidad y Patrones de Decisión',
    descripcion: 'Descubre tu estilo único de navegación mental: ¿Eres explorador audaz, capitán calculador, o navegante intuitivo?',
    duracion: '40 min',
    icon: '🧭',
    fase: 'explorar',
    insignia: 'Maestro Cartógrafo',
    temas: [
      'Estilos de navegación personal',
      'Fortalezas de tu estilo',
      'Zonas ciegas a vigilar'
    ],
    objetivos: [
      'Identificar tu estilo de navegación dominante',
      'Comprender fortalezas y limitaciones',
      'Optimizar tu estilo personal'
    ]
  },
  {
    numero: 5,
    titulo: 'Tu Manual de Navegante Maestro',
    subtitulo: 'Integración de la Fase Exploración',
    descripcion: 'Consolida todo lo aprendido en tu manual personal de navegación. Cierre de la Fase 1: EXPLORAR.',
    duracion: '45 min',
    icon: '📖',
    fase: 'explorar',
    insignia: 'Maestro Explorador',
    temas: [
      'Síntesis de corrientes identificadas',
      'Manual personal de navegación',
      'Preparación para Fase 2'
    ],
    objetivos: [
      'Crear manual completo de navegación personal',
      'Integrar aprendizajes Días 1-5',
      'Prepararse para calibración emocional'
    ]
  },

  // FASE 2: SENTIR (Días 6-10) - Calibración Emocional
  {
    numero: 6,
    titulo: 'Mareas Emocionales',
    subtitulo: 'Mapeo del Clima Interior',
    descripcion: 'Aprende a leer las mareas emocionales que afectan tu navegación. Identifica los climas internos que determinan tus decisiones.',
    duracion: '30 min',
    icon: '🌊',
    fase: 'sentir',
    insignia: 'Lector de Mareas',
    temas: [
      'Ciclos emocionales personales',
      'Climas mentales predominantes',
      'Anticipación de tempestades'
    ],
    objetivos: [
      'Mapear tus ciclos emocionales',
      'Identificar climas mentales',
      'Crear pronóstico emocional personal'
    ]
  },
  {
    numero: 7,
    titulo: 'Corrientes de Transformación',
    subtitulo: 'El Espacio Entre Estímulo y Respuesta',
    descripcion: 'Descubre el poder del espacio entre la ola que te golpea y tu respuesta. La libertad de navegación más profunda que existe.',
    duracion: '35 min',
    icon: '⚡',
    fase: 'sentir',
    insignia: 'Navegante de Tormentas',
    temas: [
      'Espacio estímulo-respuesta',
      'Libertad de navegación',
      'Control en medio del caos'
    ],
    objetivos: [
      'Identificar tu espacio de libertad',
      'Expandir tiempo de respuesta',
      'Navegar conscientemente en tormentas'
    ]
  },
  {
    numero: 8,
    titulo: 'Barómetro de Navegación Emocional',
    subtitulo: 'Lectura Precisa del Clima Interior',
    descripcion: 'Calibra tu barómetro personal para anticipar tormentas emocionales antes de que desestabilicen tu embarcación.',
    duracion: '40 min',
    icon: '🌡️',
    fase: 'sentir',
    insignia: 'Cazador de Horizontes',
    temas: [
      'Señales tempranas de tormenta',
      'Calibración del barómetro personal',
      'Anticipación vs Reacción'
    ],
    objetivos: [
      'Calibrar barómetro emocional personal',
      'Identificar señales de advertencia',
      'Crear sistema de alerta temprana'
    ]
  },
  {
    numero: 9,
    titulo: 'Tu Talento Único de Navegación',
    subtitulo: 'Descubre Tu Superpoder Emocional',
    descripcion: 'Identifica el talento emocional único que hace que tu embarcación navegue diferente. Tu ventaja competitiva en el océano de la vida.',
    duracion: '45 min',
    icon: '💫',
    fase: 'sentir',
    insignia: 'Seguidor de Estrellas',
    temas: [
      'Talento emocional dominante',
      'Aplicación estratégica',
      'Cultivo de tu superpoder'
    ],
    objetivos: [
      'Identificar tu talento emocional único',
      'Comprender cómo usarlo estratégicamente',
      'Diseñar plan de cultivo'
    ]
  },
  {
    numero: 10,
    titulo: 'Tablero del Capitán 2.0',
    subtitulo: 'Panel de Control Emocional Completo',
    descripcion: 'Integra todos los instrumentos de navegación emocional en tu tablero personal. Cierre de la Fase 2: SENTIR.',
    duracion: '50 min',
    icon: '🎛️',
    fase: 'sentir',
    insignia: 'Maestro del Sentir',
    temas: [
      'Panel de control integrado',
      'KPIs emocionales personales',
      'Sistema de navegación completo'
    ],
    objetivos: [
      'Crear tablero de capitán personalizado',
      'Integrar todos los instrumentos emocionales',
      'Prepararse para la acción'
    ]
  },

  // FASE 3: ACTUAR (Días 11-15) - Motor de Decisión
  {
    numero: 11,
    titulo: 'Brújula Auténtica',
    subtitulo: 'Tus Valores Como Norte Verdadero',
    descripcion: 'Calibra tu brújula personal basada en valores reales, no impuestos. Define tu norte verdadero para toda navegación futura.',
    duracion: '40 min',
    icon: '🧭',
    fase: 'actuar',
    insignia: 'Capitán del Corazón',
    temas: [
      'Valores auténticos vs impuestos',
      'Norte verdadero personal',
      'Brújula moral calibrada'
    ],
    objetivos: [
      'Identificar valores auténticos',
      'Definir norte verdadero personal',
      'Calibrar brújula de decisiones'
    ]
  },
  {
    numero: 12,
    titulo: 'Navegando Entre Arrecifes Traicioneros',
    subtitulo: 'Obstáculos y Estrategias de Navegación',
    descripcion: 'Identifica los arrecifes ocultos que han naufragado tus intentos previos. Aprende a navegarlos con maestría.',
    duracion: '45 min',
    icon: '⚠️',
    fase: 'actuar',
    insignia: 'Navegante Certero',
    temas: [
      'Arrecifes personales recurrentes',
      'Estrategias de navegación segura',
      'Mapeo de zonas peligrosas'
    ],
    objetivos: [
      'Mapear tus arrecifes personales',
      'Diseñar rutas seguras',
      'Crear planes de contingencia'
    ]
  },
  {
    numero: 13,
    titulo: 'Descubre Tus Vientos Personales',
    subtitulo: 'Motivaciones Que Te Impulsan',
    descripcion: 'Identifica los vientos que realmente mueven tu embarcación. No los que "deberían", sino los que SÍ lo hacen.',
    duracion: '40 min',
    icon: '💨',
    fase: 'actuar',
    insignia: 'Vencedor de Tempestades',
    temas: [
      'Motivaciones auténticas',
      'Vientos vs deberías',
      'Impulso sostenible'
    ],
    objetivos: [
      'Identificar vientos personales reales',
      'Diferenciar de motivaciones impuestas',
      'Diseñar sistema de propulsión sostenible'
    ]
  },
  {
    numero: 14,
    titulo: 'Tu Carta de Navegación Personal',
    subtitulo: 'Mapa Completo de Tu Océano Mental',
    descripcion: 'Consolida todo en tu carta náutica definitiva. El mapa completo de tu navegación mental para toda la vida.',
    duracion: '60 min',
    icon: '🗺️',
    fase: 'actuar',
    insignia: 'Motor de Acción Marina',
    temas: [
      'Integración total de 14 días',
      'Carta náutica definitiva',
      'Sistema de navegación personal'
    ],
    objetivos: [
      'Crear carta náutica completa y definitiva',
      'Integrar todos los aprendizajes',
      'Diseñar sistema de navegación vitalicio'
    ]
  },
  {
    numero: 15,
    titulo: 'De Navegante a Autor de Tu Travesía',
    subtitulo: 'Ceremonia de Graduación y Nuevo Comienzo',
    descripcion: 'Celebra tu transformación de navegante novato a capitán experto. Ya no navegas tu vida, la autorizas. Cierre épico del Módulo 1.',
    duracion: '90 min',
    icon: '👑',
    fase: 'actuar',
    insignia: 'Almirante Ejecutor - Señor de los Mares',
    temas: [
      'Transformación completa documentada',
      'De navegante a autor',
      'Ceremoniade graduación'
    ],
    objetivos: [
      'Celebrar transformación completa',
      'Documentar journey de 15 días',
      'Prepararse para Módulo 2: La Alianza Transformadora'
    ]
  }
]

// Resumen por fases
export const fases = {
  explorar: {
    nombre: 'EXPLORAR',
    dias: [1, 2, 3, 4, 5],
    descripcion: 'Cartografía Mental - Mapea las corrientes de tu mente',
    color: '#4299e1', // Azul océano
    icon: '🗺️'
  },
  sentir: {
    nombre: 'SENTIR',
    dias: [6, 7, 8, 9, 10],
    descripcion: 'Calibración Emocional - Afina tus instrumentos de navegación',
    color: '#48bb78', // Verde
    icon: '🌊'
  },
  actuar: {
    nombre: 'ACTUAR',
    dias: [11, 12, 13, 14, 15],
    descripcion: 'Motor de Decisión - Activa tu capacidad de acción consciente',
    color: '#f6ad55', // Naranja/dorado
    icon: '⚡'
  }
}

// Estadísticas del módulo
export const estadisticasModulo1 = {
  totalDias: 15,
  duracionTotal: '9.5 horas',
  insignias: 15,
  ejercicios: 45,
  videoLecciones: 15,
  cuadernosPaginas: 180
}