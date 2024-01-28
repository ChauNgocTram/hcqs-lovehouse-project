function allProjectReducer(state = null, action) {
  switch (action.type) {
    case "GET_ALL_PROJECT":
      return state;

    case "SET_ALL_PROJECT":
      return {
        ...state,
        allProject: action.allProject,
      };
    default:
      return state;
  }
};

export default allProjectReducer;