import { useEffect } from 'react'

export const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    }, observerOptions)

    // Observe all elements with scroll-reveal class
    const elements = document.querySelectorAll('.scroll-reveal')
    elements.forEach(el => scrollObserver.observe(el))

    // Cleanup
    return () => {
      elements.forEach(el => scrollObserver.unobserve(el))
    }
  }, [])
}