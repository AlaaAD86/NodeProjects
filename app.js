// const express = require("express");
// const app = express();

// app.listen(3000, ()=> {
//     app.get('/', function (req, res) {
//         res.send('hello baby');
//     });
// });

//======================


// console.log(module);

//======================
// const fs = require('fs');

// const files = fs.readdirSync('./');
// console.log(files);

// fs.readdir('./', function(err, files){
//     if (err) console.log('Error', err);
//     else console.log('result', files);
// });

//======================

const EventEmitter = require('events')
const emitter = new EventEmitter()

//Register a listener

emitter.on('messageLogged', (arg)=> {
    console.log('listener called', arg)
})

//Raise an event
emitter.emit('messageLogged', { id:1, url:'http//'})

//======================
