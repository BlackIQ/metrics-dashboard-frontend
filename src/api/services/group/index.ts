import { API } from "@/api";
import URLs from "@/api/urls";

import { GroupCreate, GroupUpdate, GroupRead } from "@/types/group";

const { group } = URLs;

export const allGroups = async (): Promise<GroupRead[]> => {
  const response = await API.get<GroupRead[]>(group);

  return response.data;
};

export const getGroup = async (id: string): Promise<GroupRead> => {
  const response = await API.get<GroupRead>(`${group}/${id}`);

  return response.data;
};

export const createGroup = async (data: GroupCreate): Promise<GroupRead> => {
  const response = await API.post<GroupRead>(group, data);

  return response.data;
};

export const updateGroup = async (
  id: string,
  data: GroupUpdate,
): Promise<GroupRead> => {
  const response = await API.patch<GroupRead>(`${group}/${id}`, data);

  return response.data;
};

export const deleteGroup = async (id: string): Promise<void> => {
  await API.delete(`${group}/${id}`);
};
