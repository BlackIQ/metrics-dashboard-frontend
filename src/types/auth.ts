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

export interface Token {
  access_token: string;
  token_type: string;
}
