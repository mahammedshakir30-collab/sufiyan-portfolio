import React, { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className="site-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          mixBlendMode: 'difference',
          pointerEvents: 'none'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'clamp(1.25rem, 2.5vw, 2rem)',
            paddingBottom: 'clamp(1.25rem, 2.5vw, 2rem)'
          }}
        >
          {/* Brand Wordmark */}
          <a
            href="#hero"
            className="header-wordmark"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 2.8vw, 2.25rem)',
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              fontStyle: 'italic',
              pointerEvents: 'auto',
              lineHeight: 1
            }}
            aria-label="Sufiyan Portfolio Home"
          >
            Sufiyan
          </a>

          {/* Desktop Navigation */}
          <nav
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(1.5rem, 2.5vw, 2.5rem)',
              pointerEvents: 'auto'
            }}
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono header-link"
                style={{
                  color: '#FFFFFF',
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  position: 'relative',
                  padding: '4px 0'
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Instagram Icon Link */}
            <a
              href="https://instagram.com/shaan.shoot"
              target="_blank"
              rel="noopener noreferrer"
              className="header-instagram-link"
              aria-label="Instagram @shaan.shoot"
              style={{
                color: '#FFFFFF',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            style={{
              color: '#FFFFFF',
              pointerEvents: 'auto',
              display: 'none',
              padding: '8px'
            }}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--bg)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'var(--gutter-mobile)',
            paddingTop: '6rem',
            paddingBottom: '3rem'
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 12vw, 4.5rem)',
                  lineHeight: 1.1,
                  color: 'var(--text)',
                  animation: `slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards ${idx * 0.08}s`
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            style={{
              borderTop: '1px solid var(--line)',
              paddingTop: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <a
              href="https://instagram.com/shaan.shoot"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono"
              style={{ color: 'var(--accent)', fontSize: '12px' }}
            >
              @shaan.shoot ↗
            </a>
            <span className="font-mono" style={{ color: 'var(--muted)', fontSize: '11px' }}>
              CALICUT / WORLDWIDE
            </span>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: inline-flex !important;
          }
        }
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .header-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1px;
          background-color: var(--accent);
          transition: width var(--duration-fast) ease;
        }
        .header-link:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
}
