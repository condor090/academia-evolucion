import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, TrendingUp, Shield, Zap, Users } from 'lucide-react';

const historicalPhases = [
  {
    era: '-10000 a.C.',
    title: 'Revolución Agrícola',
    value: 'tierra + organización',
    emoji: '🌾',
    summary: 'Los humanos pasaron de cazadores-recolectores a agricultores sedentarios. El valor migró hacia la propiedad de la tierra y la capacidad de generar excedentes. Nacen las primeras estructuras organizacionales y el comercio.'
  },
  {
    era: '1760-1840',
    title: 'Industrial 1.0',
    value: 'fábrica + vapor',
    emoji: '⚙️',
    summary: 'La máquina de vapor revoluciona la producción. El valor se concentra en la fábrica como centro productivo. La mecanización reemplaza la fuerza humana. Surge el concepto de trabajo asalariado y la urbanización masiva.'
  },
  {
    era: '1870-1914',
    title: 'Industrial 2.0',
    value: 'electricidad + marca',
    emoji: '⚡',
    summary: 'La electricidad y el acero transforman la industria. La cadena de montaje de Ford multiplica la productividad. Nace la "marca" como diferenciador. El marketing y la publicidad masiva crean nuevas formas de valor.'
  },
  {
    era: '1947-1971',
    title: 'Era Electrónica',
    value: 'transistor + CI',
    emoji: '💾',
    summary: 'El transistor (1947) y el circuito integrado (1958) inician la era digital. El microprocesador (1971) pone computación en manos de corporaciones. La automatización temprana reemplaza trabajos de cálculo repetitivo.'
  },
  {
    era: '1990-2016',
    title: 'Internet & Cloud',
    value: 'software + red',
    emoji: '🌐',
    summary: 'Internet (TCP/IP 1983, Web 1991) democratiza el acceso a información. El smartphone (2007) crea economía móvil. La nube (as-a-service) y las APIs transforman el software. Nacen las plataformas con efectos de red exponenciales.'
  },
  {
    era: '2012-2021',
    title: 'Deep Learning',
    value: 'percepción automática',
    emoji: '🧠',
    summary: 'AlexNet (2012) demuestra que GPUs + datos + redes neuronales profundas superan humanos en tareas de percepción. La IA aprende a ver, escuchar y clasificar. Comienza la automatización de trabajos cognitivos básicos.'
  },
  {
    era: '2022+',
    title: 'IA Generativa',
    value: 'producción cognitiva',
    emoji: '🤖',
    summary: 'GPT-3, DALL-E, Midjourney democratizan la creación. ChatGPT (nov 2022) alcanza 100M usuarios en 2 meses. Los LLMs pueden escribir, diseñar, programar y analizar. El costo marginal de producción cognitiva tiende a cero.'
  },
  {
    era: '202X+',
    title: 'Horizonte AGI',
    value: '¿¿¿???',
    emoji: '🦅',
    special: true,
    summary: 'La Inteligencia General Artificial promete sistemas que razonan, planean y aprenden como humanos. La robótica avanzada automatiza lo físico. La pregunta ya no es "¿qué puede hacer IA?" sino "¿qué valor queda para los humanos?"'
  }
];

const moats = [
  {
    number: "1",
    title: "Datos Propios + Consentimiento",
    desc: "Calidad sobre cantidad. Provenance, permisos, contexto ético.",
    icon: "🔐"
  },
  {
    number: "2",
    title: "Distribución",
    desc: "Comunidad, partnerships, SEO local. Tu audiencia no se copia.",
    icon: "🎯"
  },
  {
    number: "3",
    title: "Workflows Integrados",
    desc: "End-to-end con agentes. Orquestación que aprende.",
    icon: "⚡"
  },
  {
    number: "4",
    title: "Marca/Narrativa",
    desc: "Gusto, símbolos, rituales. Lo que se siente, no solo se entiende.",
    icon: "✨"
  },
  {
    number: "5",
    title: "Gobernanza/Compliance",
    desc: "Riesgo bajo = compra fácil. Transparencia como ventaja.",
    icon: "🛡️"
  }
];

const taskMatrix = [
  { task: 'Físico repetitivo', destiny: 'Robotización', strategy: 'Integrar robots; medir ROI', color: 'red' },
  { task: 'Cognitivo rutinario', destiny: 'Agentes IA', strategy: 'Plantillas + revisión humana', color: 'orange' },
  { task: 'Cognitivo estratégico', destiny: '🧠 HUMANO', strategy: 'Formación en criterio + datos', color: 'green' },
  { task: 'Creativo con gusto', destiny: '🎨 HUMANO+', strategy: 'Curaduría + pruebas audiencia', color: 'blue' },
  { task: 'Relacional/Confianza', destiny: '🤝 HUMANO', strategy: 'Comunidad, reputación', color: 'purple' }
];

const cortexFeatures = [
  {
    icon: "🧠",
    title: "Pensamiento Vivo",
    desc: "Tu conocimiento crece como red neuronal, no como carpetas muertas",
    moat: "Datos Propios"
  },
  {
    icon: "🎯",
    title: "Decisiones con Contexto",
    desc: "IA que conoce TU historia, prioridades y valores únicos",
    moat: "Criterio Personalizado"
  },
  {
    icon: "⚡",
    title: "Agentes Orquestados",
    desc: "20+ skills especializadas que trabajan 24/7 para ti",
    moat: "Workflows Integrados"
  },
  {
    icon: "🔐",
    title: "Soberanía Total",
    desc: "Tus datos, tu infraestructura, tus reglas",
    moat: "Consentimiento Real"
  }
];

