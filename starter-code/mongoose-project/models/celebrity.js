const mongoose = require('mongoose');

// const ReviewModel = require('./review-model.js');

const Schema = mongoose.Schema;


const myCelebritySchema = new Schema({
  name: { type: String },
  occupation: { type: String},
  catchPhrase: { type: String }
});


// Model
//    constructor function that allows us to interact with a single collection

const CelebrityModel = mongoose.model('Celebrity', myCelebritySchema);
//                                      |
//     ----------------------------------
//     |
// 'Celebrity'  ->  'celebrities'  ->  db.celebrities.find()
//
// Collection name is automatically determined by Mongoose


// 💣 IF YOU FORGET THIS YOU WILL DIE 💣
module.exports = CelebrityModel;
