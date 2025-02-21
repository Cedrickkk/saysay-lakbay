import { api } from "@/lib/axios";
import { AuthResponse } from "@/types/auth";
import { queryOptions } from "@tanstack/react-query";

export const getAuthStatus = async (): Promise<AuthResponse> => {
  try {
    const {
      data: { isAuthenticated, user },
    } = await api.get<AuthResponse>("/auth/status");

    return { isAuthenticated, user };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: unknown) {
    return { isAuthenticated: false, user: null };
  }
};

export const authStatusOptions = queryOptions({
  queryKey: ["authStatus"],
  queryFn: getAuthStatus,
  staleTime: Infinity,
});
