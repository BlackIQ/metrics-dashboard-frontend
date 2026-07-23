import { API } from "@/api";
import URLs from "@/api/urls";

const { auth } = URLs;

export const signinAuthentication = async (data) => {
  try {
    const response = await API.post(`${auth}/signin`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const signupAuthentication = async (data) => {
  try {
    const response = await API.post(`${auth}/signup`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
