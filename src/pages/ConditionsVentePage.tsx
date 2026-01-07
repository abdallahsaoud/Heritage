import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';

export const ConditionsVentePage: React.FC = () => {
  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-serif text-center mb-4">Conditions de Vente</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-[13px]">
              Conditions Générales de Vente et de Location
            </p>

            <Card className="p-8 md:p-12 mb-8 bg-[#FFFFFF]">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-xl font-serif mb-6">1. Objet</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Les présentes Conditions Générales de Vente et de Location (CGVL) définissent les modalités de réservation, de paiement, de location et de restitution des articles proposés par HÉRITAGE, incluant les tenues traditionnelles et les accessoires.
                </p>

                <div className="my-8 border-t border-gray-300"></div>

                <h2 className="text-xl font-serif mb-6 mt-12">2. Contrat de location</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Toute location fait l'objet d'un contrat écrit signé entre HÉRITAGE et le client au moment du retrait de la tenue.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Ce contrat précise les dates de location, les montants, les modalités de restitution et les conditions de caution.
                </p>

                <div className="my-8 border-t border-gray-300"></div>

                <h2 className="text-xl font-serif mb-6 mt-12">3. Réservation</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  La réservation d'un article devient effective uniquement après le versement d'un acompte de 30 % du montant total de la location ou de l'achat.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Sans acompte, la tenue ne peut être bloquée ni garantie pour la date souhaitée.
                </p>

                <div className="my-8 border-t border-gray-300"></div>

                <h2 className="text-xl font-serif mb-6 mt-12">4. Durée de location</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  La durée standard de location est de 3 jours :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4 text-[15px]">
                  <li>Retrait le jeudi ou le vendredi,</li>
                  <li>Retour le dimanche matin ou le lundi matin.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  <span className="font-semibold">⏰ Précision importante :</span>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Si la tenue est retirée le vendredi avant midi, elle doit être restituée au plus tard le lundi à la même heure (exemple : retirée à 11h → rendue lundi avant 11h).
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Toute prolongation de la durée de location doit être validée à l'avance par la marque.
                </p>

                <div className="my-8 border-t border-gray-300"></div>

                <h2 className="text-xl font-serif mb-6 mt-12">5. Retard de restitution</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Tout retard de restitution entraîne des pénalités :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4 text-[15px]">
                  <li>Un forfait journalier de retard peut être appliqué,</li>
                  <li>Au-delà de 48 h de retard, la caution pourra être intégralement encaissée.</li>
                </ul>

                <div className="my-8 border-t border-gray-300"></div>

                <h2 className="text-xl font-serif mb-6 mt-12">6. Caution et pièce d'identité</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Une caution est demandée pour chaque location, déposée :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4 text-[15px]">
                  <li>par empreinte bancaire,</li>
                  <li>ou en espèces.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  <span className="font-semibold">📄</span> Une photocopie d'une pièce d'identité valide du client est obligatoire pour toute location.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Aucun chèque n'est accepté.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  La caution peut être :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4 text-[15px]">
                  <li>Partiellement retenue en cas de tache, déchirure ou dommage nécessitant une remise en état (pressing, couturière, etc.),</li>
                  <li>Intégralement encaissée si la tenue ou les accessoires ne sont pas restitués, ou si l'article est rendu dans un état irrécupérable.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  La décision du montant retenu est laissée à l'appréciation du vendeur.
                </p>

                <div className="my-8 border-t border-gray-300"></div>

                <h2 className="text-xl font-serif mb-6 mt-12">7. Entretien des tenues</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Le pressing est à la charge de HÉRITAGE.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Le client ne doit pas laver ou nettoyer la tenue lui-même, afin d'éviter toute détérioration.
                </p>

                <div className="my-8 border-t border-gray-300"></div>

                <h2 className="text-xl font-serif mb-6 mt-12">8. Accessoires</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Les accessoires peuvent être loués en option, mais ne sont pas disponibles à la vente.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Ils sont soumis aux mêmes conditions de caution et de restitution que les tenues.
                </p>

                <div className="my-8 border-t border-gray-300"></div>

                <h2 className="text-xl font-serif mb-6 mt-12">9. Paiement</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Les paiements sont acceptés :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4 text-[15px]">
                  <li>en espèces,</li>
                  <li>par carte bancaire,</li>
                  <li>ou via PayPal.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Le solde est dû au moment du retrait de la tenue ou avant la remise de l'article.
                </p>

                <div className="my-8 border-t border-gray-300"></div>

                <h2 className="text-xl font-serif mb-6 mt-12">10. Annulation</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  En cas d'annulation par le client :
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  L'acompte versé n'est pas remboursable, sauf cas exceptionnel à l'appréciation de la marque.
                </p>

                <div className="my-8 border-t border-gray-300"></div>

                <h2 className="text-xl font-serif mb-6 mt-12">11. Achat</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Pour tout achat d'une tenue, une facture sera transmise aux clients.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Aucun remboursement n'aura lieu après l'achat. Seuls les échanges sont autorisés dans un délai de 30 jours après l'achat, conformément à la législation en vigueur.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Les articles échangés doivent être dans leur état d'origine, non portés, non lavés et avec leurs étiquettes d'origine.
                </p>

                <div className="my-8 border-t border-gray-300"></div>

                <h2 className="text-xl font-serif mb-6 mt-12">12. Responsabilité du client</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Le client est pleinement responsable des articles pendant toute la durée de la location.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  Toute perte, vol ou détérioration engage sa responsabilité financière jusqu'à la valeur totale de remplacement de l'article.
                </p>

                <div className="my-8 border-t border-gray-300"></div>

                <h2 className="text-xl font-serif mb-6 mt-12">13. Acceptation des conditions</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                  La réservation d'un article et la signature du contrat de location impliquent l'acceptation pleine et entière des présentes Conditions Générales de Vente et de Location.
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
