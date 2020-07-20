const initialState = {
    users: { data: null, isLoading: false, isRejected: false },
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case "CREATE_USERS_PENDING":
        return Object.assign({}, state, {
          users: { data: "456789", isLoading: true, isRejected: false },
        });
  
      case "CREATE_USERS_SUCCESS":
        return Object.assign({}, state, {
          users: { data: "action.payload456", isLoading: false, isRejected: false },
        });
  
      case "CREATE_USERS_REJECTED":
        return Object.assign({}, state, {
          users: { data: action.payload, isLoading: false, isRejected: true },
        });
      case "CLEARDATA_USERS":
        return Object.assign({}, state, {
          users: { data: 'clear data 2', isLoading: false, isRejected: false },
        });
      default:
        break;
    }
    return state;
  };