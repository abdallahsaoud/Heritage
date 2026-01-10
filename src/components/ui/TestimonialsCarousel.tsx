import React, { useRef, useState, useEffect, useCallback } from 'react';
import { StarRating } from './StarRating';

// Import the type and data
import type { Testimonial } from '../../data/testimonials';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [mobileOffset, setMobileOffset] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const totalItems = testimonials.length;

  // Minimum swipe distance (px)
  const minSwipeDistance = 50;

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

  const scroll = useCallback((direction: 'left' | 'right', e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (totalItems <= visibleItems || itemWidth === 0) return;
    
    // Continue infinitely in the same direction
    if (direction === 'right') {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [totalItems, visibleItems, itemWidth]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    // Ignorer les touches sur les boutons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // Ignorer les touches sur les boutons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    // Ignorer les touches sur les boutons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      scroll('right');
    } else if (isRightSwipe) {
      scroll('left');
    }
  };

  // Initialize scroll position
  useEffect(() => {
    if (itemWidth > 0 && totalItems > 0) {
      setCurrentIndex(0);
    }
  }, [itemWidth, totalItems]);

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

  // Generate enough duplicated items for infinite scrolling
  const itemsToGenerate = totalItems * 100; // Generate 100 copies to ensure we never run out
  const duplicatedItems: Testimonial[] = [];
  
  for (let i = 0; i < itemsToGenerate; i++) {
    const actualItemIndex = i % totalItems;
    duplicatedItems.push(testimonials[actualItemIndex]);
  }

  // Calculate translateX - currentIndex can be any integer (positive or negative)
  // En mobile, ajouter un offset pour centrer la carte
  const translateX = -(currentIndex * (itemWidth + 24)) + mobileOffset;

  return (
    <div className="relative">
      {/* Left arrow button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scroll('left', e);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scroll('left', e);
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-1.5 md:p-2 transition-all duration-200"
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
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
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
            // Pour un carousel infini, la carte centrale est celle à currentIndex + Math.floor(visibleItems / 2)
            const centerIndex = currentIndex + Math.floor(visibleItems / 2);
            const isCenterCard = index === centerIndex;

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

      {/* Right arrow button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scroll('right', e);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scroll('right', e);
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-1.5 md:p-2 transition-all duration-200"
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
