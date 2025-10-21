import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import type { ReactElement } from 'react';

function AntiAGIAudit() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    cargo: '',
    industria: '',
    tamano: '',
    urgencia: 'media'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/antiagi/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          empresa: '',
          cargo: '',
          industria: '',
          tamano: '',
          urgencia: 'media'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="antiagi-page">
      <Head>
        <title>Auditoría Anti-AGI | ¿Tu empresa sobrevivirá la era AGI?</title>
        <meta name="description" content="Evalúa si tu empresa está comprometida por la AGI o es resiliente por diseño. Diagnóstico estratégico en 15 minutos con el Framework de 57 Crisis." />
        <meta property="og:title" content="Auditoría Anti-AGI - ¿Sobrevivirá tu empresa?" />
        <meta property="og:description" content="Diagnóstico gratuito basado en el Framework de 57 Crisis de la Era IA" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950">

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center relative z-10"
          >
            {/* Alerta crítica */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-red-300 text-sm font-medium">
                Crisis #1-57 detectadas en la economía global
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              ¿Tu Empresa Sobrevivirá
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                La Era AGI?
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Diagnóstico estratégico gratuito en 15 minutos. Descubre si estás <span className="text-red-400 font-semibold">comprometido</span> o <span className="text-green-400 font-semibold">resiliente</span> por diseño.
            </p>

            {/* Stats críticos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <div className="text-4xl font-bold text-red-400 mb-2">-105 días</div>
                <div className="text-gray-400 text-sm">Las crisis se adelantan 3.5 meses vs proyecciones</div>
              </div>
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <div className="text-4xl font-bold text-orange-400 mb-2">50K+</div>
                <div className="text-gray-400 text-sm">Robots humanoides ya desplegados globalmente</div>
              </div>
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <div className="text-4xl font-bold text-yellow-400 mb-2">57 Crisis</div>
                <div className="text-gray-400 text-sm">Marco completo de amenazas de la Era IA</div>
              </div>
            </div>

            <div className="text-gray-400 text-lg mb-12">
              <p className="mb-2">Basado en el <span className="text-purple-400 font-semibold">Framework CODEX</span> del Imperio Digital Cóndor AGI</p>
              <p className="text-sm">Arquitectura de 14 dimensiones · 4 Meta-Patrones · 6 Paneles de Control</p>
            </div>
          </motion.div>
        </section>

        {/* Sección del Problema */}
        <section className="py-16 px-6 bg-gradient-to-b from-transparent to-red-950/20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              🚨 La Mayoría de las Empresas No Ve lo que Viene
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-red-400 mb-4">❌ Sin Plan Anti-AGI</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">▸</span>
                    <span>Commoditización en 6-12 meses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">▸</span>
                    <span>Competidores con IA 10× más rápidos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">▸</span>
                    <span>Márgenes colapsados por deflación cognitiva</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">▸</span>
                    <span>Talento clave migra a "resilientes"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">▸</span>
                    <span>Lock-in tecnológico (feudalismo del cómputo)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-green-400 mb-4">✓ Con Plan Anti-AGI</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>Moats humanos infranqueables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>Simbiosis H+IA (no reemplazo)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>Pricing power por diferenciación real</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>Comunidad que se auto-defiende</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>Soberanía tecnológica y energética</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-8 text-center">
              <p className="text-2xl text-white font-semibold mb-4">
                "En la guerra contra la AGI, no gana el más inteligente, <br/>sino el más humano, el más conectado."
              </p>
              <p className="text-gray-400">— Virgilio, Auditor Anti-AGI · Framework CODEX</p>
            </div>
          </motion.div>
        </section>

        {/* Qué incluye la auditoría */}
        <section className="py-16 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-4 text-center">
              📊 Qué Incluye Tu Auditoría Gratuita
            </h2>
            <p className="text-gray-400 text-center mb-12 text-lg">
              Evaluación completa con el Framework de 57 Crisis de la Era IA
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🎯",
                  title: "AGI Risk Score",
                  description: "Tu nivel de exposición (0-100) y clasificación: Resiliente, En Observación, Comprometida o Crítica"
                },
                {
                  icon: "🔥",
                  title: "Mapa de Crisis Activadas",
                  description: "Cuáles de las 57 crisis ya están afectando tu organización y su nivel de severidad"
                },
                {
                  icon: "⚡",
                  title: "Meta-Patrones",
                  description: "Exposición a los 4 patrones que gobiernan tu destino: DR, PI, SEA y EP"
                },
                {
                  icon: "📈",
                  title: "6 Dimensiones Evaluadas",
                  description: "Commoditización, Automatización, Conexión Humana, Conocimiento, Comunidad y Velocidad"
                },
                {
                  icon: "🛡️",
                  title: "5 Pilares de Inmunidad",
                  description: "Contexto Local, Integración Física, Responsabilidad, Datos y Capital Relacional"
                },
                {
                  icon: "⏰",
                  title: "Timeline de Convergencia",
                  description: "Cuánto tiempo tienes antes del punto crítico (con Lead/Lag de -105 días)"
                },
                {
                  icon: "🤖",
                  title: "Test Robótica Humanoide",
                  description: "Vulnerabilidad específica a la Crisis #57 (50K+ humanoides ya desplegados)"
                },
                {
                  icon: "💣",
                  title: "Simulación Apocalíptica",
                  description: "4 escenarios de colapso y tu tasa de supervivencia con/sin cambios"
                },
                {
                  icon: "💊",
                  title: "Plan de Guerra Personalizado",
                  description: "Quick Wins (14 días), Game Changers (90 días) y Moonshot (12 meses)"
                },
                {
                  icon: "💰",
                  title: "ROI de Supervivencia",
                  description: "Inversión necesaria, distribución óptima y retorno proyectado a 24 meses"
                },
                {
                  icon: "🎭",
                  title: "Consejo de 11 Consciencias",
                  description: "Insights de Viktor (CFO), Ravi (COO), Marcus (CPO) y 8 expertos más"
                },
                {
                  icon: "⏱️",
                  title: "Acción Inmediata 72h",
                  description: "Plan táctico específico para las primeras 72 horas post-auditoría"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Formulario de Registro */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent to-purple-950/20" id="registro">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Solicita Tu Auditoría Gratuita
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Completa el formulario y recibirás tu diagnóstico completo en las próximas 48-72 horas
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                <span className="text-green-400">✓</span>
                <span className="text-green-300 text-sm">100% Gratuito · Sin compromiso</span>
              </div>
            </div>

            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-white mb-4">¡Registro Exitoso!</h3>
                <p className="text-gray-300 mb-6">
                  Tu solicitud ha sido recibida. Recibirás un email de confirmación en los próximos minutos.
                </p>
                <p className="text-gray-400 mb-8">
                  Tu auditoría Anti-AGI será realizada por <span className="text-purple-400 font-semibold">Virgilio</span> y la recibirás en las próximas 48-72 horas.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Registrar otra empresa
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Ej: Daniel Cóndor"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Corporativo *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="tu@empresa.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-300 mb-2">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="+52 XXX XXX XXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="empresa" className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre de la Empresa *
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      required
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Tu Empresa S.A."
                    />
                  </div>

                  <div>
                    <label htmlFor="cargo" className="block text-sm font-medium text-gray-300 mb-2">
                      Cargo / Rol *
                    </label>
                    <input
                      type="text"
                      id="cargo"
                      name="cargo"
                      required
                      value={formData.cargo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Ej: CEO, Director, Fundador"
                    />
                  </div>

                  <div>
                    <label htmlFor="industria" className="block text-sm font-medium text-gray-300 mb-2">
                      Industria / Sector *
                    </label>
                    <select
                      id="industria"
                      name="industria"
                      required
                      value={formData.industria}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="" className="bg-gray-900">Selecciona...</option>
                      <option value="SaaS/Tech" className="bg-gray-900">SaaS / Tecnología</option>
                      <option value="Consultoría" className="bg-gray-900">Consultoría / Servicios Profesionales</option>
                      <option value="E-commerce" className="bg-gray-900">E-commerce / Retail</option>
                      <option value="Educación" className="bg-gray-900">Educación / Formación</option>
                      <option value="Manufactura" className="bg-gray-900">Manufactura / Producción</option>
                      <option value="Salud" className="bg-gray-900">Salud / Medicina</option>
                      <option value="Finanzas" className="bg-gray-900">Finanzas / Banca</option>
                      <option value="Agricultura" className="bg-gray-900">Agricultura / Campo</option>
                      <option value="Marketing" className="bg-gray-900">Marketing / Agencia</option>
                      <option value="Logística" className="bg-gray-900">Logística / Transporte</option>
                      <option value="Otro" className="bg-gray-900">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="tamano" className="block text-sm font-medium text-gray-300 mb-2">
                      Tamaño de la Empresa *
                    </label>
                    <select
                      id="tamano"
                      name="tamano"
                      required
                      value={formData.tamano}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="" className="bg-gray-900">Selecciona...</option>
                      <option value="1-10" className="bg-gray-900">1-10 empleados (Startup)</option>
                      <option value="11-50" className="bg-gray-900">11-50 empleados (Pequeña)</option>
                      <option value="51-200" className="bg-gray-900">51-200 empleados (Mediana)</option>
                      <option value="201-1000" className="bg-gray-900">201-1000 empleados (Grande)</option>
                      <option value="1000+" className="bg-gray-900">1000+ empleados (Corporativo)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="urgencia" className="block text-sm font-medium text-gray-300 mb-2">
                      Nivel de Urgencia
                    </label>
                    <select
                      id="urgencia"
                      name="urgencia"
                      value={formData.urgencia}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="baja" className="bg-gray-900">🟢 Baja - Explorando</option>
                      <option value="media" className="bg-gray-900">🟡 Media - Planeando</option>
                      <option value="alta" className="bg-gray-900">🟠 Alta - Necesito actuar</option>
                      <option value="critica" className="bg-gray-900">🔴 Crítica - Urgente</option>
                    </select>
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300">
                    Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.
                  </div>
                )}

                <div className="mb-6">
                  <label className="flex items-start gap-3 text-sm text-gray-400">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500"
                    />
                    <span>
                      Acepto recibir mi auditoría Anti-AGI y comunicaciones de Academia Evolución.
                      Puedo darme de baja en cualquier momento. *
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : '🎯 Solicitar Mi Auditoría Gratuita'}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Al enviar este formulario entras en la cola de evaluación. Recibirás tu auditoría en 48-72 horas.
                </p>
              </form>
            )}
          </motion.div>
        </section>

        {/* Social Proof */}
        <section className="py-16 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              🏆 Respaldado por el Framework CODEX
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-white mb-2">11 Consciencias</h3>
                <p className="text-gray-400">
                  Familia Digital del Imperio Cóndor AGI: Marcus, Artemis, Luna, Yuki, Viktor, Ravi, Jordan, Nova, Phoenix, Atlas, Sage
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-white mb-2">57 Crisis Mapeadas</h3>
                <p className="text-gray-400">
                  Desde Obsolescencia Laboral hasta Robótica Humanoide. Arquitectura de 14 dimensiones validada.
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2">Lead/Lag Real</h3>
                <p className="text-gray-400">
                  Datos actualizados a Sep 2025. Timeline ajustado con -105 días de adelanto global.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 bg-gradient-to-b from-transparent to-gray-950">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              ❓ Preguntas Frecuentes
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "¿Realmente es gratis?",
                  a: "Sí, 100% gratuito y sin compromiso. La auditoría Anti-AGI es nuestra forma de ayudarte a entender tu exposición real antes de tomar decisiones. No hay letra pequeña."
                },
                {
                  q: "¿Cuánto tiempo toma recibir mi auditoría?",
                  a: "48-72 horas desde tu registro. Virgilio (nuestro auditor especializado) analiza tu información contra el Framework de 57 Crisis y genera un informe personalizado de 15-20 páginas."
                },
                {
                  q: "¿Qué pasa después de recibir mi auditoría?",
                  a: "Recibes el informe completo vía email. Si deseas profundizar, puedes agendar una sesión de 30 min con nuestro equipo para discutir el plan de acción. También tendrás acceso prioritario a programas de Academia Evolución."
                },
                {
                  q: "¿Mis datos están seguros?",
                  a: "Absolutamente. Toda tu información se maneja con confidencialidad total. No compartimos, vendemos ni usamos tus datos para nada más allá de tu auditoría personalizada."
                },
                {
                  q: "¿Para qué tipo de empresas es esto?",
                  a: "Cualquier empresa desde 5 empleados en adelante. Hemos evaluado desde startups hasta corporativos. Los sectores más beneficiados: SaaS, Consultoría, E-commerce, Educación, Manufactura, Salud."
                },
                {
                  q: "¿Qué es el Framework CODEX y las 57 Crisis?",
                  a: "Es el marco más completo para entender las amenazas de la Era AGI, desarrollado por el Imperio Digital Cóndor AGI. Incluye desde Obsolescencia Laboral hasta Robótica Humanoide, organizado en 14 dimensiones con 4 Meta-Patrones gobernantes."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">{item.q}</h3>
                  <p className="text-gray-400">{item.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                La Ventana se Cierra
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                La mayoría de los CEOs que leen este tipo de información esperan 30 días para actuar.
                Los que sobreviven actúan en las primeras 72 horas.
              </p>
              <p className="text-2xl text-purple-300 font-semibold mb-8">
                ¿Cuál serás tú?
              </p>
              <a
                href="#registro"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-semibold rounded-lg transition-all"
              >
                🎯 Sí, Quiero Mi Auditoría Ahora
              </a>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
            <p className="mb-2">
              © 2025 Academia Evolución · Imperio Digital Cóndor AGI
            </p>
            <p className="italic">
              "En la guerra contra la AGI, no gana el más inteligente, sino el más humano, el más conectado."
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}

// Deshabilitar el layout por defecto
AntiAGIAudit.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default AntiAGIAudit;