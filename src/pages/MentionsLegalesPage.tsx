import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';

export const MentionsLegalesPage: React.FC = () => {
  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-serif text-center mb-4">Mentions Légales</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-[13px]">
              Informations légales concernant HÉRITAGE
            </p>

            <Card className="p-8 md:p-12 mb-8">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <p className="text-gray-500 text-sm mb-4">En vigueur au 09/01/2026</p>
                  <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                    Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., il est porté à la connaissance des Utilisateurs du site classymastour.fr les présentes mentions légales.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                    La connexion et la navigation sur le site classymastour.fr par l'Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                    Ces dernières sont accessibles sur le site à la rubrique « Mentions légales ».
                  </p>
                </div>

                <h2 className="text-xl font-serif mb-6 mt-12">Informations légales</h2>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <p className="text-gray-700 text-[15px]">
                    <strong>HÉRITAGE</strong>
                    <br />
                    Abdallah SAOUD
                    <br />
                    Royer Bendelé, 92230 Gennevilliers
                    <br />
                    SIRET : 93268669400013
                    <br />
                    Téléphone : 0664084407
                    <br />
                    Email : heritage.bynedhal@gmail.com
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Le directeur de publication est Nedhal AOUF-SAOUD.
                  <br />
                  Téléphone : 0664084407
                  <br />
                  Email : heritage.bynedhal@gmail.com
                </p>

                <h2 className="text-xl font-serif mb-6 mt-12">Hébergement</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Le site est hébergé par Vercel Inc. dont le siège social est situé au :
                  <br />
                  340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
                  <br />
                  Site web : <a href="https://vercel.com" className="text-[#A81712] hover:underline" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  L'hébergement est assuré par Vercel dans le respect des réglementations en vigueur en matière de sécurité et de protection des données.
                </p>

                <h2 className="text-xl font-serif mb-6 mt-12">Propriété intellectuelle</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  L'ensemble du contenu du site (textes, images, vidéos, logo, graphismes, charte visuelle, etc.) est la propriété exclusive d'Héritage, sauf mention contraire.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Toute reproduction, diffusion ou exploitation, totale ou partielle, sans autorisation écrite préalable, est strictement interdite et peut entraîner des poursuites.
                </p>

                <h2 className="text-xl font-serif mb-6 mt-12">Protection des données personnelles</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Pour exercer ce droit, vous pouvez nous contacter à l'adresse suivante : 
                  <br />
                  <a href="mailto:heritage.bynedhal@gmail.com" className="text-[#A81712] hover:underline">heritage.bynedhal@gmail.com</a>
                </p>

                <h2 className="text-xl font-serif mb-6 mt-12">Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Le site peut être amené à utiliser des cookies pour améliorer l'expérience utilisateur. En naviguant sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de cookies.
                </p>

                <h2 className="text-xl font-serif mb-6 mt-12">Responsabilité</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email à <a href="mailto:heritage.bynedhal@gmail.com" className="text-[#A81712] hover:underline">heritage.bynedhal@gmail.com</a>
                </p>

                <h2 className="text-xl font-serif mb-6 mt-12">Liens hypertextes</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Le site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site HÉRITAGE.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Toute information accessible via un lien vers d'autres sites n'est pas sous le contrôle d'HÉRITAGE qui décline toute responsabilité quant à leur contenu.
                </p>

                <h2 className="text-xl font-serif mb-6 mt-12">Droit applicable</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Le présent site et les modalités de son utilisation sont régis par le droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

