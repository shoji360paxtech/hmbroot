var html = require('fs').readFileSync('index.html',{encoding:'utf-8'});
var express = require('express');
var app = express();

app.use(express.static('./public'));  // for publishing public/memo.html
app.get('/', function(req, res) {
    console.log(req.query)
    switch (req.query.action){

        case '':
        case 'login':
        for (key in req.query){
            
            html=html.replace('<?='+key+'?>',req.query[key])
        }
        html=html.replace('<?=email?>',req.query['email'] || '')

        break

    
    }
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(html);
});


app.post('/', function(req, res) {
    console.log(req.query)
    switch (req.query.action){
        case 'home':
        case 'update':
        case 'add':
        case 'changepass':
        case 'image':
        case '':
        case 'login':
        for (key in req.query){
            
            html=html.replace('<?='+key+'?>',req.query[key])
        }
        break

    
    }
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(html);
});


app.listen(3000, function() {
    console.log('Listening on port 3000');
});
