export interface GroupCreate {
  name: string;
  description: string;
}

export type GroupUpdate = Partial<GroupCreate>;

export interface GroupRead extends GroupCreate {
  id: string;
  created_at: string;
  updated_at: string;
}
