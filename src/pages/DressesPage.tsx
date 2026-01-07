import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CardSkeleton } from '../components/ui/Loading';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { dressesService } from '../services/dresses.service';
import { DressType } from '../types/index';
import { formatPrice, getDressTypeName } from '../utils/helpers';

export const DressesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  const selectedType = searchParams.get('type') as DressType | null;

  const { data: dresses, isLoading } = useQuery({
    queryKey: ['dresses', selectedType],
    queryFn: () => dressesService.getAll(selectedType || undefined),
  });

  const filteredDresses = dresses?.filter((dress) =>
    dress.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTypeFilter = (type: DressType | null) => {
    if (type) {
      setSearchParams({ type });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0] min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif text-center mb-4">
            Notre Collection
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-[13px]">
            Explorez notre sélection de robes orientales traditionnelles et
            modernes.
          </p>

          {/* Filtres */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Recherche */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Rechercher une robe..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input w-full"
                />
              </div>

              {/* Filtres par type */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleTypeFilter(null)}
                  className={`px-4 py-2 rounded-[10px] transition-colors ${
                    !selectedType
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Toutes
                </button>
                {Object.values(DressType).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeFilter(type)}
                    className={`px-4 py-2 rounded-[10px] transition-colors ${
                      selectedType === type
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {getDressTypeName(type)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Résultats */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : filteredDresses && filteredDresses.length > 0 ? (
            <>
              <p className="text-gray-600 mb-6">
                {filteredDresses.length} robe{filteredDresses.length > 1 ? 's' : ''}{' '}
                trouvée{filteredDresses.length > 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDresses.map((dress) => (
                  <Card
                    key={dress.id}
                    className="overflow-hidden hover:scale-105 transition-transform cursor-pointer animate-fade-in"
                    onClick={() => navigate(`/robe/${dress.id}`, { state: { from: '/robes' } })}
                  >
                    <div className="relative">
                      <OptimizedImage
                        src={dress.imageUrl}
                        alt={dress.name}
                        className="h-72"
                        aspectRatio="3/4"
                        objectFit="cover"
                        loading="lazy"
                        decoding="async"
                        useResponsive={true}
                      />
                      {!dress.available && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center pointer-events-none">
                          <span className="badge bg-red-500 text-white text-lg">
                            Indisponible
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-sm text-[#A81712] font-medium">
                        {getDressTypeName(dress.type)}
                      </span>
                      <h3 className="text-lg font-serif mt-1 mb-2">
                        {dress.name}
                      </h3>
                      <p className="text-gray-600 text-[13px] mb-3 line-clamp-2">
                        {dress.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-[15px] font-bold text-[#A81712]">
                          {formatPrice(dress.rentalPrice)}
                        </span>
                        {dress.available && (
                          <Button
                            variant="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate('/contact', {
                                state: { selectedDress: dress },
                              });
                            }}
                          >
                            Réserver
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-[13px]">
                Aucune robe trouvée avec ces critères.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

