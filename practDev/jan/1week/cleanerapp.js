var redis = require('redis');
var Promise = require('bluebird');
var client = Promise.promisifyAll(redis.createClient());

 var myRedis = {}

  client.on("error", (err)=>{
   console.log("err: ", err);
  });

 //string = (string = (key)) just a single pair!!!!
 myRedis.pairSet = (set, key)=>{
  client.setAsync(set, key)
  .then((result)=>{
   console.log("successful hashmap insert", result);
   return result;
  }).catch((err)=>{
   console.log("myRedis err: ", err);
   return Promise.reject(err);
  });
 };
 
 //add to Set
 //name of Set, Key=> Value
 myRedis.set = (set, key) => {
   client.saddAsync(set, key)
   .then((result)=>{
    console.log("Set insert: ", result);
   }).catch((err)=> {
    console.log("err: ", err);
   });
 };
 
 //hash map( map = (key, val))
 myRedis.hmset = (map, key, val)=>{
  client.hsetAsync(map, key, val)
  .then((result)=>{
   console.log("Ok insert inside Hmap: ", map);
   return 0;
  }).catch((err)=>{
   console.log("myRedis.hmset err: ", err);
   return Promise.reject(err);
  });
 };

 //print map 
 myRedis.printMap = (map) => {
  client.hkeys(map, function(err, replies){
   console.log(replies.length  + " replies: ");
   replies.forEach((reply, i)=>{
    console.log("      ", i, " : ", reply);
   });
  });
  client.quit();
 };

 //print Set 
 myRedis.printSet = (setname)  => {
  client.smembers(setname, function(err, values){
   console.log(values, ": values");
  });
 client.quit();
 };

 //print pair
 myRedis.printPair = (pair) => {
  client.get(pair, function(err, replies){
   console.log(replies.length+ " replies: ");
  }).catch((err)=>{
   console.log("err: ", err);
  });
 };


 module.exports = myRedis;

