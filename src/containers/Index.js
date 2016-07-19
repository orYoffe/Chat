import React, {Component} from 'react'
import {Link} from 'react-router'

export default (props) => {
  return (
    <div>
      <Link to="/chat">Chat</Link>
      {props.children}
    </div>
  )
}
