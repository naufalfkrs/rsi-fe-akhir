export interface User {
  id: number;
  nama: string;
  email: string;
  nomor_telepon: string;
  alamat: string;
  role: string | null;
}

export interface AuthResponse {
  user: User;
}
