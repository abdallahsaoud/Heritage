export enum DressType {
  CAFTAN = 'caftan',
  TAKCHITA = 'takchita',
  JELLABA = 'jellaba',
  KARAKOU = 'karakou',
  GANDOURA = 'gandoura',
  KESWA = 'keswa',
  FOUTA = 'fouta',
}

export interface Dress {
  id: string;
  name: string;
  type: DressType;
  description: string;
  imageUrl: string;
  price: number;
  available: boolean;
  createdAt: string;
}

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  dressType: DressType;
  appointmentDate: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Availability {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt: string;
}

export interface Admin {
  id: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  admin: Admin;
}

export interface CreateDressDto {
  name: string;
  type: DressType;
  description: string;
  imageUrl: string;
  price: number;
}

export interface CreateAppointmentDto {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  dressType: DressType;
  appointmentDate: string;
  notes?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AppointmentStatistics {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
  today: number;
}

