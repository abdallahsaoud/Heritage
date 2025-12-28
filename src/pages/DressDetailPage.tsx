import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Loading } from '../components/ui/Loading';
import { Card } from '../components/ui/Card';
import { dressesService } from '../services/dresses.service';
import { formatPrice, getDressTypeName } from '../utils/helpers';

export const DressDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: dress, isLoading } = useQuery({
    queryKey: ['dress', id],
    queryFn: () => dressesService.getById(id!),
    enabled: !!id,
  });

  const { data: similarDresses } = useQuery({
    queryKey: ['dresses', dress?.type],
    queryFn: () => dressesService.getAll(dress?.type),
    enabled: !!dress?.type,
  });

  const filteredSimilarDresses = similarDresses
    ?.filter((d) => d.id !== dress?.id)
    .slice(0, 3);

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
          <h1 className="text-3xl font-serif mb-4">Robe non trouvée</h1>
          <Button onClick={() => navigate('/robes')}>
            Retour au catalogue
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0]">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/robes')}
              className="text-[#A81712] hover:underline"
            >
              ← Retour au catalogue
            </button>
          </div>

          {/* Détails de la robe */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image */}
            <div>
              <img
                src={dress.imageUrl}
                alt={dress.name}
                className="w-full h-[600px] object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Informations */}
            <div>
              <span className="text-[#A81712] font-medium text-lg">
                {getDressTypeName(dress.type)}
              </span>
              <h1 className="text-5xl font-serif mt-2 mb-4">{dress.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-[#A81712]">
                  {formatPrice(dress.price)}
                </span>
                {dress.available ? (
                  <span className="badge bg-green-100 text-green-800 text-lg">
                    Disponible
                  </span>
                ) : (
                  <span className="badge bg-red-100 text-red-800 text-lg">
                    Indisponible
                  </span>
                )}
              </div>

              <div className="prose prose-lg mb-8">
                <p className="text-gray-700 leading-relaxed">
                  {dress.description}
                </p>
              </div>

              {/* Caractéristiques */}
              <div className="bg-white rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Caractéristiques</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-[#A81712] mr-2">✓</span>
                    <span>Type: {getDressTypeName(dress.type)}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#A81712] mr-2">✓</span>
                    <span>Prix de location: {formatPrice(dress.price)}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#A81712] mr-2">✓</span>
                    <span>
                      {dress.available ? 'Disponible immédiatement' : 'Actuellement indisponible'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#A81712] mr-2">✓</span>
                    <span>Retouches possibles</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#A81712] mr-2">✓</span>
                    <span>Nettoyage professionnel inclus</span>
                  </li>
                </ul>
              </div>

              {/* Actions */}
              {dress.available ? (
                <div className="flex gap-4">
                  <Button
                    variant="primary"
                    onClick={() =>
                      navigate('/contact', {
                        state: { selectedDress: dress },
                      })
                    }
                    className="flex-1"
                  >
                    Réserver un essayage
                  </Button>
                </div>
              ) : (
                <Button variant="outline" disabled className="w-full">
                  Actuellement indisponible
                </Button>
              )}
            </div>
          </div>

          {/* Robes similaires */}
          {filteredSimilarDresses && filteredSimilarDresses.length > 0 && (
            <div>
              <h2 className="text-3xl font-serif mb-8">Robes Similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredSimilarDresses.map((similarDress) => (
                  <Card
                    key={similarDress.id}
                    className="overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => navigate(`/robe/${similarDress.id}`)}
                  >
                    <img
                      src={similarDress.imageUrl}
                      alt={similarDress.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <span className="text-sm text-[#A81712] font-medium">
                        {getDressTypeName(similarDress.type)}
                      </span>
                      <h3 className="text-lg font-serif mt-1 mb-2">
                        {similarDress.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-[#A81712]">
                          {formatPrice(similarDress.price)}
                        </span>
                        {similarDress.available && (
                          <span className="badge bg-green-100 text-green-800">
                            Disponible
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

