const initialState = {
  userSave: { check: null },
};

const alertactivityReducers = (state = initialState, action) => {
  switch (action.type) {
    case "SAVEUSERSSUCESS":
      return Object.assign({}, state, {
        userSave: { check: true },
      });

    case "SAVEUSERSTIMEOUT":
      return Object.assign({}, state, {
        userSave: { check: null },
      });
    default:
      break;
  }
  return state;
};

export default alertactivityReducers;