import React, {Component} from 'react'
import {connect} from 'react-redux'
import { push } from 'react-router-redux'
import ChatUserList from './ChatUserList'
import MessagesDisplay from './MessagesDisplay'
import {chatInfoAction} from '../actions/ChatActions'

export class Chat extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount (){
    if(!this.props.username){
      this.props.redirectHome()
    }else{
      this.props.getChatInfo(this.props.username)
    }
  }

  render () {
    return (
      <div className="chat">
        <ChatUserList userList={this.props.userList} />
        <MessagesDisplay messages={this.props.messages} />
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
    redirectHome: () => (dispatch(push('/')))
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(Chat)
