import { API } from "@/api";
import URLs from "@/api/urls";
import { Signin, Signup, Forgot, Token } from "@/types/auth";

const { auth } = URLs;

export const signinAuthentication = async (data: Signin): Promise<Token> => {
  const response = await API.post<Token>(`${auth}/signin`, data);
  return response.data;
};

export const signupAuthentication = async (data: Signup): Promise<Token> => {
  const response = await API.post<Token>(`${auth}/signup`, data);
  return response.data;
};

export const forgotPassword = async (data: Forgot): Promise<Token> => {
  const response = await API.post<Token>(`${auth}/forgot`, data);
  return response.data;
};
