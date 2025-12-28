import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { Loading } from '../../components/ui/Loading';
import { dressesService } from '../../services/dresses.service';
import { DressType } from '../../types/index';
import type { CreateDressDto, Dress } from '../../types/index';
import { formatPrice, getDressTypeName } from '../../utils/helpers';

export const AdminDressesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDress, setEditingDress] = useState<Dress | null>(null);
  const [formData, setFormData] = useState<Partial<CreateDressDto>>({
    name: '',
    type: DressType.CAFTAN,
    description: '',
    imageUrl: '',
    price: 0,
  });

  const { data: dresses, isLoading } = useQuery({
    queryKey: ['dresses'],
    queryFn: () => dressesService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: () => dressesService.create(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dresses'] });
      handleCloseModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      dressesService.update(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dresses'] });
      handleCloseModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => dressesService.delete(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dresses'] });
    },
  });

  const handleOpenModal = (dress?: Dress) => {
    if (dress) {
      setEditingDress(dress);
      setFormData({
        name: dress.name,
        type: dress.type,
        description: dress.description,
        imageUrl: dress.imageUrl,
        price: dress.price,
      });
    } else {
      setEditingDress(null);
      setFormData({
        name: '',
        type: DressType.CAFTAN,
        description: '',
        imageUrl: '',
        price: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDress(null);
    setFormData({
      name: '',
      type: DressType.CAFTAN,
      description: '',
      imageUrl: '',
      price: 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDress) {
      updateMutation.mutate();
    } else {
      createMutation.mutate();
    }
  };

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette robe ?')) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif">Gestion des Robes</h1>
        <Button onClick={() => handleOpenModal()}>+ Ajouter une robe</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dresses?.map((dress) => (
          <Card key={dress.id} className="overflow-hidden">
            <img
              src={dress.imageUrl}
              alt={dress.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-[#A81712] font-medium">
                  {getDressTypeName(dress.type)}
                </span>
                {dress.available ? (
                  <span className="badge bg-green-100 text-green-800">
                    Disponible
                  </span>
                ) : (
                  <span className="badge bg-red-100 text-red-800">
                    Indisponible
                  </span>
                )}
              </div>
              <h3 className="text-lg font-serif mb-2">{dress.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {dress.description}
              </p>
              <p className="text-xl font-bold text-[#A81712] mb-4">
                {formatPrice(dress.price)}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleOpenModal(dress)}
                  className="flex-1"
                >
                  Modifier
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleDelete()}
                  className="flex-1"
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingDress ? 'Modifier la robe' : 'Ajouter une robe'}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Nom"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Select
            label="Type"
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value as DressType })
            }
            options={Object.values(DressType).map((type) => ({
              value: type,
              label: getDressTypeName(type),
            }))}
            required
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          <Input
            label="URL de l'image"
            type="url"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            required
          />

          <Input
            label="Prix (€)"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
            required
          />

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Annuler
            </Button>
            <Button
              type="submit"
              isLoading={
                createMutation.isPending || updateMutation.isPending
              }
            >
              {editingDress ? 'Modifier' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

