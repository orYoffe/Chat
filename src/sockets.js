import socketio from 'socket.io'
import jsonfile from 'jsonfile'
import path from 'path'

const chatsDB_DIR = path.join(__dirname, '../chatDB.json')
const usersDB_DIR = path.join(__dirname, '../usersDB.json')

function readFile(file, cb) {
  jsonfile.readFile(file, function (err, DB) {
    if(err){
      console.log(err)
      return
    }
    cb(DB)
  })
}

function getInfo(usersDB, chatsDB) {
  return new Promise(function(resolve, reject) {
    if(!chatsDB){
      jsonfile.readFile(chatsDB_DIR, function (err, chatsDB) {
        if(err){
          console.log(err)
          reject(err)
        }else if(!usersDB){
          jsonfile.readFile(usersDB_DIR, function (err, usersDB) {
            if(err){
              console.log(err)
              reject(err)
            }else{
              resolve({
                users: Object.keys(usersDB),
                messages: chatsDB
              })
            }
          })
        }else{
          resolve({
            users: Object.keys(usersDB),
            messages: chatsDB
          })
        }
      })
    }else{
      jsonfile.readFile(usersDB_DIR, function (err, usersDB) {
        if(err){
          console.log(err)
          reject(err)
        }else{
          resolve({
            users: Object.keys(usersDB),
            messages: chatsDB
          })
        }
      })
    }
  })
}

function init(server) {
  const io = socketio(server)

  io.on('connection', function(socket){
    const username = socket.request._query['username']
    if(!username){
      socket.disconnect()
    }else{
      // add user to list
      readFile(usersDB_DIR, function (usersDB) {
        const isAdmin = Object.keys(usersDB).length === 0

        if(!usersDB.hasOwnProperty(username)){
          usersDB[username] = {admin: isAdmin}
          jsonfile.writeFile(usersDB_DIR,  usersDB, function (err) {
            if(err){
              console.log(err)
            }else{
              getInfo(usersDB).then(info => io.emit('new info', info))
            }
          })
        }
      })

      // remove user from list
      socket.on('disconnect', function(){
        readFile(usersDB_DIR, function (usersDB) {
          if(usersDB.hasOwnProperty(username)){
            delete usersDB[username]
            jsonfile.writeFile(usersDB_DIR,  usersDB, function (err) {
              if(err){
                console.log(err)
              }else{
                getInfo(usersDB).then(info => io.emit('new info', info))
              }
            })
          }
        })
      })

      socket.on('chat message', function(message){
        // add message to list
        readFile(chatsDB_DIR, function (chatsDB) {
          chatsDB[Object.keys(chatsDB).length] = {message, username}
          jsonfile.writeFile(chatsDB_DIR,  chatsDB, function (err) {
            if(err){
              console.log(err)
            }else{
              getInfo(null, chatsDB).then(info => io.emit('new info', info))
            }
          })
        })
      })
    }
  })
}

export default init
