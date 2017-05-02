var redis = require('redis'), 
 Promise = require('bluebird'),
 https = require('https'), 
 express = require('express'), 
 bodyParser = require('body-parser'), 
 flow = require('flow-maintained'),
 redis = require('redis'), 
 routes = require('./routes');

var app = express();
var client = Promise.promisifyAll(redis.createClient());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/static"));
// app.set('views', './views');

app.engine('.html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.set('port', process.env.PORT || 8080);

app.get('/', (req, res)=>{
  client.incr("test", (err, counter)=> {
    res.render('index', {redis: counter});
  });
});

app.post('/', (req, res)=>{
  console.log("post / : ", req.body);
  res.redirect('/');
});



// app.get('/helper', (req, res, next)=>{
//  //one middleware
//  console.log("hello");
//  req.message = "yo what it do!";
//  next(); 
// }, (req, res, next)=>{
//  //our next middleware
//  res.send(200, req.message);
// });

app.listen(app.get('port'), ()=> {
 console.log("Express server listening on port");
 });