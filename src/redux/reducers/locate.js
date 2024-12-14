const localeReducer = (state = "fa", action) => {
  switch (action.type) {
    case "SET_LOCALE":
      return (state = action.payload);
    default:
      return state;
  }
};

export default localeReducer;
