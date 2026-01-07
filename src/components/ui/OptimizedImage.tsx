import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // Pour l'image LCP (largest contentful paint)
  aspectRatio?: string; // Format: "3/4" ou "16/9", etc.
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string; // Tailles pour srcset (ex: "(max-width: 768px) 600px, 900px")
  useResponsive?: boolean; // Si true, génère automatiquement srcset avec les tailles disponibles
}

// Fonction pour générer srcset à partir d'une source
function generateSrcSet(baseSrc: string): string {
  const baseName = baseSrc.replace(/\.webp$/, '');
  const sizes = [
    { suffix: '-xlarge', descriptor: '2400w' },
    { suffix: '-large', descriptor: '1600w' },
    { suffix: '-medium', descriptor: '1200w' },
    { suffix: '-small', descriptor: '800w' },
    { suffix: '-thumb', descriptor: '200w' },
  ];

  return sizes
    .map(({ suffix, descriptor }) => `${baseName}${suffix}.webp ${descriptor}`)
    .join(', ');
}

// Fonction pour générer sizes par défaut selon l'aspect ratio
function getDefaultSizes(aspectRatio?: string): string {
  if (aspectRatio === '3/4') {
    // Pour les images en format portrait (3/4)
    return '(max-width: 640px) 600px, (max-width: 1024px) 900px, 1200px';
  } else if (aspectRatio === '16/9') {
    // Pour les images hero (16/9)
    return '(max-width: 768px) 100vw, 1920px';
  } else {
    // Par défaut
    return '(max-width: 640px) 600px, (max-width: 1024px) 900px, 1200px';
  }
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  aspectRatio,
  objectFit = 'cover',
  loading = 'lazy',
  decoding = 'async',
  style = {},
  sizes,
  useResponsive = false,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Générer srcset si useResponsive est activé
  const srcSet = useResponsive ? generateSrcSet(src) : undefined;
  const sizesAttr = sizes || (useResponsive ? getDefaultSizes(aspectRatio) : undefined);

  // Calculer l'aspect ratio si fourni
  const aspectRatioStyle = aspectRatio
    ? { aspectRatio }
    : width && height
    ? { aspectRatio: `${width} / ${height}` }
    : {};

  // Pour les images prioritaires (LCP), charger immédiatement
  const effectiveLoading = priority ? 'eager' : loading;
  const effectiveDecoding = priority ? 'sync' : decoding;

  useEffect(() => {
    // Précharger l'image si elle est prioritaire
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.setAttribute('fetchpriority', 'high');
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Placeholder avec skeleton pendant le chargement
  const placeholderStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f6',
    display: isLoaded ? 'none' : 'block',
    ...aspectRatioStyle,
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        ...aspectRatioStyle,
        ...style,
      }}
    >
      {/* Placeholder/Skeleton */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={placeholderStyle}
          aria-hidden="true"
        />
      )}

      {/* Image */}
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet}
        sizes={sizesAttr}
        alt={alt}
        width={width}
        height={height}
        loading={effectiveLoading}
        decoding={effectiveDecoding}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`w-full h-full transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          objectFit,
          ...aspectRatioStyle,
        }}
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Message d'erreur si l'image ne charge pas */}
      {hasError && (
        <div
          className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 text-sm"
          style={aspectRatioStyle}
        >
          Image non disponible
        </div>
      )}
    </div>
  );
};