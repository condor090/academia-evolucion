import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('[API/HEALTH] Request received:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    timestamp: new Date().toISOString()
  })
  
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Academia Evolución API is running'
  })
}