var html = require('fs').readFileSync('index.html',{encoding:'utf-8'});
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('./public'));  // for publishing public/memo.html
app.get('/', function(req, res) {
    console.log("GET")
    console.log(req.query)
    switch (req.query.action){

        case '':
        case null:
        case 'login':
        default:
        for (key in req.query){
            
            html=html.replace('<?='+key+'?>',req.query[key])
        }
        html=html.replace('<?=email?>',req.query['email'] || '')
        html=html.replace('"POST"','"GET"')
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(html);
    
        break

    
    }
});


app.post('/', function(req, res) {
    console.log("POST")
    console.log(req.body)
    switch (req.body.action){
        case 'home':
        case 'update':
        case 'add':
        case 'changepass':
        case 'image':
        for (key in req.body){
            
            html=html.replace('<?='+key+'?>',req.body[key])
        }
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(html);
        break

    
    }
    
});


app.listen(3000, function() {
    console.log('Listening on port 3000');
});
