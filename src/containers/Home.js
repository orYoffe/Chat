import React, {Component} from 'react'
import {connect} from 'react-redux';
import {createChatRoomAction} from '../actions/ChatActions'

export class Home extends Component {
  constructor (props) {
      super(props);
      this.state = {username: ''}
  }

  onUsernameChange(e){
    this.setState({username: e.target.value})
  }

  onSubmit(e){
    e.preventDefault()
    if(typeof this.state.username === 'string' && this.state.username.length > 2){
      this.props.createChatRoom(this.state.username)
    }else{
      alert('username must be over 2 charcters')
    }
  }

  render () {
    const props = {}
      return (
          <form>
            <input type="text"
              onChange={this.onUsernameChange.bind(this)}
              value={this.state.username}
              placeholder="username"
              />
            <input type="submit" onClick={this.onSubmit.bind(this)} value="Create Chat"/>
          </form>
      );
  }
};

export const mapStateToProps = state => {
  console.log('state', state);
  return state
}

export const mapDispatchToprops = dispatch => {
  return {
    createChatRoom: username => (createChatRoomAction(username)(dispatch))
  }
}


export default connect(mapStateToProps, mapDispatchToprops)(Home);
