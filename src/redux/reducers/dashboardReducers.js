const initialState = {
  dasboard: { data: '' },
  dasboardUser: { data: '' }
};

const dashboardReducers = (state = initialState, action) => {
  switch (action.type) {
    case "USERCLICK_DASHBOARDUSER":
      return Object.assign({}, state, {
        dasboard: { data: 'usersDasboard' },
      });

    case "CLEAR_DASHBOARDUSER":
      return Object.assign({}, state, {
        dasboard: { data: '' },
      });
      
      // add users
      case "ADDUSERCLICK_DASHBOARDUSER":
      return Object.assign({}, state, {
        dasboard: { data: '' },
        dasboardUser: { data: 'addUsersDasboard' },
      });

    case "CLEARADDUSER_DASHBOARDUSER":
      return Object.assign({}, state, {
        dasboardUser: { data: '' },
      });
    default:
      break;
  }
  return state;
};
export default dashboardReducers