# Academia Evolución - Ecosistema Digital

> Donde la IA te devuelve a ti mismo. Una plataforma transformadora que libera 20 horas semanales para tu verdadero propósito.

## 🌟 Descripción

Academia Evolución es un ecosistema digital completo que guía a los estudiantes a través de un journey de 12 semanas de autodescubrimiento y transformación personal, asistidos por Sophia, una IA diseñada para hacer las preguntas correctas.

## 🚀 Características Principales

- **Landing Page Transformadora**: Experiencia inmersiva con animaciones y storytelling
- **Portal del Estudiante**: Dashboard personalizado con tracking de progreso
- **Integración con Sophia**: IA compañera 24/7 para guía y reflexión
- **Sistema de Módulos**: 5 fases de transformación estructuradas
- **Generador de Libros**: Co-creación de tu libro personal con Sophia
- **Comunidad**: Círculos de integración y apoyo entre estudiantes

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 14** con TypeScript
- **Emotion** para estilos CSS-in-JS
- **Framer Motion** para animaciones
- **Zustand** para gestión de estado
- **React Hook Form** para formularios

### Backend
- **Node.js** con Express
- **PostgreSQL** con TypeORM
- **JWT** para autenticación
- **OpenAI API** para Sophia
- **Stripe** para pagos

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/academia-evolucion/ecosistema.git
cd academia-evolucion
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz del proyecto:
```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Backend
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/academia_evolucion
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

4. **Configurar la base de datos**
```bash
cd backend
npm run migration:run
```

## 🏃‍♂️ Ejecutar en desarrollo

```bash
# Desde la raíz del proyecto
npm run dev
```

Esto iniciará:
- Frontend en `http://localhost:3000`
- Backend en `http://localhost:5000`

## 📁 Estructura del Proyecto

```
academia-evolucion/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/       # Componentes reutilizables
│   │   │   ├── home/         # Componentes de la página principal
│   │   │   ├── sophia/       # Componentes de Sophia
│   │   │   ├── journey/      # Componentes del journey
│   │   │   └── portal/       # Componentes del portal
│   │   ├── pages/           # Páginas de Next.js
│   │   ├── contexts/        # Contextos de React
│   │   ├── hooks/           # Hooks personalizados
│   │   ├── styles/          # Estilos globales y tema
│   │   └── utils/           # Utilidades
│   └── public/             # Archivos estáticos
├── backend/
│   ├── src/
│   │   ├── api/            # Rutas y controladores
│   │   ├── database/       # Modelos y migraciones
│   │   ├── services/       # Lógica de negocio
│   │   └── utils/          # Utilidades
│   └── dist/              # Código compilado
└── shared/                # Código compartido
```

## 🎨 Diseño y UX

El diseño sigue una estética oscura con acentos dorados, representando:
- **Negro**: El vacío fértil del potencial infinito
- **Dorado**: La iluminación y transformación
- **Animaciones fluidas**: Representan el flujo de transformación

## 🔒 Seguridad

- Autenticación JWT con refresh tokens
- Rate limiting en endpoints críticos
- Validación de datos con Joi
- HTTPS en producción
- Sanitización de inputs

## 📝 Próximos Pasos

- [ ] Completar páginas de módulos individuales
- [ ] Implementar chat en tiempo real con Sophia
- [ ] Sistema de notificaciones push
- [ ] App móvil con React Native
- [ ] Analytics de transformación
- [ ] Integración con calendarios

## 🤝 Contribuir

Este es un proyecto privado de Academia Evolución. Para contribuir, contacta al equipo de desarrollo.

## 📄 Licencia

Todos los derechos reservados © 2024 Academia Evolución

---

✨ **"No venimos a optimizar tu vida. Venimos a transformarla."** ✨