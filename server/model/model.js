const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : { 
        type:String,
        required:String,
        unique:true
    },
    gender:String,
    status:String
});

const Userdb = mongoose.model('userdb',schema);

module.exports = Userdb;