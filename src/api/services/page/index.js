import API from "@/api";
import URLs from "@/api/urls";

const { pages } = URLs;

export const allPages = async (page = 1, limit = 10) => {
  try {
    const response = await API.get(`${pages}?page=${page}&limit=${limit}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const singlePage = async (id) => {
  try {
    const response = await API.get(`${pages}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const createPage = async (data) => {
  try {
    const response = await API.post(pages, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const deletePage = async (id) => {
  try {
    const response = await API.delete(`${pages}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const updatePage = async (id, data) => {
  try {
    const response = await API.patch(`${pages}/${id}`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
