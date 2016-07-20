import express from 'express'
import jsonfile from 'jsonfile'
import path from 'path'

const router = express.Router()
const chatsDB_DIR = path.join(__dirname, '../chatDB.json')
const usersDB_DIR = path.join(__dirname, '../usersDB.json')

router.post('/api/create-username', function(req, res) {
  const username = req.params.username || req.query.username || req.body.username

  if(!username || typeof username !== 'string' || username.length < 3 ){
    res.json({error: 'username required'})
  }else{
    res.json({
      username
    })
  }
})

router.get('/api/chat-info', function(req, res) {
  const username = req.params.username || req.query.username || req.body.username

  if(!username || typeof username !== 'string' || username.length < 3 ){
    res.status(401).json({error: 'username required'})
  }else{
    readFile(usersDB_DIR, res, function (usersDB) {
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
