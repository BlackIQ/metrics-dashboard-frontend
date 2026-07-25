const tables = {
  tag: {
    title: "Tags",
    fields: {
      name: "Name",
      update: "Edit",
      delete: "Delete",
    },
  },
  group: {
    title: "Groups",
    fields: {
      name: "Name",
      update: "Edit",
      delete: "Delete",
    },
  },
  host: {
    title: "Hosts",
    fields: {
      name: "Name",
      ipv4: "IPv4",
      dns: "Domain",
      port: "Port",
      communication: "Communication",
      agent_availability: "Availability",
      is_active: "Active",
      update: "Edit",
      delete: "Delete",
    },
  },
};

export default tables;
