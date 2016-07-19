import React, {Component} from 'react'

export default (props) => {
  return (
    <h1>
      {props.params.chatId}
      Chat
    </h1>
  )
}
