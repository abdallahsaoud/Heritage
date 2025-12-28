export type DressType =
  | 'caftan'
  | 'takchita'
  | 'jellaba'
  | 'karakou'
  | 'gandoura'
  | 'keswa'
  | 'fouta';

export const DressType = {
  CAFTAN: 'caftan' as const,
  TAKCHITA: 'takchita' as const,
  JELLABA: 'jellaba' as const,
  KARAKOU: 'karakou' as const,
  GANDOURA: 'gandoura' as const,
  KESWA: 'keswa' as const,
  FOUTA: 'fouta' as const,
} as const;

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

export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed';

export const AppointmentStatus = {
  PENDING: 'pending' as const,
  CONFIRMED: 'confirmed' as const,
  CANCELLED: 'cancelled' as const,
  COMPLETED: 'completed' as const,
} as const;


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

