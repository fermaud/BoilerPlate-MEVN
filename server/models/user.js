var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    name: String,
    surname: String,
    mail: String,
    admin: Boolean
});

var Users = mongoose.model("Users", UsersSchema);
module.exports = Users;
