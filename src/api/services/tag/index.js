import API from "@/api";
import URLs from "@/api/urls";

const { tag } = URLs;

export const all = async (filter) => {
  try {
    const response = await API.get(tag, {
      params: filter,
    });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const singleOne = async (id) => {
  try {
    const response = await API.get(`${tag}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const createOne = async (data) => {
  try {
    const response = await API.post(tag, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const deleteOne = async (id) => {
  try {
    const response = await API.delete(`${tag}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const updateOne = async (id, data) => {
  try {
    const response = await API.patch(`${tag}/${id}`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
