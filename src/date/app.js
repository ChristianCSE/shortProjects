var express = require('express');
var Profile = require('./model/profile.js');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var session      = require('express-session');
var passport = require('passport');
// app.use(app.router); deprecated
//Optional, but advised to do:
//app.use(express.session({secret: 'keyboard cat'}))
//app.use(passport.session())


app.use(express.static(__dirname + ''));
app.set('port', process.env.PORT || 3000);

require('./config/confirm.js')(passport);
var mongoose = require('mongoose');
mongoose.connect('',
 function(err, db) {
  if (err) {
    console.dir(err);
  } else {
    console.log("Connected!");
  }
});

app.use(cookieParser());
app.use(bodyParser.json());

var handlebars = require('express3-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');
app.use(passport.initialize());
app.use(passport.session());

// app.use(session({
//     secret: "mine",
//     resave: true,
//     saveUninitialized: true
// }));

require('./profiles/dummyprofiles.js');

/*=======================================
Authenticated
 =======================================**/
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        console.log('good routing');
        return next();
    }
    else{
        console.log('bad routing');
        return next();
    }
}


/*==========================================
LOGGING IN
 ==========================================**/
app.get('/', function(req, res) {
    res.render('login', {title: 'Hey, login!', color: 'pink'});
});

app.get('/login', function(req, res) {
    res.render('login',
        {title: 'Hey, login!', color: 'pink'}
        );
});

app.post('/login',
 passport.authenticate('local-signup', {
        successRedirect : '/preferences',
        failureRedirect : '/preferences',
    }));

 /*==========================================
SIGNING UP
 ==========================================**/
app.get('/signup', function(req, res) {
    res.render('signup', {title: 'Hey, Sign Up!', color: 'pink'});
});


app.post('/signup',
    passport.authenticate('local-signup', {
        successRedirect : '/preferences',
        failureRedirect : '/preferences',
        // failureFlash : true
    }));

 /*==========================================
PREFERENCES
 ==========================================**/
app.get('/preferences', isLoggedIn, function(req, res) {
    res.render('preferences', {title: 'Prefereces!', color: 'pink'});
});




 /*==========================================
MATHCES
 ==========================================**/
app.get('/matches', isLoggedIn, function(req, res) {
    res.render('matches', {title: "It's a match!", color: 'pink'});
});


//catcher protocol 404
app.use(function(req, res, next){
    res.status(404);
    res.render('404', {title: '', color: 'empty' });
});

//catcher protocol 500
app.use(function(err, req, res, next){
    // console.error(err.stack);
    res.status(500);
    res.render('500', {title: '505 ERROR!',  color: 'red' });
});


app.listen(app.get('port'), function(){
  console.log( ' port is open! localhost:3000.' );
});
