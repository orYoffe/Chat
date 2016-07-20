import React, {Component} from 'react'

const ChatUserList = (props) => {
  const users = props.userList.map((item, index) => {
    return <li key={index}>{item}</li>
  })
  if(users.legth === 0){
    users.push(<li>No Users to show</li>)
  }
    return (
      <div className="user-list">
        <ul>
          <li key="01">Users in chat</li>
          {users}
        </ul>
      </div>
    )
}
export default ChatUserList
