const tables = {
  role: {
    title: "Roles",
    fields: {
      label: "Name",
      value: "Identifier",
      delete: "Delete",
    },
  },
  permission: {
    title: "Permissions",
    fields: {
      label: "Name",
      value: "Identifier",
      delete: "Delete",
    },
  },
  host: {
    title: "Hosts",
    fields: {
      name: "Hostname",
      agentAvailable: "Status",
      dockerMetrics: "Docker",
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
  tag: {
    title: "Tags",
    fields: {
      label: "Name",
      delete: "Delete",
    },
  },
  group: {
    title: "Groups",
    fields: {
      label: "Name",
      delete: "Delete",
    },
  },
  alert: {
    title: "Alerts",
    fields: {
      name: "Name",
      details: "Details",
      alertStatus: "Status",
    },
  },
};

export default tables;
