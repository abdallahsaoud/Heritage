import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Loading } from '../components/ui/Loading';
import { CardSkeleton } from '../components/ui/Loading';
import { InfiniteHorizontalScroll } from '../components/ui/InfiniteHorizontalScroll';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { dressesService, getRelatedAccessories } from '../services/dresses.service';
import { formatPrice } from '../utils/helpers';
import type { Dress } from '../types/index';
import type { Accessory } from '../types/index';

export const DressDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Get the previous path from location state or default to /robes
  const getBackPath = () => {
    if (location.state?.from) {
      return location.state.from;
    }
    // Check if we came from a specific page based on referrer
    const referrer = document.referrer;
    if (referrer.includes('/catalogue')) return '/catalogue';
    if (referrer.includes('/accessoires')) return '/accessoires';
    if (referrer.includes('/tenues-algeriennes')) return '/tenues-algeriennes';
    return '/robes'; // Default fallback
  };

  const { data: dress, isLoading } = useQuery({
    queryKey: ['dress', id],
    queryFn: () => dressesService.getById(id!),
    enabled: !!id,
  });

  // Get similar dresses (same type, exclude current)
  const { data: similarDresses, isLoading: isLoadingSimilar } = useQuery({
    queryKey: ['dresses', dress?.type],
    queryFn: () => dressesService.getAll(dress?.type),
    enabled: !!dress?.type,
  });

  // Get related accessories
  const { data: relatedAccessories, isLoading: isLoadingAccessories } = useQuery({
    queryKey: ['related-accessories', dress?.id],
    queryFn: () => dress ? getRelatedAccessories(dress, 2) : Promise.resolve([]),
    enabled: !!dress,
  });

  // Prepare recommendations: mix of similar dresses and accessories
  const recommendations = useMemo(() => {
    const items: Array<{ type: 'dress' | 'accessory'; data: Dress | Accessory }> = [];
    
    // Add similar dresses (max 3-4)
    const filteredSimilar = similarDresses
      ?.filter((d) => d.id !== dress?.id)
      .slice(0, 4) || [];
    
    filteredSimilar.forEach(d => {
      items.push({ type: 'dress', data: d });
    });
    
    // Add related accessories (max 2-3)
    const accessories = relatedAccessories || [];
    accessories.slice(0, 3).forEach(a => {
      items.push({ type: 'accessory', data: a });
    });
    
    // Return items (first dresses, then accessories) limited to 6
    return items.slice(0, 6);
  }, [similarDresses, relatedAccessories, dress?.id]);


  // Préparer les images : utiliser images[] si disponible, sinon [imageUrl]
  const images = dress?.images && dress.images.length > 0 
    ? dress.images 
    : dress?.imageUrl 
    ? [dress.imageUrl] 
    : [];

  if (isLoading) {
    return (
      <Layout>
        <Loading fullScreen text="Chargement de la robe..." />
      </Layout>
    );
  }

  if (!dress) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-serif mb-4">Robe non trouvée</h1>
          <Button onClick={() => navigate('/robes')}>
            Retour au catalogue
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0] min-h-screen">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <button
              onClick={() => navigate(getBackPath())}
              className="text-[#A81712] hover:underline"
            >
              ← Retour
            </button>
          </div>

          {/* Détails de la robe */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            {/* Galerie d'images */}
            <div className="flex flex-col">
              {/* Image principale pleine hauteur */}
              <div className="relative w-full aspect-[3/4] overflow-hidden mb-4 rounded-[4px]">
                <OptimizedImage
                  src={images[selectedImageIndex]}
                  alt={`${dress.name} - Image ${selectedImageIndex + 1}`}
                  className="rounded-[4px]"
                  aspectRatio="3/4"
                  objectFit="cover"
                  priority={selectedImageIndex === 0}
                  loading={selectedImageIndex === 0 ? 'eager' : 'lazy'}
                  decoding={selectedImageIndex === 0 ? 'sync' : 'async'}
                  useResponsive={true}
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </div>

              {/* Miniatures en bas */}
              {images.length > 1 && (
                <div className="flex flex-wrap gap-3 pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-28 h-28 rounded-[8px] overflow-hidden transition-all relative ${
                        selectedImageIndex === index
                          ? ''
                          : 'opacity-60 hover:opacity-100'
                      }`}
                      style={{
                        padding: selectedImageIndex === index ? '0' : '0',
                      }}
                    >
                      {selectedImageIndex === index && (
                        <div
                          className="absolute inset-0 border-[3px] border-black rounded-[8px] pointer-events-none z-10"
                          style={{
                            boxSizing: 'border-box',
                          }}
                        />
                      )}
                      <OptimizedImage
                        src={image.replace(/\.webp$/, '-thumb.webp')}
                        alt={`${dress.name} - Miniature ${index + 1}`}
                        className="rounded-[8px]"
                        width={112}
                        height={112}
                        aspectRatio="1/1"
                        objectFit="cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informations */}
            <div className="flex flex-col">
              <h1 className="text-4xl font-serif mb-6">{dress.name}</h1>

              {/* Prix Achat et Location */}
              <div className="flex items-center gap-6 mb-8">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Location</p>
                  <p className="text-[15px] font-bold text-[#A81712]">
                    {formatPrice(dress.rentalPrice)}
                  </p>
                </div>
                <div className="h-12 w-px bg-gray-300"></div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Achat</p>
                  <p className="text-[15px] font-bold text-gray-900">
                    {formatPrice(dress.purchasePrice)}
                  </p>
                </div>
              </div>

              <div className="prose prose-lg mb-8">
                <p className="text-gray-700 leading-relaxed text-[15px] whitespace-pre-line">
                  {dress.description}
                </p>
              </div>

              {/* Caractéristiques directement sur le background */}
              <div className="space-y-4 mb-8">
                <div className="border-b border-gray-300 pb-3">
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Taille</p>
                  <p className="text-gray-900 text-[13px]">{dress.size || 'Retouches possibles sur mesure'}</p>
                </div>
                <div className="border-b border-gray-300 pb-3">
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Entretien</p>
                  <p className="text-gray-900 text-[13px]">Le client ne doit pas laver ou nettoyer la tenue lui-même, afin d'éviter toute détérioration.</p>
                </div>
              </div>

              {/* Actions */}
              {dress.available ? (
                <Button
                  variant="primary"
                  onClick={() =>
                    navigate('/contact', {
                      state: { selectedDress: dress },
                    })
                  }
                  className="w-full py-4 text-[13px] !rounded-none"
                >
                  Réserver un essayage
                </Button>
              ) : (
                <Button variant="outline" disabled className="w-full py-4 text-[13px] !rounded-none">
                  Actuellement indisponible
                </Button>
              )}
            </div>
          </div>

          {/* Vous aimerez aussi */}
          {(isLoadingSimilar || isLoadingAccessories) ? (
            <div className="mt-16">
              <h2 className="text-xl font-serif mb-8">Vous aimerez aussi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {[...Array(3)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : recommendations.length > 0 ? (
            <div className="mt-16">
              <h2 className="text-xl font-serif mb-8">Vous aimerez aussi</h2>
              <InfiniteHorizontalScroll visibleItems={3}>
                {recommendations.map((item) => (
                  <div
                    key={item.data.id}
                    className="group cursor-pointer animate-fade-in flex-shrink-0"
                    onClick={() => {
                      if (item.type === 'dress') {
                        navigate(`/robe/${item.data.id}`, { state: { from: location.pathname } });
                      } else {
                        navigate(`/accessoire/${item.data.id}`, { state: { from: location.pathname } });
                      }
                    }}
                  >
                    {/* Card avec photo pleine hauteur - même style que CataloguePage */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      <OptimizedImage
                        src={item.data.imageUrl}
                        alt={item.data.name}
                        aspectRatio="3/4"
                        objectFit="cover"
                        loading="lazy"
                        decoding="async"
                        useResponsive={true}
                      />
                      {!item.data.available && (
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
                        {item.data.name}
                      </h3>
                      
                      {/* Prix selon le type */}
                      {item.type === 'dress' ? (
                        <div className="flex items-center justify-center gap-4 pt-2">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Location</p>
                            <p className="text-[15px] font-bold text-[#A81712]">
                              {formatPrice((item.data as Dress).rentalPrice)}
                            </p>
                          </div>
                          <div className="h-8 w-px bg-gray-300"></div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Achat</p>
                            <p className="text-[15px] font-bold text-gray-900">
                              {formatPrice((item.data as Dress).purchasePrice)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-2">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Location</p>
                          <p className="text-[15px] font-bold text-[#A81712]">
                            {formatPrice((item.data as Accessory).rentalPrice)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </InfiniteHorizontalScroll>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

