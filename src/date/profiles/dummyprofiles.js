function Dummy() {
var Profile = require('./model/profile.js');
Profile.find(function(err, profile){
    if(profile.length) return;
    new Profile(
    {
    username: 'Mr. A',
    password: 'abc123',
    }).save();

    new Profile(
    {
    username: 'Mr. B',
    password: 'abc123',
    }).save();

    new Profile(
    {
    username: 'Mr. C',
    password: 'abc123',
    }).save();

    new Profile(
    {
    username: 'Mr. D',
    password: 'abc123',
    }).save();

    new Profile(
    {
    username: 'Mrs. A',
    password: 'abc123',
    }).save();


    new Profile(
    {
    username: 'Mrs. B',
    password: 'abc123',
    }).save();

    new Profile(
    {
    username: 'Mrs. C',
    password: 'abc123',
    }).save();

    new Profile(
    {
    username: 'Mrs. D',
    password: 'abc123',
    }).save();

    new Profile(
    {
    username: 'Mrs. E',
    password: 'abc123',
    }).save();

    new Profile(
    {
    username: 'Mrs. F',
    password: 'abc123',
    }).save();
});
}
module.exports = Dummy