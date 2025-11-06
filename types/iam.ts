export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    role_id: number;
    permission_id: number;
  };
}

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  priority: number;
  created_at: string;
  updated_at: string;
  permissions: Permission[];
}
