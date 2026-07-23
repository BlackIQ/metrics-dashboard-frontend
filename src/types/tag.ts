export interface TagCreate {
  name: string;
  description: string;
}

export type TagUpdate = Partial<TagCreate>;

export interface TagRead extends TagCreate {
  id: string;
  created_at: string;
  updated_at: string;
}
