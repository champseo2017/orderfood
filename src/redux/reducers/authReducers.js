const initialState = {
  admin: { data: null, isLoading: false, isRejected: false },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGINADMIN_PENDING":
      return Object.assign({}, state, {
        admin: { isLoading: true, isRejected: false },
      });

    case "LOGINADMIN_SUCCESS":
      return Object.assign({}, state, {
        admin: { data: action.payload, isLoading: false, isRejected: false },
      });

    case "LOGINADMIN_REJECTED":
      return Object.assign({}, state, {
        admin: { data: action.payload, isLoading: false, isRejected: true },
      });
    case "CLEARLOGINADMIN_USERS":
      return Object.assign({}, state, {
        admin: { data: null, isLoading: false, isRejected: false },
      });
    default:
      break;
  }
  return state;
};
