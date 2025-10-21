import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'inscripciones.json')

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Verificar si el archivo existe
    if (!fs.existsSync(DATA_FILE)) {
      return res.status(200).json([])
    }

    // Leer inscripciones
    const data = fs.readFileSync(DATA_FILE, 'utf8')
    const inscripciones = JSON.parse(data)

    return res.status(200).json(inscripciones)
  } catch (error) {
    console.error('Error al leer inscripciones:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}