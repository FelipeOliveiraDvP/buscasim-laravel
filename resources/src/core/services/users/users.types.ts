import { BaseQuery, PaginatedResponse } from "@/core/types";

export interface User {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  role: UserRolesType;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export type UserRolesType = "admin" | "user";

export type UserListQuery = BaseQuery & {
  name?: string;
  email?: string;
  role?: UserRolesType | null;
};

export type UserListResponse = PaginatedResponse<User>;

export interface UserRequest {
  id?: number;
  name: string;
  email: string;
  is_active: boolean;
}
