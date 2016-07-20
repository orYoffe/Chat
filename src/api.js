import express from 'express'
import jsonfile from 'jsonfile'
import path from 'path'
import util from 'util'
const router = express.Router()
const chatsDB_DIR = path.join(__dirname, 'chatDB.json')
const usersDB_DIR = path.join(__dirname, 'usersDB.json')

router.post('/api/create-username', function(req, res) {
  const username = req.params.username || req.query.username || req.body.username

  if(!username || typeof username !== 'string' || username.length < 3 ){
    res.status(401).json({error: 'username required'})
  }else{
    let isThereNewData = false
    readFile(usersDB_DIR, res, function (DB) {
      const isAdmin = Object.keys(DB).length === 0

      if(!DB.hasOwnProperty(username)){
        DB[username] = {admin: isAdmin}
        isThereNewData = true
      }

      if(isThereNewData){
        jsonfile.writeFile(usersDB_DIR,  DB, function (err) {
          if( err ){
            console.log( err )
            res.status(500).json(err)
          }else{
            res.json({
              username: username,
              isAdmin
            })
          }
        })
      }else {
        res.json({
          username: username,
          isAdmin
        })
      }
    })
  }
})

router.get('/api/chat-info', function(req, res) {
  const username = req.params.username || req.query.username || req.body.username

  if(!username || typeof username !== 'string' || username.length < 3 ){
    res.status(401).json({error: 'username required'})
  }else{
    readFile(usersDB_DIR, res, function (usersDB) {
      if(!usersDB.hasOwnProperty(username)){
        res.status(401).json({error: 'username is not in DB'})
      }

      readFile(chatsDB_DIR, res, function (DB) {
        res.json({
          users: Object.keys(usersDB),
          messages: DB
        })
      })
    })
  }
})

function readFile(file, res, cb) {
  jsonfile.readFile(file, function (err, DB) {
    if( err ){
      console.log( err )
      res.status(500).json(err)
      return
    }
    cb(DB)
  })
}

export default router
