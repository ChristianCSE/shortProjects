var express = require('express');
var handlebars = require('handlebars');
var Promise = require('bluebird');
var exphbs = require('express-handlebars');
var app = express();
var compression = require('compression');
app.use(compression());
app.set('port', process.env.PORT || 3000);
var bodyParser = require('body-parser');
var hbs = exphbs.create({
   extname:'.hbs'
})


//set path
app.use(express.static(__dirname + ""));
//view engine
app.engine('hbs',  hbs.engine );
app.set('view engine', 'hbs');

app.get("/", function(req, res) {

	return res.render('home');
});

app.listen(app.get("port"), function(){
	console.log("Listening on PORT" + app.get("port"));
});;