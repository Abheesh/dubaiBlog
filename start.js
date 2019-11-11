/**
 * Author : Abheesh Valiyakath KochuMuhammed
 * Description: Simple CRED operation with no auth function
 * Database:  MongoDB
 */

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');


var app = express();
const route = require('./route/routes');

const config = require('./config/database');
mongoose.connect(config.database);
mongoose.connection.on('connected', ()=>{
console.log('connnected');
});

const PORT = 3000;

app.use(cors());

app.use(bodyparser.json());
app.use(express.static('public'));


app.use('/api', route);

//app.use(express.static(__dirname + '/public'));



app.listen(PORT, ()=> {
console.log('server started');
});