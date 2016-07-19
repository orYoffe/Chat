
/**
 * Normalize a port into a number, string, or false.
 */

export function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

export function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export function renderFullPage() {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8">
        <title>chat</title>
        <!--[if lt IE 9]>
        <script>
        (function(){
          var ef = function(){};
          window.console = window.console || {log:ef,warn:ef,error:ef,dir:ef};
        }());
        </script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
        <![endif]-->
        </head>
        <body>
          <div id="root"></div>
          <script src="bundle.js"></script>
        </body>
      </html>
      `
}

export function renderError(err) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8">
        <title>chat</title>
        <!--[if lt IE 9]>
        <script>
        (function(){
          var ef = function(){};
          window.console = window.console || {log:ef,warn:ef,error:ef,dir:ef};
        }());
        </script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
        <![endif]-->
        </head>
        <body>
          <h1>${err.message}</h1>
          <p>${err}</p>
        </body>
      </html>
      `
}

export default {
  normalizePort,
  onError,
  renderFullPage,
  renderError
};
