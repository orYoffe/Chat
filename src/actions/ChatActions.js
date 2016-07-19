import ApiHelper from '../ApiHelper'
import { push } from 'react-router-redux'

export const CHAT_ROOM_CREATE_REQUEST = 'CHAT_ROOM_CREATE_REQUEST';
export const CHAT_ROOM_CREATE_RECEIVE = 'CHAT_ROOM_CREATE_RECEIVE';

export function createChatRoomRequest(username) {
  return dispatch => {
    dispatch({
      username,
      type: CHAT_ROOM_CREATE_REQUEST
    });
  };
}

export function createChatRoomReceived(response) {
  return {
    response,
    type: CHAT_ROOM_CREATE_RECEIVE
  }
}

export function createChatRoomAction(username) {
  return dispatch => {
    dispatch(createChatRoomRequest(username))
    ApiHelper.post('create-chat', JSON.stringify({username})).then(response => {
      if(response.error){
        alert(response.error)
        return
      }
      dispatch(createChatRoomReceived(response))
      dispatch(push('/chat/' + response.chatId))
    }).catch(err => {
      console.error(err);
    })
  }
}
