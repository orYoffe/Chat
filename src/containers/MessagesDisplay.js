import React, {Component} from 'react'

const MessagesDisplay = (props) => {
  let messages = []
  for (const key of Object.keys(props.messages)) {
    const item = props.messages[key]
    messages.push(<li key={key}>{item.username + ' says: ' + item.message}</li>)
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
