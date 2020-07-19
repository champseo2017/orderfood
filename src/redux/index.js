import { createStore } from 'redux';
import reducer from './reducers';

export const initStore = (initialState = {}) => {
  return createStore(reducer, initialState);
};