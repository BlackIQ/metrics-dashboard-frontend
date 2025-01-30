import API from "@/api";
import URLs from "@/api/urls";

const { metrics } = URLs;

export const READ = async (
  hostID,
  measurements = ["host_system_load_metrics"],
  start = "-1m",
  end = "now()"
) => {
  try {
    const response = await API.post(
      `${metrics}/${hostID}`,
      { measurements },
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
