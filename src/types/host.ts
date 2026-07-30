import { Communication } from "@/types/common";

import { GroupRead } from "@/types/group";
import { TagRead } from "@/types/tag";

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

  group: GroupRead;
  tags: TagRead[];

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

  group_id: string;
  tag_ids: string[];
}

export type HostUpdate = Partial<HostCreate>;
