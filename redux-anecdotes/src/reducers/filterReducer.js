const initialState = "";

const SET_FILTER = "SET_FILTER";

const filterReducer = (state = initialState, action) => {
  console.log("filter state now: ", state);
  console.log("filter action", action);

  switch (action.type) {
    case SET_FILTER:
      return action.data.filter;
    default:
      return state;
  }
};

export const setFilter = (filter) => {
  return {
    type: SET_FILTER,
    data: { filter },
  };
}

export default filterReducer;
