export interface TagRead {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface TagCreate {
  name: string;
  description: string;
}

export type TagUpdate = Partial<TagCreate>;
