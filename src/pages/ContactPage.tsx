import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import type { Dress } from '../types/index';
import { getDressTypeName } from '../utils/helpers';

export const ContactPage: React.FC = () => {
  const location = useLocation();
  const selectedDress = location.state?.selectedDress as Dress | undefined;

  // URL Calendly - À remplacer par votre URL Calendly réelle
  const calendlyUrl = 'https://calendly.com/heritage-rdv'; // Exemple

  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0] min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif text-center mb-4">Contact</h1>
          <p className="text-center text-black mb-12 max-w-2xl mx-auto text-[13px]">
            Prenez rendez-vous pour un essayage ou contactez-nous pour toute question.
          </p>

          {selectedDress && (
            <div className="max-w-4xl mx-auto mb-8">
              <Card className="p-6 bg-black bg-opacity-10 border border-black">
                <p className="text-[13px] text-gray-700">
                  <strong>Robe présélectionnée:</strong> {selectedDress.name} -{' '}
                  {getDressTypeName(selectedDress.type)}
                </p>
              </Card>
            </div>
          )}

          {/* Section Calendly en pleine largeur */}
          <div className="max-w-6xl mx-auto mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-serif mb-6">Réserver un Essayage</h2>
              <p className="text-black mb-6 text-[13px]">
                Choisissez un créneau qui vous convient pour venir essayer nos créations.
              </p>
              {/* Intégration Calendly */}
              <div className="relative" style={{ minHeight: '600px' }}>
                <iframe
                  src={calendlyUrl}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Calendly Scheduling"
                  className="rounded-lg"
                ></iframe>
              </div>
            </Card>
          </div>

          {/* Section Suivez-nous et Informations en 2 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Réseaux sociaux */}
            <Card className="p-6">
              <h2 className="text-xl font-serif mb-6">Suivez-nous</h2>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/heritage.alg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:bg-[#A81712] transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61580527445389"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:bg-[#A81712] transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@heritage.algg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:bg-[#A81712] transition-colors"
                  aria-label="TikTok"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.07 6.07 0 0 0-1-.05A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                  </svg>
                </a>
              </div>
            </Card>

            {/* Informations de contact */}
            <Card className="p-6">
              <h2 className="text-xl font-serif mb-6">Informations</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a
                    href="mailto:heritage.bynedhal@gmail.com"
                    className="text-[#A81712] hover:underline"
                  >
                    heritage.bynedhal@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Localisation</h3>
                  <p className="text-black text-[13px]">
                    Gennevilliers, Île de France
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};
