import API from "@/api";
import URLs from "@/api/urls";

const { group } = URLs;

export const allGroups = async () => {
  try {
    const response = await API.get(group);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const singleGroup = async (id) => {
  try {
    const response = await API.get(`${group}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const createGroup = async (data) => {
  try {
    const response = await API.post(group, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const deleteGroup = async (id) => {
  try {
    const response = await API.delete(`${group}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const updateGroup = async (id, data) => {
  try {
    const response = await API.patch(`${group}/${id}`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
