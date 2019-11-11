var crypto = require('crypto');
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    // email: {
    //     type: String,
    //     require: true,
    //     unique: true
    // },
    uname: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

const userData = module.exports = mongoose.model('userData', userSchema);