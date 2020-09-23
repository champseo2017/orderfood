import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../redux/reducers";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "authReducers",
    "dashboardGetUsersReducers",
    "addusersReducers",
    "addUserAdminReducers",
    "alertactivityReducers",
  ],
  // whitelist: ['language']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor };
};
