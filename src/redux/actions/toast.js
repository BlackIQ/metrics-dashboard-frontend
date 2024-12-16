export const setToast = (toast) => {
  return {
    type: "SET_TOAST",
    payload: toast,
  };
};

export const unsetToast = () => {
  return {
    type: "UNSET_TOAST",
  };
};
