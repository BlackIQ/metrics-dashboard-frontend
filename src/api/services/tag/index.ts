import { API } from "@/api";
import URLs from "@/api/urls";
import { TagCreate, TagUpdate, TagRead } from "@/types/tag";

const { tag } = URLs;

export const allTags = async (): Promise<TagRead[]> => {
  const response = await API.get<TagRead[]>(tag);
  return response.data;
};

export const getTag = async (id: string): Promise<TagRead> => {
  const response = await API.get<TagRead>(`${tag}/${id}`);
  return response.data;
};

export const createTag = async (data: TagCreate): Promise<TagRead> => {
  const response = await API.post<TagRead>(tag, data);
  return response.data;
};

export const updateTag = async (
  id: string,
  data: TagUpdate,
): Promise<TagRead> => {
  const response = await API.patch<TagRead>(`${tag}/${id}`, data);
  return response.data;
};

export const deleteTag = async (id: string): Promise<void> => {
  await API.delete(`${tag}/${id}`);
};
