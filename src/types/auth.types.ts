export interface Admin {
  id: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  admin: Admin;
}

export interface LoginDto {
  email: string;
  password: string;
}

