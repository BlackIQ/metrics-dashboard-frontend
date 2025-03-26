import API from "@/api";
import URLs from "@/api/urls";

const { graphs } = URLs;

export const allGraphs = async (page) => {
  try {
    const response = await API.get(`${graphs}${page}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const singleGraph = async (id) => {
  try {
    const response = await API.get(`${graphs}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const createGraph = async (data) => {
  try {
    const response = await API.post(graphs, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const deleteGraph = async (id) => {
  try {
    const response = await API.delete(`${graphs}/${id}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const updateGraph = async (id, data) => {
  try {
    const response = await API.patch(`${graphs}/${id}`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
