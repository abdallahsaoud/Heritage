import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';

export const ConditionsVentePage: React.FC = () => {
  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-serif text-center mb-4">Conditions de Vente</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Conditions générales de location et de vente de HÉRITAGE
            </p>

            <Card className="p-8 md:p-12 mb-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-serif mb-6">1. Objet</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre HÉRITAGE, ci-après dénommé "le Loueur", et toute personne physique ou morale effectuant une commande, ci-après dénommée "le Client".
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Toute commande implique l'acceptation sans réserve des présentes conditions générales de vente.
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">2. Services proposés</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  HÉRITAGE propose la location de tenues traditionnelles (caftans, takchitas, karakous, jellabas, etc.) pour des événements spéciaux.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Les services incluent :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                  <li>La location de tenues pour une durée déterminée</li>
                  <li>Les retouches nécessaires pour un ajustement parfait</li>
                  <li>Le nettoyage professionnel avant et après la location</li>
                  <li>Les conseils et l'accompagnement lors de l'essayage</li>
                </ul>

                <h2 className="text-3xl font-serif mb-6 mt-12">3. Réservation et commande</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  La réservation d'un essayage peut être effectuée via notre site internet, par téléphone ou par email. La réservation devient ferme après confirmation écrite de HÉRITAGE.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Le Client s'engage à fournir des informations exactes et complètes lors de la réservation.
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">4. Tarifs</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Les prix de location sont indiqués en euros, toutes taxes comprises (TTC). Les prix sont valables pour la durée indiquée sur le site au moment de la commande.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  HÉRITAGE se réserve le droit de modifier ses prix à tout moment, étant toutefois entendu que le prix figurant au jour de la commande sera le seul applicable à l'acheteur pour cette commande.
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">5. Paiement</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Le paiement s'effectue selon les modalités suivantes :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                  <li>Un acompte de 50% est demandé lors de la réservation</li>
                  <li>Le solde est à régler lors de la remise de la tenue</li>
                  <li>Les moyens de paiement acceptés : carte bancaire, virement bancaire, espèces</li>
                </ul>

                <h2 className="text-3xl font-serif mb-6 mt-12">6. Durée de location</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  La durée standard de location est de 3 jours. Des durées personnalisées peuvent être convenues lors de la réservation.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Le délai de location commence à compter de la date de remise de la tenue au Client.
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">7. Retour et restitution</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Le Client s'engage à restituer la tenue dans l'état où il l'a reçue, dans les délais convenus.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  En cas de retard dans la restitution, des frais de location supplémentaires pourront être facturés.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  En cas de détérioration, de perte ou de vol de la tenue, le Client sera tenu de rembourser la valeur de remplacement de la tenue.
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">8. Responsabilité</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Le Client est responsable de la tenue louée pendant toute la durée de la location. Il doit prendre toutes les précautions nécessaires pour éviter tout dommage.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  HÉRITAGE ne saurait être tenu responsable des dommages indirects résultant de l'utilisation de la tenue louée.
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">9. Annulation</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  En cas d'annulation par le Client :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                  <li>Plus de 15 jours avant la date prévue : remboursement intégral de l'acompte</li>
                  <li>Entre 8 et 15 jours avant : remboursement de 50% de l'acompte</li>
                  <li>Moins de 8 jours avant : aucun remboursement</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  En cas d'annulation par HÉRITAGE, l'intégralité des sommes versées sera remboursée au Client.
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">10. Droit de rétractation</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Conformément à la législation en vigueur, le Client dispose d'un délai de 14 jours à compter de la date de réservation pour exercer son droit de rétractation, sous réserve que la tenue n'ait pas encore été remise.
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">11. Litiges et médiation</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  En cas de litige, le Client peut recourir à la médiation conventionnelle ou à tout autre mode alternatif de règlement des différends auquel les parties consentiraient.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  À défaut de résolution amiable, le litige sera soumis aux tribunaux compétents du ressort du siège social de HÉRITAGE.
                </p>

                <h2 className="text-3xl font-serif mb-6 mt-12">12. Droit applicable</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Les présentes conditions générales de vente sont soumises au droit français. Tout litige relatif à leur interprétation et/ou à leur exécution relève des tribunaux français.
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

