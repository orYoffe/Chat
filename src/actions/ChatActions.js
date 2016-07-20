import ApiHelper from '../ApiHelper'
import { push } from 'react-router-redux'
import * as Cookies  from 'cookies-js'

export const USERNAME_CREATE_REQUEST = 'USERNAME_CREATE_REQUEST'
export const USERNAME_CREATE_RECEIVE = 'USERNAME_CREATE_RECEIVE'
export const CHAT_INFO_REQUEST = 'CHAT_INFO_REQUEST'
export const CHAT_INFO_RECEIVE = 'CHAT_INFO_RECEIVE'
export const POST_NEW_MESSAGE = 'POST_NEW_MESSAGE'
export const NEW_USER_ADDED = 'NEW_USER_ADDED'
export const USER_REMOVED = 'USER_REMOVED'

export function createUsernameRequest(username) {
  return dispatch => {
    dispatch({
      username,
      type: USERNAME_CREATE_REQUEST
    })
  }
}

export function createUsernameReceived(response) {
  return {
    response,
    type: USERNAME_CREATE_RECEIVE
  }
}

export function createUsernameAction(username) {
  return dispatch => {
    dispatch(createUsernameRequest(username))
    ApiHelper.post('create-username', JSON.stringify({username})).then(response => {
      if(response.error){
        return
      }
      dispatch(createUsernameReceived(response))
      if(response.username){
        Cookies.set('username', username)
        dispatch(push('/chat'))
      }
    }).catch(err => {
      console.error(err)
    })
  }
}

export function chatInfoRequest(username) {
  return dispatch => {
    dispatch({
      username,
      type: CHAT_INFO_REQUEST
    })
  }
}

export function chatInfoReceived(response) {
  return {
    response,
    type: CHAT_INFO_RECEIVE
  }
}

export function chatInfoAction(username) {
  return dispatch => {
    dispatch(chatInfoRequest(username))
    ApiHelper.get('chat-info?username=' + username).then(response => {
      if(response.error){
        return
      }
      dispatch(chatInfoReceived(response))
    }).catch(err => {
      console.error(err)
    })
  }
}

export function postNewMessage(message) {
  return {
    message,
    type: POST_NEW_MESSAGE
  }
}

export function addNewUser(username) {
  return {
    username,
    type: NEW_USER_ADDED
  }
}

export function removeUser(username) {
  return {
    username,
    type: USER_REMOVED
  }
}
