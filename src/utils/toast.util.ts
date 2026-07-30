import toast, { ToastOptions } from "react-hot-toast";

const defaultOptions: ToastOptions = {
  duration: 4000,
  position: "bottom-right",
  style: {
    borderRadius: "8px",
    background: "#1e1e1e",
    color: "#fff",
    fontSize: "0.875rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
};

export const showToast = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, {
      ...defaultOptions,
      style: {
        ...defaultOptions.style,
        borderLeft: "4px solid #2e7d32",
      },
      ...options,
    }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, {
      ...defaultOptions,
      style: {
        ...defaultOptions.style,
        borderLeft: "4px solid #d32f2f",
      },
      ...options,
    }),

  info: (message: string, options?: ToastOptions) =>
    toast(message, {
      ...defaultOptions,
      style: {
        ...defaultOptions.style,
        borderLeft: "4px solid #0288d1",
      },
      ...options,
    }),

  promise: <T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string },
  ) =>
    toast.promise(promise, messages, {
      ...defaultOptions,
    }),
};
