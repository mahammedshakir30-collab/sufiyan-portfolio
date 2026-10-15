import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageWithFallback from './ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

export default function PhotoCard({
  photo,
  index,
  onClick,
  reducedMotion = false
}) {
  const cardRef = useRef(null);
  const clipWrapRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || !clipWrapRef.current) return;

    // Scroll reveal clip-path wipe from bottom to top plus subtle scale from 1.08 to 1
    const ctx = gsap.context(() => {
      gsap.fromTo(
        clipWrapRef.current,
        {
          clipPath: 'inset(100% 0% 0% 0%)',
          scale: 1.08,
          opacity: 0.8
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(photo, index);
    }
  };

  return (
    <figure
      ref={cardRef}
      className="photo-card"
      tabIndex={0}
      role="button"
      aria-label={`View ${photo.title} (${photo.category}) in full resolution`}
      onClick={() => onClick(photo, index)}
      onKeyDown={handleKeyDown}
      data-cursor="view"
      style={{
        position: 'relative',
        margin: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: 'var(--surface)'
      }}
    >
      <div
        ref={clipWrapRef}
        className="photo-card-inner"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div className="photo-card-img-wrap">
          <ImageWithFallback
            src={photo.src}
            alt={photo.alt}
            aspectRatio={photo.aspectRatio}
            loading="lazy"
            className="photo-card-img"
          />
        </div>

        {/* Hover Caption Overlay (title + category in small mono) */}
        <div
          className="photo-card-caption"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(1rem, 2vw, 1.5rem)',
            background:
              'linear-gradient(to top, rgba(11, 11, 12, 0.9) 0%, rgba(11, 11, 12, 0.2) 40%, transparent 100%)',
            opacity: 0,
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '1rem',
              borderTop: '1px solid var(--line)',
              paddingTop: '0.6rem'
            }}
          >
            <span
              className="font-mono"
              style={{
                color: 'var(--text)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.08em'
              }}
            >
              {photo.title}
            </span>
            <span
              className="font-mono"
              style={{
                color: 'var(--accent)',
                fontSize: '11px',
                letterSpacing: '0.12em'
              }}
            >
              {photo.category}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .photo-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .photo-card-img {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
          transform: scale(1);
        }
        .photo-card:hover .photo-card-img {
          transform: scale(1.04);
          filter: brightness(1.04);
        }
        .photo-card:hover .photo-card-caption {
          opacity: 1;
        }
        .photo-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }
      `}</style>
    </figure>
  );
}
