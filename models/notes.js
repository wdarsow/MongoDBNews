const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MongoNoteSchema = new Schema({
    title: String,
    body: String
});

const notes = mongoose.model("notes", MongoNoteSchema);

module.exports = notes;