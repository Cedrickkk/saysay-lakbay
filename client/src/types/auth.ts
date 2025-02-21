import { User } from "./user";

export type ErrorResponseData = {
  statusCode: number;
  error: {
    name: string;
    message: string;
    issues?: ZodErrorResponse[];
  };
};

export type ZodErrorResponse = {
  path?: string[];
  message?: string;
};

export type AuthResponse = {
  user: User | null;
  isAuthenticated: boolean;
};
