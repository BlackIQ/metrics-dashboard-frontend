import API from "@/api";
import URLs from "@/api/urls";

const { metrics } = URLs;

export const readMetrics = async (
  hostID,
  query,
  start = "-1m",
  end = "now()"
) => {
  try {
    const response = await API.post(
      `${metrics}/${hostID}`,
      { ...query },
      {
        params: {
          start,
          end,
        },
      }
    );

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const getKeys = async (host) => {
  try {
    const response = await API.get(`${metrics}/keys/${host}`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
