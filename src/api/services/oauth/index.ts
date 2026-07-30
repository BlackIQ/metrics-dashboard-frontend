import { API } from "@/api";
import URLs from "@/api/urls";
import { OAuthSignIn, Token } from "@/types/oauth";

const { oauth } = URLs;

export const googleAuthentication = async (
  data: OAuthSignIn,
): Promise<Token> => {
  const response = await API.post<Token>(`${oauth}/google`, data);
  return response.data;
};
