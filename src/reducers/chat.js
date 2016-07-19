import {CHAT_ROOM_CREATE_RECEIVE} from '../actions/ChatActions'
const initialState = {
  loaded: false
}

export default function reducer(state = initialState, action = {}) {
  if(!action || !action.type){
    return console.error('Actions must be an object and have a type')
  }

  switch (action.type) {
    case CHAT_ROOM_CREATE_RECEIVE:
      console.log(CHAT_ROOM_CREATE_RECEIVE + ' response', action.response)
      return state
    default:
      return state
  }
}
