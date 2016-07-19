import express from 'express'
import path from 'path'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import hbs from 'express-handlebars'
import {renderFullPage, normalizePort, onError, renderError} from './initHelpers'
import http from 'http'
import api from './api'

const folderName = path.basename(__dirname)
if(folderName !== 'src' && folderName === 'dist'){
  process.env.NODE_ENV = 'production';
}else if(folderName === 'src' && folderName !== 'dist'){
  process.env.NODE_ENV = 'development';
}

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.use(api)

app.use('/*', function(req, res){
  res.status(200).send(renderFullPage())
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.send(renderError(err))
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.send(renderError(err))
})


const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)
let server = http.createServer(app)
function onListening() {
  console.log("server listening at http://localhost:" + port)
}
server.on('error', onError)
server.on('listening', onListening)
server.listen(port);
