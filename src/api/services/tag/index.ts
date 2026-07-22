import API from "@/api";
import URLs from "@/api/urls";

const { tag } = URLs;

export const allTags = async (page = 1, limit = 10) => {
  try {
    const response = await API.get(`${tag}?page=${page}&limit=${limit}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const singleTag = async (id) => {
  try {
    const response = await API.get(`${tag}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const createTag = async (data) => {
  try {
    const response = await API.post(tag, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const deleteTag = async (id) => {
  try {
    const response = await API.delete(`${tag}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const updateTag = async (id, data) => {
  try {
    const response = await API.patch(`${tag}/${id}`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
