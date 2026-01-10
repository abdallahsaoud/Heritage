import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f6f4f0] border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Bas du footer */}
        <div className="flex flex-col items-center space-y-6">
          {/* Logo et copyright */}
          <div className="text-center">
            <div className="text-2xl font-light tracking-wider mb-2">HERITAGE</div>
            <p className="text-xs text-gray-500">Crédits © 2025 - HERITAGE</p>
          </div>

          {/* Mentions légales et conditions de vente */}
          <div className="flex flex-wrap justify-center gap-4 text-[13px]">
            <Link
              to="/mentions-legales"
              className="text-black hover:text-[#A81712] transition-colors"
            >
              Mentions légales
            </Link>
            <span className="text-black">|</span>
            <Link
              to="/conditions-vente"
              className="text-black hover:text-[#A81712] transition-colors"
            >
              Conditions de vente
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
