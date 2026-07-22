const toastReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_TOAST":
      return (state = action.payload);
    case "UNSET_TOAST":
      return (state = "");
    default:
      return state;
  }
};

export default toastReducer;
