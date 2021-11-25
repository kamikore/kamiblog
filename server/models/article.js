const mongoose = require('mongoose');
const Joi = require('joi');


const articleSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
        default: null
    },
    comment: {
        type: Array,
        default: null
    },
    publishTime: {
        type: Date,
        default: Date.now
    },
    view: {
        type: Number,
        default: 0
    },
    status : {
        type : String,
        enum: ['draft','published','delete'],
        default: 'draft',
    }
})


const Article = mongoose.model('Article',articleSchema);

module.exports = {
   Article
}