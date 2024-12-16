import API from "@/api";
import URLs from "@/api/urls";

const { permission } = URLs;

export const all = async () => {
  try {
    const response = await API.get(permission);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const singleOne = async (id) => {
  try {
    const response = await API.get(`${permission}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const createOne = async (data) => {
  try {
    const response = await API.post(permission, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const deleteOne = async (id) => {
  try {
    const response = await API.delete(`${permission}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const updateOne = async (id, data) => {
  try {
    const response = await API.patch(`${permission}/${id}`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
