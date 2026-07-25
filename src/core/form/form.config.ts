// ----- GRID BEGIN -----
// xs: Extra small (default, for mobile, typically <600px)
// sm: Small (tablets, 600px+)
// md: Medium (desktops, 900px+)
// lg: Large (larger screens, 1200px+)
// ----- GRID FINISH ----

const forms = {
  login: {
    email: {
      type: "text",
      label: "Email",
      placeholder: "Enter your email",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    password: {
      type: "text",
      label: "Password",
      placeholder: "Enter your password",
      secure: true,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
  },
  register: {
    firstName: {
      type: "text",
      label: "First Name",
      placeholder: "Enter your firstname",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 6,
      },
      advanced: {
        required: true,
      },
    },
    lastName: {
      type: "text",
      label: "Last Name",
      placeholder: "Enter your lastname",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 6,
      },
      advanced: {
        required: true,
      },
    },
    email: {
      type: "text",
      label: "Email",
      placeholder: "Enter your email",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    password: {
      type: "text",
      label: "Password",
      placeholder: "Choose a strong password",
      secure: true,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    confirm_password: {
      type: "text",
      label: "Confirm Password",
      placeholder: "Repeat strong password",
      secure: true,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
  },
  tag: {
    name: {
      type: "text",
      label: "Name",
      placeholder: "Enter tag name",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    description: {
      type: "textarea",
      label: "Description",
      placeholder: "Enter a description for this tag",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
  },
  group: {
    name: {
      type: "text",
      label: "Name",
      placeholder: "Enter group name",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    description: {
      type: "textarea",
      label: "Description",
      placeholder: "Enter a description for this group",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
  },
  host: {
    name: {
      type: "text",
      label: "Name",
      placeholder: "Enter group name",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    ipv4: {
      type: "text",
      label: "IPv4",
      placeholder: "Address of Agent",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
      advanced: {
        required: true,
      },
    },
    dns: {
      type: "text",
      label: "Domain",
      placeholder: "Domain that points to Agent",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
      advanced: {
        required: true,
      },
    },
    port: {
      type: "number",
      label: "Port",
      placeholder: "Which port is Agent exposing",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
      advanced: {
        required: true,
      },
    },
    api_key: {
      type: "text",
      label: "API Key",
      placeholder: "What key you defined for Agent",
      secure: true,
      size: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
      advanced: {
        required: true,
      },
    },
    communication: {
      type: "text",
      label: "Communication",
      placeholder: "How shoud OpenHubble connect to Agent",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    description: {
      type: "textarea",
      label: "Description",
      placeholder: "Enter a description for this host",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    is_active: {
      type: "checkbox",
      label: "Is Agent active?",
      placeholder: "Enter a description for this host",
      secure: false,
      size: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: false,
      },
    },
  },
};

export default forms;
