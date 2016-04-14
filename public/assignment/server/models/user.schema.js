module.exports = function (mongoose) {
    var UserSchema = mongoose.Schema({
        "firstName": {type:String,default:""},
        "lastName": {type:String,default:""},
        "username": String,
        "password": String,
        "email": {type: String, default: ""},
        "roles": {type: [String], default: []}
    }, {collection: "user"});

    return UserSchema;
};