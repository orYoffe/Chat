import express from 'express'
import jsonfile from 'jsonfile'
import path from 'path'
import util from 'util'
const router = express.Router()
const chatsDB_DIR = path.join(__dirname, 'chatDB.json')

router.post('/api/create-chat', function(req, res) {
  const username = req.params.username || req.query.username || req.body.username

  if(!username || typeof username !== 'string' || username.length < 3 ){
    console.log('================req.body', req.body);
    console.log('================username', username);
    res.status(500).json({error: 'username required'})
  }else{
    let isThereNewData = false
    jsonfile.readFile(chatsDB_DIR, function (err, DB) {
      if( err ){
        console.log( err )
        res.status(500).json(err)
      }

      if(!DB.hasOwnProperty(username)){
        console.log('===================chat created')
        DB[username] = []
        isThereNewData = true
      }

      if(isThereNewData){
        jsonfile.writeFile(chatsDB_DIR,  DB, function (err) {
          if( err ){
            console.log( err )
            res.status(500).json(err)
          }else{
            console.log( 'DB: ===', DB )
            res.json({
              chatId: username
            })
          }
        })
      }else {
        res.json({
          chatId: username
        })
      }
    })
  }
})

export default router
