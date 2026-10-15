import React, { useEffect, useRef, useCallback } from 'react';

export default function Lightbox({
  photo,
  photosList = [],
  currentIndex = 0,
  onClose,
  onNavigate,
  reducedMotion = false
}) {
  const modalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const totalPhotos = photosList.length;
  const currentPhoto = photosList[currentIndex] || photo;

  // Preload adjacent images
  useEffect(() => {
    if (!photosList || photosList.length <= 1) return;

    const nextIndex = (currentIndex + 1) % photosList.length;
    const prevIndex = (currentIndex - 1 + photosList.length) % photosList.length;

    const nextImg = new Image();
    nextImg.src = photosList[nextIndex].src;

    const prevImg = new Image();
    prevImg.src = photosList[prevIndex].src;
  }, [currentIndex, photosList]);

  // Keyboard navigation & Esc to close
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNavigate((currentIndex + 1) % totalPhotos);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onNavigate((currentIndex - 1 + totalPhotos) % totalPhotos);
      } else if (e.key === 'Tab') {
        // Simple focus trap inside lightbox
        if (!modalRef.current) return;
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], [tabindex="0"]'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    },
    [currentIndex, totalPhotos, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // Focus modal container on mount
    modalRef.current?.focus();

    // Lock body scroll while modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleKeyDown]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Check if horizontal swipe is dominant and exceeds threshold
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      if (deltaX < 0) {
        // Swiped Left -> Next
        onNavigate((currentIndex + 1) % totalPhotos);
      } else {
        // Swiped Right -> Previous
        onNavigate((currentIndex - 1 + totalPhotos) % totalPhotos);
      }
    }
  };

  const counterString = `${String(currentIndex + 1).padStart(2, '0')} / ${String(
    totalPhotos
  ).padStart(2, '0')}`;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery Lightbox: ${currentPhoto.title}`}
      tabIndex={-1}
      className="lightbox-overlay"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(11, 11, 12, 0.96)',
        backdropFilter: 'blur(16px)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(1rem, 3vw, 2.5rem)',
        outline: 'none',
        animation: reducedMotion ? 'none' : 'lightboxFade 0.35s ease-out forwards'
      }}
    >
      {/* Top Bar: Counter & Close Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          zIndex: 10
        }}
      >
        <span
          className="font-mono"
          style={{
            color: 'var(--accent)',
            fontSize: '12px',
            letterSpacing: '0.12em'
          }}
        >
          {counterString}
        </span>

        <button
          onClick={onClose}
          aria-label="Close Lightbox (Esc)"
          className="lightbox-close-btn font-mono"
          style={{
            color: 'var(--text)',
            fontSize: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px',
            transition: 'color var(--duration-fast) ease'
          }}
        >
          <span>CLOSE</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Center Image Stage with Previous / Next Arrows */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '1rem 0'
        }}
      >
        {/* Previous Button */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + totalPhotos) % totalPhotos)}
          aria-label="Previous photograph"
          className="lightbox-nav-btn prev-btn"
          style={{
            position: 'absolute',
            left: 0,
            zIndex: 10,
            color: 'var(--text)',
            padding: '16px',
            opacity: 0.6,
            transition: 'opacity 0.2s ease, transform 0.2s ease'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Current Image Container */}
        <div
          className="lightbox-image-stage"
          style={{
            maxWidth: '85vw',
            maxHeight: '76vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            key={currentPhoto.src}
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            style={{
              maxWidth: '100%',
              maxHeight: '76vh',
              objectFit: 'contain',
              boxShadow: 'none',
              animation: reducedMotion ? 'none' : 'lightboxImgPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          />
        </div>

        {/* Next Button */}
        <button
          onClick={() => onNavigate((currentIndex + 1) % totalPhotos)}
          aria-label="Next photograph"
          className="lightbox-nav-btn next-btn"
          style={{
            position: 'absolute',
            right: 0,
            zIndex: 10,
            color: 'var(--text)',
            padding: '16px',
            opacity: 0.6,
            transition: 'opacity 0.2s ease, transform 0.2s ease'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Bottom Metadata Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          width: '100%',
          borderTop: '1px solid var(--line)',
          paddingTop: '0.85rem'
        }}
      >
        <span
          className="font-mono"
          style={{
            color: 'var(--text)',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.08em'
          }}
        >
          {currentPhoto.title}
        </span>
        <span
          className="font-mono"
          style={{
            color: 'var(--muted)',
            fontSize: '11px',
            letterSpacing: '0.12em'
          }}
        >
          {currentPhoto.category}
        </span>
      </div>

      <style>{`
        @keyframes lightboxFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes lightboxImgPop {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .lightbox-close-btn:hover {
          color: var(--accent) !important;
        }
        .lightbox-nav-btn:hover {
          opacity: 1 !important;
          color: var(--accent) !important;
        }
        .prev-btn:hover {
          transform: translateX(-4px);
        }
        .next-btn:hover {
          transform: translateX(4px);
        }
        @media (max-width: 640px) {
          .lightbox-nav-btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
