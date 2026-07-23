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
  },
  page: {
    name: {
      type: "text",
      label: "Title",
      placeholder: "Enter page title",
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
      placeholder: "Enter a description for this page",
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
};

export default forms;
