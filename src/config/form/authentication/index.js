export const login = {
  email: {
    type: "text",
    placeholder: "Email",
    // label: "شماره همراه",
    // placeholder: "شماره همراه را وارد کنید",
    secure: false,
    advanced: {
      required: true,
    },
  },
  password: {
    type: "text",
    placeholder: "Password",
    // label: "رمز",
    // placeholder: "رمز را وارد کنید",
    secure: true,
    advanced: {
      required: true,
    },
  },
};

export const register = {
  firstName: {
    type: "text",
    label: "First Name",
    placeholder: "Enter your first name",
    secure: false,
    advanced: {
      required: true,
    },
  },
  lastName: {
    type: "text",
    label: "Last Name",
    placeholder: "Enter your last name",
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
};
