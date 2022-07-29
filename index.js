var html0 = require('fs').readFileSync('index.html',{encoding:'utf-8'});
var htmllogin0 = require('fs').readFileSync('indexlogin.html',{encoding:'utf-8'});
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
    var html=htmllogin0.replace('<?=emailid?>',req.query['emailid'] || '')
    html=html.replace('##URL##',process.env.gasurl)
    var action=req.query.action || 'login'
    console.log(action)
    switch (action){
       case 'sheet':
            res.redirect(301,process.env.ssurl)
            break;
        case '':
        case null:
        case 'login':
        default:
        for (key in req.query){
            
            html=html.replace('<?='+key+'?>',req.query[key])
        }

        html=html.replace('"POST"','"GET"')
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(html);
    
        break

    
    }
});


app.post('/', function(req, res) {
    console.log("POST")
    console.log(req.body)
    var html=html0.replace('<?=email?>',req.query['emailid'] || '')
    html=html.replace('##URL##',process.env.gasurl)

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
