import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CardSkeleton } from '../components/ui/Loading';
import { dressesService } from '../services/dresses.service';
import { DressType } from '../types/index';
import { formatPrice, getDressTypeName } from '../utils/helpers';

export const CataloguePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<DressType | null>(null);

  // Filtrer uniquement les caftans et takchitas
  const { data: allDresses, isLoading } = useQuery({
    queryKey: ['dresses'],
    queryFn: () => dressesService.getAll(),
  });

  // Filtrer pour ne garder que CAFTAN et TAKCHITA
  const caftanTakchitaDresses = allDresses?.filter(
    (dress) => dress.type === DressType.CAFTAN || dress.type === DressType.TAKCHITA
  );

  // Appliquer le filtre de type sélectionné
  const filteredByType = selectedType
    ? caftanTakchitaDresses?.filter((dress) => dress.type === selectedType)
    : caftanTakchitaDresses;

  // Appliquer la recherche
  const filteredDresses = filteredByType?.filter((dress) =>
    dress.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0] min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-serif text-center mb-4">
            Catalogue - Caftans & Takchitas
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Découvrez notre collection exclusive de caftans et takchitas, alliant tradition et modernité.
          </p>

          {/* Filtres */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Recherche */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Rechercher un caftan ou une takchita..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input w-full"
                />
              </div>

              {/* Filtres par type */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedType(null)}
                  className={`px-4 py-2 rounded-[10px] transition-colors ${
                    !selectedType
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setSelectedType(DressType.CAFTAN)}
                  className={`px-4 py-2 rounded-[10px] transition-colors ${
                    selectedType === DressType.CAFTAN
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Caftans
                </button>
                <button
                  onClick={() => setSelectedType(DressType.TAKCHITA)}
                  className={`px-4 py-2 rounded-[10px] transition-colors ${
                    selectedType === DressType.TAKCHITA
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Takchitas
                </button>
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
                {filteredDresses.length} modèle{filteredDresses.length > 1 ? 's' : ''}{' '}
                trouvé{filteredDresses.length > 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDresses.map((dress) => (
                  <Card
                    key={dress.id}
                    className="overflow-hidden hover:scale-105 transition-transform cursor-pointer animate-fade-in"
                    onClick={() => navigate(`/robe/${dress.id}`)}
                  >
                    <div className="relative">
                      <img
                        src={dress.imageUrl}
                        alt={dress.name}
                        className="w-full h-72 object-cover"
                      />
                      {!dress.available && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {dress.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-[#A81712]">
                          {formatPrice(dress.price)}
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
              <p className="text-gray-600 text-xl">
                Aucun modèle trouvé avec ces critères.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

