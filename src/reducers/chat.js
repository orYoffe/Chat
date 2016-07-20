import {CHAT_INFO_RECEIVE} from '../actions/ChatActions'
const initialState = {}

export default function reducer(state = initialState, action = {}) {
  if(!action || !action.type){
    return console.error('Actions must be an object and have a type')
  }

  switch (action.type) {
    case CHAT_INFO_RECEIVE:
      return Object.assign({}, state, action.response)
    default:
      return state
  }
}
