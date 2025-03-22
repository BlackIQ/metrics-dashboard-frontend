import API from "@/api";
import URLs from "@/api/urls";

const { auth } = URLs;

export const loginAccount = async (data) => {
  try {
    const response = await API.post(`${auth}/login`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const logoutAccount = async () => {
  try {
    const response = await API.post(`${auth}/logout`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const registerAccount = async (data) => {
  try {
    const response = await API.post(`${auth}/register`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const confirmEmail = async (rayid) => {
  try {
    const response = await API.post(`${auth}/confirm`, {
      rayid,
    });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const resendConfirmEmail = async (email) => {
  try {
    const response = await API.post(`${auth}/resend-confirm`, {
      email,
    });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
