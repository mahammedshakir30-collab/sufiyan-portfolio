import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis(enabled = true) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // easeOutExpo easing function
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const lenis = new Lenis({
      duration: 1.1,
      easing: easeOutExpo,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}
