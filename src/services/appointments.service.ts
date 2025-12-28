import api from './api';
import { AppointmentStatus } from '../types/index';
import type {
  Appointment,
  CreateAppointmentDto,
  AppointmentStatistics,
} from '../types/index';

export const appointmentsService = {
  getAll: async (
    status?: AppointmentStatus,
    startDate?: string,
    endDate?: string
  ): Promise<Appointment[]> => {
    const params: any = {};
    if (status) params.status = status;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const response = await api.get('/appointments', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Appointment> => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  create: async (data: CreateAppointmentDto): Promise<Appointment> => {
    const response = await api.post('/appointments', data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<CreateAppointmentDto>
  ): Promise<Appointment> => {
    const response = await api.patch(`/appointments/${id}`, data);
    return response.data;
  },

  updateStatus: async (
    id: string,
    status: AppointmentStatus
  ): Promise<Appointment> => {
    const response = await api.patch(`/appointments/${id}/status`, { status });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/appointments/${id}`);
  },

  getStatistics: async (): Promise<AppointmentStatistics> => {
    const response = await api.get('/appointments/statistics');
    return response.data;
  },

  getUpcoming: async (limit: number = 5): Promise<Appointment[]> => {
    const response = await api.get('/appointments/upcoming', {
      params: { limit },
    });
    return response.data;
  },

  getToday: async (): Promise<Appointment[]> => {
    const response = await api.get('/appointments/today');
    return response.data;
  },
};

