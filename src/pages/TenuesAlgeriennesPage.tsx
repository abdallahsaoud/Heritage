import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { CardSkeleton } from '../components/ui/Loading';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { dressesService } from '../services/dresses.service';
import { DressType } from '../types/index';
import { formatPrice } from '../utils/helpers';

export const TenuesAlgeriennesPage: React.FC = () => {
  const navigate = useNavigate();

  // Types de tenues algériennes (tous sauf CAFTAN et TAKCHITA)
  const algerianDressTypes = [
    DressType.KARAKOU,
    DressType.JELLABA,
    DressType.GANDOURA,
    DressType.KESWA,
    DressType.FOUTA,
  ];

  const { data: allDresses, isLoading } = useQuery({
    queryKey: ['dresses'],
    queryFn: () => dressesService.getAll(),
  });

  // Filtrer pour ne garder que les tenues algériennes
  const algerianDresses = allDresses?.filter((dress) =>
    algerianDressTypes.includes(dress.type as 'jellaba' | 'karakou' | 'gandoura' | 'keswa' | 'fouta')
  );

  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0] min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif text-center mb-4">
            Tenues Algériennes
          </h1>
          <p className="text-center text-black mb-12 max-w-2xl mx-auto text-[13px]">
            Explorez notre collection de tenues traditionnelles algériennes, 
            alliant authenticité et élégance.
          </p>

          {/* Résultats */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[...Array(8)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : algerianDresses && algerianDresses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {algerianDresses.map((dress) => (
                <div
                  key={dress.id}
                  className="group cursor-pointer animate-fade-in"
                  onClick={() => navigate(`/robe/${dress.id}`, { state: { from: '/tenues-algeriennes' } })}
                >
                  {/* Card avec photo pleine hauteur */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <OptimizedImage
                      src={dress.imageUrl}
                      alt={dress.name}
                      aspectRatio="3/4"
                      objectFit="cover"
                      loading="lazy"
                      decoding="async"
                      useResponsive={true}
                    />
                    {!dress.available && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center pointer-events-none">
                        <span className="bg-red-500 text-white px-4 py-2 text-sm font-semibold">
                          Indisponible
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Infos en dessous de la card */}
                  <div className="mt-6 space-y-2 text-center">
                    <h3 className="text-xl font-serif text-gray-900 group-hover:text-[#A81712] transition-colors">
                      {dress.name}
                    </h3>
                    
                    {/* Prix Achat et Location */}
                    <div className="flex items-center justify-center gap-4 pt-2">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Location</p>
                        <p className="text-[15px] font-bold text-[#A81712]">
                          {formatPrice(dress.rentalPrice)}
                        </p>
                      </div>
                      <div className="h-8 w-px bg-gray-300"></div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Achat</p>
                        <p className="text-[15px] font-bold text-gray-900">
                          {formatPrice(dress.purchasePrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-black text-[13px]">
                Aucune tenue disponible pour le moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

