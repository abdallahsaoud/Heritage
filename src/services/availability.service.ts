import api from './api';
import type { Availability } from '../types/index';

export const availabilityService = {
  getAll: async (startDate?: string, endDate?: string): Promise<Availability[]> => {
    const params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const response = await api.get('/availability', { params });
    return response.data;
  },

  getAvailableSlots: async (
    startDate: string,
    endDate: string
  ): Promise<Availability[]> => {
    const response = await api.get('/availability/slots', {
      params: { startDate, endDate },
    });
    return response.data;
  },

  checkAvailability: async (date: string, time: string): Promise<boolean> => {
    const response = await api.get('/availability/check', {
      params: { date, time },
    });
    return response.data;
  },
};

