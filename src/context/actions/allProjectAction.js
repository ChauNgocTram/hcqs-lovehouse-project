export const setAllProject = (data) => {
  return {
    type: "SET_ALL_PROJECT",
    allProject: data,
  };
};

export const getAllProject = () => {
  return {
    type: "GET_ALL_PROJECT",
  };
};