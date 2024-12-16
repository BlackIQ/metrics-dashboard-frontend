import API from "@/api";
import URLs from "@/api/urls";

const { auth } = URLs;

export const login = async (data) => {
  try {
    const response = await API.post(auth.login, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const register = async (data) => {
  try {
    const response = await API.post(auth.register, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
