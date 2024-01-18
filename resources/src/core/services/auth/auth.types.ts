export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ForgotRequest {
  email: string;
}

export interface ResetRequest {
  password: string;
  password_confirmation: string;
  token?: string;
}
