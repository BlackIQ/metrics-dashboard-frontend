import axios, { AxiosInstance } from "axios";

import abc from "@/core/api/api.config";

export const API: AxiosInstance = axios.create({
  baseURL: abc.endpoint,
});
