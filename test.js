var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send("halo");
})

app.listen(8081, function(){
    console.log('running on 8081');
})
