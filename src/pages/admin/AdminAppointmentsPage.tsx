import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Loading } from '../../components/ui/Loading';
import { appointmentsService } from '../../services/appointments.service';
import { AppointmentStatus } from '../../types/index';
import type { Appointment } from '../../types/index';
import {
  formatDateTime,
  getDressTypeName,
  getStatusLabel,
  getStatusColor,
} from '../../utils/helpers';

export const AdminAppointmentsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus | 'all'>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments', 'admin', selectedStatus],
    queryFn: () =>
      appointmentsService.getAll(
        selectedStatus !== 'all' ? selectedStatus : undefined
      ),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: AppointmentStatus }) =>
      appointmentsService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      setIsModalOpen(false);
      setSelectedAppointment(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => appointmentsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });

  const handleStatusChange = (status: AppointmentStatus) => {
    if (selectedAppointment) {
      updateStatusMutation.mutate({ id: selectedAppointment.id, status });
    }
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')
    ) {
      deleteMutation.mutate(id);
    }
  };

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-4xl font-serif mb-8">Gestion des Rendez-vous</h1>

      {/* Filtres */}
      <Card className="p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-4 py-2 rounded-[10px] transition-colors ${
              selectedStatus === 'all'
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Tous ({appointments?.length || 0})
          </button>
          {Object.values(AppointmentStatus).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-[10px] transition-colors ${
                selectedStatus === status
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {getStatusLabel(status)} (
              {appointments?.filter((a) => a.status === status).length || 0})
            </button>
          ))}
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type de robe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {appointment.clientName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {appointment.clientEmail}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.clientPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm">
                        {getDressTypeName(appointment.dressType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDateTime(appointment.appointmentDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`badge ${getStatusColor(appointment.status)}`}
                      >
                        {getStatusLabel(appointment.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(appointment)}
                          className="text-[#A81712] hover:text-[#8B120E]"
                        >
                          Détails
                        </button>
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Aucun rendez-vous trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal détails */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAppointment(null);
        }}
        title="Détails du rendez-vous"
        size="lg"
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nom du client</p>
                <p className="font-medium">{selectedAppointment.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{selectedAppointment.clientEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-medium">{selectedAppointment.clientPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type de robe</p>
                <p className="font-medium">
                  {getDressTypeName(selectedAppointment.dressType)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date du rendez-vous</p>
                <p className="font-medium">
                  {formatDateTime(selectedAppointment.appointmentDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Statut actuel</p>
                <span
                  className={`badge ${getStatusColor(selectedAppointment.status)}`}
                >
                  {getStatusLabel(selectedAppointment.status)}
                </span>
              </div>
            </div>

            {selectedAppointment.notes && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Notes</p>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {selectedAppointment.notes}
                </p>
              </div>
            )}

            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-3">Changer le statut :</p>
              <div className="flex flex-wrap gap-2">
                {Object.values(AppointmentStatus).map((status) => (
                  <Button
                    key={status}
                    variant={
                      selectedAppointment.status === status
                        ? 'primary'
                        : 'outline'
                    }
                    onClick={() => handleStatusChange(status)}
                    disabled={
                      selectedAppointment.status === status ||
                      updateStatusMutation.isPending
                    }
                  >
                    {getStatusLabel(status)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

