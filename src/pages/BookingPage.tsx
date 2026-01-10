import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Input, Select, Textarea } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { appointmentsService } from '../services/appointments.service';
import { DressType } from '../types/index';
import type { CreateAppointmentDto, Dress } from '../types/index';
import { getDressTypeName } from '../utils/helpers';

export const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedDress = location.state?.selectedDress as Dress | undefined;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CreateAppointmentDto>>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    dressType: selectedDress?.type || DressType.CAFTAN,
    appointmentDate: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createAppointmentMutation = useMutation({
    mutationFn: (data: CreateAppointmentDto) =>
      appointmentsService.create(data),
    onSuccess: () => {
      setStep(4); // Success step
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error 
        ? error.message 
        : (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 
          'Une erreur est survenue lors de la réservation';
      alert(errorMessage);
    },
  });

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.clientName?.trim()) {
        newErrors.clientName = 'Le nom est requis';
      }
      if (!formData.clientEmail?.trim()) {
        newErrors.clientEmail = 'L\'email est requis';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
        newErrors.clientEmail = 'L\'email n\'est pas valide';
      }
      if (!formData.clientPhone?.trim()) {
        newErrors.clientPhone = 'Le téléphone est requis';
      }
    }

    if (currentStep === 2) {
      if (!formData.appointmentDate) {
        newErrors.appointmentDate = 'La date et l\'heure sont requises';
      } else {
        const selectedDate = new Date(formData.appointmentDate);
        const now = new Date();
        if (selectedDate < now) {
          newErrors.appointmentDate =
            'La date doit être dans le futur';
        }
      }
    }

    if (currentStep === 3) {
      if (!formData.dressType) {
        newErrors.dressType = 'Le type de robe est requis';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      createAppointmentMutation.mutate(formData as CreateAppointmentDto);
    }
  };

  const handleInputChange = (
    field: keyof CreateAppointmentDto,
    value: string
  ) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 2); // Minimum 2 heures à l'avance
    return now.toISOString().slice(0, 16);
  };

  return (
    <Layout>
      <div className="py-12 bg-[#f6f4f0] min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-serif text-center mb-8">
              Réserver un Essayage
            </h1>

            {/* Progress bar */}
            <div className="mb-12">
              <div className="flex justify-between items-center">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 ${s !== 3 ? 'mr-2' : ''}`}
                  >
                    <div
                      className={`h-2 rounded-full transition-colors ${
                        step >= s ? 'bg-black' : 'bg-gray-300'
                      }`}
                    ></div>
                    <p
                      className={`text-[13px] mt-2 text-center ${
                        step >= s ? 'text-black font-medium' : 'text-gray-500'
                      }`}
                    >
                      {s === 1 && 'Vos informations'}
                      {s === 2 && 'Date et heure'}
                      {s === 3 && 'Type de robe'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-8">
              {/* Step 1: Client Info */}
              {step === 1 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-serif mb-6">
                    Vos Informations
                  </h2>
                  <Input
                    label="Nom complet *"
                    type="text"
                    value={formData.clientName}
                    onChange={(e) =>
                      handleInputChange('clientName', e.target.value)
                    }
                    error={errors.clientName}
                    placeholder="Votre nom"
                  />
                  <Input
                    label="Email *"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) =>
                      handleInputChange('clientEmail', e.target.value)
                    }
                    error={errors.clientEmail}
                    placeholder="votre@email.com"
                  />
                  <Input
                    label="Téléphone *"
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) =>
                      handleInputChange('clientPhone', e.target.value)
                    }
                    error={errors.clientPhone}
                    placeholder="+212 6 12 34 56 78"
                  />
                  <div className="flex justify-end mt-6">
                    <Button onClick={handleNext}>Suivant</Button>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-serif mb-6">
                    Choisissez une Date et Heure
                  </h2>
                  <Input
                    label="Date et heure du rendez-vous *"
                    type="datetime-local"
                    value={formData.appointmentDate}
                    onChange={(e) =>
                      handleInputChange('appointmentDate', e.target.value)
                    }
                    error={errors.appointmentDate}
                    min={getMinDateTime()}
                  />
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-[13px] text-blue-800">
                      <strong>Horaires d'ouverture:</strong>
                      <br />
                      Lundi - Samedi: 10h00 - 19h00
                      <br />
                      Dimanche: 14h00 - 18h00
                    </p>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleBack}>
                      Retour
                    </Button>
                    <Button onClick={handleNext}>Suivant</Button>
                  </div>
                </div>
              )}

              {/* Step 3: Dress Type & Notes */}
              {step === 3 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-serif mb-6">
                    Type de Robe & Notes
                  </h2>
                  
                  {selectedDress ? (
                    <div className="bg-black bg-opacity-10 border border-black rounded-lg p-4 mb-6">
                      <p className="text-[13px] text-gray-700">
                        <strong>Robe présélectionnée:</strong>
                        <br />
                        {selectedDress.name} - {getDressTypeName(selectedDress.type)}
                      </p>
                    </div>
                  ) : (
                    <Select
                      label="Type de robe *"
                      value={formData.dressType}
                      onChange={(e) =>
                        handleInputChange('dressType', e.target.value as DressType)
                      }
                      error={errors.dressType}
                      options={[
                        { value: '', label: 'Sélectionnez un type' },
                        ...Object.values(DressType).map((type) => ({
                          value: type,
                          label: getDressTypeName(type),
                        })),
                      ]}
                    />
                  )}

                  <Textarea
                    label="Notes (optionnel)"
                    value={formData.notes}
                    onChange={(e) =>
                      handleInputChange('notes', e.target.value)
                    }
                    placeholder="Informations supplémentaires (taille, préférences, événement...)"
                  />

                  {/* Récapitulatif */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold mb-4 text-[15px]">
                      Récapitulatif
                    </h3>
                    <div className="space-y-2 text-[13px]">
                      <p>
                        <strong>Nom:</strong> {formData.clientName}
                      </p>
                      <p>
                        <strong>Email:</strong> {formData.clientEmail}
                      </p>
                      <p>
                        <strong>Téléphone:</strong> {formData.clientPhone}
                      </p>
                      <p>
                        <strong>Date:</strong>{' '}
                        {formData.appointmentDate &&
                          new Date(
                            formData.appointmentDate
                          ).toLocaleString('fr-FR')}
                      </p>
                      <p>
                        <strong>Type de robe:</strong>{' '}
                        {getDressTypeName(formData.dressType!)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleBack}>
                      Retour
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      isLoading={createAppointmentMutation.isPending}
                    >
                      Confirmer la réservation
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-12 h-12 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-serif mb-4">
                    Réservation Confirmée!
                  </h2>
                  <p className="text-black mb-8 text-[13px]">
                    Votre rendez-vous a été enregistré avec succès. Vous
                    recevrez un email de confirmation à l'adresse{' '}
                    <strong>{formData.clientEmail}</strong>.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={() => navigate('/')}>
                      Retour à l'accueil
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/robes')}>
                      Voir les robes
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