const academiaModules = [
  {
    icon: "🎓",
    title: "Fundamentos AGI",
    desc: "Entiende cómo piensa la IA y dónde conservar control humano",
    duration: "4 semanas"
  },
  {
    icon: "⚙️",
    title: "Orquestación Práctica",
    desc: "Diseña workflows IA + humano para tu contexto específico",
    duration: "6 semanas"
  },
  {
    icon: "🛡️",
    title: "Construcción de Moats",
    desc: "Implementa las 5 defensas anti-comoditización",
    duration: "8 semanas"
  },
  {
    icon: "🚀",
    title: "Transformación Guiada",
    desc: "Mentoría 1:1 para ejecutar tu nuevo modelo de valor",
    duration: "12 semanas"
  }
];

export default function NuevaEconomiaValor() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMoat, setSelectedMoat] = useState<number | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [canvasAnswers, setCanvasAnswers] = useState({
    identity: '',
    evidence: '',
    system: '',
    experience: '',
    moats: ''
  });

  const totalSlides = 13;

  const nextSlide = () => currentSlide < totalSlides - 1 && setCurrentSlide(currentSlide + 1);
  const prevSlide = () => currentSlide > 0 && setCurrentSlide(currentSlide - 1);

  const handleCanvasChange = (field: string, value: string) => {
    setCanvasAnswers(prev => ({ ...prev, [field]: value }));
  };

  const downloadCanvas = () => {
    const content = `MARCO VALOR IRREPLICABLE
========================

1. IDENTIDAD
${canvasAnswers.identity || '(Sin respuesta)'}

2. EVIDENCIA
${canvasAnswers.evidence || '(Sin respuesta)'}

3. SISTEMA
${canvasAnswers.system || '(Sin respuesta)'}

4. EXPERIENCIA
${canvasAnswers.experience || '(Sin respuesta)'}

5. MOATS
${canvasAnswers.moats || '(Sin respuesta)'}

---
Nueva Economía del Valor
Academia Evolución - Portal 98
Cortex - Tu Segundo Cerebro Anti-AGI`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mi-valor-irreplicable.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🦅 LA NUEVA ECONOMÍA DEL VALOR
          </h1>
          <div className="flex gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentSlide
                    ? 'bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="min-h-[600px] flex flex-col justify-center">
          {currentSlide === 0 && <SlideIntro />}
          {currentSlide === 1 && <SlideTimeline />}
          {currentSlide === 2 && <SlideComoditizacion />}
          {currentSlide === 3 && <SlideNuevoValor />}
          {currentSlide === 4 && <SlideEcuacion />}
          {currentSlide === 5 && <SlideMatrix />}
          {currentSlide === 6 && (
            <SlideMoats
              selectedMoat={selectedMoat}
              setSelectedMoat={setSelectedMoat}
            />
          )}
          {currentSlide === 7 && (
            <SlideCanvas
              answers={canvasAnswers}
              onChange={handleCanvasChange}
              onDownload={downloadCanvas}
            />
          )}
          {currentSlide === 8 && <SlideProblema />}
          {currentSlide === 9 && (
            <SlideCortex
              selectedFeature={selectedFeature}
              setSelectedFeature={setSelectedFeature}
            />
          )}
          {currentSlide === 10 && (
            <SlideAcademia
              selectedModule={selectedModule}
              setSelectedModule={setSelectedModule}
            />
          )}
          {currentSlide === 11 && <SlideSistemaCompleto />}
          {currentSlide === 12 && <SlideCTA />}
        </div>

        <div className="flex justify-between items-center mt-12 pt-6 border-t border-cyan-500/20">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-cyan-500 text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-500 hover:text-slate-900 transition-all"
          >
            <ChevronLeft size={20} />
            Anterior
          </button>

          <span className="text-cyan-400/60">
            {currentSlide + 1} / {totalSlides}
          </span>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              currentSlide === totalSlides - 1
                ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-slate-900 font-bold animate-pulse'
                : 'border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900'
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            {currentSlide === totalSlides - 1 ? '¡Iniciar Evolución!' : 'Siguiente'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== SLIDES COMPONENTS ====================

function SlideIntro() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-8">
        <h1 className="text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
          LA NUEVA ECONOMÍA DEL VALOR
        </h1>
        <p className="text-4xl text-slate-200 max-w-4xl mx-auto leading-tight">
          Cuando AGI y robótica avanzan,
          <span className="block mt-4 text-cyan-400 font-bold text-5xl">
            ¿qué se vuelve valioso?
          </span>
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-2xl p-8">
          <div className="flex items-start gap-6">
            <div className="text-6xl">⚠️</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-red-400 mb-3">El Punto de Quiebre</h3>
              <p className="text-xl text-slate-200 leading-relaxed">
                Por primera vez en la historia, las máquinas pueden <strong className="text-orange-400">pensar, crear y decidir</strong>.
                La ventaja competitiva de los últimos 200 años está a punto de <strong className="text-red-400">comoditizarse</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500/30 rounded-2xl p-8">
          <div className="flex items-start gap-6">
            <div className="text-6xl">🤔</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-cyan-300 mb-3">La Pregunta Esencial</h3>
              <p className="text-xl text-slate-200 leading-relaxed mb-4">
                Si la IA puede escribir, diseñar, programar y analizar mejor que el 80% de los profesionales...
              </p>
              <p className="text-2xl text-purple-400 font-bold italic">
                ¿Qué te hace insustituible?
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-2 border-yellow-500/30 rounded-2xl p-8">
          <div className="flex items-start gap-6">
            <div className="text-6xl">🧭</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-yellow-400 mb-3">Esta Presentación</h3>
              <p className="text-xl text-slate-200 leading-relaxed">
                No es sobre &quot;usar IA para ser más productivos&quot;.<br />
                Es sobre <strong className="text-yellow-400">redefinir el valor</strong> cuando la productividad deja de ser ventaja.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-2xl text-slate-400 italic">
          Comencemos por el principio...
        </p>
        <p className="text-lg text-cyan-400 mt-2">
          👉 ¿Cómo ha migrado el valor a lo largo de la historia?
        </p>
      </div>
    </div>
  );
}

