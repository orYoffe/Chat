import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createUsernameAction} from '../actions/ChatActions'

export class Home extends Component {
  constructor (props) {
      super(props)
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
              placeholder="Username"
              />
            <input type="submit" onClick={this.onSubmit.bind(this)} value="Enter Chat"/>
          </form>
      )
  }
}

export const mapStateToProps = state => {
  return {}
}

export const mapDispatchToprops = dispatch => {
  return {
    createChatRoom: username => (createUsernameAction(username)(dispatch))
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(Home)
