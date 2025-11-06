export interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  roles: string | null;
  updated_security?: string;
  permissions?: string[];
}

export interface AuthResponse {
  user: User;
}
