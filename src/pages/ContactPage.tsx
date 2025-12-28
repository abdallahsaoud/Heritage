import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import type { Dress } from '../types/index';
import { getDressTypeName } from '../utils/helpers';

export const ContactPage: React.FC = () => {
  const location = useLocation();
  const selectedDress = location.state?.selectedDress as Dress | undefined;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Option 1: Utiliser Formspree (gratuit, jusqu'à 50 soumissions/mois)
    // Créer un compte sur https://formspree.io et remplacer YOUR_FORM_ID
    // Décommenter le code ci-dessous et commenter le setTimeout
    
    /*
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || 'Contact depuis le site',
          message: formData.message,
        }),
      });
      
      if (response.ok) {
        alert('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      alert('Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.');
    } finally {
      setIsSubmitting(false);
    }
    */
    
    // Option 2: Pour l'instant, simulation (à remplacer par vrai service)
    setTimeout(() => {
      alert('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  // URL Calendly - À remplacer par votre URL Calendly réelle
  const calendlyUrl = 'https://calendly.com/heritage-appointments'; // Exemple

  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0] min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-serif text-center mb-4">Contact</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Prenez rendez-vous pour un essayage ou contactez-nous pour toute question.
          </p>

          {selectedDress && (
            <div className="max-w-4xl mx-auto mb-8">
              <Card className="p-6 bg-black bg-opacity-10 border border-black">
                <p className="text-sm text-gray-700">
                  <strong>Robe présélectionnée:</strong> {selectedDress.name} -{' '}
                  {getDressTypeName(selectedDress.type)}
                </p>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Section Calendly */}
            <Card className="p-6">
              <h2 className="text-3xl font-serif mb-6">Réserver un Essayage</h2>
              <p className="text-gray-600 mb-6">
                Choisissez un créneau qui vous convient pour venir essayer nos créations.
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Horaires d'ouverture:</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Lundi - Samedi: 10h00 - 19h00
                  <br />
                  Dimanche: 14h00 - 18h00
                </p>
              </div>
              {/* Intégration Calendly */}
              <div className="relative" style={{ minHeight: '600px' }}>
                <iframe
                  src={calendlyUrl}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Calendly Scheduling"
                  className="rounded-lg"
                ></iframe>
              </div>
            </Card>

            {/* Section Contact */}
            <div className="space-y-8">
              {/* Formulaire de contact */}
              <Card className="p-6">
                <h2 className="text-3xl font-serif mb-6">Nous Contacter</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Nom complet *"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={errors.name}
                    placeholder="Votre nom"
                  />
                  <Input
                    label="Email *"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    placeholder="votre@email.com"
                  />
                  <Input
                    label="Téléphone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    error={errors.phone}
                    placeholder="+212 6 12 34 56 78"
                  />
                  <Input
                    label="Sujet"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Sujet de votre message"
                  />
                  <Textarea
                    label="Message *"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    error={errors.message}
                    placeholder="Votre message..."
                    rows={5}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    className="w-full"
                  >
                    Envoyer le message
                  </Button>
                </form>
              </Card>

              {/* Informations de contact */}
              <Card className="p-6">
                <h2 className="text-3xl font-serif mb-6">Informations</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <a
                      href="mailto:contact@heritage.com"
                      className="text-[#A81712] hover:underline"
                    >
                      contact@heritage.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Téléphone</h3>
                    <a
                      href="tel:+212612345678"
                      className="text-[#A81712] hover:underline"
                    >
                      +212 6 12 34 56 78
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Adresse</h3>
                    <p className="text-gray-600">
                      [Votre adresse]
                      <br />
                      [Ville, Code postal]
                    </p>
                  </div>
                </div>
              </Card>

              {/* Réseaux sociaux */}
              <Card className="p-6">
                <h2 className="text-3xl font-serif mb-6">Suivez-nous</h2>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/heritage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:bg-[#A81712] transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/heritage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:bg-[#A81712] transition-colors"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@heritage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:bg-[#A81712] transition-colors"
                    aria-label="TikTok"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.07 6.07 0 0 0-1-.05A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                    </svg>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