function SlideTimeline() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          La Migración del Valor
        </h2>
        <p className="text-2xl text-slate-300">
          Cada revolución automatiza el valor previo
        </p>
        <p className="text-sm text-cyan-400 animate-pulse">
          👆 Haz clic en cualquier era para ver su resumen
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 rounded-full"></div>

        <div className="space-y-4 relative">
          {historicalPhases.map((phase, i) => (
            <div
              key={i}
              onClick={() => setExpandedPhase(expandedPhase === i ? null : i)}
              className={`ml-20 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                phase.special
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500'
                  : expandedPhase === i
                  ? 'bg-cyan-500/20 border-cyan-400 scale-[1.02]'
                  : 'bg-white/5 border-cyan-500/20 hover:bg-white/10 hover:border-cyan-500/40'
              } ${phase.special && expandedPhase !== i ? 'animate-pulse' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{phase.emoji}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-bold text-cyan-300">{phase.title}</h3>
                    <span className="text-cyan-500 font-mono text-sm">{phase.era}</span>
                  </div>
                  <p className="text-slate-300">
                    <strong className="text-blue-400">Valor:</strong> {phase.value}
                  </p>

                  {expandedPhase === i && (
                    <div className="mt-4 pt-4 border-t border-cyan-500/30">
                      <p className="text-slate-200 leading-relaxed">
                        {phase.summary}
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-cyan-400 text-2xl">
                  {expandedPhase === i ? '−' : '+'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-6 rounded-r-xl mt-8">
        <p className="text-xl text-center">
          <span className="text-slate-300">Cuando productividad y velocidad se vuelven abundantes,</span><br />
          <span className="text-cyan-400 font-bold text-2xl mt-2 block">
            el valor migra a sentido, criterio, confianza y experiencia
          </span>
        </p>
      </div>
    </div>
  );
}

function SlideComoditizacion() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          ¿Qué Se Comoditiza?
        </h2>
        <p className="text-2xl text-slate-300">
          El punto de inflexión AGI
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-xl p-6">
          <div className="text-5xl mb-4">🧠</div>
          <h3 className="text-2xl font-bold text-red-400 mb-4">Cognitivo</h3>
          <ul className="space-y-2 text-slate-300">
            <li>• Cálculo y análisis</li>
            <li>• Producción de contenido</li>
            <li>• Traducción y síntesis</li>
            <li>• Búsqueda y resumen</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-2 border-orange-500/30 rounded-xl p-6">
          <div className="text-5xl mb-4">🤖</div>
          <h3 className="text-2xl font-bold text-orange-400 mb-4">Físico</h3>
          <ul className="space-y-2 text-slate-300">
            <li>• Tareas repetitivas</li>
            <li>• Logística rutinaria</li>
            <li>• Manufactura estándar</li>
            <li>• Inspección visual</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-2 border-yellow-500/30 rounded-xl p-6">
          <div className="text-5xl mb-4">⚙️</div>
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">Organizacional</h3>
          <ul className="space-y-2 text-slate-300">
            <li>• Onboarding estándar</li>
            <li>• Soporte nivel 1</li>
            <li>• Seguimiento automático</li>
            <li>• Reportes operativos</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500/20 to-yellow-500/20 border-2 border-orange-500 rounded-xl p-8">
        <p className="text-3xl text-center font-bold text-orange-200">
          Productividad, eficiencia y velocidad<br />
          <span className="text-red-400">↓</span><br />
          se vuelven <span className="text-yellow-400">HIGIÉNICOS</span><br />
          <span className="text-sm block mt-3 text-slate-300 font-normal">(requisitos mínimos, sin poder diferenciador)</span>
        </p>
      </div>

      <div className="flex justify-center gap-8 text-center">
        <div className="bg-white/5 p-6 rounded-xl">
          <div className="text-4xl mb-2">📉</div>
          <div className="text-3xl font-bold text-red-400">-80%</div>
          <p className="text-sm text-slate-400 mt-2">Costo marginal<br />producción cognitiva</p>
        </div>
        <div className="bg-white/5 p-6 rounded-xl">
          <div className="text-4xl mb-2">⚡</div>
          <div className="text-3xl font-bold text-orange-400">1000x</div>
          <p className="text-sm text-slate-400 mt-2">Velocidad<br />vs. humano promedio</p>
        </div>
        <div className="bg-white/5 p-6 rounded-xl">
          <div className="text-4xl mb-2">⏱️</div>
          <div className="text-3xl font-bold text-yellow-400">24/7</div>
          <p className="text-sm text-slate-400 mt-2">Disponibilidad<br />sin descanso</p>
        </div>
      </div>
    </div>
  );
}

function SlideNuevoValor() {
  const nuevosActivos = [
    { num: '1', title: 'Propósito y Sentido', desc: 'Marco moral y dirección', icon: '🎯' },
    { num: '2', title: 'Criterio/Juicio', desc: 'Priorizar, renunciar, decidir', icon: '⚖️' },
    { num: '3', title: 'Confianza/Relaciones', desc: 'Reputación, comunidad, acuerdos', icon: '🤝' },
    { num: '4', title: 'Narrativa y Diseño', desc: 'Significado, estética, marca', icon: '✨' },
    { num: '5', title: 'Orquestación', desc: 'Sistemas, incentivos, interoperabilidad', icon: '🎼' },
    { num: '6', title: 'Datos Propios Vivos', desc: 'Provenance, permisos, contexto', icon: '🔐' },
    { num: '7', title: 'Experiencias Encarnadas', desc: 'Alto toque humano', icon: '💫' },
    { num: '8', title: 'Gobernanza/Ética', desc: 'Accountability, riesgo, licencias', icon: '🛡️' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Los 8 Activos Anti-Comoditización
        </h2>
        <p className="text-2xl text-slate-300">
          Lo que AGI NO puede replicar
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {nuevosActivos.map((activo, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-xl p-5 hover:border-cyan-400 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
              {activo.icon}
            </div>
            <div className="text-2xl font-bold text-cyan-400 mb-2">{activo.num}</div>
            <h3 className="text-lg font-bold text-cyan-300 mb-2">{activo.title}</h3>
            <p className="text-sm text-slate-300">{activo.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-l-4 border-cyan-500 p-8 rounded-r-xl">
        <p className="text-2xl text-center">
          <span className="text-slate-300">Tesis práctica:</span><br />
          <span className="text-cyan-400 font-bold text-3xl mt-3 block">
            La ventaja no está en &quot;hacer más rápido&quot;
          </span>
          <span className="text-purple-400 font-bold text-3xl mt-2 block">
            sino en diseñar transformaciones con confianza
          </span>
        </p>
      </div>
    </div>
  );
}

function SlideEcuacion() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          La Nueva Ecuación del Valor
        </h2>
        <p className="text-2xl text-slate-300">
          Matemática de la diferenciación
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-4 border-cyan-500 rounded-2xl p-12">
        <div className="text-center space-y-6">
          <div className="text-4xl font-bold font-mono text-cyan-300">
            VALOR 2.0 =
          </div>
          <div className="text-3xl text-white space-y-2">
            <div className="flex justify-center items-center gap-3">
              <span className="text-cyan-400">Significado</span>
              <span className="text-slate-500">×</span>
              <span className="text-blue-400">Confianza</span>
              <span className="text-slate-500">×</span>
              <span className="text-purple-400">Orquestación</span>
              <span className="text-slate-500">×</span>
              <span className="text-pink-400">Experiencia</span>
            </div>
            <div className="text-5xl text-slate-500 py-4">
              ────────────────────────
            </div>
            <div className="flex justify-center items-center gap-3">
              <span className="text-orange-400">Fricción</span>
              <span className="text-slate-500">×</span>
              <span className="text-red-400">Riesgo percibido</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <TrendingUp size={28} /> Amplificadores
          </h3>
          <div className="space-y-3">
            <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-4 rounded-r-lg">
              <strong className="text-cyan-400">Significado:</strong>
              <p className="text-slate-300 text-sm mt-1">Propuesta con propósito claro</p>
            </div>
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <strong className="text-blue-400">Confianza:</strong>
              <p className="text-slate-300 text-sm mt-1">Pruebas, reputación, garantías</p>
            </div>
            <div className="bg-purple-500/10 border-l-4 border-purple-500 p-4 rounded-r-lg">
              <strong className="text-purple-400">Orquestación:</strong>
              <p className="text-slate-300 text-sm mt-1">IA + procesos + personas alineadas</p>
            </div>
            <div className="bg-pink-500/10 border-l-4 border-pink-500 p-4 rounded-r-lg">
              <strong className="text-pink-400">Experiencia:</strong>
              <p className="text-slate-300 text-sm mt-1">Viaje emocional + funcional</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-red-400 flex items-center gap-2">
            <Shield size={28} /> Reductores
          </h3>
          <div className="space-y-3">
            <div className="bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <strong className="text-orange-400">Fricción:</strong>
              <p className="text-slate-300 text-sm mt-1">Tiempo, costos, complejidad del proceso</p>
            </div>
            <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg">
              <strong className="text-red-400">Riesgo percibido:</strong>
              <p className="text-slate-300 text-sm mt-1">Dudas legales, éticas, de seguridad</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-red-500/50 rounded-xl p-6 mt-6">
            <p className="text-lg text-center">
              <strong className="text-red-400">Meta:</strong><br />
              <span className="text-slate-300">Maximizar numerador</span><br />
              <span className="text-slate-300">Minimizar denominador</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideMatrix() {
  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      red: 'bg-red-500/10 border-red-500/30 text-red-400',
      orange: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
      green: 'bg-green-500/10 border-green-500/30 text-green-400',
      blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400'
    };
    return colors[color];
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Matriz de Trabajo ante AGI
        </h2>
        <p className="text-2xl text-slate-300">
          ¿Qué automatizar y qué conservar humano?
        </p>
      </div>

      <div className="space-y-4">
        {taskMatrix.map((item, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl border-2 hover:scale-[1.02] transition-all ${getColorClass(item.color)}`}
          >
            <div className="grid md:grid-cols-3 gap-4 items-center">
              <div>
                <div className="text-sm text-slate-400 mb-1">Tipo de tarea</div>
                <div className="text-xl font-bold">{item.task}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Destino</div>
                <div className="text-2xl font-bold">{item.destiny}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-1">Estrategia</div>
                <div className="text-lg">{item.strategy}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-6 text-center">
          <div className="text-4xl mb-2">🤖</div>
          <div className="text-2xl font-bold text-red-400">Automatizar</div>
          <p className="text-sm text-slate-400 mt-2">Rutinario y escalable</p>
        </div>
        <div className="bg-green-500/10 border-2 border-green-500/30 rounded-xl p-6 text-center">
          <div className="text-4xl mb-2">🧠</div>
          <div className="text-2xl font-bold text-green-400">Conservar</div>
          <p className="text-sm text-slate-400 mt-2">Criterio y relaciones</p>
        </div>
        <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-6 text-center">
          <div className="text-4xl mb-2">⚡</div>
          <div className="text-2xl font-bold text-blue-400">Aumentar</div>
          <p className="text-sm text-slate-400 mt-2">Humano + IA = potencia</p>
        </div>
      </div>
    </div>
  );
}

interface SlideMoatsProps {
  selectedMoat: number | null;
  setSelectedMoat: (value: number | null) => void;
}

function SlideMoats({ selectedMoat, setSelectedMoat }: SlideMoatsProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Los 5 Moats Defensivos
        </h2>
        <p className="text-2xl text-slate-300">
          Tu protección contra la copia barata
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {moats.map((moat, i) => (
          <div
            key={i}
            onClick={() => setSelectedMoat(selectedMoat === i ? null : i)}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
              selectedMoat === i
                ? 'bg-cyan-500/20 border-cyan-400 scale-105'
                : 'bg-white/5 border-cyan-500/20 hover:bg-white/10 hover:border-cyan-500/40'
            }`}
          >
            <div className="text-5xl mb-3 text-center">{moat.icon}</div>
            <div className="text-3xl font-bold text-cyan-400 mb-3 text-center">{moat.number}</div>
            <h3 className="text-lg font-bold text-cyan-300 mb-2 text-center">{moat.title}</h3>
            {selectedMoat === i && (
              <p className="text-sm text-slate-300 mt-4 pt-4 border-t border-cyan-500/30">
                {moat.desc}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-xl p-8">
        <p className="text-3xl italic text-center text-cyan-200">
          &quot;Un moat no se construye en un día.<br />
          <span className="text-blue-400">Se cultiva con decisiones consistentes.&quot;</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white/5 p-6 rounded-xl text-center">
          <div className="text-4xl mb-3">🎯</div>
          <div className="text-2xl font-bold text-cyan-400 mb-2">Enfoque</div>
          <p className="text-sm text-slate-400">Un moat profundo vale más que cinco superficiales</p>
        </div>
        <div className="bg-white/5 p-6 rounded-xl text-center">
          <div className="text-4xl mb-3">⏳</div>
          <div className="text-2xl font-bold text-blue-400 mb-2">Tiempo</div>
          <p className="text-sm text-slate-400">Los mejores moats necesitan años para madurar</p>
        </div>
        <div className="bg-white/5 p-6 rounded-xl text-center">
          <div className="text-4xl mb-3">🔄</div>
          <div className="text-2xl font-bold text-purple-400 mb-2">Sinergia</div>
          <p className="text-sm text-slate-400">Moats que se refuerzan mutuamente = fortaleza</p>
        </div>
      </div>
    </div>
  );
}

interface SlideCanvasProps {
  answers: Record<string, string>;
  onChange: (field: string, value: string) => void;
  onDownload: () => void;
}

function SlideCanvas({ answers, onChange, onDownload }: SlideCanvasProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Marco Valor Irreplicable
        </h2>
        <p className="text-2xl text-slate-300">
          Tu mapa estratégico en 5 preguntas
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {[
          {
            key: 'identity',
            label: '1. IDENTIDAD',
            question: '¿Qué problema resuelves con sentido?',
            placeholder: 'Más allá del producto, ¿qué transformación ofreces?'
          },
          {
            key: 'evidence',
            label: '2. EVIDENCIA',
            question: '¿Qué pruebas y métricas sostienen tu promesa?',
            placeholder: 'Casos, testimonios, datos que NO mienten...'
          },
          {
            key: 'system',
            label: '3. SISTEMA',
            question: '¿Qué orquestación (IA + procesos) lo hace escalable?',
            placeholder: 'IA automatiza: ... | Humanos conservan: ...'
          },
          {
            key: 'experience',
            label: '4. EXPERIENCIA',
            question: '¿Cómo se siente tu transformación?',
            placeholder: 'Viaje emocional del cliente antes, durante y después...'
          },
          {
            key: 'moats',
            label: '5. MOATS',
            question: '¿Qué te protege de la copia?',
            placeholder: 'Datos, comunidad, narrativa, gobernanza, workflows...'
          }
        ].map(({ key, label, question, placeholder }) => (
          <div key={key} className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
            <div className="text-xl font-bold text-cyan-400 mb-2">{label}</div>
            <p className="text-slate-300 mb-3">{question}</p>
            <textarea
              className="w-full p-4 bg-white/10 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all"
              rows={3}
              placeholder={placeholder}
              value={answers[key]}
              onChange={(e) => onChange(key, e.target.value)}
            />
          </div>
        ))}

        <button
          onClick={onDownload}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-400 text-slate-900 font-bold text-xl rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          <Download size={24} />
          Descargar Mi Marco
        </button>

        <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-6 rounded-r-xl">
          <p className="text-center text-slate-300">
            <strong className="text-cyan-400">Usa este marco para:</strong><br />
            Decisiones estratégicas • Pitches • Hiring • Roadmap • Comunicación
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500 rounded-xl p-8 mt-12">
        <p className="text-3xl italic text-center text-cyan-200">
          &quot;Cuando la inteligencia y la fuerza se alquilan por minutos,<br />
          <span className="text-purple-400">el valor está en diseñar mejor:</span><br />
          <span className="text-blue-400">decisiones con propósito, sistemas confiables,</span><br />
          <span className="text-cyan-400">experiencias que toquen la vida de las personas.&quot;</span>
        </p>
        <p className="text-center text-slate-400 mt-6 text-xl">
          — La Nueva Economía del Valor
        </p>
      </div>
    </div>
  );
}

// ==================== NUEVAS SLIDES ====================

function SlideProblema() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          El Problema Real
        </h2>
        <p className="text-2xl text-slate-300">
          Conocer la teoría ≠ Ejecutar la transformación
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-2xl p-8">
          <div className="text-6xl mb-4 text-center">🤯</div>
          <h3 className="text-3xl font-bold text-red-400 mb-6 text-center">La Paradoja</h3>
          <ul className="space-y-4 text-lg text-slate-200">
            <li className="flex items-start gap-3">
              <span className="text-2xl">❌</span>
              <span>Sabes que necesitas construir moats, pero <strong className="text-orange-400">¿por dónde empezar?</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">❌</span>
              <span>Entiendes la ecuación del valor, pero <strong className="text-orange-400">¿cómo la implementas en tu día a día?</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">❌</span>
              <span>Quieres orquestar IA + humanos, pero <strong className="text-orange-400">¿cómo diseñas esos workflows?</strong></span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-2 border-yellow-500/30 rounded-2xl p-8">
          <div className="text-6xl mb-4 text-center">⏰</div>
          <h3 className="text-3xl font-bold text-yellow-400 mb-6 text-center">El Costo</h3>
          <ul className="space-y-4 text-lg text-slate-200">
            <li className="flex items-start gap-3">
              <span className="text-2xl">💸</span>
              <span><strong className="text-yellow-400">Meses</strong> perdidos experimentando sin rumbo claro</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <span><strong className="text-yellow-400">Recursos</strong> desperdiciados en herramientas que no se integran</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🚨</span>
              <span><strong className="text-yellow-400">Competencia</strong> avanzando mientras tú sigues &quot;investigando&quot;</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-2xl p-10">
        <p className="text-3xl text-center font-bold text-purple-200 leading-relaxed">
          Necesitas <span className="text-cyan-400">UN SISTEMA</span> que convierta teoría en ejecución<br />
          <span className="text-pink-400 text-2xl block mt-4">+ una comunidad que acelere tu curva de aprendizaje</span>
        </p>
      </div>

      <div className="text-center">
        <p className="text-2xl text-slate-400 italic">
          Aquí es donde entran...
        </p>
        <div className="flex justify-center items-center gap-6 mt-6">
          <div className="text-6xl animate-pulse">🧠</div>
          <div className="text-4xl text-cyan-400 font-bold">+</div>
          <div className="text-6xl animate-pulse">🎓</div>
        </div>
      </div>
    </div>
  );
}

interface SlideCortexProps {
  selectedFeature: number | null;
  setSelectedFeature: (value: number | null) => void;
}

function SlideCortex({ selectedFeature, setSelectedFeature }: SlideCortexProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="text-7xl mb-4">🧠</div>
        <h2 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Cortex
        </h2>
        <p className="text-3xl text-slate-200">
          Tu Segundo Cerebro Anti-Comoditización
        </p>
        <p className="text-lg text-cyan-400 italic">
          El sistema que construye tus moats mientras trabajas
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {cortexFeatures.map((feature, i) => (
          <div
            key={i}
            onClick={() => setSelectedFeature(selectedFeature === i ? null : i)}
            className={`p-8 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedFeature === i
                ? 'bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-cyan-400 scale-105 shadow-xl shadow-cyan-500/30'
                : 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30 hover:border-cyan-400'
            }`}
          >
            <div className="text-6xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-bold text-cyan-300 mb-3">{feature.title}</h3>
            <p className="text-slate-200 mb-4">{feature.desc}</p>
            <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full">
              <span className="text-purple-300 text-sm font-bold">🛡️ Moat: {feature.moat}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500 rounded-2xl p-8">
        <h3 className="text-3xl font-bold text-cyan-300 mb-6 text-center">¿Por Qué Cortex es Diferente?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-5xl mb-3">🔒</div>
            <h4 className="text-xl font-bold text-cyan-400 mb-2">Soberanía</h4>
            <p className="text-slate-300">Tus datos nunca salen de tu infraestructura</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-3">🧬</div>
            <h4 className="text-xl font-bold text-blue-400 mb-2">Evolución</h4>
            <p className="text-slate-300">Aprende de TU contexto único, no de promedios globales</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-3">🎼</div>
            <h4 className="text-xl font-bold text-purple-400 mb-2">Orquestación</h4>
            <p className="text-slate-300">20+ agentes especializados trabajando en armonía</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-3">
          <Zap size={32} />
          Casos de Uso Reales
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-xl">
            <p className="text-slate-200">
              <strong className="text-green-400">→</strong> Captura automática de insights con contexto relacional
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl">
            <p className="text-slate-200">
              <strong className="text-green-400">→</strong> Decisiones respaldadas por tu historial y prioridades
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl">
            <p className="text-slate-200">
              <strong className="text-green-400">→</strong> Detección de patrones y oportunidades ocultas
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl">
            <p className="text-slate-200">
              <strong className="text-green-400">→</strong> Workflows que combinan velocidad IA + criterio humano
            </p>
          </div>
        </div>
      </div>

      <div className="text-center bg-cyan-500/10 border-l-4 border-cyan-500 p-6 rounded-r-xl">
        <p className="text-2xl italic text-cyan-200">
          &quot;Cortex no es una herramienta más.<br />
          <span className="text-blue-400">Es la infraestructura de tu pensamiento en la era AGI.&quot;</span>
        </p>
      </div>
    </div>
  );
}

interface SlideAcademiaProps {
  selectedModule: number | null;
  setSelectedModule: (value: number | null) => void;
}

function SlideAcademia({ selectedModule, setSelectedModule }: SlideAcademiaProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="text-7xl mb-4">🎓</div>
        <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
          Academia Evolución
        </h2>
        <p className="text-3xl text-slate-200">
          De la Teoría a la Transformación Real
        </p>
        <p className="text-lg text-purple-400 italic">
          Portal 98: El ecosistema que te guía paso a paso
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {academiaModules.map((module, i) => (
          <div
            key={i}
            onClick={() => setSelectedModule(selectedModule === i ? null : i)}
            className={`p-8 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedModule === i
                ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-400 scale-105 shadow-xl shadow-purple-500/30'
                : 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 hover:border-purple-400'
            }`}
          >
            <div className="text-6xl mb-4">{module.icon}</div>
            <h3 className="text-2xl font-bold text-purple-300 mb-3">{module.title}</h3>
            <p className="text-slate-200 mb-4">{module.desc}</p>
            <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-400/30 rounded-full">
              <span className="text-orange-300 text-sm font-bold">⏱️ {module.duration}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-2xl p-8">
        <h3 className="text-3xl font-bold text-purple-300 mb-6 text-center">Metodología Portal 98</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-5xl mb-3">📚</div>
            <h4 className="text-xl font-bold text-purple-400 mb-2">Aprender</h4>
            <p className="text-slate-300">Fundamentos teóricos + casos reales</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-3">🛠️</div>
            <h4 className="text-xl font-bold text-pink-400 mb-2">Construir</h4>
            <p className="text-slate-300">Implementación guiada en tu proyecto</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-3">🚀</div>
            <h4 className="text-xl font-bold text-orange-400 mb-2">Escalar</h4>
            <p className="text-slate-300">Mentoría para multiplicar resultados</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
          <Users size={32} />
          Lo Que Obtienes
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">✅</span>
            <div>
              <strong className="text-cyan-400">Comunidad privada</strong>
              <p className="text-slate-300 text-sm">Acceso a otros líderes navegando la misma transformación</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-3xl">✅</span>
            <div>
              <strong className="text-cyan-400">Mentoría 1:1</strong>
              <p className="text-slate-300 text-sm">Sesiones personalizadas para tu contexto específico</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-3xl">✅</span>
            <div>
              <strong className="text-cyan-400">Frameworks ejecutables</strong>
              <p className="text-slate-300 text-sm">Plantillas y workflows listos para usar</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-3xl">✅</span>
            <div>
              <strong className="text-cyan-400">Actualizaciones continuas</strong>
              <p className="text-slate-300 text-sm">El campo AGI cambia rápido, nosotros también</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center bg-purple-500/10 border-l-4 border-purple-500 p-6 rounded-r-xl">
        <p className="text-2xl italic text-purple-200">
          &quot;No vendemos cursos. Construimos capacidades.<br />
          <span className="text-pink-400">Academia Evolución es tu partner de transformación.&quot;</span>
        </p>
      </div>
    </div>
  );
}

function SlideSistemaCompleto() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          El Sistema Completo
        </h2>
        <p className="text-3xl text-slate-200">
          Cortex + Academia = Tu Ventaja Insustituible
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-6xl">🧠</div>
            <h3 className="text-3xl font-bold text-cyan-300">Cortex</h3>
          </div>
          <p className="text-xl text-slate-200 mb-6">
            <strong className="text-cyan-400">El &quot;QUÉ&quot; y el &quot;CÓMO&quot;</strong><br />
            La infraestructura técnica que ejecuta
          </p>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">→</span>
              <span>Captura y conecta conocimiento automáticamente</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">→</span>
              <span>Orquesta 20+ agentes especializados</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">→</span>
              <span>Trabaja 24/7 construyendo tu moat de datos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">→</span>
              <span>Mantiene soberanía total de tu información</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-6xl">🎓</div>
            <h3 className="text-3xl font-bold text-purple-300">Academia</h3>
          </div>
          <p className="text-xl text-slate-200 mb-6">
            <strong className="text-purple-400">El &quot;POR QUÉ&quot; y el &quot;CUÁNDO&quot;</strong><br />
            La guía estratégica que decide
          </p>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-400">→</span>
              <span>Enseña a identificar qué automatizar vs. conservar humano</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">→</span>
              <span>Entrena criterio para decisiones con IA</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">→</span>
              <span>Construye moats de marca, confianza y experiencia</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">→</span>
              <span>Conecta con comunidad de transformadores</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-4 border-cyan-500 rounded-2xl p-10">
        <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
          La Sinergia
        </h3>
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="text-center">
            <div className="text-5xl mb-4">🧠</div>
            <p className="text-lg text-cyan-300 font-bold">Cortex ejecuta</p>
            <p className="text-sm text-slate-400 mt-2">Automatiza lo repetible</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-4">⚡</div>
            <p className="text-2xl text-white font-bold">+</p>
            <p className="text-sm text-slate-400 mt-2">Potencia multiplicadora</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🎓</div>
            <p className="text-lg text-purple-300 font-bold">Academia guía</p>
            <p className="text-sm text-slate-400 mt-2">Preserva lo estratégico</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <div className="text-6xl mb-4">🦅</div>
          <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            = Valor Irreplicable
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-500/10 border-2 border-green-500/30 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">📈</div>
          <h4 className="text-xl font-bold text-green-400 mb-2">Velocidad</h4>
          <p className="text-slate-300">Implementación en semanas, no meses</p>
        </div>
        <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">🎯</div>
          <h4 className="text-xl font-bold text-blue-400 mb-2">Precisión</h4>
          <p className="text-slate-300">Adaptado a tu contexto específico</p>
        </div>
        <div className="bg-purple-500/10 border-2 border-purple-500/30 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">🛡️</div>
          <h4 className="text-xl font-bold text-purple-400 mb-2">Protección</h4>
          <p className="text-slate-300">Moats que crecen con cada decisión</p>
        </div>
      </div>
    </div>
  );
}

function SlideCTA() {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-6">
        <div className="text-8xl mb-4 animate-bounce">🦅</div>
        <h2 className="text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Tu Momento es Ahora
        </h2>
        <p className="text-3xl text-slate-200 max-w-4xl mx-auto leading-tight">
          La ventana para construir valor anti-comoditización<br />
          <span className="text-cyan-400 font-bold">está abierta, pero no por mucho tiempo</span>
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-2xl p-8">
          <div className="flex items-start gap-6">
            <div className="text-6xl">⏰</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-red-400 mb-3">La Realidad</h3>
              <p className="text-xl text-slate-200 leading-relaxed">
                Cada mes que pasa, AGI mejora exponencialmente.<br />
                Cada día que esperas, tu competencia prueba, aprende y construye moats.<br />
                <strong className="text-orange-400">El costo de la inacción crece más rápido que el de la acción.</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-2xl p-8 hover:scale-105 transition-all">
            <div className="text-6xl mb-4">🧠</div>
            <h3 className="text-3xl font-bold text-cyan-300 mb-4">Comienza con Cortex</h3>
            <p className="text-slate-200 mb-6">
              Implementa tu segundo cerebro anti-AGI y empieza a construir tu moat de datos desde el día 1
            </p>
            <button className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-400 text-slate-900 font-bold text-xl rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition-all">
              Instalar Cortex →
            </button>
            <p className="text-center text-cyan-400 text-sm mt-3">Setup guiado en menos de 1 hora</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-2xl p-8 hover:scale-105 transition-all">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-3xl font-bold text-purple-300 mb-4">Únete a Academia Evolución</h3>
            <p className="text-slate-200 mb-6">
              Transforma teoría en ejecución con mentoría, comunidad y frameworks probados
            </p>
            <button className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-400 text-white font-bold text-xl rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all">
              Aplicar a Portal 98 →
            </button>
            <p className="text-center text-purple-400 text-sm mt-3">Cupos limitados • Selección por aplicación</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-2xl p-8">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-6xl">🎁</div>
            <h3 className="text-3xl font-bold text-green-300">Pack Completo: Cortex + Academia</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-4xl mb-2">✅</div>
              <p className="text-slate-200">Cortex instalado y configurado</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">✅</div>
              <p className="text-slate-200">Acceso completo a Portal 98</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">✅</div>
              <p className="text-slate-200">4 sesiones de mentoría 1:1</p>
            </div>
          </div>
          <button className="w-full px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-400 text-slate-900 font-black text-2xl rounded-full hover:shadow-2xl hover:shadow-green-500/50 transition-all animate-pulse">
            🚀 Transformación Completa →
          </button>
          <p className="text-center text-green-400 font-bold mt-4">Inversión total: Consultar • ROI medible en 90 días</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-4 border-cyan-500 rounded-2xl p-10 max-w-4xl mx-auto">
        <p className="text-4xl italic text-center leading-relaxed">
          <span className="text-slate-200">&quot;En la nueva economía del valor,</span><br />
          <span className="text-cyan-400">los que actúan primero</span><br />
          <span className="text-purple-400">con sistemas correctos</span><br />
          <span className="text-pink-400">construyen moats imposibles de replicar.&quot;</span>
        </p>
        <p className="text-center text-slate-400 mt-8 text-xl">
          — Academia Evolución × Cortex
        </p>
      </div>

      <div className="text-center space-y-4">
        <p className="text-2xl text-slate-300">
          ¿Preguntas? Hablemos.
        </p>
        <div className="flex justify-center gap-6">
          <button className="px-6 py-3 border-2 border-cyan-500 text-cyan-400 rounded-full hover:bg-cyan-500 hover:text-slate-900 transition-all">
            📧 Contacto
          </button>
          <button className="px-6 py-3 border-2 border-purple-500 text-purple-400 rounded-full hover:bg-purple-500 hover:text-white transition-all">
            💬 WhatsApp
          </button>
          <button className="px-6 py-3 border-2 border-blue-500 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all">
            📅 Agendar Demo
          </button>
        </div>
      </div>
    </div>
  );
}
