const db = require('knex');
const Promise = require('bluebird');
const myModel = require('../models/mymodel');
const myCollection = require('../collections/mycollection');


module.exports = {
 //1 principle: pragmantic RESTful design => keep simple things simple. 
 //Have a base url for collections
 //and the second for a specific element in the collection
 //FORCE THE VERBS OUT OF THE BASE URL 
 //HTTP should provide Verbs, not your actual naming of the route!
 //this is the controller so we can include the verb, but 
 //the route should not 
 let controller = {};

 //get(/items/:id)
 //route(/items/) none specified => retrieving a list of tickets
 //here we have specfied hence retrieve specific item 
 controller.getItem = (req, res, next)=>{
  let id = req.params.id;
  myModel.forge({id: id}).fetch()
  .then((model)=>{
   res.json(model.toJSON());
  }).catch((err)=>{
   res.status(500).json({msg: err.message});
  });
 };

 //get(/item)
 controller.getItems = (req, res, next)=>{
  let id = req.params.id; 
  myCollection.forget()
  .fetch()
  .then((collection)=>{
   res.json(collection.toJSON());
  }).catch((err)=>{
   res.status(500).json({msg: err.message});
  });
 };

 //post items 
 controller.postItem = (req, res, next)=>{
  myModel.forge(req.body)
  .save()
  .then((mode)=>{
   res.json(model.toJSON());
  }).catch((err)=>{
   res.status(500).json({msg: err.message});
  });
 };


 return controller;
}