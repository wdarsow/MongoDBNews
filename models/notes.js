var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MongoNoteSchema = new Schema({
    title: String,
    body: String
});

var notes = mongoose.model("notes", MongoNoteSchema);

module.exports = notes;