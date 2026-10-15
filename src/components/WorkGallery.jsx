import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CATEGORIES, PHOTOS } from '../data/photos';
import PhotoCard from './PhotoCard';

gsap.registerPlugin(ScrollTrigger);

export default function WorkGallery({ onPhotoClick, reducedMotion = false }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef(null);
  const titleMaskRef = useRef(null);
  const gridRef = useRef(null);

  // Filtered photos
  const filteredPhotos =
    activeCategory === 'All'
      ? PHOTOS
      : PHOTOS.filter((p) => p.category === activeCategory);

  // Section title masked reveal
  useEffect(() => {
    if (reducedMotion || !titleMaskRef.current) return;

    const titleEl = titleMaskRef.current.querySelector('.masked-title-inner');
    const labelEl = sectionRef.current.querySelector('.section-label');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleEl,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleMaskRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(
        labelEl,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleMaskRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Smooth reflow when active category changes
  useEffect(() => {
    if (reducedMotion || !gridRef.current) return;

    const cards = gridRef.current.children;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: 'power2.out'
      }
    );
  }, [activeCategory, reducedMotion]);

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        paddingTop: 'var(--space-2xl)',
        paddingBottom: 'var(--space-xl)',
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--line)'
      }}
      aria-label="Photography Portfolio Gallery"
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <span className="section-label">SELECTED WORKS</span>
          <div
            ref={titleMaskRef}
            style={{ overflow: 'hidden', paddingBottom: '0.2rem' }}
          >
            <h2
              className="section-title masked-title-inner"
              style={{ margin: 0 }}
            >
              Quiet Perspectives
            </h2>
          </div>
        </div>

        {/* Filter Navigation Row */}
        <div
          className="filter-bar"
          role="toolbar"
          aria-label="Filter works by category"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(0.75rem, 2vw, 2rem)',
            borderBottom: '1px solid var(--line)',
            paddingBottom: '1.25rem',
            marginBottom: 'var(--space-lg)'
          }}
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className="font-mono filter-btn"
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--muted)',
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  padding: '4px 0',
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color var(--duration-fast) ease'
                }}
              >
                {isActive && (
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent)',
                      display: 'inline-block'
                    }}
                  />
                )}
                {category}
              </button>
            );
          })}
        </div>

        {/* Responsive Masonry / Column Grid (3 cols desktop, 2 tablet, 1 mobile) */}
        <div
          ref={gridRef}
          className="gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(1rem, 2vw, 2rem)',
            alignItems: 'start'
          }}
        >
          {filteredPhotos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              onClick={() => onPhotoClick(photo, filteredPhotos)}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>

      <style>{`
        .filter-btn:hover {
          color: var(--text) !important;
        }
        .filter-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }
        @media (max-width: 1023px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
