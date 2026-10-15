import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_PORTRAIT } from '../data/photos';
import ImageWithFallback from './ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

export default function About({ reducedMotion = false }) {
  const sectionRef = useRef(null);
  const imageColRef = useRef(null);
  const textColRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Fade and slide in portrait
      gsap.fromTo(
        imageColRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Slide in bio and services
      gsap.fromTo(
        textColRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const services = [
    { title: 'PORTRAITS', desc: 'Editorial, Fashion, Identity' },
    { title: 'EVENTS', desc: 'Live recitals, Ceremonies, Gatherings' },
    { title: 'COMMERCIAL', desc: 'Campaigns, Lookbooks, Still life' },
    { title: 'DOCUMENTARY', desc: 'Long-form narratives, Culture, Street' }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        paddingTop: 'var(--space-2xl)',
        paddingBottom: 'var(--space-2xl)',
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--line)'
      }}
      aria-label="About Sufiyan"
    >
      <div className="container">
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 460px) 1fr',
            gap: 'clamp(2.5rem, 6vw, 6rem)',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Portrait Slot */}
          <div ref={imageColRef} className="about-image-column">
            <span className="section-label" style={{ marginBottom: '1.25rem' }}>
              THE PHOTOGRAPHER
            </span>
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--line)'
              }}
            >
              <ImageWithFallback
                src={ABOUT_PORTRAIT.src}
                alt={ABOUT_PORTRAIT.alt}
                aspectRatio={ABOUT_PORTRAIT.aspectRatio}
                loading="lazy"
                style={{
                  filter: 'grayscale(15%) contrast(1.05)'
                }}
              />
              <div
                style={{
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--line)',
                  backgroundColor: 'var(--surface)'
                }}
              >
                <span className="font-mono" style={{ color: 'var(--text)', fontSize: '11px' }}>
                  SUFIYAN
                </span>
                <span className="font-mono" style={{ color: 'var(--accent)', fontSize: '11px' }}>
                  @SHAAN.SHOOT
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Services */}
          <div ref={textColRef} className="about-text-column">
            <span className="section-label">PRACTICE & PHILOSOPHY</span>
            <h2
              className="section-title"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                marginBottom: '1.5rem',
                lineHeight: 1.1
              }}
            >
              Capturing stillness between moments and light.
            </h2>

            {/* Short Bio (63 words - strictly within 70 words max) */}
            <p
              className="font-body"
              style={{
                color: 'var(--text)',
                opacity: 0.9,
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                lineHeight: 1.7,
                marginBottom: 'var(--space-lg)',
                maxWidth: '620px'
              }}
            >
              Sufiyan is an editorial and documentary photographer dedicated to capturing
              unscripted emotion, quiet presence, and nuanced light. Moving fluidly between intimate
              portraiture, live cultural recitals, and street vignettes, his lens observes genuine human
              stories without intrusion—preserving fleeting atmosphere into enduring imagery.
            </p>

            {/* Services List in Mono */}
            <div
              style={{
                borderTop: '1px solid var(--line)',
                paddingTop: 'var(--space-md)'
              }}
            >
              <span
                className="font-mono"
                style={{
                  color: 'var(--muted)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  display: 'block',
                  marginBottom: '1rem'
                }}
              >
                SELECTED SERVICES & COMMISSIONS
              </span>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.25rem'
                }}
              >
                {services.map((service, index) => (
                  <div
                    key={service.title}
                    style={{
                      borderLeft: '1px solid var(--line)',
                      paddingLeft: '1rem'
                    }}
                  >
                    <div
                      className="font-mono"
                      style={{
                        color: 'var(--accent)',
                        fontSize: '12px',
                        letterSpacing: '0.1em',
                        marginBottom: '0.25rem'
                      }}
                    >
                      0{index + 1} — {service.title}
                    </div>
                    <div
                      className="font-body"
                      style={{
                        color: 'var(--muted)',
                        fontSize: '13px',
                        lineHeight: 1.4
                      }}
                    >
                      {service.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .about-image-column {
            max-width: 420px;
          }
        }
      `}</style>
    </section>
  );
}
