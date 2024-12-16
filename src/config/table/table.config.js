const tables = {
  role: {
    title: "Roles",
    fields: {
      label: "Name",
      value: "Sign",
      delete: "Delete",
    },
  },
  permission: {
    title: "Permissions",
    fields: {
      label: "Name",
      value: "Sign",
      delete: "Delete",
    },
  },
  host: {
    title: "Hosts",
    fields: {
      name: "Hostname",
      agentAvailable: "Status",
      ip: "IP",
      dns: "DNS",
      port: "Port",
      ipCommunication: "Communication",
    },
  },
  user: {
    title: "Users",
    fields: {
      firstName: "Firstname",
      lastName: "Lastname",
      "role.label": "Role",
    },
  },
};

export default tables;
