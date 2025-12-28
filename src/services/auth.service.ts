import api from './api';
import type { LoginDto, AuthResponse, Admin } from '../types/auth.types';

export const authService = {
  login: async (credentials: LoginDto): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    const { accessToken, admin } = response.data;
    
    // Store token and user info
    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('adminUser', JSON.stringify(admin));
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminUser');
  },

  getCurrentUser: (): Admin | null => {
    const userStr = localStorage.getItem('adminUser');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  isAuthenticated: (): boolean => {
    return !!authService.getToken();
  },

  getProfile: async (): Promise<Admin> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

