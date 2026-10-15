import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ reducedMotion = false }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        paddingTop: 'var(--space-2xl)',
        paddingBottom: 'var(--space-2xl)',
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--line)'
      }}
      aria-label="Contact and Inquiries"
    >
      <div className="container" ref={contentRef}>
        {/* Status Line with Pulsing Accent Dot */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: 'var(--space-md)'
          }}
        >
          <span
            className="status-dot"
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              display: 'inline-block',
              boxShadow: '0 0 10px var(--accent)'
            }}
          />
          <span
            className="font-mono"
            style={{
              color: 'var(--text)',
              fontSize: '12px',
              letterSpacing: '0.14em',
              fontWeight: 500
            }}
          >
            AVAILABLE FOR BOOKINGS & COMMISSIONS
          </span>
        </div>

        {/* Section Heading */}
        <p
          className="font-mono"
          style={{
            color: 'var(--muted)',
            fontSize: '12px',
            letterSpacing: '0.12em',
            marginBottom: '1rem'
          }}
        >
          DIRECT INQUIRY
        </p>

        {/* Huge Clickable Email */}
        <div style={{ marginBottom: 'var(--space-xl)', overflowWrap: 'break-word' }}>
          <a
            href="mailto:Ahmed12sufyan12@gmail.com"
            className="contact-email font-display"
            aria-label="Send email to Ahmed12sufyan12@gmail.com"
            style={{
              fontSize: 'clamp(2.4rem, 6.2vw, 6.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              display: 'inline-block',
              position: 'relative',
              transition: 'color var(--duration-fast) ease'
            }}
          >
            Ahmed12sufyan12@gmail.com
            <span
              className="email-underline"
              style={{
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: 'var(--accent)',
                transform: 'scaleX(0.15)',
                transformOrigin: 'left',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          </a>
        </div>

        {/* Channels: Phone / WhatsApp and Instagram */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(2rem, 5vw, 4rem)',
            borderTop: '1px solid var(--line)',
            paddingTop: 'var(--space-md)'
          }}
        >
          {/* Phone & WhatsApp */}
          <div>
            <span
              className="font-mono"
              style={{
                display: 'block',
                color: 'var(--muted)',
                fontSize: '11px',
                marginBottom: '0.35rem'
              }}
            >
              PHONE & WHATSAPP
            </span>
            <a
              href="https://wa.me/919207313032"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body contact-channel-link"
              style={{
                fontSize: '16px',
                color: 'var(--text)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              +91 9207313032 ↗
            </a>
          </div>

          {/* Instagram */}
          <div>
            <span
              className="font-mono"
              style={{
                display: 'block',
                color: 'var(--muted)',
                fontSize: '11px',
                marginBottom: '0.35rem'
              }}
            >
              INSTAGRAM
            </span>
            <a
              href="https://instagram.com/shaan.shoot"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body contact-channel-link"
              style={{
                fontSize: '16px',
                color: 'var(--text)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              @shaan.shoot ↗
            </a>
          </div>

          {/* Location */}
          <div>
            <span
              className="font-mono"
              style={{
                display: 'block',
                color: 'var(--muted)',
                fontSize: '11px',
                marginBottom: '0.35rem'
              }}
            >
              BASE
            </span>
            <span
              className="font-body"
              style={{
                fontSize: '16px',
                color: 'var(--text)'
              }}
            >
              Kerala, India / Open to Travel
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .contact-email:hover {
          color: var(--accent) !important;
        }
        .contact-email:hover .email-underline {
          transform: scaleX(1) !important;
        }
        .contact-channel-link:hover {
          color: var(--accent) !important;
        }
        .status-dot {
          animation: statusGlow 2.5s infinite ease-in-out;
        }
        @keyframes statusGlow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.85);
          }
        }
      `}</style>
    </section>
  );
}
