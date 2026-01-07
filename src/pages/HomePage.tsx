import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import photoPrincipal from '../../public/assets/products/accueil.webp';
import karakouNoir from '../../public/assets/products/karakou-black.webp';
import caftanBlanc from '../../public/assets/products/takchita-white.webp';
import karakouNoir2 from '../../public/assets/products/caftan-purple-2.webp';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Proposez-vous la location ou l’achat de tenues traditionnelles ?',
    answer: 'Nous proposons les deux ! Vous pouvez choisir de louer une tenue traditionnelle pour une occasion ou d’en faire l’achat si vous souhaitez la conserver.',
  },
  {
    question: 'Quels sont les délais de location ?',
    answer: 'Vous pouvez réserver un essayage directement via notre calendrier en ligne (page Contact) ou nous écrire sur nos réseaux sociaux (Instagram, TikTok, Facebook) ou par email. Nous fixerons ensemble le créneau qui vous convient le mieux.',
  },
  {
    question: 'Comment puis-je réserver un essayage ?',
    answer: 'Vous pouvez réserver un essayage directement via notre calendrier en ligne (page Contact) ou nous écrire sur nos réseaux sociaux (Instagram, TikTok, Facebook) ou par email. Nous fixerons ensemble le créneau qui vous convient le mieux.',
  },
  {
    question: 'Proposez-vous les accessoires en location ?',
    answer: 'Oui, nous proposons une option supplémentaire pour la location d’accessoires afin de compléter votre tenue. En revanche, les accessoires ne sont pas disponibles à la vente.',
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
            <h2 className="text-xl font-serif text-black mb-4 text-center">FAQ</h2>
            <p className="text-gray-700 text-center mb-12 font-light text-[13px]">
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
                    className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors bg-[#FFFFFF] hover:bg-gray-50"
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
                    className={`overflow-hidden transition-all duration-300 bg-[#FFFFFF] ${
                      openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 py-4 text-gray-700 border-t border-gray-100 bg-[#FFFFFF] text-[15px]">
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
