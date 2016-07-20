import React, {Component} from 'react'
import {connect} from 'react-redux'
import { push } from 'react-router-redux'
import ChatUserList from './ChatUserList'
import MessagesDisplay from './MessagesDisplay'
import MessageForm from './MessageForm'
import {chatInfoAction, createUsernameReceived} from '../actions/ChatActions'
import * as Cookies  from 'cookies-js'

export class Chat extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount (){
      this.props.getChatInfo(this.props.username)
  }

  componentWillMount (){
    if(!this.props.username){
        const username = Cookies.get('username')
        if(username){
          this.props.addUsername(username)
        }else{
          this.props.redirectHome()
        }
    }
  }

  render () {
    return (
      <div className="chat">
        <ChatUserList userList={this.props.userList} />
        <MessagesDisplay messages={this.props.messages} />
        <MessageForm />
      </div>
    )
  }
}

export const mapStateToProps = state => {
  return {
    username: state.app.chat.username,
    messages: state.app.chat.messages || {},
    userList: state.app.chat.users || []
  }
}

export const mapDispatchToprops = dispatch => {
  return {
    getChatInfo: username => (chatInfoAction(username)(dispatch)),
    redirectHome: () => (dispatch(push('/'))),
    addUsername: username => (dispatch(createUsernameReceived({username})))
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(Chat)
