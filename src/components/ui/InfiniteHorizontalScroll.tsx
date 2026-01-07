import React, { useRef, useState, useEffect, useCallback } from 'react';

interface InfiniteHorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  visibleItems?: number; // Number of items visible at once
}

export const InfiniteHorizontalScroll: React.FC<InfiniteHorizontalScrollProps> = ({
  children,
  className = '',
  visibleItems = 3,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  // Calculate item width based on container
  useEffect(() => {
    const updateItemWidth = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const gap = 24; // gap-6 = 24px
        const calculatedWidth = (containerWidth - (gap * (visibleItems - 1))) / visibleItems;
        setItemWidth(calculatedWidth);
      }
    };

    updateItemWidth();
    window.addEventListener('resize', updateItemWidth);
    return () => window.removeEventListener('resize', updateItemWidth);
  }, [visibleItems]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (totalItems <= visibleItems || itemWidth === 0) return;
    
    // Continue infinitely in the same direction (no modulo, just keep going)
    if (direction === 'right') {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [totalItems, visibleItems, itemWidth]);

  // Initialize scroll position
  useEffect(() => {
    if (itemWidth > 0 && totalItems > 0) {
      setCurrentIndex(0);
    }
  }, [itemWidth, totalItems]);

  // If no scrolling needed, display normally
  if (totalItems <= visibleItems || itemWidth === 0) {
    return (
      <div className={`relative ${className}`}>
        <div
          ref={scrollContainerRef}
          className="overflow-hidden"
        >
          <div className="flex gap-6">
            {React.Children.map(children, (child, index) => (
              <div
                key={index}
                style={{
                  width: itemWidth > 0 ? `${itemWidth}px` : 'auto',
                  flexShrink: 0,
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Generate enough duplicated items for infinite scrolling (enough to cover any scroll position)
  // We'll generate a large array and use modulo to determine which item to show
  const itemsToGenerate = totalItems * 100; // Generate 100 copies to ensure we never run out
  const duplicatedItems: React.ReactNode[] = [];
  
  for (let i = 0; i < itemsToGenerate; i++) {
    const actualItemIndex = i % totalItems;
    duplicatedItems.push(childrenArray[actualItemIndex]);
  }

  // Calculate translateX - currentIndex can be any integer (positive or negative)
  // We start from position 0 and can scroll infinitely in either direction
  const translateX = -(currentIndex * (itemWidth + 24));

  return (
    <div className={`relative ${className}`}>
      {/* Left arrow button */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200"
        aria-label="Scroll left"
      >
        <svg
          className="w-6 h-6 text-gray-700"
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
          {duplicatedItems.map((child, index) => (
            <div
              key={`item-${index}`}
              style={{
                width: `${itemWidth}px`,
                flexShrink: 0,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Right arrow button */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200"
        aria-label="Scroll right"
      >
        <svg
          className="w-6 h-6 text-gray-700"
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
