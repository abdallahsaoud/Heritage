import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';

export const MentionsLegalesPage: React.FC = () => {
  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-serif text-center mb-4">Mentions Légales</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Informations légales concernant HÉRITAGE
            </p>

            <Card className="p-8 md:p-12 mb-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-serif mb-6">1. Éditeur du site</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Le site <strong>heritage.com</strong> est édité par :
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <p className="text-gray-700">
                    <strong>HÉRITAGE</strong>
                    <br />
                    [Raison sociale]
                    <br />
                    [Adresse complète]
                    <br />
                    [Numéro SIRET]
                    <br />
                    Téléphone : [Numéro de téléphone]
                    <br />
                    Email : contact@heritage.com
                  </p>
                </div>

                <h2 className="text-3xl font-serif mb-6 mt-12">2. Directeur de publication</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Le directeur de publication est [Nom du directeur de publication].
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">3. Hébergement</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Le site est hébergé par :
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <p className="text-gray-700">
                    [Nom de l'hébergeur]
                    <br />
                    [Adresse de l'hébergeur]
                    <br />
                    [Téléphone de l'hébergeur]
                  </p>
                </div>

                <h2 className="text-3xl font-serif mb-6 mt-12">4. Propriété intellectuelle</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">5. Protection des données personnelles</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Pour exercer ce droit, vous pouvez nous contacter à l'adresse suivante : contact@heritage.com
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">6. Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Le site peut être amené à utiliser des cookies pour améliorer l'expérience utilisateur. En naviguant sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de cookies.
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">7. Responsabilité</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email à contact@heritage.com.
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">8. Liens hypertextes</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Le site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site HÉRITAGE.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de l'éditeur. Aucune autorisation ni demande d'information préalable ne peut être exigée par l'éditeur à l'égard d'un site qui souhaite établir un lien vers le site de l'éditeur.
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">9. Droit applicable</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Le présent site et les modalités de son utilisation sont régis par le droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
                </p>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
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

