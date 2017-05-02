
module.exports= {
 pg: {
  host: 'localhost:3000',
  database: 'production', 
  user : 'production', 
  password: 'test', 
  charset: 'utf8'
 }, 
 mongodb: {
  url : 'mongodb://localhost:3000/production'
 }, 
 sessionSecret: 'secret'
};