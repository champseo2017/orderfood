const initialState = {
  addUser: { data: null, isLoading: null, isRejected: false },
};

const addUserAdminReducers =  (state = initialState, action) => {
  switch (action.type) {
    case "INSERTUSERADMINDB_PENDING":
      return Object.assign({}, state, {
        addUser: { isLoading: true, isRejected: false },
      });

    case "INSERTUSERADMINDB_SUCCESS":
      return Object.assign({}, state, {
        addUser: {
          data: action.payload,
          isLoading: false,
          isRejected: false,
        },
      });
    case "INSERTUSERADMINDB_REJECTED":
      return Object.assign({}, state, {
        addUser: { data: action.payload, isLoading: false, isRejected: true },
      });
  }
  return state;
};

export default addUserAdminReducers