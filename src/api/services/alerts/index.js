import API from "@/api";
import URLs from "@/api/urls";

const { alerts } = URLs;

export const listUserAlerts = async () => {
  try {
    const response = await API.get(alerts);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const createOne = async (data) => {
  try {
    const response = await API.post(alerts, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const deleteOne = async (id) => {
  try {
    const response = await API.delete(`${alerts}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const updateOne = async (id, data) => {
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
