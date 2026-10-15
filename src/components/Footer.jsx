import React from 'react';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--line)',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        backgroundColor: 'var(--bg)'
      }}
      aria-label="Colophon and Copyright"
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}
      >
        {/* Left: Copyright & Name */}
        <span
          className="font-mono"
          style={{
            color: 'var(--muted)',
            fontSize: '11px',
            letterSpacing: '0.08em'
          }}
        >
          © {currentYear} SUFIYAN. ALL RIGHTS RESERVED.
        </span>

        {/* Center: Instagram Handle */}
        <a
          href="https://instagram.com/shaan.shoot"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono footer-handle"
          style={{
            color: 'var(--text)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            transition: 'color var(--duration-fast) ease'
          }}
        >
          @SHAAN.SHOOT
        </a>

        {/* Right: Back to top */}
        <button
          onClick={scrollToTop}
          className="font-mono back-to-top-btn"
          aria-label="Scroll back to top of page"
          style={{
            color: 'var(--muted)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color var(--duration-fast) ease'
          }}
        >
          <span>BACK TO TOP</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>

      <style>{`
        .footer-handle:hover,
        .back-to-top-btn:hover {
          color: var(--accent) !important;
        }
      `}</style>
    </footer>
  );
}
