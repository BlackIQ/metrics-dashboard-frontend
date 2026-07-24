import { API } from "@/api";
import URLs from "@/api/urls";

import { Signin, Signup, Token } from "@/types/auth";

const { auth } = URLs;

export const signinAuthentication = async (data: Signin): Promise<Token> => {
  const response = await API.post<Token>(`${auth}/signin`, data);

  return response.data;
};

export const signupAuthentication = async (data: Signup): Promise<Token> => {
  const response = await API.post<Token>(`${auth}/signup`, data);

  return response.data;
};
