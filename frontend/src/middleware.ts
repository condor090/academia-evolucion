import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log(`[MIDDLEWARE] ${new Date().toISOString()} - ${request.method} ${request.url}`)
  
  // Log headers
  console.log('[MIDDLEWARE] Headers:', Object.fromEntries(request.headers.entries()))
  
  return NextResponse.next()
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}