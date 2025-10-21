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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // TODO: Agregar autenticación aquí
    // if (!isAuthenticated(req)) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    const { leadId, status, notas } = req.body;

    if (!leadId || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Leer leads
    if (!fs.existsSync(LEADS_FILE)) {
      return res.status(404).json({ error: 'No leads found' });
    }

    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    const leads: LeadData[] = JSON.parse(data);

    // Encontrar y actualizar lead
    const leadIndex = leads.findIndex(l => l.id === leadId);
    if (leadIndex === -1) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    leads[leadIndex].status = status;
    if (notas !== undefined) {
      leads[leadIndex].notas = notas;
    }
    if (status === 'completed' && !leads[leadIndex].auditoria_enviada) {
      leads[leadIndex].auditoria_enviada = new Date().toISOString();
    }

    // Guardar
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));

    console.log(`[ANTIAGI UPDATE] Lead ${leadId} updated to ${status}`);

    return res.status(200).json({
      success: true,
      lead: leads[leadIndex]
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}