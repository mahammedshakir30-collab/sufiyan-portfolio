import React, { useState } from 'react';

export default function ImageWithFallback({
  src,
  alt = '',
  aspectRatio = '3/4',
  className = '',
  style = {},
  loading = 'lazy',
  onLoad,
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const containerStyle = {
    aspectRatio: aspectRatio.replace(':', '/'),
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'var(--surface)',
    ...style
  };

  if (hasError || !src) {
    return (
      <div
        className={`photo-placeholder ${className}`}
        style={containerStyle}
        role="img"
        aria-label={alt || 'Image unavailable'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <span className="font-mono">{alt || 'ARCHIVE FRAME'}</span>
      </div>
    );
  }

  return (
    <div style={containerStyle} className={`image-container ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={(e) => {
          setIsLoaded(true);
          if (onLoad) onLoad(e);
        }}
        onError={() => setHasError(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.4s ease-out'
        }}
        {...props}
      />
    </div>
  );
}
