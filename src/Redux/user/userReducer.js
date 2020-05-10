const INITIAL_STATE = {
  currentUser: null,
};

//state is something that the redux store passes to this reducer whenever an action fires
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CURRENT_USER_STATE":
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
