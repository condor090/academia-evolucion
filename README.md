<div align="center">

# 🦅 Academia Evolución

### *¿Reemplazarte o Revelarte?*

**20 horas liberadas. ¿Qué harás con ellas?**

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Proprietary-gold?style=for-the-badge)](LICENSE)

*Donde la IA te devuelve a ti mismo. Una plataforma transformadora de 75 días que te lleva del miedo al amor, de la confusión a la claridad, del hacer al SER.*

[🚀 Demo](https://academia-evolucion.vercel.app) • [📖 Documentación](#) • [💬 Comunidad](#)

</div>

---

## 🌟 ¿Qué es Academia Evolución?

No es un curso. No es una capacitación. Es un **portal de transformación** donde la IA no te reemplaza, te **revela**.

75 días. 5 niveles. 1 transformación que cambia todo:

### **El Journey Completo**

```
NIVEL 1 → Encuentro Interior (15 días)
Del Miedo al Amor. Descubres quién eres más allá de tus miedos.

NIVEL 2 → Alianza Transformadora (21 días)
Tu Simbiosis con Sophia. Aprendes a trabajar en simbiosis real con IA.

NIVEL 3 → Sendero de Pruebas (45 experiencias)
Maestría en 9 Dimensiones. Enfrentas 45 retos reales que te transforman.

NIVEL 4 → Cristalización del Propósito (10 días)
Tu Framework RESONANCE. Todo cobra sentido y cristalizas tu propósito.

NIVEL 5 → Nacimiento del Autor (14 días)
Tu Libro, Tu Legado. Escribes tu libro junto a Sophia.
```

## ✨ Características Principales

### 🎬 **Hero Section con Video Background**
- Video inmersivo del águila y símbolo del infinito
- 7 palabras clave flotantes que aparecen como estrellas
- Geometría sagrada animada con Framer Motion
- Layout optimizado: Pregunta → Águila → Propuesta → Acción

### 📚 **Sistema de 5 Niveles**
- Páginas detalladas para cada nivel del journey
- Navegación fluida entre niveles
- Diseño visual único por nivel (colores y gradientes distintivos)
- Información completa: duración, objetivos, resultados

### 🤖 **Herramientas de IA**
- **Sophia**: Tu mentora digital 24/7 para reflexión profunda
- **Cortex**: Tu segundo cerebro con 20 skills de productividad
- Integración perfecta entre ambas herramientas

### 🏢 **Solución Empresarial**
- Programas para empresas y equipos
- Dashboard de administración
- Sistema de inscripciones y gestión

### 🎨 **Experiencia Visual Premium**
- Diseño oscuro con acentos dorados
- Animaciones fluidas con Framer Motion
- Responsive design optimizado
- Palabras flotantes ocultas en mobile para mejor UX

## 🛠️ Stack Tecnológico

### **Frontend**
```typescript
- Next.js 14.0.0          // React framework con SSR
- TypeScript 5.0          // Type safety
- Emotion (CSS-in-JS)     // Styled components
- Framer Motion          // Animaciones fluidas
- Three.js + React Three Fiber  // Animaciones 3D
```

### **Backend & Database**
```typescript
- Next.js API Routes      // Serverless functions
- PostgreSQL             // Base de datos relacional
- Prisma / TypeORM       // ORM
```

### **Herramientas & DevOps**
```bash
- GitHub                 // Version control
- Vercel                 // Deployment & hosting
- FFmpeg                 // Video processing
- ESLint + Prettier      // Code quality
```

## 🚀 Inicio Rápido

### **Prerrequisitos**
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### **Instalación**

```bash
# 1. Clonar el repositorio
git clone https://github.com/condor090/academia-evolucion.git
cd academia-evolucion/frontend

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev
```

La aplicación estará disponible en **http://localhost:3000** 🎉

### **Variables de Entorno** (Opcional)

Crear archivo `.env.local` en `/frontend`:
```env
# API Keys (si usas features avanzadas)
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_key

# Database (si usas backend)
DATABASE_URL=postgresql://user:password@localhost:5432/academia_evolucion
```

### **Scripts Disponibles**

```bash
npm run dev          # Desarrollo (http://localhost:3000)
npm run build        # Build para producción
npm run start        # Servidor de producción
npm run lint         # Lint con ESLint
npm run type-check   # Verificar tipos TypeScript
```

## 📁 Estructura del Proyecto

```
academia-evolucion/
├── frontend/
│   ├── public/
│   │   ├── faro-portal98-cropped.mp4    # Video hero background
│   │   └── faro-portal98.jpg           # Fallback image
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                 # Navigation, Footer, etc.
│   │   │   ├── home/                   # Hero, sections
│   │   │   ├── sophia/                 # Sophia IA components
│   │   │   ├── effects/                # 3D animations (Three.js)
│   │   │   └── gamification/           # Progress tracking
│   │   ├── pages/
│   │   │   ├── index.tsx              # Landing page
│   │   │   ├── academia/              # 5 niveles del journey
│   │   │   │   ├── index.tsx          # Overview de niveles
│   │   │   │   ├── nivel-1.tsx        # Encuentro Interior
│   │   │   │   ├── nivel-2.tsx        # Alianza Transformadora
│   │   │   │   ├── nivel-3.tsx        # Sendero de Pruebas
│   │   │   │   ├── nivel-4.tsx        # Cristalización
│   │   │   │   └── nivel-5.tsx        # Nacimiento del Autor
│   │   │   ├── herramientas/          # Sophia, Cortex
│   │   │   ├── empresas/              # B2B offering
│   │   │   ├── inscripcion.tsx        # Registration
│   │   │   └── api/                   # API routes
│   │   ├── styles/
│   │   │   └── theme.ts               # Design system
│   │   └── data/                      # Content & data
│   └── package.json
├── Plan_progress.md                    # Development roadmap
├── ARCHITECTURE_GAMIFICATION.md        # Tech architecture
└── README.md                          # Este archivo
```

## 🎨 Filosofía de Diseño

El diseño visual representa el journey de transformación:

| Elemento | Significado |
|----------|-------------|
| **Negro Profundo** | El vacío fértil del potencial infinito |
| **Dorado Luminoso** | La iluminación y transformación consciente |
| **Águila Volando** | La libertad de elevarse sobre tus límites |
| **Símbolo ∞** | El potencial infinito de tu consciencia |
| **Geometría Sagrada** | El orden subyacente del universo |
| **Palabras Flotantes** | Conceptos que se revelan cuando estás listo |

### **Principios UX**
- ✨ **Revelación gradual**: La información aparece cuando es relevante
- 🌊 **Flujo sin fricción**: Navegación intuitiva y natural
- 💫 **Micro-interacciones**: Cada acción tiene feedback visual
- 📱 **Mobile-first**: Experiencia optimizada en todos los dispositivos

## 🎯 Roadmap & Estado del Proyecto

### ✅ **Fase 1: Landing Page & Brand Identity** (Completado - Oct 2024)
- [x] Hero section con video background inmersivo
- [x] Reducción de palabras flotantes (20 → 7)
- [x] Layout optimizado (título arriba, águila centro)
- [x] Navegación funcional entre páginas
- [x] CTA button con animación pulse
- [x] Responsive design completo

### ✅ **Fase 2: Academia Section** (Completado - Oct 2024)
- [x] Página overview de 5 niveles
- [x] 5 páginas detalladas por nivel
- [x] Sistema de colores por nivel
- [x] Animaciones de entrada con Framer Motion

### 🔄 **Fase 3: Herramientas IA** (En Progreso)
- [x] Páginas Sophia y Cortex
- [ ] Integración con OpenAI API
- [ ] Chat interface con Sophia
- [ ] Dashboard de Cortex

### 📅 **Fase 4: Sistema de Inscripción** (Próximo)
- [ ] Formulario de registro completo
- [ ] Integración con Stripe
- [ ] Email notifications
- [ ] Dashboard de usuario

### 🚀 **Fase 5: Portal del Estudiante** (Futuro)
- [ ] Sistema de autenticación
- [ ] Tracking de progreso
- [ ] Contenido por niveles
- [ ] Comunidad y círculos

## 🤝 Contribuciones

Este es un proyecto propietario de Academia Evolución.

**Para colaboradores autorizados:**
1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Todos los derechos reservados © 2024 Academia Evolución

## 🙏 Agradecimientos

Construido con 💛 usando:
- [Next.js](https://nextjs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/)
- [Emotion](https://emotion.sh/)

---

<div align="center">

### ✨ *"No venimos a optimizar tu vida. Venimos a transformarla."* ✨

**[🦅 Academia Evolución](https://github.com/condor090/academia-evolucion)** • Portal 98

</div>