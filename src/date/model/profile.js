var mongoose = require('mongoose');
//defining what makes a profile login
//native j
var bcrypt   = require('bcrypt-nodejs');

var profileSchema = mongoose.Schema({
	username: String,
	password: String,

});

// profileSchema.methods.showConfirm = function(){
// 	return ('<h1></h1>');
// }

//hash
profileSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checker
profileSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


//defined profile
var Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;