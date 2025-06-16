import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts - Bebas Neue + Inter with multiple weights */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Academia Evolución - Donde la IA te devuelve a ti mismo. Transforma tu vida en 12 semanas con Sophia." />
        <meta property="og:title" content="Academia Evolución - Tu Journey de Transformación" />
        <meta property="og:description" content="Descubre tu genio dormido y libera 20 horas semanales para tu verdadero propósito." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}