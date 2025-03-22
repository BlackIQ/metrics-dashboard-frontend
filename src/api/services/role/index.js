import API from "@/api";
import URLs from "@/api/urls";

const { role } = URLs;

export const allRoles = async () => {
  try {
    const response = await API.get(role);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const singleRole = async (id) => {
  try {
    const response = await API.get(`${role}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const createRole = async (data) => {
  try {
    const response = await API.post(role, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await API.delete(`${role}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const updateRole = async (id, data) => {
  try {
    const response = await API.patch(`${role}/${id}`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
