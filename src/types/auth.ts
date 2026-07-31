export interface Signin {
  email: string;
  password: string;
}

export interface Signup {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
}

export interface ResendConfirmation {
  email: string;
}

export interface Forgot {
  email: string;
}

export interface ResetPassword {
  new_password: string;
  confirm_password: string;
}

export interface ResetPasswordPayload {
  token: string;
  new_password: string;
  confirm_password: string;
}
