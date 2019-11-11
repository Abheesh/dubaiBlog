const mongoose = require('mongoose');
const dubaiBlogSchema = mongoose.Schema({
    blogName: {
        type: String,
        require: true
    },
    blogDescription: {
        type: String
    },
    author: {
        type:  String

    },
    uid: {
        type: String
    }
});
const dubaiBlog = module.exports = mongoose.model('dubaiBlog', dubaiBlogSchema);