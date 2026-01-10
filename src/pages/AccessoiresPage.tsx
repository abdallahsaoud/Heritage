import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { CardSkeleton } from '../components/ui/Loading';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { accessoriesService } from '../services/accessories.service';
import { formatPrice } from '../utils/helpers';

export const AccessoiresPage: React.FC = () => {
  const navigate = useNavigate();

  const { data: accessories, isLoading } = useQuery({
    queryKey: ['accessories'],
    queryFn: () => accessoriesService.getAll(),
  });

  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0] min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif text-center mb-4">
            Accessoires
          </h1>
          <p className="text-center text-black mb-12 max-w-2xl mx-auto text-[13px]">
            Découvrez notre collection d'accessoires traditionnels pour compléter votre tenue avec élégance.
          </p>

          {/* Résultats */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[...Array(8)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : accessories && accessories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {accessories.map((accessory) => (
                <div
                  key={accessory.id}
                  className="group cursor-pointer animate-fade-in"
                  onClick={() => navigate(`/accessoire/${accessory.id}`)}
                >
                  {/* Card avec photo pleine hauteur */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <OptimizedImage
                      src={accessory.imageUrl}
                      alt={accessory.name}
                      aspectRatio="3/4"
                      objectFit="cover"
                      loading="lazy"
                      decoding="async"
                      useResponsive={true}
                    />
                    {!accessory.available && (
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
                      {accessory.name}
                    </h3>
                    
                    {/* Prix Location uniquement (les accessoires ne sont pas vendus selon la FAQ) */}
                    <div className="pt-2">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Location</p>
                      <p className="text-[15px] font-bold text-[#A81712]">
                        {formatPrice(accessory.rentalPrice)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-black text-[13px]">
                Aucun accessoire disponible pour le moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

