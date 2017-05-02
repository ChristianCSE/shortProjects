var locatStrat   = require('passport-local').Strategy;
var User = require('../model/profile.js');
module.exports = function(passport) {


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use('local-signup', new locatStrat({
        usernameField : 'name',
        passwordField : 'password',
        // passReqToCallback : true
    },
    // function(req, name, password, done) {
        // process.nextTick(
    function(name, password, done) {
        User.findOne({ 'name' :  name }, function(err, user) {
            if (err){
                return done(err);
            }
            if (user) {
                return done(null, false, {message: 'That name is already taken.'});
            } else {
                var newUser = new User();
                newUser.name    = name;
                newUser.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

        // };

    }));


    passport.use('local-login', new locatStrat({
        usernameField : 'name',
        passwordField : 'password',
        // passReqToCallback : true
    },//function(req, name, password, done) {
    function(name, password, done) {
        User.findOne({ 'name' :  name },
            function(err, user)
            {
                if (err){
                    return done(err);
                }
                if (!user){
                    return done(null, false,  {message: 'No user found.' });
                }
                if (!user.validPassword(password)){
                    return done(null, false, {message: 'Oops! Wrong password.'});
                }
                return done(null, user);
            }
        );
    }));
};








