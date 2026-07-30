export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_confirmed: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
}

export interface UpdatePasswordPayload {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface UpdateEmailPayload {
  email: string;
}
