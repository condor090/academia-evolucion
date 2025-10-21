import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'antiagi-leads.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // TODO: Agregar autenticación aquí
    // if (!isAuthenticated(req)) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    // Leer archivo
    if (!fs.existsSync(LEADS_FILE)) {
      return res.status(200).json({ leads: [] });
    }

    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    const leads = JSON.parse(data);

    return res.status(200).json({ leads });
  } catch (error) {
    console.error('Error reading leads:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}