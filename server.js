// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(3000, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:3000/');
var express = require('express');
wines = require('./routes/api');
const http = require('http');
var app = express();
const bodyParser= require('body-parser');
server = http.createServer(app);

// app.get('/wines', function(req, res) {
//     res.send([{name:'wine1'}, {name:'wine2'}]);
// });
// app.get('/wines/:id', function(req, res) {
//     res.send({id:req.params.id, name: "The Name", description: "description"});
// });


// app.configure(function () {
//     app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
//     app.use(express.bodyParser());
// });
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/api', wines.findAll);
app.get('/api/:User_Name', wines.findById);
app.post('/api/post', wines.addWine);
app.post('/api/login', wines.authenticate);


app.listen(3000);
console.log('Listening on port 5100...');
console.log('Navigate to http://10.102.8.31:5100/api/');

server.close(function(){
server.listen(5100,'10.102.8.31')
})