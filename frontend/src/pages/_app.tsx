import type { AppProps } from 'next/app'
import { GlobalStyles } from '@/styles/GlobalStyles'
import { Navigation } from '@/components/common/Navigation'
import { AuthProvider } from '@/contexts/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GlobalStyles />
      <Navigation />
      <Component {...pageProps} />
    </AuthProvider>
  )
}