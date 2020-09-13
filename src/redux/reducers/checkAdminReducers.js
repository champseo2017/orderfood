const initialState = {
  admin: { data: null, isLoading: false, isRejected: false },
};

const checkAdminReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADMINPAGES_SUCCESS":
      return Object.assign({}, state, {
        admin: { data: action.payload, isLoading: false, isRejected: false },
      });

    case "ADMINPAGES_REJECTED":
      return Object.assign({}, state, {
        admin: { data: action.payload, isLoading: false, isRejected: true },
      });
    case "ADMINPAGES_CLEAR":
      return Object.assign({}, state, {
        admin: { data: null, isLoading: false, isRejected: false },
      });
    default:
      break;
  }
  return state;
};
export default checkAdminReducers
