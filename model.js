var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
uid : String,
title:String,
content:String,
createTime : { type: Date, default: Date.now }
});


exports.Contact = mongoose.model('Contact',ContactSchema); 