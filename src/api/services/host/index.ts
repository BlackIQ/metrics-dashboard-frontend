import { API } from "@/api";
import URLs from "@/api/urls";

import { HostCreate, HostUpdate, HostRead } from "@/types/host";

const { host } = URLs;

export const allHosts = async (): Promise<HostRead[]> => {
  const response = await API.get<HostRead[]>(host);

  return response.data;
};

export const getHost = async (id: string): Promise<HostRead> => {
  const response = await API.get<HostRead>(`${host}/${id}`);

  return response.data;
};

export const createHost = async (data: HostCreate): Promise<HostRead> => {
  const response = await API.post<HostRead>(host, data);

  return response.data;
};

export const updateHost = async (
  id: string,
  data: HostUpdate,
): Promise<HostRead> => {
  const response = await API.patch<HostRead>(`${host}/${id}`, data);

  return response.data;
};

export const deleteHost = async (id: string): Promise<void> => {
  await API.delete(`${host}/${id}`);
};
