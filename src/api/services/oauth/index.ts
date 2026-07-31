import { API } from "@/api";
import URLs from "@/api/urls";
import { OAuthSignIn } from "@/types/oauth";
import { Token } from "@/types/common";

const { oauth } = URLs;

export const googleAuthentication = async (
  data: OAuthSignIn,
): Promise<Token> => {
  const response = await API.post<Token>(`${oauth}/google`, data);
  return response.data;
};

export const facebookAuthentication = async (
  data: OAuthSignIn,
): Promise<Token> => {
  const response = await API.post<Token>(`${oauth}/facebook`, data);
  return response.data;
};

export const githubAuthentication = async (
  data: OAuthSignIn,
): Promise<Token> => {
  const response = await API.post<Token>(`${oauth}/github`, data);
  return response.data;
};
