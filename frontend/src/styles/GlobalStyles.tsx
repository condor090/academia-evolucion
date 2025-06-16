import { Global, css } from '@emotion/react'
import { theme } from './theme'

export const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        font-size: 16px;
        scroll-behavior: smooth;
      }

      body {
        font-family: ${theme.fonts.primary};
        background-color: ${theme.colors.background.black};
        color: ${theme.colors.text.white};
        line-height: 1.6;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding-top: 80px;
        font-weight: 300;
      }

      ::selection {
        background-color: ${theme.colors.primary.gold};
        color: ${theme.colors.background.black};
      }

      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: ${theme.colors.background.darkGray};
      }

      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.primary.darkGold};
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.primary.gold};
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      button {
        cursor: pointer;
        font-family: inherit;
        border: none;
        outline: none;
      }

      input, textarea {
        font-family: inherit;
        outline: none;
      }

      h1, h2, h3, h4, h5, h6 {
        font-weight: 300;
        line-height: 1.2;
      }

      .gold-gradient-text {
        background: ${theme.gradients.goldPrimary};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .sophia-glow {
        box-shadow: ${theme.colors.shadows.goldGlow};
      }

      .sophia-glow-intense {
        box-shadow: ${theme.colors.shadows.goldGlowIntense};
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 0.5;
        }
        50% {
          transform: scale(1.1);
          opacity: 1;
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-15px);
        }
      }

      @keyframes goldShimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }

      @keyframes textShimmer {
        0% {
          background-position: -200% center;
        }
        100% {
          background-position: 200% center;
        }
      }

      @keyframes blurToFocus {
        0% {
          filter: blur(5px);
          opacity: 0;
        }
        100% {
          filter: blur(0);
          opacity: 1;
        }
      }

      @keyframes subtleGlow {
        0%, 100% {
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }
        50% {
          text-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4);
        }
      }

      .animate-fadeIn {
        animation: fadeIn 0.8s ease-out;
      }

      .animate-fadeInUp {
        animation: fadeInUp 1s ease-out;
      }

      .animate-pulse {
        animation: pulse 2s ease-in-out infinite;
      }

      .animate-float {
        animation: float 6s ease-in-out infinite;
      }

      .loading-skeleton {
        background: linear-gradient(
          90deg,
          ${theme.colors.background.darkGray} 25%,
          rgba(255, 215, 0, 0.1) 50%,
          ${theme.colors.background.darkGray} 75%
        );
        background-size: 1000px 100%;
        animation: goldShimmer 2s infinite;
      }

      @media (max-width: ${theme.breakpoints.md}) {
        html {
          font-size: 14px;
        }
      }
    `}
  />
)