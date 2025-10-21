import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

interface InscripcionData {
  id: string
  nombre: string
  apellido: string
  email: string
  telefono: string
  pais: string
  motivacion: string
  experienciaPrevia: string
  disponibilidad: string
  plan: string
  fecha: string
  status: 'pending' | 'confirmed' | 'completed'
}

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'inscripciones.json')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf8')
}

function readInscripciones(): InscripcionData[] {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading inscripciones:', error)
    return []
  }
}

function writeInscripciones(inscripciones: InscripcionData[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(inscripciones, null, 2), 'utf8')
}

function generateId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `AE-${timestamp}-${random}`
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      nombre,
      apellido,
      email,
      telefono,
      pais,
      motivacion,
      experienciaPrevia,
      disponibilidad,
      plan
    } = req.body

    // Validación básica
    if (!nombre || !apellido || !email || !telefono || !pais || !motivacion || !disponibilidad || !plan) {
      return res.status(400).json({ error: 'Faltan campos requeridos' })
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' })
    }

    // Leer inscripciones existentes
    const inscripciones = readInscripciones()

    // Verificar si el email ya está registrado
    const existingInscripcion = inscripciones.find(i => i.email.toLowerCase() === email.toLowerCase())
    if (existingInscripcion) {
      return res.status(409).json({
        error: 'Este email ya está registrado',
        inscripcionId: existingInscripcion.id
      })
    }

    // Crear nueva inscripción
    const nuevaInscripcion: InscripcionData = {
      id: generateId(),
      nombre,
      apellido,
      email,
      telefono,
      pais,
      motivacion,
      experienciaPrevia: experienciaPrevia || '',
      disponibilidad,
      plan,
      fecha: new Date().toISOString(),
      status: 'pending'
    }

    // Agregar al array
    inscripciones.push(nuevaInscripcion)

    // Guardar
    writeInscripciones(inscripciones)

    // TODO: Enviar email de confirmación
    console.log(`[INSCRIPCIÓN] Nueva inscripción: ${nuevaInscripcion.id} - ${nombre} ${apellido} - Plan: ${plan}`)

    return res.status(201).json({
      success: true,
      inscripcion: {
        id: nuevaInscripcion.id,
        nombre: nuevaInscripcion.nombre,
        apellido: nuevaInscripcion.apellido,
        email: nuevaInscripcion.email,
        plan: nuevaInscripcion.plan,
        status: nuevaInscripcion.status
      },
      message: 'Inscripción registrada exitosamente'
    })
  } catch (error) {
    console.error('Error al procesar inscripción:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}