import { communicationTypes, activeTypes } from "@/data";

const forms = {
  login: {
    email: {
      type: "text",
      label: "Email",
      placeholder: "Enter your email",
      secure: false,
      advanced: {
        required: true,
      },
    },
    password: {
      type: "text",
      label: "Password",
      placeholder: "Enter your password",
      secure: true,
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
      advanced: {
        required: true,
      },
    },
    lastName: {
      type: "text",
      label: "Last Name",
      placeholder: "Enter your lastname",
      secure: false,
      advanced: {
        required: true,
      },
    },
    email: {
      type: "text",
      label: "Email",
      placeholder: "Enter your email",
      secure: false,
      advanced: {
        required: true,
      },
    },
    password: {
      type: "text",
      label: "Password",
      placeholder: "Choose a strong password",
      secure: true,
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
  userProfile: {
    firstName: {
      type: "text",
      label: "Firstname",
      placeholder: "Enter user firstname",
      secure: false,
      advanced: {
        required: true,
      },
    },
    lastName: {
      type: "text",
      label: "Lastname",
      placeholder: "Enter user lastname",
      secure: false,
      advanced: {
        required: true,
      },
    },
    email: {
      type: "text",
      label: "Email",
      placeholder: "Enter user email",
      secure: false,
      advanced: {
        required: true,
      },
    },
    role: {
      type: "selectData",
      label: "Role",
      placeholder: "Enter user role",
      secure: false,
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
      advanced: {
        required: true,
      },
    },
    lastName: {
      type: "text",
      label: "Lastname",
      placeholder: "Enter user lastname",
      secure: false,
      advanced: {
        required: true,
      },
    },
    email: {
      type: "text",
      label: "Email",
      placeholder: "Enter user email",
      secure: false,
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
      advanced: {
        required: true,
      },
    },
    confirmPassword: {
      type: "text",
      label: "Confirm password",
      placeholder: "Enter your confirm password",
      secure: true,
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
      advanced: {
        required: true,
      },
    },
    value: {
      type: "text",
      label: "Identifier",
      placeholder: "Enter identifier name",
      secure: false,
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
      advanced: {
        required: true,
      },
    },
    value: {
      type: "text",
      label: "Identifier",
      placeholder: "Enter identifier name",
      secure: false,
      advanced: {
        required: true,
      },
    },
    permissions: {
      type: "checkData",
      label: "Permissions",
      placeholder: "Choose permissions",
      secure: false,
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
      advanced: {
        required: true,
      },
    },
    ip: {
      type: "text",
      label: "IP",
      placeholder: "Enter host IP",
      secure: false,
      // advanced: {
      //   required: true,
      // },
    },
    dns: {
      type: "text",
      label: "DNS",
      placeholder: "Enter host DNS",
      secure: false,
      // advanced: {
      //   required: true,
      // },
    },
    port: {
      type: "text",
      label: "Port",
      placeholder: "Enter host port",
      secure: false,
      advanced: {
        required: true,
      },
    },
    ipCommunication: {
      type: "select",
      label: "Communication",
      placeholder: "Choose agent communication",
      options: communicationTypes,
      // advanced: {
      //   required: true,
      // },
    },
    isActive: {
      type: "select",
      label: "Active / Inactive",
      placeholder: "Is agent active or not!?",
      options: activeTypes,
      // advanced: {
      //   required: true,
      // },
    },
    groups: {
      type: "checkData",
      label: "Groups",
      placeholder: "Choose groups",
      secure: false,
      advanced: {
        required: true,
      },
    },
    tags: {
      type: "checkData",
      label: "Tags",
      placeholder: "Choose tags",
      secure: false,
      advanced: {
        required: true,
      },
    },
  },
};

export default forms;
