import { API } from "@/api";
import URLs from "@/api/urls";
import { UserProfile } from "@/types/user";

const { user } = URLs;

export const me = async (): Promise<UserProfile> => {
  const response = await API.get<UserProfile>(`${user}/me`);
  return response.data;
};
