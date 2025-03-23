import API from "@/api";
import URLs from "@/api/urls";

const { user } = URLs;

export const allUsers = async (page = 1, limit = 10) => {
  try {
    const response = await API.get(`${user}?page=${page}&limit=${limit}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const me = async () => {
  try {
    const response = await API.get(`${user}/me`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const singleUser = async (id) => {
  try {
    const response = await API.get(`${user}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const updateUser = async (id, data) => {
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
