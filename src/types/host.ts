export interface HostCreate {
  name: string;
  description: string;
  ipv4: string;
  dns: string;
  port: number;
  api_key: string;
  communication: string;
  is_active: boolean;
}

export type HostUpdate = Partial<HostCreate>;

export interface HostRead extends HostCreate {
  id: string;
  agent_availability: boolean;
  created_at: string;
  updated_at: string;
}
