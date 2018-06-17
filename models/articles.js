const mongoose = require('mongoose');

// schema object constructor for Mongoose
const Schema = mongoose.Schema;

const MongoNewsSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    
    link: {
        type: String,
        required: true
    },

    notes: {
        type: Schema.Types.ObjectId,
        ref: "Notes"
    }
});

const Article = mongoose.model("Article", MongoNewsSchema);

module.exports = Article;