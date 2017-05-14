'use strict';

const http = require('http');
const app = require('./app.js');
module.exports =  app =>  {
  console.log('hello there=>');
  return http.createServer(app);
};


const startServer = () => {
  const server = http.createServer(app);
  server.listen(app.get('port'), ()=> {
    console.log("Express server listening on port");
  });
}

startServer();