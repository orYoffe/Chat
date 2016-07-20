import React, {Component} from 'react'

const MessagesDisplay = (props) => {
  let messages = []
  for (const key of Object.keys(props.messages)) {
    const item = props.messages[key]
    messages.push(<li key={key}><span className="user">{item.username} says:</span> <span className="message">{item.message}</span></li>)
  }
  if(messages.legth === 0){
    messages.push(<li>No Messages to show</li>)
  }
    return (
      <div className="messages">
        <ul>
          <li key="01">Messages:</li>
          {messages}
        </ul>
      </div>
    )
}
export default MessagesDisplay
