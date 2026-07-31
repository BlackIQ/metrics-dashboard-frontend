export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "password"
  | "select"
  | "multiselect"
  | "switch";

export interface SelectOption {
  id: string | number;
  label: string;
}

export interface FormFieldConfig {
  type: FieldType;
  label: string;
  placeholder?: string;
  size?: { xs?: number; sm?: number; md?: number; lg?: number };
  options?: SelectOption[];
  optionsKey?: string;
  advanced?: {
    required?: boolean | string;
    min?: number;
    max?: number;
    pattern?: RegExp;
  };
}

export type FormConfig = Record<string, FormFieldConfig>;

const forms: Record<string, FormConfig> = {
  login: {
    email: {
      type: "text",
      label: "Email Address",
      placeholder: "name@domain.com",
      size: { xs: 12 },
      advanced: { required: "Email is required" },
    },
    password: {
      type: "password",
      label: "Password",
      placeholder: "Enter password",
      size: { xs: 12 },
      advanced: { required: "Password is required" },
    },
  },

  register: {
    firstName: {
      type: "text",
      label: "First Name",
      placeholder: "John",
      size: { xs: 12, sm: 6 },
      advanced: { required: "First name is required" },
    },
    lastName: {
      type: "text",
      label: "Last Name",
      placeholder: "Doe",
      size: { xs: 12, sm: 6 },
      advanced: { required: "Last name is required" },
    },
    email: {
      type: "text",
      label: "Email Address",
      placeholder: "john@example.com",
      size: { xs: 12 },
      advanced: { required: "Email is required" },
    },
    password: {
      type: "password",
      label: "Password",
      placeholder: "Create strong password",
      size: { xs: 12 },
      advanced: { required: "Password is required" },
    },
  },

  forget: {
    email: {
      type: "text",
      label: "Email Address",
      placeholder: "name@domain.com",
      size: { xs: 12 },
      advanced: { required: "Email is required" },
    },
  },

  reset: {
    new_password: {
      type: "password",
      label: "New Password",
      advanced: { required: true },
    },
    confirm_password: {
      type: "password",
      label: "Confirm New Password",
      advanced: { required: true },
    },
  },

  user_profile: {
    first_name: {
      type: "text",
      label: "First Name",
      advanced: { required: true },
    },
    last_name: {
      type: "text",
      label: "Last Name",
      advanced: { required: true },
    },
  },

  user_password: {
    current_password: {
      type: "password",
      label: "Current Password",
      advanced: { required: true },
    },
    new_password: {
      type: "password",
      label: "New Password",
      advanced: { required: true },
    },
    confirm_password: {
      type: "password",
      label: "Confirm New Password",
      advanced: { required: true },
    },
  },

  user_email: {
    email: {
      type: "text",
      label: "New Email Address",
      advanced: { required: true },
    },
  },

  tag: {
    name: {
      type: "text",
      label: "Tag Name",
      placeholder: "e.g., production, k8s, region-us",
      size: { xs: 12 },
      advanced: { required: "Tag name is required" },
    },
    description: {
      type: "textarea",
      label: "Description",
      placeholder: "Brief note about this tag usage...",
      size: { xs: 12 },
    },
  },

  group: {
    name: {
      type: "text",
      label: "Group Name",
      placeholder: "e.g., Infrastructure, Analytics Cluster",
      size: { xs: 12 },
      advanced: { required: "Group name is required" },
    },
    description: {
      type: "textarea",
      label: "Description",
      placeholder: "Scope and responsibility of this group...",
      size: { xs: 12 },
    },
  },

  host: {
    name: {
      type: "text",
      label: "Host Name",
      placeholder: "node-01.prod",
      size: { xs: 12, md: 6 },
      advanced: { required: "Host name is required" },
    },
    communication: {
      type: "select",
      label: "Communication Protocol",
      placeholder: "Select target",
      size: { xs: 12, md: 6 },
      options: [
        { id: "IPv4", label: "IPv4 Address" },
        { id: "DNS", label: "DNS Hostname" },
      ],
      advanced: { required: "Select communication method" },
    },
    ipv4: {
      type: "text",
      label: "IPv4 Address",
      placeholder: "192.168.1.100",
      size: { xs: 12, sm: 6 },
    },
    dns: {
      type: "text",
      label: "Domain Name",
      placeholder: "agent.internal.domain",
      size: { xs: 12, sm: 6 },
    },
    port: {
      type: "number",
      label: "Port",
      placeholder: "9090",
      size: { xs: 12, sm: 6 },
      advanced: { required: "Port number is required" },
    },
    api_key: {
      type: "password",
      label: "Agent API Key",
      placeholder: "Secret token for handshake",
      size: { xs: 12, sm: 6 },
      advanced: { required: "API key is required" },
    },
    group_id: {
      type: "select",
      label: "Assigned Group",
      placeholder: "Select group",
      optionsKey: "groups",
      size: { xs: 12, md: 6 },
      advanced: { required: "Selecting a group is required" },
    },
    tag_ids: {
      type: "multiselect",
      label: "Assigned Tags",
      placeholder: "Select tags...",
      optionsKey: "tags", // matches selectOptions.tags
      size: { xs: 12, md: 6 },
    },
    description: {
      type: "textarea",
      label: "Description",
      placeholder: "Host purpose, region, or metadata...",
      size: { xs: 12 },
    },
    is_active: {
      type: "switch",
      label: "Agent Active Status",
      size: { xs: 12 },
    },
  },
};

export default forms;
