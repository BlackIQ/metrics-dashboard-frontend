import API from "@/api";
import URLs from "@/api/urls";

const { user } = URLs;

export const all = async () => {
  try {
    const response = await API.get(user);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const single = async (id) => {
  try {
    const response = await API.get(`${user}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const updateOne = async (id, data) => {
  try {
    const response = await API.patch(`${user}/${id}`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const changePassword = async (id, data) => {
  try {
    const response = await API.patch(`${user}/password/${id}`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
