import API from "@/api";
import URLs from "@/api/urls";

const { host } = URLs;

export const all = async (filter) => {
  try {
    const response = await API.get(host, {
      params: filter,
    });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const singleOne = async (id) => {
  try {
    const response = await API.get(`${host}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const createOne = async (data) => {
  try {
    const response = await API.post(host, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const deleteOne = async (id) => {
  try {
    const response = await API.delete(`${host}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const updateOne = async (id, data) => {
  try {
    const response = await API.patch(`${host}/${id}`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const checkOne = async (data) => {
  try {
    const response = await API.post(`${host}/check`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
