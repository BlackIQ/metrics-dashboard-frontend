import API from "@/api";
import URLs from "@/api/urls";

const { permission } = URLs;

export const allPermissions = async () => {
  try {
    const response = await API.get(permission);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const singlePermission = async (id) => {
  try {
    const response = await API.get(`${permission}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const createPermission = async (data) => {
  try {
    const response = await API.post(permission, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const deletePermission = async (id) => {
  try {
    const response = await API.delete(`${permission}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const updatePermission = async (id, data) => {
  try {
    const response = await API.patch(`${permission}/${id}`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
