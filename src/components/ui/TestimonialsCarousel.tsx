import React, { useRef, useState, useEffect, useCallback } from 'react';
import { StarRating } from './StarRating';

// Import the type and data
import type { Testimonial } from '../../data/testimonials';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

// #region agent log helper
const debugLog = (location: string, message: string, data: Record<string, unknown>, hypothesisId: string) => {
  console.log(`[DEBUG ${hypothesisId}] ${location}: ${message}`, data);
  fetch('http://127.0.0.1:7242/ingest/57a9a015-7cc8-42c4-bb2f-44b6d4bef37d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location,message,data,timestamp:Date.now(),sessionId:'debug-session',hypothesisId})}).catch(()=>{});
};

// Error boundary helper - capture any errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    console.error('[DEBUG ERROR] Global error caught:', e.message, e.filename, e.lineno);
  });
}
// #endregion

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [mobileOffset, setMobileOffset] = useState(0);
  const totalItems = testimonials.length;

  // Déterminer le nombre d'éléments visibles selon la taille de l'écran
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else {
        setVisibleItems(3);
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  // Calculate item width based on container
  useEffect(() => {
    const updateItemWidth = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const gap = 24; // gap-6 = 24px
        const isMobile = window.innerWidth < 768;
        let calculatedWidth = (containerWidth - (gap * (visibleItems - 1))) / visibleItems;
        
        // En mobile, limiter la largeur des cartes à 75% de la largeur disponible
        if (isMobile) {
          calculatedWidth = containerWidth * 0.75;
          // Calculer l'offset pour centrer la carte
          setMobileOffset((containerWidth - calculatedWidth) / 2);
        } else {
          setMobileOffset(0);
        }
        
        setItemWidth(calculatedWidth);
      }
    };

    updateItemWidth();
    window.addEventListener('resize', updateItemWidth);
    return () => window.removeEventListener('resize', updateItemWidth);
  }, [visibleItems]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    // #region agent log
    debugLog('TestimonialsCarousel:scroll', 'scroll called', {direction, currentIndex, totalItems, visibleItems, itemWidth}, 'A,B');
    // #endregion
    if (totalItems <= visibleItems || itemWidth === 0) return;
    
    // Continue infinitely in the same direction (no modulo, just keep going)
    if (direction === 'right') {
      setCurrentIndex((prev) => {
        const newIndex = prev + 1;
        // #region agent log
        debugLog('TestimonialsCarousel:scroll:right', 'new index after right scroll', {prev, newIndex}, 'A');
        // #endregion
        return newIndex;
      });
    } else {
      setCurrentIndex((prev) => {
        const newIndex = prev - 1;
        // #region agent log
        debugLog('TestimonialsCarousel:scroll:left', 'new index after left scroll', {prev, newIndex, willBeNegative: newIndex < 0}, 'A');
        // #endregion
        return newIndex;
      });
    }
  }, [totalItems, visibleItems, itemWidth, currentIndex]);

  // Initialize scroll position
  useEffect(() => {
    // #region agent log
    debugLog('TestimonialsCarousel:useEffect:init', 'initializing scroll position', {itemWidth, totalItems, willSetToZero: itemWidth > 0 && totalItems > 0}, 'H');
    // #endregion
    if (itemWidth > 0 && totalItems > 0) {
      setCurrentIndex(0);
    }
  }, [itemWidth, totalItems]);

  // #region agent log - Component mount tracking
  useEffect(() => {
    debugLog('TestimonialsCarousel:mount', 'component mounted', {
      isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : 'unknown',
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    }, 'F,H,I');
  }, []);
  // #endregion

  // If no scrolling needed, display normally
  if (totalItems <= visibleItems || itemWidth === 0) {
    return (
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="overflow-hidden"
        >
          <div 
            className="flex gap-6"
            style={{
              paddingLeft: mobileOffset > 0 ? `${mobileOffset}px` : '0',
            }}
          >
            {testimonials.map((testimonial, index) => {
              const isCenter = visibleItems === 3 && index === 1;
              const isMobileCenter = visibleItems === 1 && index === 0;

              return (
                <div
                  key={testimonial.id}
                  style={{
                    width: itemWidth > 0 ? `${itemWidth}px` : 'auto',
                    flexShrink: 0,
                  }}
                  className={`transition-all duration-300 ${
                    isCenter || isMobileCenter
                      ? 'scale-110 shadow-xl z-10'
                      : 'scale-95'
                  }`}
                >
                  <div className="bg-white rounded-lg p-6 md:p-8 h-full flex flex-col border border-gray-100">
                    {/* Quote icon */}
                    <div className="mb-4">
                      <svg
                        className="w-10 h-10 md:w-12 md:h-12 text-black"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10z" />
                      </svg>
                    </div>

                    {/* Testimonial text */}
                    <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed mb-6 flex-grow">
                      {testimonial.text}
                    </p>

                    {/* Divider */}
                    <div className="border-t border-gray-200 pt-4 mb-4"></div>

                    {/* Star rating - toujours 5 étoiles */}
                    <div className="flex justify-center">
                      <StarRating />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Generate duplicated items for infinite scrolling
  // #region agent log - REDUCED from 100 to 5 copies for hypothesis G (performance on mobile)
  const itemsToGenerate = totalItems * 5; // Reduced from 100 to 5 (30 items instead of 600)
  debugLog('TestimonialsCarousel:generate', 'generating items', {itemsToGenerate, totalItems, multiplier: 5}, 'G');
  // #endregion
  const duplicatedItems: Testimonial[] = [];
  
  for (let i = 0; i < itemsToGenerate; i++) {
    const actualItemIndex = i % totalItems;
    duplicatedItems.push(testimonials[actualItemIndex]);
  }

  // Calculate translateX - currentIndex can be any integer (positive or negative)
  // En mobile, ajouter un offset pour centrer la carte
  const translateX = -(currentIndex * (itemWidth + 24)) + mobileOffset;
  
  // #region agent log
  debugLog('TestimonialsCarousel:render', 'render with values', {currentIndex, translateX, itemWidth, visibleItems, mobileOffset, totalItems, duplicatedItemsLength: duplicatedItems.length, isCurrentIndexNegative: currentIndex < 0}, 'A,B,C');
  // #endregion

  return (
    <div className="relative">
      {/* Left arrow button */}
      <button
        onClick={(e) => {
          // #region agent log
          debugLog('TestimonialsCarousel:leftButton:click', 'left button clicked', {
            eventType: e.type,
            isTrusted: e.isTrusted,
            currentIndex,
            timestamp: Date.now()
          }, 'F');
          // #endregion
          scroll('left');
        }}
        onTouchEnd={(e) => {
          // #region agent log
          debugLog('TestimonialsCarousel:leftButton:touchEnd', 'left button touch end', {
            eventType: e.type,
            currentIndex,
            timestamp: Date.now()
          }, 'F');
          // #endregion
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-1.5 md:p-2 transition-all duration-200"
        aria-label="Témoignage précédent"
      >
        <svg
          className="w-4 h-4 md:w-6 md:h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="overflow-hidden horizontal-scroll-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div 
          ref={contentRef}
          className="flex gap-6"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {duplicatedItems.map((testimonial, index) => {
            // Déterminer quelle carte est au centre
            const centerIndex = currentIndex + Math.floor(visibleItems / 2);
            const isCenterCard = index === centerIndex;
            
            // #region agent log
            if (index === 0 || index === centerIndex || !testimonial) {
              debugLog('TestimonialsCarousel:map', 'item render check', {index, centerIndex, isCenterCard, testimonialExists: !!testimonial, testimonialId: testimonial?.id, currentIndex}, 'B,E');
            }
            // #endregion

            return (
              <div
                key={`testimonial-${index}`}
                style={{
                  width: `${itemWidth}px`,
                  flexShrink: 0,
                }}
                className={`transition-all duration-300 ${
                  isCenterCard
                    ? 'scale-110 shadow-xl z-10'
                    : 'scale-95'
                }`}
              >
                <div className="bg-white rounded-lg p-6 md:p-8 h-full flex flex-col border border-gray-100">
                  {/* Quote icon */}
                  <div className="mb-4">
                    <svg
                      className="w-10 h-10 md:w-12 md:h-12 text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10z" />
                    </svg>
                  </div>

                  {/* Testimonial text */}
                  <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed mb-6 flex-grow">
                    {testimonial?.text || 'Loading...'}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-gray-200 pt-4 mb-4"></div>

                  {/* Star rating - toujours 5 étoiles */}
                  <div className="flex justify-center">
                    <StarRating />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right arrow button */}
      <button
        onClick={(e) => {
          // #region agent log
          debugLog('TestimonialsCarousel:rightButton:click', 'right button clicked', {
            eventType: e.type,
            isTrusted: e.isTrusted,
            currentIndex,
            timestamp: Date.now()
          }, 'F');
          // #endregion
          scroll('right');
        }}
        onTouchEnd={(e) => {
          // #region agent log
          debugLog('TestimonialsCarousel:rightButton:touchEnd', 'right button touch end', {
            eventType: e.type,
            currentIndex,
            timestamp: Date.now()
          }, 'F');
          // #endregion
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-1.5 md:p-2 transition-all duration-200"
        aria-label="Témoignage suivant"
      >
        <svg
          className="w-4 h-4 md:w-6 md:h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};
