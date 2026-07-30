import { Communication } from "./common";

export interface HostRead {
  id: string;
  name: string;
  description: string;
  ipv4: string;
  dns: string;
  port: number;
  api_key: string;
  communication: Communication;
  is_active: boolean;
  agent_availability: boolean;
  created_at: string;
  updated_at: string;
}

export interface HostCreate {
  name: string;
  description: string;
  ipv4: string;
  dns: string;
  port: number;
  api_key: string;
  communication: Communication;
  is_active: boolean;
}

export type HostUpdate = Partial<HostCreate>;
