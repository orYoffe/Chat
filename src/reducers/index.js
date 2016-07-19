import { combineReducers } from 'redux';
import chat from './chat';


function anotherReducer(state = {}, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
const reducers =  combineReducers({  chat, anotherReducer  })

export default reducers;
