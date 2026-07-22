const sessionReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_SESSION":
      return (state = action.payload);
    case "UNSET_SESSION":
      return (state = "");
    default:
      return state;
  }
};

export default sessionReducer;
