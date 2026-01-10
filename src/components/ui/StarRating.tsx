import React from 'react';

interface StarRatingProps {
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ className = '' }) => {
  // Toujours afficher 5 étoiles pleines
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {/* 5 étoiles pleines */}
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={`star-${index}`}
          className="w-5 h-5 text-black fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
};

