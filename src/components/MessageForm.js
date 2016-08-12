import React, {Component} from 'react'
import {connect} from 'react-redux'
import io from 'socket.io-client'
import {chatInfoReceived} from '../actions/ChatActions'
import * as Cookies  from 'cookies-js'

let socket

export class MessageForm extends Component {
  constructor (props) {
    super(props)
    this.state = {message: ''}
    if(!this.props.username){
        const username = Cookies.get('username')
        if(username){
          socket = io('/', {query: "username=" + (username || '')})
        }
    }else{
      socket = io('/', {query: "username=" + (this.props.username || '')})
    }
  }

  componentWillMount (){
    socket.on('new info', function(info){
      this.props.chatInfoReceived(info)
    }.bind(this))
  }

  onMessageChange(e){
    this.setState({message: e.target.value})
  }

  onSubmit(e){
    e.preventDefault()
    if(typeof this.state.message === 'string' && this.state.message.length > 0){
      socket.emit('chat message', this.state.message)
      this.setState({message: ''})
      return false
    }
  }

  render () {
    return (
      <form>
        <input type="text"
          onChange={this.onMessageChange.bind(this)}
          value={this.state.message}
          placeholder="Write a message"/>
        <input type="submit" onClick={this.onSubmit.bind(this)} value="Send"/>
      </form>
    )
  }
}

export const mapStateToProps = state => {
  return {
    username: state.app.chat.username
  }
}

export const mapDispatchToprops = dispatch => {
  return {
    chatInfoReceived: (info) => (dispatch(chatInfoReceived(info)))
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(MessageForm)
