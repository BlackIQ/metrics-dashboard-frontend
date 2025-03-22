import API from "@/api";
import URLs from "@/api/urls";

const { host } = URLs;

export const allHosts = async () => {
  try {
    const response = await API.get(host);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const singleHost = async (id) => {
  try {
    const response = await API.get(`${host}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const createHost = async (data) => {
  try {
    const response = await API.post(host, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const deleteHost = async (id) => {
  try {
    const response = await API.delete(`${host}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const updateHost = async (id, data) => {
  try {
    const response = await API.patch(`${host}/${id}`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const checkHost = async (data) => {
  try {
    const response = await API.post(`${host}/check`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
