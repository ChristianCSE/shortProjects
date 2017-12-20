//usually we have: server.js with middleware, api routing, then the actual work
const express = require('express');
//middleware dependency
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
//don't need to do this, but makes it look cleaner
const readFileAsync = Promise.promisify(fs.readFile);
const writeFileAsync = Promise.promisify(fs.writeFile);
const app = express();

//data_file is the absolute path of data.json __dirname 
//is the absolute path relative to where we (server.js) is.
const DATA_FILE = path.join(__dirname, 'data.json');
//if there is an env var called port use that else use 3000
app.set('port', (process.env.PORT || 3000));

//express built-in middleware function for serving static files
//'public' implies you serve from public directory (has nothing to do with path)
//you can use this multiple times for multiple directories
//you don't need to specify a mount path, but we do '/'
//__dirname: absolute path of server.js location
//app.use() is all middleware
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use((req, res, next) => {
  //correct min set of headers that work across all clients & proxies in 
  //overriding web service editor settings for caching. 
  //https://stackoverflow.com/questions/49547/how-to-control-web-page-caching-across-all-browsers
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});


app.get('/api/timers', (req, res) => {
  readFileAsync(DATA_FILE).then((data)=>{
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  }).catch((err)=>{
    console.err(`ERROR (get) api/timers: ${err}`);
    return Promise.reject(err);
  });
});

//payload, new object is in body
app.post('/api/timers', (req, res) => {
  //data contains all timers
  readFileAsync(DATA_FILE).then((data)=>{
    const timers = JSON.parse(data);
    const newTimer = {
      title: req.body.title,
      project: req.body.project, 
      id: req.body.id,
      elapsed: 0,
      runningSince: null
    };
    timers.push(newTimer); //add this objec to our array 
    writeFileAsync(DATA_FILE, JSON.stringify(timers, null, 4)).then(()=>{
      res.setHeader('Cache-Control', 'no-cache');
      res.json(timers);
    })
  }).catch((err)=>{
    console.error("ERROR api/timers: ", err);
    return Promise.reject(err);
  });
});

app.post('/api/timers/stop', (req, res) => {
  readFileAsync(DATA_FILE).then((data)=>{
    const timers = JSON.parse(data);
    timers.forEach((timer) => {
      if(timer.id==req.body.id){
        const delta = req.body.stop - timer.runningSince;
        timer.elapsed += delta; //we need to track where we left off, since we are stopping the timer
        timer.runningSince = null;
      }
    });
    //NOTE: file_writing_to, format, callback
    writeFileAsync(DATA_FILE, JSON.stringify(timers, null, 4)).then(()=>{
      res.json({}); // ?
    })
  })
  .catch((err)=>{
    console.err("ERROR api/timers/stop: ", err);
    reutrn Promise.reject(err);
  });
});

//PUT=>editing an already existing object
app.put('/api/timers', (req, res) => {
  readFileAsync(DATA_FILE).then((data)=>{
    const timers = JSON.parse(data);
    //NOTE: we aren't reconstrucing a new array rather 
    //we are editing the insides of this array 
    timers.forEach((timer) => {
      if(timer.id===req.body.id){
        timer.title = req.body.title;
        timer.project = req.body.project;
      }
    });
    writeFileAsync(DATA_FILE, JSON.stringify(timers, null, 4)).then(()=>{ res.json({}); });
  }).catch((err)=>{
    console.err('ERROR /api/timers: ', err);
    return Promise.reject(err);
  });
});

app.delete('api/timers', (req, res)=>{
  readFileAsync(DATA_FILE).then((data)=>{
    const timers = JSON.parse(data);
    //reconstruct our array without the timer we are deleting!
    timers = timers.reduce((memo, timer) => {
      return (timer.id===req.body.id) ? memo : memo.concat(timer);
    }, []);
  }).catch((err)=>{
    console.err(`ERROR (DELETE) api/timers: ${err}`);
    return Promise.reject(err);
  });
});


app.get('/molasses', (_, res)=> {
  setTimeout(() => {
    res.end();
  }, 5000);
});


app.listen(app.get('port'), ()=>{
  console.log(`Find the server at http://localhost:${app.get('port')}/`);
});