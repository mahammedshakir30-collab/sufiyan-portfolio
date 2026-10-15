import React, { useState } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useLenis } from './hooks/useLenis';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import WorkGallery from './components/WorkGallery';
import Lightbox from './components/Lightbox';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxPhotos, setLightboxPhotos] = useState([]);

  // Enable Lenis smooth scroll when preloader is complete and reduced-motion is not requested
  useLenis(preloaderDone && !reducedMotion);

  const handleOpenLightbox = (photo, list) => {
    const idx = list.findIndex((p) => p.id === photo.id);
    setActivePhotoIndex(idx !== -1 ? idx : 0);
    setLightboxPhotos(list);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const handleNavigateLightbox = (newIndex) => {
    setActivePhotoIndex(newIndex);
  };

  return (
    <>
      {/* 1.2s Preloader Reveal */}
      {!preloaderDone && (
        <Preloader
          onComplete={() => setPreloaderDone(true)}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Desktop Custom Cursor */}
      <CustomCursor reducedMotion={reducedMotion} />

      {/* Fixed Mix-Blend-Difference Header */}
      <Header />

      {/* Main Page Content */}
      <main id="main-content">
        <Hero reducedMotion={reducedMotion} />
        <About reducedMotion={reducedMotion} />
        <WorkGallery
          onPhotoClick={handleOpenLightbox}
          reducedMotion={reducedMotion}
        />
        <Contact reducedMotion={reducedMotion} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <Lightbox
          photosList={lightboxPhotos}
          currentIndex={activePhotoIndex}
          onClose={handleCloseLightbox}
          onNavigate={handleNavigateLightbox}
          reducedMotion={reducedMotion}
        />
      )}
    </>
  );
}
