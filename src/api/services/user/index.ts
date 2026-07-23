import { API } from "@/api";
import URLs from "@/api/urls";

const { user } = URLs;

export const me = async () => {
  try {
    const response = await API.get(`${user}/me`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
