import { ErrorResponseData } from "@/types/auth";
import { User } from "@/types/user";
import axios from "axios";
import { api } from "../lib/axios";
import { formatErrorResponse } from "@/lib/utils";

export const login = async (
  email: string,
  password: string,
): Promise<{ user?: User; error?: string }> => {
  try {
    const { data } = await api.post<User>("/auth/login", {
      email,
      password,
    });
    return { user: data };
  } catch (error) {
    if (
      axios.isAxiosError<ErrorResponseData>(error) &&
      error.response?.data?.error
    ) {
      return { error: error.response.data.error.message };
    }
    return { error: "An unexpected error occurred" };
  }
};

export const signUp = async (
  name: string,
  email: string,
  password: string,
): Promise<{ user?: User; error?: string }> => {
  try {
    const { data } = await api.post<User>("/auth/sign-up", {
      name,
      email,
      password,
    });
    return { user: data };
  } catch (error) {
    if (
      axios.isAxiosError<ErrorResponseData>(error) &&
      error.response?.data?.error
    ) {
      const formattedError = formatErrorResponse(error.response.data);
      return { error: formattedError };
    }
    return { error: "An unexpected error occurred" };
  }
};
