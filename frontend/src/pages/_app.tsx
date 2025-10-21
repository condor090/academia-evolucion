import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { GlobalStyles } from '@/styles/GlobalStyles'
import { Navigation } from '@/components/common/Navigation'
import { AuthProvider } from '@/contexts/AuthContext'
import '@/styles/antiagi.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()

  // Usar el layout custom si existe, sino usar el layout por defecto
  const getLayout = Component.getLayout ?? ((page) => (
    <>
      <GlobalStyles />
      <Navigation />
      {page}
    </>
  ))
  
  useEffect(() => {
    console.log(`[_APP] ${new Date().toISOString()} - Route: ${router.asPath}`)
    console.log('[_APP] Component:', Component.name || 'Unknown')
    console.log('[_APP] PageProps:', pageProps)
    console.log('[_APP] Window location:', typeof window !== 'undefined' ? window.location.href : 'SSR')
  }, [router.asPath, Component, pageProps])

  useEffect(() => {
    console.log('[_APP] App mounted at:', new Date().toISOString())
    
    // Log any errors
    window.addEventListener('error', (e) => {
      console.error('[_APP] Global error:', e.error)
    })
    
    window.addEventListener('unhandledrejection', (e) => {
      console.error('[_APP] Unhandled rejection:', e.reason)
    })
    
    return () => {
      console.log('[_APP] App unmounting')
    }
  }, [])

  return (
    <AuthProvider>
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  )
}