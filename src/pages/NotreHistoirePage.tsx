import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';

export const NotreHistoirePage: React.FC = () => {
  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0] min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif text-center mb-12">Notre Histoire</h1>
          
          {/* Layout split-screen : Image et Texte côte à côte sur desktop */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Colonne Image */}
              <div className="order-1">
                <div className="sticky top-8">
                  <div className="rounded-lg overflow-hidden shadow-xl bg-white">
                    <img
                      src="/assets/products/notre-histoire.webp"
                      alt="Notre Histoire - Héritage"
                      className="w-full h-auto rounded-lg object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>

              {/* Colonne Texte */}
              <div className="order-2">
                <Card className="p-8 md:p-10 bg-white h-full">
                  <div className="prose prose-lg max-w-none space-y-6">
                    <p className="text-xl md:text-2xl font-serif text-[#A81712] leading-relaxed">
                      Notre histoire, c'est celle d'une passion devenue projet.
                    </p>

                    <p className="text-gray-700 leading-relaxed text-[15px] md:text-[16px]">
                      Tout est parti d'une envie simple : permettre à chaque femme de se sentir belle dans une tenue traditionnelle, sans se ruiner et sans stress.
                    </p>

                    <p className="text-gray-700 leading-relaxed text-[15px] md:text-[16px]">
                      Chez Héritage, on croit que les tenues traditionnelles sont bien plus que des vêtements : ce sont des symboles de fierté, d'élégance et d'identité.
                    </p>

                    <p className="text-gray-700 leading-relaxed text-[15px] md:text-[16px]">
                      Chaque modèle est sélectionné avec soin pour la qualité du tissu, la finesse des broderies et le confort de la coupe.
                    </p>

                    <p className="text-gray-700 leading-relaxed text-[15px] md:text-[16px]">
                      Nous travaillons avec passion pour proposer des tenues adaptées à toutes, qu'elles soient voilées ou non, avec plusieurs options pour s'ajuster à chaque style et morphologie.
                    </p>

                    <p className="text-gray-700 leading-relaxed text-[15px] md:text-[16px]">
                      Nous proposons la location et la vente pour que chacune puisse trouver la formule qui lui correspond : Porter une robe unique le temps d'un événement, ou la garder pour toujours.
                    </p>

                    <p className="text-gray-700 leading-relaxed text-[15px] md:text-[16px]">
                      Pour vous faciliter la tâche, on vous propose directement les accessoires qui vont avec !
                    </p>

                    <p className="text-gray-700 leading-relaxed text-[15px] md:text-[16px] font-medium">
                      Qu'il s'agisse de tes fiançailles, de ton mariage ou d'un événement auquel tu es invitée, nous avons ce qu'il te faut !
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

