export interface PageCreate {
  name: string;
  description: string;
}

export type PageUpdate = Partial<PageCreate>;

export interface PageRead extends PageCreate {
  id: string;
  created_at: string;
  updated_at: string;
}
