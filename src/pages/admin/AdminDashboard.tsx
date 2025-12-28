import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Loading } from '../../components/ui/Loading';
import { appointmentsService } from '../../services/appointments.service';
import { dressesService } from '../../services/dresses.service';
import {
  formatDateTime,
  getDressTypeName,
  getStatusLabel,
  getStatusColor,
} from '../../utils/helpers';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['appointments', 'statistics'],
    queryFn: () => appointmentsService.getStatistics(),
  });

  const { data: upcomingAppointments, isLoading: appointmentsLoading } =
    useQuery({
      queryKey: ['appointments', 'upcoming'],
      queryFn: () => appointmentsService.getUpcoming(5),
    });

  const { data: dresses, isLoading: dressesLoading } = useQuery({
    queryKey: ['dresses'],
    queryFn: () => dressesService.getAll(),
  });

  const activeDresses = dresses?.filter((d) => d.available).length || 0;

  if (statsLoading || appointmentsLoading || dressesLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-4xl font-serif mb-8">Tableau de Bord</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Rendez-vous en attente</p>
              <p className="text-3xl font-bold text-[#A81712] mt-2">
                {stats?.pending || 0}
              </p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Confirmés</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats?.confirmed || 0}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Aujourd'hui</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {stats?.today || 0}
              </p>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Robes disponibles</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {activeDresses}
              </p>
            </div>
            <div className="text-4xl">👗</div>
          </div>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif">Prochains Rendez-vous</h2>
            <Button
              variant="outline"
              onClick={() => navigate('/admin/rendez-vous')}
            >
              Voir tout
            </Button>
          </div>

          <div className="space-y-4">
            {upcomingAppointments && upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gold transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{appointment.clientName}</p>
                      <p className="text-sm text-gray-600">
                        {appointment.clientPhone}
                      </p>
                    </div>
                    <span
                      className={`badge ${getStatusColor(appointment.status)}`}
                    >
                      {getStatusLabel(appointment.status)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      {getDressTypeName(appointment.dressType)}
                    </span>
                    <span className="text-[#A81712]">
                      {formatDateTime(appointment.appointmentDate)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                Aucun rendez-vous à venir
              </p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif">Actions Rapides</h2>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full justify-start"
              onClick={() => navigate('/admin/rendez-vous')}
            >
              📋 Voir tous les rendez-vous
            </Button>
            <Button
              className="w-full justify-start"
              variant="secondary"
              onClick={() => navigate('/admin/robes')}
            >
              👗 Gérer les robes
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => navigate('/')}
            >
              👁️ Voir le site public
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold mb-3">Statistiques globales</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total rendez-vous:</span>
                <span className="font-medium">{stats?.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Annulés:</span>
                <span className="font-medium text-red-600">
                  {stats?.cancelled || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Terminés:</span>
                <span className="font-medium text-blue-600">
                  {stats?.completed || 0}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

