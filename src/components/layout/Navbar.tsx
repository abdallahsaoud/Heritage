import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OptimizedImage } from '../ui/OptimizedImage';
import logo from '../../assets/logo.svg';
import { FEATURES } from '../../config/features';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#f6f4f0] text-black fixed top-0 left-0 right-0 z-50 w-full shadow-sm">
        <div className="w-full px-4">
          <div className="relative flex justify-between items-center h-20 md:h-24 w-full">
            {/* Menu burger à gauche */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="z-10"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo au centre */}
            <Link to="/" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <OptimizedImage
                src={logo}
                alt="HÉRITAGE"
                className="h-20 md:h-28 w-auto object-contain"
                priority={true}
                loading="eager"
                decoding="sync"
              />
            </Link>

            {/* Bouton Réserver un essayage à droite */}
            <button
              onClick={() => navigate('/contact')}
              className="bg-black text-white px-2 md:px-6 py-1 md:py-2 text-[11px] md:text-[13px] hover:bg-gray-800 transition-colors font-medium uppercase tracking-wider rounded-none z-10 whitespace-nowrap"
            >
              <span className="md:hidden">Essayage</span>
              <span className="hidden md:inline">Réserver un essayage</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Espace pour compenser la navbar fixe */}
      <div className="h-20 md:h-24"></div>

      {/* Overlay pour le menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Menu slide-in depuis la gauche */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#f6f4f0] z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Bouton fermer */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-black hover:text-[#A81712] transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu items */}
          <nav className="space-y-6">
            <Link
              to="/"
              className="block text-black hover:text-[#A81712] transition-colors text-[13px] font-light uppercase tracking-wider py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/catalogue"
              className="block text-black hover:text-[#A81712] transition-colors text-[13px] font-light uppercase tracking-wider py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Caftans - Takchitas
            </Link>
            <Link
              to="/tenues-algeriennes"
              className="block text-black hover:text-[#A81712] transition-colors text-[13px] font-light uppercase tracking-wider py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tenues algériennes
            </Link>
            {FEATURES.ACCESSORIES_ENABLED && (
              <Link
                to="/accessoires"
                className="block text-black hover:text-[#A81712] transition-colors text-[13px] font-light uppercase tracking-wider py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accessoires
              </Link>
            )}
            <Link
              to="/contact"
              className="block text-black hover:text-[#A81712] transition-colors text-[13px] font-light uppercase tracking-wider py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/notre-histoire"
              className="block text-black hover:text-[#A81712] transition-colors text-[13px] font-light uppercase tracking-wider py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Notre histoire
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};
