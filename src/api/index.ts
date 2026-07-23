import axios, { AxiosInstance } from "axios";

import { apiConfig } from "@/config";

export const API: AxiosInstance = axios.create({
  baseURL: apiConfig.endpoint,
});
