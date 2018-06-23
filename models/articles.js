const mongoose = require('mongoose');

// schema object constructor for Mongoose
const Schema = mongoose.Schema;

const MongoNewsSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    }, 
    
    link: {
        type: String,
        unique: true,
        required: true
    },

    notes: {
        type: Schema.Types.ObjectId,
        ref: "notes"
    }
});

const Article = mongoose.model("Article", MongoNewsSchema);

module.exports = Article;
