import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface LeadData {
  id: string;
  timestamp: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  cargo: string;
  industria: string;
  tamano: string;
  urgencia: string;
  status: 'pending' | 'in_progress' | 'completed';
  auditoria_enviada?: string;
  notas?: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'antiagi-leads.json');

// Asegurar que el directorio existe
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Asegurar que el archivo existe
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2));
}

function readLeads(): LeadData[] {
  try {
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading leads:', error);
    return [];
  }
}

function writeLeads(leads: LeadData[]): void {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  } catch (error) {
    console.error('Error writing leads:', error);
    throw new Error('Failed to save lead data');
  }
}

function generateId(): string {
  return `ANTIAGI-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      nombre,
      email,
      telefono,
      empresa,
      cargo,
      industria,
      tamano,
      urgencia
    } = req.body;

    // Validación básica
    if (!nombre || !email || !telefono || !empresa || !cargo || !industria || !tamano) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    // Leer leads existentes
    const leads = readLeads();

    // Verificar si el email ya existe
    const existingLead = leads.find(lead => lead.email.toLowerCase() === email.toLowerCase());
    if (existingLead) {
      return res.status(409).json({
        error: 'Este email ya está registrado',
        leadId: existingLead.id
      });
    }

    // Crear nuevo lead
    const newLead: LeadData = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      nombre,
      email: email.toLowerCase(),
      telefono,
      empresa,
      cargo,
      industria,
      tamano,
      urgencia: urgencia || 'media',
      status: 'pending'
    };

    // Agregar al inicio del array (los más nuevos primero)
    leads.unshift(newLead);

    // Guardar
    writeLeads(leads);

    // TODO: Aquí puedes agregar:
    // - Envío de email de confirmación con nodemailer
    // - Notificación a Slack/Discord
    // - Trigger de automation en CRM

    // Log para monitoreo
    console.log(`[ANTIAGI LEAD] New registration: ${newLead.id} - ${empresa} (${industria}) - Urgencia: ${urgencia}`);

    // Respuesta exitosa
    return res.status(201).json({
      success: true,
      message: 'Registro exitoso',
      leadId: newLead.id,
      queuePosition: leads.filter(l => l.status === 'pending').length
    });

  } catch (error) {
    console.error('Error processing lead:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}