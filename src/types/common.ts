export type Communication = "IPv4" | "DNS";

export interface HTTPValidationError {
  detail: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface MessageResponse {
  message: string;
}
