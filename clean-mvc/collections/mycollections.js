//req the model for this collection
const myModel = require('../models/mymodel');

//def collection
const myCollection = Bookshelf.Collection.extend({
 model: myModel
});

//export collection module 
module.exports = myCollection;