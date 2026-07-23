const tables = {
  host: {
    title: "Hosts",
    fields: {
      name: "Hostname",
      agentAvailable: "Status",
      ip: "IP",
      dns: "DNS",
      port: "Port",
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
      name: "Name",
      update: "Update",
      delete: "Delete",
    },
  },
};

export default tables;
