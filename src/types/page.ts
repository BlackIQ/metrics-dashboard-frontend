export interface PageRead {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface PageCreate {
  name: string;
  description: string;
}

export type PageUpdate = Partial<PageCreate>;
