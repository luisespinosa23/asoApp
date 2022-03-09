export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_USER":
      return {
        ...payload,
      };
    default:
      return state;
  }
};
