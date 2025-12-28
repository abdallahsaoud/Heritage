import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';

export const NotreHistoirePage: React.FC = () => {
  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-serif text-center mb-4">Notre Histoire</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Découvrez l'histoire et les valeurs qui animent HÉRITAGE.
            </p>

            {/* Section principale */}
            <Card className="p-8 md:p-12 mb-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-serif mb-6">L'Histoire d'HÉRITAGE</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  HÉRITAGE est née d'une passion profonde pour les traditions vestimentaires 
                  algériennes et marocaines, alliée à un désir de moderniser et de faire rayonner 
                  ces créations à travers le monde.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Fondée avec l'ambition de préserver l'artisanat traditionnel tout en l'adaptant 
                  aux goûts contemporains, notre maison s'est rapidement imposée comme une référence 
                  dans le domaine de la mode orientale de luxe.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Chaque pièce de notre collection est le fruit d'un savoir-faire ancestral, 
                  transmis de génération en génération, et rehaussé par des touches modernes 
                  qui font d'HÉRITAGE une marque unique et intemporelle.
                </p>
              </div>
            </Card>

            {/* Section Valeurs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-serif mb-3">Savoir-Faire Artisanal</h3>
                <p className="text-gray-600">
                  Chaque création est confectionnée avec un soin méticuleux, respectant les 
                  techniques traditionnelles tout en intégrant des finitions modernes.
                </p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-serif mb-3">Excellence</h3>
                <p className="text-gray-600">
                  Nous sélectionnons uniquement les meilleurs tissus et matériaux pour garantir 
                  la qualité et la durabilité de nos créations.
                </p>
              </Card>
              <Card className="p-6">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-serif mb-3">Tradition & Modernité</h3>
                <p className="text-gray-600">
                  Nous créons un pont entre le patrimoine culturel et les tendances actuelles, 
                  offrant des pièces intemporelles et élégantes.
                </p>
              </Card>
            </div>

            {/* Section Mission */}
            <Card className="p-8 md:p-12 mb-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-serif mb-6">Notre Mission</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Chez HÉRITAGE, nous croyons que chaque femme mérite de se sentir exceptionnelle. 
                  Notre mission est de créer des tenues qui célèbrent la beauté, l'élégance et 
                  la confiance en soi.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Nous nous engageons à :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li>Préserver et promouvoir les traditions vestimentaires algériennes et marocaines</li>
                  <li>Offrir une expérience client exceptionnelle, de la sélection à l'essayage</li>
                  <li>Respecter l'environnement en privilégiant des pratiques durables</li>
                  <li>Valoriser le travail des artisans et contribuer à la préservation de leur savoir-faire</li>
                </ul>
              </div>
            </Card>

            {/* Section Vision */}
            <Card className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-serif mb-6">Notre Vision</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  HÉRITAGE aspire à devenir la référence mondiale de la mode orientale de luxe, 
                  en créant un pont entre les cultures et en faisant rayonner la beauté et 
                  l'élégance des tenues traditionnelles sur la scène internationale.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Nous rêvons d'un monde où chaque femme peut exprimer son identité culturelle 
                  avec fierté et élégance, portant des créations qui racontent une histoire, 
                  la sienne et celle de ses ancêtres.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

