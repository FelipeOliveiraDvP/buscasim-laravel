import api from "@/core/config/axios";
import {
  LoginRequest,
  LoginResponse,
  ForgotRequest,
  ResetRequest,
} from "./auth.types";
import { User } from "@/core/services/users";

export default {
  async login(data: LoginRequest): Promise<LoginResponse> {
    return api.post("/api/auth/login", data);
  },

  async logout(): Promise<any> {
    return api.post("/api/auth/logout");
  },

  async forgot(data: ForgotRequest): Promise<any> {
    return api.post("/api/auth/forgot", data);
  },

  async reset(data: ResetRequest): Promise<LoginResponse> {
    return api.post("/api/auth/reset", data);
  },

  async verifyToken(token?: string): Promise<any> {
    return api.get(`/api/auth/verify/${token}`);
  },

  async profile(): Promise<User> {
    return api.get("/api/auth/me");
  },
};
