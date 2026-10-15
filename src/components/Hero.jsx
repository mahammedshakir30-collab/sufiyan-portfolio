import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_PHOTO } from '../data/photos';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ reducedMotion = false }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textGroupRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !imageRef.current) return;

    // Parallax on the hero image only (max 8% travel)
    const parallaxTween = gsap.to(imageRef.current, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Hero initial reveal
    const nameEl = textGroupRef.current?.querySelector('.hero-name');
    const taglineEl = textGroupRef.current?.querySelector('.hero-tagline');
    const cueEl = textGroupRef.current?.querySelector('.hero-scroll-cue');

    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      [nameEl, taglineEl, cueEl],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out'
      }
    );

    return () => {
      parallaxTween.kill();
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '620px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        backgroundColor: 'var(--bg)'
      }}
      aria-label="Introduction & Featured Photograph"
    >
      {/* Background Featured Photo with Parallax */}
      <div
        style={{
          position: 'absolute',
          top: '-5%',
          left: 0,
          width: '100%',
          height: '115%',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        <img
          ref={imageRef}
          src={HERO_PHOTO.src}
          srcSet="/photos/sufiyan-portrait-mobile.jpg 540w, /photos/sufiyan-portrait.jpg 768w"
          sizes="100vw"
          alt={HERO_PHOTO.alt}
          fetchpriority="high"
          loading="eager"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 25%',
            filter: 'grayscale(100%) brightness(0.85) contrast(1.15)'
          }}
        />

        {/* Minimal Vignette & Scrim */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(11,11,12,0.95) 0%, rgba(11,11,12,0.4) 40%, rgba(11,11,12,0.15) 65%, rgba(11,11,12,0.65) 100%)'
          }}
        />
      </div>

      {/* Content Container (Bottom-left & Bottom-right) */}
      <div
        ref={textGroupRef}
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '100%'
        }}
      >
        {/* Bottom Left: Huge Name & Tagline */}
        <div style={{ maxWidth: '820px' }}>
          <h1
            className="hero-name font-display"
            style={{
              fontSize: 'clamp(3.75rem, 12vw, 10.5rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.035em',
              color: 'var(--text)',
              marginBottom: 'clamp(1rem, 1.8vw, 1.5rem)',
              fontStyle: 'italic'
            }}
          >
            Sufiyan
          </h1>

          <p
            className="hero-tagline font-mono"
            style={{
              color: 'var(--text)',
              opacity: 0.85,
              fontSize: 'clamp(11px, 1.1vw, 13px)',
              letterSpacing: '0.12em',
              lineHeight: 1.6,
              maxWidth: '520px'
            }}
          >
            Observing quiet narratives, fleeting light, and human presence.
          </p>
        </div>

        {/* Bottom Right: Scroll cue */}
        <div
          className="hero-scroll-cue font-mono"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.6rem',
            color: 'var(--muted)',
            fontSize: '11px',
            letterSpacing: '0.14em',
            paddingBottom: '0.5rem'
          }}
          aria-hidden="true"
        >
          <span>SCROLL</span>
          <div
            style={{
              width: '1px',
              height: '36px',
              backgroundColor: 'var(--line)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              className="scroll-line-pulse"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '50%',
                backgroundColor: 'var(--accent)',
                animation: 'scrollPulse 2s ease-in-out infinite'
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
        @media (max-width: 640px) {
          .hero-scroll-cue {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
