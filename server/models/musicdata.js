const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    name:String,
    genre:String,
    artistId:String
});

module.exports = mongoose.model('Music', musicSchema);