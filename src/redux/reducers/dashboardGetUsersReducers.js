const initialState = {
  dataUsers: { data: null, isLoading: null, isRejected: false },
};

export default (state = initialState, action) => {
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
    default:
      break;
  }
  return state;
};
