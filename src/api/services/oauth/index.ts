import API from "@/api";
import URLs from "@/api/urls";

const { oauth } = URLs;

export const googleLogin = async (idToken) => {
  try {
    const response = await API.post(`${oauth}/google`, { idToken });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const githubLogin = async (idToken) => {
  try {
    const response = await API.post(`${oauth}/github`, { idToken });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const facebookLogin = async (idToken) => {
  try {
    const response = await API.post(`${oauth}/facebook`, { idToken });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
