import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor({ reducedMotion = false }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const requestRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device supports touch or hover
    if (typeof window === 'undefined') return;
    const touchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (touchDevice || reducedMotion) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if mouse is over a photo card or interactive view target
      const target = e.target.closest('[data-cursor="view"]');
      setIsHoveringPhoto(Boolean(target));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth lerp animation loop
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animateCursor = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.2);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.2);

      setPosition({
        x: currentPos.current.x,
        y: currentPos.current.y
      });

      requestRef.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    requestRef.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [reducedMotion, isVisible]);

  if (isTouch || reducedMotion || !isVisible) {
    return null;
  }

  const cursorSize = isHoveringPhoto ? 72 : 10;

  return (
    <div
      className="custom-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        transform: `translate3d(${position.x - cursorSize / 2}px, ${
          position.y - cursorSize / 2
        }px, 0)`,
        borderRadius: '50%',
        backgroundColor: isHoveringPhoto
          ? 'rgba(11, 11, 12, 0.75)'
          : 'var(--accent)',
        border: isHoveringPhoto
          ? '1px solid var(--accent)'
          : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.25s ease-out, height 0.25s ease-out, background-color 0.25s ease-out, border 0.25s ease-out',
        backdropFilter: isHoveringPhoto ? 'blur(4px)' : 'none'
      }}
      aria-hidden="true"
    >
      {isHoveringPhoto && (
        <span
          className="font-mono"
          style={{
            color: 'var(--text)',
            fontSize: '10px',
            letterSpacing: '0.14em',
            fontWeight: 500
          }}
        >
          VIEW
        </span>
      )}
    </div>
  );
}
