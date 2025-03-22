import API from "@/api";
import URLs from "@/api/urls";

const { alerts } = URLs;

export const allAlerts = async (page = 1, limit = 10) => {
  try {
    const response = await API.get(`${alerts}?page=${page}&limit=${limit}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const createAlert = async (data) => {
  try {
    const response = await API.post(alerts, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const deleteAlert = async (id) => {
  try {
    const response = await API.delete(`${alerts}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const updateAlert = async (id, data) => {
  try {
    const response = await API.patch(`${alerts}/${id}`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const testAlert = async (data) => {
  try {
    const response = await API.post(`${alerts}/test`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
