const initialState = {
  dataUsers: { data: null, isLoading: null, isRejected: null },
};

const dashboardGetUsersReducers = (state = initialState, action) => {
  switch (action.type) {
    case "LOADUSERSLIST_PENDING":
      return Object.assign({}, state, {
        dataUsers: { isLoading: true, isRejected: false },
      });

    case "LOADUSERSLIST_SUCCESS":
      return Object.assign({}, state, {
        dataUsers: {
          data: action.payload,
          isLoading: false,
          isRejected: false,
        },
      });
    case "LOADUSERSLIST_REJECTED":
      return Object.assign({}, state, {
        dataUsers: { data: action.payload, isLoading: false, isRejected: true },
      });
    case "LOADUSERSLIST_CLEAR":
      return Object.assign({}, state, {
        dataUsers: { data: null, isLoading: null, isRejected: null },
      });
    default:
      break;
  }
  return state;
};

export default dashboardGetUsersReducers
