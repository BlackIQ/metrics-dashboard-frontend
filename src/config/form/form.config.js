import { communicationTypes, activeTypes, dockerTypes } from "@/data";

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
      grid: {
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
      grid: {
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
      grid: {
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
      grid: {
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
      grid: {
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
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    //   role: {
    //     type: "selectData",
    //     label: "نقش کاربر",
    //     placeholder: "نقش کاربر را وارد کنید",
    //     secure: false,
    //     advanced: {
    //       required: true,
    //     },
    //   },
  },
  forgotPassword: {
    email: {
      type: "text",
      label: "Email",
      placeholder: "Enter your email",
      secure: false,
      grid: {
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
  userProfile: {
    firstName: {
      type: "text",
      label: "Firstname",
      placeholder: "Enter user firstname",
      secure: false,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    lastName: {
      type: "text",
      label: "Lastname",
      placeholder: "Enter user lastname",
      secure: false,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    email: {
      type: "text",
      label: "Email",
      placeholder: "Enter user email",
      secure: false,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    role: {
      type: "selectData",
      label: "Role",
      placeholder: "Enter user role",
      secure: false,
      grid: {
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
  userProfileMe: {
    firstName: {
      type: "text",
      label: "Firstname",
      placeholder: "Enter user firstname",
      secure: false,
      grid: {
        xs: 12,
        sm: 6,
        md: 6,
        lg: 6,
      },
      advanced: {
        required: true,
      },
    },
    lastName: {
      type: "text",
      label: "Lastname",
      placeholder: "Enter user lastname",
      secure: false,
      grid: {
        xs: 12,
        sm: 6,
        md: 6,
        lg: 6,
      },
      advanced: {
        required: true,
      },
    },
    email: {
      type: "text",
      label: "Email",
      placeholder: "Enter user email",
      secure: false,
      grid: {
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
  changePassword: {
    newPassword: {
      type: "text",
      label: "New password",
      placeholder: "Enter your new password",
      secure: true,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    confirmPassword: {
      type: "text",
      label: "Confirm password",
      placeholder: "Enter your confirm password",
      secure: true,
      grid: {
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
  permission: {
    label: {
      type: "text",
      label: "Name",
      placeholder: "Enter permission name",
      secure: false,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    value: {
      type: "text",
      label: "Identifier",
      placeholder: "Enter identifier name",
      secure: false,
      grid: {
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
  role: {
    label: {
      type: "text",
      label: "Name",
      placeholder: "Enter role name",
      secure: false,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    value: {
      type: "text",
      label: "Identifier",
      placeholder: "Enter identifier name",
      secure: false,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    permissions: {
      type: "checkData",
      label: "Permissions",
      placeholder: "Choose permissions",
      secure: false,
      grid: {
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
    label: {
      type: "text",
      label: "Name",
      placeholder: "Enter tag name",
      secure: false,
      grid: {
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
    label: {
      type: "text",
      label: "Name",
      placeholder: "Enter group name",
      secure: false,
      grid: {
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
      label: "Hostname",
      placeholder: "Enter host name",
      secure: false,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    ip: {
      type: "text",
      label: "IP",
      placeholder: "Enter host IP",
      secure: false,
      grid: {
        xs: 12,
        sm: 6,
        md: 6,
        lg: 6,
      },
      // advanced: {
      //   required: true,
      // },
    },
    dns: {
      type: "text",
      label: "DNS",
      placeholder: "Enter host DNS",
      secure: false,
      grid: {
        xs: 12,
        sm: 6,
        md: 6,
        lg: 6,
      },
      // advanced: {
      //   required: true,
      // },
    },
    port: {
      type: "text",
      label: "Port",
      placeholder: "Enter host port",
      secure: false,
      grid: {
        xs: 12,
        sm: 6,
        md: 6,
        lg: 6,
      },
      advanced: {
        required: true,
      },
    },
    ipCommunication: {
      type: "select",
      label: "Communication",
      placeholder: "Choose agent communication",
      options: communicationTypes,
      grid: {
        xs: 12,
        sm: 6,
        md: 6,
        lg: 6,
      },
      // advanced: {
      //   required: true,
      // },
    },
    apiKey: {
      type: "text",
      label: "API Key",
      placeholder: "Enter host API Key",
      secure: false,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    dockerMetrics: {
      type: "select",
      label: "Docker",
      placeholder: "You can choose to collect Docker metrics",
      options: dockerTypes,
      grid: {
        xs: 12,
        sm: 6,
        md: 6,
        lg: 6,
      },
      // advanced: {
      //   required: true,
      // },
    },
    isActive: {
      type: "select",
      label: "Active / Inactive",
      placeholder: "Is agent active or not!?",
      options: activeTypes,
      grid: {
        xs: 12,
        sm: 6,
        md: 6,
        lg: 6,
      },
      // advanced: {
      //   required: true,
      // },
    },
    groups: {
      type: "checkData",
      label: "Groups",
      placeholder: "Choose groups",
      secure: false,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      // advanced: {
      //   required: true,
      // },
    },
    tags: {
      type: "checkData",
      label: "Tags",
      placeholder: "Choose tags",
      secure: false,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      // advanced: {
      //   required: true,
      // },
    },
  },
  alertTelegram: {
    chatID: {
      type: "text",
      label: "Chat ID",
      placeholder: "Enter your channel/group/pv chat ID",
      secure: false,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      advanced: {
        required: true,
      },
    },
    botToken: {
      type: "text",
      label: "Bot Token",
      placeholder: "Enter your Bot token",
      secure: false,
      grid: {
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
  alertEmail: {
    destinationEmail: {
      type: "text",
      label: "Email",
      placeholder: "Enter your Email to get alerts",
      secure: false,
      grid: {
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
};

export default forms;
