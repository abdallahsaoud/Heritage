import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import photoPrincipal from '../Heritage-assets/accueil.webp';
import karakouNoir from '../Heritage-assets/karakou-black.jpeg';
import caftanBlanc from '../Heritage-assets/takchita-white.jpeg';
import karakouNoir2 from '../Heritage-assets/caftan-purple-2.jpeg';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Comment puis-je réserver un essayage ?',
    answer: 'Vous pouvez réserver un essayage en vous rendant sur notre page Contact et en utilisant notre système de réservation Calendly. Vous pouvez également nous contacter directement par email ou téléphone pour convenir d\'un rendez-vous qui vous convient.',
  },
  {
    question: 'Quels sont les délais de location ?',
    answer: 'La durée de location standard est de 3 jours. Pour les événements spéciaux, nous proposons également des locations sur mesure. N\'hésitez pas à nous contacter pour discuter de vos besoins spécifiques.',
  },
  {
    question: 'Proposez-vous des retouches ?',
    answer: 'Oui, nous proposons des retouches pour s\'assurer que votre tenue vous va parfaitement. Les retouches sont effectuées par nos artisans qualifiés et sont incluses dans le service de location. Veuillez nous informer de vos besoins lors de la réservation.',
  },
  {
    question: 'Comment puis-je prendre soin de ma tenue pendant la location ?',
    answer: 'Nous vous fournirons un guide de soins détaillé avec chaque location. En général, nous recommandons de suspendre la tenue sur un cintre adapté, d\'éviter les sources de chaleur directe, et de ne pas utiliser de produits de nettoyage à domicile. Le nettoyage professionnel est inclus dans le service.',
  },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="bg-[#f6f4f0]">
        {/* Section 1: Image principale pleine largeur */}
        <section className="w-full m-0 p-0 block">
          <div className="relative h-[400px] md:h-[750px] w-full overflow-hidden m-0 p-0 block">
            <img
              src={photoPrincipal}
              alt="Collection Héritage"
              className="w-full h-full object-cover block m-0 p-0"
              style={{ display: 'block', verticalAlign: 'top', margin: 0, padding: 0, width: '100%', height: '100%' }}
            />
          </div>
        </section>

        {/* Grille de 3 images avec catégories */}
        <section className="grid grid-cols-1 md:grid-cols-3 m-0 p-0">
          {/* Image 1 - takchita */}
          <div
            className="relative cursor-pointer group overflow-hidden"
            onClick={() => navigate('/catalogue')}
          >
            <img
              src={caftanBlanc}
              alt="Takchita"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-white text-xl font-light uppercase tracking-wider">takchita</p>
            </div>
          </div>

          {/* Image 2 - Karakou */}
          <div
            className="relative cursor-pointer group overflow-hidden"
            onClick={() => navigate('/tenues-algeriennes')}
          >
            <img
              src={karakouNoir}
              alt="Karakou"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-white text-xl font-light uppercase tracking-wider">Karakou</p>
            </div>
          </div>

          {/* Image 3 - Caftan */}
          <div
            className="relative cursor-pointer group overflow-hidden"
            onClick={() => navigate('/catalogue')}
          >
            <img
              src={karakouNoir2}
              alt="Caftan"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-white text-xl font-light uppercase tracking-wider">Caftan</p>
            </div>
          </div>
        </section>

        {/* Section FAQ */}
        <section className="bg-[#f6f4f0] py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-4xl font-serif text-black mb-4 text-center">FAQ</h2>
            <p className="text-gray-700 text-center mb-12 font-light">
              Questions fréquemment posées
            </p>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-black pr-4">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0 ${
                        openIndex === index ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 py-4 text-gray-700 border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
