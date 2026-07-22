import API from "@/api";
import URLs from "@/api/urls";

const { auth } = URLs;

// Authentication

export const loginAccount = async (data) => {
  try {
    const response = await API.post(`${auth}/login`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const registerAccount = async (data) => {
  try {
    const response = await API.post(`${auth}/register`, data);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

// Logout

export const logoutAccount = async () => {
  try {
    const response = await API.post(`${auth}/logout`);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

// Confirm Account

export const confirmEmail = async (rayid) => {
  try {
    const response = await API.post(`${auth}/confirm`, {
      rayid,
    });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const resendConfirmEmail = async (email) => {
  try {
    const response = await API.post(`${auth}/resend-confirm`, {
      email,
    });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

// Change Email

export const changeEmail = async (newEmail) => {
  try {
    const response = await API.post(`${auth}/change-email`, {
      newEmail,
    });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const confirmChangeEmail = async (rayid) => {
  try {
    const response = await API.post(`${auth}/confirm-email-change`, {
      rayid,
    });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

// Change Password

export const forgotPassword = async (email) => {
  try {
    const response = await API.post(`${auth}/forgot-password`, {
      email,
    });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const resetPassword = async (rayid, newPassword) => {
  try {
    const response = await API.post(`${auth}/reset-password`, {
      rayid,
      newPassword,
    });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
