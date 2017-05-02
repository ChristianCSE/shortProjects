//import config
const config = require('../config');

//connect to db
const Bookshelf = require('../lib/connect')(config);

//define model 
const myModel = Bookshelf.Model.extend({
 table: 'items'
});

//export collection module
module.export = myModel;
