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